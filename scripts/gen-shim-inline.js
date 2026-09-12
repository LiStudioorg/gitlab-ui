#!/usr/bin/env node
/**
 * inline-shim.js — 把 dist/html/pages/*.html 与 dist/alpine/components/*.html
 * 改造成零 CDN 依赖：
 *  1. 删除 <script src="https://cdn.tailwindcss.com"> 与 unpkg alpine 脚本
 *  2. 把 dist/css/shim.css 内联进 <style>（或替换为本地引用）
 *  3. Alpine 交互由页面内已有的 vanilla <script> 提供（生成器已内联）
 * 幂等可重跑。
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const shim = fs.readFileSync(path.join(ROOT, 'dist', 'css', 'shim.css'), 'utf8');
const shimBlock = `<style id="gl-shim">\n${shim}\n</style>`;

const targets = [];
for (const dir of ['dist/html/pages', 'dist/alpine/components']) {
  const p = path.join(ROOT, dir);
  if (!fs.existsSync(p)) continue;
  for (const f of fs.readdirSync(p)) if (f.endsWith('.html')) targets.push(path.join(p, f));
}

let changed = 0;
for (const f of targets) {
  let s = fs.readFileSync(f, 'utf8');
  const before = s;
  // 1. 删 CDN 脚本
  s = s.replace(/<script[^>]*cdn\.tailwindcss\.com[^>]*><\/script>\s*/g, '');
  s = s.replace(/<script[^>]*unpkg\.com[^>]*><\/script>\s*/g, '');
  s = s.replace(/<script[^>]*cdn\.jsdelivr\.net[^>]*alpine[^>]*><\/script>\s*/gi, '');
  // 2. 已有 shim 内联块则替换，否则在 </head> 前插入
  if (s.includes('<style id="gl-shim">')) {
    s = s.replace(/<style id="gl-shim">[\s\S]*?<\/style>/, shimBlock);
  } else {
    s = s.replace('</head>', `${shimBlock}\n</head>`);
  }
  // 3. 相对引用 variables.css 保持（同仓离线可用）；若为 file:// 单文件场景则内联
  if (process.argv.includes('--inline-vars')) {
    if (s.includes('variables.css') && !s.includes('<style id="gl-vars">')) {
      const vars = fs.readFileSync(path.join(ROOT, 'dist', 'css', 'variables.css'), 'utf8');
      s = s.replace(/<link[^>]*variables\.css[^>]*>\s*/g, `<style id="gl-vars">\n${vars}\n</style>\n`);
    }
  }
  if (s !== before) {
    fs.writeFileSync(f, s);
    changed++;
  }
}
console.log(`[inline-shim] 处理 ${targets.length} 个文件，更新 ${changed} 个`);
