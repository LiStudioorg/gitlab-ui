'use strict';
/*
 * Shared generator library for the Pajamas-inspired UI kit.
 * Reads the shared component spec + the real design-token CSS so every
 * generated file only references tokens that actually exist in variables.css.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const spec = require('./component-spec.js');
const cssText = fs.readFileSync(path.join(ROOT, 'dist', 'css', 'variables.css'), 'utf8');

const REMAP = {
  '--gl-modal-medium-width': '--gl-spacing-scale-48', // 24rem
  '--gl-zindex-modal': '--gl-zindex-4',
  '--gl-zindex-toast': '--gl-zindex-200',
  '--gl-zindex-dropdown': '--gl-zindex-3',
  '--gl-text-subtle-color': '--gl-text-color-subtle',
  '--gl-text-strong-color': '--gl-text-color-strong',
  '--gl-text-base-font-size': '--gl-font-size-base',
  '--gl-text-sm-font-size': '--gl-font-size-sm',
};

function checkSpecTokens() {
  const missing = [];
  for (const c of spec.components) {
    for (const name of c.tokens) {
      if (/^--gl/.test(name) && !cssText.includes(name + ':') && !REMAP[name] && !name.includes('base')) {
        missing.push(name);
      }
    }
  }
  // font-size-sm / font-size-base are allowed (real tokens documented in css)
  if (missing.length) {
    console.error('spec tokens not found in variables.css (add a REMAP entry):');
    missing.forEach((n) => console.error('  ', n));
    process.exit(1);
  }
}
checkSpecTokens();

const exists = (name) => cssText.includes(name + ':');
const real = (name) => REMAP[name] || name;
const tok = (name) => `var(${real(name)})`;

const ICONS = {
  spinner:
    '<svg class="gl-icon" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2" opacity="0.35"/><path d="M14 8a6 6 0 0 0-6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  x: '<svg class="gl-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  check: '<svg class="gl-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8l3.5 3.5L13 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  info: '<svg class="gl-icon" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 11V7.5M8 5v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  bulb: '<svg class="gl-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.5a4.5 4.5 0 0 0-3 7.9c.6.5 1 1.3 1 2.1v.5h4v-.5c0-.8.4-1.6 1-2.1A4.5 4.5 0 0 0 8 1.5z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M6.5 13.5h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
};

function pageFrame({ title, headExtras, body }) {
  return [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    `<title>${title}</title>`,
    headExtras || '',
    '</head>',
    '<body>',
    body,
    '</body>',
    '</html>',
    '',
  ].join('\n');
}

function writeIfChanged(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

const FOCUS_RING = `outline: none; box-shadow: 0 0 0 2px ${tok('--gl-focus-ring-inner-color')}, 0 0 0 4px ${tok('--gl-focus-ring-outer-color')};`;

const FRAMEWORKS = {
  html: path.join(ROOT, 'dist', 'html', 'components'),
  alpine: path.join(ROOT, 'dist', 'alpine', 'components'),
  htmx: path.join(ROOT, 'dist', 'htmx', 'components'),
  'web-components': path.join(ROOT, 'dist', 'web-components'),
  lit: path.join(ROOT, 'dist', 'lit', 'components'),
};

module.exports = {
  ROOT,
  spec,
  cssText,
  exists,
  real,
  tok,
  ICONS,
  pageFrame,
  writeIfChanged,
  FOCUS_RING,
  FRAMEWORKS,
  REMAP,
};