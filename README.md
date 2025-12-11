# WAAPI 工具箱

基于 Electron 和 WAAPI 的 Wwise 工程管理工具集。

## 📋 功能特点

### 1. 重置音量推子
- 重置选中对象的音量推子
- 支持仅重置选中对象或包含所有子对象
- 自动识别 Bus/AuxBus 使用 BusVolume 属性
- 支持 @ignore 标记跳过

### 2. 删除无效Event
- 扫描工程中所有Event
- 检测所有Action都引用不存在对象的无效Event
- 批量删除无效Event
- 支持Undo Group撤销

### 3. 设置流播放
- 检测选中容器下的所有Sound对象
- 根据时长阈值筛选需要设置流播放的对象
- 批量设置流播放属性
- 可配置时长阈值（默认10秒）

### 4. 删除未使用WAV文件
- 自动检测或手动选择Originals文件夹
- 扫描未被任何Sound对象引用的WAV文件
- 显示文件大小和修改时间
- 批量删除未使用的文件

## 🚀 安装和运行

### 安装依赖

```bash
npm install
```

### 运行程序

```bash
npm start
```

或直接运行：

```bash
electron waapi-tools-main.js
```

## 📖 使用说明

1. **连接Wwise**
   - 确保Wwise已启动并启用WAAPI
   - 默认端口为8080，可在界面中修改

2. **使用功能**
   - 切换到对应的标签页
   - 按照界面提示操作
   - 查看检测结果
   - 确认后执行操作

3. **清除结果**
   - 每个标签页都有"清除结果"按钮
   - 点击可清空当前结果列表

## 🔧 技术栈

- **Electron** - 跨平台桌面应用框架
- **WAAPI** - Wwise Authoring API
- **Autobahn** - WebSocket/WAMP客户端库

## 📝 注意事项

- 删除操作不可撤销，请谨慎操作
- 建议在执行批量操作前先备份工程
- 某些操作使用Undo Group支持撤销（在Wwise中）

## 📚 参考文档

更多WAAPI使用说明请参考 `README_参考文档.md`

