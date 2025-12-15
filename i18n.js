// 国际化文本配置
const i18n = {
    zh: {
        title: '🔧 WAAPI 工具箱',
        port: '端口',
        connected: '已连接',
        disconnected: '未连接',
        connect: '连接',
        reconnect: '重新连接',
        connecting: '连接中...',
        tabs: {
            resetFaders: '重置音量推子',
            deleteEvents: '删除无效Event',
            setStreaming: '设置流播放',
            removeWavs: '删除未使用WAV'
        },
        resetFaders: {
            info: '重置选中对象的音量推子。可以选择仅重置选中对象本身，或重置选中对象及其所有子对象。',
            scopeSelected: '选中的对象',
            scopeChildren: '选中对象的子对象',
            scanBtn: '开始检测',
            scanBtnScanning: '检测中...',
            scanSuccess: '检测完成',
            confirmBtn: '确认重置',
            confirmBtnResetting: '重置中...',
            resultsTitle: '检测结果',
            resultsCount: '个对象',
            nonZeroCount: '未归零',
            nonZeroListTitle: '未归零对象：',
            clearBtn: '清除结果',
            tableHeaders: {
                locate: '定位',
                index: '序号',
                name: '对象名称',
                type: '类型',
                volume: '原音量',
                status: '状态'
            },
            emptyState: '请点击"开始检测"按钮',
            allZeroed: '所有对象已归零，无需重置',
            confirmTitle: '确认重置',
            confirmMessage: '确定要重置 {count} 个对象的音量推子吗？',
            successMessage: '成功重置 {count} 个对象的音量推子',
            alertNotConnected: '请先连接到Wwise',
            alertScanFailed: '检测失败',
            alertResetFailed: '重置失败',
            statusPending: '待重置',
            statusZeroed: '已归零',
            statusReset: '已重置',
            listViewBtn: '显示到List View',
            listViewBtnLoading: '显示中...',
            listViewSuccess: '已显示到List View',
            listViewFailed: '显示到List View失败',
            listViewNoObjects: '没有有效的对象ID',
            multiEditorBtn: '显示到Multi Editor',
            multiEditorBtnLoading: '显示中...',
            multiEditorSuccess: '已显示到Multi Editor',
            multiEditorFailed: '显示到Multi Editor失败',
            multiEditorNoObjects: '没有有效的对象ID'
        },
        deleteEvents: {
            info: '扫描工程中所有Event，找出所有Action都引用不存在对象的无效Event。',
            scanBtn: '扫描无效Event',
            scanBtnScanning: '扫描中...',
            scanSuccess: '扫描完成',
            scanNoResults: '扫描完成：未找到无效Event',
            confirmBtn: '确认删除',
            confirmBtnDeleting: '删除中...',
            resultsTitle: '扫描结果',
            resultsCount: '个Event',
            clearBtn: '清除结果',
            tableHeaders: {
                locate: '定位',
                index: '序号',
                name: 'Event名称',
                guid: '路径',
                reason: '无效原因'
            },
            listViewBtn: '显示到List View',
            listViewBtnLoading: '显示中...',
            listViewSuccess: '已显示到List View',
            listViewFailed: '显示到List View失败',
            listViewNoObjects: '没有有效的对象ID',
            multiEditorBtn: '显示到Multi Editor',
            multiEditorBtnLoading: '显示中...',
            multiEditorSuccess: '已显示到Multi Editor',
            multiEditorFailed: '显示到Multi Editor失败',
            multiEditorNoObjects: '没有有效的对象ID',
            emptyState: '请点击"扫描无效Event"按钮',
            confirmTitle: '确认删除',
            confirmMessage: '确定要删除 {count} 个无效Event吗？此操作不可撤销！',
            successMessage: '成功删除 {count} 个无效Event',
            alertNotConnected: '请先连接到Wwise',
            alertScanFailed: '扫描失败',
            alertDeleteFailed: '删除失败',
            defaultReason: '所有Action都引用不存在的对象'
        },
        setStreaming: {
            info: '检测选中容器下的所有Sound对象，为时长超过阈值的对象设置流播放属性。',
            thresholdLabel: '时长阈值（秒）',
            scanBtn: '检测选中容器',
            scanBtnScanning: '检测中...',
            scanSuccess: '检测完成',
            scanNoResults: '检测完成：未找到满足条件的对象',
            confirmBtn: '确认设置',
            confirmBtnSetting: '设置中...',
            resultsTitle: '检测结果',
            resultsCount: '个对象',
            clearBtn: '清除结果',
            tableHeaders: {
                locate: '定位',
                index: '序号',
                name: '对象名称',
                duration: '当前时长（秒）',
                shouldSet: '满足条件',
                currentStatus: '当前流播放状态'
            },
            listViewBtn: '显示到List View',
            listViewBtnLoading: '显示中...',
            listViewSuccess: '已显示到List View',
            listViewFailed: '显示到List View失败',
            listViewNoObjects: '没有有效的对象ID',
            multiEditorBtn: '显示到Multi Editor',
            multiEditorBtnLoading: '显示中...',
            multiEditorSuccess: '已显示到Multi Editor',
            multiEditorFailed: '显示到Multi Editor失败',
            multiEditorNoObjects: '没有有效的对象ID',
            emptyState: '请点击"检测选中容器"按钮',
            confirmTitle: '确认设置',
            confirmMessage: '确定要为 {count} 个对象设置流播放吗？',
            successMessage: '成功为 {count} 个对象设置流播放',
            yes: '是',
            no: '否',
            enabled: '已启用',
            disabled: '未启用',
            alertNotConnected: '请先连接到Wwise',
            alertScanFailed: '检测失败',
            alertSetFailed: '设置失败'
        },
        removeWavs: {
            info: '扫描Originals文件夹，找出未被任何Sound对象引用的WAV文件。',
            pathPlaceholder: '未选择文件夹',
            selectBtn: '选择文件夹',
            scanBtn: '扫描未使用文件',
            scanBtnScanning: '扫描中...',
            confirmBtn: '确认删除',
            confirmBtnDeleting: '删除中...',
            resultsTitle: '扫描结果',
            resultsCount: '个文件',
            clearBtn: '清除结果',
            tableHeaders: {
                index: '序号',
                path: '文件路径',
                size: '文件大小',
                mtime: '最后修改时间'
            },
            emptyState: '请点击"扫描未使用文件"按钮',
            confirmTitle: '确认删除',
            confirmMessage: '确定要删除 {count} 个未使用的WAV文件吗？\n总大小: {size} MB\n此操作不可撤销！',
            successMessage: '成功删除 {count} 个文件',
            alertNotConnected: '请先连接到Wwise',
            alertNoPath: '请先选择Originals文件夹',
            alertScanFailed: '扫描失败',
            alertDeleteFailed: '删除失败'
        },
        theme: {
            light: '浅色',
            dark: '深色'
        },
        language: {
            zh: '中文',
            en: 'English'
        },
        common: {
            cancel: '取消',
            confirm: '确认'
        },
        log: {
            title: '📋 日志',
            clear: '清除',
            getSelectedSuccess: '成功获取 {count} 个选中对象: {names}{more}',
            getSelectedEmpty: '⚠️ 未选中任何对象',
            getSelectedFailed: '获取选中对象失败: {error}',
            scanStart: '🔍 开始扫描重置音量推子...',
            scanFailedNoSelection: '❌ 扫描失败: 请先在Wwise中选择要重置的对象',
            scanComplete: '✅ 扫描完成，找到 {count} 个对象',
            scanFailed: '❌ 扫描失败: {error}',
            unknown: '未知',
            andMore: ' 等 {count} 个对象'
        }
    },
    en: {
        title: '🔧 WAAPI Tools',
        port: 'Port',
        connected: 'Connected',
        disconnected: 'Disconnected',
        connect: 'Connect',
        reconnect: 'Reconnect',
        connecting: 'Connecting...',
        tabs: {
            resetFaders: 'Reset Faders',
            deleteEvents: 'Delete Invalid Events',
            setStreaming: 'Set Streaming',
            removeWavs: 'Remove Unused WAVs'
        },
        resetFaders: {
            info: 'Reset volume faders of selected objects. You can choose to reset only the selected object or include all child objects.',
            scopeSelected: 'Selected Objects',
            scopeChildren: 'Children of Selected Objects',
            scanBtn: 'Start Scan',
            scanBtnScanning: 'Scanning...',
            scanSuccess: 'Scan completed',
            confirmBtn: 'Confirm Reset',
            confirmBtnResetting: 'Resetting...',
            resultsTitle: 'Scan Results',
            resultsCount: ' objects',
            nonZeroCount: 'non-zero',
            nonZeroListTitle: 'Non-zero Objects:',
            clearBtn: 'Clear Results',
            tableHeaders: {
                locate: 'Locate',
                index: 'No.',
                name: 'Object Name',
                type: 'Type',
                volume: 'Original Volume',
                status: 'Status'
            },
            emptyState: 'Please click "Start Scan" button',
            allZeroed: 'All objects are zeroed, no reset needed',
            confirmTitle: 'Confirm Reset',
            confirmMessage: 'Are you sure you want to reset volume faders for {count} objects?',
            successMessage: 'Successfully reset volume faders for {count} objects',
            alertNotConnected: 'Please connect to Wwise first',
            alertScanFailed: 'Scan failed',
            alertResetFailed: 'Reset failed',
            statusPending: 'Pending Reset',
            statusZeroed: 'Already Zero',
            statusReset: 'Reset',
            listViewBtn: 'Show in List View',
            listViewBtnLoading: 'Showing...',
            listViewSuccess: 'Shown in List View',
            listViewFailed: 'Failed to show in List View',
            listViewNoObjects: 'No valid object IDs'
        },
        deleteEvents: {
            info: 'Scan all Events in the project to find invalid Events where all Actions reference non-existent objects.',
            scanBtn: 'Scan Invalid Events',
            scanBtnScanning: 'Scanning...',
            scanSuccess: 'Scan completed',
            scanNoResults: 'Scan completed: No invalid Events found',
            confirmBtn: 'Confirm Delete',
            confirmBtnDeleting: 'Deleting...',
            resultsTitle: 'Scan Results',
            resultsCount: ' Events',
            clearBtn: 'Clear Results',
            tableHeaders: {
                locate: 'Locate',
                index: 'No.',
                name: 'Event Name',
                guid: 'Path',
                reason: 'Reason'
            },
            listViewBtn: 'Show in List View',
            listViewBtnLoading: 'Showing...',
            listViewSuccess: 'Shown in List View',
            listViewFailed: 'Failed to show in List View',
            listViewNoObjects: 'No valid object IDs',
            multiEditorBtn: 'Show in Multi Editor',
            multiEditorBtnLoading: 'Showing...',
            multiEditorSuccess: 'Shown in Multi Editor',
            multiEditorFailed: 'Failed to show in Multi Editor',
            multiEditorNoObjects: 'No valid object IDs',
            emptyState: 'Please click "Scan Invalid Events" button',
            confirmTitle: 'Confirm Delete',
            confirmMessage: 'Are you sure you want to delete {count} invalid Events? This operation cannot be undone!',
            successMessage: 'Successfully deleted {count} invalid Events',
            alertNotConnected: 'Please connect to Wwise first',
            alertScanFailed: 'Scan failed',
            alertDeleteFailed: 'Delete failed',
            defaultReason: 'All Actions reference non-existent objects'
        },
        setStreaming: {
            info: 'Detect all Sound objects under the selected container and set streaming property for objects exceeding the duration threshold.',
            thresholdLabel: 'Duration Threshold (seconds)',
            scanBtn: 'Scan Selected Container',
            scanBtnScanning: 'Scanning...',
            scanSuccess: 'Scan completed',
            scanNoResults: 'Scan completed: No objects found that meet the criteria',
            confirmBtn: 'Confirm Set',
            confirmBtnSetting: 'Setting...',
            resultsTitle: 'Scan Results',
            resultsCount: ' objects',
            clearBtn: 'Clear Results',
            tableHeaders: {
                locate: 'Locate',
                index: 'No.',
                name: 'Object Name',
                duration: 'Duration (seconds)',
                shouldSet: 'Meets Condition',
                currentStatus: 'Current Streaming Status'
            },
            listViewBtn: 'Show in List View',
            listViewBtnLoading: 'Showing...',
            listViewSuccess: 'Shown in List View',
            listViewFailed: 'Failed to show in List View',
            listViewNoObjects: 'No valid object IDs',
            multiEditorBtn: 'Show in Multi Editor',
            multiEditorBtnLoading: 'Showing...',
            multiEditorSuccess: 'Shown in Multi Editor',
            multiEditorFailed: 'Failed to show in Multi Editor',
            multiEditorNoObjects: 'No valid object IDs',
            emptyState: 'Please click "Scan Selected Container" button',
            confirmTitle: 'Confirm Set',
            confirmMessage: 'Are you sure you want to set streaming for {count} objects?',
            successMessage: 'Successfully set streaming for {count} objects',
            yes: 'Yes',
            no: 'No',
            enabled: 'Enabled',
            disabled: 'Disabled',
            alertNotConnected: 'Please connect to Wwise first',
            alertScanFailed: 'Scan failed',
            alertSetFailed: 'Set failed'
        },
        removeWavs: {
            info: 'Scan the Originals folder to find WAV files that are not referenced by any Sound objects.',
            pathPlaceholder: 'No folder selected',
            selectBtn: 'Select Folder',
            scanBtn: 'Scan Unused Files',
            scanBtnScanning: 'Scanning...',
            confirmBtn: 'Confirm Delete',
            confirmBtnDeleting: 'Deleting...',
            resultsTitle: 'Scan Results',
            resultsCount: ' files',
            clearBtn: 'Clear Results',
            tableHeaders: {
                index: 'No.',
                path: 'File Path',
                size: 'File Size',
                mtime: 'Last Modified'
            },
            emptyState: 'Please click "Scan Unused Files" button',
            confirmTitle: 'Confirm Delete',
            confirmMessage: 'Are you sure you want to delete {count} unused WAV files?\nTotal size: {size} MB\nThis operation cannot be undone!',
            successMessage: 'Successfully deleted {count} files',
            alertNotConnected: 'Please connect to Wwise first',
            alertNoPath: 'Please select Originals folder first',
            alertScanFailed: 'Scan failed',
            alertDeleteFailed: 'Delete failed'
        },
        theme: {
            light: 'Light',
            dark: 'Dark'
        },
        language: {
            zh: '中文',
            en: 'English'
        },
        common: {
            cancel: 'Cancel',
            confirm: 'Confirm'
        },
        log: {
            title: '📋 Log',
            clear: 'Clear',
            getSelectedSuccess: '✅ Successfully retrieved {count} selected objects: {names}{more}',
            getSelectedEmpty: '⚠️ No objects selected',
            getSelectedFailed: 'Failed to get selected objects: {error}',
            scanStart: '🔍 Starting reset faders scan...',
            scanFailedNoSelection: '❌ Scan failed: Please select objects in Wwise first',
            scanComplete: '✅ Scan completed, found {count} objects',
            scanFailed: '❌ Scan failed: {error}',
            unknown: 'Unknown',
            andMore: ' and {count} more objects'
        }
    }
};

// 获取当前语言
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'zh';
}

// 设置语言
function setLanguage(lang) {
    localStorage.setItem('language', lang);
    return i18n[lang];
}

// 获取翻译文本
function t(key, params = {}) {
    const lang = getCurrentLanguage();
    const keys = key.split('.');
    let value = i18n[lang];
    
    for (const k of keys) {
        value = value?.[k];
    }
    
    if (typeof value === 'string' && params) {
        return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
            return params[paramKey] !== undefined ? params[paramKey] : match;
        });
    }
    
    return value || key;
}

// 导出供其他文件使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { i18n, getCurrentLanguage, setLanguage, t };
}

