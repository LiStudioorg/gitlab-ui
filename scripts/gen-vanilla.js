'use strict';
/*
 * gen-vanilla.js — regenerates dist/html/components/*.html (native HTML + CSS).
 * Pajamas-inspired (MIT). Repeatable: run `node scripts/gen-vanilla.js`.
 */
const path = require('path');
const { spec, tok, ICONS, pageFrame, writeIfChanged, FRAMEWORKS, FOCUS_RING } = require('./gen-lib.js');

const OUT = FRAMEWORKS.html;

const BASE_CSS = `/* Pajamas-inspired base styles (MIT) - layout / typography / focus ring, design tokens only */
@import url('../../css/variables.css');

*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: ${tok('--gl-font-size-base')};
  line-height: ${tok('--gl-line-height-24')};
  color: ${tok('--gl-text-color-default')};
  background-color: ${tok('--gl-background-color-default')};
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4 {
  color: ${tok('--gl-text-color-heading')};
  font-weight: ${tok('--gl-font-weight-heading')};
  line-height: ${tok('--gl-line-height-heading')};
  margin: 0;
}

a { color: ${tok('--gl-text-color-link')}; }

:focus-visible { outline: none; ${FOCUS_RING} }

.gl-page { max-width: 960px; margin: 0 auto; padding: ${tok('--gl-spacing-scale-6')}; }
.gl-section { margin-bottom: ${tok('--gl-spacing-scale-9')}; }
.gl-title { font-size: ${tok('--gl-heading-scale-500-font-size')}; margin-bottom: ${tok('--gl-spacing-scale-5')}; }
.gl-sub { color: ${tok('--gl-text-color-subtle')}; margin: ${tok('--gl-spacing-scale-2')} 0 ${tok('--gl-spacing-scale-4')}; }
.gl-row { display: flex; flex-wrap: wrap; gap: ${tok('--gl-spacing-scale-3')}; align-items: center; }
.gl-col { display: flex; flex-direction: column; gap: ${tok('--gl-spacing-scale-3')}; }
.gl-label { font-size: ${tok('--gl-font-size-sm')}; color: ${tok('--gl-text-color-subtle')}; font-weight: ${tok('--gl-font-weight-bold')}; }
.gl-card { border: 1px solid ${tok('--gl-border-color-default')}; border-radius: ${tok('--gl-border-radius-lg')}; padding: ${tok('--gl-spacing-scale-4')}; }

.gl-icon { width: 16px; height: 16px; flex-shrink: 0; }

.gl-spinner { animation: gl-spin 0.8s linear infinite; }
@keyframes gl-spin { to { transform: rotate(360deg); } }
`;

function headExtras() {
  return (
    '<link rel="stylesheet" href="../../css/variables.css">\n' +
    '    <link rel="stylesheet" href="base.css">'
  );
}

function page(title, style, body) {
  const extra = [headExtras(), style ? `\n    <style>\n${style}</style>` : ''].join('');
  return pageFrame({ title, headExtras: extra, body });
}

/* ------------------------------------------------------------------ button */
function buttonCSS() {
  const css = [];
  css.push(`.gl-button {
  display: inline-flex; align-items: center; justify-content: center;
  gap: ${tok('--gl-spacing-scale-2')};
  border: 1px solid transparent;
  border-radius: ${tok('--gl-button-border-radius')};
  font-size: ${tok('--gl-font-size-base')};
  font-weight: ${tok('--gl-font-weight-bold')};
  line-height: ${tok('--gl-line-height-20')};
  padding: ${tok('--gl-spacing-scale-3')};
  cursor: pointer; white-space: nowrap; text-decoration: none;
  transition: box-shadow 150ms ease, background-color 150ms ease, color 150ms ease, border-color 150ms ease;
}
.gl-button:focus-visible { outline: none; ${FOCUS_RING} }
.gl-button--size-small { padding: ${tok('--gl-spacing-scale-1')} ${tok('--gl-spacing-scale-2')}; font-size: ${tok('--gl-font-size-sm')}; }
.gl-button--block { display: flex; width: 100%; }
.gl-button .gl-button-text { line-height: 1; }`);
  for (const variant of ['default', 'confirm', 'danger']) {
    for (const category of ['primary', 'secondary', 'tertiary']) {
      const sel = `.gl-button--${category}--${variant}`;
      css.push(`${sel} {
  background-color: ${tok(`--gl-button-${variant}-${category}-background-color-default`)};
  color: ${tok(`--gl-button-${variant}-${category}-foreground-color-default`)};
  border-color: ${tok(`--gl-button-${variant}-${category}-border-color-default`)};
}`);
      css.push(`${sel}:hover {
  background-color: ${tok(`--gl-button-${variant}-${category}-background-color-hover`)};
  color: ${tok(`--gl-button-${variant}-${category}-foreground-color-hover`)};
  border-color: ${tok(`--gl-button-${variant}-${category}-border-color-hover`)};
}`);
      css.push(`${sel}:active {
  background-color: ${tok(`--gl-button-${variant}-${category}-background-color-active`)};
  color: ${tok(`--gl-button-${variant}-${category}-foreground-color-active`)};
  border-color: ${tok(`--gl-button-${variant}-${category}-border-color-active`)};
}`);
    }
  }
  css.push(`.gl-button--link {
  background-color: transparent; border-color: transparent;
  color: ${tok('--gl-button-link-text-color-default')};
  border-radius: ${tok('--gl-button-link-border-radius')};
  text-decoration: underline;
}
.gl-button--link:hover { color: ${tok('--gl-button-link-text-color-hover')}; }
.gl-button--link:active { color: ${tok('--gl-button-link-text-color-active')}; }
.gl-button:disabled, .gl-button[aria-disabled='true'] {
  cursor: not-allowed;
  background-color: ${tok('--gl-action-disabled-background-color')};
  color: ${tok('--gl-action-disabled-foreground-color')};
  border-color: ${tok('--gl-action-disabled-border-color')};
}`);
  return css.join('\n');
}

const buttonBody = `  <main class="gl-page">
    <h1 class="gl-title">Button</h1>
    <p class="gl-sub">category=primary|secondary|tertiary &times; variant=default|confirm|danger + link; size small|medium; states include hover, active, focus-visible, disabled, loading.</p>

    <section class="gl-section">
      <h2>Primary</h2>
      <div class="gl-row">
        <button class="gl-button gl-button--primary--default">Default</button>
        <button class="gl-button gl-button--primary--confirm">Confirm</button>
        <button class="gl-button gl-button--primary--danger">Danger</button>
      </div>
    </section>

    <section class="gl-section">
      <h2>Secondary &amp; tertiary</h2>
      <div class="gl-row">
        <button class="gl-button gl-button--secondary--default">Secondary</button>
        <button class="gl-button gl-button--secondary--confirm">Confirm</button>
        <button class="gl-button gl-button--secondary--danger">Danger</button>
        <button class="gl-button gl-button--tertiary--default">Tertiary</button>
        <button class="gl-button gl-button--tertiary--confirm">Confirm</button>
        <button class="gl-button gl-button--tertiary--danger">Danger</button>
        <a class="gl-button gl-button--link" href="#demo">Link button</a>
      </div>
    </section>

    <section class="gl-section">
      <h2>Sizes</h2>
      <div class="gl-row">
        <button class="gl-button gl-button--primary--confirm gl-button--size-small">Small</button>
        <button class="gl-button gl-button--primary--confirm">Medium</button>
        <button class="gl-button gl-button--primary--default gl-button--size-small">Small default</button>
      </div>
    </section>

    <section class="gl-section">
      <h2>Disabled &amp; loading</h2>
      <div class="gl-row">
        <button class="gl-button gl-button--primary--confirm" disabled>Disabled</button>
        <button class="gl-button gl-button--secondary--default" disabled>Disabled</button>
        <button class="gl-button gl-button--primary--confirm" aria-disabled="true" aria-busy="true">
          <span class="gl-icon gl-spinner">${ICONS.spinner}</span>
          <span class="gl-button-text">Loading&hellip;</span>
        </button>
        <button class="gl-button gl-button--secondary--default" aria-disabled="true" aria-busy="true">
          <span class="gl-icon gl-spinner">${ICONS.spinner}</span>
        </button>
      </div>
    </section>

    <section class="gl-section">
      <h2>Icon + block</h2>
      <div class="gl-col">
        <button class="gl-button gl-button--primary--confirm">${ICONS.check}<span class="gl-button-text">Save changes</span></button>
        <button class="gl-button gl-button--primary--danger gl-button--block">Delete</button>
      </div>
    </section>

    <section class="gl-section">
      <h2>Interactive loading</h2>
      <div class="gl-row">
        <button id="btn-demo-load" class="gl-button gl-button--primary--confirm">Run job</button>
      </div>
    </section>

    <script>
      (function () {
        var b = document.getElementById('btn-demo-load');
        var idle = b.innerHTML;
        b.addEventListener('click', function () {
          b.disabled = true;
          b.setAttribute('aria-busy', 'true');
          b.innerHTML = '<span class="gl-icon gl-spinner">${ICONS.spinner}</span><span class="gl-button-text">Running&hellip;</span>';
          setTimeout(function () {
            b.disabled = false;
            b.removeAttribute('aria-busy');
            b.innerHTML = idle;
          }, 1800);
        });
      })();
    </script>
  </main>`;

/* ------------------------------------------------------------------ input */
const inputCSS = `.gl-form-group { margin-bottom: ${tok('--gl-spacing-scale-5')}; }
.gl-label { display: block; margin-bottom: ${tok('--gl-spacing-scale-2')}; }
.gl-input {
  width: 100%;
  padding: ${tok('--gl-spacing-scale-3')};
  font-size: ${tok('--gl-font-size-base')};
  line-height: ${tok('--gl-line-height-20')};
  color: ${tok('--gl-text-color-default')};
  background-color: ${tok('--gl-control-background-color-default')};
  border: 1px solid ${tok('--gl-control-border-color-default')};
  border-radius: ${tok('--gl-control-border-radius')};
  transition: border-color 150ms ease, box-shadow 150ms ease;
}
.gl-input::placeholder { color: ${tok('--gl-control-placeholder-color')}; }
.gl-input:hover { border-color: ${tok('--gl-control-border-color-hover')}; }
.gl-input:focus { outline: none; border-color: ${tok('--gl-control-border-color-focus')}; ${FOCUS_RING} }
.gl-input:disabled { background-color: ${tok('--gl-control-background-color-disabled')}; cursor: not-allowed; color: ${tok('--gl-text-color-disabled')}; }
.gl-input[readonly] { background-color: ${tok('--gl-control-background-color-readonly')}; }
.gl-input--invalid, .gl-input.is-invalid { border-color: ${tok('--gl-control-border-color-error')}; }
.gl-input--valid, .gl-input.is-valid { box-shadow: inset 0 0 0 1px ${tok('--gl-control-text-color-valid')}; }
.gl-input--width-xs { max-width: ${tok('--gl-spacing-scale-31')}; }
.gl-input--width-sm { max-width: ${tok('--gl-spacing-scale-37')}; }
.gl-input--width-md { max-width: ${tok('--gl-spacing-scale-48')}; }
.gl-input--width-lg { max-width: ${tok('--gl-spacing-scale-62')}; }
.gl-input-feedback { font-size: ${tok('--gl-font-size-sm')}; margin-top: ${tok('--gl-spacing-scale-2')}; }
.gl-input-feedback--error { color: ${tok('--gl-control-text-color-error')}; }
.gl-input-feedback--valid { color: ${tok('--gl-control-text-color-valid')}; }`;

const inputBody = `  <main class="gl-page">
    <h1 class="gl-title">Input</h1>
    <p class="gl-sub">Types text/email/number/password/search/url/tel/date/time; states default, hover, focus, valid, invalid, disabled, readonly.</p>

    <section class="gl-section">
      <div class="gl-form-group">
        <label class="gl-label" for="inp-default">Default</label>
        <input id="inp-default" class="gl-input" type="text" placeholder="Placeholder text">
      </div>
      <div class="gl-form-group">
        <label class="gl-label" for="inp-email">Email (with width lg)</label>
        <input id="inp-email" class="gl-input gl-input--width-lg" type="email" value="dev@example.co">
      </div>
      <div class="gl-form-group">
        <label class="gl-label" for="inp-invalid">Invalid</label>
        <input id="inp-invalid" class="gl-input gl-input--invalid" type="text" aria-invalid="true" value="x">
        <p class="gl-input-feedback gl-input-feedback--error">A project slug must be longer than 2 characters.</p>
      </div>
      <div class="gl-form-group">
        <label class="gl-label" for="inp-valid">Valid</label>
        <input id="inp-valid" class="gl-input gl-input--valid" type="text" value="my-project">
        <p class="gl-input-feedback gl-input-feedback--valid">This name is available.</p>
      </div>
      <div class="gl-row">
        <div class="gl-form-group">
          <label class="gl-label" for="inp-disabled">Disabled</label>
          <input id="inp-disabled" class="gl-input" type="text" disabled value="disabled">
        </div>
        <div class="gl-form-group">
          <label class="gl-label" for="inp-readonly">Readonly</label>
          <input id="inp-readonly" class="gl-input" type="text" readonly value="read only">
        </div>
      </div>
      <div class="gl-row">
        <div class="gl-form-group"><label class="gl-label">Widths</label>
          <input class="gl-input gl-input--width-xs" type="text" placeholder="xs">
          <input class="gl-input gl-input--width-sm" type="text" placeholder="sm">
          <input class="gl-input gl-input--width-md" type="text" placeholder="md">
          <input class="gl-input gl-input--width-lg" type="text" placeholder="lg">
        </div>
      </div>
      <div class="gl-form-group">
        <label class="gl-label" for="inp-live">Live validation</label>
        <input id="inp-live" class="gl-input gl-input--width-md" type="text" placeholder="min 3 characters">
        <p id="inp-live-fb" class="gl-input-feedback"></p>
      </div>
    </section>

    <section class="gl-section">
      <div class="gl-row">
        <input class="gl-input gl-input--width-md" type="search" placeholder="Search&hellip;">
        <input class="gl-input gl-input--width-sm" type="password" placeholder="Password">
        <input class="gl-input gl-input--width-sm" type="date">
      </div>
    </section>

    <script>
      (function () {
        var el = document.getElementById('inp-live');
        var fb = document.getElementById('inp-live-fb');
        el.addEventListener('blur', function () {
          var valid = el.value.trim().length >= 3;
          el.classList.toggle('gl-input--invalid', !valid);
          el.classList.toggle('gl-input--valid', valid);
          fb.className = 'gl-input-feedback ' + (valid ? 'gl-input-feedback--valid' : 'gl-input-feedback--error');
          fb.textContent = valid ? 'Looks good.' : 'Value must be at least 3 characters.';
        });
      })();
    </script>
  </main>`;

/* ------------------------------------------------------------------ modal */
const modalCSS = `.gl-modal-backdrop {
  position: fixed; inset: 0;
  background-color: ${tok('--gl-color-alpha-dark-40')};
  z-index: ${tok('--gl-zindex-4')};
  display: flex; align-items: flex-start; justify-content: center;
  padding: ${tok('--gl-spacing-scale-9')} ${tok('--gl-spacing-scale-4')};
}
.gl-modal {
  background-color: ${tok('--gl-background-color-default')};
  border-radius: ${tok('--gl-modal-border-radius')};
  box-shadow: ${tok('--gl-shadow-lg')};
  width: 100%;
  display: flex; flex-direction: column;
  max-height: calc(100vh - ${tok('--gl-spacing-scale-9')});
}
.gl-modal--sm { max-width: ${tok('--gl-spacing-scale-31')}; }
.gl-modal--md { max-width: ${tok('--gl-spacing-scale-48')}; }
.gl-modal--lg { max-width: ${tok('--gl-spacing-scale-80')}; }
.gl-modal-header {
  display: flex; align-items: center; justify-content: space-between;
  gap: ${tok('--gl-spacing-scale-3')};
  padding: ${tok('--gl-spacing-scale-4')} ${tok('--gl-spacing-scale-5')} ${tok('--gl-spacing-scale-3')};
}
.gl-modal-title { font-size: ${tok('--gl-heading-scale-500-font-size')}; font-weight: ${tok('--gl-heading-scale-500-font-weight')}; }
.gl-modal-close {
  background: none; border: none; cursor: pointer;
  color: ${tok('--gl-text-color-subtle')};
  padding: ${tok('--gl-spacing-scale-2')}; border-radius: ${tok('--gl-border-radius-default')};
}
.gl-modal-close:hover { background-color: ${tok('--gl-color-alpha-dark-4')}; }
.gl-modal-body { padding: ${tok('--gl-spacing-scale-3')} ${tok('--gl-spacing-scale-5')} ${tok('--gl-spacing-scale-5')}; overflow: auto; }
.gl-modal-footer {
  display: flex; gap: ${tok('--gl-spacing-scale-3')};
  padding: ${tok('--gl-spacing-scale-4')} ${tok('--gl-spacing-scale-5')} ${tok('--gl-spacing-scale-5')};
  background-color: ${tok('--gl-background-color-default')};
}
@media (max-width: 576px) { .gl-modal-footer { flex-direction: column; } .gl-modal-footer .gl-button { justify-content: center; } }
.gl-modal-backdrop.is-hidden { display: none; }`;

const modalBody = `  <main class="gl-page">
    <h1 class="gl-title">Modal</h1>
    <p class="gl-sub">Sizes md|sm|lg; states closed (is-hidden), opened; close via Esc, backdrop click or &times;. Vanilla JS toggle, no framework.</p>

    <section class="gl-section">
      <h2>Launch dialogs</h2>
      <div class="gl-row">
        <button id="m-open-md" class="gl-button gl-button--primary--danger">Delete project (md)</button>
        <button id="m-open-sm" class="gl-button gl-button--secondary--default">Show small</button>
        <button id="m-open-lg" class="gl-button gl-button--secondary--default">Show large</button>
      </div>
    </section>

    <div class="gl-modal-backdrop is-hidden" data-modal="md" aria-hidden="true">
      <div class="gl-modal gl-modal--md" role="dialog" aria-modal="true" aria-label="Delete confirmation">
        <div class="gl-modal-header">
          <h3 class="gl-modal-title">Delete project</h3>
          <button class="gl-modal-close" aria-label="Close">${ICONS.x}</button>
        </div>
        <div class="gl-modal-body">
          You are about to permanently remove <strong>my-project</strong>. This action cannot be undone.
        </div>
        <div class="gl-modal-footer">
          <button class="gl-button gl-button--primary--danger">Delete</button>
          <button class="gl-button gl-button--default--secondary">Cancel</button>
        </div>
      </div>
    </div>

    <div class="gl-modal-backdrop is-hidden" data-modal="sm" aria-hidden="true">
      <div class="gl-modal gl-modal--sm" role="dialog" aria-modal="true" aria-label="Small">
        <div class="gl-modal-header"><h3 class="gl-modal-title">Small</h3><button class="gl-modal-close" aria-label="Close">${ICONS.x}</button></div>
        <div class="gl-modal-body">Compact modal content.</div>
      </div>
    </div>

    <div class="gl-modal-backdrop is-hidden" data-modal="lg" aria-hidden="true">
      <div class="gl-modal gl-modal--lg" role="dialog" aria-modal="true" aria-label="Large">
        <div class="gl-modal-header"><h3 class="gl-modal-title">Large</h3><button class="gl-modal-close" aria-label="Close">${ICONS.x}</button></div>
        <div class="gl-modal-body">Large modal content with a wider body region.</div>
        <div class="gl-modal-footer">
          <button class="gl-button gl-button--primary--confirm">Primary</button>
          <button class="gl-button gl-button--default--secondary">Secondary</button>
        </div>
      </div>
    </div>

    <script>
      (function () {
        var backdrops = document.querySelectorAll('.gl-modal-backdrop');
        var open = function (key) {
          backdrops.forEach(function (b) {
            var show = b.getAttribute('data-modal') === key;
            b.classList.toggle('is-hidden', !show);
            b.setAttribute('aria-hidden', show ? 'false' : 'true');
          });
          document.addEventListener('keydown', onKey);
        };
        var close = function () {
          backdrops.forEach(function (b) {
            b.classList.add('is-hidden');
            b.setAttribute('aria-hidden', 'true');
          });
          document.removeEventListener('keydown', onKey);
        };
        var onKey = function (e) { if (e.key === 'Escape') close(); };
        document.getElementById('m-open-md').addEventListener('click', function () { open('md'); });
        document.getElementById('m-open-sm').addEventListener('click', function () { open('sm'); });
        document.getElementById('m-open-lg').addEventListener('click', function () { open('lg'); });
        backdrops.forEach(function (b) {
          b.querySelector('.gl-modal-close').addEventListener('click', close);
          b.addEventListener('click', function (e) { if (e.target === b) close(); });
        });
      })();
    </script>
  </main>`;

/* ------------------------------------------------------------------ table */
const tableCSS = `.gl-table-scroll { overflow: auto; max-height: 360px; }
.gl-table {
  width: 100%; border-collapse: collapse;
  font-size: ${tok('--gl-font-size-base')};
  color: ${tok('--gl-text-color-default')};
}
.gl-table th {
  text-align: left;
  font-weight: ${tok('--gl-font-weight-bold')};
  color: ${tok('--gl-text-color-subtle')};
  padding: ${tok('--gl-spacing-scale-3')};
  box-shadow: inset 0 -1px 0 ${tok('--gl-border-color-default')};
  position: sticky; top: 0;
  background-color: ${tok('--gl-background-color-default')};
}
.gl-table td { padding: ${tok('--gl-spacing-scale-3')}; box-shadow: inset 0 -1px 0 ${tok('--gl-color-alpha-dark-8')}; }
.gl-table tbody tr:hover td { background-color: ${tok('--gl-table-row-background-color-hover')}; }
.gl-table th.sortable { cursor: pointer; user-select: none; }
.gl-table th.sortable:hover { color: ${tok('--gl-text-color-strong')}; }
.gl-table-sort-icon { color: ${tok('--gl-table-sorting-icon-color')}; margin-left: ${tok('--gl-spacing-scale-2')}; }
.gl-table-busy { opacity: ${tok('--gl-opacity-7')}; position: relative; }
.gl-table-busy::after {
  content: ''; position: absolute; inset: 0;
  background-color: ${tok('--gl-color-alpha-dark-4')};
}
.gl-table-busy-overlay {
  display: inline-flex; align-items: center; gap: ${tok('--gl-spacing-scale-2')};
  color: ${tok('--gl-text-color-strong')};
  margin-bottom: ${tok('--gl-spacing-scale-3')};
}
.gl-table-empty {
  padding: ${tok('--gl-spacing-scale-9')} ${tok('--gl-spacing-scale-5')};
  text-align: center; color: ${tok('--gl-text-color-subtle')};
}`;

const tableBody = `  <main class="gl-page">
    <h1 class="gl-title">Table</h1>
    <p class="gl-sub">Sortable headers (&uarr;/&darr; arrows), busy loading state, row hover highlight, empty state.</p>

    <section class="gl-section">
      <div class="gl-table-busy-overlay">${ICONS.spinner} Loading pipelines&hellip;</div>
      <div class="gl-table-scroll">
        <table class="gl-table gl-table--sticky-header gl-table-busy" aria-busy="true">
          <thead>
            <tr>
              <th class="sortable" aria-sort="ascending">Name <span class="gl-table-sort-icon">&uarr;</span></th>
              <th>Status</th>
              <th class="sortable">Duration <span class="gl-table-sort-icon">&darr;</span></th>
              <th class="sortable">Updated</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>main</td><td>passed</td><td>12m 04s</td><td>just now</td></tr>
            <tr><td>feature/ui</td><td>running</td><td>8m 51s</td><td>2 min ago</td></tr>
            <tr><td>hotfix/auth</td><td>failed</td><td>3m 02s</td><td>18 min ago</td></tr>
            <tr><td>release/1.2</td><td>passed</td><td>15m 22s</td><td>1 hour ago</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="gl-section">
      <h2>Sorted + hover (click a header to sort)</h2>
      <table id="tbl-sort" class="gl-table">
        <thead><tr><th class="sortable" aria-sort="ascending">Name <span class="gl-table-sort-icon">&uarr;</span></th><th class="sortable">Updated</th></tr></thead>
        <tbody>
          <tr><td>alice</td><td>2026-09-01</td></tr>
          <tr><td>bob</td><td>2026-09-05</td></tr>
          <tr><td>carol</td><td>2026-08-30</td></tr>
        </tbody>
      </table>
    </section>

    <section class="gl-section">
      <h2>Empty state</h2>
      <table class="gl-table">
        <thead><tr><th>Name</th><th>Status</th></tr></thead>
        <tbody><tr><td class="gl-table-empty" colspan="2">No records found.</td></tr></tbody>
      </table>
    </section>

    <script>
      (function () {
        var t = document.getElementById('tbl-sort');
        var ths = Array.prototype.slice.call(t.querySelectorAll('th.sortable'));
        ths.forEach(function (th) {
          th.addEventListener('click', function () {
            var idx = ths.indexOf(th);
            var desc = th.getAttribute('aria-sort') === 'ascending';
            ths.forEach(function (x) {
              x.removeAttribute('aria-sort');
              var old = x.querySelector('.gl-table-sort-icon');
              if (old) old.remove();
            });
            var rows = Array.prototype.slice.call(t.tBodies[0].rows);
            rows.sort(function (a, b) {
              var av = a.cells[idx].textContent.trim();
              var bv = b.cells[idx].textContent.trim();
              return av < bv ? (desc ? 1 : -1) : av > bv ? (desc ? -1 : 1) : 0;
            });
            var frag = document.createDocumentFragment();
            rows.forEach(function (r) { frag.appendChild(r); });
            t.tBodies[0].appendChild(frag);
            th.setAttribute('aria-sort', desc ? 'descending' : 'ascending');
            var icon = document.createElement('span');
            icon.className = 'gl-table-sort-icon';
            icon.textContent = desc ? '\u2193' : '\u2191';
            th.appendChild(icon);
          });
        });
      })();
    </script>
  </main>`;

/* ------------------------------------------------------------------ tabs */
const tabsCSS = `.gl-tabs-wrapper { border-bottom: 1px solid ${tok('--gl-border-color-default')}; }
.gl-tabs { display: flex; gap: ${tok('--gl-spacing-scale-2')}; overflow-x: auto; }
.gl-tab-item {
  position: relative;
  display: inline-flex; align-items: center; gap: ${tok('--gl-spacing-scale-2')};
  padding: ${tok('--gl-spacing-scale-4')} ${tok('--gl-spacing-scale-4')};
  font-size: ${tok('--gl-font-size-base')};
  color: ${tok('--gl-text-color-subtle')};
  cursor: pointer; background: none; border: none; white-space: nowrap;
}
.gl-tab-item::after {
  content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 2px;
  background-color: transparent; border-radius: 1px;
}
.gl-tab-item:hover { color: ${tok('--gl-text-color-strong')}; }
.gl-tab-item:hover::after { background-color: ${tok('--gl-border-color-strong')}; }
.gl-tab-item--active { color: ${tok('--gl-text-color-strong')}; font-weight: ${tok('--gl-font-weight-bold')}; }
.gl-tab-item--active::after { background-color: ${tok('--gl-tab-selected-indicator-color-default')}; }
.gl-tab-item:disabled { color: ${tok('--gl-action-disabled-foreground-color')}; cursor: not-allowed; }
.gl-tab-content { padding: ${tok('--gl-spacing-scale-4')} 0; }
.gl-tab-pane[hidden] { display: none; }
.gl-badge {
  display: inline-flex; align-items: center; gap: ${tok('--gl-spacing-scale-1')};
  padding: 0 ${tok('--gl-spacing-scale-2')};
  border-radius: ${tok('--gl-border-radius-full')};
  font-size: ${tok('--gl-font-size-sm')};
  font-weight: ${tok('--gl-font-weight-bold')};
  line-height: ${tok('--gl-line-height-16')};
  background-color: ${tok('--gl-badge-neutral-background-color-default')};
  color: ${tok('--gl-badge-neutral-text-color-default')};
}`;

const tabsBody = `  <main class="gl-page">
    <h1 class="gl-title">Tabs</h1>
    <p class="gl-sub">Active item indicator bar, count badges, disabled item, content panes.</p>

    <section class="gl-section">
      <div class="gl-tabs-wrapper">
        <div class="gl-tabs" role="tablist">
          <button class="gl-tab-item gl-tab-item--active" role="tab" aria-selected="true">Overview <span class="gl-badge gl-badge--neutral">3</span></button>
          <button class="gl-tab-item" role="tab" aria-selected="false">Commits <span class="gl-badge gl-badge--neutral">48</span></button>
          <button class="gl-tab-item" role="tab" aria-selected="false">Pipelines <span class="gl-badge gl-badge--neutral">12</span></button>
          <button class="gl-tab-item" role="tab" aria-selected="false" disabled>Locked</button>
        </div>
      </div>
      <div class="gl-tab-content">
        <div class="gl-tab-pane" role="tabpanel">Overview content is active.</div>
        <div class="gl-tab-pane" role="tabpanel" hidden>Commits pane (hidden).</div>
        <div class="gl-tab-pane" role="tabpanel" hidden>Pipelines pane (hidden).</div>
        <div class="gl-tab-pane" role="tabpanel" hidden>Locked pane cannot be activated.</div>
      </div>
    </section>

    <script>
      (function () {
        var items = document.querySelectorAll('.gl-tab-item');
        var panes = document.querySelectorAll('.gl-tab-pane');
        items.forEach(function (tab, i) {
          tab.addEventListener('click', function () {
            if (tab.disabled) return;
            items.forEach(function (x) {
              x.classList.remove('gl-tab-item--active');
              x.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('gl-tab-item--active');
            tab.setAttribute('aria-selected', 'true');
            panes.forEach(function (p, j) { p.hidden = j !== i; });
          });
        });
      })();
    </script>
  </main>`;

/* ------------------------------------------------------------------ badge */
const badgeCSS = `.gl-badge {
  display: inline-flex; align-items: center; gap: ${tok('--gl-spacing-scale-2')};
  padding: ${tok('--gl-spacing-scale-1')} ${tok('--gl-spacing-scale-2')};
  border-radius: ${tok('--gl-border-radius-full')};
  font-size: ${tok('--gl-font-size-sm')};
  font-weight: ${tok('--gl-font-weight-bold')};
  line-height: ${tok('--gl-line-height-16')};
  text-decoration: none; border: 1px solid transparent;
}
.gl-badge--neutral { background-color: ${tok('--gl-badge-neutral-background-color-default')}; color: ${tok('--gl-badge-neutral-text-color-default')}; }
.gl-badge--info { background-color: ${tok('--gl-badge-info-background-color-default')}; color: ${tok('--gl-badge-info-text-color-default')}; }
.gl-badge--success { background-color: ${tok('--gl-badge-success-background-color-default')}; color: ${tok('--gl-badge-success-text-color-default')}; }
.gl-badge--warning { background-color: ${tok('--gl-badge-warning-background-color-default')}; color: ${tok('--gl-badge-warning-text-color-default')}; }
.gl-badge--danger { background-color: ${tok('--gl-badge-danger-background-color-default')}; color: ${tok('--gl-badge-danger-text-color-default')}; }
.gl-badge--tier { background-color: ${tok('--gl-badge-tier-background-color-default')}; color: ${tok('--gl-badge-tier-text-color-default')}; }
a.gl-badge:hover {
  box-shadow: inset 0 0 0 1px ${tok('--gl-border-color-strong')};
  text-decoration: none;
}
.gl-badge:disabled, .gl-badge[aria-disabled='true'] { opacity: var(${tok('--gl-opacity-7').replace('var(', '')}); pointer-events: none; }`;

const badgeBody = `  <main class="gl-page">
    <h1 class="gl-title">Badge</h1>
    <p class="gl-sub">Pill capsules; variants neutral/info/success/warning/danger/tier; optional icon and link.</p>

    <section class="gl-section">
      <h2>Variants</h2>
      <div class="gl-row">
        <span class="gl-badge gl-badge--neutral">neutral</span>
        <span class="gl-badge gl-badge--info">info</span>
        <span class="gl-badge gl-badge--success">success</span>
        <span class="gl-badge gl-badge--warning">warning</span>
        <span class="gl-badge gl-badge--danger">danger</span>
        <span class="gl-badge gl-badge--tier">Premium</span>
      </div>
    </section>

    <section class="gl-section">
      <h2>With icon</h2>
      <div class="gl-row">
        <span class="gl-badge gl-badge--success">${ICONS.check} Passed</span>
        <span class="gl-badge gl-badge--danger">${ICONS.error} Failed</span>
        <span class="gl-badge gl-badge--info">${ICONS.info} Info</span>
      </div>
    </section>

    <section class="gl-section">
      <h2>Link &amp; disabled</h2>
      <div class="gl-row">
        <a class="gl-badge gl-badge--success" href="#demo">enabled link</a>
        <span class="gl-badge gl-badge--neutral" aria-disabled="true">disabled state</span>
      </div>
    </section>
  </main>`;

/* ------------------------------------------------------------------ toast */
const toastCSS = `.gl-toaster {
  position: fixed; bottom: ${tok('--gl-spacing-scale-6')}; left: ${tok('--gl-spacing-scale-6')};
  z-index: ${tok('--gl-zindex-200')};
  display: flex; flex-direction: column; gap: ${tok('--gl-spacing-scale-3')};
  max-width: calc(100vw - ${tok('--gl-spacing-scale-12')});
}
.gl-toast {
  display: flex; align-items: center; gap: ${tok('--gl-spacing-scale-3')};
  background-color: ${tok('--gl-feedback-strong-background-color')};
  color: ${tok('--gl-feedback-strong-text-color')};
  border-radius: ${tok('--gl-border-radius-full')};
  box-shadow: ${tok('--gl-shadow-md')};
  padding: ${tok('--gl-spacing-scale-3')} ${tok('--gl-spacing-scale-4')};
  font-size: ${tok('--gl-font-size-base')};
}
.gl-toast-body { flex: 1; }
.gl-toast-action {
  color: ${tok('--gl-feedback-strong-link-color')};
  font-weight: ${tok('--gl-font-weight-bold')};
  text-decoration: none; background: none; border: none; cursor: pointer;
}
.gl-toast-close {
  background: none; border: none; cursor: pointer;
  color: ${tok('--gl-feedback-strong-text-color')};
  display: inline-flex; padding: ${tok('--gl-spacing-scale-1')};
}
.gl-toast.is-leaving { opacity: 0; transform: translateY(-8px); transition: opacity 200ms ease, transform 200ms ease; }`;

const toastBody = `  <main class="gl-page">
    <h1 class="gl-title">Toast</h1>
    <p class="gl-sub">Stacked, fixed bottom-left; deep background and high-contrast text. Auto-hides after 5000ms by default.</p>

    <div class="gl-toaster" aria-live="polite">
      <div class="gl-toast" data-toast>
        <span class="gl-toast-body">Changes saved.</span>
        <button class="gl-toast-action">Undo</button>
        <button class="gl-toast-close" aria-label="Dismiss">${ICONS.x}</button>
      </div>
      <div class="gl-toast" data-toast>
        <span class="gl-toast-body">Pipeline #4821 passed.</span>
        <button class="gl-toast-action">View</button>
        <button class="gl-toast-close" aria-label="Dismiss">${ICONS.x}</button>
      </div>
    </div>

    <script>
      document.querySelectorAll('[data-toast]').forEach(function (t) {
        t.querySelector('.gl-toast-close').addEventListener('click', function () {
          t.classList.add('is-leaving');
          setTimeout(function () { t.style.display = 'none'; }, 250);
        });
      });
    </script>
  </main>`;

/* ------------------------------------------------------------------ dropdown */
const dropdownCSS = `.gl-dropdown-wrap { position: relative; display: inline-block; }
.gl-dropdown-toggle {
  display: inline-flex; align-items: center; gap: ${tok('--gl-spacing-scale-2')};
}
.gl-dropdown-menu {
  position: absolute; top: calc(100% + ${tok('--gl-spacing-scale-2')}); left: 0; min-width: 230px;
  background-color: ${tok('--gl-dropdown-background-color')};
  border: 1px solid ${tok('--gl-dropdown-border-color')};
  border-radius: ${tok('--gl-dropdown-border-radius')};
  box-shadow: ${tok('--gl-shadow-sm')};
  padding: ${tok('--gl-spacing-scale-2')};
  z-index: ${tok('--gl-zindex-3')};
}
.gl-dropdown-menu[hidden] { display: none; }
.gl-dropdown-header {
  padding: ${tok('--gl-spacing-scale-2')} ${tok('--gl-spacing-scale-3')};
  font-weight: ${tok('--gl-font-weight-bold')};
  font-size: ${tok('--gl-font-size-sm')};
  color: ${tok('--gl-text-color-subtle')};
}
.gl-dropdown-item {
  display: flex; align-items: center; justify-content: space-between; gap: ${tok('--gl-spacing-scale-3')};
  width: 100%; border: none; background: none; cursor: pointer;
  padding: ${tok('--gl-spacing-scale-2')} ${tok('--gl-spacing-scale-3')};
  border-radius: ${tok('--gl-border-radius-default')};
  color: ${tok('--gl-text-color-default')};
  text-align: left; font-size: ${tok('--gl-font-size-base')};
}
.gl-dropdown-item:hover { background-color: ${tok('--gl-dropdown-option-background-color-unselected-hover')}; }
.gl-dropdown-item--checked { color: ${tok('--gl-text-color-strong')}; font-weight: ${tok('--gl-font-weight-bold')}; background-color: ${tok('--gl-dropdown-option-background-color-selected-default')}; }
.gl-dropdown-divider { height: 1px; margin: ${tok('--gl-spacing-scale-2')}; background-color: ${tok('--gl-dropdown-divider-color')}; }
.gl-dropdown-clear {
  display: block; width: 100%; text-align: left; border: none; background: none; cursor: pointer;
  padding: ${tok('--gl-spacing-scale-2')} ${tok('--gl-spacing-scale-3')};
  color: ${tok('--gl-text-color-link')}; font-size: ${tok('--gl-font-size-sm')};
}`;

const dropdownBody = `  <main class="gl-page">
    <h1 class="gl-title">Dropdown</h1>
    <p class="gl-sub">Header, checkable items, divider and "Clear all". Toggle via checkbox hack so it works without JS.</p>

    <section class="gl-section">
      <div class="gl-dropdown-wrap">
        <label class="gl-dropdown-toggle gl-button gl-button--secondary--default" for="dd-toggle">Filter: All <span class="gl-tab-item-caret">&#9662;</span></label>
        <input type="checkbox" id="dd-toggle" hidden>
        <div class="gl-dropdown-menu">
          <div class="gl-dropdown-header">Status</div>
          <button class="gl-dropdown-item gl-dropdown-item--checked"><span>Open</span>${ICONS.check}</button>
          <button class="gl-dropdown-item gl-dropdown-item--checked"><span>Wait</span>${ICONS.check}</button>
          <button class="gl-dropdown-item"><span>Closed</span></button>
          <div class="gl-dropdown-divider"></div>
          <button class="gl-dropdown-item"><span>Export as CSV</span></button>
          <div class="gl-dropdown-divider"></div>
          <button class="gl-dropdown-clear">Clear all</button>
        </div>
      </div>
    </section>

    <style>
      #dd-toggle:checked ~ .gl-dropdown-menu { display: block; }
      #dd-toggle:not(:checked) ~ .gl-dropdown-menu { display: none; }
    </style>
    <script>
      (function () {
        var items = document.querySelectorAll('.gl-dropdown-item');
        var clearBtn = document.querySelector('.gl-dropdown-clear');
        var mark = function (it) {
          var s = document.createElement('span');
          s.className = 'gl-icon';
          s.innerHTML = '${ICONS.check}';
          return s;
        };
        items.forEach(function (it) {
          it.addEventListener('click', function () {
            var checked = it.classList.contains('gl-dropdown-item--checked');
            it.classList.toggle('gl-dropdown-item--checked', !checked);
            var m = it.querySelector('.gl-icon');
            if (m) m.remove();
            if (!checked) it.appendChild(mark(it));
          });
        });
        clearBtn.addEventListener('click', function () {
          items.forEach(function (it) {
            it.classList.remove('gl-dropdown-item--checked');
            var m = it.querySelector('.gl-icon');
            if (m) m.remove();
          });
        });
      })();
    </script>
  </main>`;

/* ------------------------------------------------------------------ form */
const formCSS = `.gl-form { display: flex; flex-direction: column; }
.gl-form-group { margin-bottom: ${tok('--gl-spacing-scale-5')}; }
.gl-label {
  display: block; font-weight: ${tok('--gl-font-weight-bold')};
  font-size: ${tok('--gl-font-size-base')};
  color: ${tok('--gl-text-color-strong')};
  margin-bottom: ${tok('--gl-spacing-scale-2')};
}
.gl-label .gl-optional { color: ${tok('--gl-text-color-subtle')}; font-weight: ${tok('--gl-font-weight-normal')}; }
.gl-label-desc { display: block; color: ${tok('--gl-text-color-subtle')}; font-size: ${tok('--gl-font-size-sm')}; font-weight: ${tok('--gl-font-weight-normal')}; margin-top: ${tok('--gl-spacing-scale-1')}; }
.gl-helper { font-size: ${tok('--gl-font-size-sm')}; color: ${tok('--gl-text-color-subtle')}; margin-top: ${tok('--gl-spacing-scale-2')}; }
.gl-feedback { font-size: ${tok('--gl-font-size-sm')}; margin-top: ${tok('--gl-spacing-scale-2')}; }
.gl-feedback--error { color: ${tok('--gl-control-text-color-error')}; }
.gl-feedback--valid { color: ${tok('--gl-control-text-color-valid')}; }`;

const formBody = `  <main class="gl-page">
    <h1 class="gl-title">Form</h1>
    <p class="gl-sub">Form group with label (+ optional), description, helper text, validity feedback; uniform field spacing.</p>

    <form class="gl-form">
      <div class="gl-form-group">
        <label class="gl-label" for="f-name">Project name</label>
        <span class="gl-label-desc">Remember: the name cannot be changed later.</span>
        <input id="f-name" class="gl-input gl-input--width-lg" type="text" value="my-project">
        <p class="gl-feedback gl-feedback--valid">This name is available.</p>
      </div>

      <div class="gl-form-group">
        <label class="gl-label" for="f-slug">Slug <span class="gl-optional">(optional)</span></label>
        <input id="f-slug" class="gl-input" type="text" placeholder="auto-generated">
        <p class="gl-helper">Used in the repository URL.</p>
      </div>

      <div class="gl-form-group">
        <label class="gl-label" for="f-email">Email</label>
        <input id="f-email" class="gl-input gl-input--invalid" type="email" value="dev@example">
        <p class="gl-feedback gl-feedback--error">Please enter a valid email address.</p>
      </div>

      <div class="gl-form-group">
        <label class="gl-label" for="f-desc">Description</label>
        <textarea id="f-desc" class="gl-input gl-input--width-lg" rows="3" placeholder="Short description"></textarea>
      </div>

      <div>
        <button class="gl-button gl-button--primary--confirm" type="submit">Create project</button>
        <button class="gl-button gl-button--default--secondary" type="button">Cancel</button>
      </div>
    </form>

    <script>
      (function () {
        var form = document.querySelector('.gl-form');
        form.addEventListener('submit', function (e) {
          e.preventDefault();
          var name = document.getElementById('f-name');
          var email = document.getElementById('f-email');
          var rgx = /^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/;
          var ok = true;
          var set = function (el, valid) {
            var group = el.closest('.gl-form-group');
            var p = group.querySelector('.gl-feedback');
            el.classList.toggle('gl-input--invalid', !valid);
            el.classList.toggle('gl-input--valid', valid);
            p.className = 'gl-feedback ' + (valid ? 'gl-feedback--valid' : 'gl-feedback--error');
            p.textContent = valid ? 'Looks good.' : 'Please check this field.';
            ok = ok && valid;
          };
          set(name, name.value.trim().length >= 3);
          set(email, rgx.test(email.value));
          if (ok) form.reset();
        });
      })();
    </script>
  </main>`;

/* ------------------------------------------------------------------ alert */
const alertCSS = `.alert-wrap { display: flex; flex-direction: column; gap: ${tok('--gl-spacing-scale-3')}; margin-bottom: ${tok('--gl-spacing-scale-6')}; }
.gl-alert {
  display: flex; gap: ${tok('--gl-spacing-scale-3')};
  border: 1px solid transparent;
  border-radius: ${tok('--gl-alert-border-radius')};
  padding: ${tok('--gl-spacing-scale-4')};
  position: relative;
}
.gl-alert--sticky { position: sticky; top: ${tok('--gl-spacing-scale-5')}; }
.gl-alert--info { background-color: ${tok('--gl-alert-info-background-color')}; border-color: ${tok('--gl-alert-info-border-color')}; }
.gl-alert--info .gl-alert-icon { color: ${tok('--gl-feedback-info-icon-color')}; }
.gl-alert--info .gl-alert-title { color: ${tok('--gl-alert-info-title-color')}; }
.gl-alert--success { background-color: ${tok('--gl-alert-success-background-color')}; border-color: ${tok('--gl-alert-success-border-color')}; }
.gl-alert--success .gl-alert-icon { color: ${tok('--gl-feedback-success-icon-color')}; }
.gl-alert--success .gl-alert-title { color: ${tok('--gl-alert-success-title-color')}; }
.gl-alert--warning { background-color: ${tok('--gl-alert-warning-background-color')}; border-color: ${tok('--gl-alert-warning-border-color')}; }
.gl-alert--warning .gl-alert-icon { color: ${tok('--gl-feedback-warning-icon-color')}; }
.gl-alert--warning .gl-alert-title { color: ${tok('--gl-alert-warning-title-color')}; }
.gl-alert--danger { background-color: ${tok('--gl-alert-danger-background-color')}; border-color: ${tok('--gl-alert-danger-border-color')}; }
.gl-alert--danger .gl-alert-icon { color: ${tok('--gl-feedback-danger-icon-color')}; }
.gl-alert--danger .gl-alert-title { color: ${tok('--gl-alert-danger-title-color')}; }
.gl-alert-icon { display: inline-flex; flex: 0 0 auto; }
.gl-alert-title { font-weight: ${tok('--gl-font-weight-bold')}; margin: 0 0 ${tok('--gl-spacing-scale-1')}; }
.gl-alert-body { margin: 0; color: ${tok('--gl-text-color-default')}; }
.gl-alert-content { flex: 1; min-width: 0; }
.gl-alert-dismiss {
  background: none; border: none; cursor: pointer;
  color: ${tok('--gl-text-color-subtle')};
  padding: ${tok('--gl-spacing-scale-1')}; border-radius: ${tok('--gl-border-radius-default')};
  align-self: flex-start; display: inline-flex;
}
.gl-alert:disabled, .gl-alert[aria-disabled='true'] { opacity: ${tok('--gl-opacity-7')}; pointer-events: none; }`;

const alertBody = `  <main class="gl-page">
    <h1 class="gl-title">Alert</h1>
    <p class="gl-sub">Embedded alerts with icon, title, body, dismiss &times; and sticky option. role=alert for danger, role=status otherwise.</p>

    <div class="alert-wrap">
      <div class="gl-alert gl-alert--info" role="status" data-alert>
        <span class="gl-alert-icon">${ICONS.info}</span>
        <div class="gl-alert-content">
          <h3 class="gl-alert-title">Information</h3>
          <p class="gl-alert-body">A scheduled maintenance window starts at 02:00 UTC.</p>
        </div>
        <button class="gl-alert-dismiss" aria-label="Dismiss">${ICONS.x}</button>
      </div>

      <div class="gl-alert gl-alert--success" role="status" data-alert>
        <span class="gl-alert-icon">${ICONS.check}</span>
        <div class="gl-alert-content">
          <h3 class="gl-alert-title">Success</h3>
          <p class="gl-alert-body">Your changes were published.</p>
        </div>
        <button class="gl-alert-dismiss" aria-label="Dismiss">${ICONS.x}</button>
      </div>

      <div class="gl-alert gl-alert--warning" role="status" data-alert>
        <span class="gl-alert-icon">${ICONS.warning}</span>
        <div class="gl-alert-content">
          <h3 class="gl-alert-title">Warning</h3>
          <p class="gl-alert-body">This branch has unmerged changes.</p>
        </div>
        <button class="gl-alert-dismiss" aria-label="Dismiss">${ICONS.x}</button>
      </div>

      <div class="gl-alert gl-alert--danger" role="alert" data-alert>
        <span class="gl-alert-icon">${ICONS.error}</span>
        <div class="gl-alert-content">
          <h3 class="gl-alert-title">Build failed</h3>
          <p class="gl-alert-body">Job 3 timed out after 10 minutes. Retry or inspect the logs.</p>
        </div>
        <button class="gl-alert-dismiss" aria-label="Dismiss">${ICONS.x}</button>
      </div>

      <div class="gl-alert gl-alert--info gl-alert--sticky" role="status" data-alert>
        <span class="gl-alert-icon">${ICONS.bulb}</span>
        <div class="gl-alert-content">
          <h3 class="gl-alert-title">Tip (sticky)</h3>
          <p class="gl-alert-body">This alert stays pinned to the top of the viewport.</p>
        </div>
        <button class="gl-alert-dismiss" aria-label="Dismiss">${ICONS.x}</button>
      </div>
    </div>

    <script>
      document.querySelectorAll('[data-alert]').forEach(function (a) {
        a.querySelector('.gl-alert-dismiss').addEventListener('click', function () {
          a.classList.add('is-dismissing');
          setTimeout(function () { a.style.display = 'none'; }, 250);
        });
      });
    </script>
  </main>`;

/* ------------------------------------------------------------------ README */
const README = `# Native HTML + CSS components (no build step)

One self-contained \`.html\` file per component. Drop it in a browser - it
already links \`variables.css\` and \`base.css\` (relative paths).

## Files

| File | Element | Props covered | States covered |
|---|---|---|---|
| button.html | .gl-button | category/variant/size/disabled/loading/icon/block | default, hover, active, focus, disabled, loading |
| input.html | .gl-input | type/placeholder/state/disabled/readonly/width | default, hover, focus, valid, invalid, disabled, readonly |
| modal.html | .gl-modal | visible/title/size/primaryAction/secondaryAction | closed, opened |
| table.html | .gl-table | items/fields/loading/sortBy/sortDesc | default, loading, sorted, row-hover, empty |
| tabs.html | .gl-tabs | tabs/active | default, active, hover, disabled |
| badge.html | .gl-badge | variant/icon/href | default, hover, disabled |
| toast.html | .gl-toast | message/action/autoHideDelay | visible, leaving |
| dropdown.html | .gl-dropdown | text/items/showClearAll | closed, opened, item-checked, item-hover |
| form.html | .gl-form / .gl-form-group | label/helper/error/optional | default, valid, invalid |
| alert.html | .gl-alert | variant/title/dismissible/sticky | default, dismissing |

\`base.css\` provides shared layout, typography and the focus ring using the
\`--gl-*\` design tokens; every component style block references tokens too, so
colors, radii, spacing and type sizes are fully theme-driven.

## Using in your own project

Copy the whole \`components/\` directory next to your page, then:

\`\`\`html
<link rel="stylesheet" href="components/base.css">
<link rel="stylesheet" href="components/button.html"><!-- n/a -->
\`\`\`

No - these are complete demo pages. To reuse a single component, copy its
\`<style>\` block and the matching markup into your own page and keep the
two links shown above. To switch themes, host your own copy of
\`../../css/variables.css\` (dark/light variants are selected there).
`;

/* ------------------------------------------------------------------ main */
const files = [
  ['button', 'Button', buttonCSS(), buttonBody],
  ['input', 'Input', inputCSS, inputBody],
  ['modal', 'Modal', modalCSS, modalBody],
  ['table', 'Table', tableCSS, tableBody],
  ['tabs', 'Tabs', tabsCSS, tabsBody],
  ['badge', 'Badge', badgeCSS, badgeBody],
  ['toast', 'Toast', toastCSS, toastBody],
  ['dropdown', 'Dropdown', dropdownCSS, dropdownBody],
  ['form', 'Form', formCSS, formBody],
  ['alert', 'Alert', alertCSS, alertBody],
];

for (const [id, title, css, body] of files) {
  writeIfChanged(path.join(OUT, `${id}.html`), page(title, css, body));
}
writeIfChanged(path.join(OUT, 'base.css'), BASE_CSS);
writeIfChanged(path.join(OUT, 'README.md'), README);
console.log(`[gen-vanilla] wrote ${files.length} components + base.css + README.md -> ${OUT}`);