// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import { createSignal } from 'solid-js';
import type { JSX } from 'solid-js';

export interface TabMeta {
  title: string;
  count?: number;
  disabled?: boolean;
  content?: string;
}

export interface TabsProps {
  tabs?: TabMeta[];
  active?: number;
  onChange?: (index: number) => void;
}

export function Tabs(props: TabsProps) {
  const tabs = () => props.tabs ?? [];
  const [active, setActive] = createSignal(props.active ?? 0);
  const select = (i: number) => {
    const tab = tabs()[i];
    if (!tab || tab.disabled) return;
    setActive(i);
    props.onChange?.(i);
  };
  const pane = () => {
    const cur = tabs()[active()];
    return cur ? cur.content : '';
  };
  return (
    <div>
      <nav class="g-tabs-nav" role="tablist" aria-label="Tabs">
        {tabs().map((tab, i) => (
          <button
            type="button"
            class="g-tab"
            data-active={i === active()}
            disabled={tab.disabled ? true : undefined}
            role="tab"
            aria-selected={i === active()}
            onClick={() => select(i)}
          >
            {tab.title}
            {tab.count != null ? <span class="g-tab-count">{tab.count}</span> : null}
          </button>
        ))}
      </nav>
      <div class="g-tab-pane" role="tabpanel">
        {pane()}
      </div>
      <style>{TABS_CSS}</style>
    </div>
  );
}

export default Tabs;
