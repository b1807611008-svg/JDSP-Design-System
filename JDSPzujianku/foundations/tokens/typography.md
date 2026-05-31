---
token_category: typography
version: "1.0"
last_updated: "2026-05-21"
relay_source: "https://relay.jd.com/file/design?id=1958051135088508929&title=%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83-%E8%A7%86%E9%A2%91&page_id=862%3A252&PAGE_LOAD_MODE=1"
extraction_status:
  scope_node: "862:252 -> 862:253"
  text_node_count: 139
  role_token_count: 33
  coverage: "已覆盖目标节点内全部 TEXT 节点并提取 family/size/weight/lineHeight。"
---

# Typography Tokens 规范

## 版本重大变化对比 (Changelog)

当前任务为首版 `tokens/typography.md` 建档，未检索到可结构化对照的旧版 token 文档。  
本次产出重点：

| 维度 | 本次状态 | 说明 |
|---|---|---|
| 字族层 | 已拆解 | 提取 13 组 `family+style` |
| 字阶层 | 已拆解 | 覆盖 10~80（含 15.7969 特殊值） |
| 字重层 | 已拆解 | 400 / 500 / 600 / 700 |
| 组合 Role 层 | 已建立 | 提取 33 组真实组合 |
| 行高规则 | 已抽取 | 含文档规则与节点实测 lineHeight |

## Atom 层 (L1) - 原子拆解

### Font Family（字族）

| Atom Token | 实际字体名称 | 用途/出现说明 |
|---|---|---|
| `font_family_pfsc_regular` | `PingFang-SC / Regular` | 主体中文内容（最高频） |
| `font_family_pfsc_semibold` | `PingFang-SC / Semibold` | 强调标题、表头、关键数值 |
| `font_family_pfsc_medium` | `PingFang-SC / Medium` | 中等强调文本 |
| `font_family_pf_regular` | `PingFang SC / Regular` | 同族异命名空间，需归并治理 |
| `font_family_pf_semibold` | `PingFang SC / Semibold` | 同上 |
| `font_family_pf_medium` | `PingFang SC / Medium` | 同上 |
| `font_family_jdzh_bold` | `JDZhengHei-V2.0 / Bold` | 价格数字强化 |
| `font_family_jdzh_regular` | `JDZhengHei-V2.0 / Regular` | 价格数字常规 |
| `font_family_jdzh_alt_bold` | `JDZhengHei V2.0 / Bold` | 字族命名变体（空格版） |
| `font_family_jdzht_regular` | `JDZhengHT / Regular` | 价格类补充字体 |
| `font_family_shs_regular` | `Source Han Sans SC / Regular` | 个别价格场景 |
| `font_family_brand_regular` | `JingDongLangZhengTi / Regular` | 品牌字族 |
| `font_family_brand_alt_regular` | `jingdonglangzhengti2 / Regular` | 品牌字族命名变体 |

### Font Size（字阶）

| T-shirt Token | 数值 Atom | 场景说明 |
|---|---|---|
| `font_size_display_xxxl` | `font_size_80` | 超大标题 |
| `font_size_display_xxl` | `font_size_74` | 价格展示（超大） |
| `font_size_display_xl` | `font_size_62` | 强化价格主值 |
| `font_size_display_lg` | `font_size_60` | 章节编号/大号序号 |
| `font_size_display_md` | `font_size_50` | 大标题/品牌字 |
| `font_size_heading_lg` | `font_size_38` | 价格单位强化 |
| `font_size_heading_md` | `font_size_36` | 标题层级 |
| `font_size_heading_sm` | `font_size_32` | 价格主值/补值 |
| `font_size_heading_xs` | `font_size_30` | 价格小数组合 |
| `font_size_body_xl` | `font_size_28` | 单位符/强化短词 |
| `font_size_body_lg` | `font_size_24` | 一级正文/标题 |
| `font_size_body_md` | `font_size_20` | 常规正文主级 |
| `font_size_body_sm` | `font_size_16` | 主要辅助正文 |
| `font_size_body_base` | `font_size_14` | 标准内容 |
| `font_size_caption_lg` | `font_size_12` | 次级辅助 |
| `font_size_caption_md` | `font_size_11` | 标签文案 |
| `font_size_caption_sm` | `font_size_10` | 标注辅助 |
| `font_size_special_15_7969` | `font_size_15_7969` | 特殊标注值（需确认） |

### Font Weight（字重）

| Atom Token | CSS 数值 | 场景说明 |
|---|---|---|
| `font_weight_regular` | `400` | 常规正文与说明 |
| `font_weight_medium` | `500` | 中等强调 |
| `font_weight_semibold` | `600` | 标题、关键字段 |
| `font_weight_bold` | `700` | 数字价格强化 |

### Line Height（行高）

设计稿文案规则（节点文字说明）：

- 行距应用（单行推荐）：`lineGap = fontSize * 0.5`，奇数时 `-1`
- 行高应用（段落推荐）：`lineHeight = fontSize * 1.5`，奇数时 `-1`
- 元素混排：延续 `fontSize * 1.5`，奇数时 `-1`

节点实测（MCP 抽取）显示存在以下 lineHeight 形态：

- 像素固定值：`9/10/12/14/16/20/24/30/36/40/50/60/80`
- 浮点像素值：`15.7969 / 18.3361 / 23.7746 / 26.4163 / 36.9828 / 39.7282 / 52.8325`
- `AUTO`

**Rationale（设计原理解释）**：  
本体系通过 Family × Size × Weight 原子层控制文字视觉秩序，再以行高规则约束版面节奏。对价格、标题等高关注信息采用更高字重与更大字阶，正文维持 14/16 主干，形成稳定的阅读梯度。

## Role 层 (L2) - 组合 Token

### pingfang_regular

| Token | 字号 | 字重 | 对应业务场景 |
|---|---:|---:|---|
| `font_size_50_400` | 50 | 400 | 品牌文字示例（京东） |
| `font_size_24_400` | 24 | 400 | 等宽/单独价格展示 |
| `font_size_20_400` | 20 | 400 | 规则说明正文 |
| `font_size_16_400` | 16 | 400 | 说明文案、辅助内容 |
| `font_size_14_400` | 14 | 400 | 标准内容主干 |
| `font_size_12_400` | 12 | 400 | 次级辅助 |
| `font_size_11_400` | 11 | 400 | 标签内容 |
| `font_size_10_400` | 10 | 400 | 标注说明 |
| `font_size_15_7969_400` | 15.7969 | 400 | 特殊标注文本 |

### pingfang_medium

| Token | 字号 | 字重 | 对应业务场景 |
|---|---:|---:|---|
| `font_size_60_500` | 60 | 500 | 章节编号/步骤号 |
| `font_size_50_500` | 50 | 500 | 大层级标题 |
| `font_size_14_500` | 14 | 500 | 表头标签 |

### pingfang_semibold

| Token | 字号 | 字重 | 对应业务场景 |
|---|---:|---:|---|
| `font_size_80_600` | 80 | 600 | 超大标题 |
| `font_size_38_600` | 38 | 600 | 价格单位强化 |
| `font_size_36_600` | 36 | 600 | 标题级 |
| `font_size_24_600` | 24 | 600 | 建议/关键字 |
| `font_size_20_600` | 20 | 600 | 字阶/避免过宽/韵律感等标题词 |
| `font_size_16_600` | 16 | 600 | 混排关键字 |
| `font_size_14_600` | 14 | 600 | 字重/字号等表头 |
| `font_size_28_600` | 28 | 600 | 元/价格单位 |

### zhenghei_bold

| Token | 字号 | 字重 | 对应业务场景 |
|---|---:|---:|---|
| `font_size_62_700` | 62 | 700 | 主价格 |
| `font_size_50_700` | 50 | 700 | 大价格强调 |
| `font_size_32_700` | 32 | 700 | 价格主值/符号 |
| `font_size_30_700` | 30 | 700 | 价格小数强化 |
| `font_size_28_700` | 28 | 700 | 单位 |

### zhenghei_regular

| Token | 字号 | 字重 | 对应业务场景 |
|---|---:|---:|---|
| `font_size_32_400` | 32 | 400 | 原价/对比价格文本 |

### source_han_regular

| Token | 字号 | 字重 | 对应业务场景 |
|---|---:|---:|---|
| `font_size_20_400` | 20 | 400 | 数字价格示例（¥618） |

### brand_regular

| Token | 字号 | 字重 | 对应业务场景 |
|---|---:|---:|---|
| `font_size_24_400` | 24 | 400 | 品牌字体样例 |
| `font_size_50_400` | 50 | 400 | 品牌大字样例（变体） |

## 版本兼容对照表 (可选)

本次缺少旧版结构化 typography token 文档，无法自动建立旧新全量映射。  
建议下一版本在设计稿中显式补充 `v15 -> v16` token 名称对照层后再生成。

## 异常记录与待办事项 (TODOs)

### 异常记录

- ⚠️ 同族命名冲突：`PingFang-SC` 与 `PingFang SC` 并存（仅分隔符差异）。
- ⚠️ 品牌字族命名冲突：`JingDongLangZhengTi` 与 `jingdonglangzhengti2` 并存。
- ⚠️ 正黑字族命名冲突：`JDZhengHei-V2.0` 与 `JDZhengHei V2.0` 并存。
- ⚠️ 规则与实测不完全一致：文案宣称 `字号*1.5 奇数-1`，但存在 `AUTO` 与多组浮点 lineHeight（如 `52.8325`）。
- ⚠️ 语义 token 冲突风险：如 `font_size_14_400` 在多字族可同时出现，需加字族前缀避免跨族同名冲突。

### TODO 清单

1. 与设计侧确认 lineHeight 计算规则的优先级（公式规则 vs 节点显式值）。
2. 统一字族命名规范（空格、连字符、大小写）。
3. 建立跨字族 Role 命名标准：强制 `family_size_weight` 三级命名。
4. 补充旧版本 token 映射表，以支持 `upgraded/unchanged/deprecated` 自动比对。
