'use strict';
/* gen-alpine.js — regenerates dist/alpine/components/*.html (Alpine.js + Tailwind CDN).
 * Pajamas-inspired (MIT). Repeatable: run `node scripts/gen-alpine.js`. */
const path = require('path');
const { ICONS, pageFrame, writeIfChanged, FRAMEWORKS } = require('./gen-lib.js');
const OUT = FRAMEWORKS.alpine;

const v = (name) => `var(${name})`;
const bv = (name) => `bg-[${v(name)}]`;               // background color
const tv = (name) => `text-[color:${v(name)}]`;       // text color (explicit)
const fsv = (name) => `text-[length:${v(name)}]`;     // font size (explicit)
const sp = (name) => `p-[${v(name)}]`;                // generic var class (padding etc)

const HEAD = `<link rel="stylesheet" href="../../css/variables.css">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/alpinejs" defer></script>
    <style>
      :focus-visible { outline: none; box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color); }
      .spin { animation: gl-spin .8s linear infinite; }
      @keyframes gl-spin { to { transform: rotate(360deg); } }
      .gl-tab-btn { position: relative; }
      .gl-tab-btn::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 2px; border-radius: 1px; background-color: var(--gl-color-alpha-0); }
      .gl-tab-btn:hover::after { background-color: var(--gl-border-color-strong); }
      .gl-tab-btn[data-active='true'] { font-weight: var(--gl-font-weight-bold); }
      .gl-tab-btn[data-active='true']::after { background-color: var(--gl-tab-selected-indicator-color-default); }
      body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    </style>`;

function page(title, body) {
  return pageFrame({ title, headExtras: HEAD, body });
}

const btn = (category, variant, label) =>
  `        <button class="inline-flex items-center gap-2 rounded-[var(--gl-button-border-radius)] ${bv(`--gl-button-${variant}-${category}-background-color-default`)} ${tv(`--gl-button-${variant}-${category}-foreground-color-default`)} px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] ${fsv('--gl-font-size-base')} font-bold cursor-pointer border border-transparent hover:${bv(`--gl-button-${variant}-${category}-background-color-hover`)} hover:${tv(`--gl-button-${variant}-${category}-foreground-color-hover`)} active:${bv(`--gl-button-${variant}-${category}-background-color-active`)}">${label}</button>`;

/* --------------------------------------------------------------- button */
const buttonBody = `  <main class="max-w-4xl mx-auto my-8 px-8" style="color: var(--gl-text-color-default)">
    <h1 class="${fsv('--gl-heading-scale-500-font-size')} font-bold mb-4" style="color: var(--gl-text-color-heading)">Button</h1>
    <p class="mb-6" style="color: var(--gl-text-color-subtle)">Categories primary/secondary/tertiary &times; variants default/confirm/danger; disabled &amp; loading are reactive.</p>

    <div x-data="{ loading: false, saved: false, save() { this.loading = true; this.saved = false; setTimeout(() => { this.loading = false; this.saved = true; }, 1800); } }">
      <div class="flex flex-wrap gap-3 mb-6">
        ${btn('primary', 'default', 'Default')}
        ${btn('primary', 'confirm', 'Confirm')}
        ${btn('primary', 'danger', 'Danger')}
        ${btn('secondary', 'default', 'Secondary')}
        ${btn('secondary', 'confirm', 'Confirm')}
        ${btn('secondary', 'danger', 'Danger')}
        ${btn('tertiary', 'default', 'Tertiary')}
        ${btn('tertiary', 'confirm', 'Confirm')}
        ${btn('tertiary', 'danger', 'Danger')}
        <a href="#" class="underline inline-flex items-center" style="color: var(--gl-button-link-text-color-default)">Link</a>
      </div>

      <div class="flex flex-wrap items-center gap-3 mb-6">
        <button class="inline-flex items-center gap-2 rounded-[var(--gl-button-border-radius)] ${bv('--gl-button-confirm-primary-background-color-default')} ${tv('--gl-button-confirm-primary-foreground-color-default')} px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] font-bold disabled:cursor-not-allowed disabled:${bv('--gl-action-disabled-background-color')} disabled:${tv('--gl-action-disabled-foreground-color')}" :disabled="loading" @click="save">
          <svg x-show="loading" class="w-4 h-4 spin" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2" opacity="0.35"/><path d="M14 8a6 6 0 0 0-6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          <svg x-show="!loading && saved" class="w-4 h-4" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8l3.5 3.5L13 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span x-text="saved ? 'Saved' : 'Save changes'"></span>
        </button>

        <button class="inline-flex items-center gap-2 rounded-[var(--gl-button-border-radius)] ${bv('--gl-button-default-secondary-background-color-default')} ${tv('--gl-button-default-secondary-foreground-color-default')} px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] font-bold disabled:cursor-not-allowed disabled:${bv('--gl-action-disabled-background-color')} disabled:${tv('--gl-action-disabled-foreground-color')}" disabled>Disabled</button>

        <div class="flex gap-2 items-center">
          <button class="inline-flex items-center rounded-[var(--gl-button-border-radius)] ${bv('--gl-button-confirm-primary-background-color-default')} ${tv('--gl-button-confirm-primary-foreground-color-default')} px-[var(--gl-spacing-scale-2)] py-[var(--gl-spacing-scale-2)] ${fsv('--gl-font-size-sm')} font-bold">Small</button>
          <button class="inline-flex items-center rounded-[var(--gl-button-border-radius)] ${bv('--gl-button-confirm-primary-background-color-default')} ${tv('--gl-button-confirm-primary-foreground-color-default')} px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] font-bold">Medium</button>
        </div>
      </div>

      <button class="w-full flex items-center justify-center gap-2 rounded-[var(--gl-button-border-radius)] ${bv('--gl-button-danger-primary-background-color-default')} ${tv('--gl-button-danger-primary-foreground-color-default')} px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] font-bold">Block, danger</button>
    </div>
  </main>`;

/* ---------------------------------------------------------------- input */
const inputBody = `  <main class="max-w-2xl mx-auto my-8 px-8" style="color: var(--gl-text-color-default)">
    <h1 class="${fsv('--gl-heading-scale-500-font-size')} font-bold mb-4" style="color: var(--gl-text-color-heading)">Input</h1>
    <p class="mb-6" style="color: var(--gl-text-color-subtle)">Reactive validity (valid/invalid), width steps, disabled &amp; readonly.</p>

    <div x-data="{ value: '', state: null, check() { this.state = this.value && this.value.includes('@') ? 'valid' : 'invalid'; } }" class="space-y-[var(--gl-spacing-scale-5)]">
      <div>
        <label class="block font-bold mb-2" style="color: var(--gl-text-color-strong)">Email (x-model + live validation)</label>
        <input type="email" x-model="value" @input="check" placeholder="name@example.com"
          class="w-full px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] ${fsv('--gl-font-size-base')} rounded-[var(--gl-control-border-radius)] placeholder-[var(--gl-control-placeholder-color)]"
          :class="{
            'border-[var(--gl-control-border-color-default)] hover:border-[var(--gl-control-border-color-hover)]': !state,
            'border-[var(--gl-control-border-color-error)]': state === 'invalid',
            'border-[var(--gl-control-text-color-valid)]': state === 'valid'
          }"
          style="background-color: var(--gl-control-background-color-default); color: var(--gl-text-color-default)">
        <p x-show="state === 'invalid'" class="mt-2 ${fsv('--gl-font-size-sm')}" style="color: var(--gl-control-text-color-error)">Please enter a valid email address.</p>
        <p x-show="state === 'valid'" class="mt-2 ${fsv('--gl-font-size-sm')}" style="color: var(--gl-control-text-color-valid)">Looks good.</p>
      </div>

      <div>
        <label class="block font-bold mb-2">Width steps (xs/sm/md/lg)</label>
        <div class="space-y-[var(--gl-spacing-scale-3)]">
          <input class="block w-full max-w-[var(--gl-spacing-scale-31)] border border-[var(--gl-control-border-color-default)] px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] rounded-[var(--gl-control-border-radius)]" placeholder="xs">
          <input class="block w-full max-w-[var(--gl-spacing-scale-37)] border border-[var(--gl-control-border-color-default)] px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] rounded-[var(--gl-control-border-radius)]" placeholder="sm">
          <input class="block w-full max-w-[var(--gl-spacing-scale-48)] border border-[var(--gl-control-border-color-default)] px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] rounded-[var(--gl-control-border-radius)]" placeholder="md">
          <input class="block w-full max-w-[var(--gl-spacing-scale-62)] border border-[var(--gl-control-border-color-default)] px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] rounded-[var(--gl-control-border-radius)]" placeholder="lg">
        </div>
      </div>

      <div class="flex gap-3">
        <input class="flex-1 border border-[var(--gl-control-border-color-default)] rounded-[var(--gl-control-border-radius)] px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)]" type="text" placeholder="Disabled" disabled style="background-color: var(--gl-control-background-color-disabled)">
        <input class="flex-1 border border-[var(--gl-control-border-color-default)] rounded-[var(--gl-control-border-radius)] px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)]" type="text" value="Read only" readonly style="background-color: var(--gl-control-background-color-readonly)">
      </div>
    </div>
  </main>`;

/* ---------------------------------------------------------------- modal */
const modalBody = `  <main class="max-w-4xl mx-auto my-8 px-8" x-data="{
      visible: false, size: 'md',
      open(s) { this.size = s || 'md'; this.visible = true; },
      close() { this.visible = false; },
      primary() { this.close(); },
    }">
    <h1 class="${fsv('--gl-heading-scale-500-font-size')} font-bold mb-4" style="color: var(--gl-text-color-heading)">Modal</h1>
    <p class="mb-6" style="color: var(--gl-text-color-subtle)">x-show + x-transition; sizes sm/md/lg; close via backdrop, &times; and Esc.</p>

    <div class="flex flex-wrap gap-3 mb-6" style="color: var(--gl-text-color-default)">
      <button class="rounded-[var(--gl-button-border-radius)] ${bv('--gl-button-default-primary-background-color-default')} ${tv('--gl-button-default-primary-foreground-color-default')} px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] font-bold" @click="open('sm')">Open small</button>
      <button class="rounded-[var(--gl-button-border-radius)] ${bv('--gl-button-default-primary-background-color-default')} ${tv('--gl-button-default-primary-foreground-color-default')} px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] font-bold" @click="open('md')">Open medium</button>
      <button class="rounded-[var(--gl-button-border-radius)] ${bv('--gl-button-default-primary-background-color-default')} ${tv('--gl-button-default-primary-foreground-color-default')} px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] font-bold" @click="open('lg')">Open large</button>
    </div>

    <template x-teleport="body">
      <div x-show="visible" x-transition.opacity.duration.250ms class="fixed inset-0 z-[var(--gl-zindex-4)] flex items-start justify-center ${bv('--gl-color-alpha-dark-40')} p-8" @click.self="close" @keydown.escape.window="close" style="padding: var(--gl-spacing-scale-8)">
        <div class="w-full rounded-[var(--gl-modal-border-radius)] flex flex-col" style="background-color: var(--gl-background-color-default); box-shadow: var(--gl-shadow-lg); max-width: var(--gl-spacing-scale-80)"
             :style="size === 'sm' ? { maxWidth: 'var(--gl-spacing-scale-31)' } : size === 'lg' ? { maxWidth: 'var(--gl-spacing-scale-80)' } : { maxWidth: 'var(--gl-spacing-scale-48)' }">
          <div class="flex items-center justify-between" style="padding: var(--gl-spacing-scale-4) var(--gl-spacing-scale-5)">
            <h3 class="${fsv('--gl-heading-scale-500-font-size')} font-bold m-0" style="color: var(--gl-text-color-heading)" x-text="size === 'sm' ? 'Small dialog' : size === 'lg' ? 'Large dialog' : 'Delete project'"></h3>
            <button class="rounded hover:${bv('--gl-color-alpha-dark-4')}" style="color: var(--gl-text-color-subtle); padding: var(--gl-spacing-scale-2)" aria-label="Close" @click="close">${ICONS.x}</button>
          </div>
          <div style="padding: var(--gl-spacing-scale-5); color: var(--gl-text-color-default)">
            <p>You are about to make a permanent change. This action cannot be undone.</p>
          </div>
          <div class="flex flex-col sm:flex-row gap-[var(--gl-spacing-scale-3)]" style="padding: 0 var(--gl-spacing-scale-5) var(--gl-spacing-scale-5)">
            <button class="rounded-[var(--gl-button-border-radius)] ${bv('--gl-button-danger-primary-background-color-default')} ${tv('--gl-button-danger-primary-foreground-color-default')} px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] font-bold" @click="primary">Delete</button>
            <button class="rounded-[var(--gl-button-border-radius)] ${bv('--gl-button-default-secondary-background-color-default')} ${tv('--gl-button-default-secondary-foreground-color-default')} px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] font-bold" @click="close">Cancel</button>
          </div>
        </div>
      </div>
    </template>
  </main>`;

/* ---------------------------------------------------------------- table */
const tableBody = `  <main class="max-w-4xl mx-auto my-8 px-8" x-data="{
      loading: false,
      items: [
        { name: 'main', status: 'passed', duration: '12m 04s' },
        { name: 'feature/ui', status: 'running', duration: '8m 51s' },
        { name: 'hotfix/auth', status: 'failed', duration: '3m 02s' },
        { name: 'release/1.2', status: 'passed', duration: '15m 22s' },
      ],
      fields: [ { key: 'name', label: 'Name', sortable: true }, { key: 'status', label: 'Status' }, { key: 'duration', label: 'Duration', sortable: true } ],
      sortBy: null, sortDesc: false,
      sorted() {
        if (!this.sortBy) return this.items;
        const col = this.sortBy;
        const arr = [...this.items].sort((a, b) => (a[col] > b[col] ? 1 : a[col] < b[col] ? -1 : 0));
        return this.sortDesc ? arr.reverse() : arr;
      },
      toggle(key) { if (this.sortBy === key) { this.sortDesc = !this.sortDesc; } else { this.sortBy = key; this.sortDesc = false; } },
      toggleBusy() { this.loading = true; setTimeout(() => (this.loading = false), 1500); },
    }">
    <h1 class="${fsv('--gl-heading-scale-500-font-size')} font-bold mb-4" style="color: var(--gl-text-color-heading)">Table</h1>
    <p class="mb-6" style="color: var(--gl-text-color-subtle)">Client-side sorting, loading (busy) state, row hover highlight.</p>

    <div class="mb-3 flex items-center gap-2" x-show="loading" style="color: var(--gl-text-color-strong)"><span class="spin inline-flex">${ICONS.spinner}</span> Loading&hellip;</div>
    <div class="overflow-auto rounded" style="max-height: 320px">
      <table class="w-full border-collapse ${fsv('--gl-font-size-base')}" :class="{ 'opacity-[var(--gl-opacity-7)]': loading }">
        <thead class="sticky top-0" style="background-color: var(--gl-background-color-default)">
          <tr>
            <template x-for="f in fields" :key="f.key">
              <th class="text-left font-bold px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] whitespace-nowrap"
                  style="color: var(--gl-text-color-subtle); box-shadow: inset 0 -1px 0 var(--gl-border-color-default)"
                  :class="{ 'cursor-pointer select-none hover:${tv('--gl-text-color-strong')}': f.sortable }"
                  @click="f.sortable && toggle(f.key)">
                <span class="inline-flex items-center gap-1">
                  <span x-text="f.label"></span>
                  <span x-show="sortBy === f.key" style="color: var(--gl-table-sorting-icon-color)" x-text="sortDesc ? '&darr;' : '&uarr;'"></span>
                </span>
              </th>
            </template>
          </tr>
        </thead>
        <tbody>
          <template x-for="row in sorted()" :key="row.name">
            <tr class="transition-colors hover:${bv('--gl-table-row-background-color-hover')}">
              <td class="px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)]" style="box-shadow: inset 0 -1px 0 var(--gl-color-alpha-dark-8)" x-text="row.name"></td>
              <td class="px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)]" style="box-shadow: inset 0 -1px 0 var(--gl-color-alpha-dark-8)" x-text="row.status"></td>
              <td class="px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)]" style="box-shadow: inset 0 -1px 0 var(--gl-color-alpha-dark-8)" x-text="row.duration"></td>
            </tr>
          </template>
          <tr x-show="!sorted().length">
            <td colspan="3" class="text-center py-[var(--gl-spacing-scale-9)]" style="color: var(--gl-text-color-subtle)">No records found.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-4">
      <button class="rounded-[var(--gl-button-border-radius)] ${bv('--gl-button-default-primary-background-color-default')} ${tv('--gl-button-default-primary-foreground-color-default')} px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] font-bold" @click="toggleBusy">Toggle busy state</button>
    </div>
  </main>`;

/* ---------------------------------------------------------------- tabs */
const tabsBody = `  <main class="max-w-3xl mx-auto my-8 px-8" x-data="{
      tabs: [
        { title: 'Overview', count: 3, content: 'Overview content' },
        { title: 'Commits', count: 48, content: 'Commits content' },
        { title: 'Pipelines', count: 12, content: 'Pipelines content' },
        { title: 'Locked', count: null, content: '', disabled: true },
      ],
      active: 0,
    }">
    <h1 class="${fsv('--gl-heading-scale-500-font-size')} font-bold mb-4" style="color: var(--gl-text-color-heading)">Tabs</h1>
    <p class="mb-6" style="color: var(--gl-text-color-subtle)">Active indicator + count badges; content panes via x-show.</p>

    <div class="border-b border-[var(--gl-border-color-default)]">
      <div class="flex gap-[var(--gl-spacing-scale-2)] overflow-x-auto">
        <button x-for="(t, i) in tabs" :key="i" @click="!t.disabled && (active = i)"
          class="gl-tab-btn relative inline-flex items-center gap-2 px-[var(--gl-spacing-scale-4)] py-[var(--gl-spacing-scale-4)] ${fsv('--gl-font-size-base')} whitespace-nowrap bg-transparent border-0 cursor-pointer"
          :class="t.disabled ? '${tv('--gl-action-disabled-foreground-color')} cursor-not-allowed' : 'hover:${tv('--gl-text-color-strong')}'"
          :data-active="active === i && !t.disabled"
          :style="t.disabled ? { color: 'var(--gl-action-disabled-foreground-color)' } : active === i ? { color: 'var(--gl-text-color-strong)' } : { color: 'var(--gl-text-color-subtle)' }">
          <span x-text="t.title"></span>
          <span x-show="t.count != null" class="inline-flex items-center rounded-[var(--gl-border-radius-full)] ${bv('--gl-badge-neutral-background-color-default')} px-[var(--gl-spacing-scale-2)] ${fsv('--gl-font-size-sm')} font-bold" style="color: var(--gl-badge-neutral-text-color-default)" x-text="t.count"></span>
        </button>
      </div>
    </div>

    <div class="py-[var(--gl-spacing-scale-4)]" style="color: var(--gl-text-color-default)">
      <template x-for="(t, i) in tabs" :key="i">
        <div x-show="active === i" role="tabpanel" class="p-[var(--gl-spacing-scale-4)]" style="padding-top: var(--gl-spacing-scale-5)" x-text="t.content"></div>
      </template>
    </div>
  </main>`;

/* ---------------------------------------------------------------- badge */
const BADGE_INLINE = [
  ['neutral', '--gl-badge-neutral-background-color-default', '--gl-badge-neutral-text-color-default', 'neutral'],
  ['info', '--gl-badge-info-background-color-default', '--gl-badge-info-text-color-default', 'info'],
  ['success', '--gl-badge-success-background-color-default', '--gl-badge-success-text-color-default', 'success'],
  ['warning', '--gl-badge-warning-background-color-default', '--gl-badge-warning-text-color-default', 'warning'],
  ['danger', '--gl-badge-danger-background-color-default', '--gl-badge-danger-text-color-default', 'danger'],
  ['tier', '--gl-badge-tier-background-color-default', '--gl-badge-tier-text-color-default', 'Premium'],
].map(
  ([name, bg, fg, label]) =>
    `      <span class="inline-flex items-center gap-2 rounded-[var(--gl-border-radius-full)] ${bv(bg)} ${tv(fg)} px-[var(--gl-spacing-scale-2)] py-[var(--gl-spacing-scale-1)] ${fsv('--gl-font-size-sm')} font-bold">${label}</span>`
).join('\n');

const badgeBody = `  <main class="max-w-3xl mx-auto my-8 px-8" style="color: var(--gl-text-color-default)">
    <h1 class="${fsv('--gl-heading-scale-500-font-size')} font-bold mb-4" style="color: var(--gl-text-color-heading)">Badge</h1>
    <p class="mb-6" style="color: var(--gl-text-color-subtle)">Pill capsules; variants, optional icon, link hover ring, disabled.</p>

    <div class="flex flex-wrap gap-3 mb-6">
${BADGE_INLINE}
    </div>

    <div class="flex flex-wrap gap-3 mb-6">
      <span class="inline-flex items-center gap-2 rounded-[var(--gl-border-radius-full)] ${bv('--gl-badge-success-background-color-default')} ${tv('--gl-badge-success-text-color-default')} px-[var(--gl-spacing-scale-2)] py-[var(--gl-spacing-scale-1)] ${fsv('--gl-font-size-sm')} font-bold">${ICONS.check} Passed</span>
      <span class="inline-flex items-center gap-2 rounded-[var(--gl-border-radius-full)] ${bv('--gl-badge-danger-background-color-default')} ${tv('--gl-badge-danger-text-color-default')} px-[var(--gl-spacing-scale-2)] py-[var(--gl-spacing-scale-1)] ${fsv('--gl-font-size-sm')} font-bold">${ICONS.error} Failed</span>
      <span class="inline-flex items-center gap-2 rounded-[var(--gl-border-radius-full)] ${bv('--gl-badge-info-background-color-default')} ${tv('--gl-badge-info-text-color-default')} px-[var(--gl-spacing-scale-2)] py-[var(--gl-spacing-scale-1)] ${fsv('--gl-font-size-sm')} font-bold">${ICONS.info} Info</span>
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <a href="#" class="inline-flex items-center rounded-[var(--gl-border-radius-full)] ${bv('--gl-badge-success-background-color-default')} ${tv('--gl-badge-success-text-color-default')} px-[var(--gl-spacing-scale-2)] py-[var(--gl-spacing-scale-1)] ${fsv('--gl-font-size-sm')} font-bold no-underline hover:shadow-[inset_0_0_0_1px_var(--gl-border-color-strong)]">link badge</a>
      <span class="inline-flex items-center rounded-[var(--gl-border-radius-full)] ${bv('--gl-badge-neutral-background-color-default')} ${tv('--gl-badge-neutral-text-color-default')} px-[var(--gl-spacing-scale-2)] py-[var(--gl-spacing-scale-1)] ${fsv('--gl-font-size-sm')} font-bold opacity-[var(--gl-opacity-7)]">disabled state</span>
    </div>
  </main>`;

/* ---------------------------------------------------------------- toast */
const toastBody = `  <main class="max-w-4xl mx-auto my-8 px-8" x-data="{
      toasts: [],
      id: 0,
      push(msg, actionText, delay = 5000) {
        const t = { id: ++this.id, msg, actionText, leaving: false };
        this.toasts.push(t);
        if (delay > 0) setTimeout(() => this.remove(t), delay);
      },
      remove(t) {
        t.leaving = true;
        setTimeout(() => { this.toasts = this.toasts.filter((x) => x !== t); }, 250);
      }
    }">
    <h1 class="${fsv('--gl-heading-scale-500-font-size')} font-bold mb-4" style="color: var(--gl-text-color-heading)">Toast</h1>
    <p class="mb-6" style="color: var(--gl-text-color-subtle)">Fixed bottom-left stack; auto-hide after 5000ms; optional action button.</p>

    <button class="rounded-[var(--gl-button-border-radius)] ${bv('--gl-button-default-primary-background-color-default')} ${tv('--gl-button-default-primary-foreground-color-default')} px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] font-bold" @click="push('Changes saved.', 'Undo')">Show toast</button>
    <button class="rounded-[var(--gl-button-border-radius)] ${bv('--gl-button-default-primary-background-color-default')} ${tv('--gl-button-default-primary-foreground-color-default')} px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] font-bold" @click="push('Pipeline #4821 passed.', 'View', 4000)">Auto-hide 4s</button>

    <div class="fixed flex flex-col gap-3" :class="toasts.length ? '' : 'pointer-events-none'"
         style="bottom: var(--gl-spacing-scale-6); left: var(--gl-spacing-scale-6); z-index: var(--gl-zindex-200); max-width: calc(100vw - var(--gl-spacing-scale-12))" aria-live="polite">
      <template x-for="t in toasts" :key="t.id">
        <div class="flex items-center gap-3 rounded-[var(--gl-border-radius-full)] px-[var(--gl-spacing-scale-4)]" :class="{ 'opacity-0 translate-y-[-8px] transition-opacity duration-200': t.leaving }"
             style="background-color: var(--gl-feedback-strong-background-color); color: var(--gl-feedback-strong-text-color); box-shadow: var(--gl-shadow-md); padding-top: var(--gl-spacing-scale-3); padding-bottom: var(--gl-spacing-scale-3)">
          <span class="flex-1" x-text="t.msg"></span>
          <button class="font-bold bg-transparent border-0 cursor-pointer" style="color: var(--gl-feedback-strong-link-color)" x-text="t.actionText"></button>
          <button class="bg-transparent border-0 cursor-pointer inline-flex" style="color: var(--gl-feedback-strong-text-color); padding: var(--gl-spacing-scale-1)" aria-label="Dismiss" @click="remove(t)">${ICONS.x}</button>
        </div>
      </template>
    </div>
  </main>`;

/* ------------------------------------------------------------ dropdown */
const dropdownBody = `  <main class="max-w-3xl mx-auto my-8 px-8" x-data="{
      open: false,
      items: [ { text: 'Open', checked: true }, { text: 'Wait', checked: true }, { text: 'Closed', checked: false } ],
      select(item) { item.checked = !item.checked; },
      clearAll() { this.items.forEach((i) => (i.checked = false)); },
      count() { return this.items.filter((i) => i.checked).length; }
    }">
    <h1 class="${fsv('--gl-heading-scale-500-font-size')} font-bold mb-4" style="color: var(--gl-text-color-heading)">Dropdown</h1>
    <p class="mb-6" style="color: var(--gl-text-color-subtle)">Header, checkable items, divider, &quot;Clear all&quot;; closes on outside click / Esc.</p>

    <div class="relative inline-block" @click.outside="open = false" @keydown.escape.window="open = false">
      <button class="inline-flex items-center gap-2 rounded-[var(--gl-button-border-radius)] ${bv('--gl-button-default-secondary-background-color-default')} ${tv('--gl-button-default-secondary-foreground-color-default')} px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] font-bold" @click="open = !open">
        Filter: <span x-text="count()"></span> selected <span>&#9662;</span>
      </button>

      <div x-show="open" x-transition.origin.top.left class="absolute top-[calc(100%+var(--gl-spacing-scale-2))] left-0 min-w-[230px] z-[var(--gl-zindex-3)] p-[var(--gl-spacing-scale-2)]"
           style="background-color: var(--gl-dropdown-background-color); border: 1px solid var(--gl-dropdown-border-color); border-radius: var(--gl-dropdown-border-radius); box-shadow: var(--gl-shadow-sm)">
        <div class="px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-2)] ${fsv('--gl-font-size-sm')} font-bold" style="color: var(--gl-text-color-subtle)">Status</div>
        <template x-for="item in items" :key="item.text">
          <button class="flex items-center justify-between w-full gap-3 text-left rounded px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-2)] cursor-pointer"
                  :class="item.checked ? '${tv('--gl-text-color-strong')}' : '${tv('--gl-text-color-default')}'"
                  :style="item.checked ? { fontWeight: 'var(--gl-font-weight-bold)', backgroundColor: 'var(--gl-dropdown-option-background-color-selected-default)' } : { backgroundColor: 'var(--gl-color-alpha-0)' }"
                  style="box-shadow: inset 0 0 0 0 var(--gl-color-alpha-0)" @click="select(item)">
            <span x-text="item.text"></span>
            <span x-show="item.checked">${ICONS.check}</span>
          </button>
        </template>
        <div class="h-px my-[var(--gl-spacing-scale-2)]" style="background-color: var(--gl-dropdown-divider-color)"></div>
        <button class="block w-full text-left px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-2)] bg-transparent border-0 cursor-pointer ${fsv('--gl-font-size-sm')}" style="color: var(--gl-text-color-link)" @click="clearAll">Clear all</button>
      </div>
    </div>
  </main>`;

/* ---------------------------------------------------------------- form */
const formBody = `  <main class="max-w-2xl mx-auto my-8 px-8" x-data="{
      name: 'my-project', email: '', slug: '', submitted: false,
      emailState() { return this.email && this.email.includes('@') ? 'valid' : 'invalid'; },
      submitForm() { this.submitted = true; }
    }" style="color: var(--gl-text-color-default)">
    <h1 class="${fsv('--gl-heading-scale-500-font-size')} font-bold mb-4" style="color: var(--gl-text-color-heading)">Form</h1>
    <p class="mb-6" style="color: var(--gl-text-color-subtle)">Form group: label (+ optional), description, helper, validity feedback; submit handler.</p>

    <form @submit.prevent="submitForm" class="space-y-[var(--gl-spacing-scale-5)]">
      <div>
        <label class="block font-bold mb-2" style="color: var(--gl-text-color-strong)">Project name *</label>
        <span class="block mb-2 ${fsv('--gl-font-size-sm')}" style="color: var(--gl-text-color-subtle)">Remember: the name cannot be changed later.</span>
        <input type="text" x-model="name" class="w-full lg:w-[520px] border border-[var(--gl-control-border-color-default)] rounded-[var(--gl-control-border-radius)] px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)]"
               style="background-color: var(--gl-control-background-color-default); color: var(--gl-text-color-default)">
        <p class="mt-2 ${fsv('--gl-font-size-sm')}" style="color: var(--gl-control-text-color-valid)">This name is available.</p>
      </div>

      <div>
        <label class="block font-bold mb-2" style="color: var(--gl-text-color-strong)">Slug <span class="font-normal" style="color: var(--gl-text-color-subtle)">(optional)</span></label>
        <input type="text" x-model="slug" placeholder="auto-generated"
               class="w-full lg:w-[520px] border border-[var(--gl-control-border-color-default)] rounded-[var(--gl-control-border-radius)] px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] placeholder-[var(--gl-control-placeholder-color)]"
               style="background-color: var(--gl-control-background-color-default); color: var(--gl-text-color-default)">
        <p class="mt-2 ${fsv('--gl-font-size-sm')}" style="color: var(--gl-text-color-subtle)">Used in the repository URL.</p>
      </div>

      <div>
        <label class="block font-bold mb-2" style="color: var(--gl-text-color-strong)">Email *</label>
        <input type="email" x-model="email" placeholder="name@example.com"
               class="w-full lg:w-[520px] border rounded-[var(--gl-control-border-radius)] px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)]"
               :class="emailState() === 'invalid' ? 'border-[var(--gl-control-border-color-error)]' : 'border-[var(--gl-control-border-color-default)]'"
               style="background-color: var(--gl-control-background-color-default); color: var(--gl-text-color-default)">
        <p x-show="emailState() === 'invalid'" class="mt-2 ${fsv('--gl-font-size-sm')}" style="color: var(--gl-control-text-color-error)">Please enter a valid email address.</p>
      </div>

      <div class="flex gap-3 items-center">
        <button type="submit" class="rounded-[var(--gl-button-border-radius)] ${bv('--gl-button-confirm-primary-background-color-default')} ${tv('--gl-button-confirm-primary-foreground-color-default')} px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] font-bold">Create project</button>
        <button type="button" class="rounded-[var(--gl-button-border-radius)] ${bv('--gl-button-default-secondary-background-color-default')} ${tv('--gl-button-default-secondary-foreground-color-default')} px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] font-bold">Cancel</button>
        <p x-show="submitted" class="m-0" style="color: var(--gl-text-color-subtle)">Form submitted (prevented default).</p>
      </div>
    </form>
  </main>`;

/* ---------------------------------------------------------------- alert */
const alertList = `
      <div x-data="{ gone: false }" x-show="!gone" class="flex gap-3 rounded-[var(--gl-alert-border-radius)]" role="status" style="background-color: var(--gl-alert-info-background-color); border: 1px solid var(--gl-alert-info-border-color); padding: var(--gl-spacing-scale-4)">
        <span class="inline-flex" style="color: var(--gl-feedback-info-icon-color)">${ICONS.info}</span>
        <div class="flex-1 min-w-0">
          <h3 class="font-bold m-0 mb-1" style="color: var(--gl-alert-info-title-color); font-size: var(--gl-font-size-base)">Information</h3>
          <p class="m-0" style="color: var(--gl-text-color-default)">A scheduled maintenance window starts at 02:00 UTC.</p>
        </div>
        <button class="bg-transparent border-0 cursor-pointer rounded" style="color: var(--gl-text-color-subtle); padding: var(--gl-spacing-scale-1)" aria-label="Dismiss" @click="gone = true">${ICONS.x}</button>
      </div>
      <div x-data="{ gone: false }" x-show="!gone" class="flex gap-3 rounded-[var(--gl-alert-border-radius)]" role="status" style="background-color: var(--gl-alert-success-background-color); border: 1px solid var(--gl-alert-success-border-color); padding: var(--gl-spacing-scale-4)">
        <span class="inline-flex" style="color: var(--gl-feedback-success-icon-color)">${ICONS.check}</span>
        <div class="flex-1 min-w-0">
          <h3 class="font-bold m-0 mb-1" style="color: var(--gl-alert-success-title-color); font-size: var(--gl-font-size-base)">Success</h3>
          <p class="m-0" style="color: var(--gl-text-color-default)">Your changes were published.</p>
        </div>
        <button class="bg-transparent border-0 cursor-pointer rounded" style="color: var(--gl-text-color-subtle); padding: var(--gl-spacing-scale-1)" aria-label="Dismiss" @click="gone = true">${ICONS.x}</button>
      </div>
      <div x-data="{ gone: false }" x-show="!gone" class="flex gap-3 rounded-[var(--gl-alert-border-radius)]" role="status" style="background-color: var(--gl-alert-warning-background-color); border: 1px solid var(--gl-alert-warning-border-color); padding: var(--gl-spacing-scale-4)">
        <span class="inline-flex" style="color: var(--gl-feedback-warning-icon-color)">${ICONS.warning}</span>
        <div class="flex-1 min-w-0">
          <h3 class="font-bold m-0 mb-1" style="color: var(--gl-alert-warning-title-color); font-size: var(--gl-font-size-base)">Warning</h3>
          <p class="m-0" style="color: var(--gl-text-color-default)">This branch has unmerged changes.</p>
        </div>
        <button class="bg-transparent border-0 cursor-pointer rounded" style="color: var(--gl-text-color-subtle); padding: var(--gl-spacing-scale-1)" aria-label="Dismiss" @click="gone = true">${ICONS.x}</button>
      </div>
      <div x-data="{ gone: false }" x-show="!gone" class="flex gap-3 rounded-[var(--gl-alert-border-radius)]" role="alert" style="background-color: var(--gl-alert-danger-background-color); border: 1px solid var(--gl-alert-danger-border-color); padding: var(--gl-spacing-scale-4)">
        <span class="inline-flex" style="color: var(--gl-feedback-danger-icon-color)">${ICONS.error}</span>
        <div class="flex-1 min-w-0">
          <h3 class="font-bold m-0 mb-1" style="color: var(--gl-alert-danger-title-color); font-size: var(--gl-font-size-base)">Build failed</h3>
          <p class="m-0" style="color: var(--gl-text-color-default)">Job 3 timed out after 10 minutes. Retry or inspect the logs.</p>
        </div>
        <button class="bg-transparent border-0 cursor-pointer rounded" style="color: var(--gl-text-color-subtle); padding: var(--gl-spacing-scale-1)" aria-label="Dismiss" @click="gone = true">${ICONS.x}</button>
      </div>`;

const alertBody = `  <main class="max-w-3xl mx-auto my-8 px-8" style="color: var(--gl-text-color-default)">
    <h1 class="${fsv('--gl-heading-scale-500-font-size')} font-bold mb-4" style="color: var(--gl-text-color-heading)">Alert</h1>
    <p class="mb-6" style="color: var(--gl-text-color-subtle)">Embedded alerts with icon + title; dismissible; role=alert for danger; sticky option.</p>

    <div class="space-y-[var(--gl-spacing-scale-3)]" style="margin-bottom: var(--gl-spacing-scale-6)">
${alertList}
    </div>

    <div class="sticky flex gap-3 rounded-[var(--gl-alert-border-radius)]" style="background-color: var(--gl-alert-info-background-color); border: 1px solid var(--gl-alert-info-border-color); padding: var(--gl-spacing-scale-4); top: var(--gl-spacing-scale-5)">
      <span class="inline-flex" style="color: var(--gl-feedback-info-icon-color)">${ICONS.bulb}</span>
      <div class="flex-1">
        <h3 class="font-bold m-0 mb-1" style="color: var(--gl-alert-info-title-color); font-size: var(--gl-font-size-base)">Tip (sticky)</h3>
        <p class="m-0" style="color: var(--gl-text-color-default)">This alert stays pinned to the top of the viewport.</p>
      </div>
    </div>
  </main>`;

/* ---------------------------------------------------------------- README */
const README = `# Alpine.js + Tailwind CDN components

Full \`.html\` pages driven by Alpine.js (\`x-data\` / \`x-show\` / \`x-for\`,
\`x-model\`, \`x-transition\`) and Tailwind (Play CDN) with arbitrary values
that reference the \`--gl-*\` design tokens. Each page links
\`../../css/variables.css\` for the token values.

## Files

| File | Interaction |
|---|---|
| button.html | loading/saved reactive state, disabled, sizes, link |
| input.html | x-model live validation (valid/invalid), width steps |
| modal.html | open/close, sizes sm/md/lg, backdrop & Esc close, x-teleport |
| table.html | client-side sorting, busy loading state, row hover |
| tabs.html | active tab + indicator bar, count badges, disabled tab |
| badge.html | static variants (icons, link, disabled) |
| toast.html | push/remove stack, auto-hide delay, action button |
| dropdown.html | checkable items, clear all, outside-click / Esc close |
| form.html | reactive fields, validation feedback, submit handler |
| alert.html | dismissible alerts by variant, sticky alert |

## Using in your own project

Alpine and Tailwind are loaded from CDN so there is no build step:

\`\`\`html
<link rel="stylesheet" href="components/../css/variables.css">
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://unpkg.com/alpinejs" defer></script>
\`\`\`

Open any \`.html\` file directly in a browser, or copy the \`<main>\` block of
the component you need into your own Alpine page. Colors, radii, spacing and
type sizes all read from the tokens, so swapping themes is done in
\`variables.css\` only.
`;

/* ---------------------------------------------------------------- main */
const components = [
  ['button', 'Button', buttonBody],
  ['input', 'Input', inputBody],
  ['modal', 'Modal', modalBody],
  ['table', 'Table', tableBody],
  ['tabs', 'Tabs', tabsBody],
  ['badge', 'Badge', badgeBody],
  ['toast', 'Toast', toastBody],
  ['dropdown', 'Dropdown', dropdownBody],
  ['form', 'Form', formBody],
  ['alert', 'Alert', alertBody],
];

for (const [id, title, body] of components) {
  writeIfChanged(path.join(OUT, `${id}.html`), page(title, body));
}
writeIfChanged(path.join(OUT, 'README.md'), README);
console.log(`[gen-alpine] wrote ${components.length} components + README.md -> ${OUT}`);