# whtg-creat-react-app

现代化 React + TypeScript 项目一键脚手架，快速搭建开箱即用的前端工程。

## 技术栈

- ⚡️ React + TypeScript
- 🛣️ React Router v7
- 🔄 TanStack Query (数据获取)
- 🎨 Tailwind CSS + shadcn/ui
- 📦 Vite (构建工具)

## 快速开始

### 使用脚手架脚本创建新项目

全局安装脚手架工具：

```bash
npm install -g @whtg/creat-react-app
```

或在当前目录使用 npx 运行：

```bash
npx @whtg/creat-react-app my-new-app
```

或者如果已全局安装，可以用命令 cr 创建项目：

```bash
cr my-new-app
```

### 进入项目目录并安装依赖

```bash
cd my-new-app
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## 项目结构说明

```
src/
├── components/      # 组件
│   ├── ui/          # shadcn/ui 组件
│   ├── layout/      # 布局组件
│   └── common/      # 通用组件
├── pages/           # 页面
├── hooks/           # 自定义 hooks
├── lib/             # 工具库
└── types/           # 类型定义
```

## 功能特性

- ✅ TypeScript 支持
- ✅ 响应式/原子化 CSS（Tailwind）
- ✅ 代码规范检查（ESLint、Prettier）
- ✅ 路由与页面解耦
- ✅ API 请求（TanStack Query）
- ✅ 高效组件库集成（shadcn/ui）
- ✅ 主题切换支持
