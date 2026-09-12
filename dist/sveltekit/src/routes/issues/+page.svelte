<!-- 由 scripts/gen-pages.js 生成；Pajamas-inspired (MIT)。 -->
<script>
  import { GlButton, GlBadge, GlAlert, GlTabs, GlDropdown, GlInput, GlTable } from '../../../../components/index.js';

  let dark = false;
  function toggleDark() {
    dark = !dark;
  }

  const MOON_ICON = "<path d=&quot;M13.2 9.8A5.5 5.5 0 0 1 6.2 2.8a5.5 5.5 0 1 0 7 7z&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;1.5&quot; stroke-linejoin=&quot;round&quot;/>";
  const SUN_ICON = "<circle cx=&quot;8&quot; cy=&quot;8&quot; r=&quot;3&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;1.5&quot;/><path d=&quot;M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M12.6 3.4l-1.4 1.4M4.8 11.2l-1.4 1.4&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;1.4&quot; stroke-linecap=&quot;round&quot;/>";

  const it = {
    "openCount": 12,
    "closedCount": 4,
    "labels": [
      {
        "text": "bug",
        "color": "danger",
        "count": 5
      },
      {
        "text": "feature",
        "color": "success",
        "count": 4
      },
      {
        "text": "documentation",
        "color": "info",
        "count": 3
      },
      {
        "text": "good first issue",
        "color": "tier",
        "count": 2
      }
    ],
    "assignees": [
      {
        "name": "王小明",
        "color": "blue"
      },
      {
        "name": "李雷",
        "color": "blue"
      },
      {
        "name": "韩梅梅",
        "color": "green"
      },
      {
        "name": "赵大有",
        "color": "neutral"
      }
    ],
    "milestone": "v3.4",
    "list": [
      {
        "id": 128,
        "title": "暗色模式下徽章对比度不足",
        "state": "opened",
        "labels": [
          {
            "text": "bug",
            "color": "danger"
          },
          {
            "text": "documentation",
            "color": "info"
          }
        ],
        "author": "李雷",
        "updated": "1 小时前",
        "comments": 6,
        "watchers": 3
      },
      {
        "id": 125,
        "title": "看板列支持按里程碑分组",
        "state": "opened",
        "labels": [
          {
            "text": "feature",
            "color": "success"
          }
        ],
        "author": "韩梅梅",
        "updated": "3 小时前",
        "comments": 2,
        "watchers": 8
      },
      {
        "id": 121,
        "title": "议题列表空态缺引导按钮",
        "state": "opened",
        "labels": [
          {
            "text": "good first issue",
            "color": "tier"
          }
        ],
        "author": "王小明",
        "updated": "昨天",
        "comments": 4,
        "watchers": 1
      },
      {
        "id": 117,
        "title": "流水线图节点连线的虚线样式未对齐",
        "state": "opened",
        "labels": [
          {
            "text": "bug",
            "color": "danger"
          },
          {
            "text": "feature",
            "color": "success"
          }
        ],
        "author": "赵大有",
        "updated": "2 天前",
        "comments": 9,
        "watchers": 5
      },
      {
        "id": 109,
        "title": "README 示例代码块高亮失败",
        "state": "closed",
        "labels": [
          {
            "text": "documentation",
            "color": "info"
          }
        ],
        "author": "李雷",
        "updated": "5 天前",
        "comments": 3,
        "watchers": 0
      }
    ],
    "boardColumns": [
      {
        "label": "待处理",
        "color": "neutral",
        "cards": [
          {
            "id": 128,
            "title": "暗色模式下徽章对比度不足",
            "labels": [
              {
                "text": "bug",
                "color": "danger"
              }
            ],
            "assignee": "李雷"
          },
          {
            "id": 121,
            "title": "议题列表空态缺引导按钮",
            "labels": [
              {
                "text": "good first issue",
                "color": "tier"
              }
            ],
            "assignee": "王小明"
          }
        ]
      },
      {
        "label": "进行中",
        "color": "info",
        "cards": [
          {
            "id": 125,
            "title": "看板列支持按里程碑分组",
            "labels": [
              {
                "text": "feature",
                "color": "success"
              }
            ],
            "assignee": "韩梅梅"
          }
        ]
      },
      {
        "label": "已完成",
        "color": "success",
        "cards": [
          {
            "id": 117,
            "title": "流水线图节点连线的虚线样式未对齐",
            "labels": [
              {
                "text": "bug",
                "color": "danger"
              }
            ],
            "assignee": "赵大有"
          }
        ]
      }
    ]
  };

  const stateItems = [
    { label: '进行中', value: 'opened', checked: true },
    { label: '已关闭', value: 'closed' },
  ];
  const sortItems = [
    { label: '最近更新', value: 'updated' },
    { label: '创建时间', value: 'created' },
    { label: '优先级', value: 'priority' },
    { label: '人气', value: 'popularity' },
  ];

  const CHIP_BG = {
    neutral: 'var(--gl-badge-neutral-background-color-default)',
    info: 'var(--gl-badge-info-background-color-default)',
    success: 'var(--gl-badge-success-background-color-default)',
    warning: 'var(--gl-badge-warning-background-color-default)',
    danger: 'var(--gl-badge-danger-background-color-default)',
    tier: 'var(--gl-badge-tier-background-color-default)',
  };
  const CHIP_FG = {
    neutral: 'var(--gl-badge-neutral-text-color-default)',
    info: 'var(--gl-badge-info-text-color-default)',
    success: 'var(--gl-badge-success-text-color-default)',
    warning: 'var(--gl-badge-warning-text-color-default)',
    danger: 'var(--gl-badge-danger-text-color-default)',
    tier: 'var(--gl-badge-tier-text-color-default)',
  };
  function chipBg(c) {
    return CHIP_BG[c] || CHIP_BG.neutral;
  }
  function chipFg(c) {
    return CHIP_FG[c] || CHIP_FG.neutral;
  }

</script>

<div id="gl-root" class:gl-dark={dark} class="pg-page">
  <!-- 顶部全局导航 -->
  <header class="pg-topbar">
    <div class="pg-topbar-left">
      <span class="pg-topbar-brand">代码评审平台</span>
      <label class="pg-search">
        <svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true"><circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10.5 10.5L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        <input type="search" placeholder="搜索或输入命令" aria-label="搜索" />
      </label>
    </div>
    <div class="pg-topbar-right">
      <button type="button" class="pg-icon-btn" aria-label="切换暗色模式" title="切换暗色模式" on:click={toggleDark}>
        <svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true">{@html dark ? SUN_ICON : MOON_ICON}</svg>
      </button>
      <button type="button" class="pg-icon-btn" aria-label="新建">
        <svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
      </button>
      <span class="pg-avatar" title="王小明">王</span>
    </div>
  </header>

  <div class="pg-shell">
    <!-- 左侧项目导航 -->
    <aside class="pg-sidenav" aria-label="项目导航">
      <div class="pg-sidenav-project">
        <span class="pg-sidenav-avatar"><svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M1.5 3.5h4.5l1.5 2h7v8h-13z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg></span>
        <span class="pg-sidenav-meta">
          <span class="pg-sidenav-name">my-project</span>
          <span class="pg-sidenav-ns">代码评审平台</span>
        </span>
      </div>
      <nav class="pg-sidenav-nav">
        <a class="pg-nav-link" href="#overview"><svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 1.5h5.5L13 5v9.5H4z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M9 1.5V5h3.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>概览</a>
        <a class="pg-nav-link" href="#code"><svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true"><circle cx="4.5" cy="3.5" r="1.8" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="4.5" cy="12.5" r="1.8" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="11.5" cy="3.5" r="1.8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4.5 5.3v5.4M11.5 5.3v1.2c0 1.6-1.2 2.5-2.8 2.5H6.3" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>代码</a>
        <a class="pg-nav-link is-active" href="#issues"><svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="2" fill="currentColor"/></svg>议题<span class="pg-nav-count">12</span></a>
        <a class="pg-nav-link" href="#merge-requests"><svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true"><circle cx="4.5" cy="3.5" r="1.8" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="11.5" cy="12.5" r="1.8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4.5 5.3v1.2c0 1.6 1.2 2.5 2.8 2.5h2.4M9.7 7l1.8 1.8L13.3 7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>合并请求<span class="pg-nav-count">3</span></a>
        <div class="pg-nav-group">
          <span class="pg-nav-link pg-nav-parent"><svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.8c2.5 1.4 3.8 3.7 3.8 6.4L10 10H6L4.2 8.2c0-2.7 1.3-5 3.8-6.4z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><circle cx="8" cy="6.2" r="1.2" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M6 10.5l-1.2 3M10 10.5l1.2 3M8 11v3.2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>CI/CD</span>
          <div class="pg-nav-children">
          <a class="pg-nav-link pg-nav-child" href="#pipelines">流水线</a>
          <a class="pg-nav-link pg-nav-child" href="#jobs">作业</a>
          <a class="pg-nav-link pg-nav-child" href="#schedules">计划任务</a>
          </div>
        </div>
        <a class="pg-nav-link" href="#deploy"><svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 12l3-7 3 4 3-6 3 9z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>部署</a>
        <a class="pg-nav-link" href="#monitor"><svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 13.5h11M4.5 13V9M8 13V5.5M11.5 13V7.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>分析与监控</a>
      </nav>
    </aside>

    <!-- 主内容 -->
    <main class="pg-main">
      <div class="flex items-start justify-between gap-4 flex-wrap">
        <div class="flex items-center gap-3 flex-wrap">
          <h1 class="pg-h1">议题</h1>
          <GlBadge variant="success">进行中 {it.openCount}</GlBadge>
          <GlBadge variant="neutral">已关闭 {it.closedCount}</GlBadge>
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          <GlButton category="secondary">列表</GlButton>
          <GlButton category="secondary">看板</GlButton>
          <GlButton variant="confirm">新建议题</GlButton>
        </div>
      </div>

      <div class="mt-5 flex items-center gap-3 flex-wrap" role="search" aria-label="筛选工具条">
        <GlInput type="search" placeholder="按标题或编号搜索" width="md" />
        <GlDropdown text="状态: 进行中" items={stateItems} showClearAll />
        <GlDropdown text="排序: 最近更新" items={sortItems} />
      </div>

      <div class="mt-5 flex flex-col gap-5">
        <section class="pg-card" aria-label="议题列表">
          <ul class="flex flex-col m-0 p-0 list-none">
            {#each it.list as i (i.id)}
            <li class="pg-issue-row">
              <svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="2" fill="currentColor"/></svg>
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="font-bold text-[color:var(--gl-text-color-strong)]">{i.title}</span>
                  <GlBadge variant={i.state === 'opened' ? 'success' : 'neutral'}>{i.state === 'opened' ? '进行中' : '已关闭'}</GlBadge>
                  {#each i.labels as l (l.text)}
                  <span class="pg-chip" style={`background-color: ${chipBg(l.color)}; color: ${chipFg(l.color)}`}>{l.text}</span>
                  {/each}
                </div>
                <p class="pg-subtle text-[length:var(--gl-font-size-sm)] mt-1 mb-0">#{i.id} · 由 {i.author} 创建 · 更新于 {i.updated}</p>
              </div>
              <div class="flex items-center gap-4 pg-subtle text-[length:var(--gl-font-size-sm)]">
                <span title="评论数">{i.comments}</span>
                <span title="关注数">{i.watchers}</span>
              </div>
            </li>
            {/each}
          </ul>
        </section>

        <section aria-label="看板视图">
          <h2 class="text-[length:var(--gl-font-size-500-fixed)] mb-3">看板</h2>
          <div class="flex gap-4 overflow-x-auto pb-2">
            {#each it.boardColumns as col (col.label)}
            <div class="pg-board-col">
              <div class="flex items-center gap-2">
                <span class="pg-board-dot" style={`background-color: ${chipBg(col.color)}`}></span>
                <span class="font-bold text-[color:var(--gl-text-color-strong)]">{col.label}</span>
                <GlBadge variant="neutral">{col.cards.length}</GlBadge>
              </div>
              {#each col.cards as c (c.id)}
              <div class="pg-board-card" draggable="true">
                <p class="m-0 font-bold text-[length:var(--gl-font-size-base)] text-[color:var(--gl-text-color-strong)]">{c.title}</p>
                <div class="flex items-center gap-2 mt-2 flex-wrap">
                  {#each c.labels as l (l.text)}
                  <span class="pg-chip" style={`background-color: ${chipBg(l.color)}; color: ${chipFg(l.color)}`}>{l.text}</span>
                  {/each}
                  <span class="pg-subtle text-[length:var(--gl-font-size-sm)]">#{c.id}</span>
                  <span class="ml-auto pg-avatar pg-avatar-sm">{c.assignee.slice(0, 1)}</span>
                </div>
              </div>
              {/each}
            </div>
            {/each}
          </div>
        </section>
      </div>

    </main>
  </div>
</div>



<style>
.pg-page { min-height: 100vh; background-color: var(--gl-background-color-default); color: var(--gl-text-color-default); font-size: var(--gl-font-size-base); line-height: var(--gl-line-height-24); }
.pg-topbar { position: sticky; top: 0; z-index: var(--gl-zindex-3); display: flex; align-items: center; justify-content: space-between; gap: var(--gl-spacing-scale-4); padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-5); background-color: var(--gl-background-color-overlap); border-bottom: 1px solid var(--gl-border-color-default); }
.pg-topbar-left { display: flex; align-items: center; gap: var(--gl-spacing-scale-4); min-width: 0; }
.pg-topbar-right { display: flex; align-items: center; gap: var(--gl-spacing-scale-2); }
.pg-topbar-brand { font-weight: var(--gl-font-weight-bold); font-size: var(--gl-font-size-400-fixed); color: var(--gl-text-color-heading); white-space: nowrap; }
.pg-search { display: flex; align-items: center; gap: var(--gl-spacing-scale-2); padding: var(--gl-spacing-scale-2) var(--gl-spacing-scale-3); border: 1px solid var(--gl-border-color-default); border-radius: var(--gl-border-radius-lg); background-color: var(--gl-control-background-color-default); width: min(22rem, 40vw); }
.pg-search input { border: 0; outline: none; background: transparent; color: var(--gl-text-color-default); font-size: var(--gl-font-size-sm); width: 100%; }
.pg-icon-btn { display: inline-flex; align-items: center; justify-content: center; width: var(--gl-spacing-scale-8); height: var(--gl-spacing-scale-8); border-radius: var(--gl-border-radius-full); border: 0; background: transparent; color: var(--gl-text-color-default); cursor: pointer; }
.pg-icon-btn:hover { background-color: var(--gl-color-alpha-dark-4); }
.pg-avatar { display: inline-flex; align-items: center; justify-content: center; width: var(--gl-spacing-scale-8); height: var(--gl-spacing-scale-8); border-radius: var(--gl-avatar-circle-border-radius-default); background-color: var(--gl-avatar-fallback-background-color-blue); color: var(--gl-text-color-heading); font-weight: var(--gl-font-weight-bold); font-size: var(--gl-font-size-sm); }
.pg-icon { width: var(--gl-line-height-16); height: var(--gl-line-height-16); flex-shrink: 0; }
.pg-shell { display: flex; align-items: flex-start; }
.pg-sidenav { width: var(--gl-spacing-scale-30); flex-shrink: 0; position: sticky; top: var(--gl-spacing-scale-13); max-height: calc(100vh - var(--gl-spacing-scale-13)); overflow-y: auto; padding: var(--gl-spacing-scale-4); border-right: 1px solid var(--gl-border-color-default); min-height: calc(100vh - var(--gl-spacing-scale-13)); }
.pg-sidenav-project { display: flex; align-items: center; gap: var(--gl-spacing-scale-3); padding: var(--gl-spacing-scale-2); margin-bottom: var(--gl-spacing-scale-4); }
.pg-sidenav-avatar { display: inline-flex; align-items: center; justify-content: center; width: var(--gl-spacing-scale-8); height: var(--gl-spacing-scale-8); border-radius: var(--gl-border-radius-md); background-color: var(--gl-avatar-fallback-background-color-neutral); }
.pg-sidenav-meta { min-width: 0; }
.pg-sidenav-name { display: block; font-weight: var(--gl-font-weight-bold); color: var(--gl-text-color-heading); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pg-sidenav-ns { display: block; font-size: var(--gl-font-size-sm); color: var(--gl-text-color-subtle); }
.pg-sidenav-nav { display: flex; flex-direction: column; gap: var(--gl-spacing-scale-1); }
.pg-nav-link { display: flex; align-items: center; gap: var(--gl-spacing-scale-3); padding: var(--gl-spacing-scale-2) var(--gl-spacing-scale-3); border-radius: var(--gl-border-radius-md); color: var(--gl-text-color-default); font-size: var(--gl-font-size-base); text-decoration: none; }
.pg-nav-link:hover { background-color: var(--gl-color-alpha-dark-4); }
.pg-nav-link.is-active { background-color: var(--gl-color-alpha-dark-8); color: var(--gl-text-color-strong); font-weight: var(--gl-font-weight-bold); }
.pg-nav-count { margin-left: auto; font-size: var(--gl-font-size-sm); color: var(--gl-text-color-subtle); background-color: var(--gl-badge-muted-background-color-default); border-radius: var(--gl-border-radius-full); padding: 0 var(--gl-spacing-scale-2); }
.pg-nav-parent { font-weight: var(--gl-font-weight-bold); color: var(--gl-text-color-heading); }
.pg-nav-children { display: flex; flex-direction: column; gap: var(--gl-spacing-scale-1); margin-bottom: var(--gl-spacing-scale-2); }
.pg-nav-child { padding-left: var(--gl-spacing-scale-9); }
.pg-main { flex: 1 1 auto; min-width: 0; padding: var(--gl-spacing-scale-5) var(--gl-spacing-scale-6); }
.pg-card { background-color: var(--gl-background-color-overlap); border: 1px solid var(--gl-border-color-default); border-radius: var(--gl-border-radius-lg); box-shadow: var(--gl-shadow-sm); }
.pg-h1 { font-size: var(--gl-heading-scale-500-font-size); margin: 0; color: var(--gl-text-color-heading); font-weight: var(--gl-font-weight-heading); }
.pg-subtle { color: var(--gl-text-color-subtle); }
.pg-chip { display: inline-flex; padding: var(--gl-spacing-scale-1) var(--gl-spacing-scale-2); border-radius: var(--gl-border-radius-full); font-size: var(--gl-font-size-sm); font-weight: var(--gl-font-weight-bold); }
.pg-spin { animation: pg-spin 0.8s linear infinite; }
@keyframes pg-spin { to { transform: rotate(360deg); } }
@media (max-width: 639px) {
  .pg-sidenav { display: none; }
}

.pg-issue-row { display: flex; align-items: flex-start; gap: var(--gl-spacing-scale-3); padding: var(--gl-spacing-scale-4) var(--gl-spacing-scale-5); box-shadow: inset 0 -1px 0 var(--gl-border-color-subtle); }
.pg-issue-row:hover { background-color: var(--gl-table-row-background-color-hover); }
.pg-issue-row > svg { margin-top: var(--gl-spacing-scale-1); color: var(--gl-text-color-subtle); }
.pg-board-col { display: flex; flex-direction: column; gap: var(--gl-spacing-scale-3); width: var(--gl-spacing-scale-62); flex-shrink: 0; padding: var(--gl-spacing-scale-3); border: 1px dashed var(--gl-border-color-default); border-radius: var(--gl-border-radius-lg); background-color: var(--gl-background-color-subtle); }
.pg-board-dot { width: var(--gl-line-height-16); height: var(--gl-line-height-16); border-radius: var(--gl-border-radius-full); flex-shrink: 0; }
.pg-board-card { background-color: var(--gl-background-color-overlap); border: 1px solid var(--gl-border-color-default); border-radius: var(--gl-border-radius-lg); padding: var(--gl-spacing-scale-3); box-shadow: var(--gl-shadow-sm); cursor: grab; }
.pg-avatar-sm { width: var(--gl-spacing-scale-7); height: var(--gl-spacing-scale-7); }

</style>
