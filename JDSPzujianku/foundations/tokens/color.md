---
token_category: color
version: "1.0"
last_updated: "2026-05-21"
relay_source: "https://relay.jd.com/file/design?id=1958051135088508929&title=%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83-%E8%A7%86%E9%A2%91&page_id=862%3A1&PAGE_LOAD_MODE=1"
extraction_status:
  scope_node: "862:1 -> 1384:1"
  extracted_token_count: 22
  coverage: "已覆盖该色彩规范主框架可访问变量；部分节点接口受 nodeId 校验限制，采用主框架变量集作为发布基线。"
---

# Color Tokens 规范

## 文档概述与架构说明

本色彩体系采用四层结构组织，确保设计到工程的可追踪映射：

1. `组件层`：业务组件消费语义色彩（例如按钮、文本、蒙层）。
2. `语义 Token 层`：`color/*`、`Color/*` 命名空间定义用途语义。
3. `Atom 层`：原子色板引用（本次 MCP 返回未显式提供独立 atom 命名，保留为待补）。
4. `值层`：最终 `Hex / RGBA` 输出值，作为工程落地值。

## 版本重大变化对比 (Changelog)

当前任务为首版独立 `tokens/color.md` 建档，无历史结构化版本可比。  
本次核心设计理念：

- 统一以语义命名驱动组件用色，避免组件直接消费裸 hex。
- 保留沉浸态（immerse）与常规态并行命名，支持场景切换。
- 覆盖文本/背景/服务色/蒙层/品牌色/状态色，形成基础可发布最小集。

## 色彩 Token 分组表格

### 主色 Primary

| Token | Atom | 场景说明 | Hex 值 |
|---|---|---|---|
| `color/primary` | `N/A (MCP未返回)` | 品牌主色、主行动点 | Light: `#ff0f23` / Dark: `N/A` |
| `color/primary-light` | `N/A (MCP未返回)` | 品牌主色低明度态/暗背景补偿 | Light: `#4c1c20` / Dark: `N/A` |

**Rationale**：主色组用于定义品牌识别和主交互强调，`primary-light` 作为对比环境下的降噪补偿色，避免强饱和红在深色场景过曝。

### 文本 Text

| Token | Atom | 场景说明 | Hex 值 |
|---|---|---|---|
| `color/text` | `N/A (MCP未返回)` | 常规正文文本 | Light: `#3d414d` / Dark: `N/A` |
| `color/title` | `N/A (MCP未返回)` | 标题文本（原命名保留） | Light: `#171a26` / Dark: `N/A` |
| `color/text_help` | `N/A (MCP未返回)` | 辅助文本/次要信息 | Light: `#828794` / Dark: `N/A` |
| `color/title_immerse` | `N/A (MCP未返回)` | 沉浸态标题文本 | Light: `#ffffff` / Dark: `N/A` |
| `color/text_immerse_help` | `N/A (MCP未返回)` | 沉浸态辅助文本 | Light: `#ffffffb2` / Dark: `N/A` |
| `color/text_disable` | `N/A (MCP未返回)` | 禁用文本 | Light: `#666666` / Dark: `N/A` |
| `Color/文本 Text/color_text_help` | `N/A (MCP未返回)` | 文本辅助色（跨命名空间重复） | Light: `#828794` / Dark: `N/A` |

**Rationale**：文本组通过对比度阶梯区分信息权重；沉浸态以白色及透明白体系保证视频背景上的可读性。

### 背景 Background

| Token | Atom | 场景说明 | Hex 值 |
|---|---|---|---|
| `color/background 1` | `N/A (MCP未返回)` | 深底背景层 | Light: `#333333` / Dark: `N/A` |
| `color/background 2` | `N/A (MCP未返回)` | 沉浸/底栏背景 | Light: `#1f1f1f` / Dark: `N/A` |
| `color/background 5` | `N/A (MCP未返回)` | 半透明背景叠层 | Light: `#171a2657` / Dark: `N/A` |

**Rationale**：背景组覆盖纯色深底与透明叠层，支持内容层、交互层与沉浸遮罩的深浅分离。

### 蒙层与分割 Mask / Line

| Token | Atom | 场景说明 | Hex 值 |
|---|---|---|---|
| `color/mask 1` | `N/A (MCP未返回)` | 强蒙层 | Light: `#141414b2` / Dark: `N/A` |
| `color/mask 2` | `N/A (MCP未返回)` | 弱蒙层 | Light: `#14141466` / Dark: `N/A` |
| `color/line` | `N/A (MCP未返回)` | 分割线 | Light: `#ffffff14` / Dark: `N/A` |

**Rationale**：蒙层和分割组通过 alpha 分级控制层次，不引入新的色相，确保界面一致性和可维护性。

### 服务色 Service

| Token | Atom | 场景说明 | Hex 值 |
|---|---|---|---|
| `color/service` | `N/A (MCP未返回)` | 服务模块底色 | Light: `#2b2723` / Dark: `N/A` |
| `color/service-btnbg` | `N/A (MCP未返回)` | 服务按钮背景 | Light: `#4d3b2a` / Dark: `N/A` |
| `color/service-btntext 1` | `N/A (MCP未返回)` | 服务按钮文字主态 | Light: `#ccb8a3` / Dark: `N/A` |
| `color/service-btntext 2` | `N/A (MCP未返回)` | 服务按钮文字次态 | Light: `#b87c3f` / Dark: `N/A` |
| `color/hotlist_text` | `N/A (MCP未返回)` | 热榜文本强调 | Light: `#756500` / Dark: `N/A` |
| `color/color_link` | `N/A (MCP未返回)` | 链接文本 | Light: `#72b8ff` / Dark: `N/A` |

**Rationale**：服务色组使用暖色系与中性深底组合，形成业务区分度；链接色保留冷色对比以满足可点击元素识别。

### 状态色（种草）

| Token | Atom | 场景说明 | Hex 值 |
|---|---|---|---|
| `color/Recommend_btnbg` | `N/A (MCP未返回)` | 种草按钮背景 | Light: `#15ba64` / Dark: `N/A` |
| `color/Recommend_btntext` | `N/A (MCP未返回)` | 种草按钮文本 | Light: `#14ad5d` / Dark: `N/A` |

**Rationale**：种草状态采用同色相近邻色（背景/文字）形成状态统一识别，同时维持与品牌红体系的功能区隔。

## 底层 Atom 层（原子色板）汇总

本次 MCP 数据返回为“语义 Token -> 终值（hex/rgba）”结构，未提供独立 atom 名（如 `gray_1~10`、`red_1~7`）映射。  
当前可确认的原子色族候选（按值聚类）：

- Gray / Neutral: `#171a26`, `#3d414d`, `#828794`, `#666666`, `#333333`
- Brand Red: `#ff0f23`, `#4c1c20`
- White Alpha: `#ffffff`, `#ffffffb2`, `#ffffff14`
- Mask Black Alpha: `#141414b2`, `#14141466`
- Service Warm: `#2b2723`, `#4d3b2a`, `#ccb8a3`, `#b87c3f`, `#756500`
- Link / Functional: `#72b8ff`
- Recommend Green: `#15ba64`, `#14ad5d`

> 说明：上述为“引用到的基础色族聚类”，并非设计稿内已命名 Atom 表。后续需由设计侧补充 atom 命名文件。

## 异常记录与待办事项 (TODOs)

### 异常记录

- ⚠️ 大小写命名空间不一致：`Color/文本 Text/color_text_help` 与 `color/*` 并存。
- ⚠️ 命名风格不统一：`color/service-btntext 1` / `color/service-btntext 2` 含空格+序号。
- ⚠️ 语义重复：`color/text_help` 与 `Color/文本 Text/color_text_help` 终值相同（均为 `#828794`）。

### TODO 列表

1. 设计侧补充 Atom 层标准命名（例如 `gray_1~10`, `red_1~7`）并建立语义映射。
2. 统一命名规范（大小写、语言、分隔符、序号表达）。
3. 补齐 Dark 模式显式值（当前提取结果未区分 Light/Dark）。
4. 输出机器可消费的 `color.json`（与本 `color.md` 对齐）供工程构建链使用。
