---
file: spec
component_name: BottomBar
slug: bottom-tab
version: "2.0.0"
last_updated: "2026-05-26"
relay_source:
  url: "https://relay.jd.com/file/design?id=1958051135088508929&page_id=0%3A11863&node_id=303%3A3067"
  scope_node: "303:3067"
  composite_group: "1188:1924"
---

# BottomBar · 视觉与结构规格

## 1. Token 认领原则

本文档中的规格优先引用 `JDSPzujianku/foundations/tokens` 已有 Token。Relay 明确返回但当前 Token 层缺失的项目，使用 `Relay measured` 标记，并列入“待设计确认 / 待 Token 化”。

| 类别 | 已认领 Token | 使用位置 |
|:---|:---|:---|
| 背景 | `color/background 2`、`color/background 5` | 底部暗色背景、弱运营深色半透明背景 |
| 沉浸文本 | `color/title_immerse`、`color/text_immerse_help` | 通条主文案、辅助信息 |
| 强调文本 | `color/hotlist_text` | 热榜、三单等强运营文案 |
| 品牌色 | `color/primary` | 仅用于私有标签资产内的品牌红元素，不直接染色普通通条文字 |
| 间距 | `spacing_xxs`、`spacing_xs`、`spacing_sm`、`spacing_md`、`spacing_lg` | 点分隔符、图文间距、内边距、分栏间距 |
| 圆角 | `radius_xs`、`radius_md`、`radius_max` | 私有标签、小通条容器、圆点 |
| 字体 | `font_size_caption_lg`、`font_weight_regular`、`font_weight_medium`、`font_weight_bold` | 12px 通条文案、国补标签、8折资产内部数字 |

## 2. 吸底区域与容器

| 规格项 | Relay Evidence | Token 映射 / 规则 |
|:---|:---|:---|
| 页面参考宽度 | `1741:12246` 相关页面为 375 宽 | 页面适配层决定，不在组件内写死。 |
| 底部背景 | `#171A26` 暗色底部区域 | 当前 `color.md` 无完全匹配的背景语义 Token；`color/title` 仅数值相同但语义为文本，不建议实现层复用，待设计确认背景 Token。 |
| Type A 基础态高度 | 旧设计稿为 46pt；新 Relay 相关页面底部区域含安全区为 82 高 | 基础评论入口保留旧态协议；安全区由页面层以系统 safe area 变量补偿。 |
| Type B 通条位置 | 相关页面中通条 x=11、top=14、width=353、height=34 | `Relay measured`；左右留白为页面内容区计算结果，当前无命名 Token。 |
| 底部安全区 | 相关页面底部包含 Home Indicator 区域 | 必须使用平台安全区变量；不得用固定数值替代。 |
| 顶部分隔 / 进度线 | 相关页面中 196x2、白色 30%、阴影 `0 -1 1 rgba(...)` | 属于页面播放进度 / 分隔层，不作为 BottomBar 组件基础结构。 |

## 3. Type A：基础评论输入态规格

| 结构 | Relay / 旧稿值 | Token 映射 / 规则 |
|:---|:---|:---|
| 组件语义 | `类型A：底部固定评论入口` | 默认轻量状态。 |
| 占位文案 | `善语评论，文明发言` | 固定文案。 |
| 背景 | 旧稿 `#1A1A1A`，新相关页面底部为 `#171A26` | 当前 `color.md` 无完全匹配的底栏背景语义 Token；使用前需设计确认。 |
| 文案字体 | 12pt / Regular（旧稿） | `font_size_caption_lg` + `font_weight_regular`。 |
| 文案颜色 | white 50%（旧稿） | 当前 token 无 50% 白；优先用 `color/text_immerse_help`，若需 50% 需补 Token。 |
| 评论 icon | 22x22pt（Relay `2075:5908`） | 调用 `../../../src/assets/icons/icon-comment-check-brand.svg`；尺寸为 Relay 实测，待统一至 size token。 |
| 表情 icon | 20x20pt（Relay `2075:5910`） | 调用 `../../../src/assets/icons/icon-happy.svg`；尺寸为 Relay 实测，待统一至 size token。 |
| 内容左右 padding | 12pt（旧稿） | `spacing_lg`。 |
| icon 与文案 gap | 10pt（旧稿） | 当前 spacing 无 10；需要设计确认是否归一到 `spacing_md` 或 `spacing_lg`。 |

## 4. Type B：复合通条基础规格

| 规格项 | Relay Evidence | Token 映射 / 规则 |
|:---|:---|:---|
| 通条宽度 | 353 | `Relay measured`，由 375 视口扣除左右安全留白得到；不在 CSS 中写死为全局值。 |
| 通条高度 | 34 | `Relay measured`，需补组件尺寸 Token，命名待设计系统确认。 |
| 通条背景 | `rgba(255,255,255,0.10)` | Relay 变量返回 `背景 color/background 4`，但当前 `color.md` 尚未收录；实现前需同步至 Token 文档。Relay 文字标注写有 `#444444 40%`，与变量读取不完全一致，待设计确认。 |
| 弱运营背景 | `rgba(23,26,38,0.34)` | `color/background 5`。用于 `属性1=国补`。 |
| 圆角 | 6 | `radius_md`。 |
| 水平内边距 | left/right 10 | 当前 spacing 无 10；需补组件间距 Token，命名待设计系统确认。 |
| 垂直内边距 | top/bottom 7 | 当前 spacing 无 7；需补组件间距 Token，命名待设计系统确认。 |
| 内部主 gap | 4 | `spacing_xs`。 |
| 组件分栏 gap | 8 | `spacing_md`。 |
| 设计稿变体纵向间隔 | 相邻变体 top 差 54，行高 34，展示间距 20 | 仅为规范展示矩阵间距；生产态多条堆叠需待设计确认。 |

## 5. 文案、分隔与图标规格

| 元素 | Relay Evidence | Token 映射 / 规则 |
|:---|:---|:---|
| 主文字 | 12 / PingFang SC / 500 / line-height 12 / white | `font_size_caption_lg` + `font_weight_medium` + `color/title_immerse`。 |
| 辅助文字 | 12 / 500 / white 70% | `font_size_caption_lg` + `font_weight_medium` + `color/text_immerse_help`。 |
| 强运营文字 | `#FFE433` | `color/hotlist_text`。注意 `color.md` 中该 token Light 值与本节点变量返回值存在差异，需以本节点变量为准并由 token 文档同步。 |
| 圆点分隔符 | 2x2、圆形、white 或 `#FFE433` | 尺寸映射 `spacing_xxs`；圆角 `radius_max`；颜色继承当前文案色。 |
| 竖线分隔符 | 0.5x10、white 60% | `line_2` 作为线宽候选；高度 10 暂无 Token，待确认。 |
| 通用 leading icon | 16x16 | `Relay measured`；当前无组件图标尺寸 Token，命名待设计系统确认。 |
| 运营折扣标签 | 24x16，内部含 `8折` | 作为私有 SVG 资产直接使用，不拆为普通文字样式。 |
| 国补标签 | 54x16，内部文字 `国家补贴` | 作为私有 SVG 资产直接使用；资产内部颜色不沉淀为全局 Token。 |
| 箭头 icon | 16x16，right / up | 如全局已有 `arrow-right`、`arrow-up`，优先引用全局资产；否则作为组件私有资产。 |
| 箭头透明度 | 合集有按钮 60%，热榜 / 三单 70%，部分普通态 100% | 透明度为 Relay 实测状态差异；需设计确认是否收敛为状态 token。 |

## 6. 左右分栏规格

| 规格项 | Relay Evidence | Token 映射 / 规则 |
|:---|:---|:---|
| 外层宽高 | 353x34 | `Relay measured`。 |
| 左侧信息条 | flex 自适应、高 34、背景 `rgba(255,255,255,0.10)`、圆角 6 | 背景对应 Relay 变量 `背景 color/background 4`，待同步至 `color.md`；圆角使用 `radius_md`。 |
| 右侧按钮 | 84x34 | `Relay measured`；需补组件尺寸 Token，命名待设计系统确认。 |
| 右侧按钮内边距 | horizontal 16、vertical 10 | `spacing_xl` 可承接水平 16；vertical 10 无 Token，待设计确认。 |
| 右侧按钮圆角 | 6 | `radius_md`。 |
| 右侧按钮文案 | `下一集`，12 / 500 / white | `font_size_caption_lg` + `font_weight_medium` + `color/title_immerse`。 |

## 7. 复合条目规格

| Relay 属性 | 内容示例 | leading | 内容规则 |
|:---|:---|:---|:---|
| `属性1=有引导文案` | `话题 · 一周减肥不重样` + `88.8万人在看` | 16x16 话题 icon | 主内容左对齐，辅助信息右侧对齐。 |
| `属性1=无引导文案` | `相关搜索 · 纯色羽绒服时尚搭配技术` | 16x16 相关搜索 icon | 无辅助人数时内容不保留空槽。 |
| `属性1=合集有按钮` | `合集 · 日本的那些丑事｜更新至第7集` + `下一集` | 16x16 合集 icon | 左右分栏，右侧按钮独立点击。 |
| `属性1=合集无按钮` | `合集 · 日本的那些丑事｜更新至第7集` | 16x16 合集 icon | 整行点击进入合集。 |
| `属性1=短剧无按钮` | `短剧 · 我妈穿越90年代｜更新至第7集` + `免费看` | 16x16 短剧 icon | `免费看` 为辅助信息，不替代主标题。 |
| `属性1=短剧有按钮` | `短剧 · 我妈穿越90年代｜更新至第7集` + `下一集` | 16x16 短剧 icon | 左右分栏，按钮跳下一集。 |
| `属性1=短剧内页` | `短剧 · 我妈穿越90年代｜更新至第7集` + arrow-up | 16x16 短剧 icon | 表示展开态或当前短剧内页内容组。 |
| `属性1=热榜` | `热榜 · TOP3 小米17真机上手测评` + `88.8万人在看` | 16x16 热榜 icon | 使用 `color/hotlist_text` 强调。 |
| `属性1=三单` | `8折 进会场下单 · 享8折 第二单7折 第三单3折` | 24x16 私有标签 | 强运营黄色文案，折扣标签以 SVG 管理。 |
| `属性1=国补` | `国家补贴 超级国补日 · 双重补贴立减50%` | 54x16 私有标签 | 弱运营背景 `color/background 5`，标签以 SVG 管理。 |

## 8. 图标资产规则

| 资产类型 | 规则 |
|:---|:---|
| 组件私有 icon | `topic`、`related-search`、`collection`、`short-drama`、`hot-list` 等如非全局资产库已有，保留在当前目录 `assets/`。 |
| 通用箭头 | `arrow-right`、`arrow-up` 如全局已有，应引用全局资产，不重复切图。 |
| 文本标签切图 | `8折`、`国家补贴`、`免费观看` 等已做成运营标签时，直接使用资产库 SVG，不拆成普通文本组合。 |
| 临时运营素材 | 不沉淀进全局 Icon 库，除非被多个组件长期复用并经设计系统确认。 |
| SVG 颜色 | 普通功能 icon 优先 `currentColor`；运营标签 SVG 保持资产内部视觉，不由组件重染。 |

## 9. 待设计确认 / 待 Token 化

| 项目 | 原因 |
|:---|:---|
| 通条高度 Token | Relay 复合通条高度为 34，当前 Token 层无组件尺寸 token。 |
| 通条水平内边距 Token | Relay 水平内边距为 10，当前 spacing 阶梯无 10。 |
| 通条垂直内边距 Token | Relay 垂直内边距为 7，当前 spacing 阶梯无 7。 |
| 小图标尺寸 Token | Relay leading / arrow icon 为 16，当前无组件图标尺寸 token。 |
| 右侧按钮宽高 Token | Relay 右侧按钮宽 84、高 34，当前无组件尺寸 token。 |
| Type A 新旧背景差异 | 旧稿为 `#1A1A1A`，新相关页面为 `#171A26`，需确认发布语义。 |
| `color/hotlist_text` 值差异 | 本节点变量返回 `#FFE433`，`color.md` 当前 Light 值为 `#756500`，需同步 token 文档。 |
| 展示矩阵纵向间距 20 | 当前仅作为设计稿展示间距，不确认生产多条堆叠。 |
