---
file: visual-donts
last_updated: 2026-04-29
---

# 视觉反例集合 · Visual Don'ts

> 历史踩过的坑。每条带规则 ID,CI 可自动检测。

---

## 色彩

### ❌ V_HARDCODED_COLOR · 硬编码色值
任何代码中 `#fa2c19` / `rgb(...)` 都是错的。必须 `var(--color-...)`。
**CI**:lint 扫描所有 CSS / Swift / XML。

### ❌ V_BRAND_RED_DENSITY · 京东红覆盖过高
一屏京东红(主 CTA + 价格 + 标签)累计面积 > 15%(品牌区/大促首屏除外)。
**为什么错**:稀释品牌色稀缺性。

### ❌ V_COLOR_ONLY_SIGNAL · 状态仅靠颜色
"红色提示错误"对色盲用户失效。必须配合图标 / 文字。

### ❌ V_TEXT_BUTTON_BRAND · 文字按钮用品牌红
与超链接混淆,识别率仅 41%。

---

## 字体

### ❌ V_FONT_SIZE_OFF_SCALE · 字号阶梯外
字号 14pt / 16pt(京东阶梯只有 11/12/13/15/17/20/24...)。

### ❌ V_PRICE_NO_NUMBER_FAMILY · 价格不用 number 字族
数字跳动抖动,影响品牌质感。

### ❌ V_HEADING_LEVEL_OVERFLOW · 一段 4+ 文字层级
视觉混乱,超过用户处理能力。

---

## 图像

### ❌ V_PRODUCT_IMG_TEXT_OVERLAY · 商品图叠加文字
影响商品识别。促销标识应用角标,不在主图上叠字。

### ❌ V_PRODUCT_IMG_BADGE_OVERFLOW · 商品图角标超 3 个
视觉密度过高,信息无法快速消化。

### ❌ V_BANNER_LOW_CONTRAST · Banner 文字对比度 < 4.5:1
弱视用户看不清。

### ❌ V_JOY_IN_SERIOUS_PAGE · Joy 出现在严肃信息页
订单异常 / 投诉 / 隐私政策不放 Joy。

---

## 布局

### ❌ V_NO_SAFE_AREA · 不考虑 safe area
固定底部 CTA 被 iPhone X+ home indicator 挡住。

### ❌ V_HARDCODED_PADDING · 硬编码 padding/margin
不引用 spacing token。

### ❌ V_DOUBLE_COL_HARDCODED · 双列卡硬编码宽度
应该 `(屏宽 - 边距×2 - gap) / 2`。

### ❌ V_TAB_BAR_TEXT_TRUNCATE · Tab Bar 文字截断
Tab Bar 文字必须 ≤ 4 字(中文)/ ≤ 8 字符(英文)。

---

## 图标

### ❌ V_ICON_SELF_DRAWN · 业务自绘图标
风格与 icon library 不一致。必须从库引用。

### ❌ V_ICON_HARDCODED_COLOR · 图标色值硬编码
图标色继承父元素 color,不允许 `<svg fill="#fa2c19">`。

### ❌ V_ICON_GRID_MISMATCH · 图标栅格不一致
不同栅格图标混用,视觉重量不一致。

---

## 阴影

### ❌ V_SHADOW_DECORATION · 阴影做装饰
阴影只服务于 elevation(层级感)。非交互卡片不要堆阴影。

### ❌ V_SHADOW_HARDCODED · 阴影硬编码
必须 `shadow.elevation.X` 或语义角色。

---

## 跨业务

### ❌ V_BG_OVERRIDE_FOUNDATION · 业务方覆盖 foundations
某 BG 把主色 / 圆角 / 字号自己改了,违反 L1 视觉一致性。
**正确做法**:走治理流程提扩展提案。

### ❌ V_NO_DARK_MODE · 不支持深色模式
新组件出生时必须有 dark variant。否则系统切换到深色时白屏闪烁。

---

## 维护

每条规则有规则 ID(如 `V_HARDCODED_COLOR`),引用方式:
```
[[visual/donts.md#V_HARDCODED_COLOR]]
```

新增反例提 PR,DS 维护组 7 天内 review。
