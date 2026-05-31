---
file: spec
bundle_part_of: design.md
slug: "info-layer"
last_synced: "2026-05-28"

uses_tokens:
  colors:
    - color_primary_text          # #ffffff，沉浸视频画面上的昵称 / 展开入口
    - gray_3                      # rgba(255,255,255,0.90) 语义近似：弱化说明文案，实际 Relay 为半透明白
    - black                       # rgba(0,0,0,0.30) 文字投影来源
    - warningyellow_2             # #FFA700 / #FF8700 达人徽章渐变近似
  typography:
    - pingfang_medium/font_size_16_500    # 昵称，16/lh20
    - pingfang_regular/font_size_14_400   # 文案，14/lh18
    - pingfang_regular/font_size_14_400   # 展开 / 收起入口，14/lh18
    - pingfang_regular/font_size_11_400   # 达人标签文字，11/lh10
    - pingfang_regular/font_size_10_400   # 原创标签文字，10/lh9
  radius: []
  spacing:
    - "TODO: spacing token 待 V16 表回填；当前使用 8 / 11 / 28 / 274 DP 等实现值"
  materials:
    - "text-shadow: 0 0 2px rgba(0,0,0,0.30)"
---

# 信息区 · 视觉规范

> design.md → [index](./design.md) · 同 bundle: [variants](./variants.md) · [behaviors](./behaviors.md)

## 预览

> 已通过 Zero MCP 获取 Relay 截图。当前根节点 `2075:2390` 是 320×938 的变体展示面板，内部每个信息区 symbol 宽 274 DP。

## 布局位置

信息区在 Relay 中以 274 DP 宽 symbol 表达，落到沉浸视频页时固定锚定左下区域，位于播放进度线和底部评论栏上方，右侧不得侵入互动区。

| 项 | 规格 | 来源 / 备注 |
|---|---|---|
| 容器定位 | absolute | 覆盖在视频画面上，不参与视频内容流 |
| 左边距 | 11 DP | 与进度线左边距一致 |
| 顶部位置 | 672 DP | 当前 375×812 机型实现值 |
| 宽度 | 274 DP | 需避开右侧互动区 |
| 单行高度 | 46 DP | 昵称 20 + gap 8 + 文案行 18 |
| 双行高度 | 64 DP | 昵称 20 + gap 8 + 文案区域 36 |
| 层级 | z-index 20 | 低于互动区，高于视频内容 |
| 内部布局 | column | 昵称在上，文案行在下 |
| 行间距 | 8 DP | 昵称与文案行之间 |

## 色彩

| 用途 | Token / 值 | 说明 |
|---|---|---|
| 昵称 | `color_primary_text` / `#ffffff` | 深色视频上的一级可读文字 |
| 展开 / 收起 | `color_primary_text` / `#ffffff` | 操作入口需要保持清晰 |
| 文案 | `rgba(255,255,255,0.90)` | Relay 实际值，比昵称弱一层 |
| 标签底色 | `rgba(255,255,255,0.10)` | 原创标签 / 达人标签背景 |
| 达人徽章底色 | `linear-gradient(38deg, #FFA700 0%, #FF8700 100%)` | 12×12 圆形徽章 |
| 达人徽章描边 | `#FF9916` / 0.43 DP | Relay 实际值 |
| 文字阴影 | `0 0 2px rgba(0,0,0,0.30)` | Relay 实际值 |

## 文字

| 元素 | Token | 字号 / 行高 / 字重 | 规则 |
|---|---|---|---|
| 昵称 | `pingfang_medium/font_size_16_500` | 16 / 20 / 500 | 单行展示，过长省略 |
| 文案 | `pingfang_regular/font_size_14_400` | 14 / 18 / 400 | 单行或双行，双行第二行标签文本局部行高 20 |
| 展开 / 收起 | `pingfang_regular/font_size_14_400` | 14 / 18 / 400 | 固定文案，不换行 |
| 达人标签 | `pingfang_regular/font_size_11_400` | 11 / 10 / 400 | 当前样例「数码达人」 |
| 原创标签 | `pingfang_regular/font_size_10_400` | 10 / 9 / 400 | 当前样例「原创」 |

## 尺寸与间距

| 项 | DP | 说明 |
|---|---:|---|
| 容器宽度 | 274 | 基础形态统一宽度 |
| Relay 展示面板 | 320×938 | 根节点 `2075:2390` |
| 单行 symbol | 274×46 | 单行、省略有无、标签有无 |
| 双行 symbol | 274×64 | 双行文案 |
| 昵称行高 | 20 | 与 16 字号匹配 |
| 文案行高 | 18 | 与 14 字号匹配 |
| 双行文案区高度 | 36 | 两行文案区域 |
| 昵称 / 文案间距 | 8 | 信息层内部主间距 |
| 文案与展开入口间距 | 8 | 保证入口不贴字 |
| 展开入口宽度 | 28 | 两字中文 14px 固定宽度 |
| 展开入口高度 | 18 | 与文案行高一致 |
| 原创标签高度 | 14 | padding 3，圆角 2 |
| 原创标签与文案间距 | 4 | Relay 实际 gap |
| 达人标签高度 | 18 | padding 3，圆角 3 |
| 达人标签与昵称间距 | 8 | Relay 实际 gap |
| 达人徽章 | 12×12 | 圆形徽章 + 内部 icon |

## 容器与材质

基础信息区不使用独立背景色，不加圆角，不加描边。文字依赖阴影保证在不同视频画面上的可读性。原创标签和达人标签使用 `rgba(255,255,255,0.10)` 半透明底，不给整个信息区套整块蒙层。

## 层级关系

| 层级 | 元素 | z-index | 说明 |
|---|---|---:|---|
| 视频内容 | `video-content` | 0 | 信息区背景 |
| 信息区 | `info-layer` | 20 | 内容说明层 |
| 互动区 | `interactive-area` | 30 | 点赞 / 评论 / 种草 / 分享等强操作 |
| 底部栏 | `bottom-tab` | 45 | 评论输入 / 内容通条 |

## 响应与动效参数

| 场景 | 属性 | 参数 |
|---|---|---|
| 上滑 / 下滑切换视频 | opacity | 1 → 0 → 1 |
| 上滑 / 下滑切换视频 | transform | `translateY(-22px)` 或 `translateY(22px)` |
| 切换时长 | transition | 220ms `cubic-bezier(0.2, 0, 0, 1)` |
| 展开 / 收起 | height | 内容高度随文案行数变化，推荐 180ms ease |

## Token 待办

- Relay 实际值为 `rgba(255,255,255,0.90)` 与 `rgba(0,0,0,0.30)`，当前未在 V16 token 中找到明确语义 token，先保留实际值并标记 token-miss。
- spacing token 尚未绑定，`2 / 3 / 4 / 8 / 12 / 28 / 274` 等实现值需后续与 V16 spacing 表对齐。
