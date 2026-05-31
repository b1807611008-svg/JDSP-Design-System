---
zone: horizontal
section: multi-platform
last_updated: 2026-04-29
---

# 📱 多端适配 · Multi-Platform

> iOS / Android / 折叠屏 / iPad / 深色 / 字号缩放。**对应 PDF 大纲第 11 章**。

---

## 文档清单

| 文档 | 涵盖 |
|---|---|
| [[ios-android-diff.md]] | iOS / Android 平台差异详细表 |
| [[screen-size.md]] | 屏幕尺寸适配(320-1366pt)|
| [[dark-mode.md]] | 深色模式实现 + 例外 |
| [[font-scaling.md]] | 系统字号缩放(85%-150%)|
| ipad.md | iPad 双栏布局(待补 P2)|

---

## 适配维度

| 维度 | 京东 APP 覆盖 |
|---|---|
| 操作系统 | iOS 13+ / Android 7+ |
| 屏幕宽度 | 320-1366pt |
| 屏幕高度 | 568pt+ |
| 折叠屏 | 折/展开两态 |
| 深色模式 | 系统 / 应用 / 跟随系统 |
| 系统字号 | 85%-150% |
| 触觉反馈 | 系统支持检测 |
| Dynamic Island | iPhone 14 Pro+ |
| Always-on Display | iPhone 14 Pro+ / Apple Watch |

---

## 多端测试矩阵

新功能上线前必跑:

| 设备 | 屏宽 | 系统 | 必跑场景 |
|---|---|---|---|
| iPhone SE 3 | 375pt | iOS 17 | 极小屏 / 浅色 |
| iPhone 15 | 393pt | iOS 17 | 主基准 |
| iPhone 15 Pro Max | 430pt | iOS 17 | 大屏 / 深色 |
| Galaxy S24 | 384pt | Android 14 | 主 Android |
| Galaxy Z Fold 5 | 折 / 展开 | Android 14 | 折叠屏 |
| iPad Pro 12.9 | 1024pt | iPadOS 17 | 平板 |
| 老人机(华为畅享)| 360pt | Android 11 | 弱机型 |

---

## 与 a11y 的关系

多端适配 ⊂ 包容性。
- 字号缩放 → [[../a11y/font-scaling.md]]
- 减少动效 → [[../a11y/motion-reduce.md]]
- 触达区 → [[../a11y/touch-target.md]]
- 对比度(深色 / 字号下) → [[../a11y/color-contrast.md]]

---

## 维护

- **主 owner**:终端架构组 + DS 维护组
- **review**:每发版前跑测试矩阵
