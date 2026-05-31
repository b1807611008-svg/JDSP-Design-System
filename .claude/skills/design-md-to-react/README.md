# design-md-to-react

把 wiki `design.md` 渲染成 React 18 + Tailwind v3 + TypeScript 组件代码。

本文件只负责**项目状态、路线图、来源背景**。工作流、token 映射、输出契约等「skill 怎么工作」的内容，全部以 [`SKILL.md`](SKILL.md) 为唯一真相源。

## 当前状态：v0.1 骨架

工作流 + 输出契约 + token 映射表已就位。端到端可执行实现未写。

本 skill 由 `b1807611008-svg/JDSP-Design-System` 的 Cursor skill `/JDSP-ui` 转写而来。转写动机与 token 对齐结论见 [`docs/notes/2026-05-22-jdsp-token-alignment.md`](../../../docs/notes/2026-05-22-jdsp-token-alignment.md)（PR0）。

### 相对上游的关键改动

| 维度 | 上游 JDSP `/JDSP-ui` | 本 skill |
|---|---|---|
| 运行时 | Cursor skill | Claude Code skill |
| 主输入 | Relay 节点 / 自然语言描述 | wiki `design.md`（pipeline 中枢产物） |
| token 源 | 内嵌 `TOKENS.json`（双源，已实测漂移） | 反查主稿 `foundations/tokens/tokens.json`（单源） |
| 命名族 | `/JDSP-ui` | `design-md-to-react`（对齐 `design-md-to-*`） |

## 路线图

| 版本 | 内容 | 依赖 |
|---|---|---|
| **v0.1**（本骨架） | SKILL.md + token-class-map + output-contract | 无 |
| v0.2 | Step 1-3 实现（解析输入 / 定位 token 真源 / 读组件规范） | PR0 已合并 |
| v0.3 | `tokens.json → tailwind.config.js` 转换脚本（语义 class 取代 arbitrary value） | v0.2 |
| v0.4 | Step 4-6（token→class 映射 / 生成 3 文件 / 自检）· Button 端到端跑通 | v0.3 |
| v0.5 | 第二个组件（Tag）验证通用核心 | v0.4 |
| v0.6 | 复合组件（Toast / Modal）· `composites/` 分级验证 | v0.5 |
| v1.0 | page-doc bundle 整页组件树拼装（`layouts/` `pages/`） | v0.6 |

## 依赖与待办

- **PR2**：图标资源管线（svg → sprite → `<Icon>`）。本 skill 的 token-class-map 现仅覆盖图标尺寸，资源接入待 PR2。
- **B4 场景层**：沉浸态 / scene token 待从 Relay 1958 正式抽取登记进主稿 `tokens.json` 的 `scene.immersive` 命名空间后，本 skill 才支持视频沉浸场景组件。
- **字阶决策**：JDSP 越界字号（9/11/16/20pt）是否扩主稿基梯，待设计决策；未定前命中即记入「未覆盖项」。

## Skill 矩阵位置

```text
                            Relay
                          ↗   │   ↘
       relay-to-design-md ┘   │   └ design-md-to-relay
                              ↓
                          design.md ──┬─→ design-md-to-spec-page  → spec HTML
                                       ├─→ design-md-to-portal     → 总站
                                       └─→ design-md-to-react（本）→ React 代码
```
