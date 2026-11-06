/** @typedef {'en' | 'zh'} Locale */

export const messages = {
  en: {
    nav: {
      home: 'Home',
      sandbox: 'Sandbox',
      matrix: 'Matrix',
      aria: 'Main navigation',
      language: 'Language',
      switchToZh: 'Switch to Chinese',
      switchToEn: 'Switch to English',
    },
    theme: {
      toLight: 'Switch to light mode',
      toDark: 'Switch to dark mode',
    },
    footer: 'April Ma. All Rights Reserved',
    home: {
      headline: 'Tokens that become real components.',
      intro:
        'Try components live in the Sandbox, then use the Matrix to walk a 2014–2026 paradigm timeline and compare systems on Tailwind fit, agent readiness, and a11y.',
      openSandbox: 'Open Sandbox',
      matrix: 'Matrix',
      pillarsLead:
        'Built so designers and developers share the same names for color, space, and interaction.',
      pillars: [
        {
          title: 'Semantic tokens',
          desc: 'Brand, surface, and feedback variables mapped 1-to-1 to Figma — one source of truth.',
        },
        {
          title: 'Accessible primitives',
          desc: 'Button, Input, Select, Dialog, and Toast with focus rings, Esc, and ARIA wired in.',
        },
        {
          title: 'Live sandbox',
          desc: 'Edit components in Sandpack and see states update without leaving the browser.',
        },
      ],
    },
    sandbox: {
      title: 'Sandbox',
      intro:
        'Every component, token, and accessibility pattern — interactive and ready to inspect.',
      sectionsAria: 'Sandbox sections',
      sidebar: {
        playground: 'Live Playground',
        tokens: 'Design Tokens',
        button: 'Button',
        input: 'Input',
        select: 'Select',
        dialog: 'Dialog',
        toast: 'Toast',
        a11y: 'Accessibility',
      },
      playground: {
        title: 'Live Playground',
        description:
          "Edit the code in real-time and see instant rendering. Components run inside an isolated iframe sandbox — errors won't crash the host page.",
      },
      tokens: {
        title: 'Design Tokens',
        description:
          'Semantic color tokens mapped 1-to-1 to Figma variables. Switch themes to see CSS custom properties adapt.',
        groups: {
          Brand: 'Brand',
          Feedback: 'Feedback',
          Surface: 'Surface',
        },
        borderRadius: 'Border Radius',
      },
      button: {
        title: 'Button',
        description:
          'Five semantic variants, three sizes, plus loading and disabled states. All buttons expose proper disabled/busy ARIA attributes.',
        variants: 'Variants',
        sizes: 'Sizes',
        states: 'States',
      },
      input: {
        title: 'Input',
        description:
          'Accessible form inputs with auto-generated IDs, ARIA-invalid for errors, and aria-describedby linking hints and error messages.',
      },
      select: {
        title: 'Select',
        description:
          'Radix Select primitive with keyboard navigation (Arrow keys to browse, Enter to select, Esc to close). Screen readers announce the selected value.',
      },
      dialog: {
        title: 'Dialog',
        description:
          'Modal dialog with focus trap, backdrop overlay, and Esc key to close. Focus returns to the trigger element on close.',
      },
      toast: {
        title: 'Toast',
        description:
          'Lightweight notifications with four semantic variants. Auto-dismisses after 5 seconds, swipe to dismiss on touch devices.',
      },
      a11y: {
        title: 'Accessibility Showcase',
        description:
          'WCAG 2.2 AA compliance demonstrated across all components. Tab through the demo below to verify every pattern.',
      },
    },
    matrix: {
      title: 'System matrix',
      intro:
        'Walk the paradigm timeline, then compare up to three design systems on philosophy, Tailwind fit, agent readiness, accessibility, and license.',
      timelineTitle: 'Paradigm timeline',
      timelineLead: '2014–2026. Choose a year to read the era and highlight its systems.',
      yearsAria: 'Design paradigm years',
      systemsTitle: 'Systems in {year}',
      systemsLead:
        'Highlighted cards represent this era. Select up to {max} systems to compare — picks persist across years.',
      selectedCount: '{count} / {max} selected',
      representative: 'Representative',
      alsoInEra: 'Also in this era',
      limitNote: 'Compare up to {max} systems. Remove one to add another.',
      comparison: 'Comparison',
      metric: 'Metric',
      noneSelected: 'No systems selected',
      pickAbove: 'Pick a system above to fill this row.',
      remove: 'Remove {name} from comparison',
      footnote:
        'Snapshot for this hub, not an official vendor scorecard. Tailwind and agent-ready notes describe how readily a system sits in a Tailwind or Cursor workflow.',
      metrics: {
        philosophy: 'Design philosophy',
        tailwind: 'Tailwind compatibility',
        agentReady: 'AI / agent-ready',
        a11y: 'Accessibility',
        license: 'License',
      },
      eras: {
        2014: {
          label: 'Flat Design',
          description:
            'Interfaces shed skeuomorphic texture for flat color, simple icons, and system type. Material Design and the iOS 7 visual reset set the template most product teams copied.',
        },
        2018: {
          label: 'Material 2 / Fluent',
          description:
            'Depth, motion, and elevation came back as systems, not decoration. Material 2 and Fluent treated light, motion, and density as tokens teams could share across platforms.',
        },
        2021: {
          label: 'Material 3',
          description:
            'Personal color and large-screen layouts moved into the system itself. Material 3 (Material You) and Fluent 2 pushed dynamic theming and tighter design-to-code tokens.',
        },
        2023: {
          label: 'Headless & Tailwind',
          description:
            'Styling and behavior split apart. Radix, Headless UI, and shadcn/ui let teams own the markup, style it with Tailwind, and keep accessibility in the primitive.',
        },
        2026: {
          label: 'Meta Astryx',
          description:
            'A forward-looking paradigm in this timeline: tokens, components, and agent tooling share one contract so Cursor-style agents can assemble UI without inventing a second source of truth. Astryx here is illustrative, not a shipped Meta product.',
        },
      },
      systems: {
        'material-2014': {
          philosophy: 'Paper, ink, and bold color as a cross-platform visual language.',
          tailwind: 'Low — component CSS, not utilities',
          agentReady: 'Limited — docs-first, no MCP surface',
          a11y: 'AA-oriented guidance',
          license: 'Apache-2.0',
        },
        'ios-7': {
          philosophy: 'Flat chrome, clarity, and deference to content.',
          tailwind: 'Low — platform UIKit styling',
          agentReady: 'Limited',
          a11y: 'AA via UIKit traits',
          license: 'Apple proprietary',
        },
        'material-2': {
          philosophy: 'Elevation, motion, and a stricter component catalog.',
          tailwind: 'Partial — theming via Sass / CSS vars',
          agentReady: 'Limited',
          a11y: 'AA-oriented components',
          license: 'Apache-2.0',
        },
        fluent: {
          philosophy: 'Light, depth, motion, and material as Microsoft’s design language.',
          tailwind: 'Partial — Fluent UI ships its own styles',
          agentReady: 'Limited',
          a11y: 'AA-oriented (Fluent UI)',
          license: 'MIT',
        },
        carbon: {
          philosophy: 'Dense, productive IBM enterprise UI with a shared token set.',
          tailwind: 'Adaptable — community Tailwind ports',
          agentReady: 'Emerging — structured tokens',
          a11y: 'AA-oriented',
          license: 'Apache-2.0',
        },
        'material-3': {
          philosophy: 'Dynamic color, personal theming, and adaptive layout.',
          tailwind: 'Adaptable — token mapping, not native',
          agentReady: 'Emerging',
          a11y: 'AA-oriented',
          license: 'Apache-2.0',
        },
        'fluent-2': {
          philosophy: 'One token pipeline from design files into Fluent UI.',
          tailwind: 'Adaptable',
          agentReady: 'Emerging',
          a11y: 'AA-oriented',
          license: 'MIT',
        },
        shadcn: {
          philosophy: 'Copy-owned components on Radix and Tailwind, not a dependency.',
          tailwind: 'Native',
          agentReady: 'High — source in-repo, Cursor-friendly',
          a11y: 'Strong primitives (Radix)',
          license: 'MIT',
        },
        radix: {
          philosophy: 'Headless behavior and accessibility, styling left to the app.',
          tailwind: 'Native pairing',
          agentReady: 'High — composable, predictable APIs',
          a11y: 'Strong primitives',
          license: 'MIT',
        },
        headlessui: {
          philosophy: 'Unstyled Tailwind Labs primitives for menus, dialogs, and lists.',
          tailwind: 'Native',
          agentReady: 'High',
          a11y: 'Strong primitives',
          license: 'MIT',
        },
        astryx: {
          philosophy: 'Agent-native tokens: one contract for UI, docs, and tool use.',
          tailwind: 'Native',
          agentReady: 'First-class — MCP / Cursor as a design surface',
          a11y: 'AA+ expected in the contract',
          license: 'Illustrative',
        },
      },
    },
  },
  zh: {
    nav: {
      home: '首页',
      sandbox: '沙盒',
      matrix: '矩阵',
      aria: '主导航',
      language: '语言',
      switchToZh: '切换到中文',
      switchToEn: '切换到英文',
    },
    theme: {
      toLight: '切换到浅色模式',
      toDark: '切换到深色模式',
    },
    footer: 'April Ma. 保留所有权利',
    home: {
      headline: '让设计令牌变成真正的组件。',
      intro:
        '在沙盒里实时试用组件，再用系统矩阵回顾 2014–2026 的设计范式，并对比 Tailwind 适配、Agent 就绪度与无障碍能力。',
      openSandbox: '打开沙盒',
      matrix: '矩阵',
      pillarsLead: '让设计师与开发者对颜色、间距与交互使用同一套命名。',
      pillars: [
        {
          title: '语义化令牌',
          desc: '品牌、表面与反馈变量与 Figma 一一对应——单一事实来源。',
        },
        {
          title: '无障碍基元',
          desc: 'Button、Input、Select、Dialog 与 Toast，内置焦点环、Esc 与 ARIA。',
        },
        {
          title: '实时沙盒',
          desc: '在 Sandpack 中编辑组件，无需离开浏览器即可看到状态变化。',
        },
      ],
    },
    sandbox: {
      title: '沙盒',
      intro: '每个组件、令牌与无障碍模式——可交互、可检查。',
      sectionsAria: '沙盒章节',
      sidebar: {
        playground: '实时游乐场',
        tokens: '设计令牌',
        button: '按钮',
        input: '输入框',
        select: '选择器',
        dialog: '对话框',
        toast: '轻提示',
        a11y: '无障碍',
      },
      playground: {
        title: '实时游乐场',
        description:
          '实时编辑代码并即时预览。组件运行在隔离的 iframe 沙盒中——报错不会拖垮宿主页面。',
      },
      tokens: {
        title: '设计令牌',
        description: '语义化颜色令牌与 Figma 变量一一映射。切换主题即可看到 CSS 自定义属性变化。',
        groups: {
          Brand: '品牌',
          Feedback: '反馈',
          Surface: '表面',
        },
        borderRadius: '圆角',
      },
      button: {
        title: '按钮',
        description: '五种语义变体、三种尺寸，以及加载与禁用状态。均暴露正确的 disabled/busy ARIA。',
        variants: '变体',
        sizes: '尺寸',
        states: '状态',
      },
      input: {
        title: '输入框',
        description:
          '可访问表单输入：自动生成 ID、错误时的 aria-invalid，以及通过 aria-describedby 关联提示与错误信息。',
      },
      select: {
        title: '选择器',
        description:
          '基于 Radix 的 Select：方向键浏览、Enter 选择、Esc 关闭。读屏会播报当前值。',
      },
      dialog: {
        title: '对话框',
        description: '带焦点陷阱与遮罩的模态对话框，可用 Esc 关闭。关闭后焦点回到触发元素。',
      },
      toast: {
        title: '轻提示',
        description: '四种语义变体的轻量通知。约 5 秒后自动消失，触控设备可滑动关闭。',
      },
      a11y: {
        title: '无障碍展示',
        description: '演示各组件的 WCAG 2.2 AA 实践。用 Tab 遍历下方示例以验证模式。',
      },
    },
    matrix: {
      title: '系统矩阵',
      intro:
        '浏览范式时间线，再并排对比最多三个设计系统：设计哲学、Tailwind 适配、Agent 就绪度、无障碍与许可证。',
      timelineTitle: '范式时间线',
      timelineLead: '2014–2026。选择年份查看该时代说明并高亮对应系统。',
      yearsAria: '设计范式年份',
      systemsTitle: '{year} 年的系统',
      systemsLead: '高亮卡片为本时代代表。最多选择 {max} 个系统对比——切换年份后选择会保留。',
      selectedCount: '已选 {count} / {max}',
      representative: '代表系统',
      alsoInEra: '同代系统',
      limitNote: '最多对比 {max} 个系统。请先移除一个再添加。',
      comparison: '对比',
      metric: '指标',
      noneSelected: '尚未选择系统',
      pickAbove: '在上方选择系统以填充此行。',
      remove: '从对比中移除 {name}',
      footnote:
        '本页为 DesignHub 的快照说明，非正式厂商评分。Tailwind 与 Agent 就绪度描述的是该系统进入 Tailwind / Cursor 工作流的难易程度。',
      metrics: {
        philosophy: '设计哲学',
        tailwind: 'Tailwind 适配',
        agentReady: 'AI / Agent 就绪',
        a11y: '无障碍',
        license: '许可证',
      },
      eras: {
        2014: {
          label: '扁平化设计',
          description:
            '界面告别拟物纹理，转向纯色、简图标与系统字体。Material Design 与 iOS 7 视觉重置成为多数产品团队的模板。',
        },
        2018: {
          label: 'Material 2 / Fluent',
          description:
            '深度、动效与层次作为系统能力回归，而不再只是装饰。Material 2 与 Fluent 把光影、动效与密度做成可跨平台共享的令牌。',
        },
        2021: {
          label: 'Material 3',
          description:
            '个性化配色与大屏布局进入系统本身。Material 3（Material You）与 Fluent 2 推动动态主题与更紧的设计到代码令牌链路。',
        },
        2023: {
          label: '无头组件与 Tailwind',
          description:
            '样式与行为拆分。Radix、Headless UI 与 shadcn/ui 让团队自有标记结构，用 Tailwind 上色，并把无障碍留在基元层。',
        },
        2026: {
          label: 'Meta Astryx',
          description:
            '本时间线中的前瞻范式：令牌、组件与 Agent 工具共享同一契约，使 Cursor 类 Agent 能组装 UI 而无需第二套事实来源。此处 Astryx 为示意，并非已发布的 Meta 产品。',
        },
      },
      systems: {
        'material-2014': {
          philosophy: '以纸张、墨水与鲜明配色构建跨平台视觉语言。',
          tailwind: '低 — 组件 CSS，非工具类',
          agentReady: '有限 — 文档优先，无 MCP 面',
          a11y: '面向 AA 的指南',
          license: 'Apache-2.0',
        },
        'ios-7': {
          philosophy: '扁平铬层、清晰与对内容的退让。',
          tailwind: '低 — 平台 UIKit 样式',
          agentReady: '有限',
          a11y: '通过 UIKit traits 达成 AA',
          license: 'Apple 专有',
        },
        'material-2': {
          philosophy: '层次、动效与更严格的组件目录。',
          tailwind: '部分 — 经 Sass / CSS 变量主题化',
          agentReady: '有限',
          a11y: '面向 AA 的组件',
          license: 'Apache-2.0',
        },
        fluent: {
          philosophy: '光影、深度、动效与材质——微软的设计语言。',
          tailwind: '部分 — Fluent UI 自带样式',
          agentReady: '有限',
          a11y: '面向 AA（Fluent UI）',
          license: 'MIT',
        },
        carbon: {
          philosophy: '偏密的 IBM 企业级 UI，共享令牌集。',
          tailwind: '可适配 — 社区 Tailwind 移植',
          agentReady: '萌芽 — 结构化令牌',
          a11y: '面向 AA',
          license: 'Apache-2.0',
        },
        'material-3': {
          philosophy: '动态配色、个性化主题与自适应布局。',
          tailwind: '可适配 — 令牌映射，非原生',
          agentReady: '萌芽',
          a11y: '面向 AA',
          license: 'Apache-2.0',
        },
        'fluent-2': {
          philosophy: '从设计文件到 Fluent UI 的一条令牌流水线。',
          tailwind: '可适配',
          agentReady: '萌芽',
          a11y: '面向 AA',
          license: 'MIT',
        },
        shadcn: {
          philosophy: '基于 Radix 与 Tailwind 的可拷贝组件，而非依赖包。',
          tailwind: '原生',
          agentReady: '高 — 源码在仓库内，适合 Cursor',
          a11y: '强基元（Radix）',
          license: 'MIT',
        },
        radix: {
          philosophy: '无头行为与无障碍，样式交给应用。',
          tailwind: '原生搭配',
          agentReady: '高 — 可组合、可预期的 API',
          a11y: '强基元',
          license: 'MIT',
        },
        headlessui: {
          philosophy: 'Tailwind Labs 的无样式基元：菜单、对话框与列表。',
          tailwind: '原生',
          agentReady: '高',
          a11y: '强基元',
          license: 'MIT',
        },
        astryx: {
          philosophy: '面向 Agent 的令牌：UI、文档与工具共用一份契约。',
          tailwind: '原生',
          agentReady: '一等公民 — MCP / Cursor 作为设计面',
          a11y: '契约中预期 AA+',
          license: '示意',
        },
      },
    },
  },
}

/**
 * @param {string} template
 * @param {Record<string, string | number>} vars
 */
export function formatMessage(template, vars = {}) {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    vars[key] === undefined || vars[key] === null ? `{${key}}` : String(vars[key]),
  )
}
