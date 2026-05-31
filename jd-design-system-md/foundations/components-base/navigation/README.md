---
zone: foundations
section: components-base/navigation
last_updated: 2026-04-29
---

# 导航类组件 · Navigation

> 帮用户找到去哪 / 现在在哪 / 怎么回去。**TabBar 是京东 APP 的"地图"**,结构稳定 = 用户安全感。

---

## 组件清单

| 组件 | 状态 | 用途 |
|---|---|---|
| **TabBar** | stable | 底部主导航(5 Tab 不可变)|
| **NavBar** | stable | 顶部导航栏(标题 + 返回 + 操作)|
| **Tabs** | stable | 顶部分类 Tab(楼层 / 频道) |
| **Breadcrumb** | stable | 面包屑(分类页层级)|
| **Pagination** | beta | 分页(列表 / 表格)|
| **Stepper** | stable | 步骤条(结算 / 注册流程) |
| **BackTop** | stable | 回到顶部按钮 |
| **SideNav** | beta | 侧边导航(iPad / Web 端)|

---

## TabBar 关键设计

详见 [[../../interaction/navigation.md]]

- 5 Tab 固定结构(不允许临时改)
- 高度:49pt + bottom safe area
- 选中态:面性图标 + 京东红 + 文字加粗
- 角标:dot / 数字 / 文字 各一种

---

## NavBar 关键设计

```
[← 返回]  [页面标题]  [操作 1] [操作 2]
```

- 高度:44pt
- 标题:`heading.h2` semibold,居中
- 右侧操作 ≤ 2 个图标 + 1 个"⋯"菜单
- 沉浸式场景:背景透明 + 滚动渐变

---

## Tabs(顶部分类)

| 类型 | 用途 |
|---|---|
| Underlined | 默认,选中条 |
| Pill | 胶囊按钮风格(频道页常用)|
| Capsule | 圆角填充(大促主题)|

铁律:Tab 文案 ≤ 4 字(中文)/ ≤ 8 字符(英文),否则截断。

---

## Stepper(步骤条)

```
[1 已完成] ─→ [2 进行中] ─→ [3 待办]
   ✓             ●            ○
```

- 已完成:京东红 + 勾
- 进行中:京东红实心
- 待办:中性灰空心

---

## 反例

| ❌ 反面 | 解释 |
|---|---|
| TabBar 临时增减 Tab | 用户重新建立心智 |
| NavBar 标题位置漂移 | 用户找不到 |
| Tabs 文案被截断 | 用户看不全 |
| 沉浸式不切换状态栏色 | 文字看不见 |
| Pagination 在移动端用页码翻页 | 应用滚动加载 |
