# {{PROJECT_NAME}}

{{PROJECT_DESCRIPTION}}

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

## 项目结构

\`\`\`
src/
├── components/          # 组件
│   ├── ui/             # shadcn/ui 组件
│   ├── layout/         # 布局组件
│   └── common/         # 通用组件
├── pages/              # 页面
├── hooks/              # 自定义 hooks
├── lib/                # 工具库
└── types/              # 类型定义
\`\`\`

## 功能特性

- ✅ TypeScript 支持
- ✅ 响应式设计
- ✅ 代码规范检查
- ✅ 路由配置
- ✅ API 请求封装
- ✅ 组件库集成
- ✅ 主题切换支持

## 开发指南

### 添加新页面

```typescript
// 1. 在 src/pages 创建页面组件
// 2. 在路由配置中添加路由
```

### 使用 API

```typescript
import { useQuery } from '@tanstack/react-query';

const { data, isLoading } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
});
```

