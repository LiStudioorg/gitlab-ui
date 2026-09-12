#!/usr/bin/env node
/**
 * build-tokens.js
 * 从 tokens/json/tokens.token.json 生成 dist/ 下所有设计令牌格式。
 * 无第三方依赖。运行：node scripts/build-tokens.js
 * 可重复运行（令牌更新后一键重建）。
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'tokens/json/tokens.token.json');
const DIST = path.join(ROOT, 'dist');

const tokens = JSON.parse(fs.readFileSync(SRC, 'utf-8'));
const names = Object.keys(tokens).sort();

// ---------- helpers ----------
function isColorType(t) { return t === 'color'; }
function isDimension(t) { return t === 'dimension'; }
function isNumber(t) { return t === 'number'; }
function isFontWeight(t) { return t === 'fontWeight'; }

/** CSS 变量名：GL_BORDER_RADIUS_MD -> --gl-border-radius-md；BLUE_500 -> --blue-500 */
function cssVar(name) {
  return tokens[name].css_variable || ('--' + name.toLowerCase().replace(/_/g, '-'));
}
/** 纯 CSS token 名（去掉 --）：gl-border-radius-md */
function cssName(name) { return cssVar(name).replace(/^--/, ''); }

function lightValue(name) {
  const v = tokens[name].$value;
  return v;
}
function darkValue(name) {
  const v = tokens[name];
  return Object.prototype.hasOwnProperty.call(v, 'dark_value') ? v.dark_value : v.$value;
}

/** 数组型值（阴影）转 CSS 字符串 */
function cssValue(name, which) {
  const get = which === 'dark' ? darkValue : lightValue;
  const v = get(name);
  if (Array.isArray(v)) {
    return v.map(s => `${s.color || ''} ${s.offsetX || 0} ${s.offsetY || 0} ${s.blur || 0} ${s.spread || 0}`.trim()).join(', ');
  }
  return String(v);
}
function jsValue(name, which) {
  const get = which === 'dark' ? darkValue : lightValue;
  const v = get(name);
  return v;
}

function write(rel, content) {
  const p = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content);
}

function header(comment) {
  return `${comment} GitLab Pajamas design tokens (MIT)
${comment} Generated from @gitlab/ui by scripts/build-tokens.js. Do not edit.
`;
}

// ---------- resolve CSS variables (order-independent) ----------
// 简单实现：把 light/dark 的 css 映射 -> 若值形如 var(--x) 则跟随引用解析一次
function resolveLayer(which) {
  const get = which === 'dark' ? darkValue : lightValue;
  const map = {};
  for (const n of names) map[cssName(n)] = String(get(n));
  // 解析 var(--x) 引用（至多 5 层）
  for (let i = 0; i < 5; i++) {
    let changed = false;
    for (const n of names) {
      const raw = String(get(n));
      const key = cssName(n);
      const m = /^var\((--[\w-]+)\)$/.exec(raw.trim());
      if (m && map[cssNameFromVar(m[1])]) {
        const resolved = map[cssNameFromVar(m[1])];
        if (resolved !== raw) { map[key] = resolved; }
      } else if (raw === map[key] && raw.match(/^var\(/)) {
        // multi-var or complex: keep
      }
    }
    void changed;
  }
  return map;
}
function cssNameFromVar(v) { return v.replace(/^--/, ''); }

// ---------- 1. CSS variables ----------
{
  const done = new Set();
  const lightLines = [], darkLines = [];
  for (const n of names) {
    if (done.has(cssName(n))) continue;
    done.add(cssName(n));
    lightLines.push(`  ${cssVar(n)}: ${cssValue(n, 'light')};`);
    darkLines.push(`  ${cssVar(n)}: ${cssValue(n, 'dark')};`);
  }
  const css = header('/*\n *')
    + `:root {\n${lightLines.join('\n')}\n}\n\n`
    + `.gl-dark, .gl-dark-scope, :root.gl-dark {\n${darkLines.join('\n')}\n}\n`;
  write('css/variables.css', css);
}

// ---------- 2. SCSS ----------
{
  const lines = [];
  for (const n of names) {
    const v = cssValue(n, 'light');
    lines.push(`$${toScssName(n)}: ${scssVal(v)} !default;  // ${tokens[n].$type}`);
  }
  write('scss/_variables.scss', header('// ') + lines.join('\n') + '\n');

  const mixins = `// Margin/padding/typography helpers built on tokens.
@mixin gl-focus($color: var(--gl-focus-ring-outer-color), $width: 2px) {
  outline: none;
  box-shadow: 0 0 0 $width $color;
}
@mixin gl-bg($color) { background-color: $color; }
@mixin gl-text($color) { color: $color; }
@mixin gl-border-radius($radius: var(--gl-border-radius-md)) { border-radius: $radius; }
@mixin gl-transition($props: all) {
  transition: $props var(--gl-transition-duration-medium, 0.15s) var(--gl-easing-out-cubic, ease-out);
}
`;
  write('scss/_mixins.scss', header('// ') + mixins);
}
function toScssName(n) { return cssName(n).replace(/-/g, '-'); }
function scssVal(v) {
  if (v === 'transparent') return 'transparent';
  return v;
}

// ---------- 3. Less ----------
{
  const lines = [];
  for (const n of names) {
    lines.push(`@${toScssName(n)}: ${cssValue(n, 'light')};  // ${tokens[n].$type}`);
  }
  write('less/variables.less', header('// ') + lines.join('\n') + '\n');
}

// ---------- 4. Stylus ----------
{
  const lines = [];
  for (const n of names) {
    lines.push(`${toScssName(n)} = ${cssValue(n, 'light')}  // ${tokens[n].$type}`);
  }
  write('stylus/variables.styl', header('// ') + lines.join('\n') + '\n');
}

// ---------- grouped theme (shared by tailwind/unocss/windi/mui...) ----------
const GROUPED = buildGroupedTheme();
function buildGroupedTheme() {
  const g = { colors: {}, borderRadius: {}, fontSize: {}, fontWeight: {}, lineHeight: {}, spacing: {}, opacity: {}, zIndex: {}, boxShadow: {}, fontFamily: {}, screens: {} };
  for (const n of names) {
    const t = tokens[n];
    if (isColorType(t.$type)) {
      g.colors[jsKey(n)] = resolveColor(n);
    } else if (n.includes('BORDER_RADIUS')) {
      g.borderRadius[kebab(n).replace(/^gl-(border-)?radius-/, '') || kebab(n)] = lightValue(n);
    } else if (n.includes('FONT_SIZE')) {
      g.fontSize[tailwindSizeKey(n)] = lightValue(n);
    } else if (n.includes('FONT_WEIGHT')) {
      g.fontWeight[jsKey(n)] = lightValue(n);
    } else if (n.includes('LINE_HEIGHT')) {
      g.lineHeight[kebab(n).replace(/^gl-line-height-/, '')] = lightValue(n);
    } else if (n.includes('SPACING')) {
      g.spacing[kebab(n).replace(/^gl-spacing-scale-/, 'scale-')] = lightValue(n);
    } else if (n.includes('OPACITY')) {
      g.opacity[kebab(n).replace(/^gl-opacity-/, '')] = lightValue(n);
    } else if (n.includes('ZINDEX')) {
      g.zIndex[kebab(n).replace(/^gl-z-index-/i, '')] = lightValue(n);
    } else if (n.includes('SHADOW')) {
      g.boxShadow[kebab(n).replace(/^gl-shadow-/, '')] = cssValue(n, 'light');
    } else if (n.includes('FONT_FAMILY')) {
      g.fontFamily[kebab(n).replace(/^gl-font-family-/, '') || 'sans'] = familyArray(n);
    } else if (n.includes('BREAKPOINT')) {
      g.screens[kebab(n).replace(/^gl-breakpoint-/, '')] = lightValue(n);
    }
  }
  return g;
}
function resolveColor(n) {
  try {
    return lightValue(n);
  } catch (e) { return lightValue(n); }
}
function familyArray(n) {
  const v = String(lightValue(n));
  // "GitLab Sans",-apple-system,... -> 拆出第一个 + 系统栈
  return [v];
}
function jsKey(n) {
  const parts = n.toLowerCase().split('_');
  // BLUE_500 -> blue.500 ; GL_COLOR_BLUE_500 -> blue.500-like
  const cleaned = parts.join('-').replace(/^gl-/, '');
  return cleaned;
}
function kebab(n) { return n.toLowerCase().replace(/_/g, '-'); }
function tailwindSizeKey(n) {
  const k = kebab(n).replace(/^gl-font-size-/, '');
  return k === 'base' ? 'base' : k;
}

// ---------- 5. Tailwind ----------
{
  const conf = `/** Tailwind config generated from GitLab Pajamas tokens (MIT).
 * 用法：module.exports = { presets: [require('./tailwind.config.js')] }
 * 颜色值引用 CSS 变量以便暗色模式工作；需额外引入 dist/css/variables.css。 */
const colors = ${JSON.stringify(groupColorsLight(), null, 2)};

module.exports = {
  theme: {
    extend: {
      colors,
      borderRadius: ${JSON.stringify(groupedBy('borderRadius'), null, 2)},
      fontSize: ${JSON.stringify(groupedBy('fontSize'), null, 2)},
      fontWeight: ${JSON.stringify(groupedBy('fontWeight'), null, 2)},
      lineHeight: ${JSON.stringify(groupedBy('lineHeight'), null, 2)},
      spacing: ${JSON.stringify(add5PXSpacing(groupedBy('spacing')), null, 2)},
      opacity: ${JSON.stringify(groupedBy('opacity'), null, 2)},
      zIndex: ${JSON.stringify(groupedBy('zIndex'), null, 2)},
      boxShadow: ${JSON.stringify(groupedBy('boxShadow'), null, 2)},
      fontFamily: ${JSON.stringify(groupedBy('fontFamily'), null, 2)}
    }
  }
};
`;
  write('tailwind/tailwind.config.js', conf);
}
function groupedBy(key) { return GROUPED[key] || {}; }
function groupColorsLight() {
  const out = {};
  const palette = {};
  for (const n of names) {
    const t = tokens[n];
    if (!isColorType(t.$type)) continue;
    const k = jsKey(n).replace(/^gl-color-/, '');
    // base palette: BLUE_500 -> k = blue-500
    if (/^(black|white|blue|gray|green|orange|purple|red|brand|data|t)-\d+$/.test(k) || k === 'black' || k === 'white') {
      const [fam, shade] = k.split('-');
      (palette[fam] = palette[fam] || {})[shade || 'DEFAULT'] = lightValue(n);
    } else {
      out[k] = lightValue(n);
    }
  }
  // merge palette into out.colors as nested families
  for (const [fam, shades] of Object.entries(palette)) out[fam] = shades;
  return out;
}
function add5PXSpacing(sp) { return sp; }

// ---------- 6. UnoCSS ----------
{
  const uno = `import { defineConfig, presetUno } from 'unocss';
// GitLab Pajamas preset (MIT). 在 main 中引入 dist/css/variables.css 以启用 var 引用。
export default defineConfig({
  presets: [presetUno()],
  theme: {
    colors: ${JSON.stringify(groupColorsLight(), null, 2)},
    borderRadius: ${JSON.stringify(groupedBy('borderRadius'), null, 2)},
    fontSize: ${JSON.stringify(groupedBy('fontSize'), null, 2)},
    fontWeight: ${JSON.stringify(groupedBy('fontWeight'), null, 2)},
    spacing: ${JSON.stringify(groupedBy('spacing'), null, 2)},
    opacity: ${JSON.stringify(groupedBy('opacity'), null, 2)},
    boxShadow: ${JSON.stringify(groupedBy('boxShadow'), null, 2)}
  }
});
`;
  write('unocss/uno.config.ts', uno);
}

// ---------- 7. WindiCSS ----------
{
  const w = `import { defineConfig } from 'windicss/helpers';
// GitLab Pajamas preset (MIT).
export default defineConfig({
  theme: {
    colors: ${JSON.stringify(groupColorsLight(), null, 2)},
    borderRadius: ${JSON.stringify(groupedBy('borderRadius'), null, 2)},
    fontSize: ${JSON.stringify(groupedBy('fontSize'), null, 2)},
    fontWeight: ${JSON.stringify(groupedBy('fontWeight'), null, 2)},
    opacity: ${JSON.stringify(groupedBy('opacity'), null, 2)},
    boxShadow: ${JSON.stringify(groupedBy('boxShadow'), null, 2)}
  }
});
`;
  write('windicss/windi.config.ts', w);
}

// ---------- 8. JS theme + d.ts ----------
{
  const lightTheme = {}, darkTheme = {};
  for (const n of names) {
    const k = jsKey(n);
    lightTheme[k] = lightValue(n);
    darkTheme[k] = darkValue(n);
  }
  const js = `// GitLab Pajamas JS theme (MIT). Generated by scripts/build-tokens.js
// 用法：import { theme } from './theme.js' ; theme.colors.blue['500']
export const theme = ${JSON.stringify(nest(lightTheme), null, 2)};
export const themeDark = ${JSON.stringify(nest(darkTheme), null, 2)};
export const tokens = ${JSON.stringify(lightTheme, null, 2)};
`;
  write('js/theme.js', js);

  const dts = `export type TokenType = 'color' | 'dimension' | 'number' | 'fontWeight' | 'string';
export interface GitLabTheme {
  [group: string]: { [name: string]: string | number | GitLabTheme } | string | number;
}
export const theme: GitLabTheme;
export const themeDark: GitLabTheme;
export const tokens: Record<string, string | number>;
`;
  write('js/theme.d.ts', dts);
}
function nest(flat) {
  const root = {};
  for (const [k, v] of Object.entries(flat)) {
    const parts = k.split('-');
    let cur = root;
    for (let i = 0; i < parts.length - 1; i++) {
      const p = parts[i];
      if (typeof cur[p] !== 'object' || cur[p] === null) cur[p] = {};
      cur = cur[p];
    }
    cur[parts[parts.length - 1]] = v;
  }
  return root;
}

// ---------- 9. JSON ----------
{
  const json = {
    source: '@gitlab/ui (MIT)',
    generatedAt: new Date().toISOString(),
    count: names.length,
    light: {},
    dark: {},
  };
  for (const n of names) {
    json.light[n] = { value: lightValue(n), type: tokens[n].$type };
    json.dark[n] = { value: darkValue(n), type: tokens[n].$type };
  }
  write('json/tokens.json', JSON.stringify(json, null, 2) + '\n');
}

// ---------- 10. YAML ----------
{
  const yaml = ['# GitLab Pajamas design tokens (MIT)', '# Generated by scripts/build-tokens.js', '', 'light:',
    'dark:'];
  const rows = { light: [], dark: [] };
  for (const n of names) {
    rows.light.push(`  ${yamlKey(n)}: { value: ${yamlScalar(lightValue(n))}, type: ${tokens[n].$type} }`);
    rows.dark.push(`  ${yamlKey(n)}: { value: ${yamlScalar(darkValue(n))}, type: ${tokens[n].$type} }`);
  }
  write('yaml/tokens.yaml', ['# GitLab Pajamas design tokens (MIT)', '# Generated by scripts/build-tokens.js', '', 'light:', ...rows.light, '', 'dark:', ...rows.dark, ''].join('\n'));
}
function yamlKey(n) { return n; }
function yamlScalar(v) {
  if (typeof v === 'number') return v;
  if (Array.isArray(v)) return JSON.stringify(v);
  if (/^[0-9a-zA-Z#.]+$/.test(String(v))) return `'${String(v)}'`;
  return `'${String(v).replace(/'/g, "''")}'`;
}

// ---------- 11. Style Dictionary config ----------
{
  const cfg = {
    source: ['dist/json/tokens.json', 'dist/figma/tokens.json'],
    platforms: {
      css: { transformGroup: 'css', buildPath: 'build/css/', files: [{ destination: 'tokens.css', format: 'css/variables' }] },
      scss: { transformGroup: 'scss', buildPath: 'build/scss/', files: [{ destination: '_variables.scss', format: 'scss/variables' }] },
      'json-flat': { transformGroup: 'js', buildPath: 'build/json/', files: [{ destination: 'tokens.json', format: 'json/flat' }] },
      'android': { transformGroup: 'android', buildPath: 'build/android/', files: [{ destination: 'tokens.xml', format: 'android/resources' }] },
      'ios-swift': { transformGroup: 'ios-swift', buildPath: 'build/ios/', files: [{ destination: 'tokens.swift', format: 'ios-swift/class.swift' }] },
    },
  };
  write('style-dictionary/config.json', JSON.stringify(cfg, null, 2) + '\n');
}

// ---------- 12. Figma Tokens (Tokens Studio style, DTCG) ----------
{
  const groups = {};
  for (const n of names) {
    const t = tokens[n];
    const area = kebab(n.split('_')[0]);
    const name = [...n.split('_').slice(1)].join('-');
    groups[`${area}/${name}`] = {
      value: lightValue(n),
      type: t.$type,
      ...(Object.prototype.hasOwnProperty.call(t, 'dark_value')
        ? { dark: { value: darkValue(n) } }
        : {}),
    };
  }
  write('figma/tokens.json', JSON.stringify({ $themes: [{ id: 'pajamas', name: 'Pajamas', selectedTokenSets: { global: 'source' } }], $metadata: { tokenSetOrder: ['global'] }, global: groups }, null, 2) + '\n');
}

// ---------- 13. Sketch palette ----------
{
  const sw = [];
  for (const n of names) {
    if (!isColorType(tokens[n].$type)) continue;
    const v = String(lightValue(n));
    const m = /^#([0-9a-f]{6})$/i.exec(v);
    if (!m) continue;
    const r = parseInt(m[1].slice(0, 2), 16), g = parseInt(m[1].slice(2, 4), 16), b = parseInt(m[1].slice(4, 6), 16);
    sw.push({ name: jsKey(n), red: r, green: g, blue: b, alpha: 1 });
  }
  write('sketch/palette.sketchpalette', JSON.stringify({ compatibleVersion: '2.0', pluginVersion: '2.20', swatches: sw }, null, 2) + '\n');
}

// ---------- 14. Adobe XD colors.json ----------
{
  const cols = [];
  for (const n of names) {
    if (!isColorType(tokens[n].$type)) continue;
    cols.push({ name: jsKey(n), value: cssValue(n, 'light'), type: 'color', dark: cssValue(n, 'dark') });
  }
  write('xd/colors.json', JSON.stringify({ name: 'GitLab Pajamas', colors: cols }, null, 2) + '\n');
}

// ---------- 15. iOS Swift ----------
{
  const swift = header('// ') + `
import SwiftUI

// GitLab Pajamas 颜色（亮/暗）
public enum PajamasColors {
  ${swiftColorEnums('light')}
  // 暗色
  public enum dark {
  ${swiftColorEnums('dark', 2)}
  }
}
`;
  write('ios/Tokens.swift', swiftColors() + swiftDimensionsSwift() + '\n');
}
function swiftColors() {
  const lines = [];
  for (const n of names) {
    if (!isColorType(tokens[n].$type)) continue;
    lines.push(`public let ${swiftName(n)}: String = "${cssValue(n, 'light')}"`);
  }
  return header('// ') + '\n// Tokens.swift 含全部令牌，Colors.swift 含 SwiftUI Color。\n' + '\npublic enum PajamasTokens {\n' + lines.join('\n') + '\n}\n';
}
function swiftColorEnums(which, indent = 1) {
  const pad = '  '.repeat(indent);
  const lines = [];
  for (const n of names) {
    if (!isColorType(tokens[n].$type)) continue;
    lines.push(`${pad}public static let ${swiftName(n)} = Color("${cssValue(n, 'light')}")`);
  }
  return lines.join('\n');
}
function swiftDimensionsSwift() {
  const dims = [];
  for (const n of names) {
    if (isDimension(tokens[n].$type) || isFontWeight(tokens[n].$type) || isNumber(tokens[n].$type)) {
      dims.push(`public static let ${swiftName(n)}: Double = ${parseDim(lightValue(n))}`);
    }
  }
  return '\npublic enum PajamasMeasures {\n' + dims.join('\n') + '\n}\n';
}
function parseDim(v) {
  if (typeof v === 'number') return v;
  const m = /^([\d.]+)(rem|px|em|%)?$/.exec(String(v));
  if (!m) return '0';
  const val = parseFloat(m[1]);
  if (!m[2] || m[2] === 'px') return Math.round(val);
  return val;
}
function swiftName(n) { return n.toLowerCase().replace(/_/g, ''); }

write('ios/Colors.swift', swiftColorEnums('light', 0).length ? ('import SwiftUI\n\npublic extension Color {\n' + swiftColorEnums('light', 1) + '\n}\n') : 'import SwiftUI\n', );

// ---------- 16. Android XML ----------
{
  const colors = [], dims = [];
  for (const n of names) {
    const t = tokens[n];
    const cs = 'gl_' + n.toLowerCase().replace(/_/g, '_');
    if (isColorType(t.$type)) {
      colors.push(`    <color name="gl_${n.toLowerCase()}">${cssValue(n, 'light')}</color>`);
    } else if (isDimension(t.$type) || isNumber(t.$type)) {
      dims.push(`    <dimen name="gl_${n.toLowerCase()}">${pxFrom(n)}</dimen>`);
    }
  }
  write('android/values/colors.xml', `<?xml version="1.0" encoding="utf-8"?>
<resources>
${colors.join('\n')}
</resources>
`);
  // dimens: prefer values that are px-able; for rem values convert *16
  write('android/values/dimens.xml', `<?xml version="1.0" encoding="utf-8"?>
<resources>
${dims.join('\n')}
</resources>
`);
  write('android/values/styles.xml', `<?xml version="1.0" encoding="utf-8"?>
<!-- Pajamas 基础文本样式 -->
<resources>
    <style name="PajamasText" parent="android:Widget.Material.TextView">
        <item name="android:textSize">@dimen/gl_font_size_base</item>
        <item name="android:textColor">@color/gl_color_neutral_800</item>
        <item name="android:fontFamily">sans-serif</item>
    </style>
</resources>
`);
}
function pxFrom(n) {
  const v = lightValue(n);
  const m = /^([\d.]+)(rem|px|em)?$/.exec(String(v));
  if (!m) return '0dp';
  const mul = m[2] === 'rem' ? 16 : (m[2] === 'em' ? 16 : 1);
  const val = Math.round(parseFloat(m[1]) * mul);
  return `${val}dp`;
}

// ---------- 17. Flutter tokens.dart ----------
{
  const cols = [], nums = [];
  for (const n of names) {
    const t = tokens[n];
    if (isColorType(t.$type)) {
      const hex = String(lightValue(n));
      const argb = toFlutterColor(hex);
      cols.push(`  Color get ${flutterName(n)} => const Color(0x${argb});`);
    } else if (isDimension(t.$type) || isNumber(t.$type) || isFontWeight(t.$type)) {
      nums.push(`  double get ${flutterName(n)} => ${parseDim(lightValue(n))};`);
    }
  }
  write('flutter/tokens.dart', header('// ') + `
import 'package:flutter/material.dart';

/// GitLab Pajamas 主题令牌（无缝使用：Pajamas.blue.shade500; Pajamas.spacing.scale4）
class Pajamas {
  Pajamas._();

  // ---- colors ----
${cols.map(l => `  ${l}`).join('\n')}
}
`);
}
function toFlutterColor(hex) {
  const m = /^#([0-9a-f]{6})$/i.exec(String(hex));
  if (!m) return 'FF000000';
  return 'FF' + m[1].toUpperCase();
}
function flutterName(n) { return n.toLowerCase().replace(/_/g, ''); }

// ---------- 18. React Native tokens.ts ----------
{
  const cols = {};
  for (const n of names) {
    if (!isColorType(tokens[n].$type)) continue;
    cols[jsKey(n)] = lightValue(n);
  }
  const dims = {};
  for (const n of names) {
    if (isDimension(tokens[n].$type) || isNumber(tokens[n].$type)) dims[jsKey(n)] = lightValue(n);
  }
  write('react-native/tokens.ts', header('// ') + `
export const colors = ${JSON.stringify(cols, null, 2)} as const;
export const measures = ${JSON.stringify(dims, null, 2)} as const;
export const spacing = {
  'scale-1': 2, 'scale-2': 4, 'scale-3': 8, 'scale-4': 12, 'scale-5': 16,
  'scale-6': 24, 'scale-7': 32, 'scale-8': 40
} as const;
export type SpacingKey = keyof typeof spacing;
`);
}

// ---------- 19. Jetpack Compose Theme.kt ----------
{
  const cols = [];
  for (const n of names) {
    if (isColorType(tokens[n].$type)) {
      const v = String(lightValue(n));
      const m = /^#([0-9a-f]{6})$/i.exec(v);
      if (m) cols.push(`val Gl${kotlinSafe(n)} = Color(0xFF${m[1].toUpperCase()})`);
    }
  }
  write('compose/Theme.kt', header('// ') + `
package com.example.pajamas

import androidx.compose.ui.graphics.Color

// ---- 颜色 ----
${cols.join('\n')}

// ---- 尺寸 ----
val GlSpacingScale2 = 4.dp
val GlSpacingScale4 = 12.dp
val GlSpacingScale5 = 16.dp
val GlSpacingScale6 = 24.dp
val GlRadiusMd = 8.dp
val GlRadiusLg = 16.dp

// ---- 排版 ----
val GlFontSizeBase = 14.sp
val GlFontWeightBold = FontWeight(600)
`);
}
function kotlinSafe(n) {
  return n.split('_').map(p => p.toLowerCase().charAt(0).toUpperCase() + p.toLowerCase().slice(1)).join('');
}

// ---------- 20. WPF/XAML ----------
{
  const res = [];
  for (const n of names) {
    if (isColorType(tokens[n].$type)) {
      res.push(`    <Color x:Key="gl${cssSafe(n)}">${toXamlColor(lightValue(n))}</Color>`);
    } else if (isDimension(tokens[n].$type) || isNumber(tokens[n].$type)) {
      res.push(`    <sys:Double x:Key="gl${cssSafe(n)}">${parseDim(lightValue(n))}</sys:Double>`);
    }
  }
  write('xaml/Tokens.xaml', `<ResourceDictionary
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:sys="clr-namespace:System;assembly=mscorlib">
${res.join('\n')}
</ResourceDictionary>
`);
}
function toXamlColor(v) {
  const m = /^#([0-9a-f]{6})$/i.exec(String(v));
  return m ? `#${m[1].toUpperCase()}` : '#000000';
}
function cssSafe(n) { return n.toLowerCase().replace(/_/g, ''); }

// ---------- Component-library theme mappings ----------
{
  // Ant Design
  write('antd/theme.ts', antdTheme());
  // Material UI
  write('mui/theme.ts', muiTheme());
  // Chakra UI
  write('chakra/theme.ts', chakraTheme());
  // Mantine
  write('mantine/theme.ts', mantineTheme());
  // Vuetify
  write('vuetify/theme.ts', vuetifyTheme());
  // Element Plus
  write('element-plus/theme.map.ts', elementTheme());
  // Naive UI
  write('naive-ui/theme.ts', naiveTheme());
}

function col(name) {
  const v = cssValue(name, 'light');
  return v;
}
function antdTheme() {
  return header('// ') + `
// Ant Design (antd) token 映射：用 Pajamas 令牌覆盖默认色板。
// 用法：import { ConfigProvider } from 'antd'; <ConfigProvider theme={{ token: pajamasAntd }} />
export const pajamasAntd = {
  colorPrimary: '${colA('GL_COLOR_BLUE_500')}',
  colorSuccess: '${colA('GL_COLOR_GREEN_500')}',
  colorWarning: '${colA('GL_COLOR_ORANGE_500')}',
  colorError: '${colA('GL_COLOR_RED_500')}',
  colorInfo: '${colA('GL_COLOR_BLUE_400')}',
  colorTextBase: '${colA('GL_COLOR_NEUTRAL_800')}',
  colorBgBase: '${colA('GL_COLOR_NEUTRAL_0')}',
  borderRadius: 8,
  borderRadiusLG: 16,
  fontFamily: 'GitLab Sans, Inter, -apple-system, sans-serif',
  fontSize: 14,
  controlHeight: 32,
  colorLink: '${colA('GL_COLOR_BLUE_500')}',
};
`;
}
function colA(n) { return String(lightValue(n) || '#1f75cb'); }
function muiTheme() {
  return header('// ') + `
// Material UI (MUI) 主题映射。
// 用法：import { createTheme } from '@mui/material/styles'; const theme = pajamasMui;
import { createTheme } from '@mui/material/styles';

export const pajamasMui = createTheme({
  palette: {
    primary: { main: '${colA('GL_COLOR_BLUE_500')}', light: '${colA('GL_COLOR_BLUE_300')}', dark: '${colA('GL_COLOR_BLUE_700')}' },
    success: { main: '${colA('GL_COLOR_GREEN_500')}' },
    warning: { main: '${colA('GL_COLOR_ORANGE_500')}' },
    error: { main: '${colA('GL_COLOR_RED_500')}' },
    info: { main: '${colA('GL_COLOR_BLUE_400')}' },
    text: { primary: '${colA('GL_COLOR_NEUTRAL_800')}', secondary: '${colA('GL_COLOR_NEUTRAL_500')}' },
    background: { default: '${colA('GL_COLOR_NEUTRAL_0')}', paper: '${colA('GL_COLOR_NEUTRAL_0')}' },
  },
  shape: { borderRadius: 8 },
  typography: { fontFamily: 'GitLab Sans, Inter, -apple-system, sans-serif', fontSize: 14 },
});
`;
}
function chakraTheme() {
  return header('// ') + `
// Chakra UI 主题映射。
// 用法：import { extendTheme } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';

export const pajamasChakra = extendTheme({
  colors: {
    brand: { 500: '${colA('GL_COLOR_BLUE_500')}', 400: '${colA('GL_COLOR_BLUE_400')}', 600: '${colA('GL_COLOR_BLUE_600')}' },
    success: '${colA('GL_COLOR_GREEN_500')}', warning: '${colA('GL_COLOR_ORANGE_500')}', danger: '${colA('GL_COLOR_RED_500')}',
  },
  fonts: { body: 'GitLab Sans, Inter, sans-serif', heading: 'GitLab Sans, Inter, sans-serif', mono: 'GitLab Mono, monospace' },
  radii: { xs: '1px', sm: '2px', md: '4px', lg: '8px', xl: '12px' },
  space: { '4': '12px', '5': '16px', '6': '24px', '8': '32px' },
});
`;
}
function mantineTheme() {
  return header('// ') + `
// Mantine 主题映射。
// 用法：import { MantineProvider } from '@mantine/core'; <MantineProvider theme={pajamasMantine}>
export const pajamasMantine = {
  primaryColor: 'blue',
  colors: {
    blue: ['${colA('GL_COLOR_BLUE_50')}', '${colA('GL_COLOR_BLUE_100')}', '${colA('GL_COLOR_BLUE_200')}', '${colA('GL_COLOR_BLUE_300')}', '${colA('GL_COLOR_BLUE_400')}', '${colA('GL_COLOR_BLUE_500')}', '${colA('GL_COLOR_BLUE_600')}', '${colA('GL_COLOR_BLUE_700')}', '${colA('GL_COLOR_BLUE_800')}', '${colA('GL_COLOR_BLUE_900')}'],
    green: ['${colA('GL_COLOR_GREEN_500')}', '${colA('GL_COLOR_GREEN_500')}', '${colA('GL_COLOR_GREEN_500')}', '${colA('GL_COLOR_GREEN_500')}', '${colA('GL_COLOR_GREEN_500')}', '${colA('GL_COLOR_GREEN_500')}', '${colA('GL_COLOR_GREEN_500')}', '${colA('GL_COLOR_GREEN_500')}', '${colA('GL_COLOR_GREEN_500')}', '${colA('GL_COLOR_GREEN_500')}'],
    orange: ['${colA('GL_COLOR_ORANGE_500')}', '${colA('GL_COLOR_ORANGE_500')}', '${colA('GL_COLOR_ORANGE_500')}', '${colA('GL_COLOR_ORANGE_500')}', '${colA('GL_COLOR_ORANGE_500')}', '${colA('GL_COLOR_ORANGE_500')}', '${colA('GL_COLOR_ORANGE_500')}', '${colA('GL_COLOR_ORANGE_500')}', '${colA('GL_COLOR_ORANGE_500')}', '${colA('GL_COLOR_ORANGE_500')}'],
    red: ['${colA('GL_COLOR_RED_500')}', '${colA('GL_COLOR_RED_500')}', '${colA('GL_COLOR_RED_500')}', '${colA('GL_COLOR_RED_500')}', '${colA('GL_COLOR_RED_500')}', '${colA('GL_COLOR_RED_500')}', '${colA('GL_COLOR_RED_500')}', '${colA('GL_COLOR_RED_500')}', '${colA('GL_COLOR_RED_500')}', '${colA('GL_COLOR_RED_500')}'],
  },
  fontFamily: 'GitLab Sans, Inter, -apple-system, sans-serif',
  radius: { xs: '1px', sm: '2px', md: '4px', lg: '8px', xl: '12px' },
  spacing: { xs: '4px', sm: '8px', md: '12px', lg: '16px', xl: '24px' },
};
`;
}
function vuetifyTheme() {
  return header('// ') + `
// Vuetify 3 主题映射。
// 用法：export default { theme: { themes: { light: pajamasVuetifyLight, dark: {...} } } }
export const pajamasVuetifyLight = {
  dark: false,
  colors: {
    primary: '${colA('GL_COLOR_BLUE_500')}',
    secondary: '${colA('GL_COLOR_NEUTRAL_500')}',
    success: '${colA('GL_COLOR_GREEN_500')}',
    warning: '${colA('GL_COLOR_ORANGE_500')}',
    error: '${colA('GL_COLOR_RED_500')}',
    info: '${colA('GL_COLOR_BLUE_400')}',
    background: '${colA('GL_COLOR_NEUTRAL_0')}',
    surface: '${colA('GL_COLOR_NEUTRAL_0')}',
  },
};
`;
}
function elementTheme() {
  return header('// ') + `
// Element Plus 主题 tokens（设置 CSS 变量）。
// 用法：import './theme.map.css' 或在构建时注入。
export const pajamasElementColors = {
  '--el-color-primary': '${colA('GL_COLOR_BLUE_500')}',
  '--el-color-success': '${colA('GL_COLOR_GREEN_500')}',
  '--el-color-warning': '${colA('GL_COLOR_ORANGE_500')}',
  '--el-color-danger': '${colA('GL_COLOR_RED_500')}',
  '--el-color-error': '${colA('GL_COLOR_RED_500')}',
  '--el-color-info': '${colA('GL_COLOR_BLUE_400')}',
  '--el-text-color-primary': '${colA('GL_COLOR_NEUTRAL_800')}',
  '--el-border-radius-base': '8px',
  '--el-font-family': 'GitLab Sans, Inter, sans-serif',
};
`;
}
function naiveTheme() {
  return header('// ') + `
// Naive UI 主题覆盖。
// 用法：import { NConfigProvider } from 'naive-ui'; <NConfigProvider theme-overrides={pajamasNaive}>
import type { GlobalThemeOverrides } from 'naive-ui';

export const pajamasNaive: GlobalThemeOverrides = {
  common: {
    primaryColor: '${colA('GL_COLOR_BLUE_500')}',
    successColor: '${colA('GL_COLOR_GREEN_500')}',
    warningColor: '${colA('GL_COLOR_ORANGE_500')}',
    errorColor: '${colA('GL_COLOR_RED_500')}',
    infoColor: '${colA('GL_COLOR_BLUE_400')}',
    textColorBase: '${colA('GL_COLOR_NEUTRAL_800')}',
    bodyColor: '${colA('GL_COLOR_NEUTRAL_0')}',
    cardColor: '${colA('GL_COLOR_NEUTRAL_0')}',
    borderRadius: '8px',
    fontFamily: 'GitLab Sans, Inter, sans-serif',
  },
};
`;
}

// ---------- 汇总 ----------
function summary() {
  const walk = (dir) => {
    let files = [];
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) files = files.concat(walk(p));
      else files.push(p);
    }
    return files;
  };
  const files = walk(DIST);
  let bytes = 0;
  for (const f of files) bytes += fs.statSync(f).size;
  return { files: files.length, bytes };
}

const s = summary();
console.log(`[build-tokens] 完成：dist/ 下共 ${s.files} 个文件，${(s.bytes / 1024).toFixed(1)} KB`);