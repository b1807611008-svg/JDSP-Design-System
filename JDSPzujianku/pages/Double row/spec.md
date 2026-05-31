---
file: spec
bundle_part_of: design.md
slug: double-row
last_synced: "2026-05-31"

uses_tokens:
  colors:
    - color_primary_text
    - color_background_component
    - color_primary
    - color_title
    - color_primary_disabled_special
    - color_service_text
    - color_primary_light
    - color_text
    - "TODO: token-miss #BBBDF1 / #5E5CFF / #D9DEF1 / #4A0CFE / #B4B8F0 / #D5D7FF / #1721FF / #FF9A47"
    - "TODO: rgba-suggestion #000000@40% / #FFFFFF@90% / #FE3666@10% / #FFFFFF@0%"
  typography:
    - pingfang_regular/font_size_11_400
    - pingfang_regular/font_size_14_400
    - pingfang_regular/font_size_16_400
    - "TODO: PingFang Medium 13/16/20 需确认映射"
    - "TODO: PingFang Semibold 60/80/15 为白皮书标题或非 V16 app 字号"
  radius:
    - radius_s
    - radius_base
    - radius_l
    - "TODO: 15 / 23 / 30 / 100 / 200 需确认胶囊或标注图形规则"
  spacing:
    - spacing.0
    - spacing.2
    - spacing.4
    - spacing.6
    - spacing.7
    - spacing.8
    - spacing.12
    - spacing.40
    - "TODO: 10 / 9 / 14 / 11 / 30 / 3 / 5 / 23 为 half-step 或 token-miss"
  materials: []
---

# 双列 · 视觉规范

> design.md → [index](./design.md) · 同 bundle: [variants](./variants.md) · [behaviors](./behaviors.md)

## 预览

⚠️ `preview.png` 未导出：Relay `exportAsync` 成功后 `base64Encode` 返回 `Maximum call stack size exceeded`。请后续从 Relay 节点 `1758:251` 手动导出并放入同目录。

## 色彩

| 用途 | Token | 实际值 | 状态 |
|---|---|---|---|
| 白色内容/反白 | `color_primary_text` | `#FFFFFF` | ✅ 需按用途复核 |
| 组件背景 | `color_background_component` | `#F5F6FA` | ✅ |
| 品牌主色 | `color_primary` | `#FF0F23` | ✅ |
| 一级文字 | `color_title` | `#171A26` | ✅ |
| 置灰/禁用 | `color_primary_disabled_special` | `#828794` | ✅ |
| 服务/利益点文字 | `color_service_text` | `#B5691A` | ✅ |
| 主色浅底 | `color_primary_light` | `#FFF0F4` | ✅ |
| 二级文字 | `color_text` | `#3D414D` | ✅ |
| 遮罩/透明黑 | TODO | `#000000@40%` | ⚠️ rgba-suggestion |
| 半透明白 | TODO | `#FFFFFF@90%` / `#FFFFFF@0%` | ⚠️ rgba-suggestion |
| 装饰紫/蓝/橙 | TODO | `#BBBDF1` / `#5E5CFF` / `#D9DEF1` / `#4A0CFE` / `#B4B8F0` / `#D5D7FF` / `#1721FF` / `#FF9A47` | ⚠️ token-miss |

## 文字

| 文本角色 | 字体组合 | Token / 状态 |
|---|---|---|
| 用户昵称、互动数据 | PingFang SC Regular 11 | `pingfang_regular/font_size_11_400` |
| 二级 tab / 筛选项 | PingFang SC Regular 14 | `pingfang_regular/font_size_14_400` |
| 基础说明 | PingFang SC Regular 16 | `pingfang_regular/font_size_16_400` |
| 内容标题 | PingFang-SC Medium 13 | ⚠️ Medium 需确认映射 |
| 顶部 tab | PingFang SC Medium 16 | ⚠️ Medium 需确认映射 |
| 白皮书标题 | PingFang SC Semibold 60 / 80 | ⚠️ 非 V16 app 字号阶梯 |
| 交互说明 | PingFang-SC Medium 20 | ⚠️ 非 V16 app 字号阶梯 |

## 圆角

| 实际值 | Token / 状态 | 用途推断 |
|---|---|---|
| 4 | `radius_s` | 小标签 / 小容器 |
| 6 | `radius_base` | 中等控件 |
| 8 | `radius_l` | 内容卡 / 图片容器 |
| 0.9167 / 1 / 1.3333 / 1.75 / 2.6667 | ⚠️ 跳过 | 图标内部曲率 |
| 15 / 23 / 30 / 100 / 200 | ⚠️ token-miss | 胶囊、装饰标注或白皮书说明图形 |

## 间距 / 布局

| 项目 | 实际值 | Token / 状态 |
|---|---|---|
| 双列主体列宽 | 176 | 结构尺寸，非 spacing token |
| 双列间距 | 7 | `spacing.7`（Feeds 横纵特殊值） |
| 内容区左右内边距 | 8 | `spacing.8` |
| 内容卡底部内边距 | 8 | `spacing.8` |
| UGC 信息与互动横向间距 | 8 | `spacing.8` |
| 头像与昵称间距 | 4 | `spacing.4` |
| 标签内部间距 | 2 / 4 | `spacing.2` / `spacing.4` |
| 页面说明块间距 | 40 | `spacing.40` |
| 抽取到的 half-step | 10 / 9 / 14 / 11 / 30 / 3 / 5 / 23 | ⚠️ 需按用途归并或说明 |

## 材质

未识别到 `Liquid Glass` / `Frosted Glass` 等材质实例。

---

## 章节原文（来源 Relay）

> 双列遵循栅格布局，特殊情况可自行处理

> 一级tab吸顶，二级tab吸顶

> 用户信息与互动属性 / 可延展的利益点信息 / 视频封面 3:4或1:1 / 关键信息
