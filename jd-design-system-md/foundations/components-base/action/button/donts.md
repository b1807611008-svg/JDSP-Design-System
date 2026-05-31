---
file: donts.md
component: Button
owner_role: 集体维护
review_role: DS 维护组
last_updated: 2026-04-29
ci_check: enabled
---

# Don'ts · 反例集合

> 这份文件是**血泪集合**。每一条都来自真实的 A/B 实验失败、线上事故复盘、用研发现的认知错位、或评审委员会拍板的边界。
>
> **任何人**(设计师、PM、工程师、用研、运营)发现新反例都可以提 PR 加入本文。DS 维护组 7 天内 review。
>
> **CI 已配置**:违反本文规则的 PR 会被自动 block。

---

## 视觉 / 布局类

### ❌ MULTIPLE_PRIMARY · 一屏多个主按钮

**反例**:PDP 底部同时出现"加购物车"+"立即购买"两个 `primary` 按钮。

**为什么错**:
- 用户认知负荷增加(两个都"看起来主"导致选择困难)
- 数据:2024-Q3 A/B 实验,主+主组合 vs 主+次组合,加购率 -3.2%,GMV -1.8%

**正确做法**:
- "立即购买" `primary`(主)+ "加购物车" `secondary`(次)
- 或反过来,但**有且仅有一个 primary**

**自动检测**:CI 扫描页面模板,同一可视区域内 ≥ 2 个 `type=primary` 即报错。

---

### ❌ DISABLED_OPACITY_HACK · 用透明度模拟禁用

**反例**:`<Button type="primary" style="opacity: 0.5">` 来表达 disabled。

**为什么错**:
- 视障用户和高对比度模式用户**完全看不出**这是禁用
- 2025-Q1 用研:opacity 50% 的 disabled 识别率 27%,disabled token 识别率 89%
- 违反 WCAG 2.1 1.4.3(对比度 4.5:1)

**正确做法**:
```
✅ <Button type="primary" disabled>
   (内部使用 color.neutral.bg.disabled + text.disabled,不依赖透明度)
```

---

### ❌ HARDCODED_COLOR · 硬编码色值

**反例**:`<Button style="background: #fa2c19">`

**为什么错**:
- 主题切换失效(深色模式、618、双11 都需要重新覆盖)
- Token 体系断裂

**正确做法**:用 `type="primary"`,色值由 Token 决定。

**自动检测**:lint 扫描组件 `style` 属性出现 `#xxxxxx` 即报错。

---

### ❌ TEXT_BUTTON_BRAND_COLOR · 文字按钮用品牌红

**反例**:`<Button type="text" color="brand">查看更多</Button>`

**为什么错**:
- 与正文超链接(品牌红)视觉无差别
- 用户误以为是链接,而非可执行操作
- 用研:品牌红文字按钮的"知道这是按钮"识别率 41%,中性色文字按钮 73%

**正确做法**:文字按钮使用 `color.neutral.text.primary`,可加右箭头图标增强"可执行"感知。

---

### ❌ NESTED_BUTTON · 按钮嵌套按钮

**反例**:`<Button>立即购买 <Button size="mini">查看券</Button></Button>`

**为什么错**:
- 点击区冲突(用户不知道点击会触发哪个动作)
- 无障碍工具读屏混乱

**正确做法**:用 `Button.Group` 或拆分为两个独立按钮。

---

## 状态 / 交互类

### ❌ LOADING_NOT_BLOCKING · loading 状态不拦截点击

**反例**:loading 时按钮变小转圈,但仍可点击。

**为什么错**:
- 用户连续点击导致重复提交
- **2024-12-08 线上事故**:支付按钮 loading 不拦截 → 用户连点 → 重复扣款 → 涉及金额数万元 → 当周修复 → 全量加自动测试

**正确做法**:loading 状态等价于 disabled,屏蔽点击事件。

---

### ❌ DISABLED_NO_REASON · 禁用不给理由

**反例**:按钮 disabled 但用户不知道为什么。

**为什么错**:
- 用户挫败感强,以为是 bug
- 客服咨询量增加

**正确做法**:
- 紧贴按钮上方/下方加 helper text 说明原因(例如"请先选择规格")
- 或使用 Toast 在用户点击禁用按钮区域时提示
- 详见 `[[interaction.md#disabled-feedback]]`

---

### ❌ CLICK_AREA_TOO_SMALL · 可点区小于 44pt

**反例**:`size="Mini"` 按钮无透明热区扩大。

**为什么错**:
- 老年用户、运动场景下点击失败率高
- 违反 WCAG 2.1 / iOS HIG / Material Design 共识

**正确做法**:小尺寸按钮通过 padding 透明热区扩大到 44pt × 44pt。

---

## 文案 / 内容类

### ❌ WORDING_TOO_LONG · 文案超长

**反例**:`<Button>立即购买并享受免费配送</Button>`

**为什么错**:
- 按钮内文字截断(`...`)严重影响识别
- 决策成本增加

**正确做法**:
- L size:中文 ≤ 6 字 / 英文 ≤ 12 字符
- M size:中文 ≤ 5 字 / 英文 ≤ 10 字符
- S/XS size:中文 ≤ 4 字 / 英文 ≤ 8 字符
- 详见 `[[content.md#max-length]]`

---

### ❌ AMBIGUOUS_VERB · 文案动词不明

**反例**:`<Button>OK</Button>` / `<Button>提交</Button>`(在多步骤场景中)

**为什么错**:
- 用户不知道点击后发生什么
- 多步骤流程中"提交"歧义大(提交订单?提交申请?提交评论?)

**正确做法**:用具体动词 + 对象,如"提交订单"、"确认支付"、"发布评论"。

---

### ❌ WORDING_CHANGE_NO_TEST · 改文案不做 A/B

**反例**:产品经理拍脑袋把"加购物车"改成"加入购物车"全量上线。

**为什么错**:
- Button 文案对转化率有非线性影响
- 历史教训:2024-Q4 某事业部把"立即购买"改"马上买" → 转化率 -1.4% → 回滚

**正确做法**:**任何全量按钮文案变更必须先 A/B,样本量 ≥ 100 万。**(治理强制约束,governance/quality.md)

---

## 业务 / 治理类

### ❌ BG_OVERRIDE_ATOM · 业务方覆盖原子按钮视觉

**反例**:某事业部为了"独家品牌感",把 ProductCard 内的 Button 圆角从 8pt 改成 24pt。

**为什么错**:
- 跨业务体验割裂(用户在主站和该事业部之间认知负担增加)
- 日后双列卡治理 / 主题切换出现冲突

**正确做法**:
- 业务诉求走治理流程提"扩展提案"
- 通过主题 Token 实现,不通过样式硬覆盖
- 详见 `[[horizontal/governance/contribution.md#extension-proposal]]`

---

### ❌ NEW_TYPE_NO_PROPOSAL · 私自新增 type

**反例**:某团队在自己代码里加了 `type="warning"`,绕过原子组件。

**为什么错**:
- type 是组件契约的一部分,私自扩展会让 AI 消费、Figma 同步、CI 校验全部失效

**正确做法**:走 governance/contribution.md 的"新 type 提案"流程,审批后由 DS 维护组实现。

---

## 这份 donts.md 的维护机制

1. **新增反例**:任何人发现都可以提 PR,模板:
   ```markdown
   ### ❌ {规则 ID 大写} · {简短描述}
   **反例**:...
   **为什么错**:(数据 / 用研 / 事故复盘)
   **正确做法**:...
   ```

2. **CI 自动检测**:每条反例标注 `ci_check: enabled` 后,DS 维护组配置 ESLint / Stylelint 规则。

3. **过期清理**:每半年 review 一次,如果"违反者"已经清零(过去 6 个月零次违规),可降级为 best-practice 而非硬约束。

4. **跨组件复用**:某些规则(`HARDCODED_COLOR` / `CLICK_AREA_TOO_SMALL`)适用于所有组件,会同步抽取到 `[[foundations/components-base/donts.md]]`(集体反例库),本文只保留 Button 专属反例。
