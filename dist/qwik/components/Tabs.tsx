// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import { component$, useSignal } from '@builder.io/qwik';
import type { QRL } from '@builder.io/qwik';

export interface TabMeta {
  title: string;
  count?: number;
  disabled?: boolean;
  content?: string;
}

export interface TabsProps {
  tabs?: TabMeta[];
  active?: number;
  onChange$?: QRL<(index: number) => void>;
}

export const GlTabs = component$<TabsProps>((props) => {
  const tabs = props.tabs ?? [];
  const active = useSignal(props.active ?? 0);
  const pane = () => {
    const cur = tabs[active.value];
    return cur ? cur.content : '';
  };
  return (
    <>
      <div>
        <nav class="g-tabs-nav" role="tablist" aria-label="Tabs">
          {tabs.map((tab, i) => (
            <button
              type="button"
              class="g-tab"
              data-active={i === active.value}
              disabled={tab.disabled ? true : undefined}
              role="tab"
              aria-selected={i === active.value}
              onClick$={() => {
                if (tab.disabled) return;
                active.value = i;
                props.onChange$?.(i);
              }}
            >
              {tab.title}
              {tab.count != null ? <span class="g-tab-count">{tab.count}</span> : null}
            </button>
          ))}
        </nav>
        <div class="g-tab-pane" role="tabpanel">
          {pane()}
        </div>
      </div>
      <style>{TABS_CSS}</style>
    </>
  );
});

export default GlTabs;
