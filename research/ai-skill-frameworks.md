# AI Skill 框架调研：为京东 DESIGN.md → Skill 化提供外部参照

> 调研日期：2026-04-24 | 覆盖：Claude Skills / Vercel Skills CLI / Google Stitch Skills / MCP

---

## 1. Skill 文件结构对比表

| 生态 | 核心文件 | 必填 frontmatter | 可选 frontmatter | 目录结构 | 版本控制 |
|---|---|---|---|---|---|
| **Claude Agent Skills** | `SKILL.md` | 无强制必填（`description` 推荐） | `name` / `description`（≤1536 字符） / `when_to_use` / `allowed-tools` / `disable-model-invocation` / `user-invocable` / `paths`（glob 激活） / `context: fork` / `agent` / `model` / `effort` / `hooks` / `arguments` | `SKILL.md` + 任意 `scripts/` `examples/` `reference.md`；建议 SKILL.md < 500 行 | Git（personal `~/.claude/skills/` / project `.claude/skills/` / plugin / managed 四级，enterprise > personal > project） |
| **Vercel Skills CLI** | `SKILL.md`（遵循 agentskills.io 标准） | `name` / `description` | `metadata.internal: true`（隐藏） | 同 Claude；额外识别 `skills/` `.agents/skills/` `.claude/skills/` `.cursor/skills/` 等 | `npx skills add/update/remove`；通过 **symlink 或 copy** 同步到各 agent 目录 |
| **Google Stitch Skills** | `SKILL.md` | `name` / `description` / `allowed-tools` | — | 固定四目录：`scripts/`（执行器） / `resources/`（知识库/checklist） / `examples/`（gold standard 参考） / `SKILL.md`（Mission Control） | GitHub 仓库，design-md、react-components 等按 category 分目录 |
| **MCP Servers** | 非 Markdown，服务端进程 | 服务端暴露 `tools` / `resources` / `prompts` 三类原语（JSON-RPC） | 每个原语有 `name` + `description` + schema | 服务端自定义（Python/TS SDK） | npm/PyPI 包发布；transport 为 stdio 或 Streamable HTTP |

**关键发现**：前三家已趋同到 `agentskills.io` 开放标准（Anthropic 2025-12 开源），Microsoft / OpenAI / Atlassian / Figma / Cursor / GitHub 均已采纳。SKILL.md + YAML frontmatter + 可选子目录是事实上的标准。

---

## 2. 执行契约对比

| 维度 | Claude Skills | Vercel Skills | Stitch Skills | MCP |
|---|---|---|---|---|
| **触发** | 三种：① `description` 语义匹配自动加载 ② `/skill-name` 手动触发 ③ `paths` glob 匹配自动 | 同 Claude（宿主 agent 决定） | 同 Claude；additionally 通过 MCP 调用 `stitch*:*` 工具链 | LLM 决定调用哪个 tool；resource 主动拉取 |
| **输入** | `$ARGUMENTS` / `$0..$N` / `$name` / `${CLAUDE_SESSION_ID}` / `${CLAUDE_SKILL_DIR}` 占位符 | 通过宿主 agent 传参 | design-md：project 的 Stitch MCP 数据 + screen HTML | JSON-RPC `tools/call` 带结构化参数（JSON Schema） |
| **输出** | skill 内容作为 system message 注入，保留整轮 session（auto-compact 时保留前 5000 tokens，总预算 25000 tokens） | 同 Claude | design-md：结构化 markdown（Visual Theme / Color Palette / Typography / Component Stylings / Layout Principles） | 结构化 JSON（文本/图片/资源引用） |
| **权限** | `allowed-tools`（空格分隔，支持 `Bash(git add *)` 细粒度；`Skill(name)` 在 `/permissions` 中白/黑名单） | 继承宿主 agent 权限（部分 agent 如 Kiro / Zencoder 不支持 `allowed-tools`） | `allowed-tools: ["stitch*:*", "Read", "Write", "web_fetch"]` | 客户端用户同意后放行；服务端自行鉴权 |
| **动态上下文** | `` !`command` `` 预执行注入；`context: fork` 跑在独立 subagent | 依赖宿主 | 通过 Stitch MCP Server 实时拉取 project/screen | resources URI 按需 fetch |

**Claude 独有**：progressive disclosure 三层——① 启动时只加载 name + description ② 调用时加载 SKILL.md 全文 ③ SKILL.md 内引用的 reference/script 按需加载。这是 SKILL.md 建议 < 500 行的核心原因。

---

## 3. 跨 agent 兼容性机制

**Vercel Skills CLI 的做法**（45+ agent 支持）：

- **无翻译层**：不做格式转换。单份 `SKILL.md` 通过 **symlink 或 copy** 分发到每个 agent 的惯用目录（`.claude/skills/` / `.cursor/skills/` / `.agents/skills/` / `~/.config/agents/skills/` …）。
- **能力是子集**：部分 agent 不支持 `allowed-tools`、不支持 subagent fork，此时对应字段被忽略但 skill 主体仍可用。
- **自动检测**：CLI 扫描本机装了哪些 agent，列表让用户勾选目标。
- **Marketplace 互操作**：`.claude-plugin/marketplace.json` / `.claude-plugin/plugin.json` 声明 skill 路径，可被 Claude Code 插件系统发现。

**可借鉴的跨工具规范**：`agentskills.io` 开放标准把 **最小公约数**（name + description + markdown body）锁定，把 **能力扩展**（allowed-tools / paths / hooks）留给各家自由实现——能力不匹配时降级而非报错。

---

## 4. 设计向 skill vs 代码向 skill 的关键差异

**design-md（Stitch）的设计契约实测拆解**：

```yaml
name: design-md
description: Analyze Stitch projects and synthesize a semantic design system into DESIGN.md files
allowed-tools: ["stitch*:*", "Read", "Write", "web_fetch"]
```

执行流水线固定为 **5 步管道**：Retrieval（MCP 拉 project/screen）→ Extraction（识别 tokens：color/typography/spacing/components）→ Translation（CSS/Tailwind → 自然设计语言）→ Synthesis（生成 DESIGN.md）→ Alignment（对齐 Stitch Effective Prompting 原则）。

**设计 vs 代码 skill 的 3 个 schema 差异**：

1. **产物是"语义文档"而非代码**：design-md 输出 markdown 段落（Visual Theme / Color Palette + Hex + Function / Typography / Component / Layout），接收方是 LLM 再次生成屏幕，**不是编译器**。要求「designer-friendly terminology + precise hex 值并列」。
2. **需要视觉资产在线拉取**：`allowed-tools` 必须包含 `web_fetch` 抓截图/HTML。代码 skill 通常 `Read/Grep/Bash` 够用。
3. **"gold standard 参考"是一等公民**：Stitch 固定的 `examples/` 目录放样例 DESIGN.md，agent 照着抄结构。代码 skill 的 examples 是可选的；设计 skill 的 examples 是必须的——因为设计判断没有"单元测试"可验收。

**其他设计向 skill 参考**：Stitch 同仓库的 `react-components`（把屏幕 → React 组件）、`poster-design-knowledge`（Mondo 风格海报，HappyClaw 本地已装）属同类。共性：输出是 prompt / 模板而非最终产物。

---

## 5. 注册 / 发现 / 分发

| 机制 | 实现 |
|---|---|
| **用户发现** | Claude：`/` 菜单列出可手动触发的；`user-invocable: false` 则隐藏 | Vercel：`npx skills find [query]` | Stitch：GitHub 仓库目录浏览 |
| **Registry** | **skills.sh** 官方目录（Vercel 维护） / `.claude-plugin/marketplace.json`（Claude 插件市场） / 私有 GitHub 仓 | MCP：无官方 registry，靠 awesome-lists |
| **质量评分** | **目前业内无统一机制**。HappyClaw 本地 `darwin-skill` 用 8 维评分 + Git 棘轮 + 子 agent 独立评分防自欺——这是比公开方案更先进的做法 |
| **自动激活** | Claude `paths` glob（如 `paths: "**/*.tsx"`）自动在相关文件打开时激活 | 其他家靠 description 语义匹配 |

---

## 6. 给京东"DESIGN.md → Skill"的 3 个关键借鉴

### 借鉴 1：采用 agentskills.io 开放标准的 SKILL.md 格式

**具体机制**：京东的 DESIGN.md 不要发明私有格式，直接包成 `jd-design-system/SKILL.md`，frontmatter 用 `name` + `description` + `allowed-tools`（如 `Read`、`Write`、飞书 MCP 工具）。

**京东可以怎么用**：① 天然兼容 Claude Code / Cursor / Copilot / Codex 等 45+ 宿主——设计师团队用不同工具时 skill 无需重写。② 未来接入 Stitch 或其他设计工具时，pipeline 可复用。③ `jd-double-column-card` 已经是这个结构，DESIGN.md 只是把"评价 skill"扩展成"生成 skill"。

### 借鉴 2：借用 Stitch design-md 的 5 步管道作为 DESIGN.md 生成契约

**具体机制**：Retrieval（拉现有设计稿 / token 文件）→ Extraction（识别 color/typography/spacing/双列卡家族特征）→ Translation（设计语言化，Hex + Functional Role）→ Synthesis（DESIGN.md 六段式：Visual Theme / Color Palette / Typography / Component / Layout + **京东特有：双列卡家族底部不变量**）→ Alignment（对齐京东 15-spec / L1-5 核心规约）。

**京东可以怎么用**：这条管道和 Shaka 做 `jd-double-column-card` 时用的"顶中底识别 + 家族锚定"完全同构，**第 5 步 Alignment 把 L1-5 规约替换成京东 15-spec 就直接可用**。输出格式强制 "Descriptive Name + Hex + Function" 三元组，避免"蓝色"这种模糊描述。

### 借鉴 3：Claude 的 progressive disclosure + `paths` glob 自动激活

**具体机制**：① SKILL.md 主体 < 500 行（只放 5 步管道 SOP），详细基线样式放 `references/jd-baselines/*.md`（当前已有 22 个基线），gold standard 样例放 `examples/`。② 用 `paths: "**/DESIGN.md, **/figma-export/**"` 让 skill 在设计师打开 DESIGN.md 时自动激活。③ `allowed-tools` 细粒度控制：`Bash(figma-export *)` 只允许跑导出命令。

**京东可以怎么用**：设计师团队同时维护多业务线（推荐/点评/圈子/新品/个人中心/直播）→ 每个家族一个 `references/family-{name}.md` 文件，对应 skill 启动时不全量加载、不污染上下文。配合已有的 `business_line` 人工声明协议，识别精度可比用单一大 markdown 更高。延伸：新增家族时只加一个 reference 文件，不改 SKILL.md 主体——符合"结构优先、内容无涉"原则。

---

## Sources

- [Claude Agent Skills 文档](https://code.claude.com/docs/en/skills)
- [Agent Skills 开放标准（agentskills.io）](https://agentskills.io/specification)
- [Vercel Skills CLI (vercel-labs/skills)](https://github.com/vercel-labs/skills)
- [Google Stitch Skills 仓库](https://github.com/google-labs-code/stitch-skills)
- [Stitch design-md SKILL.md 原文](https://raw.githubusercontent.com/google-labs-code/stitch-skills/main/skills/design-md/SKILL.md)
- [MCP 官方站点](https://modelcontextprotocol.io/)
- [MCP Specification 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25)
- [MCP 2026 Roadmap](https://blog.modelcontextprotocol.io/posts/2026-mcp-roadmap/)
- [VS Code Agent Skills 支持](https://code.visualstudio.com/docs/copilot/customization/agent-skills)
- [Cursor Agent Skills 文档](https://cursor.com/docs/context/skills)
- [OpenAI Codex Skills](https://developers.openai.com/codex/skills)
