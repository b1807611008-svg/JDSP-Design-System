---
file: brand-color
last_updated: 2026-04-29
---

# 品牌色 · Brand Color

> 京东红 #fa2c19 是品牌护城河。**稀缺性 = 它的力量**。

---

## 1. 京东红

| Token | 值 | 用途 |
|---|---|---|
| `color.brand.primary` | `#fa2c19` | 主品牌色 |
| `color.brand.primary.pressed` | `#cc2615` | 按下态 |
| `color.brand.primary.subtle` | `#fff1f0` | 浅 wash |
| `color.brand.primary.dark` | `#ff4538` | 深色模式适配 |

**使用规则**:
- ✅ 主 CTA / 价格 / Tab Bar 选中 / Logo / 限时标识
- ❌ 文字按钮 / 大块装饰 / 错误提示(用 semantic.danger)
- 一屏京东红覆盖 ≤ 15%(品牌区/大促首屏除外)

详见 [[../../foundations/visual/color-usage.md#brand]]

---

## 2. 京东金

| Token | 值 | 用途 |
|---|---|---|
| `color.brand.gold` | `#f5a623` | 京东金 |
| `color.brand.gold.subtle` | `#fff8eb` | 浅 wash |

**用途**:
- PLUS 会员区
- VIP / 高端会员标识
- 春节大促辅助色

---

## 3. 大促渐变(主题包)

仅在大促主题切换时启用:

```
618 渐变:linear-gradient(135deg, #fa2c19, #ff7800)
1111 渐变:linear-gradient(135deg, #fa2c19, #b400ff)
春节金:linear-gradient(135deg, #ffcc00, #ff5500)
```

通过 Token 主题切换,组件代码不感知。

---

## 4. 子品牌辅助色

| 子品牌 | 辅助色 | 用途 |
|---|---|---|
| 京东健康 | `#1677ff`(蓝) | 医疗专业感 |
| 京东金融 | `#000000` + `#f5a623`(黑金) | 金融严肃感 |
| 京东国际 | `#fa2c19`(同主站) | 保持品牌主色 |
| 京东物流 | `#fa2c19` + `#0066cc`(物流蓝) | 配送场景 |

**铁律**:
- 子品牌**辅助色用于次要场景**(图标 / icon / 装饰)
- 主 CTA / 价格 **仍然必须使用京东红**
- 不允许子品牌主品牌色完全替换京东红

---

## 5. 反例

| ❌ 反面 | 解释 |
|---|---|
| 一屏京东红覆盖 30%+ | 稀释品牌色力量 |
| 子品牌完全脱离京东红 | 品牌断层 |
| 大促时硬编码渐变 | 应通过主题 Token |
| 错误提示用京东红 | 与主转化按钮混淆 |
