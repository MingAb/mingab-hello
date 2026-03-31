// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs'; // 引入 Node.js 原生的文件系统模块

// 🌟 核心魔法：写一个函数自动扫描 src 目录下的所有 html 文件
function getHtmlEntries() {
  const srcDir = resolve(__dirname, 'src');
  const files = fs.readdirSync(srcDir); // 读取 src 文件夹下的所有文件
  const entries = {};

  files.forEach((file) => {
    // 如果是以 .html 结尾的文件
    if (file.endsWith('.html')) {
      const name = file.replace('.html', ''); // 去掉后缀，把文件名作为 key（比如 index, portfolio）
      entries[name] = resolve(srcDir, file);  // 记录文件的绝对路径
    }
  });

  return entries;
}

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist',
    emptyOutDir: true, // 打包前自动清空上一次的 dist 文件夹，保持干净
    rollupOptions: {
      // 🌟 直接调用刚才写的函数，Vite 就会自动获取所有页面！
      input: getHtmlEntries(), 
    },
  },
  server: {
    port: 3000,
  },
});