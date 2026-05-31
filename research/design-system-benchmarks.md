# 五大设计系统外部标杆调研

> 目的：为京东 App 设计系统基础设施方案提供外部参照。关注 meta-schema、治理流程、多角色协作、Figma 打通、AI 接入五个维度。
> 日期：2026-04-24 · 调研对象：Material 3 / Polaris / Geist / Atlassian ADS / Carbon

---

## 1. 文档架构对比

| 设计系统 | 顶层分类 | 单组件文档字段 | Token 系统 | Governance | Figma 打通 |
|---|---|---|---|---|---|
| **Material 3** | Foundations / Styles / Components / Patterns / Develop | Overview · Specs · Guidelines · Accessibility · Anatomy | Material Theme Builder 生成多层 token（sys/ref/comp），颜色/字体/形状/动效 | Google 单方维护，不接受公众 PR | 官方 Figma Kit，Theme Builder 插件双向注入 |
| **Polaris** | Getting started / Foundations / Design / Content / Patterns / Components / Tokens / Icons / Contributing / Tools / Version guides | Examples · Props · Best practices · Content guidelines · Related components · Accessibility（含 Navigation/Labeling/Keyboard 子项） | 独立 Tokens 页面，覆盖 color/spacing/typography/motion/shape | 公开 GitHub，CLA + changesets + semver；PR 模板 + 本地 Storybook 验证 | 官方 Figma Library，Code Connect 映射 |
| **Geist (Vercel)** | Foundations（Color/Typography/Grid）/ Components（60+ React）/ Brands | 代码优先：Live Preview + Props Table + Code（未见 Anatomy/Guidelines 段落） | CSS 变量为单一真相源，映射到 `globals.css` | 小团队内控，最小化流程 | Figma Community 文件；AI 即"Figma"——靠 shadcn registry |
| **Atlassian ADS** | Foundations / Tokens / Components / Patterns（含 AI Patterns）/ Content / Brand | 按标签页：Examples · Code · Usage · Accessibility；组件带 Beta/Early Access/Caution 成熟度标签 | 语义 token（`color.text.accent.red`、`elevation.surface.hovered`），含 AI 专属 token | 全球团队 + 区域 studio；未公开完整 PR 流程 | Figma library + Tokens Studio 对齐 |
| **Carbon** | Foundations / Implementation（Products/Cloud/IBM.com/Events/Workplace）/ Practices（含 AI/Research）/ Community | 多平台并排：React/Angular/Vue/Svelte/Web Components 同页切换 | 独立 tokens 包，W3C DTCG 兼容方向 | 成熟度分层：**Experimental → Beta → Stable**，Core team + 指导委员会（steering committee） | 官方 Figma/Sketch kit，React + Figma 同版本号 |

---

## 2. 组件文档 meta-schema 对比

把各家对"一个组件页"的段落模板并排：

| 段落 | Material 3 | Polaris | Atlassian | Carbon | Geist |
|---|:-:|:-:|:-:|:-:|:-:|
| Overview / 简介 | ✅ | ✅ | ✅ | ✅ | ✅ |
| Anatomy / 结构拆解 | ✅ | ⚪（Best practices 里） | ✅ | ✅ | — |
| Specs / 视觉参数 | ✅ | ⚪（通过 Tokens） | ✅ | ✅ | — |
| Guidelines / Best practices | ✅ | ✅ | ✅ | ✅ | — |
| **Content guidelines** | — | ✅ **单列一段** | ⚪ | ⚪ | — |
| Examples / Playground | ⚪ | ✅ | ✅ | ✅ | ✅ |
| Props / API | — | ✅ | ✅ | ✅ | ✅ |
| Accessibility | ✅ | ✅（细拆 Navigation/Labeling/Keyboard） | ✅ | ✅ | ⚪ |
| Related components | — | ✅ | ⚪ | ✅ | — |
| 成熟度标签 | — | ⚪ | ✅（Beta/Early Access/Caution） | ✅（Experimental/Beta/Stable） | — |

**关键观察**：
- **Polaris 独有 Content guidelines**——把文案规范作为组件文档的一等字段（Shopify 是内容驱动型业务）。
- **Atlassian 和 Carbon 都有"成熟度标签"**——文档页就是 governance 的载体，用户一眼看到风险。
- **Geist 近似零文档**——代码即文档，靠 AI（v0）反向生成用法。
- **Material 3 没有 Props**（它是设计规范，不是代码库）；Polaris/Atlassian/Carbon 设计+代码合一。

---

## 3. 多角色协作机制

| 机制 | Material 3 | Polaris | Geist | Atlassian | Carbon |
|---|:-:|:-:|:-:|:-:|:-:|
| 公开 GitHub | ⚪（只读） | ✅ | ✅ | ⚪（部分） | ✅ |
| PR 模板 | — | ✅ | ✅ | 未确认 | ✅ |
| CLA | — | ✅ | 未确认 | 未确认 | ✅ |
| Semver | ✅ | ✅（major/minor/patch + changesets）| ✅ | ✅ | ✅ |
| Changelog 自动化 | — | ✅（changesets） | ✅ | 未确认 | ✅ |
| 成熟度分级 | — | ⚪ | — | ✅ | ✅ |
| Steering Committee | — | — | — | ⚪ | ✅ |
| 分支策略 | — | main + 独立 major 分支 | 未确认 | 未确认 | 多仓库 monorepo |

**最成熟的两个样板**：
- **Polaris**：轻治理 + 强工具链。`pnpm test / lint / format / typecheck` + changesets + Storybook 本地验证 = 贡献门槛低但质量稳。破坏性改动禁止直接 merge main，走独立 major 分支。
- **Carbon**：重治理 + 分层准入。社区贡献先进 Experimental，证明价值后升 Beta，稳定后进 Stable；有 steering committee 做仲裁。适合京东这种多业务线共生场景。

---

## 4. Figma 打通路径

**主流模式（2025-2026 成型）**：

1. **W3C DTCG Format** 成为事实标准（2025-10 首个稳定规范），JSON 格式描述 token，跨工具通用。
2. **Tokens Studio for Figma** 作为最常用的 Figma 端 token 管理插件，支持 DTCG。
3. **Style Dictionary** 做 token 转换（JSON → CSS/iOS/Android 多端）。
4. **Figma Code Connect** 做"Figma 组件 ↔ 代码组件"的双向映射。
5. **CI/CD pipeline** 把 Figma token 变更同步到代码仓库，自动生成 PR。

**各家具体做法**：
- **Material 3**：Theme Builder 插件一键生成完整 token 集，推送到 Figma 和代码。
- **Polaris / Carbon**：Figma library 版本号与 React 包版本号对齐，升级同步。
- **Atlassian**：Tokens Studio + 内部管道同步语义 token。
- **Geist**：不走传统路径——Figma Community 文件 + `globals.css` 为真相源，AI 生成替代手工同步。

---

## 5. AI 接入情况（重点）

| 系统 | AI-ready 状态 | 关键机制 |
|---|---|---|
| **Geist / Vercel v0** | ✅ 原生设计 | **shadcn Registry**（`registry.json` + `tokens.css`）= AI 可直接消费的设计系统分发格式；支持 **MCP (Model Context Protocol)**，在 Cursor/Windsurf/v0 中通用；"Open in v0" 按钮一键把 registry 元数据+文件+样式推给模型 |
| **Atlassian ADS** | ⚪ 部分 | 有专门的 **AI Patterns 章节**（Rovo 和 AI 体验），但面向"给 AI 应用设计界面"，不是"给 AI 消费设计系统" |
| **Material 3** | ⚪ 间接 | 无官方 AI 接入；Theme Builder JSON 可被第三方工具解析 |
| **Polaris / Carbon** | ⚠️ 未确认 | 官方文档未见显式 AI 接入说明；Carbon 有 Practices/AI 章节但关注 AI 产品设计原则 |

**Vercel 的方法论**（博客原话整合）：
- 设计系统就是"给 AI 的上下文"；
- Tokens 映射到 `globals.css` → 模型读到颜色/间距/字体的视觉基线；
- shadcn Registry 让组件元数据+依赖+代码作为一个可分发单元，模型拿到后生成 UI 自动符合品牌。
- **关键创新**：不再是"把 Figma 同步到代码"，而是"让代码成为 AI 能消费的真相源，Figma 变成前端之一"。

---

## 6. 最值得京东借鉴的 3 个实践

### 实践 1：Carbon 的成熟度分层 + Steering Committee（解决多业务线共生）

- **是什么**：任何新组件/模式先进 **Experimental**（可能重复、无维护者）→ 证明价值后进 **Beta**（有维护者承诺）→ 稳定进 **Stable**；文档页直接显示成熟度 badge。
- **对京东的价值**：双列卡专项已经识别到"各业务线各自做导致体验割裂"——成熟度分层正是把业务线自研组件纳入治理的软着陆路径，不强制统一、但提供升级通道。
- **怎么借用**：
  - 京东设计系统内设三级目录 Experimental（业务线自研）/ Beta（跨两条业务线验证）/ Stable（全 App 基线）；
  - 成立跨业务线 steering committee，行使 Beta→Stable 的评审权（权力边界对应 Shaka 之前说的"评审委员会"）；
  - Skill `jd-double-column-card` 的五家族基线可直接作为 Stable 层的参考物，L2 家族规则作为 Beta 层。

### 实践 2：Polaris 的 Content guidelines 作为一等字段（解决"文案割裂"）

- **是什么**：单组件文档有独立的 **Content guidelines** 段落，和 Anatomy / Accessibility 平级，规定按钮文案语气、长度、动词用法。
- **对京东的价值**：京东是中文电商超级 App，文案规范比纯 UI 规范更影响体验一致性；多业务线的文案风格漂移是双列卡问题的孪生兄弟。
- **怎么借用**：
  - 京东组件文档 schema 里强制加 "文案规范" 段落（含示例：✅ "立即购买" / ❌ "去购买吧"）；
  - 和 `jd-double-column-card` Skill 的 L1 规约打通——底部家族不变量 + 文案风格双锚定身份。

### 实践 3：Vercel v0 的 Registry + MCP（AI 原生基础设施）

- **是什么**：用 `registry.json`（组件元数据）+ `tokens.css`（视觉变量）定义一个"AI 可消费的设计系统单元"，通过 MCP 协议接入 Cursor/v0/Claude 等任意 AI 工具，部署一次、全端可用。
- **对京东的价值**：Shaka 日常用 Claude/Cursor 写代码、用 Figma AI 做设计，京东设计系统必须**原生可被 AI 消费**，否则下一代协作会绕开它；这也是 HappyClaw 这类 agent 平台消费设计系统的必经之路。
- **怎么借用**：
  - 把京东设计系统的 tokens 以 **W3C DTCG JSON** 落盘，作为真相源；
  - 构建一个 `jd-registry.json`（类 shadcn registry）描述每个组件的 meta、props、依赖、文件路径；
  - 暴露 MCP endpoint，让 `happyclaw`、Cursor、Figma 插件都能拉同一份 context；
  - 双列卡 Skill 的五家族规约 + L1/L2 规则本身就是结构化的，转成 registry 条目成本很低。

---

## 附：未确认事项

- Atlassian ADS 的 PR 模板、CLA、steering 结构未见公开文档。
- Carbon steering committee 的具体成员与决策流程仅在 GitHub PR 讨论中出现，未集中公开页面。
- Polaris 的 Figma Code Connect 是否强制用于所有组件未确认。
- Material 3 对外部贡献的立场未公开，视为单方维护。

## 参考来源

- [Material Design 3](https://m3.material.io/) · [Components](https://m3.material.io/components) · [Button overview](https://m3.material.io/components/buttons/overview) · [Foundations](https://m3.material.io/foundations)
- [Polaris](https://polaris-react.shopify.com/) · [Button page](https://polaris-react.shopify.com/components/actions/button) · [Shopify/polaris GitHub](https://github.com/Shopify/polaris)
- [Geist](https://vercel.com/geist) · [Geist Introduction](https://vercel.com/geist/introduction) · [AI-powered prototyping with design systems](https://vercel.com/blog/ai-powered-prototyping-with-design-systems) · [v0 Design Systems docs](https://v0.app/docs/design-systems)
- [Atlassian Design System](https://atlassian.design/) · [Components](https://atlassian.design/components) · [Button](https://atlassian.design/components/button/examples)
- [Carbon Design System](https://carbondesignsystem.com/) · [Carbon GitHub](https://github.com/carbon-design-system/carbon) · [Carbon governance PR discussion](https://github.com/carbon-design-system/carbon-website/pull/108)
- [W3C DTCG spec - Tokens Studio](https://docs.tokens.studio/manage-settings/token-format) · [Figma to Code 2026](https://inhaq.com/blog/figma-to-code-design-engineer-workflow)
