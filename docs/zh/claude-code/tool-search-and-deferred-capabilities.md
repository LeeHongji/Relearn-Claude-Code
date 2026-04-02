# 工具搜索与延迟能力发现

Claude Code 的工具系统并不只是固定注册表。源码显示它还支持能力发现、延迟暴露，以及更结构化的输出路径。

## 建议对照的源码位置

- `src/utils/toolSearch.ts`
- `src/tools/ToolSearchTool/ToolSearchTool.ts`
- `src/services/api/claude.ts`
- `src/utils/messages.ts`
- `src/utils/attachments.ts`
- `src/tools/SyntheticOutputTool/SyntheticOutputTool.ts`

## 这部分真正重要的点

大平台常见问题是：

- 工具太多，不能全量粗暴暴露；
- 结构化输出不能只靠 prompt 祈祷模型格式正确。
