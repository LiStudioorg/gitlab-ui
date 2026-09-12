'use strict';
/* gen-htmx.js — regenerates dist/htmx/components/*.html (htmx fragments + Tailwind).
 * Fragments carry no full page skeleton; they are meant to be mounted in a host
 * page (see README.md). Pajamas-inspired (MIT). Repeatable: run `node scripts/gen-htmx.js`. */
const path = require('path');
const { ICONS, writeIfChanged, FRAMEWORKS } = require('./gen-lib.js');
const OUT = FRAMEWORKS.htmx;

const v = (name) => `var(${name})`;
const bv = (name) => `bg-[${v(name)}]`;
const tv = (name) => `text-[color:${v(name)}]`;
const fsv = (name) => `text-[length:${v(name)}]`;

const STYLE = `<style>
      :focus-visible { outline: none; box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color); }
      .spin { animation: gl-spin .8s linear infinite; }
      @keyframes gl-spin { to { transform: rotate(360deg); } }
      .htmx-indicator { display: none; }
      .htmx-request .htmx-indicator, .htmx-request.htmx-indicator { display: inline-flex; }
    </style>`;

const FRAGMENTS = [];

/* ---------------------------------------------------------------- button */
FRAGMENTS.push(`<!-- Pajamas-inspired (MIT). htmx fragment: button -->
${STYLE}
<div class="flex flex-wrap gap-3 items-center" style="color: var(--gl-text-color-default)">
  <button
    hx-post="/save" hx-target="#btn-result" hx-swap="innerHTML"
    hx-indicator="#btn-spinner" hx-disabled-elt="this"
    class="inline-flex items-center gap-2 rounded-[var(--gl-button-border-radius)] ${bv('--gl-button-confirm-primary-background-color-default')} ${tv('--gl-button-confirm-primary-foreground-color-default')} px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] font-bold htmx-request:${bv('--gl-action-disabled-background-color')}">
    <svg id="btn-spinner" class="htmx-indicator w-4 h-4 spin" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2" opacity="0.35"/><path d="M14 8a6 6 0 0 0-6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
    Save changes
  </button>
  <button
    hx-post="/delete" hx-target="#btn-result" hx-swap="innerHTML" hx-confirm="Delete? This cannot be undone."
    class="inline-flex items-center rounded-[var(--gl-button-border-radius)] ${bv('--gl-button-danger-primary-background-color-default')} ${tv('--gl-button-danger-primary-foreground-color-default')} px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] font-bold">Danger (confirm)</button>
  <button disabled class="inline-flex items-center rounded-[var(--gl-button-border-radius)] ${bv('--gl-action-disabled-background-color')} ${tv('--gl-action-disabled-foreground-color')} px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] font-bold cursor-not-allowed">Disabled</button>
  <a href="#"
     class="inline-flex items-center rounded-[var(--gl-button-link-border-radius)] px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] font-bold underline"
     style="color: var(--gl-button-link-text-color-default); border: 1px solid transparent">Link</a>
  <button hx-boost="true" class="w-full flex items-center justify-center rounded-[var(--gl-button-border-radius)] ${bv('--gl-button-danger-secondary-background-color-default')} ${tv('--gl-button-danger-secondary-foreground-color-default')} px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] font-bold">Block (hx-boost)</button>
</div>
<div id="btn-result" role="status" style="color: var(--gl-text-color-subtle); margin-top: var(--gl-spacing-scale-3)">Server response lands here.</div>`);

/* ---------------------------------------------------------------- input */
FRAGMENTS.push(`<!-- Pajamas-inspired (MIT). htmx fragment: input -->
${STYLE}
<div style="color: var(--gl-text-color-default)">
  <label class="block font-bold mb-2" style="color: var(--gl-text-color-strong)">Email (server-side validation,
    hx-trigger="change, keyup changed delay:500ms")</label>
  <input type="email" name="email" placeholder="name@example.com"
         hx-post="/validate" hx-trigger="change, keyup changed delay:500ms"
         hx-target="#email-feedback" hx-swap="innerHTML" hx-sync="closest form:abort"
         class="w-full lg:w-[420px] border rounded-[var(--gl-control-border-radius)] px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] placeholder-[var(--gl-control-placeholder-color)] border-[var(--gl-control-border-color-default)] hover:border-[var(--gl-control-border-color-hover)] focus:border-[var(--gl-control-border-color-focus)]"
         style="background-color: var(--gl-control-background-color-default); color: var(--gl-text-color-default)">
  <p id="email-feedback" class="mt-2 ${fsv('--gl-font-size-sm')}" style="color: var(--gl-text-color-subtle)">Server returns an
    is-invalid/is-valid fragment to swap.</p>

  <div class="flex gap-3 mt-[var(--gl-spacing-scale-4)]">
    <input hx-post="/width-demo" hx-trigger="change" hx-target="#width-result" hx-swap="innerHTML"
           class="w-full max-w-[var(--gl-spacing-scale-31)] border border-[var(--gl-control-border-color-default)] rounded-[var(--gl-control-border-radius)] px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)]" placeholder="xs width">
    <span id="width-result"></span>
  </div>
</div>`);

/* ---------------------------------------------------------------- modal */
FRAGMENTS.push(`<!-- Pajamas-inspired (MIT). htmx fragment: modal -->
${STYLE}
<div>
  <button
    hx-get="/more/modal-content.html" hx-target="#modal-slot" hx-swap="innerHTML"
    class="rounded-[var(--gl-button-border-radius)] ${bv('--gl-button-default-primary-background-color-default')} ${tv('--gl-button-default-primary-foreground-color-default')} px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] font-bold"
    onclick="document.getElementById('gl-dialog').showModal()">Open dialog</button>

  <dialog id="gl-dialog" class="w-full rounded-[var(--gl-modal-border-radius)]" style="max-width: var(--gl-spacing-scale-48); background-color: var(--gl-background-color-default); color: var(--gl-text-color-default); box-shadow: var(--gl-shadow-lg); border: 0; padding: 0">
    <div>
      <div class="flex items-center justify-between" style="padding: var(--gl-spacing-scale-4) var(--gl-spacing-scale-5)">
        <h3 class="${fsv('--gl-heading-scale-500-font-size')} font-bold m-0" style="color: var(--gl-text-color-heading)">Delete project</h3>
        <form method="dialog"><button class="bg-transparent border-0 cursor-pointer rounded" style="color: var(--gl-text-color-subtle)">${ICONS.x}</button></form>
      </div>
      <div style="padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-5) var(--gl-spacing-scale-5)">
        <p>You are about to remove <strong id="modal-slot">my-project</strong>. This action cannot be undone.</p>
      </div>
      <div class="flex flex-col sm:flex-row gap-3" style="padding: var(--gl-spacing-scale-4) var(--gl-spacing-scale-5) var(--gl-spacing-scale-5)">
        <button hx-post="/projects/delete" hx-target="#modal-slot"
                class="rounded-[var(--gl-button-border-radius)] ${bv('--gl-button-danger-primary-background-color-default')} ${tv('--gl-button-danger-primary-foreground-color-default')} px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] font-bold">Delete</button>
        <form method="dialog"><button class="rounded-[var(--gl-button-border-radius)] ${bv('--gl-button-default-secondary-background-color-default')} ${tv('--gl-button-default-secondary-foreground-color-default')} px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] font-bold">Cancel</button></form>
      </div>
    </div>
  </dialog>
</div>`);

/* ---------------------------------------------------------------- table */
FRAGMENTS.push(`<!-- Pajamas-inspired (MIT). htmx fragment: table -->
${STYLE}
<div>
  <div class="htmx-indicator flex items-center gap-2 mb-3" style="color: var(--gl-text-color-strong)"><span class="spin inline-flex">${ICONS.spinner}</span> Loading&hellip;</div>
  <table class="w-full border-collapse ${fsv('--gl-font-size-base')}" style="color: var(--gl-text-color-default)">
    <thead>
      <tr>
        <th hx-get="/table?sort=name" hx-target="#gl-table-body" hx-swap="innerHTML" hx-indicator="closest div"
            class="text-left font-bold px-3 py-3 cursor-pointer select-none whitespace-nowrap"
            style="color: var(--gl-text-color-subtle); box-shadow: inset 0 -1px 0 var(--gl-border-color-default)">Name <span style="color: var(--gl-table-sorting-icon-color)">&uarr;</span></th>
        <th hx-get="/table?sort=status" hx-target="#gl-table-body" hx-swap="innerHTML"
            class="text-left font-bold px-3 py-3 cursor-pointer select-none whitespace-nowrap"
            style="color: var(--gl-text-color-subtle); box-shadow: inset 0 -1px 0 var(--gl-border-color-default)">Status</th>
        <th hx-get="/table?sort=duration" hx-target="#gl-table-body" hx-swap="innerHTML"
            class="text-left font-bold px-3 py-3 cursor-pointer select-none whitespace-nowrap"
            style="color: var(--gl-text-color-subtle); box-shadow: inset 0 -1px 0 var(--gl-border-color-default)">Duration</th>
      </tr>
    </thead>
    <tbody id="gl-table-body" class="hover:${bv('--gl-table-row-background-color-hover')}">
      <tr><td class="px-3 py-3">main</td><td class="px-3 py-3">passed</td><td class="px-3 py-3">12m 04s</td></tr>
      <tr><td class="px-3 py-3">feature/ui</td><td class="px-3 py-3">running</td><td class="px-3 py-3">8m 51s</td></tr>
      <tr><td class="px-3 py-3">hotfix/auth</td><td class="px-3 py-3">failed</td><td class="px-3 py-3">3m 02s</td></tr>
      <tr hx-trigger="revealed" hx-get="/table?page=2" hx-target="#gl-table-body" hx-swap="innerHTML"><td class="px-3 py-3 text-center" colspan="3" style="color: var(--gl-text-color-subtle)">scroll to load page 2 (hx-trigger=revealed)</td></tr>
    </tbody>
  </table>
</div>`);

/* ---------------------------------------------------------------- tabs */
FRAGMENTS.push(`<!-- Pajamas-inspired (MIT). htmx fragment: tabs -->
${STYLE}
<div style="color: var(--gl-text-color-default)">
  <div class="flex gap-2 overflow-x-auto border-b" style="border-color: var(--gl-border-color-default)">
    <button hx-get="/tabs?tab=overview" hx-target="#tab-content" hx-swap="innerHTML"
            hx-on:click="this.parentElement.querySelectorAll('button').forEach(b => { b.removeAttribute('data-active'); b.setAttribute('aria-selected', 'false'); }); this.setAttribute('data-active', 'true'); this.setAttribute('aria-selected', 'true');"
            data-active="true" aria-selected="true"
            class="gl-tab-btn relative inline-flex items-center gap-2 px-4 py-4 ${fsv('--gl-font-size-base')} whitespace-nowrap bg-transparent border-0 cursor-pointer"
            style="color: var(--gl-text-color-strong)">Overview <span class="inline-flex items-center rounded-[var(--gl-border-radius-full)] ${bv('--gl-badge-neutral-background-color-default')} px-2 ${fsv('--gl-font-size-sm')} font-bold" style="color: var(--gl-badge-neutral-text-color-default)">3</span></button>
    <button hx-get="/tabs?tab=commits" hx-target="#tab-content" hx-swap="innerHTML"
            hx-on:click="this.parentElement.querySelectorAll('button').forEach(b => { b.removeAttribute('data-active'); b.setAttribute('aria-selected', 'false'); }); this.setAttribute('data-active', 'true'); this.setAttribute('aria-selected', 'true');"
            aria-selected="false"
            class="gl-tab-btn relative inline-flex items-center gap-2 px-4 py-4 ${fsv('--gl-font-size-base')} whitespace-nowrap bg-transparent border-0 cursor-pointer"
            style="color: var(--gl-text-color-subtle)">Commits</button>
    <button hx-get="/tabs?tab=ci" hx-target="#tab-content" hx-swap="innerHTML"
            hx-on:click="this.parentElement.querySelectorAll('button').forEach(b => { b.removeAttribute('data-active'); b.setAttribute('aria-selected', 'false'); }); this.setAttribute('data-active', 'true'); this.setAttribute('aria-selected', 'true');"
            aria-selected="false"
            class="gl-tab-btn relative inline-flex items-center gap-2 px-4 py-4 ${fsv('--gl-font-size-base')} whitespace-nowrap bg-transparent border-0 cursor-pointer"
            style="color: var(--gl-text-color-subtle)">Pipelines <span class="inline-flex items-center rounded-[var(--gl-border-radius-full)] ${bv('--gl-badge-neutral-background-color-default')} px-2 ${fsv('--gl-font-size-sm')} font-bold" style="color: var(--gl-badge-neutral-text-color-default)">12</span></button>
  </div>
  <div id="tab-content" class="py-5" style="padding: var(--gl-spacing-scale-5) 0; color: var(--gl-text-color-default)">Overview content. Tab clicks swap this pane from the server.</div>
</div>`);

/* ---------------------------------------------------------------- badge */
FRAGMENTS.push(`<!-- Pajamas-inspired (MIT). htmx fragment: badge -->
${STYLE}
<div style="color: var(--gl-text-color-default)">
  <div class="flex flex-wrap gap-3 items-center">
    <span class="inline-flex items-center gap-2 rounded-[var(--gl-border-radius-full)] ${bv('--gl-badge-neutral-background-color-default')} ${tv('--gl-badge-neutral-text-color-default')} px-2 py-1 ${fsv('--gl-font-size-sm')} font-bold">neutral</span>
    <span class="inline-flex items-center gap-2 rounded-[var(--gl-border-radius-full)] ${bv('--gl-badge-info-background-color-default')} ${tv('--gl-badge-info-text-color-default')} px-2 py-1 ${fsv('--gl-font-size-sm')} font-bold">info</span>
    <span class="inline-flex items-center gap-2 rounded-[var(--gl-border-radius-full)] ${bv('--gl-badge-success-background-color-default')} ${tv('--gl-badge-success-text-color-default')} px-2 py-1 ${fsv('--gl-font-size-sm')} font-bold">${ICONS.check} Passed</span>
    <span class="inline-flex items-center gap-2 rounded-[var(--gl-border-radius-full)] ${bv('--gl-badge-warning-background-color-default')} ${tv('--gl-badge-warning-text-color-default')} px-2 py-1 ${fsv('--gl-font-size-sm')} font-bold">warning</span>
    <span class="inline-flex items-center gap-2 rounded-[var(--gl-border-radius-full)] ${bv('--gl-badge-danger-background-color-default')} ${tv('--gl-badge-danger-text-color-default')} px-2 py-1 ${fsv('--gl-font-size-sm')} font-bold">${ICONS.error} Failed</span>
    <span class="inline-flex items-center gap-2 rounded-[var(--gl-border-radius-full)] ${bv('--gl-badge-tier-background-color-default')} ${tv('--gl-badge-tier-text-color-default')} px-2 py-1 ${fsv('--gl-font-size-sm')} font-bold">Premium</span>
    <a href="#" class="inline-flex items-center rounded-[var(--gl-border-radius-full)] ${bv('--gl-badge-success-background-color-default')} ${tv('--gl-badge-success-text-color-default')} px-2 py-1 ${fsv('--gl-font-size-sm')} font-bold no-underline hover:shadow-[inset_0_0_0_1px_var(--gl-border-color-strong)]">link badge</a>
    <button hx-get="/badge.html" hx-target="#badge-slot" hx-swap="innerHTML"
            class="inline-flex items-center rounded-[var(--gl-border-radius-full)] ${bv('--gl-button-link-text-color-default')} px-2 py-1 ${fsv('--gl-font-size-sm')} font-bold cursor-pointer" style="color: var(--gl-button-link-text-color-default)">+ load ></button>
  </div>
  <div id="badge-slot" class="mt-3"></div>
</div>`);

/* ---------------------------------------------------------------- toast */
FRAGMENTS.push(`<!-- Pajamas-inspired (MIT). htmx fragment: toast -->
${STYLE}
<div aria-live="polite">
  <button hx-get="/toast/new.html" hx-target="#toaster" hx-swap="beforeend"
          class="rounded-[var(--gl-button-border-radius)] ${bv('--gl-button-default-primary-background-color-default')} ${tv('--gl-button-default-primary-foreground-color-default')} px-3 py-3 font-bold">Show toast</button>

  <div id="toaster" class="fixed flex flex-col gap-3 pointer-events-none" style="bottom: var(--gl-spacing-scale-6); left: var(--gl-spacing-scale-6); z-index: var(--gl-zindex-200); max-width: calc(100vw - var(--gl-spacing-scale-12))">
    <div class="flex items-center gap-3 rounded-[var(--gl-border-radius-full)] pointer-events-auto"
         style="background-color: var(--gl-feedback-strong-background-color); color: var(--gl-feedback-strong-text-color); box-shadow: var(--gl-shadow-md); padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-4)"
         hx-delete="/dismiss" hx-trigger="load delay:5s" hx-swap="outerHTML">
      <span class="flex-1">Auto-hides after 5s (hx-trigger="load delay:5s").</span>
      <button class="font-bold bg-transparent border-0 cursor-pointer" style="color: var(--gl-feedback-strong-link-color)" hx-post="/undo">Undo</button>
      <button class="bg-transparent border-0 cursor-pointer" style="color: var(--gl-feedback-strong-text-color)" hx-delete="/dismiss" hx-target="closest div" hx-swap="outerHTML" aria-label="Dismiss">${ICONS.x}</button>
    </div>
  </div>
</div>`);

/* ------------------------------------------------------------ dropdown */
FRAGMENTS.push(`<!-- Pajamas-inspired (MIT). htmx fragment: dropdown -->
${STYLE}
<div style="color: var(--gl-text-color-default)">
  <div class="relative inline-block">
    <button hx-on:click="document.getElementById('gl-dd-menu').toggleAttribute('hidden')"
            class="inline-flex items-center gap-2 rounded-[var(--gl-button-border-radius)] ${bv('--gl-button-default-secondary-background-color-default')} ${tv('--gl-button-default-secondary-foreground-color-default')} px-3 py-3 font-bold">Filter: All <span>&#9662;</span></button>
    <div id="gl-dd-menu" hidden class="absolute left-0 z-[var(--gl-zindex-3)] min-w-[230px]"
         style="top: calc(100% + var(--gl-spacing-scale-2)); background-color: var(--gl-dropdown-background-color); border: 1px solid var(--gl-dropdown-border-color); border-radius: var(--gl-dropdown-border-radius); box-shadow: var(--gl-shadow-sm); padding: var(--gl-spacing-scale-2)">
      <div class="px-3 py-2 ${fsv('--gl-font-size-sm')} font-bold" style="color: var(--gl-text-color-subtle)">Status</div>
      <button hx-post="/filter?v=open"
              class="flex items-center justify-between w-full text-left px-3 py-2 rounded cursor-pointer ${tv('--gl-text-color-strong')}"
              style="font-weight: var(--gl-font-weight-bold); background-color: var(--gl-dropdown-option-background-color-selected-default)">Open ${ICONS.check}</button>
      <button hx-post="/filter?v=wait" hx-on:click="this.insertAdjacentHTML('beforeend', '${ICONS.check.replace(/"/g, "'")}')"
              class="flex items-center justify-between w-full text-left px-3 py-2 rounded cursor-pointer ${tv('--gl-text-color-default')}">Wait</button>
      <button hx-post="/filter?v=closed"
              class="flex items-center justify-between w-full text-left px-3 py-2 rounded cursor-pointer ${tv('--gl-text-color-default')}">Closed</button>
      <div style="height: 1px; margin: var(--gl-spacing-scale-2); background-color: var(--gl-dropdown-divider-color)"></div>
      <button hx-post="/filter?clear=1" hx-on:click="document.getElementById('gl-dd-menu').toggleAttribute('hidden')"
              class="block w-full text-left px-3 py-2 bg-transparent border-0 cursor-pointer ${fsv('--gl-font-size-sm')}" style="color: var(--gl-text-color-link)">Clear all</button>
    </div>
  </div>
</div>`);

/* ---------------------------------------------------------------- form */
FRAGMENTS.push(`<!-- Pajamas-inspired (MIT). htmx fragment: form -->
${STYLE}
<form hx-post="/projects" hx-target="#form-result" hx-swap="outerHTML" hx-indicator="#form-spinner" style="color: var(--gl-text-color-default)">
  <div style="margin-bottom: var(--gl-spacing-scale-5)">
    <label class="block font-bold mb-2" style="color: var(--gl-text-color-strong)">Project name *</label>
    <span class="block mb-2 ${fsv('--gl-font-size-sm')}" style="color: var(--gl-text-color-subtle)">Remember: the name cannot be changed later.</span>
    <input type="text" name="name"
           class="w-full lg:w-[520px] border border-[var(--gl-control-border-color-default)] rounded-[var(--gl-control-border-radius)] px-3 py-3"
           style="background-color: var(--gl-control-background-color-default); color: var(--gl-text-color-default)">
  </div>

  <div style="margin-bottom: var(--gl-spacing-scale-5)">
    <label class="block font-bold mb-2" style="color: var(--gl-text-color-strong)">Slug <span class="font-normal" style="color: var(--gl-text-color-subtle)">(optional)</span></label>
    <input type="text" name="slug" placeholder="auto-generated"
           class="w-full lg:w-[520px] border border-[var(--gl-control-border-color-default)] rounded-[var(--gl-control-border-radius)] px-3 py-3 placeholder-[var(--gl-control-placeholder-color)]"
           style="background-color: var(--gl-control-background-color-default); color: var(--gl-text-color-default)">
    <p class="mt-2 ${fsv('--gl-font-size-sm')}" style="color: var(--gl-text-color-subtle)">Used in the repository URL.</p>
  </div>

  <div style="margin-bottom: var(--gl-spacing-scale-5)">
    <label class="block font-bold mb-2" style="color: var(--gl-text-color-strong)">Email *</label>
    <input type="email" name="email"
           hx-trigger="change" hx-post="/validate" hx-target="closest div .js-feedback" hx-swap="innerHTML"
           class="w-full lg:w-[520px] border border-[var(--gl-control-border-color-default)] rounded-[var(--gl-control-border-radius)] px-3 py-3"
           style="background-color: var(--gl-control-background-color-default); color: var(--gl-text-color-default)">
    <p class="js-feedback mt-2 ${fsv('--gl-font-size-sm')}" style="color: var(--gl-text-color-subtle)">Server validation feedback swaps here.</p>
  </div>

  <div class="flex gap-3 items-center">
    <button type="submit" class="inline-flex items-center gap-2 rounded-[var(--gl-button-border-radius)] ${bv('--gl-button-confirm-primary-background-color-default')} ${tv('--gl-button-confirm-primary-foreground-color-default')} px-3 py-3 font-bold">
      <svg id="form-spinner" class="htmx-indicator w-4 h-4 spin" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2" opacity="0.35"/><path d="M14 8a6 6 0 0 0-6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      Create project
    </button>
    <button type="reset" class="rounded-[var(--gl-button-border-radius)] ${bv('--gl-button-default-secondary-background-color-default')} ${tv('--gl-button-default-secondary-foreground-color-default')} px-3 py-3 font-bold">Cancel</button>
  </div>
</form>
<div id="form-result" role="status" style="color: var(--gl-text-color-subtle); margin-top: var(--gl-spacing-scale-4)">Submission response lands here.</div>`);

/* ---------------------------------------------------------------- alert */
FRAGMENTS.push(`<!-- Pajamas-inspired (MIT). htmx fragment: alert -->
${STYLE}
<div style="color: var(--gl-text-color-default)">
  <div id="alert-slot">
    <div class="flex gap-3 rounded-[var(--gl-alert-border-radius)]" role="alert"
         style="background-color: var(--gl-alert-danger-background-color); border: 1px solid var(--gl-alert-danger-border-color); padding: var(--gl-spacing-scale-4); margin-bottom: var(--gl-spacing-scale-3)">
      <span class="inline-flex" style="color: var(--gl-feedback-danger-icon-color)">${ICONS.error}</span>
      <div class="flex-1">
        <h3 class="font-bold m-0 mb-1" style="color: var(--gl-alert-danger-title-color); font-size: var(--gl-font-size-base)">Build failed</h3>
        <p class="m-0">Job 3 timed out. Retry or inspect the logs.</p>
      </div>
      <button hx-delete="/alerts/1" hx-target="closest .flex" hx-swap="outerHTML" hx-on::after-request="this.closest('div#alert-slot').remove()"
              class="bg-transparent border-0 cursor-pointer" style="color: var(--gl-text-color-subtle)" aria-label="Dismiss">${ICONS.x}</button>
    </div>
  </div>

  <div class="flex gap-3 rounded-[var(--gl-alert-border-radius)]" role="status" style="background-color: var(--gl-alert-info-background-color); border: 1px solid var(--gl-alert-info-border-color); padding: var(--gl-spacing-scale-4); margin-bottom: var(--gl-spacing-scale-3)">
    <span class="inline-flex" style="color: var(--gl-feedback-info-icon-color)">${ICONS.info}</span>
    <div class="flex-1">
      <h3 class="font-bold m-0 mb-1" style="color: var(--gl-alert-info-title-color); font-size: var(--gl-font-size-base)">Information</h3>
      <p class="m-0">A scheduled maintenance window starts at 02:00 UTC.</p>
    </div>
  </div>

  <div class="flex gap-3 rounded-[var(--gl-alert-border-radius)]" role="status" style="background-color: var(--gl-alert-warning-background-color); border: 1px solid var(--gl-alert-warning-border-color); padding: var(--gl-spacing-scale-4); margin-bottom: var(--gl-spacing-scale-3)">
    <span class="inline-flex" style="color: var(--gl-feedback-warning-icon-color)">${ICONS.warning}</span>
    <div class="flex-1">
      <h3 class="font-bold m-0 mb-1" style="color: var(--gl-alert-warning-title-color); font-size: var(--gl-font-size-base)">Warning</h3>
      <p class="m-0">This branch has unmerged changes.</p>
    </div>
    <button hx-get="/alert.html" hx-target="#alert-slot" hx-swap="innerHTML" class="bg-transparent border-0 cursor-pointer ${fsv('--gl-font-size-sm')}" style="color: var(--gl-text-color-link)">load more &rarr;</button>
  </div>
</div>`);

/* ---------------------------------------------------------------- README */
const README = `# htmx + Tailwind components (server-driven fragments)

Each \`*.html\` file is a **fragment** (no full page skeleton). It uses htmx
attributes (\`hx-get\` / \`hx-post\` / \`hx-delete\` / \`hx-trigger\` /
\`hx-target\` / \`hx-swap\` / \`hx-indicator\`) and Tailwind classes with
\`var(--gl-*)\` arbitrary values for all colors, radii and spacing.

## Files

| File | htmx features demonstrated |
|---|---|
| button.html | hx-post + hx-indicator spinner + hx-disabled-elt + hx-confirm |
| input.html | hx-trigger="change, keyup changed delay:500ms" server validation |
| modal.html | native <dialog> + hx-get content injection |
| table.html | sortable header hx-get, hx-trigger="revealed" infinite rows |
| tabs.html | hx-get pane swapping with active tab styling |
| badge.html | static capsule variants + hx-get load-more |
| toast.html | auto-hide via hx-trigger="load delay:5s", hx-delete dismiss |
| dropdown.html | menu toggle via hx-on:click, checkable items, clear all |
| form.html | hx-post submit + inline validation with hx-indicator |
| alert.html | dismiss via hx-delete targeting closest, load-more |

## Mounting the fragments

Fragments are NOT standalone pages. Mount one in any host page that already
loads htmx, Tailwind (Play CDN) and the token stylesheet:

\`\`\`html
<head>
  <link rel="stylesheet" href="../css/variables.css">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/htmx.org@1.9.12"></script>
</head>
<body>
  <div id="slot"></div>
  <script>
    // stream a fragment into a slot on load
    htmx.ajax('GET', 'components/button.html', { target: '#slot', swap: 'innerHTML' });
  </script>
</body>
\`\`\`

Or paste the fragment's markup directly into your page. Point the
\`hx-*\` URLs at your backend (the fragments assume endpoints that return
the swapped HTML fragments, e.g. a validated field or a sorted table body).
`;

/* ---------------------------------------------------------------- main */
for (const [i, id] of ['button', 'input', 'modal', 'table', 'tabs', 'badge', 'toast', 'dropdown', 'form', 'alert'].entries()) {
  writeIfChanged(path.join(OUT, `${id}.html`), FRAGMENTS[i].trim() + '\n');
}
writeIfChanged(path.join(OUT, 'README.md'), README);
console.log(`[gen-htmx] wrote ${FRAGMENTS.length} components + README.md -> ${OUT}`);