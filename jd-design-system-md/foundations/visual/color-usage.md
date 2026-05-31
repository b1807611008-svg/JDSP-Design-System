---
file: color-usage
last_updated: 2026-04-29
---

# 色彩用法 · Color Usage

> 不复述 Token 色值,只讲"用在哪 / 不用在哪"。所有色值见 [[../tokens/color.md]]。

---

## 1. 京东红用法

✅ **必用**:
- 主 CTA(加购 / 立购 / 提交订单)
- 价格(主价 / 折扣价)
- Tab Bar 选中态
- Logo 区域
- 折扣 / 限时标签

❌ **不用**:
- 次要按钮文字
- 错误提示(用 `color.semantic.danger`,色相略偏)
- 大块背景填充(品牌区 / 大促首屏除外)
- 装饰图形

> **判断标准**:用户看到京东红应该立刻产生"这是品牌"或"这是关键操作"的条件反射。如果在普通装饰位用,稀释品牌力。

---

## 2. 状态色组合规则

| 状态 | 主色 | 文字色 | 背景色 |
|---|---|---|---|
| 成功 | `semantic.success` | `text.onColor`(白)| `success.subtle`(浅绿底)|
| 警告 | `semantic.warning` | `text.primary` 或 `text.onColor` | `warning.subtle` |
| 错误 | `semantic.danger` | `text.onColor` | `danger.subtle` |
| 提示 | `semantic.info` | `text.primary` 或 `text.onColor` | `info.subtle` |

**铁律**:状态信息**不能只靠颜色传达**。必须配合图标 / 文字说明,以满足色盲用户。

---

## 3. 中性色层级

```
text.primary    (主文字,1a1a1a / f0f0f0)
  ↓
text.secondary  (次文字,5a5a5a / a8a8a8)
  ↓
text.tertiary   (辅助,8a8a8a / 787878)
  ↓
text.disabled   (禁用,c8c8c8 / 5a5a5a)
```

**用法**:
- 标题用 `text.primary`
- 描述用 `text.secondary`
- 时间戳 / 计数等附加信息用 `text.tertiary`
- 禁用状态用 `text.disabled`

**忌**:同一段落混用 4 个层级。一个段落最多 2-3 个层级。

---

## 4. 对比度自检

每个色彩组合需通过 WCAG 2.1 AA:
- 正文(< 18pt)≥ 4.5:1
- 大字(≥ 18pt 或 14pt+bold)≥ 3:1
- 非文本(图标 / 按钮边)≥ 3:1
- 禁用状态可放宽至 3:1

**工具**:Stark / Adobe Color / Figma 自带对比度检测。

---

## 5. 深色模式色彩转换

设计师在 Figma 切换浅/深主题预览,**色值由 Token 自动映射**,不需要手动重新选色。

例外场景(深色模式特殊处理):
- 渐变 / 大促装饰色:深色模式下饱和度需手工降低 10-15%
- 价格 / 品牌区:深色模式略偏亮(`#ff4538` 而非 `#fa2c19`)以保持视觉冲击力
- 阴影:深色模式阴影更深 / 更宽,以保持层级感

---

## 6. 反例

详见 [[donts.md]]。
