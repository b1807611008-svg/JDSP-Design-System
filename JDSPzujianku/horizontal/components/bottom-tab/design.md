---
component_name: BottomBar
component_name_zh: 视频页底部 Bottom Bar
slug: bottom-tab
layer: Component Composition Layer
version: "2.0.0"
status: draft
last_updated: "2026-05-26"
relay_source:
  url: "https://relay.jd.com/file/design?id=1958051135088508929&page_id=0%3A11863&node_id=303%3A3067"
  file_id: "1958051135088508929"
  page_id: "0:11863"
  scope_node: "303:3067"
  title: "底部通条 / Bottom strip"
  reference_nodes:
    layout: "303:3067"
    composite_group: "1188:1924"
    related_page: "1741:12246"
dependencies:
  tokens:
    - ../../../foundations/tokens/color.md
    - ../../../foundations/tokens/spacing.md
    - ../../../foundations/tokens/radius.md
    - ../../../foundations/tokens/typography.md
  visual:
    - ../../../foundations/visual/Icon.md
  related_docs:
    - spec.md
    - variants.md
    - behaviors.md
  global_assets:
    - ../../../src/assets/icons/icon-comment-check-brand.svg
    - ../../../src/assets/icons/icon-happy.svg
  private_assets:
    - assets/icon-topic.svg
    - assets/icon-related-search.svg
    - assets/icon-collection.svg
    - assets/icon-short-drama.svg
    - assets/icon-hot-list.svg
    - assets/icon-three-list.svg
    - assets/icon-gov-subsidy.svg
    - assets/icon-circle.svg
---

# BottomBar - 视频页底部 Bottom Bar 组件族

## 1. 组件定义

**BottomBar** 是视频详情页底部吸底组件族，用于承载轻量评论入口与视频内容相关的复合信息通条。它不是京东首页 Tabbar，也不是一级导航 Tabbar；组件边界限定在视频详情页底部的评论输入区、信息导流条和复合运营入口。

Relay `303:3067` 将该组件抽象为两类主形态：

| 类型 | Relay 命名 | 定义 | 默认权重 |
|:---|:---|:---|:---|
| Type A | `类型A：底部固定评论入口` | 固定在视频页底部的评论触发入口，包含评论 icon、占位文案和表情 icon。 | 默认轻量状态 |
| Type B | `类型B：复合组件` / `底部通条` | 在底部通条中承载话题、搜索、合集、短剧、热榜、优惠、下一集等复合入口。 | 内容导流状态 |

## 2. 组件层级

```text
BottomBar
├── Safe Area / 吸底安全区
├── Background Layer / 沉浸底部背景
├── Type A: Comment Entry
│   ├── leading icon: comment
│   ├── placeholder: 善语评论，文明发言
│   └── trailing icon: emoji
└── Type B: Bottom Strip
    ├── strip container
    ├── leading asset / label asset
    ├── primary label
    ├── separator dot or vertical divider
    ├── content text
    ├── assist text
    ├── trailing arrow
    └── optional trailing button
```

## 3. 基础形态：评论输入态

基础评论输入态是 BottomBar 的默认轻量状态。组件固定在视频页底部，作为评论面板或评论输入流程的触发入口，不直接承担完整输入编辑能力。

| 结构 | 内容 | 规则 |
|:---|:---|:---|
| 左侧 icon | 评论图标 | 调用 `../../../src/assets/icons/icon-comment-check-brand.svg`；视觉层级高于占位文案。 |
| 占位文案 | `善语评论，文明发言` | 固定文案，不由业务随意改写。 |
| 右侧 icon | 表情 icon | 调用 `../../../src/assets/icons/icon-happy.svg`；表达可进入表情或评论增强能力，无能力时可降级隐藏。 |
| 吸底背景 | 沉浸式暗色底部背景 | 背景只提供可读性和安全区承接，不作为页面导航栏。 |

## 4. 复合形态：底部通条

复合通条态用于承载与当前视频内容相关的入口。Relay 文案说明为：导流控件的视觉元素从有意识区分，调整为更标准化的信息组织表达，重点统一图标与间距。

复合通条的基本结构为：

```text
Bottom Strip
├── leading: 16px icon 或 24/54px 私有标签资产
├── primary: 类型名，如 话题 / 相关搜索 / 合集 / 短剧 / 热榜
├── separator: 2x2 dot 或 0.5x10 vertical divider
├── content: 内容标题或利益点
├── assist: 人数、免费看等辅助信息
├── trailing: arrow-right / arrow-up
└── optional button: 下一集
```

## 5. 结构说明

| 区域 | Relay Evidence | 抽象规则 |
|:---|:---|:---|
| 外层底部区域 | `1741:12246`，底部暗色区域承接通条与安全区 | 页面层提供吸底和安全区；组件内容不可贴到系统 Home Indicator。 |
| 复合通条组 | `1188:1924`，画板名 `底部通条` | 组件以单条通条作为生产形态；多条纵向堆叠仅为设计稿变体展示。 |
| 单条整行 | `属性1=有引导文案`、`属性1=无引导文案`、`属性1=热榜` | 左 icon + 文案 + 右侧辅助信息 / 箭头，整条可点击。 |
| 左右分栏 | `属性1=合集有按钮`、`属性1=短剧有按钮` | 左侧信息条 + 右侧独立按钮，两个热区语义分离。 |
| 展开态 | `属性1=短剧内页` | 右侧箭头向上，表示当前内容组已展开。 |
| 强运营 | `属性1=热榜`、`属性1=三单`、`属性1=国补` | 使用高亮文案、私有标签资产或运营色，但仍遵循通条结构。 |

## 6. 设计原则

| 原则 | 说明 |
|:---|:---|
| 同族组织 | 基础评论入口与复合通条属于同一个 BottomBar 组件族，由业务场景切换形态，不拆成页面级临时模块。 |
| 内容优先 | 通条只承载与当前视频强相关的轻量入口，不覆盖视频主体和右侧互动区。 |
| 单条优先 | 生产页面同一时刻优先展示一条通条；多条入口需要经过优先级仲裁。 |
| 结构稳定 | icon、类型名、分隔符、内容、辅助信息、箭头的顺序保持稳定，避免不同业务各自重排。 |
| Token 驱动 | 背景、文字、间距、圆角、字体必须映射至已有 Token；缺失项记录为待补，不自行命名。 |
| 私有资产收敛 | 非全局通用图标与运营标签保留在 `assets/`，不要沉淀为全局 Icon。 |

## 7. 典型场景

| 场景 | 示例文案 | 形态 |
|:---|:---|:---|
| 默认评论入口 | `善语评论，文明发言` | Type A 基础评论输入态 |
| 话题导流 | `话题 · 一周减肥不重样`，辅助信息 `88.8万人在看` | Type B 单条整行通条 |
| 相关搜索 | `相关搜索 · 纯色羽绒服时尚搭配技术` | Type B 单条整行通条 |
| 合集入口 | `合集 · 日本的那些丑事｜更新至第7集` | Type B 单条整行通条 |
| 合集 + 下一集 | `合集 · 日本的那些丑事｜更新至第7集` + `下一集` | Type B 左右分栏通条 |
| 短剧入口 | `短剧 · 我妈穿越90年代｜更新至第7集`，辅助信息 `免费看` | Type B 单条整行通条 |
| 短剧 + 下一集 | `短剧 · 我妈穿越90年代｜更新至第7集` + `下一集` | Type B 左右分栏通条 |
| 热榜 | `热榜 · TOP3 小米17真机上手测评`，辅助信息 `88.8万人在看` | Type B 强运营通条 |
| 会场优惠 | `8折 进会场下单 · 享8折 第二单7折 第三单3折` | Type B 强运营通条 |
| 国补优惠 | `国家补贴 超级国补日 · 双重补贴立减50%` | Type B 强运营通条 |

## 8. 文档关系

- 视觉尺寸、间距、颜色、字体、圆角、图标与容器规则见 [spec.md](./spec.md)。
- 形态与变体清单见 [variants.md](./variants.md)。
- 交互、优先级、降级与禁止用法见 [behaviors.md](./behaviors.md)。
