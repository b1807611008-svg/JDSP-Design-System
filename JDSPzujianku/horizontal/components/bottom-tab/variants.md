---
file: variants
component_name: BottomBar
slug: bottom-tab
version: "2.0.0"
last_updated: "2026-05-26"
relay_source:
  url: "https://relay.jd.com/file/design?id=1958051135088508929&page_id=0%3A11863&node_id=303%3A3067"
  scope_node: "303:3067"
---

# BottomBar · 形态与变体

## 1. 主形态

| 形态 | Relay 命名 | 说明 | 使用优先级 |
|:---|:---|:---|:---|
| `comment_entry` | `类型A：底部固定评论入口` | 基础评论输入态，底部固定 bar，含评论 icon、占位文案和表情 icon。 | 默认 |
| `composite_strip` | `类型B：复合组件` / `底部通条` | 复合信息通条，可承载话题、相关搜索、合集、短剧、热榜、优惠等入口。 | 有内容导流时替换或叠加于页面策略 |

## 2. Type A：基础评论输入态

| 变体 | 内容 | 状态说明 |
|:---|:---|:---|
| `default` | `善语评论，文明发言` | 默认轻量评论入口。 |
| `emoji_available` | 右侧展示表情 icon | 表情能力可用。 |
| `emoji_hidden` | 隐藏右侧表情 icon | 表情能力不可用或页面需要降低干扰时降级。 |
| `disabled` | 文案保留，点击无响应 | 评论能力被限制时使用；需要配合页面提示，不在 BottomBar 内展示原因。 |

## 3. Type B：单条整行通条

| 变体 | Relay 属性 | 示例 | 视觉等级 | 交互目标 |
|:---|:---|:---|:---|:---|
| `topic_guided` | `属性1=有引导文案` | `话题 · 一周减肥不重样` + `88.8万人在看` | 弱信息 | 进入话题页或话题聚合流 |
| `related_search` | `属性1=无引导文案` | `相关搜索 · 纯色羽绒服时尚搭配技术` | 弱信息 | 发起相关搜索或打开搜索结果页 |
| `collection_without_button` | `属性1=合集无按钮` | `合集 · 日本的那些丑事｜更新至第7集` | 弱信息 | 进入合集 |
| `short_drama_without_button` | `属性1=短剧无按钮` | `短剧 · 我妈穿越90年代｜更新至第7集` + `免费看` | 弱信息 | 进入短剧详情或剧集列表 |
| `short_drama_inner_expanded` | `属性1=短剧内页` | `短剧 · 我妈穿越90年代｜更新至第7集` + arrow-up | 展开态 | 收起当前内容组或关闭展开列表 |
| `hot_list` | `属性1=热榜` | `热榜 · TOP3 小米17真机上手测评` + `88.8万人在看` | 强运营 | 进入热榜内容或榜单聚合页 |
| `discount_three_order` | `属性1=三单` | `8折 进会场下单 · 享8折 第二单7折 第三单3折` | 强运营 | 进入会场或优惠承接页 |
| `gov_subsidy` | `属性1=国补` | `国家补贴 超级国补日 · 双重补贴立减50%` | 强运营 / 弱底 | 进入国补会场或活动页 |

## 4. Type B：左右组合通条

| 变体 | Relay 属性 | 左侧信息 | 右侧按钮 | 规则 |
|:---|:---|:---|:---|:---|
| `collection_with_next` | `属性1=合集有按钮` | `合集 · 日本的那些丑事｜更新至第7集` | `下一集` | 左侧进入合集；右侧独立执行下一集。 |
| `short_drama_with_next` | `属性1=短剧有按钮` | `短剧 · 我妈穿越90年代｜更新至第7集` | `下一集` | 左侧进入短剧；右侧独立执行下一集。 |

## 5. 展开 / 收起态

| 状态 | Relay Evidence | 视觉规则 | 行为 |
|:---|:---|:---|:---|
| `collapsed` | 普通通条使用 arrow-right | 右侧箭头向右，表示可跳转或可展开。 | 点击整条进入目标页或展开内容组。 |
| `expanded` | `属性1=短剧内页` 使用 arrow-up | 右侧箭头向上，表示当前内容组已展开。 | 点击箭头或整条按业务规则收起；具体热区见 `behaviors.md`。 |

> 说明：Relay 中明确出现 arrow-up 展开视觉，但未展示完整下拉列表内容。展开面板的高度、动效和列表项结构需由后续设计稿补充。

## 6. 强运营 / 弱运营态

| 运营等级 | 适用变体 | Token / 资产 | 规则 |
|:---|:---|:---|:---|
| 弱信息 | topic、related_search、collection、short_drama | Relay 变量 `背景 color/background 4` + `color/title_immerse` | `color/background 4` 尚未收录到 `color.md`，实现前需同步；不使用高亮色，保持低干扰。 |
| 强运营高亮 | hot_list、discount_three_order | `color/hotlist_text` + 私有 icon / 标签 | 文案与点分隔符统一使用高亮色；不得混入品牌红作为普通文字色。 |
| 强运营标签 | gov_subsidy、discount_three_order | `assets/icon-gov-subsidy.svg`、`assets/icon-three-list.svg` | 运营标签以 SVG 资产呈现；资产内部视觉不拆散为组件文本。 |
| 弱底运营 | gov_subsidy | `color/background 5` | 使用更深半透明背景降低干扰，适合较长利益点。 |

## 7. 内容类型

| 内容类型 | leading | 主文案 | 辅助信息 | 是否允许按钮 |
|:---|:---|:---|:---|:---|
| 话题 | `icon-topic.svg` | 话题名 | 可显示观看人数 | 否 |
| 相关搜索 | `icon-related-search.svg` | 搜索词 | 一般不显示 | 否 |
| 合集 | `icon-collection.svg` | 合集名 + 更新信息 | 可通过竖线分隔更新信息 | 是 |
| 短剧 | `icon-short-drama.svg` | 短剧名 + 更新信息 | 可显示 `免费看` | 是 |
| 热榜 | `icon-hot-list.svg` | 排名 + 标题 | 可显示观看人数 | 否 |
| 会场优惠 | `icon-three-list.svg` | 会场动作 + 利益点 | 不单独放人数 | 否 |
| 国补优惠 | `icon-gov-subsidy.svg` | 活动名 + 利益点 | 不单独放人数 | 否 |

## 8. 文案溢出与降级

| 场景 | 规则 |
|:---|:---|
| 主内容过长 | 优先保留 leading、类型名和右侧箭头；中间内容单行截断。 |
| 辅助信息过长 | 辅助信息优先降级隐藏，不挤压主内容。 |
| 左右分栏空间不足 | 保留右侧按钮宽度；左侧信息条截断。 |
| 运营标签缺失 | 回退为同类普通 icon 或隐藏 leading，仍保留文本结构。 |
| 展开能力不可用 | 使用 arrow-right 跳转，不展示 arrow-up。 |
