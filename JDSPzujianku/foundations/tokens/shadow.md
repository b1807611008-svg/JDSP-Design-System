---
token_category: shadow
version: 1.0.0
last_updated: 2026-05-22
relay_source: "https://relay.jd.com/file/design?id=1958051135088508929&page_id=862%3A533"
extraction_node: "862:778 (阴影规范段落) + 862:630 (场景示意)"
sync_status: "synced — 3 named shadow levels extracted from text labels; 5 contextual shadows validated via shape effects API"
---

# Shadow Token 规范

## 文档概述与设计理念

阴影体系服务于 **Z 轴 Elevation（海拔高度）** 概念：

- **Z 轴语义**：Z 值越高，元素离底层越远，阴影越扩散、透明度越高（视觉上更"飘"）；Z 值越低，阴影越集中、透明度越高（视觉上更"压"）。
- **沉浸式特殊场景**：视频流页面（深色背景）使用「防穿透阴影」而非传统卡片阴影，以确保图标、文字在任何视频背景色下均可读。3 个官方 Shadow Token 均面向此场景设计。
- **双模式（Light / Dark）**：阴影色统一使用 `#000000`，通过透明度区分层级；Dark 模式下 Shadow 效果通常被背景色本身的深度所弱化，需配合 Dark 模式 Token 降低透明度。
- **性能优先**：禁止在单个元素上叠加 2 层以上 `box-shadow`，禁止对高频刷新元素（如视频帧）使用大模糊值阴影。

---

## 基础阶梯 / Atom 层（核心量化表）

> 数据来源：节点 `862:778` 阴影规范文字标注（3 条原文描述）+ 节点 `862:632`、`862:633`、`862:775` 形状 `effects` 属性双重校验。

### 官方命名 Shadow Token（沉浸式防穿透阴影）

| Token 命名 | 场景定义 | Light 模式参数 | Dark 模式参数 | CSS 写法 |
|:---|:---|:---|:---|:---|
| `shadow_text_heavy` | 复杂背景上**信息类静态文字**（正文、说明） | `0px 0px 2px rgba(0,0,0,0.30)` | `0px 0px 2px rgba(0,0,0,0.30)` | `text-shadow: 0 0 2px rgba(0,0,0,.30)` |
| `shadow_interactive` | 复杂背景上**可点击交互文字**（顶 Tab、点赞/评论数字） | `0px 1px 1px rgba(0,0,0,0.20)` | `0px 1px 1px rgba(0,0,0,0.20)` | `text-shadow: 0 1px 1px rgba(0,0,0,.20)` |
| `shadow_icon_subtle` | 复杂背景上 **Icon 图标突出**（增强图标在浅色视频帧上的辨识度） | `0px 3px 9px rgba(0,0,0,0.12)` | `0px 3px 9px rgba(0,0,0,0.12)` | `filter: drop-shadow(0 3px 9px rgba(0,0,0,.12))` |

> **注意**：沉浸式 3 个 Shadow 均为**不区分 Light / Dark 模式**的"防穿透"设计——因为它们作用于全屏视频背景上，而不是界面背景色上。如需在非沉浸式场景使用，需经设计确认。

### 通用卡片 / 弹层 Shadow（场景验证，非官方命名）

以下为从实际组件节点 `effects` 属性中提取的隐式阴影，设计稿中暂无 Token 命名，以 `shadow_card_*` 前缀提案命名：

| 提案 Token 命名 | 来源节点 | 参数 | 适用场景 |
|:---|:---|:---|:---|
| `shadow_card_sm` | `862:633`（Radius/2 演示块） | `0px 1px 1px rgba(0,0,0,0.20)` | 小型卡片轻微浮起感 |
| `shadow_card_md` | `862:632`（Radius/2 演示块） | `0px 0px 2px rgba(0,0,0,0.30)` | 中等容器聚焦感 |
| `shadow_card_lg` | `862:775`（场景示意块） | `0px 3px 9px rgba(0,0,0,0.12)` | 大型面板 / 弹层浮层感 |
| `shadow_avatar` | `862:844`（头像 Mask） | `0px 1.35px 2.71px rgba(0,0,0,0.35)` | 头像边缘深度阴影 |
| `shadow_icon_heavy` | `862:880`（ICON/56px/分享） | `0px 1px 2px rgba(0,0,0,0.35)` | 互动区大尺寸图标突出 |

---

## 应用场景与语义角色 (Role 层)

### 沉浸式视频流专用映射

| 应用元素 | 语义 Token | 实现方式 | 备注 |
|:---|:---|:---|:---|
| 顶部 Tab 文字 | `shadow_interactive` | `text-shadow` | 防止白色视频帧上文字消失 |
| 点赞 / 评论数字 | `shadow_interactive` | `text-shadow` | 同上；字号 11pt / 粗体 |
| 昵称 / 描述正文 | `shadow_text_heavy` | `text-shadow` | 静态信息类文字 |
| 互动区图标（点赞/评论/分享等） | `shadow_interactive` | `filter: drop-shadow` 或 `shadow_icon_subtle` | 根据图标尺寸选择档位 |
| 右侧互动栏大图标（56px 分享） | `shadow_icon_heavy` | `filter: drop-shadow` | 更强对比度 |

### 通用 UI 场景映射

| 应用元素 | 语义 Token | 备注 |
|:---|:---|:---|
| 商品卡片 | `shadow_card_lg` | 白底背景下卡片悬浮感 |
| Toast / 底部弹层 | `shadow_card_lg` | 弹层与底层内容的分离感 |
| 搜索框 / 圆形按钮 | `0px 6px 50px rgba(0,0,0,0.05)`（验证值来自 `862:786`） | 超大软阴影，仅用于白色背景下悬浮交互元素 |
| 进度条拖拽点 | `0px 1px 4px rgba(0,0,0,0.25)`（来自 `862:829`） | 强调可交互拖拽手柄 |

### 特殊场景：输入框内阴影

| 场景 | 规则 |
|:---|:---|
| 文本输入框聚焦态 | 不使用外阴影，改用 `box-shadow: inset` 内阴影，颜色与品牌主色对应，具体参数待设计补充 |
| 沉浸式底部输入栏（评论框）| 背景为深灰半透，本身不加额外 `shadow`；依赖背景色与视频层分离 |

---

## 反例与使用警示 (Anti-patterns)

| ❌ 反面用法 | 解释 |
|:---|:---|
| 在视频帧上直接叠加 `box-shadow: 0 8px 14px rgba(0,0,0,0.13)` | 卡片级大模糊阴影在沉浸式场景中与 Shadow Token 不一致，且性能差 |
| `box-shadow: 0 6px 50px rgba(0,0,0,0.05)` 用于内容文字 | 超大软阴影仅适合白色背景下的悬浮框架；深色背景无效果且造成冗余渲染 |
| 互动图标使用 `box-shadow`（代替 `drop-shadow`） | `box-shadow` 作用于元素盒子，不贴合 SVG 图标路径；必须使用 `filter: drop-shadow` |
| 多层叠加：同时设置 `text-shadow` + `filter: drop-shadow` | 双重叠加导致视觉过重，每个元素只允许一种 shadow 方案 |
| `blur` 值超过 `9px` 的阴影用于高频重绘元素（如滚动列表卡片）| 大模糊值触发 GPU 光栅化，在低端机滚动时导致 jank |

---

## 异常记录与待办事项 (TODOs)

| 编号 | 类型 | 描述 |
|:---|:---|:---|
| S-01 | ⚠️ 命名缺失 | 官方 3 个沉浸式 Shadow Token 在设计稿中仅有文字描述，无 Token 命名；本文档提案命名待设计系统确认。 |
| S-02 | ⚠️ Dark Mode 未区分 | 3 个防穿透 Shadow 在 Light/Dark 模式下参数相同，但通用卡片阴影在 Dark Mode 下是否需要调整透明度？待设计确认。 |
| S-03 | ⚠️ 头像阴影精度 | `862:844` 头像 Mask 的 `radius` 为 `2.7059`、`offset.y` 为 `1.3529`，为非整数值，疑为缩放引入精度误差；建议设计修正为 `0px 1px 3px rgba(0,0,0,0.35)`。 |
| S-04 | TODO | 通用卡片阴影（`shadow_card_*`）需设计师补充正式 Token 命名，并纳入 Dark Mode 双模式规范。 |
| S-05 | TODO | 是否需要引入 Elevation 层级编号（如 `elevation_1` ~ `elevation_5`）来管理 Z 轴阴影体系？当前设计稿以文字描述场景，缺乏数值化层级映射。 |
