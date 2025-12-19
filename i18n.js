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
            audioRecording: '音频录制',
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
            info: '检测选中的对象（Sound、MusicTrack等）或容器下的所有Sound和音乐对象（MusicSegment、MusicPlaylistContainer、MusicSwitchContainer、MusicTrack），为时长超过阈值的对象设置流播放属性。',
            thresholdLabel: '时长阈值（秒）',
            scanBtn: '检测选中对象',
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
                type: '类型',
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
        audioRecording: {
            info: '录制Wwise中选中的音频对象。支持自动模式（播放完成后自动停止）和手动模式（指定录制时长）。',
            pathLabel: '录制路径:',
            pathPlaceholder: '从Recorder 插件复制路径...',
            selectPathBtn: '选择',
            recordingModeLabel: '录制模式:',
            recordingModeAuto: '自动',
            recordingModeManual: '手动',
            autoModeHint: '播放完成后自动停止',
            manualModeHint: '持续录制到指定时长才停止',
            recordingDurationLabel: '录制时长:',
            recordingDurationUnit: '秒',
            startBtn: '开始录制',
            stopBtn: '停止',
            stopping: '停止中...',
            recording: '正在录制...',
            complete: '录制完成 - 共 {count} 个对象',
            failed: '录制失败',
            stopped: '录制已停止',
            recordingProgress: '正在录制: {item} ({current}/{total})',
            openFile: '打开文件',
            alertNoPath: '请先设置录制路径',
            alertNotConnected: '请先连接到Wwise',
            alertPathNotExist: '录制路径不存在',
            alertPathNotWritable: '录制路径不可写',
            alertInvalidDuration: '请输入有效的录制时长（1-3600秒）',
            alertFailed: '录制失败',
            alertNoFolder: '录制目录路径不存在',
            emptyState: '请点击"开始录制"按钮',
            pathHelpTitle: '📋 如何获取录制路径：',
            pathHelp1: '1. 在 Wwise 中打开 Master Bus → Effect Chain → Recorder 插件',
            pathHelp2: '2. 在 "Authoring Tool Output Path" 中设置路径',
            pathHelp3: '3. 确保文件名使用 "Record.wav"',
            pathHelp4: '4. 将完整路径复制到上方输入框（例如：C:\\Users\\...\\Record.wav）',
            pathHelpNote: '注意：工具会在录制完成后自动将 Record.wav 重命名为对应对象名称'
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
            audioRecording: 'Audio Recording',
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
            info: 'Detect selected objects (Sound, MusicTrack, etc.) or all Sound and Music objects (MusicSegment, MusicPlaylistContainer, MusicSwitchContainer, MusicTrack) under the selected container and set streaming property for objects exceeding the duration threshold.',
            thresholdLabel: 'Duration Threshold (seconds)',
            scanBtn: 'Scan Selected Objects',
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
                type: 'Type',
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
            emptyState: 'Please click "Scan Selected Objects" button',
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
        audioRecording: {
            info: 'Record selected audio objects in Wwise. Supports auto mode (auto stop after playback) and manual mode (specified recording duration).',
            pathLabel: 'Recording Path:',
            pathPlaceholder: 'Copy path from Wwise Recorder plugin...',
            selectPathBtn: 'Select',
            recordingModeLabel: 'Recording Mode:',
            recordingModeAuto: 'Auto',
            recordingModeManual: 'Manual',
            autoModeHint: 'Auto stop after playback completes',
            manualModeHint: 'Continue recording until specified duration',
            recordingDurationLabel: 'Recording Duration:',
            recordingDurationUnit: 'sec',
            startBtn: 'Start Recording',
            stopBtn: 'Stop',
            stopping: 'Stopping...',
            recording: 'Recording...',
            complete: 'Recording Complete - {count} objects',
            failed: 'Recording Failed',
            stopped: 'Recording Stopped',
            recordingProgress: 'Recording: {item} ({current}/{total})',
            openFile: 'Open File',
            alertNoPath: 'Please set recording path first',
            alertNotConnected: 'Please connect to Wwise first',
            alertPathNotExist: 'Recording path does not exist',
            alertPathNotWritable: 'Recording path is not writable',
            alertInvalidDuration: 'Please enter a valid recording duration (1-3600 seconds)',
            alertFailed: 'Recording failed',
            alertNoFolder: 'Recording directory path does not exist',
            emptyState: 'Please click "Start Recording" button',
            pathHelpTitle: '📋 How to Get Recording Path:',
            pathHelp1: '1. Open Master Bus → Effect Chain → Recorder plugin in Wwise',
            pathHelp2: '2. Set path in "Authoring Tool Output Path"',
            pathHelp3: '3. Make sure filename is "Record.wav"',
            pathHelp4: '4. Copy full path to input box above (e.g., C:\\Users\\...\\Record.wav)',
            pathHelpNote: 'Note: Tool will automatically rename Record.wav to object name after recording'
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

