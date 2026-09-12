// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import { createSignal, onCleanup } from 'solid-js';
import type { JSX } from 'solid-js';

export type DropdownItem = string | { text: string; checked?: boolean };

export interface DropdownProps {
  text?: string;
  items?: DropdownItem[];
  showClearAll?: boolean;
  onSelect?: (index: number, item: DropdownItem, checked: boolean) => void;
  onClearAll?: () => void;
}

export function Dropdown(props: DropdownProps) {
  const [open, setOpen] = createSignal(false);
  let rootEl: HTMLDivElement | undefined;

  const onDoc = (e: Event) => {
    if (open() && rootEl && !rootEl.contains(e.target as Node)) setOpen(false);
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false);
  };
  document.addEventListener('mousedown', onDoc);
  document.addEventListener('keydown', onKey);
  onCleanup(() => {
    document.removeEventListener('mousedown', onDoc);
    document.removeEventListener('keydown', onKey);
  });

  const labelOf = (item: DropdownItem) => (typeof item === 'string' ? item : item.text);
  const checkedOf = (item: DropdownItem) => typeof item === 'object' && !!item.checked;
  const select = (item: DropdownItem, i: number) => {
    props.onSelect?.(i, item, typeof item === 'object' ? !item.checked : true);
    setOpen(false);
  };
  const clearAll = () => {
    props.onClearAll?.();
    setOpen(false);
  };

  return (
    <div class="g-dropdown" ref={rootEl}>
      <button type="button" class="g-dropdown-toggle" aria-haspopup="true" aria-expanded={open()} onClick={() => setOpen(!open())}>
        {props.text}
        <span class="g-caret" aria-hidden="true"><svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
      </button>
      {open() ? (
        <div class="g-dropdown-menu" role="menu" aria-label="Options">
          <div class="g-dropdown-header">Options</div>
          {(props.items ?? []).map((item, i) => (
            <button
              type="button"
              class="g-dropdown-item"
              data-checked={checkedOf(item)}
              role="menuitemcheckbox"
              aria-checked={checkedOf(item)}
              onClick={() => select(item, i)}
            >
              <span>{labelOf(item)}</span>
              {checkedOf(item) ? <span aria-hidden="true"><svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M3 8l3.5 3.5L13 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span> : null}
            </button>
          ))}
          {props.showClearAll ? (
            <>
              <div class="g-dropdown-divider" role="separator" />
              <button type="button" class="g-dropdown-clear" onClick={clearAll}>
                Clear all
              </button>
            </>
          ) : null}
        </div>
      ) : null}
      <style>{DROPDOWN_CSS}</style>
    </div>
  );
}

export default Dropdown;
