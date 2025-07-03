# whtg-creat-react-app

现代化 React + TypeScript 项目一键脚手架，助您快速搭建开箱即用的前端工程。
⚠️ 本脚手架仅生成**简洁基础**的目录结构，方便您后续自由扩展。

## 技术栈（依赖说明）
如需调整依赖版本，请直接修改对应的版本号。
脚手架生成的项目仅包含最基础的目录结构和依赖配置，后续可根据实际项目需要自行完善。
请自行更改文件/直接删除，生成文件只是示例

- ⚡️ React 19 + TypeScript
- 🛣️ React Router v7
- 🔄 TanStack Query (声明模式)
- 🎨 Tailwind CSS + shadcn/ui
- 📦 Vite (构建工具) 7.0.0

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
├── assets/
├── types/
│   └── loading.ts              # Loading 相关类型定义
├── components/
│   ├── LoadingSpinner.tsx      # 基础加载动画组件
│   ├── SuspenseLoading.tsx     # Suspense 专用加载组件
│   └── layout/
│       └── rootLayout.tsx      # 根布局组件
│   └── ui/                     # shandcn/ui
├── lib/
├── pages/
│   ├── Home.tsx               # 首页
│   ├── Setting.tsx            # 设置页面（懒加载）
│   ├── Login.tsx              # 登录页面
│   ├── Register.tsx           # 注册页面
│   └── NotFound.tsx           # 404 页面
├── App.tsx                    # 主应用组件
└── main.tsx                   # 应用入口
```

> 📢 脚手架会自动跳过 npm/yarn/pnpm 的锁文件（package-lock.json、yarn.lock、pnpm-lock.yaml、pnpm-workspace.yaml），不会复制到新项目中。如需锁定依赖版本，请在新项目中自行生成锁文件。


## 升级日志 1.0.4
⚠️ 从 数据模式 迁移为 声明模式 ，数据请求状态管理 使用 tanstack query ，与 数据模式的loader 解耦，实现数据逻辑与路由解耦
1. 更新 @tailwindcss/vite 适配 vite 7.0
2. 新增 lazy 组件的 loading 设置
3. 配置好了 toaster 引用,方便后续可以直接使用
4. 增加了 @tanstack/eslint-plugin-query 的配置
5. 模拟 query 的loading 效果


## 升级日志 1.0.3
1. 创建项目时，确认提示“确认创建项目？(y/n):”支持直接回车，默认选择“是”，提升交互体验。


## 升级日志 1.0.2
1. Vite 升级至 7.0.0
2. 创建项目时不再复制锁文件（package-lock.json、yarn.lock、pnpm-lock.yaml、pnpm-workspace.yaml）
3. 文档内容优化与更新
