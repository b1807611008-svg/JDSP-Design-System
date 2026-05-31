---
token_category: shadow
last_updated: 2026-04-29
---

# 阴影 Token · shadow

> 京东阴影克制,主要服务于 elevation(层级)感知。**不用阴影做装饰**。

---

## 1. Elevation 阶梯

> elevation 是抽象层级概念,通过阴影表达。

| Token | 阴影值(light) | 阴影值(dark) | 用途 |
|---|---|---|---|
| `shadow.elevation.0` | none | none | 与背景同层(默认状态)|
| `shadow.elevation.1` | `0 1px 3px rgba(0,0,0,0.06)` | `0 1px 3px rgba(0,0,0,0.30)` | 微抬升(默认卡片)|
| `shadow.elevation.2` | `0 2px 8px rgba(0,0,0,0.08)` | `0 2px 8px rgba(0,0,0,0.40)` | 浮动元素(底部 CTA / 悬停卡)|
| `shadow.elevation.3` | `0 4px 16px rgba(0,0,0,0.10)` | `0 4px 16px rgba(0,0,0,0.50)` | 模态 / 抽屉 |
| `shadow.elevation.4` | `0 8px 24px rgba(0,0,0,0.12)` | `0 8px 24px rgba(0,0,0,0.60)` | 顶级模态 / FAB |
| `shadow.elevation.5` | `0 12px 32px rgba(0,0,0,0.16)` | `0 12px 32px rgba(0,0,0,0.70)` | 拖拽中 |

**深色模式阴影更深**:背景已经暗,阴影需要更强对比才能感知层级。

---

## 2. 语义角色

| Token | 引用 | 用途 |
|---|---|---|
| `shadow.card` | `elevation.1` | 默认卡片 |
| `shadow.card-elevated` | `elevation.2` | 抬升卡片 |
| `shadow.modal` | `elevation.3` | 模态 |
| `shadow.fab` | `elevation.4` | 浮动操作按钮 |
| `shadow.dropdown` | `elevation.2` | 下拉菜单 |
| `shadow.tooltip` | `elevation.2` | 气泡提示 |
| `shadow.bottom-bar` | `elevation.2`(向上) | 底部固定栏 |

---

## 3. 特殊阴影

| Token | 值 | 用途 |
|---|---|---|
| `shadow.inner.input-focus` | `inset 0 0 0 2px rgba(250,44,25,0.20)` | 输入框聚焦内描边 |
| `shadow.inner.pressed` | `inset 0 1px 2px rgba(0,0,0,0.10)` | 按下凹陷感(慎用)|

---

## 4. 反例

| ❌ 反面 | 解释 |
|---|---|
| 用阴影做装饰(如非交互卡片大阴影) | 阴影只服务于层级 |
| 同一页面多种阴影规则混用 | 层级感混乱 |
| 自定义 RGBA 透明阴影 | 必须走 Token |
| 深色模式不调整阴影深度 | 看不见 |

---

## 5. 性能注意

- 阴影渲染开销大,**列表项不要使用 elevation.2 及以上**
- 移动端避免 `box-shadow` 模糊半径过大(> 32px)
- 大量动态阴影元素考虑用 elevation token 替代实时计算
