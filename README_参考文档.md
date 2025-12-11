# Wwise SDK 参考文档

本文档包含 Wwise SDK 和 WAAPI 的官方参考文档链接。

## 📚 Wwise 对象参考

### Wwise Recorder
Wwise Recorder 效果插件的对象参考文档，包含所有属性、引用和列表的详细说明。

🔗 [Wwise Recorder 对象参考](https://www.audiokinetic.com/zh/public-library/2023.1.17_8841/?source=SDK&id=wwiseobject_effect_wwise_recorder.html)

**主要属性：**
- `AmbisonicsChannelOrdering` - Ambisonics 通道排序
- `ApplyDownstreamVolume` - 应用下游音量
- `Format` - 格式（WAV/WEM）
- `DownmixToStereo` - 下混到立体声
- `Center`, `Front`, `Rear`, `Surround`, `LFE` - 各通道音量设置

---

### Wwise 对象索引
Wwise 中所有对象类型的完整索引和参考。

🔗 [Wwise 对象索引](https://www.audiokinetic.com/zh/public-library/2023.1.17_8841/?source=SDK&id=wobjects_index.html)

---

## 🔧 WAAPI 函数参考

### WAAPI 函数索引
Wwise Authoring API 所有可用函数的完整索引和参考。这是查找 WAAPI 函数的入口页面。

🔗 [WAAPI 函数索引](https://www.audiokinetic.com/zh/public-library/2023.1.17_8841/?source=SDK&id=waapi_functions_index.html)

**包含的函数类别：**
- `ak.wwise.core.*` - 核心功能（对象操作、项目操作、音频导入等）
- `ak.wwise.ui.*` - 用户界面操作
- `ak.wwise.waapi.*` - WAAPI 元数据查询
- `ak.soundengine.*` - 声音引擎操作
- `ak.wwise.debug.*` - 调试功能
- `ak.wwise.cli.*` - 命令行接口

---

### ak.wwise.core.object.set
设置 Wwise 对象的属性和引用。

🔗 [ak.wwise.core.object.set 参考](https://www.audiokinetic.com/zh/public-library/2023.1.17_8841/?source=SDK&id=ak_wwise_core_object_set.html)

**用途：**
- 设置对象的属性值
- 设置对象的引用
- 批量更新对象配置

**示例：**
```javascript
// 设置对象属性
ak.wwise.core.object.set({
    object: "object_id",
    property: "Volume",
    value: -3.0
});
```

---

### ak.wwise.core.object.create
创建新的 Wwise 对象。

🔗 [ak.wwise.core.object.create 参考](https://www.audiokinetic.com/zh/public-library/2023.1.17_8841/?source=SDK&id=ak_wwise_core_object_create.html)

**用途：**
- 创建新的音频对象
- 创建事件、Sound、ActorMixer 等
- 设置对象的初始属性

**示例：**
```javascript
// 创建新的 Sound 对象
ak.wwise.core.object.create({
    parent: "parent_id",
    type: "Sound",
    name: "NewSound",
    onNameConflict: "rename"
});
```

---

### ak.wwise.ui.commands.execute
执行 Wwise 设计工具命令。有些命令可将一系列对象作为参数。

🔗 [ak.wwise.ui.commands.execute 参考](https://www.audiokinetic.com/zh/public-library/2023.1.17_8841/?source=SDK&id=ak_wwise_ui_commands_execute.html)

**用途：**
- 执行 Wwise 设计工具中的各种命令
- 在 Project Explorer 中查找并选中对象
- 对对象执行操作（如静音、取消静音等）
- 执行不需要对象参数的命令

**参数：**
- `command` - 所要执行的命令的 ID（必填）
- `objects` - 对象数组（GUID、名称或路径）
- `platforms` - 平台数组（可选）
- `value` - 要传给命令的值（可选）

**示例：**
```javascript
// 在 Project Explorer 中查找并选中对象
ak.wwise.ui.commands.execute({
    command: "FindInProjectExplorer",
    objects: ["{aabbcc00-1122-3344-5566-77889900aabb}"]
});

// 将给定对象静音
ak.wwise.ui.commands.execute({
    command: "Mute",
    objects: ["Event:Play_Sound_01"]
});
```

**相关链接：**
- [Wwise 设计工具命令标识符](https://www.audiokinetic.com/zh/public-library/2023.1.17_8841/?source=SDK&id=globalcommandsids.html) - 查看所有可用命令的完整列表

---

## 📖 相关文档

### 查询 Wwise 工程
了解如何使用 WAAPI 查询 Wwise 工程中的对象和属性。

### 设置属性和引用
- `ak.wwise.core.object.setProperty` - 设置单个属性
- `ak.wwise.core.object.setReference` - 设置引用
- `ak.wwise.core.object.set` - 批量设置（推荐）

### 创建对象
- `ak.wwise.core.object.create` - 创建新对象
- 支持多种对象类型：Sound、Event、ActorMixer、WorkUnit、Folder 等

### 执行 UI 命令
- `ak.wwise.ui.commands.execute` - 执行 Wwise 设计工具命令
- [Wwise 设计工具命令标识符](https://www.audiokinetic.com/zh/public-library/2023.1.17_8841/?source=SDK&id=globalcommandsids.html) - 查看所有可用命令的完整列表
- 支持通过命令 ID 执行各种 UI 操作，如查找对象、静音、取消静音等

---

## 🔍 版本信息

本文档基于 **Wwise SDK 2023.1.17** 版本。

如需查看其他版本的文档，请访问 [Wwise SDK 文档中心](https://www.audiokinetic.com/zh/public-library/)。

---

## 💡 使用建议

1. **开发前查阅**：在开发 WAAPI 相关功能前，先查阅相关对象和函数的参考文档
2. **属性设置**：使用 `ak.wwise.core.object.set` 可以一次性设置多个属性，比单独调用 `setProperty` 更高效
3. **对象创建**：创建对象时注意 `onNameConflict` 参数，避免意外覆盖现有对象
4. **版本兼容**：注意不同 Wwise 版本之间 API 的差异

---

## 🎯 自动添加 Recorder 插件功能

### 功能说明

工具现在支持通过 WAAPI 自动将 Recorder 插件添加到 Master Bus，无需手动操作。

### 使用方法

1. **在工具中启用录制功能**：
   - 勾选"启用录制"选项
   - 工具会自动检测 Recorder 插件是否存在

2. **自动添加插件**：
   - 如果检测到 Recorder 插件不存在，会弹出对话框询问是否自动添加
   - 选择"自动添加"后，工具会：
     - 查找 Master Bus
     - 查找可用的 Effect 插槽
     - 创建 Recorder Effect 对象
     - 将插件添加到 Master Bus

3. **手动添加（可选）**：
   - 如果选择"取消"，可以按照提示手动添加插件

### 技术实现

- **查找 Master Bus**：支持多种路径查找方式，包括标准路径和通过名称查找
- **插件检测**：自动检测 Recorder 插件是否已存在，避免重复添加
- **插槽管理**：自动查找可用的 Effect 插槽（@Effect0 到 @Effect5）
- **错误处理**：提供详细的错误信息，便于排查问题

### 相关代码

- `wwise-recorder.js` - Recorder 插件管理器，包含 `addRecorderToMasterBus()` 方法
- `main.js` - IPC 处理函数 `add-recorder-plugin`
- `index.html` - 前端 UI 集成，自动检测并提示添加插件

---

## 📞 更多资源

- [Wwise SDK 文档中心](https://www.audiokinetic.com/zh/public-library/)
- [Wwise Authoring API 快速入门](https://www.audiokinetic.com/zh/public-library/2023.1.17_8841/?source=SDK&id=waapi_quickstart.html)
- [WAAPI 示例索引](https://www.audiokinetic.com/zh/public-library/2023.1.17_8841/?source=SDK&id=waapi_examples_index.html)

