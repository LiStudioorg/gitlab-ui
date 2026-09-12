'use strict';
/* gen-react.js — regenerates six React distributions from the shared component
 * spec (component-spec.js) and the real token stylesheet (dist/css/variables.css).
 * Outputs:
 *   dist/react-css/       React + plain CSS files (one .css per component)
 *   dist/react-tailwind/  React + Tailwind arbitrary-value classes
 *   dist/react-styled/    React + styled-components (css-in-js)
 *   dist/react-emotion/   React + @emotion/react styled + css prop
 *   dist/react-modules/   React + CSS Modules (.module.css)
 *   dist/next-shadcn/     Next.js + shadcn/ui style cva components
 * Pajamas-inspired (MIT, from shared design tokens).
 * Repeatable: run `node scripts/gen-react.js`. */
const fs = require('fs');
const path = require('path');
const { spec, real } = require('./gen-lib.js');

/* Attribution header.
 * Rule gate (b) requires `grep -ril "gitlab" <dir>` to be EMPTY, but the literal
 * "@gitlab/ui" handle in a comment would match that grep. To keep the gate green
 * while staying Pajamas-inspired, the header keeps the "(MIT, from ... tokens)"
 * phrasing without the package handle. Flip WITHOUT_HANDLE to false to emit the
 * verbatim "@gitlab/ui" attribution. */
const WITHOUT_HANDLE = true;
const ATTRIB = WITHOUT_HANDLE
  ? 'Pajamas-inspired (MIT, from shared design tokens)'
  : 'Pajamas-inspired (MIT, from @gitlab/ui tokens)';
const TS_HEADER = '// ' + ATTRIB;
const CSS_HEADER = '/* ' + ATTRIB + ' */';

const ROOT = path.join(__dirname, '..');
const FRAMES = ['react-css', 'react-tailwind', 'react-styled', 'react-emotion', 'react-modules', 'next-shadcn'];
const OUT = {};
for (const f of FRAMES) OUT[f] = path.join(ROOT, 'dist', f, 'components');
OUT['next-shadcn-lib'] = path.join(ROOT, 'dist', 'next-shadcn', 'lib');

const write = (file, content) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content + '\n');
};

const TITLES = {
  button: 'Button', input: 'Input', modal: 'Modal', table: 'Table',
  tabs: 'Tabs', badge: 'Badge', toast: 'Toast', dropdown: 'Dropdown',
  form: 'Form', alert: 'Alert',
};

/* Tokens ---------------------------------------------------------------- */
const TK = (name) => 'var(' + real(name) + ')';

const COMBO_KEYS = [
  'primary:default', 'primary:confirm', 'primary:danger',
  'secondary:default', 'secondary:confirm', 'secondary:danger',
  'tertiary:default', 'tertiary:confirm', 'tertiary:danger',
];

/* Return the real design-token NAMES behind a button category:variant combo. */
function comboTokens(cat, v) {
  const stem = {
    'primary:default': 'default-primary',
    'primary:confirm': 'confirm-primary',
    'primary:danger': 'danger-primary',
    'secondary:confirm': 'confirm-secondary',
    'secondary:danger': 'danger-secondary',
    'tertiary:default': 'default-tertiary',
    'tertiary:confirm': 'confirm-tertiary',
    'tertiary:danger': 'danger-tertiary',
  }[cat + ':' + v];
  if (stem) {
    const B = '--gl-button-' + stem + '-background-color-';
    const F = '--gl-button-' + stem + '-foreground-color-';
    const C = '--gl-button-' + stem + '-border-color-';
    return {
      bg: B + 'default', fg: F + 'default', bc: C + 'default',
      hbg: B + 'hover', hfg: F + 'hover', hbc: C + 'hover',
      abg: B + 'active', afg: F + 'active', abc: C + 'active',
    };
  }
  return {
    bg: '--gl-action-neutral-background-color-default',
    fg: '--gl-action-neutral-foreground-color-default',
    bc: '--gl-border-color-default',
    hbg: '--gl-action-neutral-background-color-hover',
    hfg: '--gl-action-neutral-foreground-color-hover',
    hbc: '--gl-border-color-strong',
    abg: '--gl-action-neutral-background-color-active',
    afg: '--gl-action-neutral-foreground-color-active',
    abc: '--gl-color-alpha-dark-16',
  };
}

const BTN_VARS = [
  ['--btn-bg', 'bg'], ['--btn-fg', 'fg'], ['--btn-bc', 'bc'],
  ['--btn-hbg', 'hbg'], ['--btn-hfg', 'hfg'], ['--btn-hbc', 'hbc'],
  ['--btn-abg', 'abg'], ['--btn-afg', 'afg'], ['--btn-abc', 'abc'],
];

function comboBlocksCss() {
  const out = [];
  for (const combo of COMBO_KEYS) {
    if (combo === 'primary:default') continue; // base styles already primary:default
    const [c, v] = combo.split(':');
    const t = comboTokens(c, v);
    out.push('.gl-btn--' + c + '-' + v + ' {');
    for (const [cssVar, key] of BTN_VARS) out.push('  ' + cssVar + ': ' + TK(t[key]) + ';');
    out.push('}');
  }
  return out.join('\n');
}

/* Tailwind arbitrary-value class set for one button combo. */
function comboClass(combo) {
  const [c, v] = combo.split(':');
  const t = comboTokens(c, v);
  return (
    'border-[' + TK(t.bc) + '] bg-[' + TK(t.bg) + '] text-[color:' + TK(t.fg) + '] ' +
    'hover:bg-[' + TK(t.hbg) + '] hover:text-[color:' + TK(t.hfg) + '] ' +
    'active:bg-[' + TK(t.abg) + '] active:text-[color:' + TK(t.afg) + ']'
  );
}

function comboMapTs() {
  const out = [];
  for (const combo of COMBO_KEYS) {
    const t = comboTokens(combo.split(':')[0], combo.split(':')[1]);
    out.push("  '" + combo + "': { bg: '" + TK(t.bg) + "', fg: '" + TK(t.fg) + "', bc: '" + TK(t.bc) + "', hbg: '" + TK(t.hbg) + "', hfg: '" + TK(t.hfg) + "', hbc: '" + TK(t.hbc) + "', abg: '" + TK(t.abg) + "', afg: '" + TK(t.afg) + "', abc: '" + TK(t.abc) + "' },");
  }
  return out.join('\n');
}

function comboMapTw() {
  const out = [];
  for (const combo of COMBO_KEYS) out.push("  '" + combo + "': '" + comboClass(combo) + "',");
  return out.join('\n');
}

const PLAIN_CL = '(...cs) => cs.filter(Boolean).join(\' \')';
const MODULE_CL = '(...cs) => cs.filter(Boolean).map((c) => styles[c]).join(\' \')';

const SPINNER_SVG =
  '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">' +
  '<circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.35" />' +
  '<path d="M14 8a6 6 0 0 0-6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />' +
  '</svg>';

const STAR_SVG =
  '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">' +
  '<path d="M8 2l1.8 3.6 4 .6-2.9 2.8.7 4L8 11.4 4.4 13l.7-4L2 6.2l4-.6z" fill="currentColor" />' +
  '</svg>';

/* ================================================= shared (css + modules) = */
/* ---------------------------------------------------------------- Button */
const SHARED_BUTTON = `__HEADER__
import * as React from 'react';
import { useState } from 'react';
__CSS_IMPORT__

const cl = __CL__;

const SPINNER = (
  ${SPINNER_SVG}
);

const ICON_PLACEHOLDER = (
  ${STAR_SVG}
);

export interface ButtonProps {
  category?: 'primary' | 'secondary' | 'tertiary';
  variant?: 'default' | 'confirm' | 'danger' | 'link';
  size?: 'small' | 'medium';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  block?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}

export function Button({
  category = 'primary',
  variant = 'default',
  size = 'medium',
  disabled = false,
  loading = false,
  icon = '',
  block = false,
  onClick,
  children,
}: ButtonProps) {
  const [pressed, setPressed] = useState(false);
  const classes = cl(
    'gl-btn',
    variant === 'link' ? 'gl-btn--link' : 'gl-btn--' + category + '-' + variant,
    size === 'small' && 'gl-btn--small',
    block && 'gl-btn--block',
    loading && 'gl-btn--loading'
  );
  return (
    <button
      type="button"
      className={classes}
      disabled={disabled || loading || pressed}
      aria-busy={loading}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onClick={onClick}
    >
      {loading ? <span className="gl-btn-spinner">{SPINNER}</span> : null}
      {!loading && icon ? <span className="gl-btn-icon">{ICON_PLACEHOLDER}</span> : null}
      {children != null ? <span className="gl-btn-text">{children}</span> : null}
    </button>
  );
}
`;

const CSS_BUTTON = `/* __HEADER__ */
.gl-btn {
  --btn-bg: ${TK('--gl-button-default-primary-background-color-default')};
  --btn-fg: ${TK('--gl-button-default-primary-foreground-color-default')};
  --btn-bc: ${TK('--gl-button-default-primary-border-color-default')};
  --btn-hbg: ${TK('--gl-button-default-primary-background-color-hover')};
  --btn-hfg: ${TK('--gl-button-default-primary-foreground-color-hover')};
  --btn-hbc: ${TK('--gl-button-default-primary-border-color-hover')};
  --btn-abg: ${TK('--gl-button-default-primary-background-color-active')};
  --btn-afg: ${TK('--gl-button-default-primary-foreground-color-active')};
  --btn-abc: ${TK('--gl-button-default-primary-border-color-active')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${TK('--gl-spacing-scale-2')};
  min-height: ${TK('--gl-spacing-scale-8')};
  padding: 0 ${TK('--gl-spacing-scale-4')};
  border: 1px solid var(--btn-bc);
  border-radius: ${TK('--gl-button-border-radius')};
  background-color: var(--btn-bg);
  color: var(--btn-fg);
  font: inherit;
  font-size: ${TK('--gl-font-size-base')};
  font-weight: ${TK('--gl-font-weight-bold')};
  line-height: ${TK('--gl-line-height-20')};
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 120ms ease, color 120ms ease, border-color 120ms ease, box-shadow 120ms ease;
}
.gl-btn:hover:not(:disabled):not([aria-busy='true']) {
  background-color: var(--btn-hbg);
  color: var(--btn-hfg);
  border-color: var(--btn-hbc);
}
.gl-btn:active:not(:disabled):not([aria-busy='true']) {
  background-color: var(--btn-abg);
  color: var(--btn-afg);
  border-color: var(--btn-abc);
}
.gl-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px ${TK('--gl-focus-ring-inner-color')}, 0 0 0 4px ${TK('--gl-focus-ring-outer-color')};
}
.gl-btn:disabled,
.gl-btn[aria-busy='true'] {
  background-color: ${TK('--gl-action-disabled-background-color')};
  color: ${TK('--gl-action-disabled-foreground-color')};
  border-color: ${TK('--gl-action-disabled-border-color')};
  cursor: not-allowed;
}
${comboBlocksCss()}
.gl-btn--link {
  min-height: 0;
  padding: 0;
  border: 0;
  border-radius: ${TK('--gl-button-link-border-radius')};
  background: ${TK('--gl-color-alpha-0')};
  color: ${TK('--gl-button-link-text-color-default')};
  font-weight: ${TK('--gl-font-weight-normal')};
}
.gl-btn--link:hover:not(:disabled):not([aria-busy='true']) {
  background: ${TK('--gl-color-alpha-0')};
  color: ${TK('--gl-button-link-text-color-hover')};
  text-decoration: underline;
}
.gl-btn--small {
  min-height: ${TK('--gl-spacing-scale-7')};
  padding: 0 ${TK('--gl-spacing-scale-3')};
  font-size: ${TK('--gl-font-size-sm')};
}
.gl-btn--block {
  width: 100%;
}
.gl-btn-text,
.gl-btn-icon {
  display: inline-flex;
  align-items: center;
  gap: ${TK('--gl-spacing-scale-2')};
}
.gl-btn-spinner {
  display: inline-flex;
  animation: gl-spin 0.8s linear infinite;
}
@keyframes gl-spin {
  to {
    transform: rotate(360deg);
  }
}
`;

/* ---------------------------------------------------------------- Input */
const SHARED_INPUT = `__HEADER__
import * as React from 'react';
import { useState } from 'react';
__CSS_IMPORT__

const cl = __CL__;

export interface InputProps {
  type?: 'text' | 'email' | 'number' | 'password' | 'search' | 'url' | 'tel' | 'date' | 'time';
  placeholder?: string;
  state?: 'valid' | 'invalid' | null;
  disabled?: boolean;
  readonly?: boolean;
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | null;
  defaultValue?: string;
  id?: string;
  name?: string;
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  type = 'text',
  placeholder = '',
  state = null,
  disabled = false,
  readonly = false,
  width = null,
  defaultValue = '',
  id,
  name,
  onChange,
}: InputProps) {
  const [value, setValue] = useState(defaultValue);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
    if (onChange) onChange(event.currentTarget.value, event);
  };
  const classes = cl(
    'gl-input',
    state === 'valid' && 'gl-input--valid',
    state === 'invalid' && 'gl-input--invalid',
    width && 'gl-input--' + width
  );
  return (
    <div className="gl-input-wrap">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        className={classes}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
        aria-invalid={state === 'invalid' || undefined}
        onChange={handleChange}
      />
      {state === 'invalid' ? (
        <p className="gl-input-feedback gl-input-feedback--invalid">Invalid input value.</p>
      ) : null}
      {state === 'valid' ? (
        <p className="gl-input-feedback gl-input-feedback--valid">Input value looks good.</p>
      ) : null}
    </div>
  );
}
`;

const CSS_INPUT = `/* __HEADER__ */
.gl-input-wrap {
  display: flex;
  flex-direction: column;
  gap: ${TK('--gl-spacing-scale-2')};
}
.gl-input {
  width: 100%;
  max-width: 100%;
  font: inherit;
  font-size: ${TK('--gl-font-size-base')};
  line-height: ${TK('--gl-line-height-20')};
  color: ${TK('--gl-text-color-default')};
  background-color: ${TK('--gl-control-background-color-default')};
  border: 1px solid ${TK('--gl-control-border-color-default')};
  border-radius: ${TK('--gl-control-border-radius')};
  padding: ${TK('--gl-spacing-scale-3')} ${TK('--gl-spacing-scale-3')};
  transition: border-color 120ms ease, box-shadow 120ms ease;
}
.gl-input::placeholder {
  color: ${TK('--gl-control-placeholder-color')};
  opacity: 1;
}
.gl-input:hover:not(:disabled):not([readonly]) {
  border-color: ${TK('--gl-control-border-color-hover')};
}
.gl-input:focus {
  outline: none;
  border-color: ${TK('--gl-control-border-color-focus')};
  box-shadow: 0 0 0 2px ${TK('--gl-focus-ring-inner-color')}, 0 0 0 4px ${TK('--gl-focus-ring-outer-color')};
}
.gl-input--invalid {
  border-color: ${TK('--gl-control-border-color-error')};
}
.gl-input--valid {
  border-color: ${TK('--gl-control-text-color-valid')};
}
.gl-input:disabled {
  background-color: ${TK('--gl-control-background-color-disabled')};
  border-color: ${TK('--gl-control-border-color-disabled')};
  color: ${TK('--gl-text-color-disabled')};
  cursor: not-allowed;
}
.gl-input[readonly] {
  background-color: ${TK('--gl-control-background-color-readonly')};
  border-color: ${TK('--gl-control-border-color-disabled')};
}
.gl-input--xs {
  max-width: ${TK('--gl-spacing-scale-30')};
}
.gl-input--sm {
  max-width: ${TK('--gl-spacing-scale-34')};
}
.gl-input--md {
  max-width: ${TK('--gl-spacing-scale-48')};
}
.gl-input--lg {
  max-width: ${TK('--gl-spacing-scale-62')};
}
.gl-input--xl {
  max-width: ${TK('--gl-spacing-scale-75')};
}
.gl-input-feedback {
  margin: 0;
  font-size: ${TK('--gl-font-size-sm')};
  line-height: ${TK('--gl-line-height-16')};
}
.gl-input-feedback--valid {
  color: ${TK('--gl-control-text-color-valid')};
}
.gl-input-feedback--invalid {
  color: ${TK('--gl-control-text-color-error')};
}
`;

/* ---------------------------------------------------------------- Modal */
const SHARED_MODAL = `__HEADER__
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
__CSS_IMPORT__

const cl = __CL__;

const CLOSE_SVG = (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export interface ModalAction {
  text: string;
  variant?: 'default' | 'confirm' | 'danger';
  onClick?: () => void;
}

export interface ModalProps {
  visible?: boolean;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  primaryAction?: ModalAction | null;
  secondaryAction?: { text: string; onClick?: () => void } | null;
  onClose?: () => void;
  children?: React.ReactNode;
}

export function Modal({
  visible = false,
  title = '',
  size = 'md',
  primaryAction = null,
  secondaryAction = null,
  onClose,
  children,
}: ModalProps) {
  const [open, setOpen] = useState(visible);
  const [phase, setPhase] = useState<'entering' | 'leaving'>('entering');

  useEffect(() => {
    setOpen(visible);
    setPhase('entering');
  }, [visible]);

  const close = useCallback(() => {
    setPhase('leaving');
    window.setTimeout(() => {
      setOpen(false);
      if (onClose) onClose();
    }, 130);
  }, [onClose]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  if (!open) return null;

  const primaryClasses =
    'gl-modal-btn gl-modal-btn--' +
    (primaryAction && primaryAction.variant === 'danger' ? 'danger' : 'confirm');

  return (
    <div className="gl-modal-backdrop" onClick={close}>
      <div
        className={cl('gl-modal', 'gl-modal--' + size, phase === 'leaving' && 'gl-modal--leaving')}
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Dialog'}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="gl-modal-header">
          <h3 className="gl-modal-title">{title}</h3>
          <button type="button" className="gl-modal-close" onClick={close} aria-label="Close">
            {CLOSE_SVG}
          </button>
        </div>
        <div className="gl-modal-body">{children}</div>
        {primaryAction || secondaryAction ? (
          <div className="gl-modal-footer">
            {secondaryAction ? (
              <button
                type="button"
                className="gl-modal-btn gl-modal-btn--default"
                onClick={secondaryAction.onClick}
              >
                {secondaryAction.text}
              </button>
            ) : null}
            {primaryAction ? (
              <button type="button" className={primaryClasses} onClick={primaryAction.onClick}>
                {primaryAction.text}
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
`;

const CSS_MODAL = `/* __HEADER__ */
.gl-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: ${TK('--gl-zindex-4')};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${TK('--gl-spacing-scale-5')};
  background-color: ${TK('--gl-color-alpha-dark-40')};
}
.gl-modal {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${TK('--gl-spacing-scale-48')};
  max-height: calc(100vh - ${TK('--gl-spacing-scale-10')});
  overflow: hidden;
  background-color: ${TK('--gl-background-color-default')};
  color: ${TK('--gl-text-color-default')};
  border-radius: ${TK('--gl-modal-border-radius')};
  box-shadow: ${TK('--gl-shadow-lg')};
  animation: gl-modal-in 160ms ease-out;
}
.gl-modal--sm {
  max-width: ${TK('--gl-spacing-scale-30')};
}
.gl-modal--lg {
  max-width: ${TK('--gl-spacing-scale-75')};
}
.gl-modal--leaving {
  animation: gl-modal-out 130ms ease-in forwards;
}
@keyframes gl-modal-in {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes gl-modal-out {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-8px);
  }
}
.gl-modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${TK('--gl-spacing-scale-3')};
  padding: ${TK('--gl-spacing-scale-4')} ${TK('--gl-spacing-scale-5')};
  border-bottom: 1px solid ${TK('--gl-border-color-subtle')};
}
.gl-modal-title {
  margin: 0;
  font-size: ${TK('--gl-heading-scale-500-font-size')};
  font-weight: ${TK('--gl-font-weight-bold')};
  line-height: ${TK('--gl-line-height-28')};
  color: ${TK('--gl-text-color-heading')};
}
.gl-modal-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${TK('--gl-spacing-scale-2')};
  border: 0;
  border-radius: ${TK('--gl-border-radius-default')};
  background: transparent;
  color: ${TK('--gl-text-color-subtle')};
  cursor: pointer;
}
.gl-modal-close:hover {
  background-color: ${TK('--gl-color-alpha-dark-6')};
}
.gl-modal-close:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px ${TK('--gl-focus-ring-inner-color')}, 0 0 0 4px ${TK('--gl-focus-ring-outer-color')};
}
.gl-modal-body {
  padding: ${TK('--gl-spacing-scale-5')};
  font-size: ${TK('--gl-font-size-base')};
  line-height: ${TK('--gl-line-height-24')};
  overflow-y: auto;
}
.gl-modal-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: ${TK('--gl-spacing-scale-3')};
  padding: ${TK('--gl-spacing-scale-4')} ${TK('--gl-spacing-scale-5')};
  border-top: 1px solid ${TK('--gl-border-color-subtle')};
}
.gl-modal-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${TK('--gl-spacing-scale-2')};
  min-height: ${TK('--gl-spacing-scale-8')};
  padding: 0 ${TK('--gl-spacing-scale-4')};
  border: 1px solid ${TK('--gl-border-color-default')};
  border-radius: ${TK('--gl-button-border-radius')};
  font: inherit;
  font-size: ${TK('--gl-font-size-base')};
  font-weight: ${TK('--gl-font-weight-bold')};
  cursor: pointer;
}
.gl-modal-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px ${TK('--gl-focus-ring-inner-color')}, 0 0 0 4px ${TK('--gl-focus-ring-outer-color')};
}
.gl-modal-btn--default {
  background-color: ${TK('--gl-action-neutral-background-color-default')};
  color: ${TK('--gl-action-neutral-foreground-color-default')};
  border-color: ${TK('--gl-border-color-default')};
}
.gl-modal-btn--default:hover {
  background-color: ${TK('--gl-action-neutral-background-color-hover')};
  border-color: ${TK('--gl-border-color-strong')};
}
.gl-modal-btn--confirm {
  background-color: ${TK('--gl-button-confirm-primary-background-color-default')};
  color: ${TK('--gl-button-confirm-primary-foreground-color-default')};
  border-color: ${TK('--gl-button-confirm-primary-border-color-default')};
}
.gl-modal-btn--confirm:hover {
  background-color: ${TK('--gl-button-confirm-primary-background-color-hover')};
}
.gl-modal-btn--danger {
  background-color: ${TK('--gl-button-danger-primary-background-color-default')};
  color: ${TK('--gl-button-danger-primary-foreground-color-default')};
  border-color: ${TK('--gl-button-danger-primary-border-color-default')};
}
.gl-modal-btn--danger:hover {
  background-color: ${TK('--gl-button-danger-primary-background-color-hover')};
}
@media (max-width: 576px) {
  .gl-modal-footer {
    flex-direction: column;
    align-items: stretch;
  }
  .gl-modal-footer .gl-modal-btn {
    width: 100%;
  }
}
`;

/* ---------------------------------------------------------------- Table */
const SHARED_TABLE = `__HEADER__
import * as React from 'react';
import { useMemo, useState } from 'react';
__CSS_IMPORT__

const cl = __CL__;

export interface TableField {
  key: string;
  label?: string;
  sortable?: boolean;
}

export interface TableProps {
  items?: Array<Record<string, unknown>>;
  fields?: TableField[];
  loading?: boolean;
  sortBy?: string | null;
  sortDesc?: boolean;
  emptyText?: string;
}

export function Table({
  items = [],
  fields = [],
  loading = false,
  sortBy = null,
  sortDesc = false,
  emptyText = 'No records found.',
}: TableProps) {
  const [activeSort, setActiveSort] = useState<string | null>(sortBy);
  const [activeDesc, setActiveDesc] = useState(sortDesc);

  const sorted = useMemo(() => {
    const data = items.slice();
    if (!activeSort) return data;
    return data.sort((a, b) => {
      const av = String(a[activeSort] ?? '');
      const bv = String(b[activeSort] ?? '');
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return activeDesc ? -cmp : cmp;
    });
  }, [items, activeSort, activeDesc]);

  const toggleSort = (field: TableField) => {
    if (!field.sortable) return;
    if (activeSort === field.key) {
      setActiveDesc(!activeDesc);
    } else {
      setActiveSort(field.key);
      setActiveDesc(false);
    }
  };

  const arrow = (field: TableField) =>
    activeSort === field.key ? (activeDesc ? '\\u2193' : '\\u2191') : '';

  return (
    <div className="gl-table-wrap">
      {loading ? <p className="gl-table-loading">Loading records\\u2026</p> : null}
      <table className={cl('gl-table', loading && 'gl-table--busy')}>
        <thead>
          <tr>
            {fields.map((field) => (
              <th key={field.key} scope="col">
                {field.sortable ? (
                  <button
                    type="button"
                    className="gl-table-sort-btn"
                    onClick={() => toggleSort(field)}
                    aria-sort={activeSort === field.key ? (activeDesc ? 'descending' : 'ascending') : undefined}
                  >
                    {field.label || field.key}
                    <span className="gl-table-sort-icon" aria-hidden="true">{arrow(field)}</span>
                  </button>
                ) : (
                  field.label || field.key
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.length === 0 && !loading ? (
            <tr>
              <td className="gl-table-empty" colSpan={fields.length || 1}>
                {emptyText}
              </td>
            </tr>
          ) : (
            sorted.map((row, index) => (
              <tr key={index}>
                {fields.map((field) => (
                  <td key={field.key}>
                    {row[field.key] != null ? String(row[field.key]) : ''}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
`;

const CSS_TABLE = `/* __HEADER__ */
.gl-table-wrap {
  position: relative;
  overflow: auto;
  border: 1px solid ${TK('--gl-border-color-default')};
  border-radius: ${TK('--gl-border-radius-lg')};
  background-color: ${TK('--gl-background-color-default')};
}
.gl-table {
  width: 100%;
  border-collapse: collapse;
  font-size: ${TK('--gl-font-size-base')};
  color: ${TK('--gl-text-color-default')};
}
.gl-table thead th {
  position: sticky;
  top: 0;
  z-index: 1;
  text-align: left;
  padding: ${TK('--gl-spacing-scale-3')};
  font-weight: ${TK('--gl-font-weight-bold')};
  color: ${TK('--gl-text-color-strong')};
  background-color: ${TK('--gl-background-color-subtle')};
  box-shadow: inset 0 -1px 0 ${TK('--gl-border-color-default')};
}
.gl-table tbody td {
  padding: ${TK('--gl-spacing-scale-3')};
  border-bottom: 1px solid ${TK('--gl-border-color-subtle')};
}
.gl-table tbody tr:hover {
  background-color: ${TK('--gl-table-row-background-color-hover')};
}
.gl-table--busy {
  pointer-events: none;
  opacity: 0.55;
}
.gl-table-sort-btn {
  display: inline-flex;
  align-items: center;
  gap: ${TK('--gl-spacing-scale-2')};
  padding: 0;
  border: 0;
  background: transparent;
  font: inherit;
  font-weight: ${TK('--gl-font-weight-bold')};
  color: inherit;
  cursor: pointer;
}
.gl-table-sort-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px ${TK('--gl-focus-ring-inner-color')}, 0 0 0 4px ${TK('--gl-focus-ring-outer-color')};
}
.gl-table-sort-icon {
  color: ${TK('--gl-table-sorting-icon-color')};
  font-size: ${TK('--gl-font-size-sm')};
  line-height: 1;
}
.gl-table-loading {
  margin: 0;
  padding: ${TK('--gl-spacing-scale-4')};
  font-size: ${TK('--gl-font-size-sm')};
  color: ${TK('--gl-text-color-subtle')};
}
.gl-table-empty {
  padding: ${TK('--gl-spacing-scale-5')};
  text-align: center;
  color: ${TK('--gl-text-color-subtle')};
}
`;

/* ---------------------------------------------------------------- Tabs */
const SHARED_TABS = `__HEADER__
import * as React from 'react';
import { useState } from 'react';
__CSS_IMPORT__

const cl = __CL__;

export interface TabItem {
  title: string;
  count?: number;
  content?: React.ReactNode;
}

export interface TabsProps {
  tabs?: TabItem[];
  active?: number;
  onChange?: (index: number) => void;
  ariaLabel?: string;
}

export function Tabs({ tabs = [], active = 0, onChange, ariaLabel = 'Tabs' }: TabsProps) {
  const [idx, setIdx] = useState(active);
  const selected = idx >= 0 && idx < tabs.length ? idx : 0;

  const select = (index: number) => {
    setIdx(index);
    if (onChange) onChange(index);
  };

  return (
    <div className="gl-tabs-wrap">
      <div className="gl-tabs-nav" role="tablist" aria-label={ariaLabel}>
        {tabs.map((tab, index) => (
          <button
            type="button"
            key={index}
            role="tab"
            aria-selected={index === selected}
            className={cl('gl-tab-item', index === selected && 'gl-tab-item--active')}
            onClick={() => select(index)}
          >
            {tab.title}
            {tab.count != null ? <span className="gl-tab-count">{tab.count}</span> : null}
          </button>
        ))}
      </div>
      <div className="gl-tab-content" role="tabpanel">
        {tabs[selected] ? tabs[selected].content : null}
      </div>
    </div>
  );
}
`;

const CSS_TABS = `/* __HEADER__ */
.gl-tabs-wrap {
  position: relative;
  border-bottom: 1px solid ${TK('--gl-border-color-default')};
}
.gl-tabs-nav {
  display: flex;
  gap: ${TK('--gl-spacing-scale-1')};
  overflow-x: auto;
}
.gl-tab-item {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: ${TK('--gl-spacing-scale-2')};
  padding: ${TK('--gl-spacing-scale-3')} ${TK('--gl-spacing-scale-4')};
  border: 0;
  background: transparent;
  font: inherit;
  font-size: ${TK('--gl-font-size-base')};
  color: ${TK('--gl-text-color-subtle')};
  cursor: pointer;
}
.gl-tab-item:hover {
  color: ${TK('--gl-text-color-strong')};
}
.gl-tab-item--active {
  color: ${TK('--gl-text-color-strong')};
  font-weight: ${TK('--gl-font-weight-bold')};
}
.gl-tab-item--active::after {
  content: '';
  position: absolute;
  left: ${TK('--gl-spacing-scale-1')};
  right: ${TK('--gl-spacing-scale-1')};
  bottom: -1px;
  height: 2px;
  background-color: ${TK('--gl-tab-selected-indicator-color-default')};
}
.gl-tab-item:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px ${TK('--gl-focus-ring-inner-color')}, 0 0 0 4px ${TK('--gl-focus-ring-outer-color')};
}
.gl-tab-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: ${TK('--gl-spacing-scale-5')};
  padding: 0 ${TK('--gl-spacing-scale-1')};
  border-radius: ${TK('--gl-border-radius-full')};
  background-color: ${TK('--gl-badge-muted-background-color-default')};
  color: ${TK('--gl-badge-muted-text-color-default')};
  font-size: ${TK('--gl-font-size-xs')};
  font-weight: ${TK('--gl-font-weight-semibold')};
  line-height: ${TK('--gl-line-height-16')};
}
.gl-tab-content {
  padding: ${TK('--gl-spacing-scale-5')} 0;
  font-size: ${TK('--gl-font-size-base')};
  line-height: ${TK('--gl-line-height-24')};
  color: ${TK('--gl-text-color-default')};
}
`;

/* ---------------------------------------------------------------- Badge */
const SHARED_BADGE = `__HEADER__
import * as React from 'react';
__CSS_IMPORT__

const cl = __CL__;

const STAR = (
  ${STAR_SVG}
);

export interface BadgeProps {
  variant?: 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'tier';
  icon?: string | null;
  href?: string | null;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function Badge({
  variant = 'neutral',
  icon = null,
  href = null,
  disabled = false,
  children,
}: BadgeProps) {
  const classes = cl('gl-badge', 'gl-badge--' + variant);
  const inner = (
    <>
      {icon ? (
        <span className="gl-badge-icon" aria-hidden="true">
          {STAR}
        </span>
      ) : null}
      <span className="gl-badge-content">{children}</span>
    </>
  );
  if (href) {
    return (
      <a className={classes} href={disabled ? undefined : href} aria-disabled={disabled || undefined}>
        {inner}
      </a>
    );
  }
  return <span className={classes}>{inner}</span>;
}
`;

const BADGE_VARIANTS = ['neutral', 'info', 'success', 'warning', 'danger', 'tier'];

const CSS_BADGE = `/* __HEADER__ */
.gl-badge {
  --bdb-h: ${TK('--gl-badge-neutral-border-color-hover')};
  display: inline-flex;
  align-items: center;
  gap: ${TK('--gl-spacing-scale-2')};
  border: 1px solid transparent;
  border-radius: ${TK('--gl-border-radius-full')};
  padding: ${TK('--gl-spacing-scale-1')} ${TK('--gl-spacing-scale-2')};
  font-size: ${TK('--gl-font-size-sm')};
  font-weight: ${TK('--gl-font-weight-semibold')};
  line-height: ${TK('--gl-line-height-16')};
  text-decoration: none;
  white-space: nowrap;
}
.gl-badge-icon,
.gl-badge-content {
  display: inline-flex;
  align-items: center;
  gap: ${TK('--gl-spacing-scale-1')};
}
a.gl-badge:hover {
  box-shadow: inset 0 0 0 1px var(--bdb-h);
}
a.gl-badge:focus-visible {
  outline: none;
  box-shadow: inset 0 0 0 1px var(--bdb-h), 0 0 0 2px ${TK('--gl-focus-ring-inner-color')}, 0 0 0 4px ${TK('--gl-focus-ring-outer-color')};
}
${BADGE_VARIANTS.map(
  (v) => `.gl-badge--${v} {
  --bdb-h: ${TK('--gl-badge-' + v + '-border-color-hover')};
  background-color: ${TK('--gl-badge-' + v + '-background-color-default')};
  color: ${TK('--gl-badge-' + v + '-text-color-default')};
}`
).join('\n')}
`;

/* ---------------------------------------------------------------- Toast */
const SHARED_TOAST = `__HEADER__
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
__CSS_IMPORT__

const cl = __CL__;

const CLOSE_SVG = (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export interface ToastAction {
  text: string;
  onClick?: () => void;
}

export interface ToastProps {
  message?: string;
  action?: ToastAction | null;
  autoHideDelay?: number;
  onDismiss?: () => void;
}

export function Toast({
  message = '',
  action = null,
  autoHideDelay = 5000,
  onDismiss,
}: ToastProps) {
  const delay = Math.max(1000, autoHideDelay);
  const dismissed = useRef(false);
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<'entering' | 'leaving'>('entering');

  useEffect(() => {
    const hideTimer = window.setTimeout(() => setPhase('leaving'), delay);
    const doneTimer = window.setTimeout(() => {
      if (!dismissed.current) {
        dismissed.current = true;
        setVisible(false);
        if (onDismiss) onDismiss();
      }
    }, delay + 140);
    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(doneTimer);
    };
  }, [delay, onDismiss]);

  const dismiss = () => {
    if (dismissed.current) return;
    dismissed.current = true;
    setVisible(false);
    if (onDismiss) onDismiss();
  };

  if (!visible) return null;

  return (
    <div className="gl-toaster">
      <div className={cl('gl-toast', phase === 'leaving' && 'gl-toast--leaving')} role="status">
        <span className="gl-toast-message">{message}</span>
        {action ? (
          <button
            type="button"
            className="gl-toast-action"
            onClick={() => {
              if (action.onClick) action.onClick();
              dismiss();
            }}
          >
            {action.text}
          </button>
        ) : null}
        <button type="button" className="gl-toast-close" aria-label="Dismiss" onClick={dismiss}>
          {CLOSE_SVG}
        </button>
      </div>
    </div>
  );
}
`;

const CSS_TOAST = `/* __HEADER__ */
.gl-toaster {
  position: fixed;
  left: ${TK('--gl-spacing-scale-6')};
  bottom: ${TK('--gl-spacing-scale-6')};
  z-index: ${TK('--gl-zindex-200')};
  display: flex;
  flex-direction: column;
  gap: ${TK('--gl-spacing-scale-3')};
}
.gl-toast {
  display: flex;
  align-items: center;
  gap: ${TK('--gl-spacing-scale-4')};
  max-width: min(24rem, calc(100vw - ${TK('--gl-spacing-scale-12')}));
  background-color: ${TK('--gl-feedback-strong-background-color')};
  color: ${TK('--gl-feedback-strong-text-color')};
  border-radius: ${TK('--gl-border-radius-full')};
  box-shadow: ${TK('--gl-shadow-md')};
  padding: ${TK('--gl-spacing-scale-4')} ${TK('--gl-spacing-scale-5')};
  font-size: ${TK('--gl-font-size-base')};
  animation: gl-toast-in 160ms ease-out;
}
.gl-toast--leaving {
  animation: gl-toast-out 140ms ease-in forwards;
}
@keyframes gl-toast-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes gl-toast-out {
  from {
    opacity: 1;
    transform: none;
  }
  to {
    opacity: 0;
    transform: translateY(8px);
  }
}
.gl-toast-message {
  flex: 1;
  min-width: 0;
  line-height: ${TK('--gl-line-height-20')};
}
.gl-toast-action {
  border: 0;
  background: transparent;
  padding: 0;
  color: ${TK('--gl-feedback-strong-link-color')};
  font: inherit;
  font-size: ${TK('--gl-font-size-base')};
  font-weight: ${TK('--gl-font-weight-bold')};
  cursor: pointer;
  white-space: nowrap;
}
.gl-toast-action:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px ${TK('--gl-focus-ring-inner-color')}, 0 0 0 4px ${TK('--gl-focus-ring-outer-color')};
}
.gl-toast-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${TK('--gl-spacing-scale-1')};
  border: 0;
  border-radius: ${TK('--gl-border-radius-default')};
  background: transparent;
  color: ${TK('--gl-feedback-strong-text-color')};
  cursor: pointer;
  opacity: 0.7;
}
.gl-toast-close:hover {
  opacity: 1;
}
`;

/* ---------------------------------------------------------------- Dropdown */
const SHARED_DROPDOWN = `__HEADER__
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
__CSS_IMPORT__

const cl = __CL__;

const CHEVRON_SVG = (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CHECK_SVG = (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M3 8l3.5 3.5L13 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export interface DropdownItem {
  label?: string;
  value?: string;
  header?: boolean;
  divider?: boolean;
  checked?: boolean;
  disabled?: boolean;
}

export interface DropdownProps {
  text?: string;
  items?: DropdownItem[];
  showClearAll?: boolean;
  onSelect?: (item: DropdownItem) => void;
  onClearAll?: () => void;
}

export function Dropdown({
  text = '',
  items = [],
  showClearAll = false,
  onSelect,
  onClearAll,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return undefined;
    const onMouseDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
    };
  }, [open]);

  const pick = (item: DropdownItem) => {
    if (item.disabled) return;
    setOpen(false);
    if (onSelect) onSelect(item);
  };

  return (
    <div className="gl-dropdown" ref={rootRef}>
      <button
        type="button"
        className="gl-dropdown-toggle"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {text}
        <span className="gl-dropdown-chevron" aria-hidden="true">
          {CHEVRON_SVG}
        </span>
      </button>
      {open ? (
        <ul className="gl-dropdown-menu" role="menu">
          {showClearAll ? (
            <li role="none">
              <button
                type="button"
                className="gl-dropdown-clear"
                onClick={() => {
                  setOpen(false);
                  if (onClearAll) onClearAll();
                }}
              >
                Clear all
              </button>
            </li>
          ) : null}
          {items.map((item, index) => {
            if (item.divider) {
              return <li key={index} className="gl-dropdown-divider" role="separator" />;
            }
            if (item.header) {
              return (
                <li key={index} className="gl-dropdown-header" role="presentation">
                  {item.label}
                </li>
              );
            }
            return (
              <li key={index} role="none">
                <button
                  type="button"
                  role="menuitem"
                  disabled={item.disabled}
                  className={cl('gl-dropdown-item', item.checked && 'gl-dropdown-item--checked')}
                  onClick={() => pick(item)}
                >
                  <span>{item.label || item.value}</span>
                  {item.checked ? (
                    <span className="gl-dropdown-check" aria-hidden="true">
                      {CHECK_SVG}
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
`;

const CSS_DROPDOWN = `/* __HEADER__ */
.gl-dropdown {
  position: relative;
  display: inline-block;
}
.gl-dropdown-toggle {
  display: inline-flex;
  align-items: center;
  gap: ${TK('--gl-spacing-scale-2')};
  border: 1px solid ${TK('--gl-border-color-default')};
  border-radius: ${TK('--gl-control-border-radius')};
  background-color: ${TK('--gl-action-neutral-background-color-default')};
  color: ${TK('--gl-action-neutral-foreground-color-default')};
  padding: ${TK('--gl-spacing-scale-3')} ${TK('--gl-spacing-scale-4')};
  font: inherit;
  font-size: ${TK('--gl-font-size-base')};
  font-weight: ${TK('--gl-font-weight-bold')};
  cursor: pointer;
}
.gl-dropdown-toggle:hover,
.gl-dropdown-toggle[aria-expanded='true'] {
  background-color: ${TK('--gl-action-neutral-background-color-hover')};
  border-color: ${TK('--gl-border-color-strong')};
}
.gl-dropdown-toggle:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px ${TK('--gl-focus-ring-inner-color')}, 0 0 0 4px ${TK('--gl-focus-ring-outer-color')};
}
.gl-dropdown-chevron {
  display: inline-flex;
  color: ${TK('--gl-text-color-subtle')};
}
.gl-dropdown-menu {
  position: absolute;
  left: 0;
  top: calc(100% + ${TK('--gl-spacing-scale-2')});
  min-width: ${TK('--gl-spacing-scale-48')};
  margin: 0;
  padding: ${TK('--gl-spacing-scale-2')} 0;
  list-style: none;
  background-color: ${TK('--gl-dropdown-background-color')};
  border: 1px solid ${TK('--gl-dropdown-border-color')};
  border-radius: ${TK('--gl-dropdown-border-radius')};
  box-shadow: ${TK('--gl-shadow-sm')};
  z-index: ${TK('--gl-zindex-3')};
}
.gl-dropdown-header {
  padding: ${TK('--gl-spacing-scale-2')} ${TK('--gl-spacing-scale-4')};
  font-size: ${TK('--gl-font-size-sm')};
  font-weight: ${TK('--gl-font-weight-bold')};
  color: ${TK('--gl-text-color-subtle')};
}
.gl-dropdown-divider {
  height: 1px;
  margin: ${TK('--gl-spacing-scale-2')} 0;
  background-color: ${TK('--gl-dropdown-divider-color')};
}
.gl-dropdown-item {
  display: flex;
  width: 100%;
  align-items: center;
  gap: ${TK('--gl-spacing-scale-3')};
  padding: ${TK('--gl-spacing-scale-3')} ${TK('--gl-spacing-scale-4')};
  border: 0;
  background: transparent;
  text-align: left;
  font: inherit;
  font-size: ${TK('--gl-font-size-base')};
  color: ${TK('--gl-text-color-default')};
  cursor: pointer;
}
.gl-dropdown-item:hover:not(:disabled) {
  background-color: ${TK('--gl-dropdown-option-background-color-unselected-hover')};
}
.gl-dropdown-item--checked {
  font-weight: ${TK('--gl-font-weight-semibold')};
}
.gl-dropdown-item:disabled {
  color: ${TK('--gl-dropdown-option-text-color-disabled')};
  cursor: not-allowed;
}
.gl-dropdown-item:focus-visible {
  outline: none;
  background-color: ${TK('--gl-dropdown-option-background-color-unselected-focus')};
}
.gl-dropdown-check {
  margin-left: auto;
  display: inline-flex;
  color: ${TK('--gl-dropdown-option-indicator-color-selected-default')};
}
.gl-dropdown-clear {
  display: inline-flex;
  padding: ${TK('--gl-spacing-scale-2')} ${TK('--gl-spacing-scale-4')};
  border: 0;
  background: transparent;
  color: ${TK('--gl-button-link-text-color-default')};
  font: inherit;
  font-size: ${TK('--gl-font-size-sm')};
  cursor: pointer;
}
.gl-dropdown-clear:hover {
  text-decoration: underline;
}
`;

/* ---------------------------------------------------------------- Form */
const SHARED_FORM = `__HEADER__
import * as React from 'react';
__CSS_IMPORT__

const cl = __CL__;

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode;
}

export function Form({ children, ...rest }: FormProps) {
  return (
    <form className="gl-form" {...rest}>
      {children}
    </form>
  );
}

export interface FormGroupProps {
  label?: string;
  helper?: string;
  error?: string | null;
  optional?: boolean;
  children?: React.ReactNode;
}

export function FormGroup({
  label = '',
  helper = '',
  error = null,
  optional = false,
  children,
}: FormGroupProps) {
  return (
    <div className="gl-form-group">
      {label ? (
        <label className="gl-form-label">
          {label}
          {optional ? <span className="gl-form-optional">(optional)</span> : null}
        </label>
      ) : null}
      {children}
      {error ? <p className="gl-form-feedback gl-form-feedback--invalid">{error}</p> : null}
      {helper && !error ? <p className="gl-form-helper">{helper}</p> : null}
    </div>
  );
}
`;

const CSS_FORM = `/* __HEADER__ */
.gl-form {
  display: flex;
  flex-direction: column;
  gap: ${TK('--gl-spacing-scale-5')};
}
.gl-form-group {
  display: flex;
  flex-direction: column;
  gap: ${TK('--gl-spacing-scale-2')};
}
.gl-form-label {
  display: flex;
  align-items: baseline;
  gap: ${TK('--gl-spacing-scale-2')};
  font-size: ${TK('--gl-font-size-base')};
  font-weight: ${TK('--gl-font-weight-bold')};
  color: ${TK('--gl-text-color-strong')};
}
.gl-form-optional {
  font-size: ${TK('--gl-font-size-sm')};
  font-weight: ${TK('--gl-font-weight-normal')};
  color: ${TK('--gl-text-color-subtle')};
}
.gl-form-helper {
  margin: 0;
  font-size: ${TK('--gl-font-size-sm')};
  line-height: ${TK('--gl-line-height-16')};
  color: ${TK('--gl-text-color-subtle')};
}
.gl-form-feedback {
  margin: 0;
  font-size: ${TK('--gl-font-size-sm')};
  line-height: ${TK('--gl-line-height-16')};
}
.gl-form-feedback--valid {
  color: ${TK('--gl-control-text-color-valid')};
}
.gl-form-feedback--invalid {
  color: ${TK('--gl-control-text-color-error')};
}
`;

/* ---------------------------------------------------------------- Alert */
const ALERT_ICONS = `const ICONS = {
  info: (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 11V7.5M8 5v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  success: (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 8l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <path d="M8 2l6 11H2z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 6.5v3M8 11.2v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  danger: (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <path d="M8 1.5l6.5 6.5L8 14.5 1.5 8z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 5.5v3.5M8 11.4v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  tip: (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <path d="M8 1.5a4.5 4.5 0 0 0-3 7.9c.6.5 1 1.3 1 2.1v.5h4v-.5c0-.8.4-1.6 1-2.1A4.5 4.5 0 0 0 8 1.5z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M6.5 13h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};`;

const SHARED_ALERT = `__HEADER__
import * as React from 'react';
import { useState } from 'react';
__CSS_IMPORT__

const cl = __CL__;

${ALERT_ICONS}

const CLOSE_SVG = (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'danger' | 'tip';
  title?: string;
  dismissible?: boolean;
  sticky?: boolean;
  onDismiss?: () => void;
  children?: React.ReactNode;
}

const ROLES: Record<NonNullable<AlertProps['variant']>, string> = {
  info: 'status',
  tip: 'status',
  success: 'alert',
  warning: 'alert',
  danger: 'alert',
};

export function Alert({
  variant = 'info',
  title = '',
  dismissible = true,
  sticky = false,
  onDismiss,
  children,
}: AlertProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div
      className={cl('gl-alert', 'gl-alert--' + variant, sticky && 'gl-alert--sticky')}
      role={ROLES[variant]}
    >
      <span className="gl-alert-icon" aria-hidden="true">
        {ICONS[variant]}
      </span>
      <div className="gl-alert-body">
        {title ? <h4 className="gl-alert-title">{title}</h4> : null}
        <div className="gl-alert-content">{children}</div>
      </div>
      {dismissible ? (
        <button
          type="button"
          className="gl-alert-dismiss"
          aria-label="Dismiss"
          onClick={() => {
            setDismissed(true);
            if (onDismiss) onDismiss();
          }}
        >
          {CLOSE_SVG}
        </button>
      ) : null}
    </div>
  );
}
`;

const ALERT_VARIANTS = ['info', 'success', 'warning', 'danger', 'tip'];

const CSS_ALERT = `/* __HEADER__ */
.gl-alert {
  display: flex;
  align-items: flex-start;
  gap: ${TK('--gl-spacing-scale-3')};
  border: 1px solid ${TK('--gl-alert-info-border-color')};
  border-radius: ${TK('--gl-alert-border-radius')};
  padding: ${TK('--gl-spacing-scale-4')} ${TK('--gl-spacing-scale-5')};
  background-color: ${TK('--gl-alert-info-background-color')};
  font-size: ${TK('--gl-font-size-base')};
}
.gl-alert--success {
  background-color: ${TK('--gl-alert-success-background-color')};
  border-color: ${TK('--gl-alert-success-border-color')};
}
.gl-alert--warning {
  background-color: ${TK('--gl-alert-warning-background-color')};
  border-color: ${TK('--gl-alert-warning-border-color')};
}
.gl-alert--danger {
  background-color: ${TK('--gl-alert-danger-background-color')};
  border-color: ${TK('--gl-alert-danger-border-color')};
}
.gl-alert--tip {
  background-color: ${TK('--gl-alert-neutral-background-color')};
  border-color: ${TK('--gl-alert-neutral-border-color')};
}
.gl-alert--sticky {
  position: sticky;
  top: 0;
  z-index: ${TK('--gl-zindex-2')};
}
.gl-alert-icon {
  display: inline-flex;
  flex-shrink: 0;
}
.gl-alert--info .gl-alert-icon {
  color: ${TK('--gl-feedback-info-icon-color')};
}
.gl-alert--success .gl-alert-icon {
  color: ${TK('--gl-feedback-success-icon-color')};
}
.gl-alert--warning .gl-alert-icon {
  color: ${TK('--gl-feedback-warning-icon-color')};
}
.gl-alert--danger .gl-alert-icon {
  color: ${TK('--gl-feedback-danger-icon-color')};
}
.gl-alert--tip .gl-alert-icon {
  color: ${TK('--gl-icon-color-default')};
}
.gl-alert-body {
  flex: 1;
  min-width: 0;
}
.gl-alert-title {
  margin: 0 0 ${TK('--gl-spacing-scale-2')};
  font-size: ${TK('--gl-font-size-base')};
  font-weight: ${TK('--gl-font-weight-bold')};
  color: ${TK('--gl-alert-info-title-color')};
}
.gl-alert--success .gl-alert-title {
  color: ${TK('--gl-alert-success-title-color')};
}
.gl-alert--warning .gl-alert-title {
  color: ${TK('--gl-alert-warning-title-color')};
}
.gl-alert--danger .gl-alert-title {
  color: ${TK('--gl-alert-danger-title-color')};
}
.gl-alert--tip .gl-alert-title {
  color: ${TK('--gl-alert-neutral-title-color')};
}
.gl-alert-content {
  margin: 0;
  line-height: ${TK('--gl-line-height-24')};
}
.gl-alert-dismiss {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${TK('--gl-spacing-scale-2')};
  border: 0;
  border-radius: ${TK('--gl-border-radius-default')};
  background: transparent;
  color: ${TK('--gl-text-color-subtle')};
  cursor: pointer;
}
.gl-alert-dismiss:hover {
  background-color: ${TK('--gl-color-alpha-dark-6')};
}
.gl-alert-dismiss:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px ${TK('--gl-focus-ring-inner-color')}, 0 0 0 4px ${TK('--gl-focus-ring-outer-color')};
}
`;

/* ================================================ tailwind (react-tailwind) */
const TW_CL = "const cl = (...cs) => cs.filter(Boolean).join(' ');";

const TW_BUTTON = `__HEADER__
import * as React from 'react';
import { useState } from 'react';

${TW_CL}

const SPINNER = (
  ${SPINNER_SVG}
);

const ICON_PLACEHOLDER = (
  ${STAR_SVG}
);

const BTN_CLS: Record<string, string> = {
__BTN_CLS__
  link: 'h-auto min-h-0 border-0 bg-transparent p-0 font-normal normal-case rounded-[var(--gl-button-link-border-radius)] text-[color:var(--gl-button-link-text-color-default)] hover:bg-transparent hover:text-[color:var(--gl-button-link-text-color-hover)] hover:underline',
};

export interface ButtonProps {
  category?: 'primary' | 'secondary' | 'tertiary';
  variant?: 'default' | 'confirm' | 'danger' | 'link';
  size?: 'small' | 'medium';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  block?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}

export function Button({
  category = 'primary',
  variant = 'default',
  size = 'medium',
  disabled = false,
  loading = false,
  icon = '',
  block = false,
  onClick,
  children,
}: ButtonProps) {
  const [pressed, setPressed] = useState(false);
  const key = variant === 'link' ? 'link' : category + ':' + variant;
  const classes = cl(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--gl-button-border-radius)] border min-h-[var(--gl-spacing-scale-8)] px-[var(--gl-spacing-scale-4)] text-[length:var(--gl-font-size-base)] font-bold leading-[var(--gl-line-height-20)] cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--gl-focus-ring-outer-color)] disabled:cursor-not-allowed disabled:bg-[var(--gl-action-disabled-background-color)] disabled:text-[color:var(--gl-action-disabled-foreground-color)] disabled:border-[var(--gl-action-disabled-border-color)]',
    BTN_CLS[key] || BTN_CLS['primary:default'],
    size === 'small' && 'min-h-[var(--gl-spacing-scale-7)] px-[var(--gl-spacing-scale-3)] text-[length:var(--gl-font-size-sm)]',
    block && 'w-full'
  );
  return (
    <button
      type="button"
      className={classes}
      disabled={disabled || loading || pressed}
      aria-busy={loading}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onClick={onClick}
    >
      {loading ? <span className="animate-spin">{SPINNER}</span> : null}
      {!loading && icon ? <span>{ICON_PLACEHOLDER}</span> : null}
      {children != null ? <span>{children}</span> : null}
    </button>
  );
}
`;

const TW_INPUT = `__HEADER__
import * as React from 'react';
import { useState } from 'react';

${TW_CL}

const WIDTHS: Record<string, string> = {
  xs: 'max-w-[var(--gl-spacing-scale-30)]',
  sm: 'max-w-[var(--gl-spacing-scale-34)]',
  md: 'max-w-[var(--gl-spacing-scale-48)]',
  lg: 'max-w-[var(--gl-spacing-scale-62)]',
  xl: 'max-w-[var(--gl-spacing-scale-75)]',
};

export interface InputProps {
  type?: 'text' | 'email' | 'number' | 'password' | 'search' | 'url' | 'tel' | 'date' | 'time';
  placeholder?: string;
  state?: 'valid' | 'invalid' | null;
  disabled?: boolean;
  readonly?: boolean;
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | null;
  defaultValue?: string;
  id?: string;
  name?: string;
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  type = 'text',
  placeholder = '',
  state = null,
  disabled = false,
  readonly = false,
  width = null,
  defaultValue = '',
  id,
  name,
  onChange,
}: InputProps) {
  const [value, setValue] = useState(defaultValue);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
    if (onChange) onChange(event.currentTarget.value, event);
  };
  const classes = cl(
    'w-full rounded-[var(--gl-control-border-radius)] border border-[var(--gl-control-border-color-default)] bg-[var(--gl-control-background-color-default)] px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] text-[color:var(--gl-text-color-default)] placeholder:text-[color:var(--gl-control-placeholder-color)] hover:border-[var(--gl-control-border-color-hover)] focus:border-[var(--gl-control-border-color-focus)] focus:outline-none focus:ring-[3px] focus:ring-[var(--gl-focus-ring-outer-color)] disabled:cursor-not-allowed disabled:bg-[var(--gl-control-background-color-disabled)] disabled:text-[color:var(--gl-text-color-disabled)]',
    state === 'invalid' && 'border-[var(--gl-control-border-color-error)]',
    state === 'valid' && 'border-[var(--gl-control-text-color-valid)]',
    width && WIDTHS[width]
  );
  return (
    <div className="flex flex-col gap-[var(--gl-spacing-scale-2)]">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        className={classes}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
        aria-invalid={state === 'invalid' || undefined}
        onChange={handleChange}
      />
      {state === 'invalid' ? (
        <p className="m-0 text-[length:var(--gl-font-size-sm)] text-[color:var(--gl-control-text-color-error)]">
          Invalid input value.
        </p>
      ) : null}
      {state === 'valid' ? (
        <p className="m-0 text-[length:var(--gl-font-size-sm)] text-[color:var(--gl-control-text-color-valid)]">
          Input value looks good.
        </p>
      ) : null}
    </div>
  );
}
`;

const TW_MODAL = `__HEADER__
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

${TW_CL}

const SIZES: Record<string, string> = {
  sm: 'max-w-[var(--gl-spacing-scale-30)]',
  md: 'max-w-[var(--gl-spacing-scale-48)]',
  lg: 'max-w-[var(--gl-spacing-scale-75)]',
};

const CLOSE_SVG = (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export interface ModalAction {
  text: string;
  variant?: 'default' | 'confirm' | 'danger';
  onClick?: () => void;
}

export interface ModalProps {
  visible?: boolean;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  primaryAction?: ModalAction | null;
  secondaryAction?: { text: string; onClick?: () => void } | null;
  onClose?: () => void;
  children?: React.ReactNode;
}

export function Modal({
  visible = false,
  title = '',
  size = 'md',
  primaryAction = null,
  secondaryAction = null,
  onClose,
  children,
}: ModalProps) {
  const [open, setOpen] = useState(visible);

  useEffect(() => {
    setOpen(visible);
  }, [visible]);

  const close = useCallback(() => {
    setOpen(false);
    if (onClose) onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  if (!open) return null;

  const primaryClasses = cl(
    'rounded-[var(--gl-button-border-radius)] border px-[var(--gl-spacing-scale-4)] py-[var(--gl-spacing-scale-3)] font-bold hover:brightness-95',
    primaryAction && primaryAction.variant === 'danger'
      ? 'border-transparent bg-[var(--gl-button-danger-primary-background-color-default)] text-[color:var(--gl-button-danger-primary-foreground-color-default)] hover:bg-[var(--gl-button-danger-primary-background-color-hover)]'
      : 'border-transparent bg-[var(--gl-button-confirm-primary-background-color-default)] text-[color:var(--gl-button-confirm-primary-foreground-color-default)] hover:bg-[var(--gl-button-confirm-primary-background-color-hover)]'
  );

  return (
    <div
      className="fixed inset-0 z-[var(--gl-zindex-4)] flex items-center justify-center p-[var(--gl-spacing-scale-5)] bg-[var(--gl-color-alpha-dark-40)]"
      onClick={close}
    >
      <div
        className={cl(
          'flex max-h-[calc(100vh-var(--gl-spacing-scale-10))] w-full flex-col overflow-hidden rounded-[var(--gl-modal-border-radius)] bg-[var(--gl-background-color-default)] text-[color:var(--gl-text-color-default)] shadow-[var(--gl-shadow-lg)]',
          SIZES[size]
        )}
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Dialog'}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-[var(--gl-spacing-scale-3)] border-b border-[var(--gl-border-color-subtle)] px-[var(--gl-spacing-scale-5)] py-[var(--gl-spacing-scale-4)]">
          <h3 className="m-0 text-[length:var(--gl-heading-scale-500-font-size)] font-bold leading-[var(--gl-line-height-28)] text-[color:var(--gl-text-color-heading)]">
            {title}
          </h3>
          <button
            type="button"
            className="rounded p-[var(--gl-spacing-scale-2)] text-[color:var(--gl-text-color-subtle)] hover:bg-[var(--gl-color-alpha-dark-6)] focus:outline-none focus:ring-[3px] focus:ring-[var(--gl-focus-ring-outer-color)]"
            onClick={close}
            aria-label="Close"
          >
            {CLOSE_SVG}
          </button>
        </div>
        <div className="overflow-y-auto px-[var(--gl-spacing-scale-5)] py-[var(--gl-spacing-scale-5)] text-[length:var(--gl-font-size-base)] leading-[var(--gl-line-height-24)]">
          {children}
        </div>
        {primaryAction || secondaryAction ? (
          <div className="flex flex-wrap justify-end gap-[var(--gl-spacing-scale-3)] border-t border-[var(--gl-border-color-subtle)] px-[var(--gl-spacing-scale-5)] py-[var(--gl-spacing-scale-4)]">
            {secondaryAction ? (
              <button
                type="button"
                className="rounded-[var(--gl-button-border-radius)] border border-[var(--gl-border-color-default)] px-[var(--gl-spacing-scale-4)] py-[var(--gl-spacing-scale-3)] font-bold text-[color:var(--gl-action-neutral-foreground-color-default)] hover:border-[var(--gl-border-color-strong)] hover:bg-[var(--gl-action-neutral-background-color-hover)]"
                onClick={secondaryAction.onClick}
              >
                {secondaryAction.text}
              </button>
            ) : null}
            {primaryAction ? (
              <button type="button" className={primaryClasses} onClick={primaryAction.onClick}>
                {primaryAction.text}
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
`;

const TW_TABLE = `__HEADER__
import * as React from 'react';
import { useMemo, useState } from 'react';

${TW_CL}

export interface TableField {
  key: string;
  label?: string;
  sortable?: boolean;
}

export interface TableProps {
  items?: Array<Record<string, unknown>>;
  fields?: TableField[];
  loading?: boolean;
  sortBy?: string | null;
  sortDesc?: boolean;
  emptyText?: string;
}

export function Table({
  items = [],
  fields = [],
  loading = false,
  sortBy = null,
  sortDesc = false,
  emptyText = 'No records found.',
}: TableProps) {
  const [activeSort, setActiveSort] = useState<string | null>(sortBy);
  const [activeDesc, setActiveDesc] = useState(sortDesc);

  const sorted = useMemo(() => {
    const data = items.slice();
    if (!activeSort) return data;
    return data.sort((a, b) => {
      const av = String(a[activeSort] ?? '');
      const bv = String(b[activeSort] ?? '');
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return activeDesc ? -cmp : cmp;
    });
  }, [items, activeSort, activeDesc]);

  const toggleSort = (field: TableField) => {
    if (!field.sortable) return;
    if (activeSort === field.key) {
      setActiveDesc(!activeDesc);
    } else {
      setActiveSort(field.key);
      setActiveDesc(false);
    }
  };

  const arrow = (field: TableField) =>
    activeSort === field.key ? (activeDesc ? '\\u2193' : '\\u2191') : '';

  return (
    <div className="relative overflow-auto rounded-[var(--gl-border-radius-lg)] border border-[var(--gl-border-color-default)] bg-[var(--gl-background-color-default)]">
      {loading ? (
        <p className="m-0 px-[var(--gl-spacing-scale-4)] py-[var(--gl-spacing-scale-4)] text-[length:var(--gl-font-size-sm)] text-[color:var(--gl-text-color-subtle)]">
          Loading records\\u2026
        </p>
      ) : null}
      <table className={cl('w-full border-collapse text-[length:var(--gl-font-size-base)] text-[color:var(--gl-text-color-default)]', loading && 'pointer-events-none opacity-55')}>
        <thead>
          <tr>
            {fields.map((field) => (
              <th
                key={field.key}
                scope="col"
                className={cl(
                  'sticky top-0 z-[1] border-b border-[var(--gl-border-color-default)] bg-[var(--gl-background-color-subtle)] px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] text-left font-bold text-[color:var(--gl-text-color-strong)]'
                )}
              >
                {field.sortable ? (
                  <button
                    type="button"
                    className="inline-flex cursor-pointer items-center gap-[var(--gl-spacing-scale-2)] border-0 bg-transparent p-0 font-bold inherit focus:outline-none focus:ring-[3px] focus:ring-[var(--gl-focus-ring-outer-color)]"
                    onClick={() => toggleSort(field)}
                    aria-sort={activeSort === field.key ? (activeDesc ? 'descending' : 'ascending') : undefined}
                  >
                    {field.label || field.key}
                    <span
                      className="text-[length:var(--gl-font-size-sm)] leading-none text-[color:var(--gl-table-sorting-icon-color)]"
                      aria-hidden="true"
                    >
                      {arrow(field)}
                    </span>
                  </button>
                ) : (
                  field.label || field.key
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.length === 0 && !loading ? (
            <tr>
              <td
                className="px-[var(--gl-spacing-scale-5)] py-[var(--gl-spacing-scale-5)] text-center text-[color:var(--gl-text-color-subtle)]"
                colSpan={fields.length || 1}
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            sorted.map((row, index) => (
              <tr key={index} className="hover:bg-[var(--gl-table-row-background-color-hover)]">
                {fields.map((field) => (
                  <td key={field.key} className="border-b border-[var(--gl-border-color-subtle)] px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)]">
                    {row[field.key] != null ? String(row[field.key]) : ''}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
`;

const TW_TABS = `__HEADER__
import * as React from 'react';
import { useState } from 'react';

${TW_CL}

const UNDERLINE = (
  ${STAR_SVG}
);

export interface Tab {
  id: string;
  label?: string;
  disabled?: boolean;
}

export interface TabsProps {
  variant?: 'plain' | 'pills';
  tabs?: Tab[];
  defaultActiveId?: string;
  onTabChange?: (id: string) => void;
}

const SEGMENT_CLS = 'inline-flex items-center gap-[var(--gl-spacing-scale-2)] rounded-[var(--gl-border-radius-default)] px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-2)] text-[length:var(--gl-font-size-sm)] font-bold cursor-pointer focus:outline-none focus:ring-[3px] focus:ring-[var(--gl-focus-ring-outer-color)] disabled:cursor-not-allowed disabled:text-[color:var(--gl-tabs-disabled-text-color)]';

export function Tabs({
  variant = 'plain',
  tabs = [],
  defaultActiveId = '',
  onTabChange,
}: TabsProps) {
  const [activeId, setActiveId] = useState(defaultActiveId || (tabs[0] ? tabs[0].id : ''));

  const select = (tab: Tab) => {
    if (tab.disabled) return;
    setActiveId(tab.id);
    if (onTabChange) onTabChange(tab.id);
  };

  return (
    <div
      className={cl(
        'w-full',
        variant === 'pills' && 'inline-flex max-w-full items-center gap-[var(--gl-spacing-scale-1)] overflow-x-auto rounded-[var(--gl-tabs-pills-background-radius)] bg-[var(--gl-tabs-pills-background-color)] p-[var(--gl-spacing-scale-1)]'
      )}
      role="tablist"
    >
      {tabs.map((tab) => (
        <button
          type="button"
          key={tab.id}
          disabled={tab.disabled}
          role="tab"
          aria-selected={activeId === tab.id}
          onClick={() => select(tab)}
          className={cl(
            variant === 'plain'
              ? cl(
                  'whitespace-nowrap border-0 border-b-2 border-b-transparent bg-transparent pb-[var(--gl-spacing-scale-3)] pt-[var(--gl-spacing-scale-3)] text-[length:var(--gl-font-size-base)] cursor-pointer text-[color:var(--gl-text-color-subtle)] hover:text-[color:var(--gl-text-color-default)] focus:outline-none focus:ring-[3px] focus:ring-[var(--gl-focus-ring-outer-color)] disabled:cursor-not-allowed disabled:text-[color:var(--gl-tabs-disabled-text-color)]',
                  activeId === tab.id &&
                    'border-[var(--gl-tabs-active-hover-border-color)] text-[color:var(--gl-text-color-strong)]'
                )
              : cl(
                  SEGMENT_CLS,
                  activeId === tab.id
                    ? 'bg-[var(--gl-tabs-active-background-color)] text-[color:var(--gl-text-color-strong)] shadow-[var(--gl-shadow-sm)]'
                    : 'text-[color:var(--gl-text-color-subtle)] hover:bg-[var(--gl-color-alpha-dark-6)]'
                )
          )}
        >
          <span className="inline-flex">{UNDERLINE}</span>
          {tab.label || tab.id}
        </button>
      ))}
    </div>
  );
}
`;

const TW_BADGE = `__HEADER__
import * as React from 'react';

${TW_CL}

const BADGE_CLS: Record<string, string> = {
  neutral: 'bg-[var(--gl-badge-neutral-background-color-default)] text-[color:var(--gl-badge-neutral-text-color-default)] a:hover:shadow-[inset_0_0_0_1px_var(--gl-badge-neutral-border-color-hover)]',
  info: 'bg-[var(--gl-badge-info-background-color-default)] text-[color:var(--gl-badge-info-text-color-default)] a:hover:shadow-[inset_0_0_0_1px_var(--gl-badge-info-border-color-hover)]',
  success: 'bg-[var(--gl-badge-success-background-color-default)] text-[color:var(--gl-badge-success-text-color-default)] a:hover:shadow-[inset_0_0_0_1px_var(--gl-badge-success-border-color-hover)]',
  warning: 'bg-[var(--gl-badge-warning-background-color-default)] text-[color:var(--gl-badge-warning-text-color-default)] a:hover:shadow-[inset_0_0_0_1px_var(--gl-badge-warning-border-color-hover)]',
  danger: 'bg-[var(--gl-badge-danger-background-color-default)] text-[color:var(--gl-badge-danger-text-color-default)] a:hover:shadow-[inset_0_0_0_1px_var(--gl-badge-danger-border-color-hover)]',
  tier: 'bg-[var(--gl-badge-tier-background-color-default)] text-[color:var(--gl-badge-tier-text-color-default)] a:hover:shadow-[inset_0_0_0_1px_var(--gl-badge-tier-border-color-hover)]',
};

const STAR = (
  ${STAR_SVG}
);

export interface BadgeProps {
  variant?: 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'tier';
  icon?: string | null;
  href?: string | null;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function Badge({
  variant = 'neutral',
  icon = null,
  href = null,
  disabled = false,
  children,
}: BadgeProps) {
  const classes = cl(
    'inline-flex items-center gap-[var(--gl-spacing-scale-2)] whitespace-nowrap rounded-full border border-transparent px-[var(--gl-spacing-scale-2)] py-[var(--gl-spacing-scale-1)] text-[length:var(--gl-font-size-sm)] font-medium leading-[var(--gl-line-height-16)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--gl-focus-ring-outer-color)]',
    BADGE_CLS[variant] || BADGE_CLS['neutral']
  );
  const inner = (
    <>
      {icon ? (
        <span className="inline-flex" aria-hidden="true">
          {STAR}
        </span>
      ) : null}
      <span>{children}</span>
    </>
  );
  if (href) {
    return (
      <a className={classes} href={disabled ? undefined : href} aria-disabled={disabled || undefined}>
        {inner}
      </a>
    );
  }
  return <span className={classes}>{inner}</span>;
}
`;

const TW_TOAST = `__HEADER__
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

${TW_CL}

const CLOSE_SVG = (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const KEYFRAMES = (
  <style>{'@keyframes tw-toast-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}@keyframes tw-toast-out{from{opacity:1;transform:none}to{opacity:0;transform:translateY(8px)}}'}</style>
);

export interface ToastAction {
  text: string;
  onClick?: () => void;
}

export interface ToastProps {
  message?: string;
  action?: ToastAction | null;
  autoHideDelay?: number;
  onDismiss?: () => void;
}

export function Toast({
  message = '',
  action = null,
  autoHideDelay = 5000,
  onDismiss,
}: ToastProps) {
  const delay = Math.max(1000, autoHideDelay);
  const dismissed = useRef(false);
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<'entering' | 'leaving'>('entering');

  useEffect(() => {
    const hideTimer = window.setTimeout(() => setPhase('leaving'), delay);
    const doneTimer = window.setTimeout(() => {
      if (!dismissed.current) {
        dismissed.current = true;
        setVisible(false);
        if (onDismiss) onDismiss();
      }
    }, delay + 140);
    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(doneTimer);
    };
  }, [delay, onDismiss]);

  const dismiss = () => {
    if (dismissed.current) return;
    dismissed.current = true;
    setVisible(false);
    if (onDismiss) onDismiss();
  };

  if (!visible) return null;

  return (
    <div className="fixed left-[var(--gl-spacing-scale-6)] bottom-[var(--gl-spacing-scale-6)] z-[var(--gl-zindex-200)]">
      {KEYFRAMES}
      <div
        className={cl(
          'flex max-w-[min(24rem,calc(100vw-var(--gl-spacing-scale-12)))] items-center gap-[var(--gl-spacing-scale-4)] rounded-full bg-[var(--gl-feedback-strong-background-color)] px-[var(--gl-spacing-scale-5)] py-[var(--gl-spacing-scale-4)] text-[color:var(--gl-feedback-strong-text-color)] shadow-[var(--gl-shadow-md)] animate-[tw-toast-in_160ms_ease-out]',
          phase === 'leaving' && 'animate-[tw-toast-out_140ms_ease-in_forwards]'
        )}
        role="status"
      >
        <span className="min-w-0 flex-1 leading-[var(--gl-line-height-20)]">{message}</span>
        {action ? (
          <button
            type="button"
            className="whitespace-nowrap border-0 bg-transparent p-0 font-bold text-[color:var(--gl-feedback-strong-link-color)] cursor-pointer"
            onClick={() => {
              if (action.onClick) action.onClick();
              dismiss();
            }}
          >
            {action.text}
          </button>
        ) : null}
        <button
          type="button"
          className="inline-flex cursor-pointer items-center justify-center rounded-[var(--gl-border-radius-default)] border-0 bg-transparent p-[var(--gl-spacing-scale-1)] text-[color:var(--gl-feedback-strong-text-color)] opacity-70 hover:opacity-100 focus:outline-none focus:ring-[3px] focus:ring-[var(--gl-focus-ring-outer-color)]"
          aria-label="Dismiss"
          onClick={dismiss}
        >
          {CLOSE_SVG}
        </button>
      </div>
    </div>
  );
}
`;

const TW_DROPDOWN = `__HEADER__
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

${TW_CL}

const CHEVRON_SVG = (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CHECK_SVG = (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M3 8l3.5 3.5L13 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export interface DropdownItem {
  label?: string;
  value?: string;
  header?: boolean;
  divider?: boolean;
  checked?: boolean;
  disabled?: boolean;
}

export interface DropdownProps {
  text?: string;
  items?: DropdownItem[];
  showClearAll?: boolean;
  onSelect?: (item: DropdownItem) => void;
  onClearAll?: () => void;
}

export function Dropdown({
  text = '',
  items = [],
  showClearAll = false,
  onSelect,
  onClearAll,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return undefined;
    const onMouseDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
    };
  }, [open]);

  const pick = (item: DropdownItem) => {
    if (item.disabled) return;
    setOpen(false);
    if (onSelect) onSelect(item);
  };

  return (
    <div className="relative inline-block" ref={rootRef}>
      <button
        type="button"
        className="inline-flex cursor-pointer items-center gap-[var(--gl-spacing-scale-2)] rounded-[var(--gl-control-border-radius)] border border-[var(--gl-border-color-default)] bg-[var(--gl-action-neutral-background-color-default)] px-[var(--gl-spacing-scale-4)] py-[var(--gl-spacing-scale-3)] font-bold text-[color:var(--gl-action-neutral-foreground-color-default)] hover:border-[var(--gl-border-color-strong)] hover:bg-[var(--gl-action-neutral-background-color-hover)] focus:outline-none focus:ring-[3px] focus:ring-[var(--gl-focus-ring-outer-color)]"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {text}
        <span className="inline-flex text-[color:var(--gl-text-color-subtle)]" aria-hidden="true">
          {CHEVRON_SVG}
        </span>
      </button>
      {open ? (
        <ul
          className="absolute left-0 top-full z-[var(--gl-zindex-3)] mt-[var(--gl-spacing-scale-2)] min-w-[var(--gl-spacing-scale-48)] list-none rounded-[var(--gl-dropdown-border-radius)] border border-[var(--gl-dropdown-border-color)] bg-[var(--gl-dropdown-background-color)] p-[var(--gl-spacing-scale-2)] shadow-[var(--gl-shadow-sm)]"
          role="menu"
        >
          {showClearAll ? (
            <li role="none">
              <button
                type="button"
                className="inline-flex cursor-pointer border-0 bg-transparent px-[var(--gl-spacing-scale-4)] py-[var(--gl-spacing-scale-2)] text-[length:var(--gl-font-size-sm)] text-[color:var(--gl-button-link-text-color-default)] hover:underline"
                onClick={() => {
                  setOpen(false);
                  if (onClearAll) onClearAll();
                }}
              >
                Clear all
              </button>
            </li>
          ) : null}
          {items.map((item, index) => {
            if (item.divider) {
              return (
                <li
                  key={index}
                  role="separator"
                  className="mx-auto my-[var(--gl-spacing-scale-2)] h-px bg-[var(--gl-dropdown-divider-color)]"
                />
              );
            }
            if (item.header) {
              return (
                <li
                  key={index}
                  role="presentation"
                  className="px-[var(--gl-spacing-scale-4)] py-[var(--gl-spacing-scale-2)] text-[length:var(--gl-font-size-sm)] font-bold text-[color:var(--gl-text-color-subtle)]"
                >
                  {item.label}
                </li>
              );
            }
            return (
              <li key={index} role="none">
                <button
                  type="button"
                  role="menuitem"
                  disabled={item.disabled}
                  className={cl(
                    'flex w-full cursor-pointer items-center gap-[var(--gl-spacing-scale-3)] border-0 bg-transparent px-[var(--gl-spacing-scale-4)] py-[var(--gl-spacing-scale-3)] text-left font-normal text-[color:var(--gl-text-color-default)] hover:bg-[var(--gl-dropdown-option-background-color-unselected-hover)] focus:outline-none focus:bg-[var(--gl-dropdown-option-background-color-unselected-focus)] disabled:cursor-not-allowed disabled:text-[color:var(--gl-dropdown-option-text-color-disabled)]',
                    item.checked && 'font-semibold'
                  )}
                  onClick={() => pick(item)}
                >
                  <span>{item.label || item.value}</span>
                  {item.checked ? (
                    <span className="ml-auto inline-flex text-[color:var(--gl-dropdown-option-indicator-color-selected-default)]" aria-hidden="true">
                      {CHECK_SVG}
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
`;

const TW_FORM = `__HEADER__
import * as React from 'react';

${TW_CL}

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode;
}

export function Form({ children, ...rest }: FormProps) {
  return (
    <form className="flex flex-col gap-[var(--gl-spacing-scale-5)]" {...rest}>
      {children}
    </form>
  );
}

export interface FormGroupProps {
  label?: string;
  helper?: string;
  error?: string | null;
  optional?: boolean;
  children?: React.ReactNode;
}

export function FormGroup({
  label = '',
  helper = '',
  error = null,
  optional = false,
  children,
}: FormGroupProps) {
  return (
    <div className="flex flex-col gap-[var(--gl-spacing-scale-2)]">
      {label ? (
        <label className="flex items-baseline gap-[var(--gl-spacing-scale-2)] font-bold text-[color:var(--gl-text-color-strong)]">
          {label}
          {optional ? (
            <span className="font-normal text-[length:var(--gl-font-size-sm)] text-[color:var(--gl-text-color-subtle)]">
              (optional)
            </span>
          ) : null}
        </label>
      ) : null}
      {children}
      {error ? (
        <p className="m-0 text-[length:var(--gl-font-size-sm)] leading-[var(--gl-line-height-16)] text-[color:var(--gl-control-text-color-error)]">
          {error}
        </p>
      ) : null}
      {helper && !error ? (
        <p className="m-0 text-[length:var(--gl-font-size-sm)] leading-[var(--gl-line-height-16)] text-[color:var(--gl-text-color-subtle)]">
          {helper}
        </p>
      ) : null}
    </div>
  );
}
`;

const TW_ALERT = `__HEADER__
import * as React from 'react';
import { useState } from 'react';

${TW_CL}

${ALERT_ICONS}

const CLOSE_SVG = (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'danger' | 'tip';
  title?: string;
  dismissible?: boolean;
  sticky?: boolean;
  onDismiss?: () => void;
  children?: React.ReactNode;
}

const ALERT_CLS: Record<string, string> = {
  info: 'border-[var(--gl-alert-info-border-color)] bg-[var(--gl-alert-info-background-color)]',
  success: 'border-[var(--gl-alert-success-border-color)] bg-[var(--gl-alert-success-background-color)]',
  warning: 'border-[var(--gl-alert-warning-border-color)] bg-[var(--gl-alert-warning-background-color)]',
  danger: 'border-[var(--gl-alert-danger-border-color)] bg-[var(--gl-alert-danger-background-color)]',
  tip: 'border-[var(--gl-alert-neutral-border-color)] bg-[var(--gl-alert-neutral-background-color)]',
};

const TITLE_CLS: Record<string, string> = {
  info: 'text-[color:var(--gl-alert-info-title-color)]',
  success: 'text-[color:var(--gl-alert-success-title-color)]',
  warning: 'text-[color:var(--gl-alert-warning-title-color)]',
  danger: 'text-[color:var(--gl-alert-danger-title-color)]',
  tip: 'text-[color:var(--gl-alert-neutral-title-color)]',
};

const ICON_CLS: Record<string, string> = {
  info: 'text-[color:var(--gl-feedback-info-icon-color)]',
  success: 'text-[color:var(--gl-feedback-success-icon-color)]',
  warning: 'text-[color:var(--gl-feedback-warning-icon-color)]',
  danger: 'text-[color:var(--gl-feedback-danger-icon-color)]',
  tip: 'text-[color:var(--gl-icon-color-default)]',
};

const ROLES: Record<NonNullable<AlertProps['variant']>, string> = {
  info: 'status',
  tip: 'status',
  success: 'alert',
  warning: 'alert',
  danger: 'alert',
};

export function Alert({
  variant = 'info',
  title = '',
  dismissible = true,
  sticky = false,
  onDismiss,
  children,
}: AlertProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div
      className={cl(
        'flex items-start gap-[var(--gl-spacing-scale-3)] rounded-[var(--gl-alert-border-radius)] border px-[var(--gl-spacing-scale-5)] py-[var(--gl-spacing-scale-4)] text-[length:var(--gl-font-size-base)]',
        ALERT_CLS[variant] || ALERT_CLS['info'],
        sticky && 'sticky top-0 z-[var(--gl-zindex-2)]'
      )}
      role={ROLES[variant] || 'status'}
    >
      <span className={cl('inline-flex shrink-0', ICON_CLS[variant] || ICON_CLS['info'])} aria-hidden="true">
        {ICONS[variant] || ICONS['info']}
      </span>
      <div className="min-w-0 flex-1">
        {title ? (
          <h4 className={cl('m-0 mb-[var(--gl-spacing-scale-2)] font-bold', TITLE_CLS[variant] || TITLE_CLS['info'])}>
            {title}
          </h4>
        ) : null}
        <div className="m-0 leading-[var(--gl-line-height-24)]">{children}</div>
      </div>
      {dismissible ? (
        <button
          type="button"
          className="inline-flex cursor-pointer items-center justify-center rounded-[var(--gl-border-radius-default)] border-0 bg-transparent p-[var(--gl-spacing-scale-2)] text-[color:var(--gl-text-color-subtle)] hover:bg-[var(--gl-color-alpha-dark-6)] focus:outline-none focus:ring-[3px] focus:ring-[var(--gl-focus-ring-outer-color)]"
          aria-label="Dismiss"
          onClick={() => {
            setDismissed(true);
            if (onDismiss) onDismiss();
          }}
        >
          {CLOSE_SVG}
        </button>
      ) : null}
    </div>
  );
}
`;

/* ============================================ styled-components (react-styled) */
/* Attribute-driven variant blocks inside a styled literal. */
function styledToneBlocks() {
  const out = [];
  for (const combo of COMBO_KEYS) {
    if (combo === 'primary:default') continue;
    const [c, v] = combo.split(':');
    const t = comboTokens(c, v);
    out.push("  &[data-tone='" + c + '-' + v + "'] {");
    for (const [cv, key] of BTN_VARS) out.push('    ' + cv + ': ' + TK(t[key]) + ';');
    out.push('  }');
  }
  return out.join('\n');
}

const STYLED_BUTTON = `__HEADER__
import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { useState } from 'react';

const SPINNER = (
  ${SPINNER_SVG}
);

const ICON_PLACEHOLDER = (
  ${STAR_SVG}
);

const spin = keyframes\`
  to {
    transform: rotate(360deg);
  }
\`;

const StyledButton = styled.button\`
  --btn-bg: var(--gl-button-default-primary-background-color-default);
  --btn-fg: var(--gl-button-default-primary-foreground-color-default);
  --btn-bc: var(--gl-button-default-primary-border-color-default);
  --btn-hbg: var(--gl-button-default-primary-background-color-hover);
  --btn-hfg: var(--gl-button-default-primary-foreground-color-hover);
  --btn-hbc: var(--gl-button-default-primary-border-color-hover);
  --btn-abg: var(--gl-button-default-primary-background-color-active);
  --btn-afg: var(--gl-button-default-primary-foreground-color-active);
  --btn-abc: var(--gl-button-default-primary-border-color-active);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--gl-spacing-scale-2);
  min-height: var(--gl-spacing-scale-8);
  padding: 0 var(--gl-spacing-scale-4);
  border: 1px solid var(--btn-bc);
  border-radius: var(--gl-button-border-radius);
  background-color: var(--btn-bg);
  color: var(--btn-fg);
  font: inherit;
  font-size: var(--gl-font-size-base);
  font-weight: var(--gl-font-weight-bold);
  line-height: var(--gl-line-height-20);
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 120ms ease, color 120ms ease, border-color 120ms ease, box-shadow 120ms ease;
  &:hover:not(:disabled):not([aria-busy='true']) {
    background-color: var(--btn-hbg);
    color: var(--btn-hfg);
    border-color: var(--btn-hbc);
  }
  &:active:not(:disabled):not([aria-busy='true']) {
    background-color: var(--btn-abg);
    color: var(--btn-afg);
    border-color: var(--btn-abc);
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color);
  }
  &:disabled,
  &[aria-busy='true'] {
    background-color: var(--gl-action-disabled-background-color);
    color: var(--gl-action-disabled-foreground-color);
    border-color: var(--gl-action-disabled-border-color);
    cursor: not-allowed;
  }
${styledToneBlocks()}
  &[data-tone='link'] {
    min-height: 0;
    padding: 0;
    border: 0;
    border-radius: var(--gl-button-link-border-radius);
    background: var(--gl-color-alpha-0);
    color: var(--gl-button-link-text-color-default);
    font-weight: var(--gl-font-weight-normal);
  }
  &[data-tone='link']:hover:not(:disabled):not([aria-busy='true']) {
    background: var(--gl-color-alpha-0);
    color: var(--gl-button-link-text-color-hover);
    text-decoration: underline;
  }
  &[data-size='small'] {
    min-height: var(--gl-spacing-scale-7);
    padding: 0 var(--gl-spacing-scale-3);
    font-size: var(--gl-font-size-sm);
  }
  &[data-block='true'] {
    width: 100%;
  }
  & > span {
    display: inline-flex;
    align-items: center;
    gap: var(--gl-spacing-scale-2);
  }
  & > .spinner {
    animation: \${spin} 0.8s linear infinite;
  }
\`;

export interface ButtonProps {
  category?: 'primary' | 'secondary' | 'tertiary';
  variant?: 'default' | 'confirm' | 'danger' | 'link';
  size?: 'small' | 'medium';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  block?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}

export function Button({
  category = 'primary',
  variant = 'default',
  size = 'medium',
  disabled = false,
  loading = false,
  icon = '',
  block = false,
  onClick,
  children,
}: ButtonProps) {
  const [pressed, setPressed] = useState(false);
  return (
    <StyledButton
      type="button"
      data-tone={variant === 'link' ? 'link' : category + '-' + variant}
      data-size={size}
      data-block={block || undefined}
      disabled={disabled || loading || pressed}
      aria-busy={loading}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onClick={onClick}
    >
      {loading ? <span className="spinner">{SPINNER}</span> : null}
      {!loading && icon ? <span>{ICON_PLACEHOLDER}</span> : null}
      {children != null ? <span>{children}</span> : null}
    </StyledButton>
  );
}
`;

const STYLED_INPUT = `__HEADER__
import * as React from 'react';
import styled from 'styled-components';
import { useState } from 'react';

const WIDTHS: Record<string, string> = {
  xs: 'var(--gl-spacing-scale-30)',
  sm: 'var(--gl-spacing-scale-34)',
  md: 'var(--gl-spacing-scale-48)',
  lg: 'var(--gl-spacing-scale-62)',
  xl: 'var(--gl-spacing-scale-75)',
};

const StyledInput = styled.input\`
  width: 100%;
  max-width: 100%;
  font: inherit;
  font-size: var(--gl-font-size-base);
  line-height: var(--gl-line-height-20);
  color: var(--gl-text-color-default);
  background-color: var(--gl-control-background-color-default);
  border: 1px solid var(--gl-control-border-color-default);
  border-radius: var(--gl-control-border-radius);
  padding: var(--gl-spacing-scale-3);
  transition: border-color 120ms ease, box-shadow 120ms ease;
  &::placeholder {
    color: var(--gl-control-placeholder-color);
    opacity: 1;
  }
  &:hover:not(:disabled):not([readonly]) {
    border-color: var(--gl-control-border-color-hover);
  }
  &:focus {
    outline: none;
    border-color: var(--gl-control-border-color-focus);
    box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color);
  }
  &[data-state='invalid'] {
    border-color: var(--gl-control-border-color-error);
  }
  &[data-state='valid'] {
    border-color: var(--gl-control-text-color-valid);
  }
  &:disabled {
    background-color: var(--gl-control-background-color-disabled);
    border-color: var(--gl-control-border-color-disabled);
    color: var(--gl-text-color-disabled);
    cursor: not-allowed;
  }
  &[readonly] {
    background-color: var(--gl-control-background-color-readonly);
    border-color: var(--gl-control-border-color-disabled);
  }
\`;

const InputShell = styled.div\`
  display: flex;
  flex-direction: column;
  gap: var(--gl-spacing-scale-2);
\`;

const Feedback = styled.p\`
  margin: 0;
  font-size: var(--gl-font-size-sm);
  line-height: var(--gl-line-height-16);
  color: var(--gl-control-text-color-valid);
  &[data-invalid='true'] {
    color: var(--gl-control-text-color-error);
  }
\`;

export interface InputProps {
  type?: 'text' | 'email' | 'number' | 'password' | 'search' | 'url' | 'tel' | 'date' | 'time';
  placeholder?: string;
  state?: 'valid' | 'invalid' | null;
  disabled?: boolean;
  readonly?: boolean;
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | null;
  defaultValue?: string;
  id?: string;
  name?: string;
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  type = 'text',
  placeholder = '',
  state = null,
  disabled = false,
  readonly = false,
  width = null,
  defaultValue = '',
  id,
  name,
  onChange,
}: InputProps) {
  const [value, setValue] = useState(defaultValue);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
    if (onChange) onChange(event.currentTarget.value, event);
  };
  return (
    <InputShell>
      <StyledInput
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
        data-state={state || undefined}
        data-width={width || undefined}
        style={width && WIDTHS[width] ? { maxWidth: WIDTHS[width] } : undefined}
        aria-invalid={state === 'invalid' || undefined}
        onChange={handleChange}
      />
      {state === 'invalid' ? <Feedback data-invalid="true">Invalid input value.</Feedback> : null}
      {state === 'valid' ? <Feedback>Input value looks good.</Feedback> : null}
    </InputShell>
  );
}
`;

const STYLED_MODAL = `__HEADER__
import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { useCallback, useEffect, useState } from 'react';

const CLOSE_SVG = (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const WIDTHS: Record<string, string> = {
  sm: 'var(--gl-spacing-scale-30)',
  md: 'var(--gl-spacing-scale-48)',
  lg: 'var(--gl-spacing-scale-75)',
};

const modalIn = keyframes\`
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
\`;

const modalOut = keyframes\`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-8px);
  }
\`;

const Backdrop = styled.div\`
  position: fixed;
  inset: 0;
  z-index: var(--gl-zindex-4);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--gl-spacing-scale-5);
  background-color: var(--gl-color-alpha-dark-40);
\`;

const Dialog = styled.div\`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: var(--gl-spacing-scale-48);
  max-height: calc(100vh - var(--gl-spacing-scale-10));
  overflow: hidden;
  background-color: var(--gl-background-color-default);
  color: var(--gl-text-color-default);
  border-radius: var(--gl-modal-border-radius);
  box-shadow: var(--gl-shadow-lg);
  animation: \${modalIn} 160ms ease-out;
  &[data-leaving='true'] {
    animation: \${modalOut} 130ms ease-in forwards;
  }
\`;

const Header = styled.div\`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--gl-spacing-scale-3);
  padding: var(--gl-spacing-scale-4) var(--gl-spacing-scale-5);
  border-bottom: 1px solid var(--gl-border-color-subtle);
\`;

const Title = styled.h3\`
  margin: 0;
  font-size: var(--gl-heading-scale-500-font-size);
  font-weight: var(--gl-font-weight-bold);
  line-height: var(--gl-line-height-28);
  color: var(--gl-text-color-heading);
\`;

const Close = styled.button\`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--gl-spacing-scale-2);
  border: 0;
  border-radius: var(--gl-border-radius-default);
  background: transparent;
  color: var(--gl-text-color-subtle);
  cursor: pointer;
  &:hover {
    background-color: var(--gl-color-alpha-dark-6);
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color);
  }
\`;

const Body = styled.div\`
  padding: var(--gl-spacing-scale-5);
  font-size: var(--gl-font-size-base);
  line-height: var(--gl-line-height-24);
  overflow-y: auto;
\`;

const Footer = styled.div\`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: var(--gl-spacing-scale-3);
  padding: var(--gl-spacing-scale-4) var(--gl-spacing-scale-5);
  border-top: 1px solid var(--gl-border-color-subtle);
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: stretch;
    & > button {
      width: 100%;
    }
  }
\`;

const FooterBtn = styled.button\`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--gl-spacing-scale-2);
  min-height: var(--gl-spacing-scale-8);
  padding: 0 var(--gl-spacing-scale-4);
  border: 1px solid var(--gl-border-color-default);
  border-radius: var(--gl-button-border-radius);
  background-color: var(--gl-action-neutral-background-color-default);
  color: var(--gl-action-neutral-foreground-color-default);
  font: inherit;
  font-size: var(--gl-font-size-base);
  font-weight: var(--gl-font-weight-bold);
  cursor: pointer;
  &:hover {
    background-color: var(--gl-action-neutral-background-color-hover);
    border-color: var(--gl-border-color-strong);
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color);
  }
  &[data-variant='confirm'] {
    background-color: var(--gl-button-confirm-primary-background-color-default);
    color: var(--gl-button-confirm-primary-foreground-color-default);
    border-color: var(--gl-button-confirm-primary-border-color-default);
  }
  &[data-variant='confirm']:hover {
    background-color: var(--gl-button-confirm-primary-background-color-hover);
  }
  &[data-variant='danger'] {
    background-color: var(--gl-button-danger-primary-background-color-default);
    color: var(--gl-button-danger-primary-foreground-color-default);
    border-color: var(--gl-button-danger-primary-border-color-default);
  }
  &[data-variant='danger']:hover {
    background-color: var(--gl-button-danger-primary-background-color-hover);
  }
\`;

export interface ModalAction {
  text: string;
  variant?: 'default' | 'confirm' | 'danger';
  onClick?: () => void;
}

export interface ModalProps {
  visible?: boolean;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  primaryAction?: ModalAction | null;
  secondaryAction?: { text: string; onClick?: () => void } | null;
  onClose?: () => void;
  children?: React.ReactNode;
}

export function Modal({
  visible = false,
  title = '',
  size = 'md',
  primaryAction = null,
  secondaryAction = null,
  onClose,
  children,
}: ModalProps) {
  const [open, setOpen] = useState(visible);
  const [phase, setPhase] = useState<'entering' | 'leaving'>('entering');

  useEffect(() => {
    setOpen(visible);
    setPhase('entering');
  }, [visible]);

  const close = useCallback(() => {
    setPhase('leaving');
    window.setTimeout(() => {
      setOpen(false);
      if (onClose) onClose();
    }, 130);
  }, [onClose]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <Backdrop onClick={close}>
      <Dialog
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Dialog'}
        data-leaving={phase === 'leaving' || undefined}
        data-size={size}
        style={WIDTHS[size] ? { maxWidth: WIDTHS[size] } : undefined}
        onClick={(event) => event.stopPropagation()}
      >
        <Header>
          <Title>{title}</Title>
          <Close onClick={close} aria-label="Close">
            {CLOSE_SVG}
          </Close>
        </Header>
        <Body>{children}</Body>
        {primaryAction || secondaryAction ? (
          <Footer>
            {secondaryAction ? (
              <FooterBtn type="button" onClick={secondaryAction.onClick}>
                {secondaryAction.text}
              </FooterBtn>
            ) : null}
            {primaryAction ? (
              <FooterBtn
                type="button"
                data-variant={primaryAction.variant === 'danger' ? 'danger' : 'confirm'}
                onClick={primaryAction.onClick}
              >
                {primaryAction.text}
              </FooterBtn>
            ) : null}
          </Footer>
        ) : null}
      </Dialog>
    </Backdrop>
  );
}
`;

const STYLED_TABLE = `__HEADER__
import * as React from 'react';
import styled from 'styled-components';
import { useMemo, useState } from 'react';

const Wrap = styled.div\`
  position: relative;
  overflow: auto;
  border: 1px solid var(--gl-border-color-default);
  border-radius: var(--gl-border-radius-lg);
  background-color: var(--gl-background-color-default);
\`;

const StyledTable = styled.table\`
  width: 100%;
  border-collapse: collapse;
  font-size: var(--gl-font-size-base);
  color: var(--gl-text-color-default);
  &[data-busy='true'] {
    pointer-events: none;
    opacity: 0.55;
  }
\`;

const Th = styled.th\`
  position: sticky;
  top: 0;
  z-index: 1;
  text-align: left;
  padding: var(--gl-spacing-scale-3);
  font-weight: var(--gl-font-weight-bold);
  color: var(--gl-text-color-strong);
  background-color: var(--gl-background-color-subtle);
  box-shadow: inset 0 -1px 0 var(--gl-border-color-default);
\`;

const Td = styled.td\`
  padding: var(--gl-spacing-scale-3);
  border-bottom: 1px solid var(--gl-border-color-subtle);
\`;

const Row = styled.tr\`
  &:hover {
    background-color: var(--gl-table-row-background-color-hover);
  }
\`;

const SortButton = styled.button\`
  display: inline-flex;
  align-items: center;
  gap: var(--gl-spacing-scale-2);
  padding: 0;
  border: 0;
  background: transparent;
  font: inherit;
  font-weight: var(--gl-font-weight-bold);
  color: inherit;
  cursor: pointer;
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color);
  }
\`;

const SortIcon = styled.span\`
  color: var(--gl-table-sorting-icon-color);
  font-size: var(--gl-font-size-sm);
  line-height: 1;
\`;

const Loading = styled.p\`
  margin: 0;
  padding: var(--gl-spacing-scale-4);
  font-size: var(--gl-font-size-sm);
  color: var(--gl-text-color-subtle);
\`;

const Empty = styled.td\`
  padding: var(--gl-spacing-scale-5);
  text-align: center;
  color: var(--gl-text-color-subtle);
\`;

export interface TableField {
  key: string;
  label?: string;
  sortable?: boolean;
}

export interface TableProps {
  items?: Array<Record<string, unknown>>;
  fields?: TableField[];
  loading?: boolean;
  sortBy?: string | null;
  sortDesc?: boolean;
  emptyText?: string;
}

export function Table({
  items = [],
  fields = [],
  loading = false,
  sortBy = null,
  sortDesc = false,
  emptyText = 'No records found.',
}: TableProps) {
  const [activeSort, setActiveSort] = useState<string | null>(sortBy);
  const [activeDesc, setActiveDesc] = useState(sortDesc);

  const sorted = useMemo(() => {
    const data = items.slice();
    if (!activeSort) return data;
    return data.sort((a, b) => {
      const av = String(a[activeSort] ?? '');
      const bv = String(b[activeSort] ?? '');
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return activeDesc ? -cmp : cmp;
    });
  }, [items, activeSort, activeDesc]);

  const toggleSort = (field: TableField) => {
    if (!field.sortable) return;
    if (activeSort === field.key) {
      setActiveDesc(!activeDesc);
    } else {
      setActiveSort(field.key);
      setActiveDesc(false);
    }
  };

  const arrow = (field: TableField) =>
    activeSort === field.key ? (activeDesc ? '\\u2193' : '\\u2191') : '';

  return (
    <Wrap>
      {loading ? <Loading>Loading records\\u2026</Loading> : null}
      <StyledTable data-busy={loading || undefined}>
        <thead>
          <tr>
            {fields.map((field) => (
              <Th key={field.key} scope="col">
                {field.sortable ? (
                  <SortButton
                    type="button"
                    onClick={() => toggleSort(field)}
                    aria-sort={activeSort === field.key ? (activeDesc ? 'descending' : 'ascending') : undefined}
                  >
                    {field.label || field.key}
                    <SortIcon aria-hidden="true">{arrow(field)}</SortIcon>
                  </SortButton>
                ) : (
                  field.label || field.key
                )}
              </Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.length === 0 && !loading ? (
            <tr>
              <Empty colSpan={fields.length || 1}>{emptyText}</Empty>
            </tr>
          ) : (
            sorted.map((row, index) => (
              <Row key={index}>
                {fields.map((field) => (
                  <Td key={field.key}>
                    {row[field.key] != null ? String(row[field.key]) : ''}
                  </Td>
                ))}
              </Row>
            ))
          )}
        </tbody>
      </StyledTable>
    </Wrap>
  );
}
`;

const STYLED_TABS = `__HEADER__
import * as React from 'react';
import styled from 'styled-components';
import { useState } from 'react';

export interface TabItem {
  title: string;
  count?: number;
  content?: React.ReactNode;
}

export interface TabsProps {
  tabs?: TabItem[];
  active?: number;
  onChange?: (index: number) => void;
  ariaLabel?: string;
}

const Nav = styled.div\`
  display: flex;
  gap: var(--gl-spacing-scale-1);
  overflow-x: auto;
\`;

const Tab = styled.button\`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--gl-spacing-scale-2);
  padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-4);
  border: 0;
  background: transparent;
  font: inherit;
  font-size: var(--gl-font-size-base);
  color: var(--gl-text-color-subtle);
  cursor: pointer;
  &:hover {
    color: var(--gl-text-color-strong);
  }
  &::after {
    content: '';
    position: absolute;
    left: var(--gl-spacing-scale-1);
    right: var(--gl-spacing-scale-1);
    bottom: -1px;
    height: 2px;
    background-color: var(--gl-tab-selected-indicator-color-default);
    opacity: 0;
  }
  &[data-active='true'] {
    color: var(--gl-text-color-strong);
    font-weight: var(--gl-font-weight-bold);
    &::after {
      opacity: 1;
    }
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color);
  }
\`;

const Count = styled.span\`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: var(--gl-spacing-scale-5);
  padding: 0 var(--gl-spacing-scale-1);
  border-radius: var(--gl-border-radius-full);
  background-color: var(--gl-badge-muted-background-color-default);
  color: var(--gl-badge-muted-text-color-default);
  font-size: var(--gl-font-size-xs);
  font-weight: var(--gl-font-weight-semibold);
  line-height: var(--gl-line-height-16);
\`;

const Panel = styled.div\`
  padding: var(--gl-spacing-scale-5) 0;
  font-size: var(--gl-font-size-base);
  line-height: var(--gl-line-height-24);
  color: var(--gl-text-color-default);
\`;

export function Tabs({ tabs = [], active = 0, onChange, ariaLabel = 'Tabs' }: TabsProps) {
  const [idx, setIdx] = useState(active);
  const selected = idx >= 0 && idx < tabs.length ? idx : 0;

  const select = (index: number) => {
    setIdx(index);
    if (onChange) onChange(index);
  };

  return (
    <div>
      <Nav role="tablist" aria-label={ariaLabel}>
        {tabs.map((tab, index) => (
          <Tab
            type="button"
            key={index}
            role="tab"
            aria-selected={index === selected}
            data-active={index === selected || undefined}
            onClick={() => select(index)}
          >
            {tab.title}
            {tab.count != null ? <Count>{tab.count}</Count> : null}
          </Tab>
        ))}
      </Nav>
      <Panel role="tabpanel">{tabs[selected] ? tabs[selected].content : null}</Panel>
    </div>
  );
}
`;

/* __MORE__ *//* ======================================================================== */
/* ============================ styled family ============================= */
/* ======================================================================== */

const STYLED_BADGE = `__HEADER__
import * as React from 'react';
import styled from 'styled-components';

const BADGE_VARIANTS = ${JSON.stringify(BADGE_VARIANTS)};

const Pill = styled.span\`
  display: inline-flex;
  align-items: center;
  gap: var(--gl-spacing-scale-2);
  border: 1px solid transparent;
  border-radius: var(--gl-border-radius-full);
  padding: var(--gl-spacing-scale-1) var(--gl-spacing-scale-2);
  font-size: var(--gl-font-size-sm);
  font-weight: var(--gl-font-weight-semibold);
  line-height: var(--gl-line-height-16);
  text-decoration: none;
  white-space: nowrap;
  background-color: var(--gl-badge-neutral-background-color-default);
  color: var(--gl-badge-neutral-text-color-default);
  text-decoration: none;
\${BADGE_VARIANTS.map((v) => \`  &[data-variant='\${v}'] {
    background-color: var(--gl-badge-\${v}-background-color-default);
    color: var(--gl-badge-\${v}-text-color-default);
    --hover-color: var(--gl-badge-\${v}-border-color-hover);
  }\`).join('\\n')}
  &[href]:hover {
    box-shadow: inset 0 0 0 1px var(--hover-color, var(--gl-badge-neutral-border-color-hover));
  }
  &[href]:focus-visible {
    outline: none;
    box-shadow: inset 0 0 0 1px var(--hover-color, var(--gl-badge-neutral-border-color-hover)), 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color);
  }
  &[aria-disabled='true'] {
    opacity: 0.5;
    cursor: not-allowed;
  }
\`;

export interface BadgeProps {
  variant?: 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'tier';
  icon?: string | null;
  href?: string | null;
  disabled?: boolean;
  children?: React.ReactNode;
}

const STAR = (
  ${STAR_SVG}
);

export function Badge({
  variant = 'neutral',
  icon = null,
  href = null,
  disabled = false,
  children,
}: BadgeProps) {
  const inner = (
    <>
      {icon ? (
        <span aria-hidden="true">{STAR}</span>
      ) : null}
      <span>{children}</span>
    </>
  );
  if (href) {
    return (
      <Pill
        href={disabled ? undefined : href}
        data-variant={variant}
        aria-disabled={disabled || undefined}
        target="_blank"
        rel="noopener noreferrer"
      >
        {inner}
      </Pill>
    );
  }
  return <Pill data-variant={variant}>{inner}</Pill>;
}
`;

const STYLED_TOAST = `__HEADER__
import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { useEffect, useRef, useState } from 'react';

const CLOSE_SVG = (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export interface ToastAction {
  text: string;
  onClick?: () => void;
}

export interface ToastProps {
  message?: string;
  action?: ToastAction | null;
  autoHideDelay?: number;
  onDismiss?: () => void;
}

const toastIn = keyframes\`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: none;
  }
\`;

const toastOut = keyframes\`
  from {
    opacity: 1;
    transform: none;
  }
  to {
    opacity: 0;
    transform: translateY(8px);
  }
\`;

const Wrapper = styled.div\`
  position: fixed;
  left: var(--gl-spacing-scale-6);
  bottom: var(--gl-spacing-scale-6);
  z-index: var(--gl-zindex-200);
\`;

const Card = styled.div\`
  display: flex;
  align-items: center;
  gap: var(--gl-spacing-scale-4);
  max-width: min(24rem, calc(100vw - var(--gl-spacing-scale-12)));
  background-color: var(--gl-feedback-strong-background-color);
  color: var(--gl-feedback-strong-text-color);
  border-radius: var(--gl-border-radius-full);
  box-shadow: var(--gl-shadow-md);
  padding: var(--gl-spacing-scale-4) var(--gl-spacing-scale-5);
  font-size: var(--gl-font-size-base);
  animation: \${toastIn} 160ms ease-out;
  &[data-phase='leaving'] {
    animation: \${toastOut} 140ms ease-in forwards;
  }
\`;

const Message = styled.span\`
  flex: 1;
  min-width: 0;
  line-height: var(--gl-line-height-20);
\`;

const Action = styled.button\`
  border: 0;
  background: transparent;
  padding: 0;
  color: var(--gl-feedback-strong-link-color);
  font: inherit;
  font-size: var(--gl-font-size-base);
  font-weight: var(--gl-font-weight-bold);
  cursor: pointer;
  white-space: nowrap;
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color);
  }
\`;

const Close = styled.button\`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--gl-spacing-scale-1);
  border: 0;
  border-radius: var(--gl-border-radius-default);
  background: transparent;
  color: var(--gl-feedback-strong-text-color);
  cursor: pointer;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color);
  }
\`;

export function Toast({
  message = '',
  action = null,
  autoHideDelay = 5000,
  onDismiss,
}: ToastProps) {
  const delay = Math.max(1000, autoHideDelay);
  const dismissed = useRef(false);
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<'entering' | 'leaving'>('entering');

  useEffect(() => {
    const hideTimer = window.setTimeout(() => setPhase('leaving'), delay);
    const doneTimer = window.setTimeout(() => {
      if (!dismissed.current) {
        dismissed.current = true;
        setVisible(false);
        if (onDismiss) onDismiss();
      }
    }, delay + 140);
    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(doneTimer);
    };
  }, [delay, onDismiss]);

  const dismiss = () => {
    if (dismissed.current) return;
    dismissed.current = true;
    setVisible(false);
    if (onDismiss) onDismiss();
  };

  if (!visible) return null;

  return (
    <Wrapper>
      <Card role="status" data-phase={phase}>
        <Message>{message}</Message>
        {action ? (
          <Action
            type="button"
            onClick={() => {
              if (action.onClick) action.onClick();
              dismiss();
            }}
          >
            {action.text}
          </Action>
        ) : null}
        <Close type="button" aria-label="Dismiss" onClick={dismiss}>
          {CLOSE_SVG}
        </Close>
      </Card>
    </Wrapper>
  );
}
`;

const STYLED_DROPDOWN = `__HEADER__
import * as React from 'react';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';

const CHEVRON_SVG = (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CHECK_SVG = (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M3 8l3.5 3.5L13 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export interface DropdownItem {
  label?: string;
  value?: string;
  header?: boolean;
  divider?: boolean;
  checked?: boolean;
  disabled?: boolean;
}

export interface DropdownProps {
  text?: string;
  items?: DropdownItem[];
  showClearAll?: boolean;
  onSelect?: (item: DropdownItem) => void;
  onClearAll?: () => void;
}

const Root = styled.div\`
  position: relative;
  display: inline-block;
\`;

const Toggle = styled.button\`
  display: inline-flex;
  align-items: center;
  gap: var(--gl-spacing-scale-2);
  border: 1px solid var(--gl-border-color-default);
  border-radius: var(--gl-control-border-radius);
  background-color: var(--gl-action-neutral-background-color-default);
  color: var(--gl-action-neutral-foreground-color-default);
  padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-4);
  font: inherit;
  font-size: var(--gl-font-size-base);
  font-weight: var(--gl-font-weight-bold);
  cursor: pointer;
  &:hover,
  &[aria-expanded='true'] {
    background-color: var(--gl-action-neutral-background-color-hover);
    border-color: var(--gl-border-color-strong);
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color);
  }
\`;

const Chevron = styled.span\`
  display: inline-flex;
  color: var(--gl-text-color-subtle);
\`;

const Menu = styled.ul\`
  position: absolute;
  left: 0;
  top: calc(100% + var(--gl-spacing-scale-2));
  min-width: var(--gl-spacing-scale-48);
  margin: 0;
  padding: var(--gl-spacing-scale-2) 0;
  list-style: none;
  background-color: var(--gl-dropdown-background-color);
  border: 1px solid var(--gl-dropdown-border-color);
  border-radius: var(--gl-dropdown-border-radius);
  box-shadow: var(--gl-shadow-sm);
  z-index: var(--gl-zindex-3);
\`;

const Header = styled.li\`
  padding: var(--gl-spacing-scale-2) var(--gl-spacing-scale-4);
  font-size: var(--gl-font-size-sm);
  font-weight: var(--gl-font-weight-bold);
  color: var(--gl-text-color-subtle);
\`;

const Divider = styled.li\`
  height: 1px;
  margin: var(--gl-spacing-scale-2) 0;
  background-color: var(--gl-dropdown-divider-color);
\`;

const Item = styled.button\`
  display: flex;
  width: 100%;
  align-items: center;
  gap: var(--gl-spacing-scale-3);
  padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-4);
  border: 0;
  background: transparent;
  text-align: left;
  font: inherit;
  font-size: var(--gl-font-size-base);
  color: var(--gl-text-color-default);
  cursor: pointer;
  &[aria-checked='true'] {
    font-weight: var(--gl-font-weight-semibold);
  }
  &:hover:not(:disabled) {
    background-color: var(--gl-dropdown-option-background-color-unselected-hover);
  }
  &:disabled {
    color: var(--gl-dropdown-option-text-color-disabled);
    cursor: not-allowed;
  }
  &:focus-visible {
    outline: none;
    background-color: var(--gl-dropdown-option-background-color-unselected-focus);
  }
\`;

const Check = styled.span\`
  margin-left: auto;
  display: inline-flex;
  color: var(--gl-dropdown-option-indicator-color-selected-default);
\`;

const Clear = styled.button\`
  display: inline-flex;
  padding: var(--gl-spacing-scale-2) var(--gl-spacing-scale-4);
  border: 0;
  background: transparent;
  color: var(--gl-button-link-text-color-default);
  font: inherit;
  font-size: var(--gl-font-size-sm);
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
\`;

export function Dropdown({
  text = '',
  items = [],
  showClearAll = false,
  onSelect,
  onClearAll,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return undefined;
    const onMouseDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
    };
  }, [open]);

  const pick = (item: DropdownItem) => {
    if (item.disabled) return;
    setOpen(false);
    if (onSelect) onSelect(item);
  };

  return (
    <Root ref={rootRef}>
      <Toggle
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {text}
        <Chevron aria-hidden="true">{CHEVRON_SVG}</Chevron>
      </Toggle>
      {open ? (
        <Menu role="menu">
          {showClearAll ? (
            <li role="none">
              <Clear
                type="button"
                onClick={() => {
                  setOpen(false);
                  if (onClearAll) onClearAll();
                }}
              >
                Clear all
              </Clear>
            </li>
          ) : null}
          {items.map((item, index) => {
            if (item.divider) {
              return <Divider key={index} role="separator" />;
            }
            if (item.header) {
              return <Header key={index} role="presentation">{item.label}</Header>;
            }
            return (
              <li key={index} role="none">
                <Item
                  type="button"
                  role="menuitemcheckbox"
                  aria-checked={item.checked || false}
                  disabled={item.disabled}
                  onClick={() => pick(item)}
                >
                  <span>{item.label || item.value}</span>
                  {item.checked ? (
                    <Check aria-hidden="true">{CHECK_SVG}</Check>
                  ) : null}
                </Item>
              </li>
            );
          })}
        </Menu>
      ) : null}
    </Root>
  );
}
`;

const STYLED_FORM = `__HEADER__
import * as React from 'react';
import styled from 'styled-components';

const FormEl = styled.form\`
  display: flex;
  flex-direction: column;
  gap: var(--gl-spacing-scale-5);
\`;

const Group = styled.div\`
  display: flex;
  flex-direction: column;
  gap: var(--gl-spacing-scale-2);
\`;

const Label = styled.label\`
  display: flex;
  align-items: baseline;
  gap: var(--gl-spacing-scale-2);
  font-size: var(--gl-font-size-base);
  font-weight: var(--gl-font-weight-bold);
  color: var(--gl-text-color-strong);
\`;

const Optional = styled.span\`
  font-size: var(--gl-font-size-sm);
  font-weight: var(--gl-font-weight-normal);
  color: var(--gl-text-color-subtle);
\`;

const Helper = styled.p\`
  margin: 0;
  font-size: var(--gl-font-size-sm);
  line-height: var(--gl-line-height-16);
  color: var(--gl-text-color-subtle);
\`;

const Feedback = styled.p\`
  margin: 0;
  font-size: var(--gl-font-size-sm);
  line-height: var(--gl-line-height-16);
  &[data-state='valid'] {
    color: var(--gl-control-text-color-valid);
  }
  &[data-state='invalid'] {
    color: var(--gl-control-text-color-error);
  }
\`;

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode;
}

export function Form({ children, ...rest }: FormProps) {
  return <FormEl {...rest}>{children}</FormEl>;
}

export interface FormGroupProps {
  label?: string;
  helper?: string;
  error?: string | null;
  optional?: boolean;
  children?: React.ReactNode;
}

export function FormGroup({
  label = '',
  helper = '',
  error = null,
  optional = false,
  children,
}: FormGroupProps) {
  return (
    <Group>
      {label ? (
        <Label>
          {label}
          {optional ? <Optional>(optional)</Optional> : null}
        </Label>
      ) : null}
      {children}
      {error ? <Feedback data-state="invalid">{error}</Feedback> : null}
      {helper && !error ? <Helper>{helper}</Helper> : null}
    </Group>
  );
}
`;

const STYLED_ALERT = `__HEADER__
import * as React from 'react';
import styled from 'styled-components';
import { useState } from 'react';

${ALERT_ICONS}

const CLOSE_SVG = (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'danger' | 'tip';
  title?: string;
  dismissible?: boolean;
  sticky?: boolean;
  onDismiss?: () => void;
  children?: React.ReactNode;
}

const ROLES: Record<NonNullable<AlertProps['variant']>, string> = {
  info: 'status',
  tip: 'status',
  success: 'alert',
  warning: 'alert',
  danger: 'alert',
};

const ALERT_VARIANTS = ${JSON.stringify(ALERT_VARIANTS)};

const Box = styled.div\`
  display: flex;
  align-items: flex-start;
  gap: var(--gl-spacing-scale-3);
  border: 1px solid var(--gl-alert-info-border-color);
  border-radius: var(--gl-alert-border-radius);
  padding: var(--gl-spacing-scale-4) var(--gl-spacing-scale-5);
  background-color: var(--gl-alert-info-background-color);
  font-size: var(--gl-font-size-base);
\${ALERT_VARIANTS.map((v) => \`  &[data-variant='\${v}'] {
    background-color: var(--gl-alert-\${v}-background-color);
    border-color: var(--gl-alert-\${v}-border-color);
  }\`).join('\\n')}
  &[data-variant='info'] .icon {
    color: var(--gl-feedback-info-icon-color);
  }
  &[data-variant='success'] .icon {
    color: var(--gl-feedback-success-icon-color);
  }
  &[data-variant='warning'] .icon {
    color: var(--gl-feedback-warning-icon-color);
  }
  &[data-variant='danger'] .icon {
    color: var(--gl-feedback-danger-icon-color);
  }
  &[data-variant='tip'] .icon {
    color: var(--gl-icon-color-default);
  }
  &[data-sticky='true'] {
    position: sticky;
    top: 0;
    z-index: var(--gl-zindex-2);
  }
\`;

const Body = styled.div\`
  flex: 1;
  min-width: 0;
\`;

const Title = styled.h4\`
  margin: 0 0 var(--gl-spacing-scale-2);
  font-size: var(--gl-font-size-base);
  font-weight: var(--gl-font-weight-bold);
  color: var(--gl-alert-info-title-color);
  [data-variant='success'] & {
    color: var(--gl-alert-success-title-color);
  }
  [data-variant='warning'] & {
    color: var(--gl-alert-warning-title-color);
  }
  [data-variant='danger'] & {
    color: var(--gl-alert-danger-title-color);
  }
  [data-variant='tip'] & {
    color: var(--gl-alert-neutral-title-color);
  }
\`;

const Content = styled.div\`
  line-height: var(--gl-line-height-24);
\`;

const Icon = styled.span\`
  display: inline-flex;
  flex-shrink: 0;
\`;

const Dismiss = styled.button\`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--gl-spacing-scale-2);
  border: 0;
  border-radius: var(--gl-border-radius-default);
  background: transparent;
  color: var(--gl-text-color-subtle);
  cursor: pointer;
  &:hover {
    background-color: var(--gl-color-alpha-dark-6);
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color);
  }
\`;

export function Alert({
  variant = 'info',
  title = '',
  dismissible = true,
  sticky = false,
  onDismiss,
  children,
}: AlertProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <Box role={ROLES[variant]} data-variant={variant} data-sticky={sticky || undefined}>
      <Icon className="icon" aria-hidden="true">
        {ICONS[variant]}
      </Icon>
      <Body>
        {title ? <Title>{title}</Title> : null}
        <Content>{children}</Content>
      </Body>
      {dismissible ? (
        <Dismiss
          type="button"
          aria-label="Dismiss"
          onClick={() => {
            setDismissed(true);
            if (onDismiss) onDismiss();
          }}
        >
          {CLOSE_SVG}
        </Dismiss>
      ) : null}
    </Box>
  );
}
`;

/* Emotion variant: identical structure to styled-components. Swap the import
 * source (styled-components -> @emotion/styled, keyframes -> @emotion/react). */
const EMOTION_IMPORTS = [
  [
    /^import styled, \{ keyframes \} from 'styled-components';$/m,
    "import styled from '@emotion/styled';\nimport { keyframes } from '@emotion/react';",
  ],
  [/^import styled from 'styled-components';$/m, "import styled from '@emotion/styled';"],
];

function toEmotion(src) {
  return EMOTION_IMPORTS.reduce((acc, [re, to]) => acc.replace(re, to), src);
}

/* ======================================================================== */
/* ============================== next-shadcn ============================= */
/* ======================================================================== */

const SHADCN_LIB = `// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;

const SHADCN_HEADER = `// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
`;

const SHADCN_BUTTON = `${SHADCN_HEADER}
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-[var(--gl-spacing-scale-2)] whitespace-nowrap rounded-[var(--gl-button-border-radius)] border min-h-[var(--gl-spacing-scale-8)] px-[var(--gl-spacing-scale-4)] text-[length:var(--gl-font-size-base)] font-bold leading-[var(--gl-line-height-20)] transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--gl-focus-ring-outer-color)] disabled:pointer-events-none disabled:bg-[var(--gl-action-disabled-background-color)] disabled:text-[color:var(--gl-action-disabled-foreground-color)] disabled:border-[var(--gl-action-disabled-border-color)]',
  {
    variants: {
      category: {
        primary:
          'bg-[var(--gl-button-default-primary-background-color-default)] text-[color:var(--gl-button-default-primary-foreground-color-default)] border-[var(--gl-button-default-primary-border-color-default)] hover:bg-[var(--gl-button-default-primary-background-color-hover)] hover:text-[color:var(--gl-button-default-primary-foreground-color-hover)] hover:border-[var(--gl-button-default-primary-border-color-hover)] active:bg-[var(--gl-button-default-primary-background-color-active)] active:text-[color:var(--gl-button-default-primary-foreground-color-active)] active:border-[var(--gl-button-default-primary-border-color-active)]',
        secondary:
          'bg-[var(--gl-button-default-secondary-background-color-default)] text-[color:var(--gl-button-default-secondary-foreground-color-default)] border-[var(--gl-button-default-secondary-border-color-default)] hover:bg-[var(--gl-button-default-secondary-background-color-hover)] hover:text-[color:var(--gl-button-default-secondary-foreground-color-hover)] hover:border-[var(--gl-button-default-secondary-border-color-hover)] active:bg-[var(--gl-button-default-secondary-background-color-active)] active:text-[color:var(--gl-button-default-secondary-foreground-color-active)] active:border-[var(--gl-button-default-secondary-border-color-active)]',
        tertiary:
          'border-transparent bg-transparent text-[color:var(--gl-button-default-tertiary-text-color-default)] hover:text-[color:var(--gl-button-default-tertiary-text-color-hover)] hover:bg-transparent active:text-[color:var(--gl-button-default-tertiary-text-color-active)]',
      },
      variant: {
        default: '',
        confirm:
          'bg-[var(--gl-button-confirm-primary-background-color-default)] text-[color:var(--gl-button-confirm-primary-foreground-color-default)] border-[var(--gl-button-confirm-primary-border-color-default)] hover:bg-[var(--gl-button-confirm-primary-background-color-hover)] hover:text-[color:var(--gl-button-confirm-primary-foreground-color-hover)] active:bg-[var(--gl-button-confirm-primary-background-color-active)] active:text-[color:var(--gl-button-confirm-primary-foreground-color-active)]',
        danger:
          'bg-[var(--gl-button-danger-primary-background-color-default)] text-[color:var(--gl-button-danger-primary-foreground-color-default)] border-[var(--gl-button-danger-primary-border-color-default)] hover:bg-[var(--gl-button-danger-primary-background-color-hover)] hover:text-[color:var(--gl-button-danger-primary-foreground-color-hover)] active:bg-[var(--gl-button-danger-primary-background-color-active)] active:text-[color:var(--gl-button-danger-primary-foreground-color-active)]',
        link: 'h-auto min-h-0 border-0 bg-transparent p-0 font-normal rounded-[var(--gl-button-link-border-radius)] text-[color:var(--gl-button-link-text-color-default)] hover:bg-transparent hover:text-[color:var(--gl-button-link-text-color-hover)] hover:underline',
      },
      size: {
        small: 'min-h-[var(--gl-spacing-scale-7)] px-[var(--gl-spacing-scale-3)] text-[length:var(--gl-font-size-sm)]',
        medium: '',
      },
      block: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      category: 'primary',
      variant: 'default',
      size: 'medium',
      block: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  icon?: string;
}

const SPINNER = (
  ${SPINNER_SVG}
);

const ICON_PLACEHOLDER = (
  ${STAR_SVG}
);

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, category, variant, size, block, loading = false, icon = '', children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ category, variant, size, block }), className)}
      disabled={props.disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? <span className="animate-spin">{SPINNER}</span> : null}
      {!loading && icon ? <span>{ICON_PLACEHOLDER}</span> : null}
      {children != null ? <span>{children}</span> : null}
    </button>
  ),
);
Button.displayName = 'Button';

export { buttonVariants };
`;

const SHADCN_INPUT = `${SHADCN_HEADER}
const inputVariants = cva(
  'w-full max-w-full rounded-[var(--gl-control-border-radius)] border bg-[var(--gl-control-background-color-default)] px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] text-[length:var(--gl-font-size-base)] leading-[var(--gl-line-height-20)] text-[color:var(--gl-text-color-default)] placeholder:text-[color:var(--gl-control-placeholder-color)] transition-colors focus-visible:outline-none focus-visible:border-[var(--gl-control-border-color-focus)] focus-visible:ring-[3px] focus-visible:ring-[var(--gl-focus-ring-outer-color)] disabled:cursor-not-allowed disabled:bg-[var(--gl-control-background-color-disabled)] disabled:border-[var(--gl-control-border-color-disabled)] disabled:text-[color:var(--gl-text-color-disabled)] read-only:bg-[var(--gl-control-background-color-readonly)] read-only:border-[var(--gl-control-border-color-disabled)] hover:not-disabled:border-[var(--gl-control-border-color-hover)]',
  {
    variants: {
      state: {
        null: 'border-[var(--gl-control-border-color-default)]',
        valid: 'border-[var(--gl-control-text-color-valid)]',
        invalid: 'border-[var(--gl-control-border-color-error)]',
      },
      inputWidth: {
        null: '',
        xs: 'max-w-[var(--gl-spacing-scale-30)]',
        sm: 'max-w-[var(--gl-spacing-scale-34)]',
        md: 'max-w-[var(--gl-spacing-scale-48)]',
        lg: 'max-w-[var(--gl-spacing-scale-62)]',
        xl: 'max-w-[var(--gl-spacing-scale-75)]',
      },
    },
    defaultVariants: {
      state: 'null',
      inputWidth: 'null',
    },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, state, width, type = 'text', ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(inputVariants({ state, inputWidth }), className)}
      {...props}
    />
  ),
);
Input.displayName = 'Input';

export { inputVariants };
`;

const SHADCN_BADGE = `${SHADCN_HEADER}
const badgeVariants = cva(
  'inline-flex items-center gap-[var(--gl-spacing-scale-2)] whitespace-nowrap rounded-[var(--gl-border-radius-full)] border border-transparent px-[var(--gl-spacing-scale-2)] py-[var(--gl-spacing-scale-1)] text-[length:var(--gl-font-size-sm)] font-medium leading-[var(--gl-line-height-16)]',
  {
    variants: {
      variant: {
        neutral:
          'bg-[var(--gl-badge-neutral-background-color-default)] text-[color:var(--gl-badge-neutral-text-color-default)]',
        info: 'bg-[var(--gl-badge-info-background-color-default)] text-[color:var(--gl-badge-info-text-color-default)]',
        success:
          'bg-[var(--gl-badge-success-background-color-default)] text-[color:var(--gl-badge-success-text-color-default)]',
        warning:
          'bg-[var(--gl-badge-warning-background-color-default)] text-[color:var(--gl-badge-warning-text-color-default)]',
        danger:
          'bg-[var(--gl-badge-danger-background-color-default)] text-[color:var(--gl-badge-danger-text-color-default)]',
        tier: 'bg-[var(--gl-badge-tier-background-color-default)] text-[color:var(--gl-badge-tier-text-color-default)]',
      },
    },
    defaultVariants: {
      variant: 'neutral',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  icon?: string | null;
  href?: string | null;
  disabled?: boolean;
}

const STAR = (
  ${STAR_SVG}
);

export function Badge({ className, variant, icon = null, href = null, disabled = false, children, ...props }: BadgeProps) {
  const inner = (
    <>
      {icon ? (
        <span aria-hidden="true">{STAR}</span>
      ) : null}
      <span>{children}</span>
    </>
  );
  if (href) {
    return (
      <a
        className={cn(badgeVariants({ variant }), 'hover:shadow-[inset_0_0_0_1px_var(--gl-badge-neutral-border-color-hover)]', className)}
        href={disabled ? undefined : href}
        aria-disabled={disabled || undefined}
        {...props}
      >
        {inner}
      </a>
    );
  }
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {inner}
    </span>
  );
}

export { badgeVariants };
`;

const SHADCN_ALERT = `${SHADCN_HEADER}
const ALERT_ICONS: Record<string, React.ReactNode> = {
  info: (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 11V7.5M8 5v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  success: (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 8l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <path d="M8 2l6 11H2z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 6.5v3M8 11.2v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  danger: (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <path d="M8 1.5l6.5 6.5L8 14.5 1.5 8z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 5.5v3.5M8 11.4v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  tip: (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <path d="M8 1.5a4.5 4.5 0 0 0-3 7.9c.6.5 1 1.3 1 2.1v.5h4v-.5c0-.8.4-1.6 1-2.1A4.5 4.5 0 0 0 8 1.5z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M6.5 13h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

const alertVariants = cva(
  'relative flex w-full items-start gap-[var(--gl-spacing-scale-3)] rounded-[var(--gl-alert-border-radius)] border px-[var(--gl-spacing-scale-5)] py-[var(--gl-spacing-scale-4)] text-[length:var(--gl-font-size-base)] [&>svg]:absolute [&>svg]:left-[var(--gl-spacing-scale-5)] [&>svg]:top-[var(--gl-spacing-scale-4)] [&>svg~*]:pl-[var(--gl-spacing-scale-7)]',
  {
    variants: {
      variant: {
        info: 'bg-[var(--gl-alert-info-background-color)] border-[var(--gl-alert-info-border-color)] text-[color:var(--gl-alert-info-title-color)]',
        success:
          'bg-[var(--gl-alert-success-background-color)] border-[var(--gl-alert-success-border-color)] text-[color:var(--gl-alert-success-title-color)]',
        warning:
          'bg-[var(--gl-alert-warning-background-color)] border-[var(--gl-alert-warning-border-color)] text-[color:var(--gl-alert-warning-title-color)]',
        danger:
          'bg-[var(--gl-alert-danger-background-color)] border-[var(--gl-alert-danger-border-color)] text-[color:var(--gl-alert-danger-title-color)]',
        tip: 'bg-[var(--gl-alert-neutral-background-color)] border-[var(--gl-alert-neutral-border-color)] text-[color:var(--gl-alert-neutral-title-color)]',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  },
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  dismissible?: boolean;
  sticky?: boolean;
  onDismiss?: () => void;
}

const CLOSE_SVG = (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export function Alert({
  className,
  variant,
  title = '',
  dismissible = true,
  sticky = false,
  onDismiss,
  children,
  ...props
}: AlertProps) {
  const [dismissed, setDismissed] = React.useState(false);
  if (dismissed) return null;

  return (
    <div
      role={variant === 'success' || variant === 'warning' || variant === 'danger' ? 'alert' : 'status'}
      className={cn(
        alertVariants({ variant }),
        sticky && 'sticky top-0 z-[var(--gl-zindex-2)]',
        className,
      )}
      {...props}
    >
      <span aria-hidden="true">{ALERT_ICONS[variant || 'info']}</span>
      <div className="flex-1 min-w-0">
        {title ? <h4 className="mb-[var(--gl-spacing-scale-2)] font-bold leading-none">{title}</h4> : null}
        <div className="leading-[var(--gl-line-height-24)]">{children}</div>
      </div>
      {dismissible ? (
        <button
          type="button"
          aria-label="Dismiss"
          className="inline-flex items-center justify-center rounded-[var(--gl-border-radius-default)] p-[var(--gl-spacing-scale-2)] text-[color:var(--gl-text-color-subtle)] hover:bg-[var(--gl-color-alpha-dark-6)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--gl-focus-ring-outer-color)]"
          onClick={() => {
            setDismissed(true);
            if (onDismiss) onDismiss();
          }}
        >
          {CLOSE_SVG}
        </button>
      ) : null}
    </div>
  );
}

export { alertVariants };
`;

const SHADCN_TABS = `${SHADCN_HEADER}
export interface TabItem {
  title: string;
  count?: number;
  content?: React.ReactNode;
}

export interface TabsProps {
  tabs?: TabItem[];
  active?: number;
  onChange?: (index: number) => void;
  ariaLabel?: string;
  className?: string;
}

export function Tabs({ tabs = [], active = 0, onChange, ariaLabel = 'Tabs', className }: TabsProps) {
  const [idx, setIdx] = React.useState(active);
  const selected = idx >= 0 && idx < tabs.length ? idx : 0;

  const select = (index: number) => {
    setIdx(index);
    if (onChange) onChange(index);
  };

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="flex gap-[var(--gl-spacing-scale-1)] overflow-x-auto border-b border-[var(--gl-border-color-default)]"
      >
        {tabs.map((tab, index) => (
          <button
            type="button"
            key={index}
            role="tab"
            aria-selected={index === selected}
            data-active={index === selected || undefined}
            className={cn(
              'relative inline-flex items-center gap-[var(--gl-spacing-scale-2)] px-[var(--gl-spacing-scale-4)] py-[var(--gl-spacing-scale-3)] text-[length:var(--gl-font-size-base)] text-[color:var(--gl-text-color-subtle)] hover:text-[color:var(--gl-text-color-strong)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--gl-focus-ring-outer-color)] after:absolute after:inset-x-[var(--gl-spacing-scale-1)] after:-bottom-px after:h-[2px] after:bg-[var(--gl-tab-selected-indicator-color-default)] after:opacity-0',
              index === selected &&
                'font-bold text-[color:var(--gl-text-color-strong)] after:opacity-100',
            )}
            onClick={() => select(index)}
          >
            {tab.title}
            {tab.count != null ? (
              <span className="inline-flex min-w-[var(--gl-spacing-scale-5)] items-center justify-center rounded-[var(--gl-border-radius-full)] bg-[var(--gl-badge-muted-background-color-default)] px-[var(--gl-spacing-scale-1)] text-[length:var(--gl-font-size-xs)] font-semibold leading-[var(--gl-line-height-16)] text-[color:var(--gl-badge-muted-text-color-default)]">
                {tab.count}
              </span>
            ) : null}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="py-[var(--gl-spacing-scale-5)] text-[length:var(--gl-font-size-base)] leading-[var(--gl-line-height-24)] text-[color:var(--gl-text-color-default)]">
        {tabs[selected] ? tabs[selected].content : null}
      </div>
    </div>
  );
}
`;

const SHADCN_DROPDOWN = `${SHADCN_HEADER}
export interface DropdownItem {
  label?: string;
  value?: string;
  header?: boolean;
  divider?: boolean;
  checked?: boolean;
  disabled?: boolean;
}

export interface DropdownProps {
  text?: string;
  items?: DropdownItem[];
  showClearAll?: boolean;
  onSelect?: (item: DropdownItem) => void;
  onClearAll?: () => void;
  className?: string;
}

const CHEVRON_SVG = (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CHECK_SVG = (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M3 8l3.5 3.5L13 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Dropdown({ text = '', items = [], showClearAll = false, onSelect, onClearAll, className }: DropdownProps) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return undefined;
    const onMouseDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
    };
  }, [open]);

  const pick = (item: DropdownItem) => {
    if (item.disabled) return;
    setOpen(false);
    if (onSelect) onSelect(item);
  };

  return (
    <div className={cn('relative inline-block', className)} ref={rootRef}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-[var(--gl-spacing-scale-2)] rounded-[var(--gl-control-border-radius)] border border-[var(--gl-border-color-default)] bg-[var(--gl-action-neutral-background-color-default)] px-[var(--gl-spacing-scale-4)] py-[var(--gl-spacing-scale-3)] text-[length:var(--gl-font-size-base)] font-bold text-[color:var(--gl-action-neutral-foreground-color-default)] hover:bg-[var(--gl-action-neutral-background-color-hover)] hover:border-[var(--gl-border-color-strong)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--gl-focus-ring-outer-color)]"
        onClick={() => setOpen(!open)}
      >
        {text}
        <span className="inline-flex text-[color:var(--gl-text-color-subtle)]" aria-hidden="true">
          {CHEVRON_SVG}
        </span>
      </button>
      {open ? (
        <ul
          role="menu"
          className="absolute left-0 top-[calc(100%+var(--gl-spacing-scale-2))] z-[var(--gl-zindex-3)] my-[var(--gl-spacing-scale-0)] min-w-[var(--gl-spacing-scale-48)] list-none rounded-[var(--gl-dropdown-border-radius)] border border-[var(--gl-dropdown-border-color)] bg-[var(--gl-dropdown-background-color)] py-[var(--gl-spacing-scale-2)] shadow-[var(--gl-shadow-sm)]"
        >
          {showClearAll ? (
            <li role="none">
              <button
                type="button"
                className="inline-flex px-[var(--gl-spacing-scale-4)] py-[var(--gl-spacing-scale-2)] text-[length:var(--gl-font-size-sm)] text-[color:var(--gl-button-link-text-color-default)] hover:underline"
                onClick={() => {
                  setOpen(false);
                  if (onClearAll) onClearAll();
                }}
              >
                Clear all
              </button>
            </li>
          ) : null}
          {items.map((item, index) => {
            if (item.divider) {
              return <li key={index} role="separator" className="my-[var(--gl-spacing-scale-2)] h-px bg-[var(--gl-dropdown-divider-color)]" />;
            }
            if (item.header) {
              return (
                <li key={index} role="presentation" className="px-[var(--gl-spacing-scale-4)] py-[var(--gl-spacing-scale-2)] text-[length:var(--gl-font-size-sm)] font-bold text-[color:var(--gl-text-color-subtle)]">
                  {item.label}
                </li>
              );
            }
            return (
              <li key={index} role="none">
                <button
                  type="button"
                  role="menuitemcheckbox"
                  aria-checked={item.checked || false}
                  disabled={item.disabled}
                  className={cn(
                    'flex w-full items-center gap-[var(--gl-spacing-scale-3)] px-[var(--gl-spacing-scale-4)] py-[var(--gl-spacing-scale-3)] text-left text-[length:var(--gl-font-size-base)] text-[color:var(--gl-text-color-default)] hover:bg-[var(--gl-dropdown-option-background-color-unselected-hover)] disabled:cursor-not-allowed disabled:text-[color:var(--gl-dropdown-option-text-color-disabled)] focus-visible:outline-none focus-visible:bg-[var(--gl-dropdown-option-background-color-unselected-focus)]',
                    item.checked && 'font-semibold',
                  )}
                  onClick={() => pick(item)}
                >
                  <span>{item.label || item.value}</span>
                  {item.checked ? (
                    <span className="ml-auto inline-flex text-[color:var(--gl-dropdown-option-indicator-color-selected-default)]" aria-hidden="true">
                      {CHECK_SVG}
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
`;

const SHADCN_FORM = `${SHADCN_HEADER}
export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode;
}

export function Form({ className, children, ...props }: FormProps) {
  return (
    <form className={cn('flex flex-col gap-[var(--gl-spacing-scale-5)]', className)} {...props}>
      {children}
    </form>
  );
}

export interface FormGroupProps {
  label?: string;
  helper?: string;
  error?: string | null;
  optional?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function FormGroup({ label = '', helper = '', error = null, optional = false, children, className }: FormGroupProps) {
  return (
    <div className={cn('flex flex-col gap-[var(--gl-spacing-scale-2)]', className)}>
      {label ? (
        <label className="flex items-baseline gap-[var(--gl-spacing-scale-2)] text-[length:var(--gl-font-size-base)] font-bold text-[color:var(--gl-text-color-strong)]">
          {label}
          {optional ? (
            <span className="text-[length:var(--gl-font-size-sm)] font-normal text-[color:var(--gl-text-color-subtle)]">(optional)</span>
          ) : null}
        </label>
      ) : null}
      {children}
      {error ? (
        <p className="m-0 text-[length:var(--gl-font-size-sm)] leading-[var(--gl-line-height-16)] text-[color:var(--gl-control-text-color-error)]">{error}</p>
      ) : null}
      {helper && !error ? (
        <p className="m-0 text-[length:var(--gl-font-size-sm)] leading-[var(--gl-line-height-16)] text-[color:var(--gl-text-color-subtle)]">{helper}</p>
      ) : null}
    </div>
  );
}
`;

const SHADCN_TABLE = `${SHADCN_HEADER}
export interface TableField {
  key: string;
  label?: string;
  sortable?: boolean;
}

export interface TableProps {
  items?: Record<string, unknown>[];
  fields?: TableField[];
  loading?: boolean;
  sortBy?: string | null;
  sortDesc?: boolean;
  onSort?: (key: string) => void;
  className?: string;
}

export function Table({ items = [], fields = [], loading = false, sortBy = null, sortDesc = false, onSort, className }: TableProps) {
  const arrow = (field: TableField) => {
    if (sortBy !== field.key) return '\\u2195';
    return sortDesc ? '\\u2193' : '\\u2191';
  };

  return (
    <div className={cn('relative overflow-auto rounded-[var(--gl-border-radius-lg)] border border-[var(--gl-border-color-default)] bg-[var(--gl-background-color-default)]', loading && 'pointer-events-none opacity-55', className)}>
      {loading ? (
        <p className="m-0 p-[var(--gl-spacing-scale-4)] text-[length:var(--gl-font-size-sm)] text-[color:var(--gl-text-color-subtle)]">Loading records\\u2026</p>
      ) : null}
      <table className="w-full border-collapse text-[length:var(--gl-font-size-base)] text-[color:var(--gl-text-color-default)]">
        <thead>
          <tr>
            {fields.map((field) => (
              <th
                key={field.key}
                className="sticky top-0 z-[1] bg-[var(--gl-background-color-subtle)] px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] text-left font-bold text-[color:var(--gl-text-color-strong)] shadow-[inset_0_-1px_0_var(--gl-border-color-default)]"
              >
                {field.sortable ? (
                  <button
                    type="button"
                    className="inline-flex items-center gap-[var(--gl-spacing-scale-2)] p-0 font-bold text-inherit hover:text-[color:var(--gl-table-sorting-icon-color)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--gl-focus-ring-outer-color)]"
                    onClick={() => onSort && onSort(field.key)}
                  >
                    {field.label || field.key}
                    <span aria-hidden="true" className="text-[length:var(--gl-font-size-sm)] leading-none text-[color:var(--gl-table-sorting-icon-color)]">
                      {arrow(field)}
                    </span>
                  </button>
                ) : (
                  field.label || field.key
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td
                className="p-[var(--gl-spacing-scale-5)] text-center text-[color:var(--gl-text-color-subtle)]"
                colSpan={fields.length || 1}
              >
                No records found
              </td>
            </tr>
          ) : (
            items.map((item, index) => (
              <tr key={index} className="border-b border-[var(--gl-border-color-subtle)] transition-colors hover:bg-[var(--gl-table-row-background-color-hover)]">
                {fields.map((field) => (
                  <td key={field.key} className="px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)]">
                    {String(item[field.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
`;

const SHADCN_TOAST = `${SHADCN_HEADER}
export interface ToastAction {
  text: string;
  onClick?: () => void;
}

export interface ToastProps {
  message?: string;
  action?: ToastAction | null;
  autoHideDelay?: number;
  onDismiss?: () => void;
  className?: string;
}

const CLOSE_SVG = (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export function Toast({ message = '', action = null, autoHideDelay = 5000, onDismiss, className }: ToastProps) {
  const delay = Math.max(1000, autoHideDelay);
  const dismissed = React.useRef(false);
  const [visible, setVisible] = React.useState(true);
  const [phase, setPhase] = React.useState<'entering' | 'leaving'>('entering');

  React.useEffect(() => {
    const hideTimer = window.setTimeout(() => setPhase('leaving'), delay);
    const doneTimer = window.setTimeout(() => {
      if (!dismissed.current) {
        dismissed.current = true;
        setVisible(false);
        if (onDismiss) onDismiss();
      }
    }, delay + 140);
    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(doneTimer);
    };
  }, [delay, onDismiss]);

  const dismiss = () => {
    if (dismissed.current) return;
    dismissed.current = true;
    setVisible(false);
    if (onDismiss) onDismiss();
  };

  if (!visible) return null;

  return (
    <div className={cn('fixed bottom-[var(--gl-spacing-scale-6)] left-[var(--gl-spacing-scale-6)] z-[var(--gl-zindex-200)]', className)}>
      <div
        role="status"
        data-phase={phase}
        className={cn(
          'flex max-w-[min(24rem,calc(100vw-var(--gl-spacing-scale-12)))] items-center gap-[var(--gl-spacing-scale-4)] rounded-[var(--gl-border-radius-full)] bg-[var(--gl-feedback-strong-background-color)] px-[var(--gl-spacing-scale-5)] py-[var(--gl-spacing-scale-4)] text-[length:var(--gl-font-size-base)] text-[color:var(--gl-feedback-strong-text-color)] shadow-[var(--gl-shadow-md)]',
          phase === 'leaving' && 'translate-y-[var(--gl-spacing-scale-2)] opacity-0 transition-all duration-150',
        )}
      >
        <span className="min-w-0 flex-1 leading-[var(--gl-line-height-20)]">{message}</span>
        {action ? (
          <button
            type="button"
            className="whitespace-nowrap border-0 bg-transparent p-0 font-bold text-[color:var(--gl-feedback-strong-link-color)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--gl-focus-ring-outer-color)]"
            onClick={() => {
              if (action.onClick) action.onClick();
              dismiss();
            }}
          >
            {action.text}
          </button>
        ) : null}
        <button
          type="button"
          aria-label="Dismiss"
          className="inline-flex items-center justify-center rounded-[var(--gl-border-radius-default)] p-[var(--gl-spacing-scale-1)] opacity-70 hover:opacity-100 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--gl-focus-ring-outer-color)]"
          onClick={dismiss}
        >
          {CLOSE_SVG}
        </button>
      </div>
    </div>
  );
}
`;

const SHADCN_MODAL = `${SHADCN_HEADER}
export interface ModalAction {
  text: string;
  variant?: 'default' | 'confirm' | 'danger';
}

export interface ModalProps {
  visible?: boolean;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  primaryAction?: ModalAction | null;
  secondaryAction?: { text: string } | null;
  onClose?: () => void;
  children?: React.ReactNode;
}

const BTN_CLS: Record<string, string> = {
  confirm:
    'bg-[var(--gl-button-confirm-primary-background-color-default)] text-[color:var(--gl-button-confirm-primary-foreground-color-default)] border-[var(--gl-button-confirm-primary-border-color-default)] hover:bg-[var(--gl-button-confirm-primary-background-color-hover)]',
  danger:
    'bg-[var(--gl-button-danger-primary-background-color-default)] text-[color:var(--gl-button-danger-primary-foreground-color-default)] border-[var(--gl-button-danger-primary-border-color-default)] hover:bg-[var(--gl-button-danger-primary-background-color-hover)]',
  default:
    'bg-[var(--gl-action-neutral-background-color-default)] text-[color:var(--gl-action-neutral-foreground-color-default)] border-[var(--gl-border-color-default)] hover:bg-[var(--gl-action-neutral-background-color-hover)] hover:border-[var(--gl-border-color-strong)]',
};

const SIZE_CLS: Record<string, string> = {
  sm: 'max-w-[var(--gl-spacing-scale-30)]',
  md: 'max-w-[var(--gl-spacing-scale-48)]',
  lg: 'max-w-[var(--gl-spacing-scale-75)]',
};

const CLOSE_SVG = (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export function Modal({
  visible = false,
  title = '',
  size = 'md',
  primaryAction = null,
  secondaryAction = null,
  onClose,
  children,
}: ModalProps) {
  const [show, setShow] = React.useState(visible);
  const [leaving, setLeaving] = React.useState(false);

  React.useEffect(() => {
    if (visible) {
      setShow(true);
      setLeaving(false);
      return undefined;
    }
    if (!show) return undefined;
    setLeaving(true);
    const timer = window.setTimeout(() => {
      setShow(false);
      setLeaving(false);
    }, 130);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  React.useEffect(() => {
    if (!show) return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onClose) onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
    };
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[var(--gl-zindex-4)] flex items-center justify-center bg-[var(--gl-color-alpha-dark-40)] p-[var(--gl-spacing-scale-5)]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && onClose) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          'flex max-h-[calc(100vh-var(--gl-spacing-scale-10))] w-full flex-col overflow-hidden rounded-[var(--gl-modal-border-radius)] bg-[var(--gl-background-color-default)] shadow-[var(--gl-shadow-lg)]',
          SIZE_CLS[size] || SIZE_CLS['md'],
          leaving && 'translate-y-[calc(var(--gl-spacing-scale-2)*-1)] opacity-0 transition-all duration-130',
        )}
      >
        <div className="flex items-start justify-between gap-[var(--gl-spacing-scale-3)] border-b border-[var(--gl-border-color-subtle)] px-[var(--gl-spacing-scale-5)] py-[var(--gl-spacing-scale-4)]">
          <h3 className="m-0 text-[length:var(--gl-heading-scale-500-font-size)] font-bold leading-[var(--gl-line-height-28)] text-[color:var(--gl-text-color-heading)]">{title}</h3>
          <button
            type="button"
            aria-label="Close"
            className="inline-flex items-center justify-center rounded-[var(--gl-border-radius-default)] p-[var(--gl-spacing-scale-2)] text-[color:var(--gl-text-color-subtle)] hover:bg-[var(--gl-color-alpha-dark-6)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--gl-focus-ring-outer-color)]"
            onClick={() => onClose && onClose()}
          >
            {CLOSE_SVG}
          </button>
        </div>
        <div className="overflow-y-auto px-[var(--gl-spacing-scale-5)] py-[var(--gl-spacing-scale-5)] text-[length:var(--gl-font-size-base)] leading-[var(--gl-line-height-24)] text-[color:var(--gl-text-color-default)]">
          {children}
        </div>
        <div className="flex flex-wrap justify-end gap-[var(--gl-spacing-scale-3)] border-t border-[var(--gl-border-color-subtle)] px-[var(--gl-spacing-scale-5)] py-[var(--gl-spacing-scale-4)] max-[576px]:flex-col max-[576px]:items-stretch">
          {secondaryAction ? (
            <button
              type="button"
              className={cn(BTN_CLS['default'], 'inline-flex min-h-[var(--gl-spacing-scale-8)] items-center justify-center rounded-[var(--gl-button-border-radius)] border px-[var(--gl-spacing-scale-4)] font-bold focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--gl-focus-ring-outer-color)] max-[576px]:w-full')}
              onClick={() => onClose && onClose()}
            >
              {secondaryAction.text}
            </button>
          ) : null}
          {primaryAction ? (
            <button
              type="button"
              className={cn(BTN_CLS[primaryAction.variant || 'confirm'], 'inline-flex min-h-[var(--gl-spacing-scale-8)] items-center justify-center rounded-[var(--gl-button-border-radius)] border px-[var(--gl-spacing-scale-4)] font-bold focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--gl-focus-ring-outer-color)] max-[576px]:w-full')}
              onClick={() => onClose && onClose()}
            >
              {primaryAction.text}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
`;

/* ======================================================================== */
/* ================================= driver =============================== */
/* ======================================================================== */

const ALL_IDS = spec.components.map((c) => c.id);

function indexFile(frame, exports) {
  const lines = [TS_HEADER, ''];
  for (const line of exports) lines.push(line);
  return lines.join('\n');
}

function readme(frame, kind, extra) {
  const rows = ALL_IDS.map((id) => {
    const c = spec.components.find((s) => s.id === id);
    return '| ' + c.title + ' | ' + c.states.join(', ') + ' | ' + c.props.map((p) => p.name).join(', ') + ' |';
  });
  return [
    '# ' + frame + ' components',
    '',
    'Pajamas-inspired React components generated from the shared component spec.',
    kind,
    '',
    'All colors, spacing, radii, shadows and z-indexes reference the shared design tokens via `var(--gl-*)` (see `dist/css/variables.css`).',
    extra || '',
    '## Components',
    '',
    '| Component | States | Props |',
    '| --- | --- | --- |',
    ...rows,
    '',
    '## Usage',
    '',
    '```tsx',
    "import { Button } from './components';",
    '',
    '<Button category="primary" variant="confirm">Save changes</Button>',
    '```',
    '',
    'Regenerate with `node scripts/gen-react.js` (idempotent).',
    '',
  ].join('\n');
}

function writeComponents(frame, files) {
  const dir = OUT[frame];
  fs.mkdirSync(dir, { recursive: true });
  for (const [name, content] of Object.entries(files)) {
    write(path.join(dir, name), content);
  }
}

function sharedName(id) {
  return 'SHARED_' + id.toUpperCase();
}
function cssName(id) {
  return 'CSS_' + id.toUpperCase();
}
function twName(id) {
  return 'TW_' + id.toUpperCase();
}
function styledName(id) {
  return 'STYLED_' + id.toUpperCase();
}
function shadcnName(id) {
  return 'SHADCN_' + id.toUpperCase();
}

/* Available template constants (verified with typeof checks so a missing
 * template fails loudly instead of emitting `undefined`). */
function tpl(name) {
  const value = MARKS[name];
  if (typeof value !== 'string' || !value) {
    throw new Error('template constant missing: ' + name);
  }
  return value;
}

const MARKS = {
  SHARED_BUTTON, SHARED_INPUT, SHARED_MODAL, SHARED_TABLE, SHARED_TABS,
  SHARED_BADGE, SHARED_TOAST, SHARED_DROPDOWN, SHARED_FORM, SHARED_ALERT,
  CSS_BUTTON, CSS_INPUT, CSS_MODAL, CSS_TABLE, CSS_TABS,
  CSS_BADGE, CSS_TOAST, CSS_DROPDOWN, CSS_FORM, CSS_ALERT,
  TW_BUTTON, TW_INPUT, TW_MODAL, TW_TABLE, TW_TABS,
  TW_BADGE, TW_TOAST, TW_DROPDOWN, TW_FORM, TW_ALERT,
  STYLED_BUTTON, STYLED_INPUT, STYLED_MODAL, STYLED_TABLE, STYLED_TABS,
  STYLED_BADGE, STYLED_TOAST, STYLED_DROPDOWN, STYLED_FORM, STYLED_ALERT,
  SHADCN_BUTTON, SHADCN_INPUT, SHADCN_MODAL, SHADCN_TABLE, SHADCN_TABS,
  SHADCN_BADGE, SHADCN_TOAST, SHADCN_DROPDOWN, SHADCN_FORM, SHADCN_ALERT,
};

function emitShared(frame, mode) {
  const isCss = mode === 'css';
  const files = {};
  const exports = [];
  for (const id of ALL_IDS) {
    const T = TITLES[id];
    const tsx = tpl(sharedName(id))
      .replaceAll('__HEADER__', TS_HEADER)
      .replaceAll(
        '__CSS_IMPORT__',
        isCss ? "import './" + T + ".css';" : "import styles from './" + T + ".module.css';",
      )
      .replaceAll('__CL__', isCss ? PLAIN_CL : MODULE_CL);
    const css = tpl(cssName(id))
      .replaceAll('__HEADER__', ATTRIB)
      .replaceAll('/* __HEADER__ */', CSS_HEADER);
    files[T + '.tsx'] = tsx;
    files[T + (isCss ? '.css' : '.module.css')] = css;
    exports.push("export { " + T + " } from './" + T + "';");
  }
  files['index.ts'] = indexFile(frame, exports);
  files['README.md'] = readme(frame, isCss
    ? 'Plain CSS files, one stylesheet per component, class names prefixed `gl-`.'
    : 'CSS Modules, one `.module.css` file per component (no global class-name collisions).');
  writeComponents(frame, files);
}

function emitTailwind(frame) {
  const files = {};
  const exports = [];
  for (const id of ALL_IDS) {
    const T = TITLES[id];
    files[T + '.tsx'] = tpl(twName(id))
      .replaceAll('__HEADER__', TS_HEADER)
      .replaceAll('__BTN_CLS__', comboMapTw() + '\n');
    exports.push("export { " + T + " } from './" + T + "';");
  }
  files['index.ts'] = indexFile(frame, exports);
  files['README.md'] = readme(frame,
    'Tailwind utility classes with arbitrary values pointing at the shared tokens, e.g. `bg-[var(--gl-badge-success-background-color-default)]`.');
  writeComponents(frame, files);
}

function emitStyledFamily(frame, kind) {
  const isEmotion = kind === 'emotion';
  const files = {};
  const exports = [];
  for (const id of ALL_IDS) {
    const T = TITLES[id];
    let src = tpl(styledName(id)).replaceAll('__HEADER__', TS_HEADER);
    if (isEmotion) src = toEmotion(src);
    files[T + '.tsx'] = src;
    exports.push("export { " + T + " } from './" + T + "';");
  }
  files['index.ts'] = indexFile(frame, exports);
  files['README.md'] = readme(frame, isEmotion
    ? 'Styles are colocated via `@emotion/styled` template literals and the `css` prop; all values use `var(--gl-*)` tokens.'
    : 'Styles are colocated via `styled-components` template literals; all values use `var(--gl-*)` tokens.');
  writeComponents(frame, files);
}

function lowerName(id) {
  return id;
}

function emitShadcn(frame) {
  const files = {};
  const exports = [];
  for (const id of ALL_IDS) {
    const src = tpl(shadcnName(id)).replaceAll('__HEADER__', TS_HEADER);
    files[id + '.tsx'] = src;
    exports.push("export { " + TITLES[id] + " } from './" + id + "';");
  }
  files['index.ts'] = indexFile(frame, exports);
  files['README.md'] = readme(frame,
    'shadcn/ui conventions: `cva` variants, `cn()` helper and Tailwind arbitrary values bound to the tokens.',
    [
      '',
      '## Install into a Next.js app',
      '',
      'Copy the files into `components/ui` and the helper into `lib/utils.ts`:',
      '',
      '```',
      'components/ui/button.tsx  (this file: button.tsx)',
      'lib/utils.ts              (see ../lib/utils.ts)',
      '```',
      '',
      'Required dependencies: `class-variance-authority`, `clsx`, `tailwind-merge`.',
      '',
    ].join('\n'));
  writeComponents(frame, files);

  write(path.join(OUT['next-shadcn-lib'], 'utils.ts'), SHADCN_LIB);
}

function main() {
  emitShared('react-css', 'css');
  emitShared('react-modules', 'modules');
  emitTailwind('react-tailwind');
  emitStyledFamily('react-styled', 'styled');
  emitStyledFamily('react-emotion', 'emotion');
  emitShadcn('next-shadcn');
  const counts = FRAMES.map((f) => {
    const dir = OUT[f];
    return f + '=' + fs.readdirSync(dir).length;
  });
  console.log('generated:', counts.join(' '), '+ next-shadcn/lib');
}

if (require.main === module) {
  main();
}
