---
zone: horizontal
section: a11y
last_updated: 2026-04-29
---

# ♿ 无障碍 · Accessibility

> WCAG 2.1 AA 在京东 APP 的具体实现。**无障碍不是某个组件的属性,是所有组件都必须满足的横向约束**。

---

## 文档清单

| 文档 | 用途 |
|---|---|
| [[checklist.md]] | 组件 PR 接入 a11y 的标准 checklist ★ |
| color-contrast.md | 对比度规范(待补 P1) |
| touch-target.md | 触达区(待补 P1) |
| screen-reader.md | VoiceOver / TalkBack 标签(待补 P1) |
| keyboard.md | 键盘导航(待补 P2,iPad/折叠屏) |
| motion-reduce.md | 减少动效(待补 P1) |
| font-scaling.md | 字号缩放(待补 P1) |

---

## 对应 PDF 第六章

| 章节 | 落到 a11y 文档 |
|---|---|
| 6.1 视觉(色彩对比 / 字号缩放 / 减少动效) | color-contrast / font-scaling / motion-reduce |
| 6.2 操作(可点区 / 滑动替代) | touch-target |
| 6.3 听觉(字幕 / 视觉冗余) | screen-reader |
| 6.4 认知(文案 / 流程 / 错误提示) | (跨多 doc 引用) |
| 6.5 屏幕阅读器适配 | screen-reader |

---

## 5 个包容维度

| 维度 | 标准 |
|---|---|
| 视觉 | 对比度 4.5:1(正文)/ 3:1(大字)/ 不仅靠颜色 |
| 运动 | 可点区 ≥ 44pt × 44pt / 长按有替代 |
| 听觉 | 视频字幕 / 音频反馈视觉冗余 |
| 认知 | 文案动词明确 / 流程线性 / 不用反讽 |
| 环境 | 字号 85%-150% / 弱网降级 |

---

## 京东适老模式

适老模式不是另一个 APP,是标准模式的"包容性增强分支":
- 字号默认 130-150%
- 信息密度从双列流改为单列大卡
- CTA 加大 + 描边强化
- 装饰简化

详见 [[../../knowledge/philosophy/inclusive.md]]

---

## CI 自动检测

每个 PR 自动跑:
- 对比度检测(色对比 < 4.5:1 报错)
- 触达区检测(< 44pt 报错)
- 极端字号渲染(85% / 150% 不崩)
- VoiceOver 标签缺失检测

详见 [[checklist.md]]

---

## 与组件 ai-schema 的关联

每个组件 ai-schema.md 必须有 a11y 字段:

```yaml
a11y:
  min_touch_target: 44pt
  contrast_ratio:
    text_on_primary: 4.5
  voiceover_label: required
  reduce_motion: respect
```

DS 维护组的 CI 任务校验该字段完整性。
