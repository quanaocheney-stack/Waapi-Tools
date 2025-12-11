const { app, BrowserWindow, ipcMain, dialog } = require('electron');
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

