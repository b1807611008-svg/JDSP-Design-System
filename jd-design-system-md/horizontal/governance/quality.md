---
file: quality
last_updated: 2026-04-29
---

# 质量保障 · Quality

> 设计系统的质量约束 + CI 强制规则。**违反硬约束的 PR 自动 block**。

---

## 1. 硬约束(CI 自动 enforce)

| ID | 规则 | 检查方式 |
|---|---|---|
| HARDCODED_COLOR | 不允许硬编码色值 | lint(CSS / Swift / XML)|
| HARDCODED_SPACING | 不允许硬编码 padding/margin | lint |
| HARDCODED_RADIUS | 不允许硬编码圆角 | lint |
| HARDCODED_DURATION | 不允许硬编码动效时长 | lint |
| TOKEN_NOT_EXISTS | Token 引用必须存在于 tokens.json | static_analysis |
| AI_SCHEMA_INVALID | ai-schema.md YAML 必须合法 | yaml_validator |
| AI_SCHEMA_MISSING_FIELDS | ai-schema 必填字段缺失 | schema_validator |
| A11Y_CONTRAST_FAIL | 文本对比度 < 4.5:1 | a11y_check |
| A11Y_TOUCH_TARGET_FAIL | 触达区 < 44pt | static_analysis |
| BREAKING_CHANGE_NO_VOTE | Major 升级未走评审委员会 | governance_check |

---

## 2. 软约束(CI warning)

| ID | 规则 | 检查方式 |
|---|---|---|
| TEXT_LENGTH_RECOMMEND | 按钮文案超推荐长度 | warn_only |
| BG_OVERRIDE_FOUNDATION | 业务方覆盖 foundations | governance_review |
| NEW_VARIANT_REVIEW | 新增 variant 走治理 | governance_review |
| FONT_SIZE_OFF_SCALE | 字号在阶梯外 | warn_only |
| SHADOW_DECORATION | 阴影做装饰 | review |

---

## 3. PR Review Checklist

每个 PR 必过:

### 设计师 review
- [ ] 视觉符合 visual.md 规范
- [ ] Token 引用正确(无硬编码)
- [ ] 状态完整(default / pressed / disabled / loading / 空 / 错误)
- [ ] a11y checklist 通过(详见 [[../a11y/checklist.md]])

### 工程师 review
- [ ] 代码符合 ai-schema.md
- [ ] 单测覆盖(组件 prop 变体)
- [ ] 性能预算达标(60 FPS)
- [ ] 兼容旧 API(若 Minor)

### DS 维护组 review
- [ ] 文档更新(README / business / visual / ai-schema / CHANGELOG)
- [ ] 跨组件影响评估
- [ ] 版本号正确

### 业务 BG sign-off(Minor / Major)
- [ ] 至少 1 个 BG 验证
- [ ] 业务方迁移文档

---

## 4. 自动化测试

### 视觉回归(Visual Regression)
- 每个组件每次 PR 跑截图对比
- 浅色 / 深色 / 85% / 100% / 150% 字号 全部跑
- 差异超过阈值自动 block

### 性能监控
- 列表滚动 FPS
- 内存占用
- 启动时间
- 页面加载时间

### 用户行为埋点
- 关键 KPI(加购率 / 结算转化率)持续监控
- 异常下降自动告警

---

## 5. 弃用 / 删除审计

每周扫描:
- 引用 deprecated 组件 / Token 的代码
- 通知所属 BG owner 迁移
- 过渡期满未迁移 → 红色告警

---

## 6. 合规校验

| 项 | 检查 |
|---|---|
| 隐私 | 文案是否符合个人信息保护法 |
| 营销 | 通知是否符合广告法 / 反不正当竞争法 |
| 商品展示 | 价格 / 划线价是否符合明码标价规定 |
| 老年模式 | 是否提供字号缩放和适老界面 |

---

## 7. 失败时的回滚

| 触发条件 | 行为 |
|---|---|
| 关键 KPI 下降 > 1% | 立即回滚 |
| 线上事故(P0/P1) | 立即回滚 |
| 兼容性问题(部分设备崩) | 立即回滚 |
| 用户投诉激增 | 评估后回滚 |

回滚流程详见 governance/rollback.md(待补 P2)。

---

## 8. 反例

| ❌ 反面 | 解释 |
|---|---|
| 跳过 CI 直接合 PR | 治理失效 |
| 视觉回归差异过大未审 | 无意识 break |
| 不跑 a11y 自动测试 | 老人 / 视障用户体验差 |
| 性能问题不阻塞 PR | 上线后用户卡顿 |
| Major 直接发,无回滚预案 | 高风险 |
