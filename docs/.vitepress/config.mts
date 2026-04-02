import { defineConfig } from "vitepress";

const enSidebar = [
  {
    text: "Start Here",
    items: [
      { text: "Overview", link: "/" },
      { text: "Learning Path", link: "/learning-path" },
    ],
  },
  {
    text: "AI Agent Foundations",
    items: [
      { text: "What Is an Agent?", link: "/foundations/what-is-an-agent" },
      { text: "The Agent Loop", link: "/foundations/agent-loop" },
      { text: "Context and Memory", link: "/foundations/context-memory" },
      { text: "Tools and Safety", link: "/foundations/tools-safety" },
    ],
  },
  {
    text: "Claude Code Deep Dive",
    items: [
      { text: "Architecture", link: "/claude-code/architecture" },
      { text: "Repository Map", link: "/claude-code/repo-map" },
      { text: "Runtime Loop", link: "/claude-code/runtime-loop" },
      { text: "Context Engineering", link: "/claude-code/context-engineering" },
      {
        text: "Tools and Permissions",
        link: "/claude-code/tools-and-permissions",
      },
      {
        text: "Commands, UI, and Extensions",
        link: "/claude-code/commands-ui-extensions",
      },
      {
        text: "Memory and Multi-Agent",
        link: "/claude-code/memory-and-multi-agent",
      },
      { text: "Build Your Own", link: "/claude-code/building-your-own" },
    ],
  },
  {
    text: "Source Tours",
    items: [
      { text: "Overview", link: "/source-tours/" },
      { text: "Startup to First Turn", link: "/source-tours/startup-to-turn" },
      {
        text: "Tools and Permission Tour",
        link: "/source-tours/tools-permission-tour",
      },
      {
        text: "Context and Memory Tour",
        link: "/source-tours/context-memory-tour",
      },
      { text: "Commands and UI Tour", link: "/source-tours/commands-ui-tour" },
    ],
  },
  {
    text: "Labs",
    items: [
      { text: "Overview", link: "/labs/" },
      { text: "Add a Tool", link: "/labs/add-a-tool" },
      { text: "Compact Context", link: "/labs/compact-context" },
      { text: "Multi-Agent Readiness", link: "/labs/multi-agent-readiness" },
    ],
  },
  {
    text: "Appendix",
    items: [
      { text: "Source Atlas", link: "/appendix/source-atlas" },
      { text: "Glossary", link: "/appendix/glossary" },
      { text: "Publishing", link: "/publishing" },
    ],
  },
];

const zhSidebar = [
  {
    text: "从这里开始",
    items: [
      { text: "总览", link: "/zh/" },
      { text: "学习路径", link: "/zh/learning-path" },
    ],
  },
  {
    text: "AI Agent 基础",
    items: [
      { text: "什么是 Agent？", link: "/zh/foundations/what-is-an-agent" },
      { text: "Agent 循环", link: "/zh/foundations/agent-loop" },
      { text: "上下文与记忆", link: "/zh/foundations/context-memory" },
      { text: "工具与安全", link: "/zh/foundations/tools-safety" },
    ],
  },
  {
    text: "Claude Code 源码深潜",
    items: [
      { text: "架构总览", link: "/zh/claude-code/architecture" },
      { text: "仓库地图", link: "/zh/claude-code/repo-map" },
      { text: "运行时主循环", link: "/zh/claude-code/runtime-loop" },
      { text: "上下文工程", link: "/zh/claude-code/context-engineering" },
      { text: "工具与权限", link: "/zh/claude-code/tools-and-permissions" },
      {
        text: "命令、界面与扩展",
        link: "/zh/claude-code/commands-ui-extensions",
      },
      {
        text: "记忆与多智能体",
        link: "/zh/claude-code/memory-and-multi-agent",
      },
      { text: "自己实现一个", link: "/zh/claude-code/building-your-own" },
    ],
  },
  {
    text: "源码导览",
    items: [
      { text: "总览", link: "/zh/source-tours/" },
      { text: "启动到首个回合", link: "/zh/source-tours/startup-to-turn" },
      {
        text: "工具与权限导览",
        link: "/zh/source-tours/tools-permission-tour",
      },
      {
        text: "上下文与记忆导览",
        link: "/zh/source-tours/context-memory-tour",
      },
      { text: "命令与界面导览", link: "/zh/source-tours/commands-ui-tour" },
    ],
  },
  {
    text: "实验室",
    items: [
      { text: "总览", link: "/zh/labs/" },
      { text: "添加一个工具", link: "/zh/labs/add-a-tool" },
      { text: "压缩上下文", link: "/zh/labs/compact-context" },
      { text: "多智能体准备度", link: "/zh/labs/multi-agent-readiness" },
    ],
  },
  {
    text: "附录",
    items: [
      { text: "源码图谱", link: "/zh/appendix/source-atlas" },
      { text: "术语表", link: "/zh/appendix/glossary" },
      { text: "发布说明", link: "/zh/publishing" },
    ],
  },
];

export default defineConfig({
  title: "Relearn Claude Code",
  description:
    "English-first, bilingual deep dive into Claude Code and AI agent engineering.",
  base: process.env.DOCS_BASE || "/",
  srcDir: ".",
  cleanUrls: true,
  lastUpdated: true,
  head: [["meta", { name: "theme-color", content: "#111827" }]],
  markdown: {
    theme: "material-theme-palenight",
  },
  themeConfig: {
    logo: "/agent-stack.svg",
    search: { provider: "local" },
    socialLinks: [{ icon: "github", link: "https://github.com/" }],
    footer: {
      message: "Built for learning, research, and engineering education.",
      copyright: "Relearn Claude Code",
    },
  },
  locales: {
    root: {
      label: "English",
      lang: "en-US",
      link: "/",
      themeConfig: {
        nav: [
          { text: "Foundations", link: "/foundations/what-is-an-agent" },
          { text: "Claude Code", link: "/claude-code/architecture" },
          { text: "Source Tours", link: "/source-tours/" },
          { text: "Labs", link: "/labs/" },
          { text: "Atlas", link: "/appendix/source-atlas" },
        ],
        sidebar: enSidebar,
        outline: { level: [2, 3], label: "On this page" },
        docFooter: { prev: "Previous", next: "Next" },
      },
    },
    zh: {
      label: "简体中文",
      lang: "zh-CN",
      link: "/zh/",
      themeConfig: {
        nav: [
          { text: "基础", link: "/zh/foundations/what-is-an-agent" },
          { text: "Claude Code", link: "/zh/claude-code/architecture" },
          { text: "导览", link: "/zh/source-tours/" },
          { text: "实验", link: "/zh/labs/" },
          { text: "图谱", link: "/zh/appendix/source-atlas" },
        ],
        sidebar: zhSidebar,
        outline: { level: [2, 3], label: "本页目录" },
        docFooter: { prev: "上一页", next: "下一页" },
      },
    },
  },
});
