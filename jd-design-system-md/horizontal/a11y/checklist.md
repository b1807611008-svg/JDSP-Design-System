---
file: a11y-checklist
last_updated: 2026-04-29
---

# 无障碍接入 Checklist

> 任何组件 / 页面 PR 必须通过本 checklist。**未通过 = PR 自动 block**。

---

## 1. 视觉对比度

- [ ] 文本对比度 ≥ 4.5:1(正文 < 18pt)
- [ ] 文本对比度 ≥ 3:1(大字 ≥ 18pt 或 14pt+bold)
- [ ] 非文本对比度 ≥ 3:1(图标 / 按钮边)
- [ ] 状态信息**不仅靠颜色**(必须配图标 / 文字)
- [ ] 深色模式下色彩组合达标

**工具**:Stark / Adobe Color / Figma 自带

---

## 2. 触达区

- [ ] 所有可点击元素 ≥ 44pt × 44pt(实际触达区,可通过透明热区扩大)
- [ ] 可点击元素之间间距 ≥ 8pt(防误触)
- [ ] 关键操作单独占行,不与其他可点元素相邻

---

## 3. 屏幕阅读器(VoiceOver / TalkBack)

- [ ] 所有可点击元素有 voiceover label
- [ ] Label 描述动作("加入购物车"而非"按钮 1")
- [ ] 状态变化(loading / disabled)传达给屏幕阅读器
- [ ] 阅读顺序符合视觉流(从上到下,从左到右)
- [ ] 装饰性图片标记 `aria-hidden`(不读)

---

## 4. 键盘可达(iPad / 折叠屏)

- [ ] 所有交互可通过 Tab 键访问
- [ ] 焦点状态清晰可见(`shadow.inner.input-focus` 或 outline)
- [ ] Esc 关闭模态
- [ ] Enter 提交表单 / 触发主操作

---

## 5. 减少动效

- [ ] 系统"减少动效"开启时,大幅度动效退化为淡入或瞬时切换
- [ ] 必要动效(loading / 反馈)保留
- [ ] 礼花 / 大装饰动效完全跳过

---

## 6. 字号缩放

- [ ] 系统字号 85% 不崩
- [ ] 系统字号 100%(默认)正常
- [ ] 系统字号 150% 不崩
- [ ] 字号 150% 时按钮文字不截断(可换行 / 缩字号)
- [ ] 价格不截断(铁律)

---

## 7. 文案 / 认知

- [ ] 错误提示具体说明问题("手机号格式错误")
- [ ] 错误提示给出修复建议("请输入 11 位手机号")
- [ ] 不指责用户("您的输入有误"是反例)
- [ ] 流程步骤线性(不让用户来回跳)
- [ ] 必填项标注 `*`

---

## 8. 触觉反馈(可选)

- [ ] 关键操作有触觉反馈(加购 / 收藏 / 切换 Tab)
- [ ] 错误用 Heavy haptic
- [ ] 用户可在系统设置关闭(代码不强制触发)

---

## 9. 视频 / 音频

- [ ] 视频内容有字幕(默认开启)
- [ ] 音频反馈有视觉冗余(视频静音也能用)
- [ ] 自动播放 muted

---

## 10. 测试矩阵

| 测试维度 | 必做 | 工具 |
|---|---|---|
| 对比度 | ✅ | Stark / Adobe Color |
| 触达区 | ✅ | 屏幕尺寸下视觉 review |
| VoiceOver | ✅ | iOS VoiceOver |
| TalkBack | ✅ | Android TalkBack |
| 极端字号 | ✅ | iOS / Android 字号设置 |
| 减少动效 | ✅ | 系统设置开启验证 |
| 深色模式 | ✅ | 系统切换 |
| 弱网 | 推荐 | Charles 限流 |

---

## 11. CI 自动跑

```yaml
a11y_ci_checks:
  - contrast_ratio: 自动扫描所有 token 组合
  - touch_target: 静态分析组件最小尺寸
  - voiceover_label: 校验 ai-schema.md 中字段存在
  - color_only_signal: 扫描状态色与图标/文字配套
  - extreme_font_scaling: 自动跑 85% / 150% 截图
```

---

## 12. 通过证书

通过本 checklist 的组件 / 页面在 ai-schema.md 标记:
```yaml
a11y:
  certified: true
  certified_date: 2026-04-29
  certified_by: a11y-review-bot
```

未标记 certified 的不允许进入 stable 状态。
