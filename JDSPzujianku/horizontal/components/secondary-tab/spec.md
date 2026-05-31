---
file: spec
bundle_part_of: design.md
slug: "secondary-tab"
last_synced: "2026-05-30"

uses_tokens:
  colors:
    - "品牌色 color/primary-light"
    - "品牌色 color/primary"
    - "背景 color/background 1"
    - "文字 color/tittle"
  typography:
    - "PingFang SC 14/14.02 500"
    - "PingFang SC 14/14.02 400"
  radius:
    - "4"
  spacing:
    - "2"
    - "6"
    - "8"
    - "10"
    - "12"
---

# 二级 Tab · 视觉规范

> design.md → [index](./design.md) · 同 bundle: [variants](./variants.md) · [behaviors](./behaviors.md)

## 预览

Relay 根节点 `2131:27` 是 576 x 300 的组件说明面板。组件主形态为 375 x 44 的横向滑动二级分类条，item 高度统一 28 px，右侧可固定 28 x 28 加号入口。

## 布局尺寸

| 项 | 规格 | Token / 规则 | 说明 |
|---|---:|---|---|
| 外层滑动容器 | 375 x 44 | 页面宽度规格 | 适配 375 机型宽度 |
| 容器上下 padding | 8 + 8 | `spacing_md` | 44 = 28 item + 16 padding |
| 滚动区 | 331 x 28 | 固定宽度 | 为右侧入口留出空间 |
| 滚动区左右 padding | 8 + 8 | `spacing_md` | item 不贴边 |
| 全部 tab 行 | 375 x 28 | 固定宽度 | 展示全量分类的单行示例 |
| tab item 高度 | 28 | 固定规格 | 与加号入口等高 |
| tab item 横向 padding | 12 + 12 | `spacing_lg` | 文案两侧留白 |
| tab item 纵向 padding | 6 + 6 | `spacing_sm` / 待确认 | 与 14 字号形成 28 高 |
| item 间距 | 8 | `spacing_md` | 横向分类间距 |
| item 内部 gap | 10 | token-miss | 当前 item 仅文字，gap 为 auto-layout 残留值 |
| 加号入口 | 28 x 28 | 固定规格 | 位于右侧 |
| 加号 icon | 24 x 24 | icon 标准尺寸 | 外层 padding 2 |

## 色彩

| 用途 | Relay 变量 / Token | 值 | 说明 |
|---|---|---|---|
| 选中背景 | `品牌色 color/primary-light` | `#fff0f4` | 轻量品牌选中底色 |
| 选中文字 | `品牌色 color/primary` | `#ff0f23` | 选中态强调 |
| 非选中背景 | `背景 color/background 1` | `#f5f6fa` | 默认底色 |
| 非选中文字 | `文字 color/tittle` | `#171a26` | 默认文字 |
| 容器背景 | white / token-miss | `#ffffff` | 需确认是否映射到 background 2 |
| 说明标注文字 | token-miss | `#000000` | 仅设计稿说明，不进入组件实现 |

## 文字

| 元素 | 字体 | 字号 / 行高 | 字重 | 颜色 | 规则 |
|---|---|---:|---:|---|---|
| 选中项文案 | PingFang SC | 14 / 14.02 | 500 | `#ff0f23` | 居中，不换行 |
| 非选中项文案 | PingFang SC | 14 / 14.02 | 400 | `#171a26` | 居中，不换行 |
| 说明标注 | PingFang-SC | 14 / 14.02 | 400 | `#000000` | 仅 Relay 说明文字 |

## 圆角与图标

| 元素 | 规格 | 说明 |
|---|---:|---|
| tab item 圆角 | 4 px | 选中与非选中一致 |
| 加号入口圆角 | 4 px | 与 item 同圆角 |
| 加号 icon | 24 x 24 | 使用全局 `icon-add` |
| 加号 icon 容器 padding | 2 px | 保证 icon 居中 |

## Token 待办

- `#ffffff` 容器背景需确认是否使用 `背景 color/background 2`。
- `6px` 纵向 padding 当前按 `spacing_sm` 处理，需设计系统确认。
- item 内部 `gap: 10px` 在纯文字场景没有实际视觉作用，正式实现可不暴露。
