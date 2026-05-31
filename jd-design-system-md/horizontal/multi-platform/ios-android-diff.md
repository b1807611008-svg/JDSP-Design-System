---
file: ios-android-diff
last_updated: 2026-04-29
---

# iOS / Android 差异

> iOS HIG 与 Material Design 的核心差异表。**京东 APP 在两端尽量统一,但保留必要的平台特性**。

---

## 1. 导航

| 维度 | iOS | Android |
|---|---|---|
| 标题位置 | 居中 | 左对齐(可配置)|
| 返回按钮 | 文字"返回" + 箭头 | 仅箭头 |
| 系统手势返回 | 左滑边缘 | Android 系统返回键 / 手势 |
| 导航栏背景色 | 白色 / 沉浸 | 同 iOS |

---

## 2. Tab Bar / 底部导航

| 维度 | iOS | Android |
|---|---|---|
| 高度 | 49pt + safe area | 48pt + safe area |
| 选中态视觉 | 京东红填充 + 加粗 | 同 iOS |
| 角标 | 圆形红底白字 | 同 iOS |

---

## 3. 模态

| 维度 | iOS | Android |
|---|---|---|
| Dialog 按钮排列 | 取消左 / 主按钮右 | 取消左 / 主按钮右(Material 3 一致) |
| Sheet 拖拽条 | 4pt × 36pt 顶部 | 同 iOS |
| Toast 位置 | 屏幕中央 | 屏幕底部(Material 推荐)|
| Action Sheet | 系统级 | 自定义 Sheet |

> **京东选择**:Toast 统一在屏幕中央(跨端一致性优先于平台习惯)。

---

## 4. 字体

| 维度 | iOS | Android |
|---|---|---|
| 默认字族 | SF Pro + 苹方 | Roboto + 思源黑体 |
| 字重支持 | 400/500/600/700 | 同 iOS |
| 数字字族 | SF Pro 等宽 | Roboto 等宽 |

---

## 5. 手势 / 触觉

| 维度 | iOS | Android |
|---|---|---|
| 触觉 API | UIImpactFeedbackGenerator | HapticFeedbackConstants |
| 长按 | 系统支持 | 系统支持 |
| 边缘左滑返回 | 系统手势 | 自定义实现(谨慎) |
| 3D Touch / Long Press | iOS 13+ Long Press | 长按 |

---

## 6. 状态栏

| 维度 | iOS | Android |
|---|---|---|
| 高度 | 44pt(iPhone 12+)/ 20pt(老款) | 24pt |
| 文字色切换 | API 自动 | API 自动 |
| 沉浸式 | 透明背景 | 透明 + 沉浸标记 |

---

## 7. 转场动画

| 维度 | iOS | Android |
|---|---|---|
| 默认 | 右滑入(stack push)| 淡入 / 上滑(Material 3) |
| 主转场 | UINavigationController | Activity / Fragment 转场 |
| 共享元素 | Hero | Shared Element Transition |

---

## 8. 弹窗 / 通知

| 维度 | iOS | Android |
|---|---|---|
| 系统级 push | UNUserNotificationCenter | NotificationManager |
| 应用内 banner | 自定义 | 自定义 |
| 优先级管理 | 重要通知 / 时间敏感 | NotificationChannel |

---

## 9. 其他平台特性

| 特性 | iOS | Android |
|---|---|---|
| Dynamic Island | iPhone 14 Pro+ | - |
| Always-on Display | iPhone 14 Pro+ / Apple Watch | 部分高端机 |
| 桌面小组件 | iOS 14+ | Android 12+ |
| App 切换 | 滑动 + Home 手势 | 系统级 |
| 暗色模式 | iOS 13+ | Android 10+ |
| 折叠屏 | iPhone 16 折叠(传闻) | 系统级支持 |

---

## 10. 京东选择(平衡)

```
✅ 跨端一致性优先:Tab Bar / Toast / 主 CTA / 颜色 / 字号阶梯
✅ 平台特性保留:返回手势 / 系统级触觉 API / 字体默认
⚠️ 平台差异通过 Token 表达:`size.android.tabbar` vs `size.ios.tabbar`
```

---

## 11. 反例

| ❌ 反面 | 解释 |
|---|---|
| iOS 用 Android 风格的 Toast 在底部 | 用户对端预期错位 |
| Android 强制实现 iOS 边缘左滑返回 | 与系统手势冲突 |
| 跨端字号阶梯不一致 | 跨设备视觉跳动 |
| 仅在 iOS 测试 / 仅在 Android 测试 | 漏掉差异 bug |
