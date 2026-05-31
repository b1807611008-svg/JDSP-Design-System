---
file: ai-schema.md
component: Button
owner_role: DS 维护组
last_updated: 2026-04-29
schema_version: jd-wiki/v0.4
---

# AI Schema · 给 Agent 消费的字段

> 这个文件是**机器读优先,人读次之**。它把 Button 组件的所有约定压缩成 AI Agent 一次 Read 就能拿到的结构化数据。
>
> **使用场景**:
> - AI 自动生成组件代码 / Figma 设计文件
> - AI 评审 PR(校验是否符合约束)
> - AI 跨组件批量分析(查找所有依赖某个 Token 的组件)
> - 业务线 Skill 调用(双列卡 Skill / 大促适配 Skill 等)

---

## 标准 YAML 字段

```yaml
meta:
  component_name: Button
  zone: foundations
  category: action
  version: 1.4.2
  status: stable                    # experimental / beta / stable / deprecated
  owner_role: 视觉设计师             # 主 owner,见 README.md 的责任表
  ai_consumable: true
  last_updated: 2026-04-29

props:
  type:
    enum: [primary, secondary, text, danger]
    default: secondary
    required: false
  size:
    enum: [L, M, S, XS, Mini]
    default: M
    required: false
  state:
    enum: [default, pressed, disabled, loading]
    default: default
    note: hover 状态仅 iPad / 键盘场景生效
  block:
    type: boolean
    default: false
  icon_position:
    enum: [left, right, none]
    default: none
    note: 仅图标按钮请用 IconButton 组件,不用本组件
  text:
    type: string
    required: true                  # 必须有可读文案,无文案请用 IconButton
    constraints:
      - max_length_L: 6 (zh) / 12 (en)
      - max_length_M: 5 (zh) / 10 (en)
      - max_length_S: 4 (zh) / 8 (en)

variants:
  - id: primary-cta
    description: 页面主操作,如加购、立即购买、提交订单
    constraints:
      - 一屏不超过 1 个
      - 一定要有具体动词

  - id: secondary-action
    description: 页面次操作,如取消、保存草稿
    constraints:
      - 与 primary 配对出现时,通常 primary 在右(iOS) / 在底(Android)

  - id: danger-action
    description: 危险操作,如删除、退订、注销
    constraints:
      - 必须配合二次确认弹窗
      - 文案必须明确后果(如"永久删除"而非"删除")

  - id: text-link
    description: 轻量文字操作,如查看更多、折叠
    constraints:
      - 不允许使用品牌色(避免与超链接混淆)

dependencies:
  tokens:
    - color.brand.primary
    - color.brand.primary.pressed
    - color.semantic.danger
    - color.semantic.danger.pressed
    - color.neutral.text.primary
    - color.neutral.text.disabled
    - color.neutral.text.onColor
    - color.neutral.bg.disabled
    - color.neutral.bg.surface
    - color.neutral.bg.pressed
    - color.neutral.border.default
    - color.neutral.border.disabled
    - typography.button.L
    - typography.button.M
    - typography.button.S
    - typography.button.XS
    - typography.button.Mini
    - spacing.button.padding-h.*
    - radius.button
    - motion.button.press
  components: []                    # Button 不依赖其他组件
  upstream_components: [Icon]       # 可选嵌入 Icon

dependents:
  components:
    - IconButton                    # 基于 Button 包装(实际上 IconButton 独立)
    - ButtonGroup
  business_components:
    - ProductCard.AddToCart
    - CartItem.SubmitButton
    - Checkout.PayButton
    # ... 数百个,详见 examples/

a11y:
  min_touch_target: 44pt
  contrast_ratio:
    text_on_primary: 4.5
    text_on_secondary: 4.5
    text_on_danger: 4.5
    disabled_text: 3.0              # 禁用状态对比度可降至 3:1(WCAG 允许)
  voiceover_label: required
  voiceover_states:
    loading: 'Loading, double tap to wait'
    disabled: '{button_text}, dimmed'
  reduce_motion:
    respect_system_setting: true
    fallback: instant_state_change

constraints:
  hard:                             # 违反必报错
    - id: NO_HARDCODED_COLOR
      rule: 不允许 style 属性出现具体色值
      check: lint
    - id: NO_NESTED_BUTTON
      rule: Button 内不允许嵌套 Button
      check: lint
    - id: MAX_PRIMARY_PER_VIEW
      rule: 同一可视区域 type=primary 最多 1 个
      check: ci_static_analysis
    - id: LOADING_BLOCKS_CLICK
      rule: state=loading 时必须屏蔽点击事件
      check: ci_runtime_test
    - id: TOUCH_TARGET_44PT
      rule: 实际可点击区 ≥ 44pt × 44pt
      check: ci_visual_diff

  soft:                             # 违反需 review
    - id: TEXT_LENGTH_RECOMMEND
      rule: 文案长度建议遵守 props.text.constraints
      check: warn_only
    - id: NEW_VARIANT_REVIEW
      rule: 新增 variant 需走 governance/contribution.md
      check: governance_review

related_skills:
  - id: jd-double-column-card
    relation: 双列卡内的"加购按钮"使用本组件,family-specific 文案规则在 Skill 中
  - id: jd-promotion-theming
    relation: 大促主题切换通过本组件的 token 自动生效

related_docs:
  philosophy: knowledge/philosophy/focused-effective.md
  a11y: horizontal/a11y/checklist.md
  governance: horizontal/governance/contribution.md
  tokens: foundations/tokens/color.md

ai_query_examples:
  - query: 给 PDP 设计一个加购按钮
    expected_output:
      type: primary
      size: L
      block: false
      text: 加购物车
      validation_passed: true

  - query: 删除收藏夹商品的按钮
    expected_output:
      type: danger
      size: M
      text: 删除
      followup_required: confirmation_modal
      validation_passed: true

  - query: 在卡片底部并排放两个 primary 按钮
    expected_output: null
    error:
      rule_violated: MAX_PRIMARY_PER_VIEW
      suggestion: 改为 primary + secondary 组合
```

---

## AI 调用契约

**Read 顺序建议**(给 Agent):

1. 先 Read 本 `ai-schema.md` —— 拿到结构化字段
2. 如需具体视觉细节,Read `visual.md`
3. 如需文案 / 内容规则,Read `content.md`
4. 如需反例校验,Read `donts.md`
5. **不要无脑 Read 所有 md** —— 浪费 Token,且角色信息冗余

**Write 触发条件**(给 PR Agent):

- props.type / props.size / props.state 增删改 → 触发 ai-schema 自动更新
- visual.md 中的 Token 路径变更 → 同步更新 dependencies.tokens
- donts.md 新增反例 → 同步更新 constraints.hard 或 soft

**校验**:DS 维护组的 CI 任务每日扫描所有 ai-schema.md,确保:
- YAML 合法
- 字段完整(meta / props / dependencies / a11y / constraints 必填)
- 引用的 Token 在 `tokens.json` 中存在
- 引用的相关组件 / Skills 存在

---

## Schema 版本

- 当前 schema_version:`jd-wiki/v0.4`
- 字段约定见 `[[ai-mechanism/schema-spec.md]]`
- Schema 升级时 DS 维护组发广播,各组件 owner 7 天内迁移
