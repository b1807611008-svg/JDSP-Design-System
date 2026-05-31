---
file: figma-organization
last_updated: 2026-04-29
---

# Figma 文件组织规范

> 京东设计系统 Figma 文件 = 设计师的"工作台" + AI 消费的"输入源"。**结构混乱 = 工具链断裂**。

---

## 1. 文件层级

```
京东设计系统(Team)
├── 🟦 京东 APP / Foundations             # Zone 2
│   ├── Tokens            (Figma Tokens Plugin)
│   ├── Components Base   (原子组件)
│   └── Layout & Typography
├── 🟢 京东 APP / Components Business     # Zone 4
│   ├── 主站事业群
│   ├── 京东超市
│   ├── 京东健康
│   └── ...
├── 🟠 京东 APP / Page Templates          # Zone 4 pages
│   ├── 首页
│   ├── PDP
│   ├── Cart
│   └── ...
├── 🟣 京东 APP / Brand & Promotion       # Zone 5 brand
│   ├── Logo
│   ├── 大促主题
│   ├── 子品牌资产
│   └── ...
└── 🔴 京东 APP / WIP                     # Work in progress
    └── 各设计师的草稿区
```

---

## 2. 页面命名

```
[组件类] Action / Button             # 原子组件
[业务] 主站 / ProductCard            # 业务组件
[页面] PDP / 主图区                   # 页面模块
[流程] Checkout / Step 2 选择地址    # 流程步骤
```

---

## 3. 图层命名

| 类型 | 命名 |
|---|---|
| 组件实例 | `Button / Primary / Default` |
| Variant 属性 | `type=primary, size=L, state=default` |
| 区块 | `Section: 商品图 / Block: 主图轮播` |
| 装饰 | `[Decoration] 礼花` |

**禁止**:
- 默认名(矩形 1 / 矩形 2)
- 中英文混(`Button按钮`)

---

## 4. Library 发布

每周三发布 Library 更新:
- 设计师 review → 合并到主 Library
- DS 维护组同步发布到工程团队
- 工程团队同步更新 token / 组件代码

---

## 5. Component / Variant

每个组件**只在 foundations Library 定义一次**,业务方不允许 detach。

```
Button (Component)
├── Property: type [primary, secondary, text, danger]
├── Property: size [L, M, S, XS, Mini]
├── Property: state [default, pressed, disabled, loading]
└── Property: block [boolean]
```

---

## 6. Auto Layout 规范

所有组件使用 Auto Layout:
- padding 引用 Token
- gap 引用 Token
- 不允许绝对定位(除装饰元素)

---

## 7. 标注与开发交付

- 标注:Figma 自带 Inspect + 京东 Zero 平台
- Token 引用:Inspect 中显示 `var(--color-brand-primary)`(非硬编码 `#fa2c19`)
- 切图:京东 Zero 自动导出多倍图

---

## 8. 反例

| ❌ 反面 | 解释 |
|---|---|
| 组件被业务方 detach 后修改 | Library 失效 |
| 同一组件多个 Library 版本(主站 vs 健康) | 应共享 foundations |
| Auto Layout 缺失 | 跨屏幕适配失败 |
| 图层命名不规范 | 工程团队对接混乱 |
| 设计稿不在京东设计系统 Team 内 | 不会被 Library 同步 |
