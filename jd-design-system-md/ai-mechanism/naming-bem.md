---
file: naming-bem
last_updated: 2026-04-29
---

# 命名规范 · BEM-flavored

> 组件 / Token / 文件 / Figma 图层全部遵守同一套命名规则。**统一命名 = AI 消费的前提**。

---

## 1. 组件名(PascalCase)

```
Button              ✅
IconButton          ✅
ProductCard         ✅
button              ❌ 小写开头
icon-button         ❌ 横线
ICONBUTTON          ❌ 全大写
Icon_Button         ❌ 下划线
```

子组件:点号嵌套
```
Button.Icon
Tabs.Item
Card.Title
NavBar.Action
```

---

## 2. Token 名(dot.delimited)

```
{category}.{subcategory}.{role}.{state?}

✅ color.brand.primary
✅ color.brand.primary.pressed
✅ color.semantic.danger
✅ typography.button.L
✅ spacing.4
✅ radius.button
✅ motion.duration.fast

❌ brandPrimary       (大小写混)
❌ color-brand-primary (横线)
❌ COLOR_BRAND        (全大写)
```

---

## 3. 文件名(kebab-case)

```
✅ business.md
✅ ai-schema.md
✅ color-usage.md
✅ ios-android-diff.md

❌ business_md.md     (下划线)
❌ businessLogic.md   (大小写)
❌ ColorUsage.md      (PascalCase 是组件名)
```

---

## 4. CSS 变量名(kebab + 前缀)

```
--color-brand-primary
--color-brand-primary-pressed
--spacing-4
--radius-button
--motion-duration-fast
```

来自 Token 名,把 `.` 替换为 `-`,加 `--` 前缀。

---

## 5. Figma 图层命名

### 组件
```
Button / Primary / Default
        ^         ^
        type      state
```

### 楼层 / 模块
```
[Page] PDP / [Section] 商品图 / [Block] 主图轮播
```

### 文档结构
```
🟦 Foundations
  ├── 🎨 Tokens
  ├── 📐 Layout
  └── 🔤 Typography
🟢 Components
  ├── ⚡ Action
  ├── ✏️ Input
  └── 🎴 Display
```

---

## 6. 业务组件下沉到 BG 目录

业务组件的命名带 BG 前缀(可选,在 BG 内部不带):
```
RetailBg.ProductCard
FreshBg.ProductCard
HealthBg.DoctorCard
```

跨 BG 引用时带前缀,BG 内部省略前缀。

---

## 7. 反例

| ❌ 反面 | 解释 |
|---|---|
| 同一个组件多种命名(Button / Btn / IconButton / IconBtn) | 不一致 |
| Token 命名英文混中文 | AI 消费失败 |
| Figma 图层不命名(矩形 1 / 矩形 2) | 工具链断裂 |
| 业务方私自定义新组件名 | 走治理流程 |
