const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        icon: path.join(__dirname, 'icon.ico')
    });

    mainWindow.loadFile('waapi-tools.html');
    
    // 开发时打开调试工具
    // mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// 加载功能模块
const waapiTools = require('./waapi-tools-functions.js');

// 测试WAAPI连接
ipcMain.handle('waapi-test-connection', async (event, port = 8080) => {
    return await waapiTools.testConnection(port);
});

// 显示确认对话框
ipcMain.handle('waapi-show-confirm', async (event, options) => {
    const result = await dialog.showMessageBox(mainWindow, options);
    return result;
});

// 选择文件夹
ipcMain.handle('waapi-select-folder', async (event) => {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory'],
        title: '选择Originals文件夹'
    });
    return result;
});

// 获取Originals路径
ipcMain.handle('waapi-get-originals-path', async (event, port = 8080) => {
    return await waapiTools.getOriginalsPath(port);
});

// 重置音量推子 - 扫描
ipcMain.handle('waapi-reset-faders-scan', async (event, port, scope) => {
    return await waapiTools.resetFadersScan(port, scope);
});

// 重置音量推子 - 执行
ipcMain.handle('waapi-reset-faders-execute', async (event, port, scope, results) => {
    return await waapiTools.resetFadersExecute(port, scope, results);
});

// 删除无效Event - 扫描
ipcMain.handle('waapi-delete-events-scan', async (event, port) => {
    return await waapiTools.deleteInvalidEventsScan(port);
});

// 删除无效Event - 执行
ipcMain.handle('waapi-delete-events-execute', async (event, port, results) => {
    return await waapiTools.deleteInvalidEventsExecute(port, results);
});

// 设置流播放 - 扫描
ipcMain.handle('waapi-set-streaming-scan', async (event, port, threshold) => {
    return await waapiTools.setStreamingScan(port, threshold);
});

// 设置流播放 - 执行
ipcMain.handle('waapi-set-streaming-execute', async (event, port, threshold, results) => {
    return await waapiTools.setStreamingExecute(port, threshold, results);
});

// 删除未使用WAV - 扫描
ipcMain.handle('waapi-remove-wavs-scan', async (event, port, originalsPath) => {
    return await waapiTools.removeUnusedWavsScan(port, originalsPath);
});

// 删除未使用WAV - 执行
ipcMain.handle('waapi-remove-wavs-execute', async (event, results) => {
    return await waapiTools.removeUnusedWavsExecute(results);
});

// 定位对象到Wwise窗口
ipcMain.handle('waapi-locate-object', async (event, port, objectId) => {
    return await waapiTools.locateObject(port, objectId);
});

// 复制到剪贴板
ipcMain.handle('copy-to-clipboard', async (event, text) => {
    const { clipboard } = require('electron');
    clipboard.writeText(text);
    return { success: true };
});

// 显示对象到List View
ipcMain.handle('waapi-show-list-view', async (event, port, objectIds, searchValue) => {
    return await waapiTools.showListView(port, objectIds, searchValue);
});

// 显示对象到Multi Editor
ipcMain.handle('waapi-show-multi-editor', async (event, port, objectIds) => {
    return await waapiTools.showMultiEditor(port, objectIds);
});

// 开始录制
ipcMain.handle('waapi-start-recording', async (event, port, recordingPath, recordingMode, maxDuration) => {
    const result = await waapiTools.runRecording(port, {
        recordingPath,
        recordingMode: recordingMode || 'auto', // 'auto' 或 'manual'
        maxDuration: maxDuration || 30,
        progressCallback: (progress) => {
            if (mainWindow && !mainWindow.isDestroyed()) {
                mainWindow.webContents.send('recording-progress', progress);
            }
        }
    });
    
    // 录制完成后发送文件列表
    if (result.success && result.files && result.files.length > 0) {
        if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.webContents.send('recording-complete', { files: result.files });
        }
    }
    
    return result;
});

// 停止录制
ipcMain.handle('waapi-stop-recording', async () => {
    return waapiTools.requestStopRecording();
});

// 重命名录制文件（手动停止后使用）
ipcMain.handle('waapi-rename-recording', async (event, recordingPath, objectName) => {
    try {
        const WwiseRecorder = require('./wwise-recorder');
        const recorder = new WwiseRecorder();
        recorder.setRecordingPath(recordingPath);
        
        // 检查文件是否存在
        if (!fs.existsSync(recordingPath)) {
            return { success: false, error: '录制文件不存在' };
        }
        
        const newPath = recorder.renameRecordingFile(objectName);
        return { success: true, path: newPath };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

// 选择录制路径
ipcMain.handle('waapi-select-recording-path', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
        title: '选择录制保存目录',
        properties: ['openDirectory'],
        message: '选择保存目录后，工具会自动添加 Record.wav 文件名。\n\n提示：您也可以直接从 Wwise Recorder 插件的 "Authoring Tool Output Path" 中复制完整路径（包含 Record.wav）到输入框。'
    });
    
    if (result.canceled) {
        return { canceled: true };
    }
    
    const selectedPath = result.filePaths[0];
    const recordingPath = path.join(selectedPath, 'Record.wav');
    
    return { 
        success: true, 
        path: recordingPath,
        directory: selectedPath
    };
});

// 打开文件
ipcMain.handle('waapi-open-file', async (event, filePath) => {
    try {
        // 检查文件是否存在
        if (!fs.existsSync(filePath)) {
            return { success: false, error: '文件不存在' };
        }
        
        // 使用系统默认程序打开文件
        await shell.openPath(filePath);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

// 打开文件夹
ipcMain.handle('waapi-open-folder', async (event, folderPath) => {
    try {
        // 检查文件夹是否存在
        if (!fs.existsSync(folderPath)) {
            return { success: false, error: '文件夹不存在' };
        }
        
        // 使用系统默认程序打开文件夹
        await shell.openPath(folderPath);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

