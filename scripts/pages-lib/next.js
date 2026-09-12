/**
 * pages-lib/next.js
 * 渲染 Next.js App Router 页面（dist/next-shadcn/app/<page>/page.tsx）。
 * 复用 react.js 的页面主体（同一 JSX 数据结构），仅替换 import 路径与输出位置。
 * 组件 import 自 components/ui（= dist/next-shadcn/components，README 见该目录）。
 */
const D = require('./shared');
const react = require('./react');

const MOON_Q = D.icons.moon.replace(/"/g, '&quot;');
const SUN_Q = D.icons.sun.replace(/"/g, '&quot;');

/* 将 react.js 的输出适配为 next 版本：
 * 1. import ../components -> ../components/ui
 * 2. 'use client' 头
 */
function adapt(reactCode) {
  return reactCode
    .replace("// 由 scripts/gen-pages.js 生成；Pajamas-inspired (MIT)。\nimport * as React from 'react';", "// 由 scripts/gen-pages.js 生成；Pajamas-inspired (MIT)。\n'use client';\n\nimport * as React from 'react';")
    .replace("} from '../components';", "} from '../components/ui';");
}

function mergeRequest() {
  return adapt(react.mergeRequest());
}
function pipeline() {
  return adapt(react.pipeline());
}
function projectHome() {
  return adapt(react.projectHome());
}
function issues() {
  return adapt(react.issues());
}

module.exports = { mergeRequest, pipeline, projectHome, issues };
