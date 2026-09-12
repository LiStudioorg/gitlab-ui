'use strict';
/*
 * build-all.js — 一键编排：只负责按顺序调用生成脚本并打印每步耗时，
 * 不在本文件里重复任何生成逻辑。
 * 顺序：build-tokens.js → 其余 gen-*.js（fs 探测）→ gen-adapters.js（适配层/报告）。
 * 用法：node scripts/build-all.js
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SCRIPTS = __dirname;

function run(name, rel, { fatal = true } = {}) {
  const t0 = Date.now();
  try {
    execSync(`node "${rel}"`, { cwd: ROOT, stdio: 'inherit', env: process.env });
  } catch (err) {
    const msg = `[build-all] 步骤失败：${name} (${rel}) — ${err.message.split('\n')[0]}`;
    if (fatal) {
      process.stderr.write(`\n${msg}\n`);
      process.exit(1);
    }
    process.stderr.write(`\n[build-all] 警告：${name} 失败，跳过继续。\n`);
    failed.push(name);
  }
  const ms = Date.now() - t0;
  console.log(`[build-all] ${name}: ${ms}ms`);
  return ms;
}

const failed = [];

const order = [];
const SKIP = new Set(['gen-adapters.js', 'gen-lib.js']);
const others = fs
  .readdirSync(SCRIPTS)
  .filter((f) => /^gen-.+\.js$/.test(f) && !SKIP.has(f))
  .sort();

console.log('[build-all] === 开始一键构建 ===');

const tStart = Date.now();
const timings = [];

timings.push([`build-tokens (core tokens)`, run('build-tokens', 'scripts/build-tokens.js')]);
for (const f of others) {
  timings.push([`gen-${f.replace(/^gen-/, '').replace(/\.js$/, '')}`, run(f.slice(0, -3), `scripts/${f}`, { fatal: false })]);
}
const tAdapters = Date.now();
run('gen-adapters (adapters + prompts + maps + report)', 'scripts/gen-adapters.js');
timings.push(['gen-adapters', Date.now() - tAdapters]);

const total = Date.now() - tStart;
console.log('\n[build-all] === 构建完成 ===');
for (const [name, ms] of timings) console.log(`  ${name}: ${ms}ms`);
console.log(`  总耗时: ${total}ms`);
if (failed.length) console.log(`  跳过失败步骤: ${failed.join(', ')}`);

// 最终 BUILD-REPORT 摘要（gen-adapters.js 刚刷新过报告）
try {
  const txt = fs.readFileSync(path.join(ROOT, 'BUILD-REPORT.md'), 'utf8');
  const m = txt.match(/- dist 目录数：(\d+)，文件数：(\d+)，总大小：([\d.]+) KB/);
  if (m) console.log(`[build-all] BUILD-REPORT: ${m[1]} 个目录 / ${m[2]} 个文件 / ${m[3]} KB（已刷新）`);
} catch (e) {
  console.log('[build-all] 警告：未找到 BUILD-REPORT.md（gen-adapters 应已生成）');
}