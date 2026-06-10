export const capabilityItems = [
  ["01", "产品界面", "移动端、PC 端、Web、H5 与 B 端界面的视觉设计和体验优化。"],
  ["02", "视觉系统", "从品牌气质、信息层级到组件规范，建立统一的设计语言。"],
  ["03", "动态表达", "使用 AE、原型与前端动效补足状态反馈和页面节奏。"],
  ["04", "创意工具", "将 C4D、Blender 与 AIGC 融入视觉探索和设计生产。"]
];

// 技能 / 工具滚动条（ScrollVelocity 两行，方向相反）
export const marqueeRows = [
  "UI DESIGN · VISUAL SYSTEM · BRAND IDENTITY · INTERACTION · ",
  "FIGMA · C4D · BLENDER · AFTER EFFECTS · AIGC · PROTOTYPE · "
];

// 数据统计（CountUp）
export const statItems = [
  { to: 3, suffix: "年", label: "设计经验", sub: "EXPERIENCE" },
  { to: 60, suffix: "+", label: "落地项目", sub: "PROJECTS" },
  { to: 12, suffix: "+", label: "合作团队", sub: "TEAMS" },
  { to: 8, suffix: "项", label: "掌握工具", sub: "TOOLS" }
];

// 经历时间线（关于我页面）
export const experienceItems = [
  {
    period: "2021.03 — 2024.03",
    role: "UI / UX 视觉设计师",
    org: "云雅信息技术（成都）",
    desc: "负责移动端与 B 端产品的视觉设计与体验优化，搭建并维护设计系统，配合产品与开发完成多个项目的从 0 到 1 落地。"
  },
  {
    period: "2020 — 2021",
    role: "视觉 / 平面设计",
    org: "项目实践与实习",
    desc: "参与品牌视觉、运营物料与活动专题设计，积累从概念到成稿的完整视觉产出经验。"
  },
  {
    period: "EDUCATION",
    role: "视觉传达设计 · 本科",
    org: "系统学习设计基础",
    desc: "构图、色彩、字体与信息层级的系统训练，奠定了对视觉语言的判断力。"
  }
];

// 软件 / 工具能力（关于我页面）
export const toolItems = [
  { name: "Figma", note: "界面设计 / 组件库 / 协作", level: 95 },
  { name: "After Effects", note: "界面动效 / 状态反馈", level: 82 },
  { name: "Cinema 4D", note: "3D 视觉 / 质感探索", level: 76 },
  { name: "Photoshop / Illustrator", note: "视觉合成 / 图形", level: 90 },
  { name: "AIGC 工具", note: "概念探索 / 生产提效", level: 80 }
];

// 设计方法（首页手风琴）
export const approachItems = [
  {
    key: "探索",
    title: "理解与探索",
    text: "从业务目标与用户场景出发，梳理需求、定义问题，找到设计真正要解决的核心，而不是急于画界面。",
    image: "/assets/gallery/gallery-05.jpg"
  },
  {
    key: "结构",
    title: "结构与系统",
    text: "建立信息架构、组件与视觉规范，让设计从一开始就可延展、可协作、可持续地维护下去。",
    image: "/assets/gallery/gallery-07.jpg"
  },
  {
    key: "打磨",
    title: "细节与动效",
    text: "在交互细节、状态反馈与动效节奏上反复打磨，让最终的体验自然、顺手，并且有质感。",
    image: "/assets/gallery/gallery-09.jpg"
  }
];

// 客户证言（占位内容，后续替换为真实评价）
export const testimonialItems = [
  {
    name: "林彦",
    role: "产品经理 · 某科技公司",
    initials: "林",
    brand: "PRODUCT",
    quote:
      "和 Noah 合作非常省心。他不只是把界面做漂亮，而是真正理解产品逻辑，主动帮我们梳理流程，最终的体验和数据都明显变好。"
  },
  {
    name: "陈默",
    role: "创始人 · 初创团队",
    initials: "陈",
    brand: "STARTUP",
    quote:
      "从品牌到产品界面，Noah 帮我们建立了统一的视觉语言。整个过程沟通顺畅，交付质量很高，团队上下都很满意。"
  },
  {
    name: "周岚",
    role: "前端负责人 · 协作团队",
    initials: "周",
    brand: "ENGINEERING",
    quote:
      "他的设计稿规范、标注清晰，组件和状态都考虑得很完整，开发还原起来几乎没有歧义，协作效率非常高。"
  }
];

// APEX 标注图的标注点（围绕中心图片）
export const annotationItems = [
  { label: "信息架构", sub: "Structure", pos: "tl" },
  { label: "组件系统", sub: "Components", pos: "tr" },
  { label: "交互动效", sub: "Motion", pos: "bl" },
  { label: "视觉规范", sub: "Visual System", pos: "br" }
];

// 项目集（首页精选 + 列表页 + 详情页共用）
export const projects = [
  {
    id: "smart-mobility",
    index: "01",
    title: "智能出行 App",
    category: "MOBILE / UI · UX",
    discipline: "移动端",
    year: "2024",
    role: "UI / UX 设计 · 视觉",
    client: "云雅信息技术",
    duration: "8 周",
    cover: "/assets/gallery/gallery-02.jpg",
    summary: "面向城市通勤的出行应用，重构信息架构与首页节奏，提升核心任务的转化效率。",
    overview:
      "项目目标是把一款功能堆叠、层级混乱的出行 App 重新梳理为清晰、高效的日常工具。我从用户的真实通勤场景出发，重排信息架构，让叫车、路线与行程三条主线在首页一目了然。",
    challenge: "原版本首页入口过多、视觉噪点高，核心任务被埋没，用户完成一次叫车平均需要多次跳转。",
    solution: "建立以任务为中心的首页结构，统一卡片与按钮规范，引入清晰的状态反馈动效，使主流程步骤减少、转化率明显提升。",
    deliverables: ["信息架构", "高保真界面", "设计系统", "交互原型"],
    tags: ["移动端", "体验优化", "设计系统"],
    gallery: ["/assets/gallery/gallery-02.jpg", "/assets/gallery/gallery-05.jpg", "/assets/gallery/gallery-09.jpg"]
  },
  {
    id: "brand-system",
    index: "02",
    title: "品牌视觉系统",
    category: "BRANDING / VISUAL",
    discipline: "品牌",
    year: "2023",
    role: "品牌视觉设计",
    client: "初创科技团队",
    duration: "6 周",
    cover: "/assets/gallery/gallery-08.jpg",
    summary: "从标识、色彩到版式与图形语言，建立一套可延展的品牌视觉规范。",
    overview:
      "为一支初创团队建立完整的品牌视觉系统，从标识、主色、辅助图形到版式网格，形成一套既有识别度又易于团队延展使用的规范。",
    challenge: "团队缺乏统一视觉，物料风格各异，对外形象不一致、难以沉淀品牌资产。",
    solution: "提炼品牌关键词，确定标识与色彩系统，输出图形语言与版式模板，并配套一份可落地的使用规范文档。",
    deliverables: ["标识系统", "色彩规范", "图形语言", "应用模板"],
    tags: ["品牌", "视觉规范", "VI"],
    gallery: ["/assets/gallery/gallery-08.jpg", "/assets/gallery/gallery-03.jpg", "/assets/gallery/gallery-12.jpg"]
  },
  {
    id: "data-console",
    index: "03",
    title: "数据中台 B 端界面",
    category: "WEB / B-SIDE",
    discipline: "B 端",
    year: "2023",
    role: "B 端体验设计",
    client: "企业内部平台",
    duration: "10 周",
    cover: "/assets/gallery/gallery-11.jpg",
    summary: "面向运营的复杂数据后台，统一组件与交互模式，降低高频操作的认知负担。",
    overview:
      "面向运营人员的数据中台，需要在高密度信息与高频操作之间找到平衡。我统一了组件与交互模式，让复杂的数据配置变得可预期、可掌控。",
    challenge: "页面信息密度高、组件不统一，新人上手成本高，高频操作步骤繁琐。",
    solution: "构建统一的组件库与栅格规范，优化表格、筛选与表单的交互模式，配合清晰的数据可视化层级，显著降低认知负担。",
    deliverables: ["组件库", "交互规范", "数据可视化", "界面设计"],
    tags: ["B 端", "组件库", "数据可视化"],
    gallery: ["/assets/gallery/gallery-11.jpg", "/assets/gallery/gallery-07.jpg", "/assets/gallery/gallery-01.jpg"]
  },
  {
    id: "campaign-h5",
    index: "04",
    title: "运营活动 H5",
    category: "CAMPAIGN / MOTION",
    discipline: "动效",
    year: "2024",
    role: "视觉 · 动效设计",
    client: "品牌运营",
    duration: "4 周",
    cover: "/assets/gallery/gallery-06.jpg",
    summary: "节日运营专题，结合插画、动效与 3D 元素营造沉浸式的活动氛围。",
    overview:
      "一支节日运营专题 H5，需要在短时间内抓住用户注意力并引导参与。我用插画、动效与 3D 元素搭建出有节奏的沉浸式体验。",
    challenge: "活动信息多、停留时间短，需要在第一屏就建立氛围并引导用户向下探索。",
    solution: "以叙事化的滚动节奏组织内容，配合 C4D 视觉与逐帧动效强化氛围，关键转化点设置清晰的引导与反馈。",
    deliverables: ["视觉设计", "C4D 元素", "界面动效", "切图交付"],
    tags: ["H5", "动效", "C4D"],
    gallery: ["/assets/gallery/gallery-06.jpg", "/assets/gallery/gallery-04.jpg", "/assets/gallery/gallery-10.jpg"]
  },
  {
    id: "design-system",
    index: "05",
    title: "组件设计系统",
    category: "SYSTEM / TOKENS",
    discipline: "B 端",
    year: "2023",
    role: "设计系统负责人",
    client: "云雅信息技术",
    duration: "持续维护",
    cover: "/assets/gallery/gallery-07.jpg",
    summary: "为多条产品线建立统一的设计令牌、组件库与文档，提升设计与开发协作效率。",
    overview:
      "为公司多条产品线沉淀一套统一的设计系统，从设计令牌、基础组件到使用文档，让设计与开发共享同一套语言。",
    challenge: "多产品线视觉与组件各自为政，重复造轮子、协作成本高、体验不一致。",
    solution: "定义颜色、间距、字体等设计令牌，搭建可复用的组件库与示例文档，建立维护与版本机制，让协作有据可依。",
    deliverables: ["设计令牌", "组件库", "使用文档", "协作机制"],
    tags: ["设计系统", "组件库", "Tokens"],
    gallery: ["/assets/gallery/gallery-07.jpg", "/assets/gallery/gallery-11.jpg", "/assets/gallery/gallery-02.jpg"]
  },
  {
    id: "brand-campaign",
    index: "06",
    title: "品牌主视觉与 Banner",
    category: "VISUAL / KV",
    discipline: "品牌",
    year: "2022",
    role: "视觉设计",
    client: "多个运营项目",
    duration: "长期",
    cover: "/assets/gallery/gallery-03.jpg",
    summary: "为多个运营节点输出主视觉与系列 Banner，保持品牌调性的同时兼顾转化目标。",
    overview:
      "围绕多个运营节点持续输出主视觉与系列 Banner，在保持品牌统一调性的前提下，针对不同场景做差异化的视觉表达。",
    challenge: "运营节奏快、需求多变，既要保证品牌一致性，又要让每次活动有新鲜感。",
    solution: "沉淀一套可复用的主视觉模板与图形系统，针对不同活动快速产出系列物料，兼顾效率、统一性与转化。",
    deliverables: ["主视觉 KV", "系列 Banner", "运营物料", "视觉模板"],
    tags: ["主视觉", "Banner", "运营"],
    gallery: ["/assets/gallery/gallery-03.jpg", "/assets/gallery/gallery-08.jpg", "/assets/gallery/gallery-06.jpg"]
  }
];

export const getProject = (id) => projects.find((p) => p.id === id);
export const getNextProject = (id) => {
  const i = projects.findIndex((p) => p.id === id);
  return projects[(i + 1) % projects.length];
};
