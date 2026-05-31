---
token_category: spacing
version: 1.0.0
last_updated: 2026-05-22
relay_source: "https://relay.jd.com/file/design?id=1958051135088508929&page_id=862%3A533"
extraction_node: "862:534 (边框&圆角&阴影页 spacing 标注区域)"
sync_status: "synced — 5-step base-2 scale extracted from text labels (2/4/6/8/12px); component-level padding validated via use_design_script itemSpacing/padding API"
---

# Spacing Token 规范

## 文档概述与设计理念

间距体系基于 **2px 基量 + 双梯度** 原则：

- **基量（Base Unit）**：最小粒度为 `2px`，所有间距值均为 2 的倍数，保证亚像素对齐零溢出。
- **双梯度体系**：
  - **微间距梯度**（2 / 4 / 6 / 8px）：用于组件内部元素间距（Icon-文字间距、标签内边距）；步进平缓，便于密集信息布局。
  - **模块间距梯度**（8 / 12 / 16px+）：用于组件之间、区块之间的外部间距；步进较大，强调呼吸感与层级分隔。
- **沉浸式页面特殊性**：视频流页面因全屏背景，组件内边距优先使用较小值（4 / 6 / 8px）以最大化内容展示面积；非沉浸式导购页可使用更大间距（12 / 16px）。
- **禁止裸数字**：所有间距必须引用 Token，禁止在 CSS / StyleSheet 中直接书写像素值。

---

## 基础阶梯 / Atom 层（核心量化表）

> 数据来源：节点 `862:1512`～`862:1533` 区域的文字标注（2px / 4px / 6px / 8px / 12px），以及 `use_design_script` 读取到的组件级 `itemSpacing` / `padding` 属性值。

| Token 命名 | px 值 | pt 值（@2x）| 主要用途描述 |
|:---|:---:|:---:|:---|
| `spacing_xxs` | 2 px | 1 pt | 极小间距：角标与宿主元素的贴靠偏移、进度条端点留白 |
| `spacing_xs` | 4 px | 2 pt | 最小功能间距：图标与文字之间（Icon-Label gap）、紧凑型标签内水平 padding |
| `spacing_sm` | 6 px | 3 pt | 小间距：标签内水平 padding（次级场景）、列表项内小元素间距 |
| `spacing_md` | 8 px | 4 pt | 标准间距：按钮内上下 padding、Tab 组容器内边距、卡片内图文 gap |
| `spacing_lg` | 12 px | 6 pt | 中等间距：卡片内左右 padding、区块内标题与内容的垂直 gap |
| `spacing_xl` | 16 px | 8 pt | 模块间距：Tab 导航栏中各 Tab 间的水平 gap |
| `spacing_2xl` | 24 px | 12 pt | 大间距：区块与区块之间、全屏页面内容与安全边距之间（保留待扩展）|

---

## 应用场景与语义角色 (Role 层)

### 组件内部间距（Internal Padding & Gap）

> 以下数据由 `use_design_script` 直接读取各组件节点的 `paddingLeft/Right/Top/Bottom` 及 `itemSpacing`。

| 组件 / 节点 | 内边距 (padding) | 元素间距 (gap) | 对应 Token |
|:---|:---|:---|:---|
| 按钮/28（`862:813~817`） | 左右: 12px / 上下: 8px | 图标-文字: 4px | `spacing_lg` / `spacing_md` / `spacing_xs` |
| Tab 按钮（`862:812`） | 左右: 8px | — | `spacing_md` |
| Tab 导航栏外层（`862:804`、`862:834`）| — | 各 Tab 间: 16px | `spacing_xl` |
| 卡片内容行（`862:788`） | 上下: 8px | 图标-文字: 7px ≈ 8px | `spacing_md` |
| 卡片行（`862:789`、`862:793`） | — | 行间: 8px | `spacing_md` |

### 平台型（Platform）语义间距

| 语义 Token | Atom | 适用场景 |
|:---|:---|:---|
| `spacing.icon_label` | `spacing_xs` (4px) | 所有图标与其说明文字之间的水平间距（通栏规范） |
| `spacing.btn_inner_h` | `spacing_lg` (12px) | 按钮内左右 padding（适用于 28/32/36 高度档位） |
| `spacing.btn_inner_v` | `spacing_md` (8px) | 按钮内上下 padding |
| `spacing.tag_inner_h` | `spacing_xs` (4px) ~ `spacing_sm` (6px) | 标签内水平 padding（根据标签密度选择）|
| `spacing.list_row_gap` | `spacing_md` (8px) | 列表项之间的垂直间距 |
| `spacing.card_inner_h` | `spacing_lg` (12px) | 卡片内左右 padding |
| `spacing.card_inner_v` | `spacing_md` (8px) | 卡片内上下 padding |
| `spacing.module_gap` | `spacing_xl` (16px) | 独立功能模块之间的外间距 |

### 导购型（Commerce）塔式语义间距

| 语义 Token | Atom | 适用场景 |
|:---|:---|:---|
| `spacing.commerce.tag_badge` | `spacing_xxs` (2px) | 商品角标（促销徽章）与商品图之间的贴靠偏移 |
| `spacing.commerce.price_label` | `spacing_xs` (4px) | 价格与角标文字之间 |
| `spacing.commerce.card_h` | `spacing_lg` (12px) | 商品卡左右内边距 |
| `spacing.commerce.product_image_gap` | `spacing_sm` (6px) | 商品图与文案区之间的水平间距 |
| `spacing.commerce.btn_gap` | `spacing_xs` (4px) | 利益点标签横向排列间距 |

### 特殊场景：安全区 (Safe-area)

| 场景 | 规则 |
|:---|:---|
| iOS 底部 Home Indicator 安全区 | 底部操作栏需加 `env(safe-area-inset-bottom)` 额外补偿，固定值不得替代此变量 |
| 顶部状态栏安全区 | `env(safe-area-inset-top)`，顶部 Nav 使用 `padding-top: calc(statusBarHeight + spacing_md)` |
| 全屏视频内容区 | 左右 padding = 0（内容铺满），组件绝对定位时各自携带自身的 `padding` 或 `margin` |

### 沉浸式视频流专用间距规范

| 应用位置 | 数值 | Token 引用 |
|:---|:---:|:---|
| 右侧互动栏 — 图标与计数文字之间（垂直） | 4 px | `spacing_xs` |
| 右侧互动栏 — 各功能图标模块之间（垂直） | 8 px | `spacing_md` |
| 左下信息区 — 昵称与描述文字之间 | 4 px | `spacing_xs` |
| 底部输入框 — 内左右 padding | 12 px | `spacing_lg` |
| 底部输入框 — 内上下 padding | 8 px | `spacing_md` |
| 商品卡与底部输入框之间 | 8 px | `spacing_md` |

---

## 反例与使用警示 (Anti-patterns)

| ❌ 反面用法 | 解释 |
|:---|:---|
| `padding: 5px` / `margin: 10px` | 奇数值 / 不在 2px 基量体系内，破坏子像素对齐 |
| `padding: 3px 7px` | 混合奇偶数，且不在梯度表内 |
| `margin-top: 13px` | 无法整除 2px 基量的裸数字，须与设计确认后改为最近 Token |
| 直接写 `gap: 10px` 用于 Tab 按钮间距 | 10px 不在梯度表内，应使用 `spacing_xl` (16px) 或 `spacing_lg` (12px) |
| 用 `padding` 代替 `gap` 进行 Flex 元素间距 | Flex 容器内元素间距应优先使用 `gap`（`itemSpacing`），避免单侧 `padding` 导致边缘溢出 |
| 在沉浸式页面使用 `spacing_2xl` (24px) 作为卡片内边距 | 视频流场景强调信息密度，大内边距会导致内容被截断 |

---

## 异常记录与待办事项 (TODOs)

| 编号 | 类型 | 描述 |
|:---|:---|:---|
| SP-01 | ⚠️ 命名缺失 | 设计稿中间距仅以像素值标注（如"8px"），无正式 Token 命名；本文档所有 `spacing.*` 命名为提案，待设计系统统一确认。 |
| SP-02 | ⚠️ 7px 非标准值 | `862:788` 卡片内容行 `itemSpacing = 6.9994`（约 7px），不在梯度体系内，疑为设计误差；建议规范为 `spacing_md` (8px)。 |
| SP-03 | ⚠️ `spacing_2xl` (24px) 缺乏场景覆盖 | 设计稿中未见 24px 间距的明确使用示例；提案值基于梯度外推，待设计确认实际使用场景。 |
| SP-04 | TODO | 需补充「导购型多列瀑布流」的 gutter 规范（当前设计稿仅有沉浸式单列场景）。 |
| SP-05 | TODO | 需明确 `spacing.commerce.*` 语义 Token 的 Dark Mode 是否有差异（通常间距不区分色彩模式，但确认为宜）。 |
| SP-06 | TODO | `spacing_xl` (16px) 以上是否需要继续扩展（如 20px / 24px / 32px）？当前设计稿最大标注值为 12px，模块间距由设计稿推断为 16px，请设计确认上限。 |
