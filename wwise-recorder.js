const path = require('path');
const fs = require('fs');

/**
 * Wwise Recorder 文件管理器（简化版 - 仅处理文件重命名）
 */
class WwiseRecorder {
    constructor(recordingPath = null) {
        this.recordingPath = recordingPath; // 录制输出路径（应包含 Record.wav）
    }

    /**
     * 设置录制路径（仅保存路径，不进行任何 WAAPI 操作）
     * @param {string} recordingPath - 完整的录制文件路径（应包含 Record.wav）
     */
    setRecordingPath(recordingPath) {
        // 确保路径以 Record.wav 结尾
        let finalPath = recordingPath;
        if (!finalPath.endsWith('Record.wav')) {
            const dir = path.dirname(finalPath);
            finalPath = path.join(dir, 'Record.wav');
        }
        
        this.recordingPath = finalPath;
        console.log(`录制路径已设置: ${finalPath}`);
        return finalPath;
    }

    /**
     * 重命名录制文件
     * @param {string} objectName - 对象名称（用于生成新文件名）
     * @param {string} format - 文件格式（默认: 'wav'）
     * @returns {string} 新文件路径
     */
    renameRecordingFile(objectName, format = 'wav') {
        if (!this.recordingPath || !fs.existsSync(this.recordingPath)) {
            throw new Error(`录制文件不存在: ${this.recordingPath}`);
        }

        // 清理文件名中的非法字符
        const safeName = objectName.replace(/[<>:"/\\|?*]/g, '_');
        const dir = path.dirname(this.recordingPath);
        let newPath = path.join(dir, `${safeName}.${format}`);
        
        // 如果文件已存在，添加序号避免冲突
        let counter = 1;
        while (fs.existsSync(newPath)) {
            newPath = path.join(dir, `${safeName}_${counter}.${format}`);
            counter++;
        }

        // 重命名文件
        fs.renameSync(this.recordingPath, newPath);
        console.log(`录制文件已重命名: ${path.basename(this.recordingPath)} -> ${path.basename(newPath)}`);
        
        return newPath;
    }
}

module.exports = WwiseRecorder;
