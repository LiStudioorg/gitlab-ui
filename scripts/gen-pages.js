#!/usr/bin/env node
/**
 * scripts/gen-pages.js
 * 幂等生成 6 框架 × 4 页面 = 24 个页面：
 *   dist/html/pages/*.html           (HTML + Tailwind CDN 单文件)
 *   dist/vue3/pages/*.vue            (import ../components)
 *   dist/react-tailwind/pages/*.tsx  (import ../components)
 *   dist/next-shadcn/app/<page>/page.tsx (import 自 components/ui)
 *   dist/sveltekit/src/routes/<page>/+page.svelte (import components)
 *   dist/astro/src/pages/<page>.astro (import ../components)
 *
 * 页面：merge-request / pipeline / project-home / issues
 * 结构：三区布局（顶部全局导航 + 左侧项目导航 + 主内容[+右栏]），暗色切换，响应式。
 * 令牌：全部引用 var(--gl-*)；无 GitLab/tanuki 字样。
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

const html = require('./pages-lib/html');
const vue3 = require('./pages-lib/vue3');
const react = require('./pages-lib/react');
const next = require('./pages-lib/next');
const svelte = require('./pages-lib/svelte');
const astro = require('./pages-lib/astro');

const PAGES = ['merge-request', 'pipeline', 'project-home', 'issues'];

/** 幂等写出（目录自动创建，返回完整路径） */
function write(rel, content) {
  const abs = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content, 'utf8');
  return abs;
}

function main() {
  const written = [];
  const t0 = Date.now();

  /* ---------- 1. HTML（Tailwind CDN 单文件） ---------- */
  const htmlMap = {
    'merge-request': html.mergeRequestPage,
    pipeline: html.pipelinePage,
    'project-home': html.projectHomePage,
    issues: html.issuesPage,
  };
  for (const p of PAGES) {
    written.push(write(`html/pages/${p}.html`, htmlMap[p]()));
  }

  /* ---------- 2. Vue3 ---------- */
  const vueMap = {
    'merge-request': ['MergeRequest.vue', vue3.mergeRequest],
    pipeline: ['Pipeline.vue', vue3.pipeline],
    'project-home': ['ProjectHome.vue', vue3.projectHome],
    issues: ['Issues.vue', vue3.issues],
  };
  for (const p of PAGES) {
    const [name, fn] = vueMap[p];
    written.push(write(`vue3/pages/${name}`, fn()));
  }

  /* ---------- 3. React + Tailwind ---------- */
  const reactMap = {
    'merge-request': ['MergeRequest.tsx', react.mergeRequest],
    pipeline: ['Pipeline.tsx', react.pipeline],
    'project-home': ['ProjectHome.tsx', react.projectHome],
    issues: ['Issues.tsx', react.issues],
  };
  for (const p of PAGES) {
    const [name, fn] = reactMap[p];
    written.push(write(`react-tailwind/pages/${name}`, fn()));
  }

  /* ---------- 4. Next.js App Router ---------- */
  const nextMap = {
    'merge-request': next.mergeRequest,
    pipeline: next.pipeline,
    'project-home': next.projectHome,
    issues: next.issues,
  };
  for (const p of PAGES) {
    written.push(write(`next-shadcn/app/${p}/page.tsx`, nextMap[p]()));
  }

  /* ---------- 5. SvelteKit ---------- */
  const svelteMap = {
    'merge-request': svelte.mergeRequest,
    pipeline: svelte.pipeline,
    'project-home': svelte.projectHome,
    issues: svelte.issues,
  };
  for (const p of PAGES) {
    written.push(write(`sveltekit/src/routes/${p}/+page.svelte`, svelteMap[p]()));
  }

  /* ---------- 6. Astro ---------- */
  const astroMap = {
    'merge-request': astro.mergeRequest,
    pipeline: astro.pipeline,
    'project-home': astro.projectHome,
    issues: astro.issues,
  };
  for (const p of PAGES) {
    written.push(write(`astro/src/pages/${p}.astro`, astroMap[p]()));
  }

  /* ---------- 校验令牌引用 & 中性命名 ---------- */
  const vars = fs.readFileSync(path.join(DIST, 'css/variables.css'), 'utf8');
  const definedTokens = new Set();
  for (const m of vars.matchAll(/(--gl-[a-z0-9-]+)\s*:/g)) definedTokens.add(m[1]);

  const problems = [];
  for (const f of written) {
    const src = fs.readFileSync(f, 'utf8');
    for (const m of src.matchAll(/var\((--gl-[a-z0-9-]+)\)/g)) {
      if (!definedTokens.has(m[1])) {
        problems.push(`${path.relative(DIST, f)}: 未定义令牌 ${m[1]}`);
      }
    }
    if (/gitlab|tanuki/i.test(src)) {
      problems.push(`${path.relative(DIST, f)}: 含禁用词`);
    }
  }

  /* ---------- 汇总 ---------- */
  const byFrame = {};
  for (const f of written) {
    const frame = path.relative(DIST, f).split(path.sep)[0];
    byFrame[frame] = (byFrame[frame] || 0) + 1;
  }
  console.log('gen-pages: 生成完成');
  for (const [frame, n] of Object.entries(byFrame)) {
    console.log(`  ${frame}: ${n} 页面`);
  }
  console.log(`  合计: ${written.length} 个文件，耗时 ${Date.now() - t0}ms`);
  if (problems.length) {
    console.log(`\n警告 ${problems.length} 条：`);
    for (const p of problems) console.log('  -', p);
    process.exitCode = 2;
  } else {
    console.log('  令牌引用全部有效；无禁用词。');
  }
}

main();
