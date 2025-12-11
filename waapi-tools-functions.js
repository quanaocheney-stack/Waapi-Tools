const autobahn = require('autobahn');
const ak = require('./waapi.js').ak;
const fs = require('fs');
const path = require('path');

// ==================== 辅助函数 ====================

/**
 * 创建WAAPI连接
 */
function createConnection(port) {
    return new Promise((resolve, reject) => {
        let isOpened = false; // 跟踪连接是否已成功打开
        
        const connection = new autobahn.Connection({
            url: `ws://127.0.0.1:${port}/waapi`,
            realm: 'realm1',
            protocols: ['wamp.2.json']
        });

        const timeout = setTimeout(() => {
            if (!isOpened) {
                if (connection.isConnected) {
                    connection.close();
                }
                reject(new Error('Connection timeout'));
            }
        }, 10000); // 增加到10秒超时

        connection.onopen = (session) => {
            clearTimeout(timeout);
            isOpened = true;
            resolve({ session, connection });
        };

        connection.onclose = (reason, details) => {
            clearTimeout(timeout);
            
            // 如果连接从未成功打开，则视为失败
            if (!isOpened) {
                // 参考官方示例：wamp.error.goodbye_and_out 和 'closed' 是正常的服务器关闭
                // 'lost' 通常表示网络连接丢失，也可能是正常的（如服务器主动关闭）
                const isNormalClose = reason === 'closed' || 
                                     reason === 'wamp.error.goodbye_and_out' || 
                                     reason === 'lost';
                
                if (!isNormalClose) {
                    // 提供更详细的错误信息
                    const errorMsg = details && details.message
                        ? `Connection failed: ${reason} - ${details.message}` 
                        : `Connection failed: ${reason}`;
                    reject(new Error(errorMsg));
                } else {
                    // 正常关闭但未打开，可能是服务器拒绝连接
                    reject(new Error(`Cannot connect to Wwise (port ${port}), please ensure Wwise is running and WAAPI is enabled`));
                }
            }
            // 如果已经成功打开，正常关闭不处理，让 Promise 正常完成
        };

        // 添加错误处理
        connection.onerror = (error) => {
            clearTimeout(timeout);
            if (!isOpened) {
                    reject(new Error(`Connection error: ${error.message || error}`));
            }
        };

        connection.open();
    });
}

/**
 * 遍历Wwise工程层级结构
 */
async function* walkWproj(session, startGuidsOrPaths, properties = [], types = []) {
    const returnProps = properties.length > 0 ? properties : ['id', 'name', 'type', 'path'];
    const options = {
        return: returnProps
    };

    let waql;
    if (Array.isArray(startGuidsOrPaths)) {
        // 多个GUID
        const guidList = startGuidsOrPaths.map(g => `"${g}"`).join(', ');
        waql = `select descendants where id in (${guidList})`;
    } else if (typeof startGuidsOrPaths === 'string') {
        if (startGuidsOrPaths.startsWith('\\')) {
            // 路径，使用from语法
            waql = `"${startGuidsOrPaths}" select descendants`;
        } else {
            // GUID，使用from语法
            waql = `"${startGuidsOrPaths}" select descendants`;
        }
    } else {
        throw new Error('Invalid startGuidsOrPaths');
    }

    // 添加类型过滤
    if (types.length > 0) {
        const typeFilter = types.map(t => `type = "${t}"`).join(' or ');
        waql += ` where ${typeFilter}`;
    }

    try {
        // 先尝试使用 return 参数（新版本）
        let result;
        try {
            result = await session.call(ak.wwise.core.object.get, [], {
                waql: waql
            }, options);
        } catch (returnError) {
            // 如果 return 参数不被支持（旧版本如2019），尝试不使用 return
            if (returnError.error === 'ak.wwise.invalid_arguments' || 
                returnError.error === 'ak.wwise.schema_validation_failed') {
                result = await session.call(ak.wwise.core.object.get, [], {
                    waql: waql
                });
            } else {
                throw returnError;
            }
        }
        const objects = result.kwargs?.return || result.return || [];

        for (const obj of objects) {
            // 根据请求的属性返回对应的值
            if (properties.length === 0) {
                yield obj;
            } else if (properties.length === 1) {
                yield obj[properties[0]];
            } else {
                yield properties.map(prop => obj[prop]);
            }
        }
    } catch (error) {
        // 如果descendants查询失败，尝试直接查询对象本身
        try {
            let directWaql;
            if (typeof startGuidsOrPaths === 'string') {
                if (startGuidsOrPaths.startsWith('\\')) {
                    directWaql = `"${startGuidsOrPaths}"`;
                } else {
                    directWaql = `"${startGuidsOrPaths}"`;
                }
            } else {
                throw error;
            }

            // 先尝试使用 return 参数（新版本）
            let result;
            try {
                result = await session.call(ak.wwise.core.object.get, [], {
                    waql: directWaql
                }, options);
            } catch (returnError) {
                // 如果 return 参数不被支持（旧版本如2019），尝试不使用 return
                if (returnError.error === 'ak.wwise.invalid_arguments' || 
                    returnError.error === 'ak.wwise.schema_validation_failed') {
                    result = await session.call(ak.wwise.core.object.get, [], {
                        waql: directWaql
                    });
                } else {
                    throw returnError;
                }
            }
            const objects = result.kwargs?.return || result.return || [];
            
            for (const obj of objects) {
                if (types.length === 0 || types.includes(obj.type)) {
                    if (properties.length === 0) {
                        yield obj;
                    } else if (properties.length === 1) {
                        yield obj[properties[0]];
                    } else {
                        yield properties.map(prop => obj[prop]);
                    }
                }
            }
        } catch (err) {
            throw error;
        }
    }
}

/**
 * 获取当前选中的对象
 */
async function getSelectedObjects(session) {
    try {
        // 先尝试使用 return 参数（新版本）
        let result;
        try {
            result = await session.call(ak.wwise.ui.getSelectedObjects, [], {}, {
                return: ["name", "id", "volume", "type", "path", "playbackDuration"]
            });
        } catch (returnError) {
            // 如果 return 参数不被支持（旧版本如2019），尝试不使用 return
            if (returnError.error === 'ak.wwise.invalid_arguments' || 
                returnError.error === 'ak.wwise.schema_validation_failed') {
                result = await session.call(ak.wwise.ui.getSelectedObjects, [], {});
            } else {
                throw returnError;
            }
        }
        
        const objects = result.kwargs?.objects || result.objects || [];
        
        
        return objects;
    } catch (error) {
        const errorMsg = error.error || error.message || 'Unknown error';
        throw new Error(`Failed to get selected objects: ${errorMsg}`);
    }
}

/**
 * 获取对象属性值
 */
async function getPropertyValue(session, objectId, propertyName) {
    try {
        // 先尝试使用 return 参数（新版本）
        let result;
        try {
            result = await session.call(ak.wwise.core.object.get, [], {
                waql: `"${objectId}"`
            }, {
                return: [propertyName]
            });
        } catch (returnError) {
            // 如果 return 参数不被支持（旧版本如2019），尝试不使用 return
            if (returnError.error === 'ak.wwise.invalid_arguments' || 
                returnError.error === 'ak.wwise.schema_validation_failed') {
                result = await session.call(ak.wwise.core.object.get, [], {
                    waql: `"${objectId}"`
                });
            } else {
                throw returnError;
            }
        }

        const objects = result.kwargs?.return || result.return || [];
        if (objects.length === 0) {
            return null;
        }

        const value = objects[0][propertyName];
        return value !== undefined ? value : null;
    } catch (error) {
        return null;
    }
}

/**
 * 设置对象属性值
 */
async function setPropertyValue(session, objectId, propertyName, value) {
    try {
        // 使用 ak.wwise.core.object.setProperty（WAAPI标准API）
        await session.call(ak.wwise.core.object.setProperty, [], {
            object: objectId,
            property: propertyName,
            value: value
        });
        return true;
    } catch (error) {
        throw new Error(`设置属性失败: ${error.error || error.message}`);
    }
}

/**
 * 检查对象是否存在
 */
async function doesObjectExist(session, objectId) {
    try {
        // 先尝试使用 return 参数（新版本）
        let result;
        try {
            result = await session.call(ak.wwise.core.object.get, [], {
                waql: `"${objectId}"`
            }, {
                return: ['id']
            });
        } catch (returnError) {
            // 如果 return 参数不被支持（旧版本如2019），尝试不使用 return
            if (returnError.error === 'ak.wwise.invalid_arguments' || 
                returnError.error === 'ak.wwise.schema_validation_failed') {
                result = await session.call(ak.wwise.core.object.get, [], {
                    waql: `"${objectId}"`
                });
            } else {
                throw returnError;
            }
        }

        const objects = result.kwargs?.return || result.return || [];
        return objects.length > 0;
    } catch (error) {
        return false;
    }
}

/**
 * 开始Undo Group
 */
async function beginUndoGroup(session) {
    try {
        await session.call(ak.wwise.core.undo.beginGroup, [], {});
    } catch (error) {
        // 忽略错误，某些版本的WAAPI可能不支持
    }
}

/**
 * 结束Undo Group
 */
async function endUndoGroup(session, name) {
    try {
        await session.call(ak.wwise.core.undo.endGroup, [], { name });
    } catch (error) {
        // 忽略错误，某些版本的WAAPI可能不支持
    }
}

/**
 * 删除对象
 */
async function deleteObject(session, objectId) {
    try {
        await session.call(ak.wwise.core.object.delete, [], {
            object: objectId
        });
        return true;
    } catch (error) {
        throw new Error(`删除对象失败: ${error.error || error.message}`);
    }
}

// ==================== 主要功能 ====================

/**
 * 测试连接
 */
async function testConnection(port = 8080) {
    let connection = null;
    try {
        const { session, connection: conn } = await createConnection(port);
        connection = conn;
        
        const wwiseInfo = await session.call(ak.wwise.core.getInfo, [], {});
        
        // 尝试获取项目信息（旧版本可能不支持 getProjectInfo）
        let projectInfo = null;
        try {
            projectInfo = await session.call(ak.wwise.core.getProjectInfo, [], {});
        } catch (projectInfoError) {
            // 如果 getProjectInfo 不存在（旧版本），跳过项目信息获取
            if (projectInfoError.error === 'ak.wwise.invalid_procedure_uri' || 
                projectInfoError.error === 'wamp.error.no_such_procedure') {
                // 旧版本不支持，继续执行但不获取项目信息
            } else {
                throw projectInfoError; // 其他错误继续抛出
            }
        }

        let version = '未知版本';
        if (wwiseInfo.kwargs?.version) {
            if (typeof wwiseInfo.kwargs.version === 'string') {
                version = wwiseInfo.kwargs.version;
            } else if (typeof wwiseInfo.kwargs.version === 'object') {
                version = wwiseInfo.kwargs.version.displayName || 
                         wwiseInfo.kwargs.version.versionName || 
                         '未知版本';
            }
        }

        let projectName = '未命名项目';
        let projectPath = '';
        
        if (projectInfo) {
            // 调试：输出项目信息的完整结构（仅在开发时使用）
            // console.log('ProjectInfo structure:', JSON.stringify(projectInfo, null, 2));
            
            // 尝试多种方式获取项目名称
            if (projectInfo.kwargs?.project?.name) {
                projectName = projectInfo.kwargs.project.name;
            } else if (projectInfo.kwargs?.name) {
                projectName = projectInfo.kwargs.name;
            } else if (projectInfo.project?.name) {
                projectName = projectInfo.project.name;
            } else if (projectInfo.name) {
                projectName = projectInfo.name;
            }
            
            // 获取项目路径
            projectPath = projectInfo.kwargs?.project?.path || 
                         projectInfo.project?.path || 
                         projectInfo.kwargs?.path || 
                         projectInfo.path || 
                         '';
            
            // 如果名称还是默认值，尝试从路径中提取
            if (projectName === '未命名项目' && projectPath) {
                const pathParts = projectPath.split(/[/\\]/);
                const wprojFile = pathParts.find(part => part.endsWith('.wproj'));
                if (wprojFile) {
                    projectName = wprojFile.replace('.wproj', '');
                }
            }
            
            // 如果还是没有获取到，尝试通过查询项目根对象获取名称
            if (projectName === '未命名项目') {
                try {
                    // 先尝试使用 return 参数（新版本）
                    let projectRootResult;
                    try {
                        projectRootResult = await session.call(ak.wwise.core.object.get, [], {
                            waql: '\\Actor-Mixer Hierarchy\\Default Work Unit'
                        }, {
                            return: ['filePath']
                        });
                    } catch (returnError) {
                        // 如果 return 参数不被支持（旧版本如2019），尝试不使用 return
                        if (returnError.error === 'ak.wwise.invalid_arguments' || 
                            returnError.error === 'ak.wwise.schema_validation_failed') {
                            projectRootResult = await session.call(ak.wwise.core.object.get, [], {
                                waql: '\\Actor-Mixer Hierarchy\\Default Work Unit'
                            });
                        } else {
                            throw returnError;
                        }
                    }
                    const projectRoot = projectRootResult.kwargs?.return || projectRootResult.return || [];
                    if (projectRoot.length > 0 && projectRoot[0].filePath) {
                        const rootPath = projectRoot[0].filePath;
                        // 从 Default Work Unit 路径向上查找 .wproj 文件
                        const pathParts = rootPath.split(/[/\\]/);
                        for (let i = pathParts.length - 1; i >= 0; i--) {
                            if (pathParts[i].endsWith('.wproj')) {
                                projectName = pathParts[i].replace('.wproj', '');
                                break;
                            }
                        }
                    }
                } catch (error) {
                    // 忽略错误，继续使用默认名称
                }
            }
        }

        if (connection && connection.isConnected) {
            connection.close();
        }
        return {
            success: true,
            projectName,
            wwiseVersion: version
        };
    } catch (error) {
        if (connection && connection.isConnected) {
            connection.close();
        }
        return {
            success: false,
            message: error.error || error.message || 'Connection failed'
        };
    }
}

/**
 * 获取Originals路径
 */
async function getOriginalsPath(port = 8080) {
    const { session, connection } = await createConnection(port);
    try {
        const projectInfo = await session.call(ak.wwise.core.getProjectInfo, [], {});
        const projectPath = projectInfo.kwargs?.project?.path || 
                           projectInfo.project?.path || 
                           projectInfo.kwargs?.path || '';

        connection.close();

        if (projectPath) {
            const projectDir = path.dirname(projectPath);
            const originalsPath = path.join(projectDir, 'Originals');
            if (fs.existsSync(originalsPath)) {
                return {
                    success: true,
                    path: originalsPath
                };
            }
        }

        return {
            success: false,
            message: 'Cannot find Originals folder'
        };
    } catch (error) {
        connection.close();
        return {
            success: false,
            message: error.error || error.message || 'Failed to get path'
        };
    }
}

/**
 * 重置音量推子 - 扫描
 */
async function resetFadersScan(port, scope) {
    const { session, connection } = await createConnection(port);
    try {
        
        const selectedObjects = await getSelectedObjects(session);
        if (selectedObjects.length === 0) {
            connection.close();
            return {
                success: false,
                message: 'Please select objects in Wwise first'
            };
        }
        
        // 调试：输出选中对象数量
        console.log(`获取到 ${selectedObjects.length} 个选中对象`);

        const results = [];
        const processedIds = new Set(); // 用于去重
        
        // scope现在是一个数组，可能包含'selected'和/或'children'
        const includeSelected = Array.isArray(scope) ? scope.includes('selected') : scope === 'selected';
        const includeChildren = Array.isArray(scope) ? scope.includes('children') : scope === 'children';

        for (const selectedObj of selectedObjects) {
            const startGuid = selectedObj.id;

            // 如果包含选中对象本身
            if (includeSelected) {
                try {
                    // 先尝试使用 return 参数（新版本）
                    let objResult;
                    try {
                        objResult = await session.call(ak.wwise.core.object.get, [], {
                            waql: `"${startGuid}"`
                        }, {
                            return: ['id', 'name', 'type', 'notes']
                        });
                    } catch (returnError) {
                        // 如果 return 参数不被支持（旧版本如2019），尝试不使用 return
                        if (returnError.error === 'ak.wwise.invalid_arguments' || 
                            returnError.error === 'ak.wwise.schema_validation_failed') {
                            objResult = await session.call(ak.wwise.core.object.get, [], {
                                waql: `"${startGuid}"`
                            });
                        } else {
                            throw returnError;
                        }
                    }
                    const obj = (objResult.kwargs?.return || objResult.return || [])[0];
                    if (obj && !processedIds.has(obj.id)) {
                        const objNotes = obj.notes || '';
                        if (!objNotes.includes('@ignore')) {
                            // 确定属性名
                            let propName = 'Volume';
                            if (obj.type === 'Bus' || obj.type === 'AuxBus') {
                                propName = 'BusVolume';
                            }
                            
                            // 使用getPropertyValue获取属性值
                            const curVolume = await getPropertyValue(session, obj.id, propName);
                            if (curVolume !== null && curVolume !== undefined) {
                                results.push({
                                    id: obj.id,
                                    name: obj.name || 'N/A',
                                    type: obj.type || 'N/A',
                                    originalVolume: curVolume,
                                    propertyName: propName,
                                    status: curVolume === 0 ? '已归零' : '待重置'
                                });
                                processedIds.add(obj.id);
                            }
                        }
                    }
                } catch (error) {
                    console.error('Failed to query object:', error);
                }
            }

            // 如果包含子对象
            if (includeChildren) {
                // 遍历对象及其子对象
                for await (const objData of walkWproj(session, startGuid, ['id', 'name', 'type', 'notes'], [])) {
                    let objId, objName, objType, objNotes;
                    
                    if (Array.isArray(objData)) {
                        [objId, objName, objType, objNotes] = objData;
                    } else {
                        objId = objData.id;
                        objName = objData.name;
                        objType = objData.type;
                        objNotes = objData.notes || '';
                    }

                    // 如果已经处理过，跳过
                    if (processedIds.has(objId)) {
                        continue;
                    }

                    // 检查是否忽略
                    if (objNotes && objNotes.includes('@ignore')) {
                        continue;
                    }

                    // 确定属性名
                    let propName = 'Volume';
                    if (objType === 'Bus' || objType === 'AuxBus') {
                        propName = 'BusVolume';
                    }

                    // 获取当前音量
                    const curVolume = await getPropertyValue(session, objId, propName);
                    if (curVolume !== null && curVolume !== undefined) {
                        results.push({
                            id: objId,
                            name: objName || 'N/A',
                            type: objType || 'N/A',
                            originalVolume: curVolume,
                            propertyName: propName,
                            status: curVolume === 0 ? '已归零' : '待重置'
                        });
                        processedIds.add(objId);
                    }
                }
            }
        }

        connection.close();
        return {
            success: true,
            results
        };
    } catch (error) {
        connection.close();
        const errorMsg = error.error || error.message || 'Scan failed';
        return {
            success: false,
            message: errorMsg,
            results: []
        };
    }
}

/**
 * 定位对象到Wwise窗口
 */
async function locateObject(port, objectId) {
    const { session, connection } = await createConnection(port);
    try {
        // 先尝试使用新版本命令 FindInProjectExplorerSelectionChannel1
        let commandSuccess = false;
        try {
            await session.call(ak.wwise.ui.commands.execute, [], {
                command: "FindInProjectExplorerSelectionChannel1",
                objects: [objectId]
            });
            commandSuccess = true;
        } catch (newCmdError) {
            // 如果新版本命令失败，尝试使用旧版本命令 FindInProjectExplorerSyncGroup1
            console.log('新版本定位命令失败，尝试旧版本命令:', newCmdError);
            try {
                await session.call(ak.wwise.ui.commands.execute, [], {
                    command: "FindInProjectExplorerSyncGroup1",
                    objects: [objectId]
                });
                commandSuccess = true;
            } catch (oldCmdError) {
                // 如果两个命令都失败，抛出错误
                console.log('旧版本定位命令也失败:', oldCmdError);
                throw new Error(`Locate failed: ${oldCmdError.error || oldCmdError.message || 'Unknown error'}`);
            }
        }
        
        connection.close();
        return {
            success: true
        };
    } catch (error) {
        connection.close();
        return {
            success: false,
            message: error.error || error.message || 'Locate failed'
        };
    }
}

/**
 * 显示对象到List View
 */
async function showListView(port, objectIds, searchValue = '') {
    const { session, connection } = await createConnection(port);
    try {
        // 执行ShowListView命令
        const commandParams = {
            command: "ShowListView",
            objects: objectIds
        };
        
        // 如果提供了搜索值，添加到参数中
        if (searchValue && searchValue.trim()) {
            commandParams.value = searchValue.trim();
        }
        
        await session.call(ak.wwise.ui.commands.execute, [], commandParams);
        
        connection.close();
        return {
            success: true
        };
    } catch (error) {
        connection.close();
        return {
            success: false,
            message: error.error || error.message || 'Failed to show in List View'
        };
    }
}

/**
 * 显示对象到Multi Editor
 */
async function showMultiEditor(port, objectIds) {
    const { session, connection } = await createConnection(port);
    try {
        // 执行ShowMultiEditor命令
        await session.call(ak.wwise.ui.commands.execute, [], {
            command: "ShowMultiEditor",
            objects: objectIds
        });
        
        connection.close();
        return {
            success: true
        };
    } catch (error) {
        connection.close();
        return {
            success: false,
            message: error.error || error.message || 'Failed to show in Multi Editor'
        };
    }
}

/**
 * 重置音量推子 - 执行
 */
async function resetFadersExecute(port, scope, results) {
    const { session, connection } = await createConnection(port);
    try {
        // 参考示例，不使用Undo Group，直接设置属性
        // 过滤掉已经归零的对象
        const itemsToReset = results.filter(item => item.status !== '已归零');
        
        let count = 0;
        const resetIds = []; // 记录成功重置的对象ID
        // 逐个设置，参考示例中的简单方式
        for (const item of itemsToReset) {
            try {
                // 使用 setProperty API（参考WAAPI标准用法）
                await session.call(ak.wwise.core.object.setProperty, [], {
                    object: item.id,
                    property: item.propertyName,
                    value: 0
                });
                resetIds.push(item.id);
                count++;
            } catch (error) {
                console.error(`重置对象 ${item.name} (${item.id}) 失败:`, error);
            }
        }

        connection.close();
        return {
            success: true,
            count,
            resetIds // 返回成功重置的对象ID列表
        };
    } catch (error) {
        connection.close();
        return {
            success: false,
            message: error.error || error.message || 'Reset failed',
            count: 0
        };
    }
}

/**
 * 删除无效Event - 扫描
 */
async function deleteInvalidEventsScan(port) {
    const { session, connection } = await createConnection(port);
    try {
        const results = [];
        const actionTypesToCheck = new Set([1, 2, 7, 9, 34, 37, 41]); // 引用对象的Action类型

        // 遍历所有Event
        for await (const eventData of walkWproj(session, '\\Events', ['id', 'name', 'path'], ['Event'])) {
            let eventGuid, eventName, eventPath;
            
            if (Array.isArray(eventData)) {
                [eventGuid, eventName, eventPath] = eventData;
            } else {
                eventGuid = eventData.id;
                eventName = eventData.name;
                eventPath = eventData.path;
            }

            let numValidActions = 0;

            // 遍历Event的所有Action
            try {
                for await (const actionData of walkWproj(session, eventGuid, ['id', 'ActionType', 'Target'], ['Action'])) {
                    let actionId, actionType, target;
                    
                    if (Array.isArray(actionData)) {
                        [actionId, actionType, target] = actionData;
                    } else {
                        actionId = actionData.id;
                        actionType = actionData.ActionType;
                        target = actionData.Target;
                    }

                    if (actionTypesToCheck.has(actionType)) {
                        // 检查目标对象是否存在
                        if (target && target.id) {
                            if (await doesObjectExist(session, target.id)) {
                                numValidActions++;
                            }
                        }
                    } else {
                        // 不引用对象的Action，视为有效
                        numValidActions++;
                    }
                }
            } catch (error) {
                // 如果无法获取Action，视为无效Event
            }

            if (numValidActions === 0) {
                results.push({
                    guid: eventGuid,
                    name: eventName || 'N/A',
                    path: eventPath || 'N/A',
                    reason: '所有Action都引用不存在的对象'
                });
            }
        }

        connection.close();
        return {
            success: true,
            results
        };
    } catch (error) {
        connection.close();
        return {
            success: false,
            message: error.error || error.message || '扫描失败',
            results: []
        };
    }
}

/**
 * 删除无效Event - 执行
 */
async function deleteInvalidEventsExecute(port, results) {
    const { session, connection } = await createConnection(port);
    try {
        await beginUndoGroup(session);

        let count = 0;
        for (const item of results) {
            try {
                await deleteObject(session, item.guid);
                count++;
            } catch (error) {
                console.error(`删除Event ${item.name} 失败:`, error);
            }
        }

        await endUndoGroup(session, 'Delete Invalid Events');

        connection.close();
        return {
            success: true,
            count
        };
    } catch (error) {
        connection.close();
        return {
            success: false,
            message: error.error || error.message || 'Delete failed',
            count: 0
        };
    }
}

/**
 * 设置流播放 - 扫描
 */
async function setStreamingScan(port, threshold) {
    const { session, connection } = await createConnection(port);
    try {
        const selectedObjects = await getSelectedObjects(session);
        if (selectedObjects.length === 0) {
            connection.close();
            return {
                success: false,
                message: 'Please select container objects in Wwise first'
            };
        }

        const results = [];

        for (const selectedObj of selectedObjects) {
            const containerGuid = selectedObj.id;

            // 遍历容器下的所有Sound对象
            for await (const soundData of walkWproj(session, containerGuid, ['id', 'name', 'maxDurationSource'], ['Sound'])) {
                let soundId, soundName, maxDurationSource;
                
                if (Array.isArray(soundData)) {
                    [soundId, soundName, maxDurationSource] = soundData;
                } else {
                    soundId = soundData.id;
                    soundName = soundData.name;
                    maxDurationSource = soundData.maxDurationSource;
                }

                if (!maxDurationSource || !maxDurationSource.trimmedDuration) {
                    continue;
                }

                const trimmedDuration = maxDurationSource.trimmedDuration; // 单位：秒
                const shouldSet = trimmedDuration > threshold;

                // 获取当前流播放状态
                const currentStreaming = await getPropertyValue(session, soundId, 'IsStreamingEnabled') || false;

                results.push({
                    id: soundId,
                    name: soundName || 'N/A',
                    duration: trimmedDuration,
                    shouldSet: shouldSet,
                    currentStreaming: currentStreaming
                });
            }
        }

        // 只返回需要设置的对象
        const filteredResults = results.filter(r => r.shouldSet);

        connection.close();
        return {
            success: true,
            results: filteredResults
        };
    } catch (error) {
        connection.close();
        return {
            success: false,
            message: error.error || error.message || '扫描失败',
            results: []
        };
    }
}

/**
 * 设置流播放 - 执行
 */
async function setStreamingExecute(port, threshold, results) {
    const { session, connection } = await createConnection(port);
    try {
        await beginUndoGroup(session);

        let count = 0;
        for (const item of results) {
            if (!item.shouldSet) continue;

            try {
                await setPropertyValue(session, item.id, 'IsStreamingEnabled', true);
                await setPropertyValue(session, item.id, 'IsNonCachable', false);
                await setPropertyValue(session, item.id, 'IsZeroLantency', false);
                await setPropertyValue(session, item.id, 'PreFetchLength', 400);
                count++;
            } catch (error) {
                console.error(`设置对象 ${item.name} 流播放失败:`, error);
            }
        }

        await endUndoGroup(session, 'Bulk Set SFX Streaming');

        connection.close();
        return {
            success: true,
            count
        };
    } catch (error) {
        connection.close();
        return {
            success: false,
            message: error.error || error.message || 'Set failed',
            count: 0
        };
    }
}

/**
 * 删除未使用WAV - 扫描
 */
async function removeUnusedWavsScan(port, originalsPath) {
    const { session, connection } = await createConnection(port);
    try {
        // 获取所有Sound对象引用的音频文件
        const usedFiles = new Set();

        for await (const soundData of walkWproj(session, '\\Actor-Mixer Hierarchy', ['id', 'sound:originalWavFilePath'], ['Sound'])) {
            let soundId, wavPath;
            
            if (Array.isArray(soundData)) {
                [soundId, wavPath] = soundData;
            } else {
                soundId = soundData.id;
                wavPath = soundData['sound:originalWavFilePath'] || soundData.originalWavFilePath;
            }

            if (wavPath) {
                // 标准化路径
                const normalizedPath = path.normalize(wavPath).toLowerCase();
                usedFiles.add(normalizedPath);
            }
        }

        connection.close();

        // 扫描Originals文件夹下的所有WAV文件
        const unusedFiles = [];
        
        function scanDirectory(dir) {
            try {
                const files = fs.readdirSync(dir);
                for (const file of files) {
                    const filePath = path.join(dir, file);
                    const stat = fs.statSync(filePath);
                    
                    if (stat.isDirectory()) {
                        scanDirectory(filePath);
                    } else if (file.toLowerCase().endsWith('.wav')) {
                        const normalizedPath = path.normalize(filePath).toLowerCase();
                        if (!usedFiles.has(normalizedPath)) {
                            unusedFiles.push({
                                path: filePath,
                                size: stat.size,
                                mtime: stat.mtime.getTime()
                            });
                        }
                    }
                }
            } catch (error) {
                console.error(`扫描目录失败: ${dir}`, error);
            }
        }

        if (fs.existsSync(originalsPath)) {
            scanDirectory(originalsPath);
        }

        return {
            success: true,
            results: unusedFiles
        };
    } catch (error) {
        connection.close();
        return {
            success: false,
            message: error.error || error.message || '扫描失败',
            results: []
        };
    }
}

/**
 * 删除未使用WAV - 执行
 */
async function removeUnusedWavsExecute(results) {
    try {
        let count = 0;
        for (const item of results) {
            try {
                if (fs.existsSync(item.path)) {
                    fs.unlinkSync(item.path);
                    count++;
                }
            } catch (error) {
                console.error(`删除文件失败: ${item.path}`, error);
            }
        }

        return {
            success: true,
            count
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || '删除失败',
            count: 0
        };
    }
}

module.exports = {
    testConnection,
    getOriginalsPath,
    resetFadersScan,
    resetFadersExecute,
    deleteInvalidEventsScan,
    deleteInvalidEventsExecute,
    setStreamingScan,
    setStreamingExecute,
    removeUnusedWavsScan,
    removeUnusedWavsExecute,
    locateObject,
    showListView,
    showMultiEditor
};

