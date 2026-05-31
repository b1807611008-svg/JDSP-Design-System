---
file: CHANGELOG.md
component: Button
auto_generated: true
last_updated: 2026-04-29
---

# CHANGELOG · Button

> 本文件由 CI 自动生成,基于 Git 提交历史 + governance/versioning.md 规则。
> 不要手动编辑。需补充上下文请用 `[[CHANGELOG.md#vx.y.z]]` 链接到对应版本的 PR / 评审记录。

---

## v1.4.2 · 2026-03-15

**Patch · 修复**
- 修复 dark mode 下 secondary 描边色对比度不达标(从 2.8:1 提升到 3.2:1)
- 修复 loading 状态下 spinner 旋转方向在 Android 不一致

**关联**:PR #2147、issue #1893

---

## v1.4.1 · 2026-02-28

**Patch · 修复**
- 修复 size=Mini 在 iOS 14 上文字垂直居中偏移 1pt

---

## v1.4.0 · 2026-02-10

**Minor · 增强**
- 新增 `block` 属性,支持撑满父容器
- `loading` 状态新增 spinner 颜色自动适配(根据 type 取 onColor 或 brand)
- 接入新版 `motion.button.press` Token(替换硬编码 200ms)

**关联**:RFC-1432

---

## v1.3.0 · 2026-01-08

**Minor · 增强**
- a11y:`voiceover_label` 自动生成(基于 text + state),无需手动配置
- 接入 `[[horizontal/a11y/checklist.md]]` 自动校验

---

## v1.2.0 · 2025-11-22

**Minor · 增强**
- 文案长度自动校验(超出 constraints 触发开发模式 warning)

---

## v1.1.0 · 2025-09-30

**Minor · 重大变更通知**
- ⚠️ disabled 状态从透明度模拟改为 disabled token(行为变更但 API 兼容)
- 升级原因:2025-Q1 用研发现视障用户识别率仅 27%
- 详见:`[[donts.md#disabled-opacity-hack]]`

---

## v1.0.0 · 2025-08-15

**Major · 初版发布**
- 5 size × 4 type × 5 state 完整矩阵
- 接入 design tokens v1.0(色彩 / 字体 / 间距 / 圆角 / 阴影)
- 接入 a11y 基础规范(WCAG 2.1 AA)

**关联**:京东设计系统总纲 v1.0 立项

---

## v0.x · pre-release(2025-04 ~ 2025-08)

预发布迭代记录见内部 Wiki(略)。
