---
file: typography-usage
last_updated: 2026-04-29
---

# 字体用法 · Typography

> 字号阶梯见 [[../tokens/typography.md]]。本文讲"什么内容用什么阶"。

---

## 1. 内容 → 字号映射

| 内容类型 | 字号 Token | 字重 |
|---|---|---|
| 页面主标题(导航栏) | `heading.h2` (20pt) | semibold |
| 模块标题(楼层 / 频道) | `heading.h2` 或 `h3` | semibold |
| 商品标题(列表 / 卡片) | `heading.h4` (15pt) | medium / semibold |
| 商品标题(PDP)| `heading.h2` (20pt) | semibold / bold |
| 价格(PDP 主)| `display.m` (28pt)+ number 字族 | bold |
| 价格(列表卡)| `heading.h2` (20pt)+ number 字族 | bold |
| 价格(双列卡)| `heading.h3` (17pt)+ number 字族 | bold |
| 划线价 | `caption.l` (12pt) | regular,删除线 |
| 描述 / 正文 | `body.m` (15pt) | regular |
| 备注 / 时间戳 | `caption.l` (12pt) | regular |
| 角标 / Tag | `caption.m` (11pt) | medium |
| 大促主标题 | `display.l/xl` | bold + brand 字族 |

---

## 2. 价格 · 京东特色

价格是电商页面的视觉焦点,京东设计有 4 条铁律:

1. **价格用 number 字族**(等宽数字),避免跳动抖动
2. **价格用品牌红**(`color.functional.price` = brand.primary),不用其他色
3. **价格用 bold 字重**,与正文形成强对比
4. **整数大小数小**:"¥**99**.00",元角分大小不一

**实现**:
```
typography.price.large   = display.m + bold + number 字族
typography.price.medium  = heading.h2 + bold + number 字族
typography.price.small   = body.l + semibold + number 字族
```

整数大小数小通过分段字号实现,详见 [[../components-base/display/price/visual.md]]。

---

## 3. 文字层级原则

**一段文字最多 3 个层级**:
- 主标题(`text.primary` + 字重)
- 副标题(`text.secondary` 或 同字号但弱字重)
- 辅助说明(`text.tertiary`)

**忌**:
- 4+ 层级混用,视觉混乱
- 同一段落多种字重(用色彩拉层级,不用字重堆层级)

---

## 4. 行间距 / 段间距

- 行间距:由字号 Token 自带,不允许自定义
- 段间距:`spacing.4` (8pt) 或 `spacing.6` (12pt)
- 模块间标题与正文:`spacing.6` (12pt)

---

## 5. 文字截断

| 场景 | 处理 |
|---|---|
| 商品标题(双列卡) | 2 行截断,省略号 |
| 商品标题(PDP) | 不截断,完整展示 |
| 单行标签 | 1 行截断,省略号 |
| 长文本(评价 / 详情) | 折叠展开按钮 |

**铁律**:**价格不允许截断**。无论多长,价格必须完整展示(必要时缩字号)。

---

## 6. 多语言考虑

英文 / 西语字符宽度差异大,设计稿必须包含多语言版本:
- 按钮文案:中文 6 字 ≈ 英文 12 字符 ≈ 西语 14 字符
- 卡片标题:中文 2 行 ≈ 英文 3 行,布局必须容纳

---

## 7. 反例

详见 [[donts.md]]。
