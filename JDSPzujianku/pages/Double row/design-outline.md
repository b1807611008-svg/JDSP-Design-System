---
file: design-outline
level: flow
bg: horizontal
slug: double-row
name_zh: "双列"
name_en: "Double row"
last_synced: "2026-05-31"

auto_detected:
  level: flow
  bg: horizontal ⚠️ fallback
  slug: "double-row" # ⚠️ fallback-from-page-name

relay_source:
  file_id: "1958051135088508929"
  page_id: "1758:1"
  node_id: "1758:251"
  node_name: "白皮书-短剧"
  node_type: FRAME
  bounds: { w: 1660, h: 1328 }
  url: "https://relay.jd.com/file/design?id=1958051135088508929&page_id=1758%3A1&node_id=1758%3A251"
---

# 双列 · Outline

> 自动同步 2026-05-31 · skill v0.5.3 · Relay [`1758:251`](https://relay.jd.com/file/design?id=1958051135088508929&page_id=1758%3A1&node_id=1758%3A251)

## 稿件预检

整体结论：⚠️ 待补充

| 维度 | 结论 | 说明 |
|---|---|---|
| 节点规模 | ⚠️ 待补充 | 节点高 1328px，抽取节点数 633，已解除 Phase 2 阻断；仍为 page-doc 量级，需确认抽取数据未被截断 |
| 命名可信度 | ⚠️ 待补充 | 发现 `Frame 2085665935`、`Frame 2085665936`、`矩形 2798`、`组 103489` 等默认/数字命名；以画面文本和标注为准 |
| 标注完整度 | ⚠️ 待补充 | page-doc 模式下未抽到 `dimension_spec` 尺寸标注文本，正式 spec 会缺少可机械归档的尺寸来源 |
| 截图可得性 | ✅ 通过 | 根节点 bounds 有效：1660×1328 |
| 结构清晰度 | ⚠️ 待补充 | page-doc 判定来自第一层多个 frame/group；章节里存在默认 frame/group 命名，正式 bundle 需人工确认章节边界 |

## 本次识别范围

- Relay 根节点：`白皮书-短剧`（`FRAME`，1660×2595）
- 所属 page：`双列`
- 自动判定：`pageDocMode=true`，根节点包含基础布局、交互说明、页面示意、内容卡拆解标注等多类信息
- 主题范围：双列 feed 页面布局及内容卡展示规范，包含双列瀑布流、基础内容卡、封面比例、标签、文案区、营销信息、用户信息与互动区、顶部/二级 tab 与底部 tab 示例
- 明确文案：
  - `双列遵循栅格布局，特殊情况可自行处理`
  - `二级tab可根据信息重要程度适配交互方式是否吸顶`
  - `一级tab吸顶，二级tab不固定`

## 结构大纲

| # | 节点 ID | 名称 | 类型 | 尺寸 | 内容要点 |
|---|---|---|---|---|---|
| 1 | `1758:252` | 双列 | TEXT | 160×80 | 页面标题 |
| 2 | `1758:253` | feed | TEXT | 64×27 | 英文副标题 |
| 3 | `1758:255` | Frame 2085665935 | FRAME | 502×122 | 01 基础布局说明 |
| 4 | `1758:2` | 逛-精选 | FRAME | 375×812 | 双列 feed 页面示意，含顶部导航、二级筛选、内容卡瀑布流、底部 tab |
| 5 | `1758:3066` | 逛-精选 | FRAME | 375×812 | 第二份 feed 页面示意 |
| 6 | `1977:156` | 种草清单/挂件 | FRAME | 160×16 | 内容卡挂件/利益点标注 |
| 7 | `1977:188` | 各放大1号 | FRAME | 375×812 | 字号放大示意 |
| 8 | `1977:1` | 逛-精选 | FRAME | 375×812 | 交互态页面示意 |
| 9 | `1977:370` | 基础内容卡 | INSTANCE | 176×328 | 独立内容卡示例 |
| 10 | `1977:377` | 一级tab吸顶，二级tab吸顶 | TEXT | 533×28 | 交互说明 |

## 变体 / 状态维度

- 根节点不是 `COMPONENT_SET`，未抽到 Relay component variants。
- 从稿件内容可识别的组合维度：
  - 内容卡高度：`176×231` 与 `176×328`
  - 封面比例：`176×176`（1:1）与 `176×234`（约 3:4）
  - 内容区：单行文本内容区 `176×37`、双行/营销信息内容区 `176×76`
  - 互动指标：浏览 `睁眼` 与喜欢 `heart` 两类图标示意
  - 页面交互：一级 tab 吸顶，二级 tab 可按信息重要程度决定是否吸顶

## 组合形态

| 组合 | 抽取来源 | 尺寸 / 数量 | 说明 |
|---|---|---|---|
| 双列容器 | `Frame 2085665599` | 列宽 176，列间距 7 | 双列 feed 主体采用左右两列瀑布流 |
| 基础内容卡 | `基础内容卡` instance | 19 处；176×231 / 176×328 | 承载封面、标签、文案、营销信息、UGC 与互动 |
| 封面 | `3:4封面` instance | 19 处；176×176 / 176×234 | 位图填充，需要 CDN 资产登记 |
| 内容区 | `内容区` / `双列内容区` | 176×37 / 176×76 | 8px 左右内边距，正文与辅助信息纵向排列 |
| 用户信息与互动区 | `用户信息+互动区` / `UGC信息+互动区` | 160×16 | 头像 + 用户昵称 + 浏览/喜欢数据 |
| 筛选项 | `筛选项` instance | 14 处；52×28 | 二级 tab / 筛选项横向排列 |

## 已识别 Tokens / 材质 / 子组件

### 色彩

| 实际值 | 反查结果 |
|---|---|
| `#FFFFFF` | `color_primary_text`（也可能对应背景/反白语义，需按用途复核） |
| `#F5F6FA` | `color_background_component` |
| `#FF0F23` | `color_primary` |
| `#171A26` | `color_title` |
| `#828794` | `color_primary_disabled_special` |
| `#B5691A` | `color_service_text` |
| `#FFF0F4` | `color_primary_light` |
| `#C2C4CC` | `color_primary_disabled` |
| `#3D414D` | `color_text` |
| `#000000@40%` | ⚠️ rgba-suggestion / 需复核是否使用 `color_mask` |
| `#FFFFFF@90%` | ⚠️ rgba-suggestion `white-at-90` |
| `#BBBDF1`, `#5E5CFF`, `#FA1E43`, `#DADADA`, `#D9D9D9`, `#E6E6E6`, `#D9DEF1`, `#4A0CFE`, `#B4B8F0`, `#D5D7FF`, `#1721FF`, `#FF9A47` | ⚠️ token-miss |

### 文字

| 字体组合 | 反查结果 | 计数 |
|---|---|---:|
| PingFang SC Regular 11 | `pingfang_regular/font_size_11_400` | 32 |
| PingFang-SC Medium 13 | ⚠️ token-miss（Medium 需确认映射 Semibold/600 或另设） | 29 |
| PingFang-SC Regular 11 | `pingfang_regular/font_size_11_400` | 28 |
| PingFang SC Regular 14 | `pingfang_regular/font_size_14_400` | 24 |
| PingFang SC Medium 16 | ⚠️ token-miss（Medium 需确认映射 Semibold/600 或另设） | 23 |
| PingFang SC Regular 10 | `pingfang_regular/font_size_10_400` | 16 |
| PingFang SC Semibold 60 / 80 | ⚠️ token-miss（白皮书大标题，不在 V16 app 字号阶梯） | 5 |
| PingFang SC Semibold 15 | ⚠️ token-miss（V16 字号阶梯无 15） | 3 |
| JDZhengHT Regular 12 / 9 | ⚠️ token-miss（字体/字号均需复核） | 4 |

### 圆角

| 实际值 | 反查结果 |
|---|---|
| 4 | `radius_s` |
| 6 | `radius_base` |
| 8 | `radius_l` |
| 12 | `radius_xl` |
| 0.5 / 0.9167 / 1 / 1.3333 / 1.75 / 2.6667 | ⚠️ 图标内部曲率，建议不纳入 token |
| 15 / 23 / 30 / 100 / 200 | ⚠️ token-miss，需确认是否为胶囊/标注形状或应映射到组件级规则 |

### 间距

| 实际值 | 反查结果 | 计数 |
|---|---|---:|
| 0 | `spacing.0` | 1054 |
| 4 | `spacing.4` | 156 |
| 8 | `spacing.8` | 134 |
| 6 | `spacing.6` | 77 |
| 12 | `spacing.12` | 28 |
| 2 | `spacing.2` | 27 |
| 16 | `spacing.16` | 14 |
| 7 | `spacing.7`（Feeds 横纵特殊值） | 6 |
| 40 | `spacing.40` | 2 |
| 10 / 9 / 14 / 11 / 3 / 1 / 30 / 5 / 23 / 167 | ⚠️ half-step / token-miss，需按用途归并或保留说明 | 377 |

### 子组件 / 材质

| 子组件 | 数量 | 尺寸 |
|---|---:|---|
| `卡片标签` | 21 | 75×16 / 16×16 / 13×13 |
| `基础内容卡` | 19 | 176×231 / 176×328 |
| `3:4封面` | 19 | 176×176 / 176×234 |
| `文本` | 19 | 160×13 / 160×32 |
| `用户头像` | 19 | 16×16 |
| `互动信息` | 19 | 34×12 |
| `内容区` | 17 | 176×37 / 176×76 |
| `睁眼` | 16 | 12×12 |
| `筛选项` | 14 | 52×28 |
| `内容卡营销信息` | 10 | 160×12 |

未识别到 `Liquid Glass` / `Frosted Glass` 等材质实例。

## 切图清单（待上传 CDN）

检测到 27 处 IMAGE fill，按 imageHash 去重后 9 组：

| 用途 | Relay 节点 | 尺寸 | 复用次数 | 状态 |
|---|---|---|---:|---|
| 3:4封面 | `1758:21;1641:1` | 176×176 | 3 | ⏳ 待上传 CDN |
| 用户头像 | `1758:21;1042:4853;1042:4766;1640:206` | 16×16 | 19 | ⏳ 待上传 CDN |
| 3:4封面 | `1758:22;1641:2` | 176×234 | 9 | ⏳ 待上传 CDN |
| 3:4封面 | `1758:23;1641:1` | 176×176 | 3 | ⏳ 待上传 CDN |
| 3:4封面 | `1758:26;1641:1` | 176×176 | 3 | ⏳ 待上传 CDN |
| 透明层 | `1758:180;1099:5114` | 22×22 | 10 | ⏳ 待上传 CDN |
| 3:4封面 | `1977:7;1641:1` | 176×234 | 1 | ⏳ 待上传 CDN |

## 待设计师确认

- 根节点 `nodeCount=633` 已解除 Phase 2 阻断；正式 bundle 已可生成，但仍建议确认 page-doc 章节边界。
- page 名为 `双列`，根节点名为 `白皮书-短剧`，本次按页面语义推断 slug 为 `double-row`；需确认正式命名是否沿用“双列”还是“短剧/白皮书”。
- `bg` 因文件 ID `1958051135088508929` 不在 `bg-mapping.json` 中，已按兜底推断为 `horizontal`。
- 章节命名中存在大量默认 frame/group/rectangle 名称，正式 bundle 章节边界需设计师复核。
- 未抽到尺寸标注 bucket，内容卡尺寸、列间距、吸顶规则等目前来自节点几何和文案，不来自专门标注文本。
- 多处色值、字号、间距、圆角无法反查到 V16 token，需要确认是白皮书展示装饰、业务品牌色，还是应补 token。
- IMAGE fill 已识别但未导出 CDN，本阶段只登记用途与节点。

## 自动发现的风险

- ⚠️ `nodeCount=633` 为 page-doc 量级：正式写入允许继续，但需要设计师 review 章节边界与 token-miss。
- ⚠️ `level=flow` 来自尺寸规则兜底：节点宽 1660、高 2595，属于多屏/多说明组合稿，不是单一页面节点。
- ⚠️ `pageDocMode=true` 由第一层多个 frame/group 触发，但章节命名不干净。
- ⚠️ 颜色 token-miss 较多：紫色/蓝紫色系、装饰色、半透明白/灰、部分京东红衍生色需复核。
- ⚠️ 间距半步较多：10、9、14、11、3、1、30、5、23、167 等不在标准 spacing 表。
- ⚠️ 圆角存在 15、23、30、100、200 等非 V16 radius 阶梯值，可能是胶囊或标注图形。
- ⚠️ 组件依赖较多：`基础内容卡`、`卡片标签`、`筛选项`、`用户头像`、`互动信息` 等需确认是否已各自有 design.md 可被正式引用。

## 说明

- 本文件用于正式 `design.md` 生成前的确认门
- 未确认前，不写 `design.md` / `INDEX.md` / `used_by`
- 未确认前，不回写 Relay sharedPluginData
