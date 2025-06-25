#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  gray: '\x1b[90m'
};

function log(message, color = 'reset') {
  const colorCode = colors[color] || colors.reset;
  console.log(colorCode + message + colors.reset);
}

// 进度条组件
class ProgressBar {
  constructor(total, width = 40) {
    this.total = total;
    this.current = 0;
    this.width = width;
    this.startTime = Date.now();
  }

  update(current, message = '') {
    this.current = current;
    const percentage = Math.floor((current / this.total) * 100);
    const filled = Math.floor((current / this.total) * this.width);
    const empty = this.width - filled;

    const bar = '█'.repeat(filled) + '░'.repeat(empty);
    const elapsed = ((Date.now() - this.startTime) / 1000).toFixed(1);

    // 限制消息长度，避免终端显示问题
    const maxMessageLength = 30;
    const truncatedMessage = message.length > maxMessageLength
         ? message.substring(0, maxMessageLength - 3) + '...'
         : message;

       // 清除当前行并输出进度条
       process.stdout.write('\r');
       process.stdout.write(
         `${colors.cyan}[${bar}]${colors.reset} ${colors.green}${percentage}%${colors.reset} ${colors.gray}(${elapsed}s)${colors.reset} ${truncatedMessage}`
       );
  }

  complete() {
    this.update(this.total, ''); // 不带额外信息
    console.log(''); // 换行，保留最后进度条
  }
}

// 加载动画
class Spinner {
  constructor(message = '处理中...') {
    this.frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    this.message = message;
    this.index = 0;
    this.interval = null;
  }

  start() {
    this.interval = setInterval(() => {
      process.stdout.write('\r');
      process.stdout.write(`${colors.cyan}${this.frames[this.index]}${colors.reset} ${this.message}`);
      this.index = (this.index + 1) % this.frames.length;
    }, 100);
  }

  stop(finalMessage = '') {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    if (finalMessage) {
      console.log(`${colors.green}✅${colors.reset} ${finalMessage}`);
    }
  }

  updateMessage(message) {
    this.message = message;
  }
}

// 创建输入接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// 替换模板变量
function replaceTemplateVars(content, vars) {
  let result = content;
  Object.entries(vars).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, value);
  });
  return result;
}

// 处理文件名转换
function processFileName(fileName) {
  if (fileName.endsWith('.template')) {
    return fileName.slice(0, -9);
  }
  if (fileName.startsWith('_')) {
    return fileName.slice(1);
  }
  return fileName;
}

// 统计模板文件数量
function countFiles(dirPath) {
  let count = 0;

  if (!fs.existsSync(dirPath)) {
    return count;
  }

  try {
    const files = fs.readdirSync(dirPath);

    for (const file of files) {
      // 跳过隐藏文件和系统文件
      if (file.startsWith('.') &&
          file !== '.gitignore' &&
          file !== '.env.example' &&
          file !== '.prettierrc' &&
          file !== '.prettierignore' &&
          file !== '.eslintrc.json' &&
          file !== '.editorconfig') {
           continue;
      }
      // 跳过 node_modules、dist、build 目录和锁文件
      if (
        file === 'node_modules' ||
        file === 'dist' ||
        file === 'build' ||
        file === 'package-lock.json' ||
        file === 'yarn.lock' ||
        file === 'pnpm-lock.yaml' ||
        file === 'pnpm-workspace.yaml'
      ) {
        continue;
      }

      const fullPath = path.join(dirPath, file);
      const stats = fs.statSync(fullPath);

      if (stats.isDirectory()) {
        count += countFiles(fullPath);
      } else {
        count++;
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error.message);
  }

  return count;
}

// 复制并处理模板文件（带进度）
function copyTemplate(templatePath, targetPath, vars, progressBar, processedFiles = { count: 0 }) {
  try {
    const stats = fs.statSync(templatePath);

    if (stats.isDirectory()) {
      if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath, { recursive: true });
      }

      const files = fs.readdirSync(templatePath);
      files.forEach(file => {
        // 跳过隐藏文件和系统文件
        if (file.startsWith('.') &&
            file !== '.gitignore' &&
            file !== '.env.example' &&
            file !== '.prettierrc' &&
            file !== '.prettierignore' &&
            file !== '.eslintrc.json' &&
            file !== '.editorconfig') {
          return;
        }

        // 跳过 node_modules、dist、build 目录和锁文件
        if (
          file === 'node_modules' ||
          file === 'dist' ||
          file === 'build' ||
          file === 'package-lock.json' ||
          file === 'yarn.lock' ||
          file === 'pnpm-lock.yaml' ||
          file === 'pnpm-workspace.yaml'
        ) {
          return;
        }

        const processedFileName = processFileName(file);
        copyTemplate(
          path.join(templatePath, file),
          path.join(targetPath, processedFileName),
          vars,
          progressBar,
          processedFiles
        );
      });
    } else {
      // 处理文件
      let content = fs.readFileSync(templatePath, 'utf8');
      content = replaceTemplateVars(content, vars);

      // 文件名合法性检查，防止生成奇怪文件
      if (!targetPath || !path.basename(targetPath).trim()) {
        throw new Error(`生成的目标文件名非法: ${targetPath}`);
      }

      fs.writeFileSync(targetPath, content);

      // 更新进度
      processedFiles.count++;
      const fileName = path.basename(targetPath);
      const safeFileName = Buffer.from(fileName, 'utf8').toString('utf8'); // 确保编码正确
      progressBar.update(processedFiles.count, `创建 ${safeFileName}`);


      // 适当延时，避免过快处理
      const delay = Math.min(Math.random() * 30 + 10, 50);
      const start = Date.now();
      while (Date.now() - start < delay) {
        // 简单的延时
      }
    }
  } catch (error) {
    console.error(`Error processing ${templatePath}:`, error.message);
    throw error;
  }
}

// 显示欢迎界面
function showWelcome() {
  console.clear();
  log('', 'reset');
  log('  ╭─────────────────────────────────────────────────╮', 'cyan');
  log('  │                                                 │', 'cyan');
  log('  │          🚀 React 现代化脚手架 v1.0              │', 'cyan');
  log('  │                                                 │', 'cyan');
  log('  │     快速创建现代化的 React + TypeScript 项目     │', 'white');
  log('  │                                                 │', 'cyan');
  log('  ╰─────────────────────────────────────────────────╯', 'cyan');
  log('', 'reset');
}

// 显示项目信息
function showProjectInfo(projectName, description, vars) {
  log('', 'reset');
  log('📋 项目信息确认:', 'yellow');
  log(`   名称: ${colors.green}${projectName}${colors.reset}`);
  log(`   描述: ${colors.white}${description}${colors.reset}`);
  log(`   包名: ${colors.blue}${vars.PACKAGE_NAME}${colors.reset}`);
  log('', 'reset');
}

// 主函数
async function createProject() {
  showWelcome();

  // 获取项目信息
  const projectName = process.argv[2] || await askQuestion('📝 项目名称: ');
  const projectDescription = await askQuestion('📄 项目描述 (可选): ') || 'A modern React application';

  if (!projectName) {
    log('❌ 项目名称不能为空！', 'red');
    rl.close();
    process.exit(1);
  }

  const targetPath = path.join(process.cwd(), projectName);

  // 检查目录是否存在
  if (fs.existsSync(targetPath)) {
    log(`❌ 目录 ${projectName} 已存在！`, 'red');
    rl.close();
    process.exit(1);
  }

  // 准备模板变量
  const vars = {
    PROJECT_NAME: projectName,
    PACKAGE_NAME: projectName.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
    PROJECT_DESCRIPTION: projectDescription
  };

  showProjectInfo(projectName, projectDescription, vars);

  const confirm = await askQuestion('✨ 确认创建项目？(y/n): ');
  if (
    confirm.trim() !== '' &&
    confirm.toLowerCase() !== 'y' &&
    confirm.toLowerCase() !== 'yes'
  ) {
    log('🚫 取消创建项目', 'yellow');
    rl.close();
    return;
  }

  console.log('');

  // 初始化阶段
  const initSpinner = new Spinner('🔍 初始化项目...');
  initSpinner.start();

  // 获取模板路径
  const templatePath = path.join(__dirname, '..', 'template');

  if (!fs.existsSync(templatePath)) {
    initSpinner.stop();
    log('❌ 模板文件夹不存在！', 'red');
    log(`   期望路径: ${templatePath}`, 'gray');
    log('   请确保模板文件夹存在', 'yellow');
    rl.close();
    process.exit(1);
  }

  // 验证模板目录不为空
  const templateFiles = fs.readdirSync(templatePath);
  if (templateFiles.length === 0) {
    initSpinner.stop();
    log('❌ 模板文件夹为空！', 'red');
    rl.close();
    process.exit(1);
  }

  // 创建项目目录
  fs.mkdirSync(targetPath, { recursive: true });

  // 统计文件数量
  const totalFiles = countFiles(templatePath);

  initSpinner.stop('初始化完成');

  log(`📊 检测到 ${totalFiles} 个文件需要处理`, 'blue');
  log('', 'reset');

  // 文件复制阶段
  log('📁 开始创建项目文件...', 'yellow');
  const progressBar = new ProgressBar(totalFiles);

  try {
    copyTemplate(templatePath, targetPath, vars, progressBar);
  } catch (error) {
    console.log('');
    log('❌ 创建文件时发生错误:', 'red');
    console.error(error);
    rl.close();
    process.exit(1);
  }

  progressBar.complete(); // 只结束进度条，不附带文案
  log('所有文件创建完成', 'green'); // 单独输出提示

  // 完成动画
  const completeSpinner = new Spinner('🎉 正在完成最后的设置...');
  completeSpinner.start();

  // 模拟最后的设置时间
  await new Promise(resolve => setTimeout(resolve, 1000));

  completeSpinner.stop('项目创建完成!');

  // 显示成功信息
  log('', 'reset');
  log('  ╭─────────────────────────────────────────────────╮', 'green');
  log('  │                                                 │', 'green');
  log('  │               🎉 创建成功！                      │', 'green');
  log('  │                                                 │', 'green');
  log('  ╰─────────────────────────────────────────────────╯', 'green');
  log('', 'reset');

  // 显示使用说明
  log('📁 进入项目目录:', 'cyan');
  log(`   cd ${projectName}`, 'gray');
  log('', 'reset');

  log('📦 安装依赖:', 'cyan');
  log('   npm install     # 或者', 'gray');
  log('   yarn install    # 或者', 'gray');
  log('   pnpm install', 'gray');
  log('', 'reset');

  log('🚀 启动开发服务器:', 'cyan');
  log('   npm run dev     # 或者', 'gray');
  log('   yarn dev        # 或者', 'gray');
  log('   pnpm dev', 'gray');
  log('', 'reset');

  log('📚 技术栈:', 'magenta');
  log('   • React + TypeScript', 'gray');
  log('   • React Router v7 (Data API)', 'gray');
  log('   • TanStack Query', 'gray');
  log('   • Tailwind CSS + shadcn/ui', 'gray');
  log('   • Vite + ESLint + Prettier', 'gray');
  log('', 'reset');

  rl.close();
}

// 错误处理
process.on('unhandledRejection', (error) => {
  console.log('\n');
  log('❌ 发生错误:', 'red');
  console.error(error);
  rl.close();
  process.exit(1);
});

// 运行
createProject();
