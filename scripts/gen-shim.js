#!/usr/bin/env node
/**
 * gen-shim.js — 生成 Tailwind 工具类垫片 CSS（纯静态、零依赖、零 CDN）。
 *
 * 原理：扫描 dist/html/pages/*.html 与 dist/alpine/components/*.html 中
 * 用到的工具类，为每个类生成等价的纯 CSS 规则（值引用 var(--gl-*) 令牌），
 * 输出 dist/css/shim.css。页面/组件改为内联或引用 shim.css 后即可在
 * 离线、内网、file:// 环境完整渲染。
 *
 * 幂等可重跑：node scripts/gen-shim.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'dist', 'css', 'shim.css');

/* ---------- 令牌值读取（用于语义类取值） ---------- */
const cssText = fs.readFileSync(path.join(ROOT, 'dist', 'css', 'variables.css'), 'utf8');
const tokMap = {};
for (const line of cssText.split('\n')) {
  const m = line.match(/^\s*(--[a-z0-9-]+):\s*(.*?)\s*;\s*$/);
  if (m && !(m[1] in tokMap)) tokMap[m[1]] = m[2].trim();
}
function resolve(name, depth = 0) {
  const v = tokMap[name];
  if (v == null) return null;
  const m = v.match(/^var\((--[a-z0-9-]+)\)$/);
  if (m && depth < 6) return resolve(m[1], depth + 1);
  return v;
}
// 直接输出 var() 引用：让暗色模式（.gl-dark 覆盖同名变量）自动生效，
// 绝不内联解析成 hex（否则暗色失效）。fb 仅用于 variables.css 缺变量的兜底。
const tok = (n, fb) => (resolve(n) != null ? `var(${n})` : fb);

/* rem 尺寸表（Tailwind 默认刻度，值来自 --gl-spacing-scale-*） */
const spacing = {};
for (let i = 1; i <= 8; i++) {
  const v = parseFloat(resolve('--gl-spacing-scale-' + i));
  if (!Number.isNaN(v)) spacing[i] = v;
}

/* ---------- 工具类 → CSS 规则 ---------- */
function staticRules() {
  const r = [];
  // display / flex
  r.push(['flex', 'display:flex']);
  r.push(['inline-flex', 'display:inline-flex']);
  r.push(['grid', 'display:grid']);
  r.push(['hidden', 'display:none']);
  r.push(['block', 'display:block']);
  r.push(['flex-col', 'flex-direction:column']);
  r.push(['flex-row', 'flex-direction:row']);
  r.push(['flex-wrap', 'flex-wrap:wrap']);
  r.push(['flex-1', 'flex:1 1 0%']);
  r.push(['items-center', 'align-items:center']);
  r.push(['items-start', 'align-items:flex-start']);
  r.push(['items-end', 'align-items:flex-end']);
  r.push(['justify-center', 'justify-content:center']);
  r.push(['justify-between', 'justify-content:space-between']);
  r.push(['justify-end', 'justify-content:flex-end']);
  r.push(['content-center', 'align-content:center']);
  // position
  r.push(['relative', 'position:relative']);
  r.push(['absolute', 'position:absolute']);
  r.push(['fixed', 'position:fixed']);
  r.push(['sticky', 'position:sticky']);
  r.push(['top-0', 'top:0']);
  r.push(['bottom-0', 'bottom:0']);
  r.push(['left-0', 'left:0']);
  r.push(['right-0', 'right:0']);
  r.push(['inset-0', 'top:0;right:0;bottom:0;left:0']);
  r.push(['z-10', 'z-index:10']);
  r.push(['z-20', 'z-index:20']);
  r.push(['z-50', 'z-index:50']);
  // box
  r.push(['w-full', 'width:100%']);
  r.push(['h-full', 'height:100%']);
  r.push(['min-w-0', 'min-width:0']);
  r.push(['max-w-full', 'max-width:100%']);
  r.push(['overflow-hidden', 'overflow:hidden']);
  r.push(['overflow-auto', 'overflow:auto']);
  r.push(['overflow-y-auto', 'overflow-y:auto']);
  r.push(['overflow-x-auto', 'overflow-x:auto']);
  // spacing（静态小值）
  for (const [cls, v] of Object.entries({ '0': '0', 'px': '1px', '0\\.5': '2px', '1': spacing[1] || 2, '1\\.5': 6, '2': spacing[2] || 4, '2\\.5': 10, '3': spacing[3] || 8, '4': spacing[4] || 12, '5': spacing[5] || 16, '6': spacing[6] || 24, '8': spacing[8] || 40, '10': 40, '12': 48 })) {
    r.push([`gap-${cls}`, `gap:${v}px`]);
    r.push([`p-${cls}`, `padding:${v}px`]);
    r.push([`px-${cls}`, `padding-left:${v}px;padding-right:${v}px`]);
    r.push([`py-${cls}`, `padding-top:${v}px;padding-bottom:${v}px`]);
    r.push([`pt-${cls}`, `padding-top:${v}px`]);
    r.push([`pb-${cls}`, `padding-bottom:${v}px`]);
    r.push([`pl-${cls}`, `padding-left:${v}px`]);
    r.push([`pr-${cls}`, `padding-right:${v}px`]);
    r.push([`m-${cls}`, `margin:${v}px`]);
    r.push([`mx-${cls}`, `margin-left:${v}px;margin-right:${v}px`]);
    r.push([`my-${cls}`, `margin-top:${v}px;margin-bottom:${v}px`]);
    r.push([`mt-${cls}`, `margin-top:${v}px`]);
    r.push([`mb-${cls}`, `margin-bottom:${v}px`]);
    r.push([`ml-${cls}`, `margin-left:${v}px`]);
    r.push([`mr-${cls}`, `margin-right:${v}px`]);
  }
  r.push(['mx-auto', 'margin-left:auto;margin-right:auto']);
  // border / radius / shadow
  r.push(['border', `border:1px solid ${tok('--gl-border-color-default', '#dcdbd9')}`]);
  r.push(['border-0', 'border-width:0']);
  r.push(['border-t', `border-top:1px solid ${tok('--gl-border-color-default', '#dcdbd9')}`]);
  r.push(['border-b', `border-bottom:1px solid ${tok('--gl-border-color-default', '#dcdbd9')}`]);
  r.push(['border-l', `border-left:1px solid ${tok('--gl-border-color-default', '#dcdbd9')}`]);
  r.push(['border-r', `border-right:1px solid ${tok('--gl-border-color-default', '#dcdbd9')}`]);
  r.push(['rounded', `border-radius:${tok('--gl-border-radius-md', '0.25rem')}`]);
  r.push(['rounded-md', `border-radius:${tok('--gl-border-radius-md', '0.25rem')}`]);
  r.push(['rounded-lg', `border-radius:${tok('--gl-border-radius-lg', '0.5rem')}`]);
  r.push(['rounded-xl', `border-radius:${tok('--gl-border-radius-xl', '0.75rem')}`]);
  r.push(['rounded-full', `border-radius:${tok('--gl-border-radius-full', '9999px')}`]);
  r.push(['shadow-sm', `box-shadow:${tok('--gl-shadow-sm', '0 0 2px rgba(5,5,6,.16)')}`]);
  r.push(['shadow-md', `box-shadow:${tok('--gl-shadow-md', '0 4px 8px rgba(5,5,6,.16)')}`]);
  r.push(['shadow-lg', `box-shadow:${tok('--gl-shadow-lg', '0 8px 24px rgba(5,5,6,.16)')}`]);
  // typography
  r.push(['font-normal', `font-weight:${tok('--gl-font-weight-normal', 400)}`]);
  r.push(['font-bold', `font-weight:${tok('--gl-font-weight-bold', 600)}`]);
  r.push(['font-semibold', `font-weight:${tok('--gl-font-weight-semibold', 600)}`]);
  r.push(['text-xs', `font-size:${tok('--gl-font-size-xs', '0.6875rem')}`]);
  r.push(['text-sm', `font-size:${tok('--gl-font-size-sm', '0.8125rem')}`]);
  r.push(['text-base', `font-size:${tok('--gl-font-size-base', '0.875rem')}`]);
  r.push(['text-lg', `font-size:${tok('--gl-font-size-lg', '1rem')}`]);
  r.push(['truncate', 'overflow:hidden;text-overflow:ellipsis;white-space:nowrap']);
  r.push(['uppercase', 'text-transform:uppercase']);
  r.push(['italic', 'font-style:italic']);
  r.push(['text-center', 'text-align:center']);
  r.push(['text-right', 'text-align:right']);
  r.push(['leading-tight', 'line-height:1.25']);
  // cursor & misc
  r.push(['cursor-pointer', 'cursor:pointer']);
  r.push(['select-none', 'user-select:none']);
  r.push(['whitespace-nowrap', 'white-space:nowrap']);
  r.push(['transition', 'transition:all 150ms ease']);
  r.push(['sr-only', 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0']);
  r.push(['sr-only-focusable:not(:focus)', 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0']);
  // 补充: html 页面/alpine 组件实测用到的类
  r.push(['inline-block', 'display:inline-block']);
  r.push(['bg-transparent', 'background-color:transparent']);
  r.push(['border-transparent', 'border-color:transparent']);
  r.push(['border-collapse', 'border-collapse:collapse']);
  r.push(['cursor-not-allowed', 'cursor:not-allowed']);
  r.push(['pointer-events-none', 'pointer-events:none']);
  r.push(['pointer-events-auto', 'pointer-events:auto']);
  r.push(['no-underline', 'text-decoration:none']);
  r.push(['underline', 'text-decoration:underline']);
  r.push(['text-left', 'text-align:left']);
  r.push(['self-start', 'align-self:flex-start']);
  r.push(['ml-auto', 'margin-left:auto']);
  r.push(['list-none', 'list-style:none']);
  r.push(['grid-cols-2', 'grid-template-columns:repeat(2,minmax(0,1fr))']);
  r.push(['h-4', 'height:16px']);
  r.push(['w-4', 'width:16px']);
  r.push(['h-px', 'height:1px']);
  r.push(['opacity-0', 'opacity:0']);
  r.push(['transition-colors', 'transition:color 150ms ease,background-color 150ms ease,border-color 150ms ease']);
  r.push(['transition-opacity', 'transition:opacity 150ms ease']);
  r.push(['duration-200', 'transition-duration:200ms']);
  r.push(['max-w-2xl', 'max-width:42rem']);
  r.push(['max-w-3xl', 'max-width:48rem']);
  r.push(['max-w-4xl', 'max-width:56rem']);
  r.push(['sm\\:flex-row', null]); // media 变体单独处理
  r.push(['translate-y-[-8px]', 'transform:translateY(-8px)']);
  // 响应式/状态变体（静态）
  r.push(['sm\:flex-row@media(min-width:640px)', null]);
  return r;
}

/* 任意值类：text-[color:var(--x)] / bg-[var(--x)] / w-[..px] / max-w-[..px] 等 */
function arbitraryRule(cls) {
  // 变体前缀: hover: active: focus: disabled: sm: lg:
  let variant = '';
  let body = cls;
  const vm = /^([a-z-]+:)(.+)$/.exec(cls);
  if (vm) { variant = vm[1]; body = vm[2]; }
  const m = /^([a-z-]+)-\[(.+)\]$/.exec(body);
  if (!m) return null;
  const [, prop, raw] = m;
  let val = raw.replace(/_/g, ' ');
  let kind = '';
  const km = /^(color|length|width):/.exec(val);
  if (km) { kind = km[1]; val = val.slice(km[0].length); }
  // text-[length:...] → font-size; text-[color:...] → color; text-[...] 默认 color
  const okVal = /^var\(/.test(val) || /^-?[\d.]+(px|rem|%)$/.test(val) || /^#/.test(val) || /^calc\(/.test(val) || /^(inset|none)/.test(val);
  if (!okVal) return null;
  let textDecl = `color:${val}`;
  if (prop === 'text' && kind === 'length') textDecl = `font-size:${val}`;
  if (prop === 'text' && !kind && /^var\(--gl-font/.test(val)) textDecl = `font-size:${val}`;
  const map = {
    text: textDecl,
    bg: `background-color:${val}`,
    w: `width:${val}`,
    h: `height:${val}`,
    'max-w': `max-width:${val}`,
    'min-w': `min-width:${val}`,
    'min-h': `min-height:${val}`,
    border: `border-color:${val}`,
    shadow: `box-shadow:${val}`,
    rounded: `border-radius:${val}`,
    z: `z-index:${val}`,
    opacity: `opacity:${val}`,
    p: `padding:${val}`,
    px: `padding-left:${val};padding-right:${val}`,
    py: `padding-top:${val};padding-bottom:${val}`,
    pt: `padding-top:${val}`,
    pb: `padding-bottom:${val}`,
    mt: `margin-top:${val}`,
    mb: `margin-bottom:${val}`,
    my: `margin-top:${val};margin-bottom:${val}`,
    mx: `margin-left:${val};margin-right:${val}`,
    gap: `gap:${val}`,
    'top': `top:${val}`,
    'space-y': `'> * + *'.replace('x','')`, // 特殊处理
    placeholder: null, // 处理为 ::placeholder
  };
  if (prop === 'space-y') {
    const decl = `margin-top:${val}`;
    if (variant === 'hover:') return null;
    const sel = `${cls} > * + *`;
    void sel; void decl;
    return ['space-y-GENERIC', ''];
  }
  if (!(prop in map) || map[prop] === null) {
    if (prop === 'placeholder') return [cls + '::placeholder', `color:${val}`, variant];
    return null;
  }
  const decl = map[prop];
  if (variant === 'hover:') return [cls + ':hover', decl];
  if (variant === 'active:') return [cls + ':active', decl];
  if (variant === 'focus:') return [cls + ':focus', decl];
  if (variant === 'disabled:') return [cls + ':disabled', decl];
  if (variant === 'htmx-request:') return [cls + ':htmx-request', decl];
  if (variant === 'sm:') return [cls, decl, '@media(max-width:639px)'];
  if (variant === 'lg:') return [cls, decl, '@media(min-width:1024px)'];
  return [cls, decl];
}

/* ---------- 扫描目标文件，收集类名 ---------- */
const targets = [];
for (const dir of ['dist/html/pages', 'dist/alpine/components', 'dist/htmx/components']) {
  const p = path.join(ROOT, dir);
  if (!fs.existsSync(p)) continue;
  for (const f of fs.readdirSync(p)) if (f.endsWith('.html')) targets.push(path.join(p, f));
}

const used = new Set();
for (const f of targets) {
  const s = fs.readFileSync(f, 'utf8');
  // 去掉 <script> 块，避免把 JS 代码片段当类名
  const html = s.replace(/<script[\s\S]*?<\/script>/g, '');
  for (const m of html.matchAll(/class="([^"]*)"/g)) {
    for (const c of m[1].split(/\s+/)) {
      if (c && !c.startsWith('gl-') && !c.startsWith('pg-')) used.add(c);
    }
  }
  // :class 绑定属性只取字符串字面量里的类
  for (const m of html.matchAll(/:\s*class="([^"]*)"/g)) {
    for (const q of m[1].match(/'([^']*)'|"([^"]*)"/g) || []) {
      for (const c of q.replace(/['"]/g, '').split(/\s+/)) {
        if (c && !c.startsWith('gl-') && !c.startsWith('pg-')) used.add(c);
      }
    }
  }
}

/* ---------- 生成规则 ---------- */
const rules = new Map();
for (const [cls, decl] of staticRules()) {
  if (decl === null) continue; // media 变体走 MEDIA_RULES
  rules.set(cls, [cls, decl]);
}

const validCls = /^[a-zA-Z][a-zA-Z0-9:.\[\]()%#+_\-]*$/;
const ignored = new Set(['is-active', 'valid', 'invalid', 'spin', 'htmx-indicator', 'sortable', 'leaving', 'loading', 'checked', 'disabled', 'hover', 'active', 'focus']);
const unresolved = [];
for (const cls of [...used].sort()) {
  if (ignored.has(cls) || !validCls.test(cls)) continue;
  if (rules.has(cls)) continue;
  if (cls.includes('[')) {
    const ar = arbitraryRule(cls);
    if (ar) { rules.set(ar[0], ar.length === 3 ? ar : [ar[0], ar[1]]); continue; }
  }
  unresolved.push(cls);
}

/* media 变体静态类 */
const MEDIA_RULES = [
  ['sm:flex-row', 'flex-direction:row', '@media(min-width:640px)'],
  ['sm:flex-col', 'flex-direction:column', '@media(min-width:640px)'],
];
rules.set('disabled:cursor-not-allowed', ['disabled:cursor-not-allowed:disabled', 'cursor:not-allowed']);

const lines = [
  '/* Pajamas-inspired (MIT, tokens from @gitlab/ui) — utility shim CSS.',
   ' * Zero-dependency replacement for a Tailwind CDN: only the utility',
   ' * classes actually used by dist/html & dist/alpine & dist/htmx files.',
   ' * Values reference var(--gl-*) tokens; safe to inline or <link>.',
   ' */',
   '',
];
for (const mr of MEDIA_RULES) rules.set(mr[0], mr);
/* CSS 选择器转义：[ ] ( ) : # . / % , 等需要反斜杠 */
const cssEscape = (sel) =>
  sel.replace(/([\[\]():#.,/%'"~*>+$])/g, '\\$1');

for (const entry of [...rules.values()].sort((a,b)=>a[0]<b[0]?-1:1)) {
  const [sel, decl, media] = entry;
  if (sel === 'space-y-GENERIC') continue;
  const rule = `.${cssEscape(sel)}{${decl}}`;
  lines.push(media ? `${media}{${rule}}` : rule);
}
/* space-y-* 需要子选择器，单独生成 */
for (const cls of [...used].sort()) {
  const m = /^(hover:)?space-y-\[(.+)\]$/.exec(cls);
  if (m) {
    const val = m[2].replace(/_/g, ' ');
    lines.push(`.${cssEscape(cls)} > * + *{margin-top:${val}}`);
  }
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, lines.join('\n') + '\n');

const kb = (fs.statSync(OUT).size / 1024).toFixed(1);
console.log(`[gen-shim] 类总数 ${rules.size}，未解析 ${unresolved.length}`);
if (unresolved.length) console.log('[gen-shim] 未解析类:', unresolved.join(', '));
console.log(`[gen-shim] 写入 dist/css/shim.css (${kb} KB)`);
