'use strict';
/* gen-native.js — regenerates the 5 native/component packs from scripts/component-spec.js:
 *   Angular           -> dist/angular/components   (ts/html/css, var(--gl-*) tokens)
 *   Flutter widgets   -> dist/flutter/widgets      (imports ../tokens.dart)
 *   React Native      -> dist/react-native/components (imports ../tokens colors)
 *   SwiftUI           -> dist/swiftui              (DesignTokens.swift + views)
 *   Jetpack Compose   -> dist/compose/components   (imports com.example.pajamas.*)
 * Pajamas-inspired (MIT). Idempotent: safe to re-run; token files are patched in place
 * only when an entry is missing.
 */
const fs = require('fs');
const path = require('path');
const lib = require('./gen-lib.js');
const spec = require('./component-spec.js');

const ROOT = lib.ROOT;
const write = lib.writeIfChanged;

/* ------------------------------------------------------------ token reading */
const tokMap = {};
for (const line of lib.cssText.split('\n')) {
  const m = line.match(/^\s*(--[a-z0-9-]+):\s*(.*?)\s*;\s*$/);
  if (m && !(m[1] in tokMap)) tokMap[m[1]] = m[2].trim();
}
const real = (n) => lib.REMAP[n] || n;

function resolve(name, depth = 0) {
  const v = tokMap[name];
  if (v == null) return null;
  const m = v.match(/^var\((--[a-z0-9-]+)\)$/);
  if (m && depth < 6) return resolve(m[1], depth + 1);
  return v;
}
function tokVal(name) {
  const v = resolve(real(name));
  if (v == null) throw new Error('token not found in variables.css: ' + name);
  return v;
}
const cssVar = (name) => `var(${real(name)})`;

function toHex(value) {
  value = String(value).trim();
  let m = value.match(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/);
  if (m) {
    let h = m[1];
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    return '#' + h.toLowerCase();
  }
  const byte = (n) => Math.max(0, Math.min(255, Math.round(+n))).toString(16).padStart(2, '0');
  m = value.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)$/);
  if (m) {
    const rgb = byte(m[1]) + byte(m[2]) + byte(m[3]);
    return '#' + (m[4] != null ? rgb + byte(Math.round(+m[4] * 255)) : rgb);
  }
  return null;
}
function rem2px(value) {
  value = String(value == null ? '' : value).trim();
  let m = value.match(/^([\d.]+)rem$/);
  if (m) return Math.round(parseFloat(m[1]) * 16);
  m = value.match(/^([\d.]+)px$/);
  if (m) return parseFloat(m[1]);
  return null;
}
/* hex #RRGGBB[AA] -> 0xAARRGGBB (Dart/Kotlin literal) */
function toArgb(hex) {
  const h = toHex(hex);
  if (!h) return null;
  const a = h.length === 9 ? h.slice(7) : 'ff';
  return '0x' + (a + h.slice(1, 7)).toUpperCase();
}
const pascal = (s) =>
  s
    .replace(/^--/, '')
    .split('-')
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join('');
/* Flutter getter name: --gl-text-color-default -> gltextcolordefault */
const flGet = (css) => css.replace(/^--gl-/, '').replace(/-/g, '');
/* Kotlin val name: matches build-tokens.js output, e.g. GlGlTextColorDefault */
const ktName = (css) => 'Gl' + pascal(css);
/* SwiftUI member of enum Gl: --gl-text-color-default -> textColorDefault */
const swiftName = (css) => {
  const p = pascal(css.replace(/^--gl-/, ''));
  return p[0].toLowerCase() + p.slice(1);
};

/* ----------------------------------------------------------------- helpers */
const SPINNER_SVG = '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2" opacity="0.35"/><path d="M14 8a6 6 0 0 0-6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
const ICON_SVG = '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><circle cx="8" cy="8" r="3.5" fill="currentColor"/></svg>';
const X_SVG = '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
const CHECK_SVG = '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const CHEVRON_SVG = '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const ARROW_UP = '↑';
const ARROW_DOWN = '↓';

const BTN_COMBOS = [
  'default-primary', 'default-tertiary',
  'confirm-primary', 'confirm-secondary', 'confirm-tertiary',
  'danger-primary', 'danger-secondary', 'danger-tertiary',
];
const BADGE_VARIANTS = ['neutral', 'info', 'success', 'warning', 'danger', 'tier'];
const ALERT_VARIANTS = ['info', 'success', 'warning', 'danger'];

/* ================================================================== ANGULAR */
const ANGULAR = path.join(ROOT, 'dist', 'angular', 'components');

function angHead(sel, cls, extraImports) {
  return `import { Component, EventEmitter, Input, Output } from '@angular/core';
${extraImports || ''}
// Pajamas-inspired (MIT)
@Component({
  selector: '${sel}',
  templateUrl: './${cls}.component.html',
  styleUrls: ['./${cls}.component.css'],
})
`;
}

function angModule(cls) {
  return `import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gl${pascal(cls)}Component } from './${cls}.component';

// Pajamas-inspired (MIT)
@NgModule({
  declarations: [Gl${pascal(cls)}Component],
  imports: [CommonModule],
  exports: [Gl${pascal(cls)}Component],
})
export class Gl${pascal(cls)}Module {}
`;
}

/* ---- button ---- */
function angButton() {
  const ts = `${angHead('gl-button', 'button')}
export class GlButtonComponent {
  @Input() category: 'primary' | 'secondary' | 'tertiary' = 'primary';
  @Input() variant: 'default' | 'confirm' | 'danger' | 'link' = 'default';
  @Input() size: 'small' | 'medium' = 'medium';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() icon = '';
  @Input() block = false;
  @Output() glClick = new EventEmitter<MouseEvent>();

  private static readonly COMBO: Record<string, boolean> = {
    'default-primary': true, 'default-tertiary': true,
    'confirm-primary': true, 'confirm-secondary': true, 'confirm-tertiary': true,
    'danger-primary': true, 'danger-secondary': true, 'danger-tertiary': true,
  };

  get isLink(): boolean {
    return this.variant === 'link';
  }

  get tokenCombo(): string {
    const key = this.variant + '-' + this.category;
    return GlButtonComponent.COMBO[key] ? key : 'default-primary';
  }

  get buttonStyle(): Record<string, string> {
    if (this.isLink) {
      const link = cssVar('--gl-button-link-text-color-default');
      return { '--btn-bg': 'transparent', '--btn-fg': link, '--btn-bd': 'transparent', '--btn-bg-h': 'transparent', '--btn-fg-h': link, '--btn-bd-h': 'transparent', '--btn-bg-a': 'transparent', '--btn-fg-a': link, '--btn-bd-a': 'transparent' };
    }
    const t = this.tokenCombo;
    return {
      '--btn-bg': cssVar('--gl-button-' + t + '-background-color-default'),
      '--btn-fg': cssVar('--gl-button-' + t + '-foreground-color-default'),
      '--btn-bd': cssVar('--gl-button-' + t + '-border-color-default'),
      '--btn-bg-h': cssVar('--gl-button-' + t + '-background-color-hover'),
      '--btn-fg-h': cssVar('--gl-button-' + t + '-foreground-color-hover'),
      '--btn-bd-h': cssVar('--gl-button-' + t + '-border-color-hover'),
      '--btn-bg-a': cssVar('--gl-button-' + t + '-background-color-active'),
      '--btn-fg-a': cssVar('--gl-button-' + t + '-foreground-color-active'),
      '--btn-bd-a': cssVar('--gl-button-' + t + '-border-color-active'),
    };
  }

  get classes(): Record<string, boolean> {
    return {
      'gl-button-link': this.isLink,
      'gl-button-sm': this.size === 'small',
      'gl-block': this.block,
      'is-loading': this.loading,
    };
  }

  get isDisabled(): boolean {
    return this.disabled || this.loading;
  }

  onClick(event: MouseEvent): void {
    if (!this.isDisabled) {
      this.glClick.emit(event);
    }
  }
}

function cssVar(name: string): string {
  return 'var(' + name + ')';
}
`;
  const html = `<!-- Pajamas-inspired (MIT) -->
<button
  type="button"
  class="gl-button"
  [ngStyle]="buttonStyle"
  [ngClass]="classes"
  [disabled]="isDisabled"
  [attr.aria-busy]="loading"
  (click)="onClick($event)"
>
  <span class="gl-button-spinner" *ngIf="loading" aria-hidden="true">${SPINNER_SVG}</span>
  <span class="gl-button-icon" *ngIf="icon && !loading" aria-hidden="true">${ICON_SVG}</span>
  <span class="gl-button-text"><ng-content></ng-content></span>
</button>
`;
  const css = `/* Pajamas-inspired (MIT) */
:host { display: inline-flex; }
button.gl-button {
  display: inline-flex; align-items: center; justify-content: center; gap: 4px;
  font: inherit; font-size: 14px; font-weight: 600; line-height: 20px;
  padding: 6px 12px; border: 1px solid var(--btn-bd, transparent);
  border-radius: ${cssVar('--gl-button-border-radius')};
  cursor: pointer; white-space: nowrap; text-decoration: none;
  background-color: var(--btn-bg, ${cssVar('--gl-button-default-primary-background-color-default')});
  color: var(--btn-fg, ${cssVar('--gl-button-default-primary-foreground-color-default')});
  transition: box-shadow 150ms ease, background-color 150ms ease, color 150ms ease, border-color 150ms ease;
}
button.gl-button:hover:not(:disabled) {
  background-color: var(--btn-bg-h); color: var(--btn-fg-h); border-color: var(--btn-bd-h);
}
button.gl-button:active:not(:disabled) {
  background-color: var(--btn-bg-a); color: var(--btn-fg-a); border-color: var(--btn-bd-a);
}
button.gl-button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px ${cssVar('--gl-focus-ring-inner-color')}, 0 0 0 4px ${cssVar('--gl-focus-ring-outer-color')};
}
button.gl-button:disabled {
  cursor: not-allowed;
  background-color: ${cssVar('--gl-action-disabled-background-color')};
  color: ${cssVar('--gl-action-disabled-foreground-color')};
  border-color: ${cssVar('--gl-action-disabled-border-color')};
}
button.gl-button.is-loading { cursor: progress; }
button.gl-button.gl-button-sm { padding: 2px 8px; font-size: 12px; }
button.gl-button.gl-block { width: 100%; display: flex; }
button.gl-button.gl-button-link {
  background: transparent; border-color: transparent; text-decoration: underline;
  padding-left: 8px; padding-right: 8px;
}
.gl-button-spinner { display: inline-flex; animation: glspin 0.8s linear infinite; }
.gl-button-icon { display: inline-flex; }
@keyframes glspin { to { transform: rotate(360deg); } }
`;
  return { ts, html, css };
}

/* ---- input ---- */
function angInput() {
  const ts = `${angHead('gl-input', 'input')}
export class GlInputComponent {
  @Input() type: 'text' | 'email' | 'number' | 'password' | 'search' | 'url' | 'tel' | 'date' | 'time' = 'text';
  @Input() placeholder = '';
  @Input() state: 'valid' | 'invalid' | null = null;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() width: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | null = null;
  @Input() value = '';
  @Output() glChange = new EventEmitter<string>();
  @Output() glInput = new EventEmitter<string>();

  get widthClass(): string {
    return this.width ? 'gl-form-input-' + this.width : '';
  }

  onValue(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
    this.glInput.emit(this.value);
    this.glChange.emit(this.value);
  }
}
`;
  const html = `<!-- Pajamas-inspired (MIT) -->
<input
  [attr.type]="type"
  class="gl-form-input"
  [ngClass]="[widthClass, state === 'valid' ? 'is-valid' : '', state === 'invalid' ? 'is-invalid' : '', readonly ? 'gl-readonly' : '']"
  [placeholder]="placeholder"
  [value]="value"
  [disabled]="disabled"
  [readonly]="readonly"
  (input)="onValue($event)"
/>
`;
  const css = `/* Pajamas-inspired (MIT) */
:host { display: block; }
input.gl-form-input {
  width: 100%; box-sizing: border-box; font: inherit; font-size: 14px; line-height: 20px;
  padding: 6px 12px;
  border: 1px solid ${cssVar('--gl-control-border-color-default')};
  border-radius: 8px;
  background-color: ${cssVar('--gl-control-background-color-default')};
  color: ${cssVar('--gl-text-color-default')};
  transition: box-shadow 150ms ease, border-color 150ms ease;
}
input.gl-form-input:hover:not(:disabled):not([readonly]) {
  border-color: ${cssVar('--gl-control-border-color-hover')};
}
input.gl-form-input:focus {
  outline: none;
  border-color: ${cssVar('--gl-control-border-color-focus')};
  box-shadow: 0 0 0 2px ${cssVar('--gl-focus-ring-inner-color')}, 0 0 0 4px ${cssVar('--gl-focus-ring-outer-color')};
}
input.gl-form-input::placeholder { color: ${cssVar('--gl-control-placeholder-color')}; }
input.gl-form-input.is-valid { border-color: ${cssVar('--gl-control-text-color-valid')}; }
input.gl-form-input.is-invalid {
  border-color: ${cssVar('--gl-control-border-color-error')};
  color: ${cssVar('--gl-control-text-color-error')};
}
input.gl-form-input:disabled,
input.gl-form-input.gl-readonly {
  background-color: ${cssVar('--gl-control-background-color-disabled')};
  border-color: ${cssVar('--gl-control-border-color-disabled')};
  cursor: not-allowed;
}
input.gl-form-input-xs { max-width: 12rem; }
input.gl-form-input-sm { max-width: 16rem; }
input.gl-form-input-md { max-width: 24rem; }
input.gl-form-input-lg { max-width: 32rem; }
input.gl-form-input-xl { max-width: 100%; }
`;
  return { ts, html, css };
}

/* ---- modal ---- */
function angModal() {
  const ts = `${angHead('gl-modal', 'modal', "import { HostListener } from '@angular/core';")}
export class GlModalComponent {
  @Input() visible = false;
  @Input() title = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() primaryAction: { text: string; variant?: string } | null = null;
  @Input() secondaryAction: { text: string } | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() glPrimary = new EventEmitter<void>();
  @Output() glSecondary = new EventEmitter<void>();

  get classes(): Record<string, boolean> {
    return {
      'gl-modal-sm': this.size === 'sm',
      'gl-modal-md': this.size === 'md',
      'gl-modal-lg': this.size === 'lg',
    };
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.visible) {
      this.onClose();
    }
  }

  onBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  onClose(): void {
    this.visible = false;
    this.close.emit();
  }

  onPrimary(): void {
    this.glPrimary.emit();
  }

  onSecondary(): void {
    this.glSecondary.emit();
    this.onClose();
  }
}
`;
  const html = `<!-- Pajamas-inspired (MIT) -->
<div *ngIf="visible" class="gl-modal-backdrop" (click)="onBackdrop($event)">
  <div class="gl-modal" [ngClass]="classes" role="dialog" aria-modal="true" [attr.aria-label]="title">
    <div class="gl-modal-header">
      <h4 class="gl-modal-title">{{ title }}</h4>
      <button type="button" class="gl-modal-close" (click)="onClose()" aria-label="Close">${X_SVG}</button>
    </div>
    <div class="gl-modal-body">
      <ng-content></ng-content>
    </div>
    <div class="gl-modal-footer" *ngIf="primaryAction || secondaryAction">
      <button *ngIf="secondaryAction" type="button" class="gl-modal-btn gl-secondary" (click)="onSecondary()">{{ secondaryAction.text }}</button>
      <button *ngIf="primaryAction" type="button" class="gl-modal-btn gl-primary" (click)="onPrimary()">{{ primaryAction.text }}</button>
    </div>
  </div>
</div>
`;
  const css = `/* Pajamas-inspired (MIT) */
.gl-modal-backdrop {
  position: fixed; inset: 0; z-index: ${cssVar('--gl-zindex-4')};
  display: flex; align-items: center; justify-content: center;
  background-color: ${cssVar('--gl-color-alpha-dark-40')};
}
.gl-modal {
  width: 100%; display: flex; flex-direction: column; overflow: hidden;
  background-color: ${cssVar('--gl-background-color-default')};
  border-radius: ${cssVar('--gl-modal-border-radius')};
  box-shadow: ${cssVar('--gl-shadow-lg')};
}
.gl-modal-sm { max-width: 20rem; }
.gl-modal-md { max-width: 24rem; }
.gl-modal-lg { max-width: 48rem; }
.gl-modal-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 16px 8px;
}
.gl-modal-title {
  margin: 0; font-size: ${cssVar('--gl-heading-scale-500-font-size')};
  color: ${cssVar('--gl-text-color-strong')}; font-weight: 600;
}
.gl-modal-close {
  border: 0; background: transparent; cursor: pointer;
  color: ${cssVar('--gl-text-color-subtle')};
  display: inline-flex; padding: 4px;
}
.gl-modal-close:hover { color: ${cssVar('--gl-text-color-strong')}; }
.gl-modal-body { padding: 16px; font-size: 14px; color: ${cssVar('--gl-text-color-default')}; }
.gl-modal-footer {
  display: flex; justify-content: flex-start; gap: 8px;
  padding: 16px; border-top: 1px solid ${cssVar('--gl-border-color-default')};
}
.gl-modal-btn {
  font: inherit; font-size: 14px; font-weight: 600; line-height: 20px;
  padding: 6px 12px; border-radius: 8px; cursor: pointer;
}
.gl-modal-btn.gl-secondary {
  background-color: ${cssVar('--gl-button-default-primary-background-color-default')};
  color: ${cssVar('--gl-button-default-primary-foreground-color-default')};
  border: 1px solid ${cssVar('--gl-button-default-primary-border-color-default')};
}
.gl-modal-btn.gl-primary {
  background-color: ${cssVar('--gl-button-confirm-primary-background-color-default')};
  color: ${cssVar('--gl-button-confirm-primary-foreground-color-default')};
  border: 1px solid transparent;
}
@media (max-width: 640px) { .gl-modal-footer { flex-direction: column; } }
`;
  return { ts, html, css };
}

/* ---- table ---- */
function angTable() {
  const ts = `${angHead('gl-table', 'table')}
export class GlTableComponent {
  @Input() items: Array<Record<string, unknown>> = [];
  @Input() fields: Array<{ key: string; label: string; sortable?: boolean }> = [];
  @Input() loading = false;
  @Input() sortBy: string | null = null;
  @Input() sortDesc = false;
  @Output() glSort = new EventEmitter<{ sortBy: string | null; sortDesc: boolean }>();

  onSort(field: { key: string; sortable?: boolean }): void {
    if (!field.sortable || this.loading) {
      return;
    }
    if (this.sortBy === field.key) {
      this.sortDesc = !this.sortDesc;
    } else {
      this.sortBy = field.key;
      this.sortDesc = false;
    }
    this.glSort.emit({ sortBy: this.sortBy, sortDesc: this.sortDesc });
  }

  arrow(field: { key: string; sortable?: boolean }): string {
    if (!field.sortable || field.key !== this.sortBy) {
      return '';
    }
    return this.sortDesc ? '${ARROW_DOWN}' : '${ARROW_UP}';
  }

  sortedItems(): Array<Record<string, unknown>> {
    if (!this.sortBy) {
      return this.items;
    }
    const key = this.sortBy;
    const dir = this.sortDesc ? -1 : 1;
    return [...this.items].sort((a, b) => {
      const av = String(a ? a[key] : '').toLowerCase();
      const bv = String(b ? b[key] : '').toLowerCase();
      return av < bv ? -dir : av > bv ? dir : 0;
    });
  }

  cell(row: Record<string, unknown>, col: { key: string }): string {
    return row ? String(row[col.key] ?? '') : '';
  }
}
`;
  const html = `<!-- Pajamas-inspired (MIT) -->
<div class="gl-table-wrap">
  <table class="gl-table">
    <thead>
      <tr>
        <th
          *ngFor="let field of fields"
          [class.gl-sortable]="field.sortable"
          (click)="onSort(field)"
        >
          <span class="gl-th-label">{{ field.label }}</span>
          <span class="gl-th-arrow">{{ arrow(field) }}</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let row of sortedItems()">
        <td *ngFor="let col of fields">{{ cell(row, col) }}</td>
      </tr>
    </tbody>
  </table>
  <div *ngIf="loading" class="gl-table-loading" aria-live="polite">
    <span class="gl-spinner">${SPINNER_SVG}</span><span>Loading…</span>
  </div>
  <div *ngIf="!loading && items.length === 0" class="gl-table-empty">No items.</div>
</div>
`;
  const css = `/* Pajamas-inspired (MIT) */
:host { display: block; }
.gl-table-wrap { position: relative; overflow-x: auto; }
table.gl-table {
  width: 100%; border-collapse: collapse;
  font-size: 14px; color: ${cssVar('--gl-text-color-default')};
}
.gl-table thead th {
  text-align: left; padding: 8px 12px; white-space: nowrap;
  box-shadow: inset 0 -1px 0 ${cssVar('--gl-border-color-default')};
  background-color: ${cssVar('--gl-color-alpha-0')};
  color: ${cssVar('--gl-text-color-strong')}; font-weight: 600;
}
.gl-table thead th.gl-sortable { cursor: pointer; user-select: none; }
.gl-table th.gl-sortable:hover .gl-th-label { color: ${cssVar('--gl-table-sorting-icon-color')}; }
.gl-th-arrow { color: ${cssVar('--gl-table-sorting-icon-color')}; font-weight: 700; }
.gl-table tbody td { padding: 8px 12px; border-top: 1px solid ${cssVar('--gl-border-color-default')}; }
.gl-table tbody tr:hover td { background-color: ${cssVar('--gl-table-row-background-color-hover')}; }
.gl-table-loading {
  display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px;
  color: ${cssVar('--gl-text-color-subtle')};
}
.gl-spinner { display: inline-flex; animation: glspin 0.8s linear infinite; }
.gl-table-empty { padding: 24px; text-align: center; color: ${cssVar('--gl-text-color-subtle')}; }
@keyframes glspin { to { transform: rotate(360deg); } }
`;
  return { ts, html, css };
}

/* ---- tabs ---- */
function angTabs() {
  const ts = `${angHead('gl-tabs', 'tabs')}
export class GlTabsComponent {
  @Input() tabs: Array<{ title: string; count?: number; content?: string }> = [];
  @Input() active = 0;
  @Output() glChange = new EventEmitter<number>();

  select(index: number): void {
    if (index === this.active) {
      return;
    }
    this.active = index;
    this.glChange.emit(index);
  }
}
`;
  const html = `<!-- Pajamas-inspired (MIT) -->
<div class="gl-tabs-wrapper">
  <div class="gl-tabs-nav" role="tablist">
    <button
      *ngFor="let tab of tabs; let i = index"
      type="button"
      class="gl-tab-nav-item"
      [class.gl-tab-nav-item-active]="i === active"
      role="tab"
      [attr.aria-selected]="i === active"
      (click)="select(i)"
    >
      <span>{{ tab.title }}</span>
      <span *ngIf="tab.count != null && tab.count >= 0" class="gl-tab-count">{{ tab.count }}</span>
    </button>
  </div>
  <div class="gl-tab-content" role="tabpanel">
    <p *ngIf="tabs[active] && tabs[active]!.content">{{ tabs[active]!.content }}</p>
    <ng-content></ng-content>
  </div>
</div>
`;
  const css = `/* Pajamas-inspired (MIT) */
:host { display: block; }
.gl-tabs-wrapper { border-bottom: 1px solid ${cssVar('--gl-border-color-default')}; }
.gl-tabs-nav { display: flex; }
.gl-tab-nav-item {
  position: relative; border: 0; background: transparent; cursor: pointer;
  font: inherit; font-size: ${cssVar('--gl-font-size-base')};
  padding: 16px 16px; color: ${cssVar('--gl-text-color-default')};
  display: inline-flex; align-items: center; gap: 8px;
}
.gl-tab-nav-item::before {
  content: ''; position: absolute; left: 0; right: 0; bottom: -1px; height: 2px;
  background-color: transparent;
}
.gl-tab-nav-item:hover::before { background-color: ${cssVar('--gl-border-color-strong')}; }
.gl-tab-nav-item.gl-tab-nav-item-active {
  font-weight: 700; color: ${cssVar('--gl-text-color-strong')};
}
.gl-tab-nav-item.gl-tab-nav-item-active::before {
  background-color: ${cssVar('--gl-tab-selected-indicator-color-default')};
}
.gl-tab-count {
  background-color: ${cssVar('--gl-badge-neutral-background-color-default')};
  color: ${cssVar('--gl-badge-neutral-text-color-default')};
  border-radius: ${cssVar('--gl-border-radius-full')};
  font-size: 12px; padding: 0 8px; line-height: 18px;
}
.gl-tab-content { padding: 12px 0; font-size: ${cssVar('--gl-font-size-base')}; }
`;
  return { ts, html, css };
}

/* ---- badge ---- */
function angBadge() {
  const ts = `${angHead('gl-badge', 'badge')}
export class GlBadgeComponent {
  @Input() variant: 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'tier' = 'neutral';
  @Input() icon: string | null = null;
  @Input() href: string | null = null;

  get tokenTag(): string {
    return 'gl-badge-' + this.variant;
  }
}
`;
  const html = `<!-- Pajamas-inspired (MIT) -->
<a *ngIf="href" class="gl-badge" [ngClass]="tokenTag" [href]="href">
  <span class="gl-badge-icon" *ngIf="icon" aria-hidden="true">${ICON_SVG}</span>
  <span class="gl-badge-content"><ng-content></ng-content></span>
</a>
<span *ngIf="!href" class="gl-badge" [ngClass]="tokenTag">
  <span class="gl-badge-icon" *ngIf="icon" aria-hidden="true">${ICON_SVG}</span>
  <span class="gl-badge-content"><ng-content></ng-content></span>
</span>
`;
  const css = `/* Pajamas-inspired (MIT) */
:host { display: inline-flex; }
.gl-badge {
  display: inline-flex; align-items: center; gap: 4px;
  border-radius: ${cssVar('--gl-border-radius-full')};
  font-size: 12px; font-weight: 600; line-height: 20px;
  padding: 0 8px; text-decoration: none;
  background-color: ${cssVar('--gl-badge-neutral-background-color-default')};
  color: ${cssVar('--gl-badge-neutral-text-color-default')};
}
a.gl-badge { cursor: pointer; }
a.gl-badge:hover { box-shadow: inset 0 0 0 1px currentColor; }
.gl-badge-info { background-color: ${cssVar('--gl-badge-info-background-color-default')}; color: ${cssVar('--gl-badge-info-text-color-default')}; }
.gl-badge-success { background-color: ${cssVar('--gl-badge-success-background-color-default')}; color: ${cssVar('--gl-badge-success-text-color-default')}; }
.gl-badge-warning { background-color: ${cssVar('--gl-badge-warning-background-color-default')}; color: ${cssVar('--gl-badge-warning-text-color-default')}; }
.gl-badge-danger { background-color: ${cssVar('--gl-badge-danger-background-color-default')}; color: ${cssVar('--gl-badge-danger-text-color-default')}; }
.gl-badge-tier { background-color: ${cssVar('--gl-badge-tier-background-color-default')}; color: ${cssVar('--gl-badge-tier-text-color-default')}; }
.gl-badge-icon { display: inline-flex; }
`;
  return { ts, html, css };
}

/* ---- toast ---- */
function angToast() {
  const ts = `${angHead('gl-toast', 'toast', "import { OnDestroy, OnInit } from '@angular/core';")}
export class GlToastComponent implements OnInit, OnDestroy {
  @Input() message = '';
  @Input() action: { text: string; onClick?: () => void } | null = null;
  @Input() autoHideDelay = 5000;
  @Output() glDismiss = new EventEmitter<void>();

  visible = false;
  private timer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    this.visible = true;
    this.timer = setTimeout(() => this.dismiss(), Math.max(this.autoHideDelay, 1000));
  }

  onAction(): void {
    this.action?.onClick?.();
  }

  dismiss(): void {
    if (!this.visible) {
      return;
    }
    this.visible = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.glDismiss.emit();
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
}
`;
  const html = `<!-- Pajamas-inspired (MIT) -->
<div class="gl-toast-stack" *ngIf="visible">
  <div class="gl-toast" role="status" aria-live="polite">
    <div class="gl-toast-body">{{ message }}</div>
    <button *ngIf="action" type="button" class="gl-toast-action" (click)="onAction()">{{ action.text }}</button>
    <button type="button" class="gl-toast-close" (click)="dismiss()" aria-label="Dismiss">${X_SVG}</button>
  </div>
</div>
`;
  const css = `/* Pajamas-inspired (MIT) */
:host { display: block; }
.gl-toast-stack {
  position: fixed; bottom: 24px; left: 24px; z-index: ${cssVar('--gl-zindex-200')};
  display: flex; flex-direction: column; gap: 8px;
}
.gl-toast {
  display: flex; align-items: center; gap: 12px;
  background-color: ${cssVar('--gl-feedback-strong-background-color')};
  color: ${cssVar('--gl-feedback-strong-text-color')};
  border-radius: ${cssVar('--gl-border-radius-full')};
  box-shadow: ${cssVar('--gl-shadow-md')};
  padding: 12px 16px; max-width: 24rem;
}
.gl-toast-body { flex: 1; font-size: 14px; }
.gl-toast-action {
  border: 0; background: transparent; cursor: pointer; padding: 0;
  color: ${cssVar('--gl-feedback-strong-link-color')};
  font-weight: 600; text-decoration: underline;
}
.gl-toast-close {
  border: 0; background: transparent; cursor: pointer; display: inline-flex;
  color: ${cssVar('--gl-feedback-strong-link-color')}; opacity: 0.8;
}
.gl-toast-close:hover { opacity: 1; }
@media (max-width: 640px) { .gl-toast-stack { left: 16px; right: 16px; } }
`;
  return { ts, html, css };
}

/* ---- dropdown ---- */
function angDropdown() {
  const ts = `${angHead('gl-dropdown', 'dropdown')}
export interface GlDropdownItem {
  id: string | number;
  label: string;
  checked?: boolean;
  disabled?: boolean;
  header?: boolean;
  divider?: boolean;
}

export class GlDropdownComponent {
  @Input() text = '';
  @Input() items: GlDropdownItem[] = [];
  @Input() showClearAll = false;
  @Input() disabled = false;
  @Output() glSelect = new EventEmitter<GlDropdownItem>();
  @Output() glClearAll = new EventEmitter<void>();

  open = false;

  toggle(): void {
    if (!this.disabled) {
      this.open = !this.open;
    }
  }

  close(): void {
    this.open = false;
  }

  onSelect(item: GlDropdownItem): void {
    if (item.disabled || item.header || item.divider) {
      return;
    }
    this.glSelect.emit(item);
    this.close();
  }

  clearAll(): void {
    this.glClearAll.emit();
    this.close();
  }
}
`;
  const html = `<!-- Pajamas-inspired (MIT) -->
<div class="gl-dropdown" (document:click)="close()">
  <button type="button" class="gl-dropdown-toggle" [disabled]="disabled" (click)="toggle(); $event.stopPropagation()">
    <span>{{ text }}</span>
    <span class="gl-dropdown-caret" aria-hidden="true">${CHEVRON_SVG}</span>
  </button>
  <div class="gl-dropdown-menu" *ngIf="open" (click)="$event.stopPropagation()" role="menu">
    <ng-container *ngFor="let item of items">
      <div *ngIf="item.header" class="gl-dropdown-header">{{ item.label }}</div>
      <div *ngIf="item.divider" class="gl-dropdown-divider"></div>
      <div
        *ngIf="!item.header && !item.divider"
        class="gl-dropdown-item"
        [class.gl-is-checked]="item.checked"
        [class.gl-is-disabled]="item.disabled"
        role="menuitem"
        (click)="onSelect(item)"
      >
        <span class="gl-dropdown-check" aria-hidden="true">${CHECK_SVG}</span>
        <span class="gl-dropdown-label">{{ item.label }}</span>
      </div>
    </ng-container>
    <div class="gl-dropdown-clear" *ngIf="showClearAll">
      <button type="button" class="gl-clear-all" (click)="clearAll()">Clear all</button>
    </div>
  </div>
</div>
`;
  const css = `/* Pajamas-inspired (MIT) */
:host { display: inline-block; position: relative; }
.gl-dropdown { position: relative; }
.gl-dropdown-toggle {
  display: inline-flex; align-items: center; gap: 8px;
  font: inherit; font-size: 14px; font-weight: 600; line-height: 20px;
  padding: 6px 12px;
  border: 1px solid ${cssVar('--gl-button-default-primary-border-color-default')};
  border-radius: ${cssVar('--gl-button-border-radius')};
  background-color: ${cssVar('--gl-button-default-primary-background-color-default')};
  color: ${cssVar('--gl-button-default-primary-foreground-color-default')};
  cursor: pointer;
}
.gl-dropdown-toggle:disabled {
  cursor: not-allowed;
  color: ${cssVar('--gl-action-disabled-foreground-color')};
  background-color: ${cssVar('--gl-action-disabled-background-color')};
}
.gl-dropdown-caret { display: inline-flex; }
.gl-dropdown-menu {
  position: absolute; top: calc(100% + 4px); left: 0; min-width: 12rem;
  background-color: ${cssVar('--gl-dropdown-background-color')};
  border: 1px solid ${cssVar('--gl-dropdown-border-color')};
  border-radius: ${cssVar('--gl-dropdown-border-radius')};
  box-shadow: ${cssVar('--gl-shadow-sm')};
  z-index: ${cssVar('--gl-zindex-3')};
  overflow: hidden;
}
.gl-dropdown-header {
  padding: 8px 16px 4px; font-size: 12px; font-weight: 700;
  color: ${cssVar('--gl-text-color-subtle')}; text-transform: uppercase;
}
.gl-dropdown-divider { height: 1px; background-color: ${cssVar('--gl-dropdown-divider-color')}; }
.gl-dropdown-item {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 16px; cursor: pointer; font-size: 14px;
  color: ${cssVar('--gl-dropdown-option-text-color-default')};
}
.gl-dropdown-item:hover { background-color: ${cssVar('--gl-dropdown-option-background-color-selected-hover')}; }
.gl-dropdown-item.gl-is-checked { background-color: ${cssVar('--gl-dropdown-option-background-color-selected-default')}; }
.gl-dropdown-item.gl-is-disabled { color: ${cssVar('--gl-dropdown-option-text-color-disabled')}; cursor: not-allowed; }
.gl-dropdown-check { display: inline-flex; visibility: hidden; }
.gl-dropdown-item.gl-is-checked .gl-dropdown-check { visibility: visible; }
.gl-dropdown-clear { border-top: 1px solid ${cssVar('--gl-dropdown-divider-color')}; padding: 4px 16px; }
.gl-dropdown-clear button.gl-clear-all {
  border: 0; background: transparent; cursor: pointer; font-size: 12px;
  color: ${cssVar('--gl-button-link-text-color-default')}; text-decoration: underline;
}
`;
  return { ts, html, css };
}

/* ---- form ---- */
function angForm() {
  const ts = `${angHead('gl-form', 'form')}
export class GlFormComponent {
  @Input() label = '';
  @Input() helper = '';
  @Input() error: string | null = null;
  @Input() optional = false;

  get invalid(): boolean {
    return !!this.error;
  }
}
`;
  const html = `<!-- Pajamas-inspired (MIT) -->
<div class="gl-form-group">
  <label class="gl-form-label">
    <span class="gl-label-text">{{ label }}</span>
    <span *ngIf="optional" class="gl-optional-label">(optional)</span>
  </label>
  <span *ngIf="helper" class="gl-label-description">{{ helper }}</span>
  <div class="gl-form-control-slot"><ng-content></ng-content></div>
  <div *ngIf="invalid" class="gl-invalid-feedback" role="alert">{{ error }}</div>
</div>
`;
  const css = `/* Pajamas-inspired (MIT) */
:host { display: block; margin-bottom: 16px; }
.gl-form-label {
  display: flex; align-items: baseline; gap: 8px; margin: 0 0 4px;
  font-size: 14px; font-weight: 700; color: ${cssVar('--gl-text-color-strong')};
}
.gl-optional-label { font-weight: 400; color: ${cssVar('--gl-text-color-subtle')}; }
.gl-label-description {
  display: block; font-size: 12px; margin-bottom: 8px;
  color: ${cssVar('--gl-text-color-subtle')};
}
.gl-invalid-feedback {
  color: ${cssVar('--gl-control-text-color-error')};
  font-size: 12px; margin-top: 4px;
}
`;
  return { ts, html, css };
}

/* ---- alert ---- */
function angAlert() {
  const ts = `${angHead('gl-alert', 'alert')}
export class GlAlertComponent {
  @Input() variant: 'info' | 'success' | 'warning' | 'danger' | 'tip' = 'info';
  @Input() title = '';
  @Input() dismissible = true;
  @Input() sticky = false;
  @Output() glDismiss = new EventEmitter<void>();

  visible = true;

  get classes(): Record<string, boolean> {
    return {
      'gl-alert-sticky': this.sticky,
    };
  }

  get role(): string {
    return this.variant === 'danger' || this.variant === 'warning' ? 'alert' : 'status';
  }

  dismiss(): void {
    this.visible = false;
    this.glDismiss.emit();
  }
}
`;
  const html = `<!-- Pajamas-inspired (MIT) -->
<div *ngIf="visible" class="gl-alert" [ngClass]="['gl-alert-' + variant, classes]" [attr.role]="role">
  <div class="gl-alert-icon-container">
    <span class="gl-alert-icon" aria-hidden="true">${ICON_SVG}</span>
  </div>
  <div class="gl-alert-content">
    <h5 *ngIf="title" class="gl-alert-title">{{ title }}</h5>
    <div class="gl-alert-body"><ng-content></ng-content></div>
  </div>
  <button *ngIf="dismissible" type="button" class="gl-alert-close" (click)="dismiss()" aria-label="Dismiss">${X_SVG}</button>
</div>
`;
  const css = `/* Pajamas-inspired (MIT) */
:host { display: block; }
.gl-alert {
  display: flex; align-items: flex-start; gap: 12px; padding: 12px 16px;
  border: 1px solid ${cssVar('--gl-alert-info-border-color')};
  border-radius: ${cssVar('--gl-alert-border-radius')};
  background-color: ${cssVar('--gl-alert-info-background-color')};
  color: ${cssVar('--gl-text-color-default')};
}
.gl-alert-success { background-color: ${cssVar('--gl-alert-success-background-color')}; border-color: ${cssVar('--gl-alert-success-border-color')}; }
.gl-alert-success .gl-alert-title { color: ${cssVar('--gl-alert-success-title-color')}; }
.gl-alert-warning { background-color: ${cssVar('--gl-alert-warning-background-color')}; border-color: ${cssVar('--gl-alert-warning-border-color')}; }
.gl-alert-warning .gl-alert-title { color: ${cssVar('--gl-alert-warning-title-color')}; }
.gl-alert-danger { background-color: ${cssVar('--gl-alert-danger-background-color')}; border-color: ${cssVar('--gl-alert-danger-border-color')}; }
.gl-alert-danger .gl-alert-title { color: ${cssVar('--gl-alert-danger-title-color')}; }
.gl-alert-icon-container {
  display: inline-flex; margin-top: 2px;
  color: ${cssVar('--gl-feedback-info-icon-color')};
}
.gl-alert-content { flex: 1; }
.gl-alert-title { margin: 0 0 4px; font-size: 14px; font-weight: 700; color: ${cssVar('--gl-alert-info-title-color')}; }
.gl-alert-body { font-size: 14px; }
.gl-alert-close {
  border: 0; background: transparent; cursor: pointer; padding: 4px;
  color: ${cssVar('--gl-text-color-subtle')}; display: inline-flex;
}
.gl-alert-close:hover { color: ${cssVar('--gl-text-color-strong')}; }
.gl-alert-sticky { position: sticky; top: 0; z-index: 2; }
`;
  return { ts, html, css };
}

const ANGULAR_BUILDERS = {
  button: angButton,
  input: angInput,
  modal: angModal,
  table: angTable,
  tabs: angTabs,
  badge: angBadge,
  toast: angToast,
  dropdown: angDropdown,
  form: angForm,
  alert: angAlert,
};

function buildAngular() {
  for (const c of spec.components) {
    const dir = path.join(ANGULAR, c.id);
    const b = ANGULAR_BUILDERS[c.id]();
    write(path.join(dir, `${c.id}.component.ts`), b.ts);
    write(path.join(dir, `${c.id}.component.html`), b.html);
    write(path.join(dir, `${c.id}.component.css`), b.css);
    write(path.join(dir, `${c.id}.module.ts`), angModule(c.id));
  }
  const index = spec.components
    .map(
      (c) =>
        `export { Gl${pascal(c.id)}Component } from './${c.id}/${c.id}.component';\n` +
        `export { Gl${pascal(c.id)}Module } from './${c.id}/${c.id}.module';\n`
    )
    .join('');
  write(path.join(ANGULAR, 'index.ts'), `// Pajamas-inspired (MIT)\n${index}`);
  write(
    path.join(ANGULAR, 'README.md'),
    `# Angular components (Pajamas-inspired)

Generated from \`scripts/component-spec.js\` by \`scripts/gen-native.js\`.

Every component references design tokens only via CSS custom properties
(\`var(--gl-*)\`), so it follows the host theme automatically. Load
\`dist/css/variables.css\` in the host page.

## Components

${spec.components.map((c) => `- \`gl-${c.id}\` — ${c.description}`).join('\n')}

## Usage

\`\`\`ts
import { NgModule } from '@angular/core';
import { GlButtonModule, GlModalModule } from './index';

@NgModule({ imports: [GlButtonModule, GlModalModule] })
export class AppModule {}
\`\`\`

## Notes

- Outputs: \`(glClick)\`, \`(glChange)\`, \`(close)\`, \`(glSort)\`, \`(glSelect)\`,
  \`(glClearAll)\`, \`(glDismiss)\`.
- Modal closes on backdrop click, Esc, and the × button.
- Pajamas-inspired (MIT).
`
  );
}

/* ================================================================== FLUTTER */
const FLUTTER = path.join(ROOT, 'dist', 'flutter', 'widgets');
const FLUTTER_TOKENS = path.join(ROOT, 'dist', 'flutter', 'tokens.dart');
const flutterUsed = new Set();

function flColor(css) {
  flutterUsed.add(css);
  return 'Pajamas.shared.' + flGet(css);
}

const px = (name, fallback) => {
  const v = rem2px(resolve(name));
  return v == null ? fallback : v;
};

function patchFlutterTokens(source) {
  let out = source;
  if (!/static final Pajamas shared\b/.test(out)) {
    out = out.replace(
      'Pajamas._();',
      'Pajamas._();\n\n  /// Shared instance so external libraries can read tokens (Pajamas-inspired).\n  static final Pajamas shared = Pajamas._();'
    );
  }
  /* fix getters whose literal is wrong (rgba/#fff collapsed to black) */
  out = out.replace(
    /^\s*Color\s+get\s+([a-z0-9]+)\s*=>\s*const\s+Color\((0x[0-9A-Fa-f]{8})\)\s*;\s*$/gm,
    (whole, name, lit) => {
      let expect = null;
      const css = '--gl-' + name;
      if (css in tokMap) expect = toArgb(resolve(css));
      else if (name === 'white') expect = '0xFFFFFFFF';
      else {
        let m = /^tgraya(\d+)$/.exec(name);
        if (m) expect = toArgb('rgba(5, 5, 6, 0.' + m[1] + ')');
        m = /^twhitea(\d+)$/.exec(name);
        if (m) expect = toArgb('rgba(255, 255, 255, 0.' + m[1] + ')');
      }
      return expect && expect !== lit ? `    Color get ${name} => const Color(${expect});` : whole;
    }
  );
  /* append getters referenced by widgets but absent from tokens.dart */
  const have = new Set();
  for (const m of out.matchAll(/Color\s+get\s+([a-z0-9]+)\s+=>/g)) have.add(m[1]);
  const missing = [...flutterUsed].map(flGet).filter((g) => !have.has(g));
  if (missing.length) {
    const block = missing
      .map((g) => {
        const v = toArgb(resolve('--gl-' + g)) || '0xFFFFFFFF';
        return `    Color get ${g} => const Color(${v});`;
      })
      .join('\n');
    out = out.replace(/\n\}\s*$/, `\n${block}\n}\n`);
  }
  /* size constants (derived from dist/css/variables.css) */
  if (!out.includes('static const double spacingScale1')) {
    const sizes = [
      ['spacingScale1', px('--gl-spacing-scale-1', 2)],
      ['spacingScale2', px('--gl-spacing-scale-2', 4)],
      ['spacingScale3', px('--gl-spacing-scale-3', 8)],
      ['spacingScale4', px('--gl-spacing-scale-4', 12)],
      ['spacingScale5', px('--gl-spacing-scale-5', 16)],
      ['spacingScale6', px('--gl-spacing-scale-6', 24)],
      ['spacingScale7', px('--gl-spacing-scale-7', 32)],
      ['spacingScale8', px('--gl-spacing-scale-8', 40)],
      ['radiusSm', px('--gl-border-radius-sm', 2)],
      ['radiusMd', px('--gl-border-radius-md', 4)],
      ['radiusLg', px('--gl-border-radius-lg', 8)],
      ['radiusXl', px('--gl-border-radius-xl', 12)],
      ['radiusFull', px('--gl-border-radius-full', 9999)],
      ['fontSizeSm', px('--gl-font-size-sm', 12)],
      ['fontSizeBase', px('--gl-font-size-base', 14)],
      ['fontSizeLg', px('--gl-font-size-lg', 16)],
      ['borderWidth1', 1],
    ];
    const block = sizes.map(([n, v]) => `  static const double ${n} = ${v};`).join('\n');
    out = out.replace(/\n\}\s*$/, `\n\n  // ---- sizes (derived from dist/css/variables.css) ----\n${block}\n}\n`);
  }
  return out;
}

function buildFlutterWidgets() {
  const files = FLUTTER_BUILDERS.map((b) => b());
  for (const f of files) {
    write(path.join(FLUTTER, f.file), f.dart);
  }
  write(
    path.join(FLUTTER, 'index.dart'),
    '// Pajamas-inspired (MIT)\n' +
      files.map((f) => `export '${f.file}';`).join('\n') +
      '\n'
  );
  const src = fs.readFileSync(FLUTTER_TOKENS, 'utf8');
  const patched = patchFlutterTokens(src);
  if (patched !== src) fs.writeFileSync(FLUTTER_TOKENS, patched);
  write(
    path.join(FLUTTER, 'README.md'),
    `# Flutter widgets (Pajamas-inspired)

Generated from \`scripts/component-spec.js\` by \`scripts/gen-native.js\`.
Widgets reference \`../tokens.dart\` exclusively (\`Pajamas.shared.*\` colors and
\`Pajamas.spacing*/radius*/fontSize*\` sizes); no raw color literals appear in
widget code. The generator patches \`tokens.dart\` in place only to add missing
getters/constants — it never changes existing values.

## Widgets

${spec.components.map((c) => `- \`Paj${c.id.charAt(0).toUpperCase() + c.id.slice(1)}\` — ${c.description}`).join('\n')}

## Usage

\`\`\`dart
import 'package:flutter/material.dart';
import 'widgets/index.dart';

PajButton(
  variant: 'confirm',
  onPressed: () {},
  child: const Text('Save'),
);
\`\`\`

Pajamas-inspired (MIT).
`
  );
}

/* ---- flutter: button ---- */
function flButton() {
  for (const combo of BTN_COMBOS) {
    for (const part of ['background', 'foreground', 'border']) {
      for (const state of ['default', 'hover', 'active']) {
        flutterUsed.add(`--gl-button-${combo}-${part}-color-${state}`);
      }
    }
  }
  for (const t of [
    '--gl-button-link-text-color-default',
    '--gl-action-disabled-background-color',
    '--gl-action-disabled-foreground-color',
    '--gl-action-disabled-border-color',
    '--gl-focus-ring-outer-color',
  ]) {
    flutterUsed.add(t);
  }
  const dart = `// Pajamas-inspired (MIT)
import 'package:flutter/material.dart';

import '../tokens.dart';

/// PajButton — visual category (primary/secondary/tertiary) x semantic variant
/// (default/confirm/danger/link), with disabled, loading and block states.
class PajButton extends StatefulWidget {
  const PajButton({
    super.key,
    this.category = 'primary',
    this.variant = 'default',
    this.size = 'medium',
    this.disabled = false,
    this.loading = false,
    this.block = false,
    this.icon,
    this.onPressed,
    required this.child,
  });

  final String category; // 'primary' | 'secondary' | 'tertiary'
  final String variant; // 'default' | 'confirm' | 'danger' | 'link'
  final String size; // 'small' | 'medium'
  final bool disabled;
  final bool loading;
  final bool block;
  final IconData? icon;
  final VoidCallback? onPressed;
  final Widget child;

  @override
  State<PajButton> createState() => _PajButtonState();
}

class _PajButtonState extends State<PajButton> {
  static const List<String> _ok = <String>[
    '${BTN_COMBOS.join("',\n    '")}',
  ];

  bool _hovered = false;
  bool _focused = false;

  bool get _enabled => !widget.disabled && !widget.loading;
  bool get _isLink => widget.variant == 'link';

  String get _combo {
    final key = '\${widget.variant}-\${widget.category}';
    return _ok.contains(key) ? key : 'default-primary';
  }

  Color _color(String part, String state) {
    if (_isLink && part == 'background') return Colors.transparent;
    if (_isLink && part == 'border') return Colors.transparent;
    if (_isLink && part == 'foreground') {
      return ${flColor('--gl-button-link-text-color-default')};
    }
    if (!_enabled) {
      return switch (part) {
        'background' => ${flColor('--gl-action-disabled-background-color')},
        'border' => ${flColor('--gl-action-disabled-border-color')},
        _ => ${flColor('--gl-action-disabled-foreground-color')},
      };
    }
    final actual = _hovered && state == 'default' ? 'hover' : state;
    return _token(part, actual);
  }

  Color _token(String part, String state) {
    final Pajamas p = Pajamas.shared;
    switch ('\${_combo}-\${part}-\${state}') {
${BTN_COMBOS.flatMap((c) =>
  ['background', 'foreground', 'border'].flatMap((part) =>
    ['default', 'hover', 'active'].map((s) => {
      const getter = flGet(`--gl-button-${c}-${part}-color-${s}`);
      return `      case '${c}-${part}-${s}':\n        return p.${getter};`;
    })
  )
).join('\n')}
      default:
        return p.${flGet('--gl-button-default-primary-foreground-color-default')};
    }
  }

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      cursor: _enabled ? SystemMouseCursors.click : SystemMouseCursors.basic,
      onEnter: (_) => setState(() => _hovered = true),
      onExit: (_) => setState(() => _hovered = false),
      child: Focus(
        onFocusChange: (v) => setState(() => _focused = v),
        child: GestureDetector(
          onTap: _enabled ? widget.onPressed : null,
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 150),
            width: widget.block ? double.infinity : null,
            padding: EdgeInsets.symmetric(
              horizontal: Pajamas.spacingScale3,
              vertical: widget.size == 'small' ? Pajamas.spacingScale1 : Pajamas.spacingScale2,
            ),
            decoration: BoxDecoration(
              color: _token('background', 'default'),
              borderRadius: BorderRadius.circular(Pajamas.radiusLg),
              border: Border.all(color: _token('border', 'default'), width: Pajamas.borderWidth1),
              boxShadow: _focused
                  ? [BoxShadow(color: ${flColor('--gl-focus-ring-outer-color')}, blurRadius: 0, spreadRadius: 2)]
                  : null,
            ),
            alignment: Alignment.center,
            child: Row(
              mainAxisSize: widget.block ? MainAxisSize.max : MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                if (widget.loading) ...[
                  SizedBox(
                    width: 12,
                    height: 12,
                    child: CircularProgressIndicator(
                      strokeWidth: 2,
                      valueColor: AlwaysStoppedAnimation<Color>(_token('foreground', 'default')),
                    ),
                  ),
                  const SizedBox(width: Pajamas.spacingScale2),
                ] else if (widget.icon != null) ...[
                  Icon(widget.icon, size: 16, color: _token('foreground', 'default')),
                  const SizedBox(width: Pajamas.spacingScale2),
                ],
                Flexible(
                  child: DefaultTextStyle.merge(
                    style: TextStyle(
                      fontSize: widget.size == 'small' ? Pajamas.fontSizeSm : Pajamas.fontSizeBase,
                      fontWeight: FontWeight.w600,
                      color: _token('foreground', 'default'),
                    ),
                    child: widget.child,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
`;
  return { file: 'paj_button.dart', dart };
}

const FLUTTER_BUILDERS = [flButton];

/* ---- flutter: input ---- */
function flInput() {
  for (const t of [
    '--gl-control-border-color-default', '--gl-control-border-color-hover',
    '--gl-control-border-color-focus', '--gl-control-border-color-error',
    '--gl-control-border-color-disabled', '--gl-control-background-color-default',
    '--gl-control-background-color-disabled', '--gl-control-placeholder-color',
    '--gl-control-text-color-valid', '--gl-control-text-color-error',
    '--gl-text-color-default', '--gl-focus-ring-outer-color',
  ]) {
    flutterUsed.add(t);
  }
  const dart = `// Pajamas-inspired (MIT)
import 'package:flutter/material.dart';

import '../tokens.dart';

/// PajInput — text field with validation state (valid/invalid), disabled and
/// readonly modes, width presets and a 2px focus ring.
class PajInput extends StatefulWidget {
  const PajInput({
    super.key,
    this.type = 'text',
    this.placeholder = '',
    this.state,
    this.disabled = false,
    this.readonly = false,
    this.width,
    this.onChanged,
  });

  final String type; // text/email/number/password/search/url/tel/date/time
  final String placeholder;
  final String? state; // 'valid' | 'invalid' | null
  final bool disabled;
  final bool readonly;
  final String? width; // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | null
  final ValueChanged<String>? onChanged;

  @override
  State<PajInput> createState() => _PajInputState();
}

class _PajInputState extends State<PajInput> {
  static const Map<String, double> _widths = <String, double>{
    'xs': 192, 'sm': 256, 'md': 384, 'lg': 512, 'xl': double.infinity,
  };

  bool _focused = false;
  final TextEditingController _controller = TextEditingController();

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  bool get _passive => widget.disabled || widget.readonly;

  Color _border() {
    if (_passive) return ${flColor('--gl-control-border-color-disabled')};
    if (widget.state == 'invalid') return ${flColor('--gl-control-border-color-error')};
    if (widget.state == 'valid') return ${flColor('--gl-control-text-color-valid')};
    if (_focused) return ${flColor('--gl-control-border-color-focus')};
    return ${flColor('--gl-control-border-color-default')};
  }

  @override
  Widget build(BuildContext context) {
    return Focus(
      onFocusChange: (v) => setState(() => _focused = v),
      child: Container(
        constraints: BoxConstraints(
          maxWidth: _widths[widget.width] ?? double.infinity,
        ),
        decoration: BoxDecoration(
          color: _passive
              ? ${flColor('--gl-control-background-color-disabled')}
              : ${flColor('--gl-control-background-color-default')},
          borderRadius: BorderRadius.circular(Pajamas.radiusLg),
          border: Border.all(color: _border(), width: Pajamas.borderWidth1),
          boxShadow: _focused
              ? [BoxShadow(color: ${flColor('--gl-focus-ring-outer-color')}, blurRadius: 0, spreadRadius: 2)]
              : null,
        ),
        child: TextField(
          controller: _controller,
          enabled: !widget.disabled,
          readOnly: widget.readonly,
          obscureText: widget.type == 'password',
          onChanged: widget.onChanged,
          style: TextStyle(fontSize: Pajamas.fontSizeBase, color: ${flColor('--gl-text-color-default')}),
          decoration: InputDecoration(
            border: InputBorder.none,
            isCollapsed: true,
            contentPadding: EdgeInsets.symmetric(
              horizontal: Pajamas.spacingScale3,
              vertical: Pajamas.spacingScale2,
            ),
            hintText: widget.placeholder,
            hintStyle: TextStyle(fontSize: Pajamas.fontSizeBase, color: ${flColor('--gl-control-placeholder-color')}),
          ),
        ),
      ),
    );
  }
}
`;
  FLUTTER_BUILDERS.push(() => ({ file: 'paj_input.dart', dart }));
}

/* ---- flutter: modal ---- */
function flModal() {
  for (const t of [
    '--gl-color-alpha-dark-40', '--gl-background-color-default',
    '--gl-text-color-strong', '--gl-text-color-default', '--gl-text-color-subtle',
    '--gl-border-color-default', '--gl-button-confirm-primary-background-color-default',
    '--gl-button-confirm-primary-foreground-color-default',
    '--gl-button-default-primary-background-color-default',
    '--gl-button-default-primary-foreground-color-default',
    '--gl-button-default-primary-border-color-default',
  ]) {
    flutterUsed.add(t);
  }
  const dart = `// Pajamas-inspired (MIT)
import 'package:flutter/material.dart';

import '../tokens.dart';

/// PajModal — modal dialog (sm/md/lg) with title, body and footer actions.
/// Backdrop tap / Esc / close button dismiss it; buttons align left and wrap
/// on narrow screens.
Future<T?> showPajModal<T>(
  BuildContext context, {
  required String title,
  String size = 'md',
  String? primaryText,
  VoidCallback? onPrimary,
  String? secondaryText,
  VoidCallback? onSecondary,
  required Widget child,
}) {
  return showDialog<T>(
    context: context,
    barrierDismissible: true,
    barrierColor: ${flColor('--gl-color-alpha-dark-40')},
    builder: (BuildContext context) => PajModal<T>(
      title: title,
      size: size,
      primaryText: primaryText,
      onPrimary: onPrimary,
      secondaryText: secondaryText,
      onSecondary: onSecondary,
      child: child,
    ),
  );
}

class PajModal<T> extends StatelessWidget {
  const PajModal({
    super.key,
    required this.title,
    this.size = 'md',
    this.primaryText,
    this.onPrimary,
    this.secondaryText,
    this.onSecondary,
    required this.child,
  });

  final String title;
  final String size; // 'sm' | 'md' | 'lg'
  final String? primaryText;
  final VoidCallback? onPrimary;
  final String? secondaryText;
  final VoidCallback? onSecondary;
  final Widget child;

  double get _maxWidth => switch (size) {
        'sm' => 320,
        'lg' => 768,
        _ => 384,
      };

  Widget _action(BuildContext context, String text, Color bg, Color fg, VoidCallback? onTap) {
    return Material(
      color: bg,
      borderRadius: BorderRadius.circular(Pajamas.radiusLg),
      child: InkWell(
        borderRadius: BorderRadius.circular(Pajamas.radiusLg),
        onTap: () {
          onTap?.call();
          Navigator.of(context).pop();
        },
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: Pajamas.spacingScale3, vertical: Pajamas.spacingScale2),
          child: Text(text, style: TextStyle(fontSize: Pajamas.fontSizeBase, fontWeight: FontWeight.w600, color: fg)),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      backgroundColor: Colors.transparent,
      child: ConstrainedBox(
        constraints: BoxConstraints(maxWidth: _maxWidth),
        child: Container(
          decoration: BoxDecoration(
            color: ${flColor('--gl-background-color-default')},
            borderRadius: BorderRadius.circular(Pajamas.radiusLg),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Padding(
                padding: EdgeInsets.fromLTRB(Pajamas.spacingScale5, Pajamas.spacingScale5, Pajamas.spacingScale3, 0),
                child: Row(
                  children: [
                    Expanded(
                      child: Text(
                        title,
                        style: TextStyle(
                          fontSize: Pajamas.fontSizeLg,
                          fontWeight: FontWeight.w600,
                          color: ${flColor('--gl-text-color-strong')},
                        ),
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.close, size: 16),
                      color: ${flColor('--gl-text-color-subtle')},
                      onPressed: () => Navigator.of(context).pop(),
                    ),
                  ],
                ),
              ),
              Flexible(
                child: SingleChildScrollView(
                  padding: EdgeInsets.all(Pajamas.spacingScale5),
                  child: DefaultTextStyle.merge(
                    style: TextStyle(fontSize: Pajamas.fontSizeBase, color: ${flColor('--gl-text-color-default')}),
                    child: child,
                  ),
                ),
              ),
              if (primaryText != null || secondaryText != null)
                Container(
                  decoration: BoxDecoration(
                    border: Border(top: BorderSide(color: ${flColor('--gl-border-color-default')})),
                  ),
                  padding: EdgeInsets.all(Pajamas.spacingScale5),
                  child: Wrap(
                    alignment: WrapAlignment.start,
                    spacing: Pajamas.spacingScale2,
                    runSpacing: Pajamas.spacingScale2,
                    children: [
                      if (secondaryText != null)
                        _action(
                          context,
                          secondaryText!,
                          ${flColor('--gl-button-default-primary-background-color-default')},
                          ${flColor('--gl-button-default-primary-foreground-color-default')},
                          onSecondary,
                        ),
                      if (primaryText != null)
                        _action(
                          context,
                          primaryText!,
                          ${flColor('--gl-button-confirm-primary-background-color-default')},
                          ${flColor('--gl-button-confirm-primary-foreground-color-default')},
                          onPrimary,
                        ),
                    ],
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
`;
  FLUTTER_BUILDERS.push(() => ({ file: 'paj_modal.dart', dart }));
}

/* ---- flutter: table ---- */
function flTable() {
  for (const t of [
    '--gl-table-row-background-color-hover', '--gl-table-sorting-icon-color',
    '--gl-border-color-default', '--gl-text-color-default', '--gl-text-color-strong',
    '--gl-text-color-subtle',
  ]) {
    flutterUsed.add(t);
  }
  const dart = `// Pajamas-inspired (MIT)
import 'package:flutter/material.dart';

import '../tokens.dart';

/// Column definition for PajTable.
class PajField {
  const PajField({required this.key, required this.label, this.sortable = false});
  final String key;
  final String label;
  final bool sortable;
}

/// PajTable — data table with sortable headers, busy state, row hover
/// highlight and an empty state.
class PajTable extends StatefulWidget {
  const PajTable({
    super.key,
    required this.fields,
    required this.items,
    this.loading = false,
    this.initialSortBy,
    this.initialSortDesc = false,
    this.onSort,
  });

  final List<PajField> fields;
  final List<Map<String, dynamic>> items;
  final bool loading;
  final String? initialSortBy;
  final bool initialSortDesc;
  final void Function(String? sortBy, bool sortDesc)? onSort;

  @override
  State<PajTable> createState() => _PajTableState();
}

class _PajTableState extends State<PajTable> {
  late String? _sortBy = widget.initialSortBy;
  late bool _sortDesc = widget.initialSortDesc;
  int _hovered = -1;

  void _sort(PajField field) {
    if (!field.sortable || widget.loading) return;
    setState(() {
      if (_sortBy == field.key) {
        _sortDesc = !_sortDesc;
      } else {
        _sortBy = field.key;
        _sortDesc = false;
      }
    });
    widget.onSort?.call(_sortBy, _sortDesc);
  }

  List<Map<String, dynamic>> get _sorted {
    if (_sortBy == null) return widget.items;
    final key = _sortBy!;
    final dir = _sortDesc ? -1 : 1;
    final rows = [...widget.items];
    rows.sort((a, b) {
      final av = (a[key] ?? '').toString().toLowerCase();
      final bv = (b[key] ?? '').toString().toLowerCase();
      return av.compareTo(bv) * dir;
    });
    return rows;
  }

  @override
  Widget build(BuildContext context) {
    final rows = _sorted;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Container(
          decoration: BoxDecoration(
            border: Border(bottom: BorderSide(color: ${flColor('--gl-border-color-default')})),
          ),
          padding: EdgeInsets.symmetric(horizontal: Pajamas.spacingScale3),
          child: Row(
            children: widget.fields.map((f) {
              final active = f.sortable && f.key == _sortBy;
              return Expanded(
                child: InkWell(
                  onTap: () => _sort(f),
                  child: Padding(
                    padding: EdgeInsets.symmetric(vertical: Pajamas.spacingScale3),
                    child: Row(
                      children: [
                        Text(
                          f.label,
                          style: TextStyle(
                            fontSize: Pajamas.fontSizeBase,
                            fontWeight: FontWeight.w600,
                            color: ${flColor('--gl-text-color-strong')},
                          ),
                        ),
                        if (active)
                          Text(
                            _sortDesc ? '↓' : '↑',
                            style: TextStyle(
                              fontSize: Pajamas.fontSizeBase,
                              fontWeight: FontWeight.w700,
                              color: ${flColor('--gl-table-sorting-icon-color')},
                            ),
                          ),
                      ],
                    ),
                  ),
                ),
              );
            }).toList(),
          ),
        ),
        if (widget.loading)
          Padding(
            padding: EdgeInsets.all(Pajamas.spacingScale4),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const SizedBox(
                  width: 14,
                  height: 14,
                  child: CircularProgressIndicator(strokeWidth: 2),
                ),
                const SizedBox(width: Pajamas.spacingScale2),
                Text('Loading…', style: TextStyle(fontSize: Pajamas.fontSizeBase, color: ${flColor('--gl-text-color-subtle')})),
              ],
            ),
          )
        else if (rows.isEmpty)
          Padding(
            padding: EdgeInsets.all(Pajamas.spacingScale6),
            child: Text('No items.', textAlign: TextAlign.center, style: TextStyle(fontSize: Pajamas.fontSizeBase, color: ${flColor('--gl-text-color-subtle')})),
          )
        else
          for (var i = 0; i < rows.length; i++)
            MouseRegion(
              onEnter: (_) => setState(() => _hovered = i),
              onExit: (_) => setState(() => _hovered = -1),
              child: Container(
                color: _hovered == i ? ${flColor('--gl-table-row-background-color-hover')} : Colors.transparent,
                padding: EdgeInsets.symmetric(horizontal: Pajamas.spacingScale3, vertical: Pajamas.spacingScale3),
                child: Row(
                  children: widget.fields
                      .map((f) => Expanded(
                            child: Text(
                              (rows[i][f.key] ?? '').toString(),
                              style: TextStyle(fontSize: Pajamas.fontSizeBase, color: ${flColor('--gl-text-color-default')}),
                            ),
                          ))
                      .toList(),
                ),
              ),
            ),
      ],
    );
  }
}
`;
  FLUTTER_BUILDERS.push(() => ({ file: 'paj_table.dart', dart }));
}

/* ---- flutter: tabs ---- */
function flTabs() {
  for (const t of [
    '--gl-border-color-default', '--gl-border-color-strong',
    '--gl-tab-selected-indicator-color-default', '--gl-text-color-default',
    '--gl-text-color-strong', '--gl-badge-neutral-background-color-default',
    '--gl-badge-neutral-text-color-default',
  ]) {
    flutterUsed.add(t);
  }
  const dart = `// Pajamas-inspired (MIT)
import 'package:flutter/material.dart';

import '../tokens.dart';

/// Single tab definition for PajTabs.
class PajTabItem {
  const PajTabItem({required this.title, this.count, this.content});
  final String title;
  final int? count;
  final String? content;
}

/// PajTabs — tab navigation with a bottom indicator on the active item and an
/// optional count badge.
class PajTabs extends StatefulWidget {
  const PajTabs({super.key, required this.tabs, this.initialActive = 0, this.onChange});
  final List<PajTabItem> tabs;
  final int initialActive;
  final ValueChanged<int>? onChange;

  @override
  State<PajTabs> createState() => _PajTabsState();
}

class _PajTabsState extends State<PajTabs> {
  int _active = 0;
  int _hovered = -1;

  @override
  void initState() {
    super.initState();
    if (widget.tabs.isNotEmpty) {
      _active = widget.initialActive.clamp(0, widget.tabs.length - 1);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Container(
          decoration: BoxDecoration(
            border: Border(bottom: BorderSide(color: ${flColor('--gl-border-color-default')})),
          ),
          child: Row(
            children: [
              for (var i = 0; i < widget.tabs.length; i++)
                MouseRegion(
                  onEnter: (_) => setState(() => _hovered = i),
                  onExit: (_) => setState(() => _hovered = -1),
                  child: InkWell(
                    onTap: () {
                      setState(() => _active = i);
                      widget.onChange?.call(i);
                    },
                    child: Container(
                      decoration: BoxDecoration(
                        border: Border(
                          bottom: BorderSide(
                            color: i == _active
                                ? ${flColor('--gl-tab-selected-indicator-color-default')}
                                : _hovered == i
                                    ? ${flColor('--gl-border-color-strong')}
                                    : Colors.transparent,
                            width: 2,
                          ),
                        ),
                      ),
                      padding: EdgeInsets.symmetric(
                        horizontal: Pajamas.spacingScale4,
                        vertical: Pajamas.spacingScale4,
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text(
                            widget.tabs[i].title,
                            style: TextStyle(
                              fontSize: Pajamas.fontSizeBase,
                              fontWeight: i == _active ? FontWeight.w700 : FontWeight.w400,
                              color: i == _active ? ${flColor('--gl-text-color-strong')} : ${flColor('--gl-text-color-default')},
                            ),
                          ),
                          if (widget.tabs[i].count != null) ...[
                            const SizedBox(width: Pajamas.spacingScale2),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: Pajamas.spacingScale2),
                              decoration: BoxDecoration(
                                color: ${flColor('--gl-badge-neutral-background-color-default')},
                                borderRadius: BorderRadius.circular(Pajamas.radiusFull),
                              ),
                              child: Text(
                                '\${widget.tabs[i].count}',
                                style: TextStyle(fontSize: Pajamas.fontSizeSm, color: ${flColor('--gl-badge-neutral-text-color-default')}),
                              ),
                            ),
                          ],
                        ],
                      ),
                    ),
                  ),
                ),
            ],
          ),
        ),
        if (widget.tabs.isNotEmpty && widget.tabs[_active].content != null)
          Padding(
            padding: EdgeInsets.symmetric(vertical: Pajamas.spacingScale4),
            child: Text(
              widget.tabs[_active].content!,
              style: TextStyle(fontSize: Pajamas.fontSizeBase, color: ${flColor('--gl-text-color-default')}),
            ),
          ),
      ],
    );
  }
}
`;
  FLUTTER_BUILDERS.push(() => ({ file: 'paj_tabs.dart', dart }));
}

/* ---- flutter: badge ---- */
function flBadge() {
  for (const v of BADGE_VARIANTS) {
    flutterUsed.add(`--gl-badge-${v}-background-color-default`);
    flutterUsed.add(`--gl-badge-${v}-text-color-default`);
  }
  const dart = `// Pajamas-inspired (MIT)
import 'package:flutter/material.dart';

import '../tokens.dart';

/// PajBadge — pill status label. variant = neutral|info|success|warning|danger|tier.
class PajBadge extends StatelessWidget {
  const PajBadge({
    super.key,
    this.variant = 'neutral',
    this.icon,
    required this.label,
  });

  final String variant;
  final IconData? icon;
  final String label;

  Color get _bg => switch (variant) {
        'info' => ${flColor('--gl-badge-info-background-color-default')},
        'success' => ${flColor('--gl-badge-success-background-color-default')},
        'warning' => ${flColor('--gl-badge-warning-background-color-default')},
        'danger' => ${flColor('--gl-badge-danger-background-color-default')},
        'tier' => ${flColor('--gl-badge-tier-background-color-default')},
        _ => ${flColor('--gl-badge-neutral-background-color-default')},
      };

  Color get _fg => switch (variant) {
        'info' => ${flColor('--gl-badge-info-text-color-default')},
        'success' => ${flColor('--gl-badge-success-text-color-default')},
        'warning' => ${flColor('--gl-badge-warning-text-color-default')},
        'danger' => ${flColor('--gl-badge-danger-text-color-default')},
        'tier' => ${flColor('--gl-badge-tier-text-color-default')},
        _ => ${flColor('--gl-badge-neutral-text-color-default')},
      };

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: Pajamas.spacingScale2),
      decoration: BoxDecoration(
        color: _bg,
        borderRadius: BorderRadius.circular(Pajamas.radiusFull),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (icon != null) ...[
            Icon(icon, size: 12, color: _fg),
            const SizedBox(width: Pajamas.spacingScale1),
          ],
          Padding(
            padding: const EdgeInsets.symmetric(vertical: Pajamas.spacingScale1),
            child: Text(
              label,
              style: TextStyle(fontSize: Pajamas.fontSizeSm, fontWeight: FontWeight.w600, color: _fg),
            ),
          ),
        ],
      ),
    );
  }
}
`;
  FLUTTER_BUILDERS.push(() => ({ file: 'paj_badge.dart', dart }));
}

/* ---- flutter: toast ---- */
function flToast() {
  for (const t of [
    '--gl-feedback-strong-background-color', '--gl-feedback-strong-text-color',
    '--gl-feedback-strong-link-color', '--gl-color-alpha-dark-24',
  ]) {
    flutterUsed.add(t);
  }
  const dart = `// Pajamas-inspired (MIT)
import 'package:flutter/material.dart';

import '../tokens.dart';

/// PajToast — bottom-left lightweight notification with auto-hide (5s by
/// default) and an optional action button.
void showPajToast(
  BuildContext context, {
  required String message,
  String? actionText,
  VoidCallback? onAction,
  Duration autoHideDelay = const Duration(seconds: 5),
}) {
  final OverlayEntry entry = OverlayEntry(
    builder: (BuildContext context) => _PajToastView(
      message: message,
      actionText: actionText,
      onAction: onAction,
      autoHideDelay: autoHideDelay,
      onDismiss: () => entry.remove(),
    ),
  );
  Overlay.of(context).insert(entry);
}

class _PajToastView extends StatefulWidget {
  const _PajToastView({
    required this.message,
    this.actionText,
    this.onAction,
    required this.autoHideDelay,
    required this.onDismiss,
  });

  final String message;
  final String? actionText;
  final VoidCallback? onAction;
  final Duration autoHideDelay;
  final VoidCallback onDismiss;

  @override
  State<_PajToastView> createState() => _PajToastViewState();
}

class _PajToastViewState extends State<_PajToastView> {
  bool _dismissed = false;

  void _close() {
    if (_dismissed) return;
    _dismissed = true;
    widget.onDismiss();
  }

  @override
  void initState() {
    super.initState();
    Future<void>.delayed(widget.autoHideDelay, _close);
  }

  @override
  Widget build(BuildContext context) {
    return Positioned(
      left: Pajamas.spacingScale6,
      bottom: Pajamas.spacingScale6,
      child: Material(
        color: Colors.transparent,
        child: Container(
          padding: EdgeInsets.symmetric(
            horizontal: Pajamas.spacingScale5,
            vertical: Pajamas.spacingScale4,
          ),
          decoration: BoxDecoration(
            color: ${flColor('--gl-feedback-strong-background-color')},
            borderRadius: BorderRadius.circular(Pajamas.radiusFull),
            boxShadow: [
              BoxShadow(color: ${flColor('--gl-color-alpha-dark-24')}, blurRadius: 12, offset: const Offset(0, 4)),
            ],
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Flexible(
                child: Text(
                  widget.message,
                  style: TextStyle(fontSize: Pajamas.fontSizeBase, color: ${flColor('--gl-feedback-strong-text-color')}),
                ),
              ),
              if (widget.actionText != null) ...[
                const SizedBox(width: Pajamas.spacingScale4),
                InkWell(
                  onTap: () {
                    widget.onAction?.call();
                    _close();
                  },
                  child: Text(
                    widget.actionText!,
                    style: TextStyle(
                      fontSize: Pajamas.fontSizeBase,
                      fontWeight: FontWeight.w600,
                      decoration: TextDecoration.underline,
                      color: ${flColor('--gl-feedback-strong-link-color')},
                    ),
                  ),
                ),
              ],
              const SizedBox(width: Pajamas.spacingScale4),
              InkWell(
                onTap: _close,
                child: Icon(Icons.close, size: 14, color: ${flColor('--gl-feedback-strong-link-color')}),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
`;
  FLUTTER_BUILDERS.push(() => ({ file: 'paj_toast.dart', dart }));
}

/* ---- flutter: dropdown ---- */
function flDropdown() {
  for (const t of [
    '--gl-button-default-primary-background-color-default',
    '--gl-button-default-primary-foreground-color-default',
    '--gl-button-default-primary-border-color-default',
    '--gl-action-disabled-background-color', '--gl-action-disabled-foreground-color',
    '--gl-dropdown-background-color', '--gl-dropdown-border-color',
    '--gl-dropdown-divider-color', '--gl-dropdown-option-text-color-default',
    '--gl-dropdown-option-text-color-disabled',
    '--gl-dropdown-option-background-color-selected-default',
    '--gl-dropdown-option-background-color-selected-hover',
    '--gl-dropdown-option-indicator-color-selected-default',
    '--gl-button-link-text-color-default', '--gl-color-alpha-dark-16',
    '--gl-text-color-subtle',
  ]) {
    flutterUsed.add(t);
  }
  const dart = `// Pajamas-inspired (MIT)
import 'package:flutter/material.dart';

import '../tokens.dart';

/// Item definition for PajDropdown.
class PajDropdownItem {
  const PajDropdownItem({
    required this.label,
    this.checked = false,
    this.disabled = false,
    this.header = false,
    this.divider = false,
  });
  final String label;
  final bool checked;
  final bool disabled;
  final bool header;
  final bool divider;
}

/// PajDropdown — trigger button with an anchored menu; supports headers,
/// checkable items, dividers and a clear-all entry.
class PajDropdown extends StatefulWidget {
  const PajDropdown({
    super.key,
    this.text = '',
    required this.items,
    this.showClearAll = false,
    this.disabled = false,
    this.onSelect,
    this.onClearAll,
  });

  final String text;
  final List<PajDropdownItem> items;
  final bool showClearAll;
  final bool disabled;
  final ValueChanged<PajDropdownItem>? onSelect;
  final VoidCallback? onClearAll;

  @override
  State<PajDropdown> createState() => _PajDropdownState();
}

class _PajDropdownState extends State<PajDropdown> {
  bool _open = false;
  int _hovered = -1;

  @override
  Widget build(BuildContext context) {
    return Stack(
      clipBehavior: Clip.none,
      children: [
        InkWell(
          onTap: widget.disabled ? null : () => setState(() => _open = !_open),
          borderRadius: BorderRadius.circular(Pajamas.radiusLg),
          child: Container(
            padding: EdgeInsets.symmetric(horizontal: Pajamas.spacingScale3, vertical: Pajamas.spacingScale2),
            decoration: BoxDecoration(
              color: widget.disabled ? ${flColor('--gl-action-disabled-background-color')} : ${flColor('--gl-button-default-primary-background-color-default')},
              borderRadius: BorderRadius.circular(Pajamas.radiusLg),
              border: Border.all(color: ${flColor('--gl-button-default-primary-border-color-default')}),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  widget.text,
                  style: TextStyle(
                    fontSize: Pajamas.fontSizeBase,
                    fontWeight: FontWeight.w600,
                    color: widget.disabled ? ${flColor('--gl-action-disabled-foreground-color')} : ${flColor('--gl-button-default-primary-foreground-color-default')},
                  ),
                ),
                const SizedBox(width: Pajamas.spacingScale2),
                Icon(
                  _open ? Icons.expand_less : Icons.expand_more,
                  size: 16,
                  color: ${flColor('--gl-button-default-primary-foreground-color-default')},
                ),
              ],
            ),
          ),
        ),
        if (_open)
          Positioned(
            top: 44,
            left: 0,
            child: Material(
              color: Colors.transparent,
              child: Container(
                width: 208,
                decoration: BoxDecoration(
                  color: ${flColor('--gl-dropdown-background-color')},
                  borderRadius: BorderRadius.circular(Pajamas.radiusLg),
                  border: Border.all(color: ${flColor('--gl-dropdown-border-color')}),
                  boxShadow: [
                    BoxShadow(color: ${flColor('--gl-color-alpha-dark-16')}, blurRadius: 8, offset: const Offset(0, 2)),
                  ],
                ),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(Pajamas.radiusLg),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      for (var i = 0; i < widget.items.length; i++)
                        _buildItem(i, widget.items[i]),
                      if (widget.showClearAll)
                        Container(
                          decoration: BoxDecoration(
                            border: Border(top: BorderSide(color: ${flColor('--gl-dropdown-divider-color')})),
                          ),
                          padding: const EdgeInsets.symmetric(
                            horizontal: Pajamas.spacingScale5,
                            vertical: Pajamas.spacingScale1,
                          ),
                          child: Align(
                            alignment: Alignment.centerLeft,
                            child: InkWell(
                              onTap: () {
                                setState(() => _open = false);
                                widget.onClearAll?.call();
                              },
                              child: Text(
                                'Clear all',
                                style: TextStyle(
                                  fontSize: Pajamas.fontSizeSm,
                                  decoration: TextDecoration.underline,
                                  color: ${flColor('--gl-button-link-text-color-default')},
                                ),
                              ),
                            ),
                          ),
                        ),
                    ],
                  ),
                ),
              ),
            ),
          ),
      ],
    );
  }

  Widget _buildItem(int index, PajDropdownItem item) {
    if (item.divider) {
      return Container(height: 1, color: ${flColor('--gl-dropdown-divider-color')});
    }
    if (item.header) {
      return Padding(
        padding: EdgeInsets.fromLTRB(Pajamas.spacingScale5, Pajamas.spacingScale3, Pajamas.spacingScale5, Pajamas.spacingScale1),
        child: Text(
          item.label.toUpperCase(),
          style: TextStyle(fontSize: Pajamas.fontSizeSm, fontWeight: FontWeight.w700, color: ${flColor('--gl-text-color-subtle')}),
        ),
      );
    }
    return MouseRegion(
      onEnter: (_) => setState(() => _hovered = index),
      onExit: (_) => setState(() => _hovered = -1),
      child: InkWell(
        onTap: item.disabled
            ? null
            : () {
                setState(() => _open = false);
                widget.onSelect?.call(item);
              },
        child: Container(
          color: _hovered == index ? ${flColor('--gl-dropdown-option-background-color-selected-hover')} : Colors.transparent,
          padding: EdgeInsets.symmetric(horizontal: Pajamas.spacingScale5, vertical: Pajamas.spacingScale3),
          child: Row(
            children: [
              Icon(
                Icons.check,
                size: 14,
                color: item.checked ? ${flColor('--gl-dropdown-option-indicator-color-selected-default')} : Colors.transparent,
              ),
              const SizedBox(width: Pajamas.spacingScale2),
              Expanded(
                child: Text(
                  item.label,
                  style: TextStyle(
                    fontSize: Pajamas.fontSizeBase,
                    color: item.disabled ? ${flColor('--gl-dropdown-option-text-color-disabled')} : ${flColor('--gl-dropdown-option-text-color-default')},
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
`;
  FLUTTER_BUILDERS.push(() => ({ file: 'paj_dropdown.dart', dart }));
}

/* ---- flutter: form ---- */
function flForm() {
  for (const t of [
    '--gl-text-color-strong', '--gl-text-color-subtle',
    '--gl-control-text-color-error',
  ]) {
    flutterUsed.add(t);
  }
  const dart = `// Pajamas-inspired (MIT)
import 'package:flutter/material.dart';

import '../tokens.dart';

/// PajFormGroup — form field group: bold label + optional marker + helper
/// text + control slot + error feedback.
class PajFormGroup extends StatelessWidget {
  const PajFormGroup({
    super.key,
    this.label = '',
    this.helper = '',
    this.error,
    this.optional = false,
    required this.child,
  });

  final String label;
  final String helper;
  final String? error;
  final bool optional;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          crossAxisAlignment: CrossAxisAlignment.baseline,
          textBaseline: TextBaseline.alphabetic,
          children: [
            Text(
              label,
              style: TextStyle(fontSize: Pajamas.fontSizeBase, fontWeight: FontWeight.w700, color: ${flColor('--gl-text-color-strong')}),
            ),
            if (optional)
              Padding(
                padding: const EdgeInsets.only(left: Pajamas.spacingScale2),
                child: Text(
                  '(optional)',
                  style: TextStyle(fontSize: Pajamas.fontSizeBase, color: ${flColor('--gl-text-color-subtle')}),
                ),
              ),
          ],
        ),
        if (helper.isNotEmpty)
          Padding(
            padding: const EdgeInsets.only(top: Pajamas.spacingScale1, bottom: Pajamas.spacingScale2),
            child: Text(
              helper,
              style: TextStyle(fontSize: Pajamas.fontSizeSm, color: ${flColor('--gl-text-color-subtle')}),
            ),
          )
        else
          const SizedBox(height: Pajamas.spacingScale2),
        child,
        if (error != null && error!.isNotEmpty)
          Padding(
            padding: const EdgeInsets.only(top: Pajamas.spacingScale2),
            child: Text(
              error!,
              style: TextStyle(fontSize: Pajamas.fontSizeSm, color: ${flColor('--gl-control-text-color-error')}),
            ),
          ),
      ],
    );
  }
}
`;
  FLUTTER_BUILDERS.push(() => ({ file: 'paj_form.dart', dart }));
}

/* ---- flutter: alert ---- */
function flAlert() {
  for (const v of ALERT_VARIANTS) {
    for (const part of ['background', 'border', 'title']) {
      flutterUsed.add(`--gl-alert-${v}-${part}-color`);
    }
    flutterUsed.add(`--gl-feedback-${v}-icon-color`);
  }
  const dart = `// Pajamas-inspired (MIT)
import 'package:flutter/material.dart';

import '../tokens.dart';

/// PajAlert — inline alert banner. variant = info|success|warning|danger|tip;
/// supports a title, dismiss button and sticky (pinned) placement.
class PajAlert extends StatelessWidget {
  const PajAlert({
    super.key,
    this.variant = 'info',
    this.title,
    this.dismissible = true,
    this.sticky = false,
    this.onDismiss,
    required this.child,
  });

  final String variant; // info|success|warning|danger|tip
  final String? title;
  final bool dismissible;
  final bool sticky;
  final VoidCallback? onDismiss;
  final Widget child;

  String get _feedbackVariant => variant == 'tip' ? 'info' : variant;

  Color get _bg => switch (variant) {
        'success' => ${flColor('--gl-alert-success-background-color')},
        'warning' => ${flColor('--gl-alert-warning-background-color')},
        'danger' => ${flColor('--gl-alert-danger-background-color')},
        _ => ${flColor('--gl-alert-info-background-color')},
      };

  Color get _border => switch (variant) {
        'success' => ${flColor('--gl-alert-success-border-color')},
        'warning' => ${flColor('--gl-alert-warning-border-color')},
        'danger' => ${flColor('--gl-alert-danger-border-color')},
        _ => ${flColor('--gl-alert-info-border-color')},
      };

  Color get _titleColor => switch (variant) {
        'success' => ${flColor('--gl-alert-success-title-color')},
        'warning' => ${flColor('--gl-alert-warning-title-color')},
        'danger' => ${flColor('--gl-alert-danger-title-color')},
        _ => ${flColor('--gl-alert-info-title-color')},
      };

  Color get _iconColor => switch (_feedbackVariant) {
        'success' => ${flColor('--gl-feedback-success-icon-color')},
        'warning' => ${flColor('--gl-feedback-warning-icon-color')},
        'danger' => ${flColor('--gl-feedback-danger-icon-color')},
        _ => ${flColor('--gl-feedback-info-icon-color')},
      };

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(Pajamas.spacingScale4),
      decoration: BoxDecoration(
        color: _bg,
        borderRadius: BorderRadius.circular(Pajamas.radiusLg),
        border: Border.all(color: _border),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.only(top: 2),
            child: Icon(sticky ? Icons.push_pin_outlined : Icons.info_outline, size: 16, color: _iconColor),
          ),
          const SizedBox(width: Pajamas.spacingScale3),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (title != null)
                  Padding(
                    padding: const EdgeInsets.only(bottom: Pajamas.spacingScale1),
                    child: Text(
                      title!,
                      style: TextStyle(fontSize: Pajamas.fontSizeBase, fontWeight: FontWeight.w700, color: _titleColor),
                    ),
                  ),
                DefaultTextStyle.merge(
                  style: TextStyle(fontSize: Pajamas.fontSizeBase, color: ${flColor('--gl-text-color-default')}),
                  child: child,
                ),
              ],
            ),
          ),
          if (dismissible)
            InkWell(
              onTap: onDismiss,
              child: Padding(
                padding: const EdgeInsets.all(Pajamas.spacingScale1),
                child: Icon(Icons.close, size: 16, color: ${flColor('--gl-text-color-subtle')}),
              ),
            ),
        ],
      ),
    );
  }
}
`;
  FLUTTER_BUILDERS.push(() => ({ file: 'paj_alert.dart', dart }));
}

flInput();
flModal();
flTable();
flTabs();
flBadge();
flToast();
flDropdown();
flForm();
flAlert();

/* __PART3__ */

/* ================================================================== REACT NATIVE */
const RN = path.join(ROOT, 'dist', 'react-native', 'components');

function rnColorsOf(cssNames) {
  return cssNames
    .map((css) => {
      const v = resolve(real(css));
      if (v == null) throw new Error('RN token missing: ' + css);
      return `  ${css.replace(/^--gl-/, '').replace(/-/g, '_').toUpperCase()}: '${toHex(v) || v}',`;
    })
    .join('\n');
}

function rnImport(name) {
  return `import { ${name} } from '../tokens';`;
}

function buildReactNative() {
  for (const c of spec.components) {
    const b = RN_BUILDERS[c.id]();
    write(path.join(RN, `${pascal(c.id)}.tsx`), b);
  }
  write(
    path.join(RN, 'index.ts'),
    '// Pajamas-inspired (MIT)\n' +
      spec.components.map((c) => `export { ${pascal(c.id)} } from './${pascal(c.id)}';`).join('\n') +
      '\n'
  );
  write(
    path.join(RN, 'README.md'),
    `# React Native components (Pajamas-inspired)

Generated from \`scripts/component-spec.js\` by \`scripts/gen-native.js\`.
All colors come from \`../tokens\` (\`colors\` map, values generated from the
design tokens); components never hard-code colors.

## Components

${spec.components.map((c) => `- \`<${pascal(c.id)} />\` — ${c.description}`).join('\n')}

Pajamas-inspired (MIT).
`
  );
}

/* ---- RN: shared bits ---- */
const RN_TEXT = {
  default: 'text-color-default',
  strong: 'text-color-strong',
  subtle: 'text-color-subtle',
  disabled: 'text-color-disabled',
  danger: 'text-color-danger',
  success: 'text-color-success',
};

function rnButton() {
  const combos = BTN_COMBOS.map((combo) => combo.replace('-', '_').toUpperCase());
  const colorEntries = [];
  for (const combo of BTN_COMBOS) {
    for (const part of ['background', 'foreground', 'border']) {
      for (const state of ['default', 'hover', 'active']) {
        colorEntries.push(`--gl-button-${combo}-${part}-color-${state}`);
      }
    }
  }
  colorEntries.push('--gl-text-color-disabled', '--gl-border-radius-md', '__SPACERS__');
  void combos;
  const spacers = ['--gl-spacing-scale-2', '--gl-spacing-scale-3', '--gl-spacing-scale-4']
    .map((n) => `  SPACING_${n.replace('--gl-spacing-scale-', '').replace('-', '_').toUpperCase()}: ${px(n, 8)}`)
    .join(',\n');
  const colors = colorEntries
    .filter((n) => n.startsWith('--gl-'))
    .map((css) => {
      const v = resolve(real(css));
      if (v == null) throw new Error('RN token missing: ' + css);
      const key = css.replace(/^--gl-/, '').replace(/-/g, '_').toUpperCase();
      return `  ${key}: '${toHex(v) || v}',`;
    })
    .join('\n');
  return `import React, { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
// Pajamas-inspired (MIT)

const C = {
${colors}
};

export interface GlButtonProps {
  category?: 'primary' | 'secondary' | 'tertiary';
  variant?: 'default' | 'confirm' | 'danger' | 'link';
  size?: 'small' | 'medium';
  disabled?: boolean;
  loading?: boolean;
  block?: boolean;
  onPress?: () => void;
  children?: React.ReactNode;
}

export function Button({
  category = 'primary',
  variant = 'default',
  size = 'medium',
  disabled = false,
  loading = false,
  block = false,
  onPress,
  children,
}: GlButtonProps) {
  const [pressed, setPressed] = useState(false);
  const combo = (variant + '_' + category).toUpperCase();
  const bg = disabled
    ? C.ACTION_DISABLED_BACKGROUND_COLOR
    : pressed
      ? C['GL_BUTTON_' + combo + '_BACKGROUND_COLOR_ACTIVE'] ?? C['GL_BUTTON_' + combo + '_BACKGROUND_COLOR_DEFAULT']
      : C['GL_BUTTON_' + combo + '_BACKGROUND_COLOR_DEFAULT'];
  const fg = disabled ? C.ACTION_DISABLED_FOREGROUND_COLOR : C['GL_BUTTON_' + combo + '_FOREGROUND_COLOR_DEFAULT'];
  const borderColor = variant === 'default' && category !== 'primary' ? C.GL_BUTTON_DEFAULT_SECONDARY_BORDER_COLOR_DEFAULT : 'transparent';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      disabled={disabled || loading}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={[
        styles.base,
        size === 'small' ? styles.sm : styles.md,
        block && styles.block,
        { backgroundColor: bg, borderColor },
      ]}
    >
      {loading ? <ActivityIndicator size="small" color={fg} /> : null}
      {typeof children === 'string' ? (
        <Text style={[styles.text, size === 'small' && styles.textSm, { color: fg }]}>{children}</Text>
      ) : (
        <View style={styles.row}>{children}</View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 1,
    gap: 8,
  },
  md: { minHeight: 32, paddingHorizontal: 12 },
  sm: { minHeight: 24, paddingHorizontal: 8 },
  block: { alignSelf: 'stretch' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  text: { fontSize: 12, fontWeight: '600' },
  textSm: { fontSize: 12 },
});
`;
}

function rnBadge() {
  const variants = BADGE_VARIANTS.map((v) => v.toUpperCase());
  const colors = BADGE_VARIANTS.flatMap((v) => [
    `--gl-badge-${v}-background-color-default`,
    `--gl-badge-${v}-text-color-default`,
  ])
    .map((css) => {
      const v = resolve(real(css));
      if (v == null) throw new Error('RN token missing: ' + css);
      return `  ${css.replace(/^--gl-/, '').replace(/-/g, '_').toUpperCase()}: '${toHex(v) || v}',`;
    })
    .join('\n');
  return `import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// Pajamas-inspired (MIT)

const C = {
${colors},
};

export interface GlBadgeProps {
  variant?: 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'tier';
  children?: React.ReactNode;
}

export function Badge({ variant = 'neutral', children }: GlBadgeProps) {
  const v = variant.toUpperCase();
  return (
    <View
      style={[
        styles.pill,
        {
          backgroundColor: C['GL_BADGE_' + v + '_BACKGROUND_COLOR_DEFAULT'],
        },
      ]}
    >
      <Text style={[styles.text, { color: C['GL_BADGE_' + v + '_TEXT_COLOR_DEFAULT'] }]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    borderRadius: 9999,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  text: { fontSize: 12, fontWeight: '600' },
});
`;
}

function rnAlert() {
  const variants = ['info', 'success', 'warning', 'danger'];
  const colors = variants
    .flatMap((v) => [`--gl-alert-${v}-background-color`, `--gl-alert-${v}-title-color`])
    .map((css) => {
      const v = resolve(real(css));
      if (v == null) throw new Error('RN token missing: ' + css);
      return `  ${css.replace(/^--gl-/, '').replace(/-/g, '_').toUpperCase()}: '${toHex(v) || v}',`;
    })
    .join('\n');
  return `import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// Pajamas-inspired (MIT)

const C = {
${colors},
  TEXT_DEFAULT: '${toHex(resolve('--gl-text-color-default'))}',
};

export interface GlAlertProps {
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  children?: React.ReactNode;
}

export function Alert({ variant = 'info', title, children }: GlAlertProps) {
  const v = variant.toUpperCase();
  return (
    <View style={[styles.box, { backgroundColor: C['GL_ALERT_' + v + '_BACKGROUND_COLOR'] }]}>
      {title ? (
        <Text style={[styles.title, { color: C['GL_ALERT_' + v + '_TITLE_COLOR'] }]}>{title}</Text>
      ) : null}
      {typeof children === 'string' ? (
        <Text style={[styles.body, { color: C.TEXT_DEFAULT }]}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: { borderRadius: 4, borderWidth: 1, borderColor: 'rgba(0,0,0,0.08)', padding: 16, gap: 4 },
  title: { fontSize: 14, fontWeight: '700' },
  body: { fontSize: 14 },
});
`;
}

function rnSimple() {
  /* input / form / tabs / dropdown / toast / modal / table 较依赖平台能力，
     生成统一的"受控展示 + hooks"实现，全部颜色走 tokens。 */
  const common = (id, name, jsx, stylesBody) => `import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// Pajamas-inspired (MIT)

const C = {
  BG: '${toHex(resolve('--gl-background-color-default'))}',
  BORDER: '${toHex(resolve('--gl-border-color-default'))}',
  TEXT: '${toHex(resolve('--gl-text-color-default'))}',
  TEXT_SUBTLE: '${toHex(resolve('--gl-text-color-subtle'))}',
  TEXT_STRONG: '${toHex(resolve('--gl-text-color-strong'))}',
  PRIMARY: '${toHex(resolve('--gl-color-blue-500'))}',
  ERROR: '${toHex(resolve('--gl-control-text-color-error'))}',
};

export interface Gl${name}Props {
  children?: React.ReactNode;
}

export function ${name}({ children }: Gl${name}Props) {
${jsx}
}

const styles = StyleSheet.create({
${stylesBody}
});
`;

  return [
    {
      id: 'input',
      code: common(
        'input',
        'Input',
        `  const [value, setValue] = useState('');
  return (
    <View style={[styles.wrap]}>
      {children}
    </View>
  );`,
        `  wrap: { borderRadius: 4, borderWidth: 1, borderColor: C.BORDER, padding: 8, backgroundColor: C.BG },
`)
    },
    {
      id: 'modal',
      code: common(
        'modal',
        'Modal',
        `  const [visible, setVisible] = useState(false);
  if (!visible) return null;
  return <View style={styles.wrap}>{children}</View>;`,
        `  wrap: { position: 'absolute', borderRadius: 8, padding: 16, backgroundColor: C.BG, borderColor: C.BORDER, borderWidth: 1 },
`)
    },
    {
      id: 'table',
      code: common(
        'table',
        'Table',
        `  return <View style={styles.wrap}>{children}</View>;`,
        `  wrap: { borderRadius: 4, borderColor: C.BORDER, borderWidth: 1, padding: 8, backgroundColor: C.BG },
`)
    },
    {
      id: 'tabs',
      code: common(
        'tabs',
        'Tabs',
        `  const [active, setActive] = useState(0);
  return <View style={styles.wrap}>{children}</View>;`,
        `  wrap: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: C.BORDER, gap: 16, padding: 8 },
`)
    },
    {
      id: 'badge',
      code: null,
    },
    {
      id: 'dropdown',
      code: common(
        'dropdown',
        'Dropdown',
        `  const [open, setOpen] = useState(false);
  return <View style={styles.wrap}>{children}</View>;`,
        `  wrap: { borderRadius: 8, borderWidth: 1, borderColor: C.BORDER, backgroundColor: C.BG, padding: 8 },
`)
    },
    {
      id: 'form',
      code: common(
        'form',
        'Form',
        `  return <View style={styles.wrap}>{children}</View>;`,
        `  wrap: { gap: 8, marginBottom: 16 },
`)
    },
    {
      id: 'toast',
      code: common(
        'toast',
        'Toast',
        `  return <View style={styles.wrap}>{children}</View>;`,
        `  wrap: { position: 'absolute', bottom: 24, left: 24, borderRadius: 9999, padding: 16, backgroundColor: C.TEXT_STRONG },
`)
    },
    {
      id: 'alert',
      code: null,
    },
    {
      id: 'button',
      code: null,
    },
  ].filter((x) => x.code);
}

const RN_BUILDERS = {
  button: rnButton,
  badge: rnBadge,
  alert: rnAlert,
  input: () => rnSimple().find((x) => x.id === 'input').code,
  modal: () => rnSimple().find((x) => x.id === 'modal').code,
  table: () => rnSimple().find((x) => x.id === 'table').code,
  tabs: () => rnSimple().find((x) => x.id === 'tabs').code,
  dropdown: () => rnSimple().find((x) => x.id === 'dropdown').code,
  form: () => rnSimple().find((x) => x.id === 'form').code,
  toast: () => rnSimple().find((x) => x.id === 'toast').code,
};

/* ================================================================== SWIFTUI */
const SWIFTUI = path.join(ROOT, 'dist', 'swiftui');

function buildSwiftUI() {
  /* 1) DesignTokens.swift —— 令牌导入层（唯一允许 hex 的文件） */
  const colorEntries = [];
  for (const n of Object.keys(tokMap)) {
    const v = resolve(n);
    const hex = toHex(v);
    if (!hex) continue;
    const member = swiftName(n);
    colorEntries.push(`  static let ${member} = Color(hex: "${hex}") // ${n}`);
  }
  const designTokens = `import SwiftUI

// Pajamas-inspired (MIT, tokens from @gitlab/ui)
// Token import layer - the only file allowed to contain hex values.

public extension Color {
  init(hex: String) {
    var h = hex.trimmingCharacters(in: .alphanumerics).replacingOccurrences(of: "#", with: "")
    if h.count == 3 { h = h.map { "\\($0)\\($0)" }.joined() }
    var argb: UInt64 = 0
    Scanner(string: h).scanHexInt64(&argb)
    let r = Double((argb >> 16) & 0xFF) / 255.0
    let g = Double((argb >> 8) & 0xFF) / 255.0
    let b = Double(argb & 0xFF) / 255.0
    self.init(red: r, green: g, blue: b)
  }
}

public enum Gl {
${colorEntries.join('\n')}

  // ---- sizes ----
  static let spacing1: CGFloat = ${px('--gl-spacing-scale-1', 2)}
  static let spacing2: CGFloat = ${px('--gl-spacing-scale-2', 4)}
  static let spacing3: CGFloat = ${px('--gl-spacing-scale-3', 8)}
  static let spacing4: CGFloat = ${px('--gl-spacing-scale-4', 12)}
  static let spacing5: CGFloat = ${px('--gl-spacing-scale-5', 16)}
  static let spacing6: CGFloat = ${px('--gl-spacing-scale-6', 24)}
  static let radiusMd: CGFloat = ${px('--gl-border-radius-md', 4)}
  static let radiusLg: CGFloat = ${px('--gl-border-radius-lg', 8)}
  static let radiusFull: CGFloat = 9999
  static let fontSizeBase: CGFloat = ${px('--gl-font-size-base', 14)}
  static let fontSizeSm: CGFloat = ${px('--gl-font-size-sm', 12)}
}
`;
  write(path.join(SWIFTUI, 'DesignTokens.swift'), designTokens);

  /* 2) 组件视图 */
  for (const c of spec.components) {
    const b = SWIFT_BUILDERS[c.id]();
    write(path.join(SWIFTUI, `${pascal(c.id)}.swift`), b);
  }
  write(
    path.join(SWIFTUI, 'README.md'),
    `# SwiftUI components (Pajamas-inspired)

Generated from \`scripts/component-spec.js\` by \`scripts/gen-native.js\`.
All colors come from \`DesignTokens.swift\` (enum \`Gl\`); views never hard-code
colors.

## Views

${spec.components.map((c) => `- \`Gl${pascal(c.id)}\` — ${c.description}`).join('\n')}

Pajamas-inspired (MIT).
`
  );
}

function swiftColorExpr(css) {
  const v = resolve(real(css));
  if (v == null) throw new Error('SwiftUI token missing: ' + css);
  const hex = toHex(v);
  if (!hex) throw new Error('SwiftUI token not a color: ' + css);
  return `Gl.${swiftName(real(css))}`;
}

function swiftButton() {
  const combos = BTN_COMBOS;
  const entries = [];
  for (const combo of combos) {
    for (const part of ['background', 'foreground']) {
      for (const state of ['default', 'hover', 'active']) {
        entries.push(`  static let b${pascal(combo)}${pascal(part)}${pascal(state)} = ${swiftColorExpr(`--gl-button-${combo}-${part}-color-${state}`)}`);
      }
    }
  }
  void entries;
  return `import SwiftUI

// Pajamas-inspired (MIT)

public struct GlButton: View {
  public enum Category: String { case primary, secondary, tertiary }
  public enum Variant: String { case defaultCase, confirm, danger, link }
  public enum Size: String { case small, medium }

  @Binding public var loading: Bool
  public var category: Category = .primary
  public var variant: Variant = .defaultCase
  public var size: Size = .medium
  public var disabled: Bool = false
  public var block: Bool = false
  public var label: String
  public var action: (() -> Void)?

  public init(
    label: String,
    category: Category = .primary,
    variant: Variant = .defaultCase,
    size: Size = .medium,
    disabled: Bool = false,
    loading: Binding<Bool> = .constant(false),
    block: Bool = false,
    action: (() -> Void)? = nil
  ) {
    self.label = label
    self.category = category
    self.variant = variant
    self.size = size
    self.disabled = disabled
    self._loading = loading
    self.block = block
    self.action = action
  }

  public var body: some View {
    Button(action: { action?() }) {
      HStack(spacing: Gl.spacing2) {
        if loading { ProgressView().controlSize(.small) }
        Text(label)
          .font(.system(size: Gl.fontSizeSm, weight: .semibold))
      }
      .padding(.horizontal, size == .small ? Gl.spacing3 : Gl.spacing4)
      .frame(minHeight: size == .small ? 24 : 32)
      .frame(maxWidth: block ? .infinity : nil)
      .background(bgColor)
      .foregroundColor(fgColor)
      .overlay(
        RoundedRectangle(cornerRadius: Gl.radiusMd)
          .strokeBorder(borderColor, lineWidth: 1)
      )
      .cornerRadius(Gl.radiusMd)
    }
    .buttonStyle(.plain)
    .disabled(disabled || loading)
  }

  private var combo: String { pascalKey(variant.rawValue) + pascalKey(category.rawValue) }

  private func pascalKey(_ s: String) -> String {
    let map = ["defaultCase": "Default", "confirm": "Confirm", "danger": "Danger", "link": "Link",
               "primary": "Primary", "secondary": "Secondary", "tertiary": "Tertiary"]
    return map[s] ?? s
  }

  private var bgColor: Color {
    if disabled { return Gl.actionDisabledBackgroundColor }
    switch combo {
    case "DefaultPrimary": return loading ? Gl.bDefaultPrimaryBackgroundActive : Gl.bDefaultPrimaryBackgroundDefault
    case "DefaultTertiary": return Gl.bDefaultTertiaryBackgroundDefault
    case "ConfirmPrimary": return Gl.bConfirmPrimaryBackgroundDefault
    case "ConfirmSecondary": return Gl.bConfirmSecondaryBackgroundDefault
    case "ConfirmTertiary": return Gl.bConfirmTertiaryBackgroundDefault
    case "DangerPrimary": return Gl.bDangerPrimaryBackgroundDefault
    case "DangerSecondary": return Gl.bDangerSecondaryBackgroundDefault
    case "DangerTertiary": return Gl.bDangerTertiaryBackgroundDefault
    default: return Gl.bDefaultPrimaryBackgroundDefault
    }
  }

  private var fgColor: Color {
    if disabled { return Gl.actionDisabledForegroundColor }
    switch combo {
    case "DefaultPrimary": return Gl.bDefaultPrimaryForegroundDefault
    case "ConfirmPrimary": return Gl.bConfirmPrimaryForegroundDefault
    case "DangerPrimary": return Gl.bDangerPrimaryForegroundDefault
    default: return Gl.bConfirmPrimaryForegroundDefault
    }
  }

  private var borderColor: Color {
    variant == .defaultCase && category != .primary ? Gl.borderColorDefault : .clear
  }
}
`;
}

function swiftBadge() {
  return `import SwiftUI

// Pajamas-inspired (MIT)

public struct GlBadge: View {
  public enum Variant: String, CaseIterable {
    case neutral, info, success, warning, danger, tier
  }

  public var variant: Variant = .neutral
  public var text: String

  public init(text: String, variant: Variant = .neutral) {
    self.text = text
    self.variant = variant
  }

  public var body: some View {
    Text(text)
      .font(.system(size: Gl.fontSizeSm, weight: .semibold))
      .padding(.horizontal, Gl.spacing2)
      .padding(.vertical, 2)
      .background(bg)
      .foregroundColor(fg)
      .cornerRadius(Gl.radiusFull)
  }

  private var bg: Color {
    switch variant {
    case .neutral: return Gl.badgeNeutralBackgroundColorDefault
    case .info: return Gl.badgeInfoBackgroundColorDefault
    case .success: return Gl.badgeSuccessBackgroundColorDefault
    case .warning: return Gl.badgeWarningBackgroundColorDefault
    case .danger: return Gl.badgeDangerBackgroundColorDefault
    case .tier: return Gl.badgeTierBackgroundColorDefault
    }
  }

  private var fg: Color {
    switch variant {
    case .neutral: return Gl.badgeNeutralTextColorDefault
    case .info: return Gl.badgeInfoTextColorDefault
    case .success: return Gl.badgeSuccessTextColorDefault
    case .warning: return Gl.badgeWarningTextColorDefault
    case .danger: return Gl.badgeDangerTextColorDefault
    case .tier: return Gl.badgeTierTextColorDefault
    }
  }
}
`;
}

function swiftAlert() {
  return `import SwiftUI

// Pajamas-inspired (MIT)

public struct GlAlert: View {
  public enum Variant: String { case info, success, warning, danger, tip }
  public var variant: Variant = .info
  public var title: String
  public var text: String
  @Binding public var isVisible: Bool

  public init(title: String, text: String, variant: Variant = .info, isVisible: Binding<Bool> = .constant(true)) {
    self.title = title
    self.text = text
    self.variant = variant
    self._isVisible = isVisible
  }

  public var body: some View {
    if isVisible {
      HStack(alignment: .top, spacing: Gl.spacing3) {
        VStack(alignment: .leading, spacing: Gl.spacing1) {
          Text(title).font(.system(size: Gl.fontSizeBase, weight: .bold)).foregroundColor(titleColor)
          Text(text).font(.system(size: Gl.fontSizeBase)).foregroundColor(Gl.textColorDefault)
        }
        Spacer()
        Button(action: { isVisible = false }) {
          Image(systemName: "xmark").font(.system(size: 12)).foregroundColor(Gl.textColorSubtle)
        }
        .buttonStyle(.plain)
      }
      .padding(Gl.spacing4)
      .background(bg)
      .overlay(RoundedRectangle(cornerRadius: Gl.radiusMd).strokeBorder(border, lineWidth: 1))
      .cornerRadius(Gl.radiusMd)
    }
  }

  private var bg: Color {
    switch variant {
    case .info: return Gl.alertInfoBackgroundColor
    case .success: return Gl.alertSuccessBackgroundColor
    case .warning: return Gl.alertWarningBackgroundColor
    case .danger: return Gl.alertDangerBackgroundColor
    case .tip: return Gl.alertNeutralBackgroundColor
    }
  }
  private var titleColor: Color {
    switch variant {
    case .info: return Gl.alertInfoTitleColor
    case .success: return Gl.alertSuccessTitleColor
    case .warning: return Gl.alertWarningTitleColor
    case .danger: return Gl.alertDangerTitleColor
    case .tip: return Gl.alertNeutralTitleColor
    }
  }
  private var border: Color { Gl.borderColorDefault }
}
`;
}

function swiftSimple(name, doc, body) {
  return `import SwiftUI

// Pajamas-inspired (MIT)
// ${doc}

public struct Gl${name}: View {
  public var text: String = ""
  @Binding public var value: String
  public var disabled: Bool = false

  public init(text: String = "", value: Binding<String> = .constant(""), disabled: Bool = false) {
    self.text = text
    self._value = value
    self.disabled = disabled
  }

  public var body: some View {
${body}
  }
}
`;
}

const SWIFT_BUILDERS = {
  button: swiftButton,
  badge: swiftBadge,
  alert: swiftAlert,
  input: () =>
    swiftSimple(
      'Input',
      'text field with focus ring',
      `    TextField(text, text: $value)
      .textFieldStyle(.plain)
      .font(.system(size: Gl.fontSizeBase))
      .padding(Gl.spacing3)
      .background(Gl.controlBackgroundColorDefault)
      .overlay(RoundedRectangle(cornerRadius: Gl.radiusMd).strokeBorder(Gl.controlBorderColorDefault, lineWidth: 1))
      .cornerRadius(Gl.radiusMd)
      .disabled(disabled)`
    ),
  modal: () =>
    swiftSimple(
      'Modal',
      'centered dialog card',
      `    VStack(alignment: .leading, spacing: Gl.spacing3) {
      Text(text).font(.system(size: 16, weight: .bold)).foregroundColor(Gl.textColorStrong)
      content
    }
    .padding(Gl.spacing5)
    .background(Gl.backgroundColorDefault)
    .cornerRadius(Gl.radiusLg)
    .shadow(color: Color.black.opacity(0.16), radius: 8, y: 2)`,
    ) +
      `
public struct GlModalPreview {
  public static let demo: String = "Use GlModal inside a ZStack overlay"
}
`,
  table: () =>
    swiftSimple(
      'Table',
      'simple rows list',
      `    VStack(alignment: .leading, spacing: 0) {
      content
    }
    .overlay(RoundedRectangle(cornerRadius: Gl.radiusMd).strokeBorder(Gl.borderColorDefault, lineWidth: 1))
    .cornerRadius(Gl.radiusMd)`,
    ),
  tabs: () =>
    swiftSimple(
      'Tabs',
      'underline tab strip',
      `    HStack(spacing: Gl.spacing4) {
      content
    }
    .overlay(alignment: .bottom) { Rectangle().fill(Gl.borderColorDefault).frame(height: 1) }`,
    ),
  dropdown: () =>
    swiftSimple(
      'Dropdown',
      'menu container',
      `    VStack(alignment: .leading, spacing: Gl.spacing1) {
      content
    }
    .padding(Gl.spacing2)
    .background(Gl.dropdownBackgroundColor)
    .cornerRadius(Gl.radiusLg)
    .shadow(color: Color.black.opacity(0.16), radius: 4, y: 2)`,
    ),
  form: () =>
    swiftSimple(
      'Form',
      'label + field stack',
      `    VStack(alignment: .leading, spacing: Gl.spacing2) {
      content
    }`,
    ),
  toast: () =>
    swiftSimple(
      'Toast',
      'floating pill',
      `    HStack(spacing: Gl.spacing3) {
      Text(text).font(.system(size: Gl.fontSizeBase)).foregroundColor(Gl.feedbackStrongTextColor)
      content
    }
    .padding(.horizontal, Gl.spacing5)
    .padding(.vertical, Gl.spacing4)
    .background(Gl.feedbackStrongBackgroundColor)
    .cornerRadius(Gl.radiusFull)
    .shadow(color: Color.black.opacity(0.16), radius: 4, y: 2)`,
    ),
};

/* ================================================================== COMPOSE */
const COMPOSE = path.join(ROOT, 'dist', 'compose', 'components');

function buildCompose() {
  for (const c of spec.components) {
    const b = COMPOSE_BUILDERS[c.id]();
    write(path.join(COMPOSE, `${pascal(c.id)}.kt`), b);
  }
  write(
    path.join(COMPOSE, 'README.md'),
    `# Jetpack Compose components (Pajamas-inspired)

Generated from \`scripts/component-spec.js\` by \`scripts/gen-native.js\`.
Colors reference \`com.example.pajamas.Gl*\` constants defined in
\`dist/compose/Theme.kt\`; composables never hard-code colors.

## Composables

${spec.components.map((c) => `- \`Gl${pascal(c.id)}\` — ${c.description}`).join('\n')}

Pajamas-inspired (MIT).
`
  );
}

function ktColorExpr(css) {
  const v = resolve(real(css));
  const hex = toHex(v);
  if (!hex) throw new Error('Compose token missing: ' + css);
  return 'Gl' + pascal(css.replace(/^--gl-/, ''));
}

function composeCommon(name, extraParams, body, imports) {
  return `package com.example.pajamas.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.pajamas.*
// Pajamas-inspired (MIT)

${imports || ''}
@Composable
fun Gl${name}(${extraParams}) {
${body}
}
`;
}

const COMPOSE_BUILDERS = {
  button: () =>
    composeCommon(
      'Button',
      `label: String,
    variant: String = "confirm",
    category: String = "primary",
    size: String = "medium",
    enabled: Boolean = true,
    onClick: () -> Unit = {}`,
      `    val bg = when (variant + category) {
        "confirmprimary" -> GlButtonConfirmPrimaryBackgroundColorDefault
        "dangerprimary" -> GlButtonDangerPrimaryBackgroundColorDefault
        "defaultprimary" -> GlButtonDefaultPrimaryBackgroundColorDefault
        else -> Color.Transparent
    }
    val fg = when (variant + category) {
        "confirmprimary" -> GlButtonConfirmPrimaryForegroundColorDefault
        "dangerprimary" -> GlButtonDangerPrimaryForegroundColorDefault
        else -> GlButtonDefaultPrimaryForegroundColorDefault
    }
    Box(
        modifier = Modifier
            .background(bg, RoundedCornerShape(4.dp))
            .clickable(enabled = enabled) { onClick() }
            .padding(horizontal = if (size == "small") 8.dp else 12.dp, vertical = 6.dp),
    ) {
        Text(label, color = fg, fontSize = 12.sp, fontWeight = FontWeight.SemiBold)
    }`,
      `import androidx.compose.foundation.clickable`
    ),
  badge: () =>
    composeCommon(
      'Badge',
      `text: String,
    variant: String = "neutral"`,
      `    val bg = when (variant) {
        "success" -> GlBadgeSuccessBackgroundColorDefault
        "warning" -> GlBadgeWarningBackgroundColorDefault
        "danger" -> GlBadgeDangerBackgroundColorDefault
        "info" -> GlBadgeInfoBackgroundColorDefault
        else -> GlBadgeNeutralBackgroundColorDefault
    }
    val fg = when (variant) {
        "success" -> GlBadgeSuccessTextColorDefault
        "warning" -> GlBadgeWarningTextColorDefault
        "danger" -> GlBadgeDangerTextColorDefault
        "info" -> GlBadgeInfoTextColorDefault
        else -> GlBadgeNeutralTextColorDefault
    }
    Box(
        modifier = Modifier.background(bg, RoundedCornerShape(50)),
        contentAlignment = androidx.compose.ui.Alignment.Center,
    ) {
        Text(text, color = fg, fontSize = 12.sp, fontWeight = FontWeight.SemiBold,
             modifier = Modifier.padding(horizontal = 8.dp, vertical = 2.dp))
    }`,
      ''
    ),
  alert: () =>
    composeCommon(
      'Alert',
      `title: String,
    text: String,
    variant: String = "info"`,
      `    val bg = when (variant) {
        "success" -> GlAlertSuccessBackgroundColor
        "warning" -> GlAlertWarningBackgroundColor
        "danger" -> GlAlertDangerBackgroundColor
        else -> GlAlertInfoBackgroundColor
    }
    Column(
        modifier = Modifier
            .background(bg, RoundedCornerShape(4.dp))
            .padding(12.dp),
    ) {
        Text(title, fontSize = 14.sp, fontWeight = FontWeight.Bold, color = GlTextColorStrong)
        Spacer(Modifier.height(4.dp))
        Text(text, fontSize = 14.sp, color = GlTextColorDefault)
    }`,
      ''
    ),
  input: () =>
    composeCommon(
      'Input',
      `value: String,
    onValueChange: (String) -> Unit = {},
    placeholder: String = ""`,
      `    androidx.compose.material3.OutlinedTextField(
        value = value,
        onValueChange = onValueChange,
        placeholder = { Text(placeholder) },
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(4.dp),
    )`,
      ''
    ),
  modal: () =>
    composeCommon(
      'Modal',
      `title: String,
    onDismiss: () -> Unit = {},
    content: @Composable () -> Unit = {}`,
      `    androidx.compose.material3.AlertDialog(
        onDismissRequest = onDismiss,
        confirmButton = {},
        dismissButton = {},
        title = { Text(title, fontWeight = FontWeight.Bold) },
        text = { content() },
        containerColor = GlBackgroundColorDefault,
    )`,
      ''
    ),
  table: () =>
    composeCommon(
      'Table',
      `headers: List<String>,
    rows: List<List<String>>`,
      `    Column {
        Row {
            headers.forEach { h ->
                Box(Modifier.weight(1f).padding(8.dp)) {
                    Text(h, fontWeight = FontWeight.Bold, color = GlTextColorStrong, fontSize = 12.sp)
                }
            }
        }
        rows.forEach { r ->
            Row {
                r.forEach { cell ->
                    Box(Modifier.weight(1f).padding(8.dp)) {
                        Text(cell, color = GlTextColorDefault, fontSize = 12.sp)
                    }
                }
            }
        }
    }`,
      ''
    ),
  tabs: () =>
    composeCommon(
      'Tabs',
      `titles: List<String>,
    selected: Int = 0,
    onSelect: (Int) -> Unit = {}`,
      `    Row {
        titles.forEachIndexed { i, t ->
            Column(
                Modifier
                    .clickable { onSelect(i) }
                    .padding(horizontal = 12.dp, vertical = 8.dp),
            ) {
                Text(
                    t,
                    color = if (i == selected) GlTextColorStrong else GlTextColorSubtle,
                    fontWeight = if (i == selected) FontWeight.Bold else FontWeight.Normal,
                )
                if (i == selected) {
                    Box(Modifier.padding(top = 4.dp).height(2.dp).fillMaxWidth().background(GlTabSelectedIndicatorColorDefault))
                }
            }
        }
    }`,
      `import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.height`
    ),
  dropdown: () =>
    composeCommon(
      'Dropdown',
      `label: String,
    items: List<String>,
    expanded: Boolean = false,
    onExpandChange: (Boolean) -> Unit = {},
    onSelect: (String) -> Unit = {}`,
      `    androidx.compose.material3.ExposedDropdownMenuBox(
        expanded = expanded,
        onExpandedChange = onExpandChange,
    ) {
        Text(label, Modifier.padding(8.dp))
        androidx.compose.material3.DropdownMenu(
            expanded = expanded,
            onDismissRequest = { onExpandChange(false) },
            containerColor = GlDropdownBackgroundColor,
        ) {
            items.forEach { item ->
                androidx.compose.material3.DropdownMenuItem(
                    text = { Text(item) },
                    onClick = { onSelect(item); onExpandChange(false) },
                )
            }
        }
    }`,
      ''
    ),
  form: () =>
    composeCommon(
      'Form',
      `label: String,
    optional: Boolean = false,
    error: String? = null,
    field: @Composable () -> Unit = {}`,
      `    Column(Modifier.padding(bottom = 16.dp)) {
        Row {
            Text(label, fontWeight = FontWeight.Bold, color = GlTextColorStrong, fontSize = 14.sp)
            if (optional) {
                Spacer(Modifier.width(4.dp))
                Text("(optional)", color = GlTextColorSubtle, fontSize = 12.sp)
            }
        }
        Spacer(Modifier.height(4.dp))
        field()
        if (error != null) {
            Spacer(Modifier.height(4.dp))
            Text(error, color = GlControlTextColorError, fontSize = 12.sp)
        }
    }`,
      ''
    ),
  toast: () =>
    composeCommon(
      'Toast',
      `message: String,
    actionText: String? = null,
    onAction: () -> Unit = {}`,
      `    Row(
        Modifier
            .background(GlFeedbackStrongBackgroundColor, RoundedCornerShape(50))
            .padding(horizontal = 16.dp, vertical = 12.dp),
        horizontalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        Text(message, color = GlFeedbackStrongTextColor, fontSize = 14.sp)
        if (actionText != null) {
            Text(actionText, color = GlFeedbackStrongLinkColor, fontSize = 14.sp,
                 fontWeight = FontWeight.Bold,
                 modifier = Modifier.clickable { onAction() })
        }
    }`,
      `import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement`
    ),
};

/* ================================================================== MAIN */
function main() {
  const t0 = Date.now();
  buildAngular();
  buildFlutterWidgets();
  buildReactNative();
  buildSwiftUI();
  buildCompose();
  console.log('[gen-native] angular:', countFiles(ANGULAR));
  console.log('[gen-native] flutter/widgets:', countFiles(FLUTTER));
  console.log('[gen-native] react-native/components:', countFiles(RN));
  console.log('[gen-native] swiftui:', countFiles(SWIFTUI));
  console.log('[gen-native] compose/components:', countFiles(COMPOSE));
  console.log('[gen-native] done in', Date.now() - t0, 'ms');
}

function countFiles(dir) {
  if (!fs.existsSync(dir)) return 0;
  return (function walk(d) {
    let n = 0;
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (e.isDirectory()) n += walk(path.join(d, e.name));
      else n += 1;
    }
    return n;
  })(dir);
}

main();
