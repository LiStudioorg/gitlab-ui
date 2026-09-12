// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import type { QRL } from '@builder.io/qwik';

export type DropdownItem = string | { text: string; checked?: boolean };

export interface DropdownProps {
  text?: string;
  items?: DropdownItem[];
  showClearAll?: boolean;
  onSelect$?: QRL<(index: number, item: DropdownItem, checked: boolean) => void>;
  onClearAll$?: QRL<() => void>;
}

export const GlDropdown = component$<DropdownProps>((props) => {
  const open = useSignal(false);
  const rootEl = useSignal<HTMLElement>();

  useVisibleTask$(({ cleanup }) => {
    const onDoc = (e: Event) => {
      if (open.value && rootEl.value && !rootEl.value.contains(e.target as Node)) open.value = false;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') open.value = false;
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    cleanup(() => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    });
  });

  const labelOf = (item: DropdownItem) => (typeof item === 'string' ? item : item.text);
  const checkedOf = (item: DropdownItem) => typeof item === 'object' && !!item.checked;
  const items = props.items ?? [];

  return (
    <>
      <div class="g-dropdown" ref={rootEl}>
        <button type="button" class="g-dropdown-toggle" aria-haspopup="true" aria-expanded={open.value} onClick$={() => (open.value = !open.value)}>
          {props.text}
          <span class="g-caret" aria-hidden="true"><svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
        </button>
        {open.value ? (
          <div class="g-dropdown-menu" role="menu" aria-label="Options">
            <div class="g-dropdown-header">Options</div>
            {items.map((item, i) => (
              <button
                type="button"
                class="g-dropdown-item"
                data-checked={checkedOf(item)}
                role="menuitemcheckbox"
                aria-checked={checkedOf(item)}
                onClick$={() => {
                  props.onSelect$?.(i, item, typeof item === 'object' ? !item.checked : true);
                  open.value = false;
                }}
              >
                <span>{labelOf(item)}</span>
                {checkedOf(item) ? <span aria-hidden="true"><svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M3 8l3.5 3.5L13 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span> : null}
              </button>
            ))}
            {props.showClearAll ? (
              <>
                <div class="g-dropdown-divider" role="separator" />
                <button type="button" class="g-dropdown-clear" onClick$={() => {
                  props.onClearAll$?.();
                  open.value = false;
                }}>
                  Clear all
                </button>
              </>
            ) : null}
          </div>
        ) : null}
      </div>
      <style>{DROPDOWN_CSS}</style>
    </>
  );
});

export default GlDropdown;
