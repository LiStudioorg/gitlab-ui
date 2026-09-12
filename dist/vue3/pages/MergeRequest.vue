<!-- 由 scripts/gen-pages.js 生成；Pajamas-inspired (MIT)。 -->
<template>
  <div id="gl-root" class="pg-page" :class="{ 'gl-dark': dark }">
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
        <button type="button" class="pg-icon-btn" aria-label="切换暗色模式" title="切换暗色模式" @click="toggleDark">
          <svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true"><path :d="dark ? DARK_ICON : MOON_ICON" /></svg>
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
            <span class="pg-sidenav-name">acme/web</span>
            <span class="pg-sidenav-ns">代码评审平台</span>
          </span>
        </div>
        <nav class="pg-sidenav-nav">
        <a class="pg-nav-link" href="#overview"><svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 1.5h5.5L13 5v9.5H4z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M9 1.5V5h3.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>概览</a>
        <a class="pg-nav-link" href="#code"><svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true"><circle cx="4.5" cy="3.5" r="1.8" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="4.5" cy="12.5" r="1.8" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="11.5" cy="3.5" r="1.8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4.5 5.3v5.4M11.5 5.3v1.2c0 1.6-1.2 2.5-2.8 2.5H6.3" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>代码</a>
        <a class="pg-nav-link" href="#issues"><svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="2" fill="currentColor"/></svg>议题<span class="pg-nav-count">12</span></a>
        <a class="pg-nav-link is-active" href="#merge-requests"><svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true"><circle cx="4.5" cy="3.5" r="1.8" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="11.5" cy="12.5" r="1.8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4.5 5.3v1.2c0 1.6 1.2 2.5 2.8 2.5h2.4M9.7 7l1.8 1.8L13.3 7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>合并请求<span class="pg-nav-count">3</span></a>
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
        <div class="min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <h1 class="pg-h1">{{ mr.title }}</h1>
            <gl-badge variant="info">!{{ mr.id }}</gl-badge>
            <gl-badge :variant="mr.state === 'merged' ? 'success' : (mr.state === 'draft' ? 'warning' : 'info')">
              {{ mr.state === 'merged' ? '已合并' : (mr.state === 'draft' ? '草稿' : '开启中') }}
            </gl-badge>
          </div>
          <p class="pg-subtle mt-2 mb-0 flex items-center gap-2 flex-wrap">
            <span class="pg-chip" style="background-color: var(--gl-badge-muted-background-color-default); color: var(--gl-badge-muted-text-color-default)">{{ mr.source }}</span>
            →
            <span class="pg-chip" style="background-color: var(--gl-badge-muted-background-color-default); color: var(--gl-badge-muted-text-color-default)">{{ mr.target }}</span>
            <span>· 由 {{ mr.author }} 于 {{ mr.createdAt }} 创建</span>
          </p>
        </div>
        <div v-if="mr.state !== 'merged'" class="flex items-center gap-2 flex-wrap">
          <gl-button category="secondary">编辑</gl-button>
          <gl-button category="secondary">转为草稿</gl-button>
          <gl-button variant="confirm" :disabled="!canMerge" @click="mergeNow">合并</gl-button>
        </div>
      </div>

      <gl-tabs class="mt-5" :tabs="mrTabs" :active="0" />

      <div class="mt-5 flex flex-col gap-5">
        <gl-alert v-if="mr.state === 'merged'" variant="success" title="已合并">
          该合并请求已并入 {{ mr.target }}。
        </gl-alert>
        <gl-alert v-else variant="info" title="检查进行中" :dismissible="false">
          流水线正在运行，完成后可合并（{{ mr.checksPassed }} / {{ mr.checksTotal }} 项检查已通过）。
        </gl-alert>

        <section class="pg-card p-5">
          <h2 class="text-[length:var(--gl-font-size-500-fixed)] mb-3">描述</h2>
          <p class="m-0" style="max-width: var(--gl-spacing-scale-62)">{{ mr.description }}</p>
        </section>

        <section aria-label="讨论时间线" class="flex flex-col gap-4">
          <article v-for="d in mr.discussions" :key="d.id" class="pg-card p-5">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="pg-avatar-sm pg-avatar">{{ d.author.slice(0, 1) }}</span>
              <span class="font-bold text-[color:var(--gl-text-color-strong)]">{{ d.author }}</span>
              <span class="pg-subtle text-[length:var(--gl-font-size-sm)]">{{ d.time }}</span>
              <gl-badge :variant="d.resolved ? 'success' : 'warning'">{{ d.resolved ? '已解决' : '待回复' }}</gl-badge>
            </div>
            <p class="mt-2 mb-0">{{ d.body }}</p>
            <div v-for="r in d.replies" :key="r.id" class="mt-4 pl-5" style="border-left: 1px solid var(--gl-border-color-subtle)">
              <span class="font-bold text-[length:var(--gl-font-size-base)]">{{ r.author }}</span>
              <span class="pg-subtle text-[length:var(--gl-font-size-sm)] ml-2">{{ r.time }}</span>
              <p class="mt-1 mb-0">{{ r.body }}</p>
            </div>
            <div class="mt-3 flex gap-2">
              <gl-button variant="link" category="tertiary">回复</gl-button>
              <gl-button v-if="!d.resolved" variant="link" category="tertiary">标记解决</gl-button>
            </div>
          </article>
        </section>

        <section class="pg-card p-5" aria-label="批准状态">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="font-bold text-[color:var(--gl-text-color-strong)]">批准</span>
            <gl-badge :variant="mr.approvals.given >= mr.approvals.required ? 'success' : 'warning'">
              {{ mr.approvals.given }} / {{ mr.approvals.required }} 批准已提交
            </gl-badge>
          </div>
          <div class="mt-3 flex items-center gap-3 flex-wrap">
            <span v-for="r in mr.reviewers" :key="r.name" class="flex items-center gap-2">
              <span class="pg-avatar-sm pg-avatar" :style="{ backgroundColor: avatarBg(r.color) }">{{ r.name.slice(0, 1) }}</span>
              <span>{{ r.name }}</span>
            </span>
          </div>
        </section>

        <section class="pg-card p-5" aria-label="合并操作">
          <h2 class="text-[length:var(--gl-font-size-500-fixed)] mb-3">合并设置</h2>
          <div class="flex flex-col gap-2">
            <label class="flex items-center gap-2"><input type="checkbox" checked /> 合并后删除源分支</label>
            <label class="flex items-center gap-2"><input type="checkbox" /> 以合并提交方式并入</label>
          </div>
          <div class="mt-4 flex gap-2 flex-wrap">
            <gl-button variant="confirm" :disabled="mr.state === 'merged'">确认合并</gl-button>
            <gl-button category="secondary">关闭合并请求</gl-button>
          </div>
        </section>
      </div>

      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { GlButton, GlBadge, GlAlert, GlTabs, GlDropdown, GlInput, GlTable } from '../components/index.js';

const MOON_ICON = '<path d=&quot;M13.2 9.8A5.5 5.5 0 0 1 6.2 2.8a5.5 5.5 0 1 0 7 7z&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;1.5&quot; stroke-linejoin=&quot;round&quot;/>';
const DARK_ICON = '<circle cx=&quot;8&quot; cy=&quot;8&quot; r=&quot;3&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;1.5&quot;/><path d=&quot;M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M12.6 3.4l-1.4 1.4M4.8 11.2l-1.4 1.4&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;1.4&quot; stroke-linecap=&quot;round&quot;/>';

const dark = ref(false);
function toggleDark() {
  dark.value = !dark.value;
}

const mr = ref({
  "id": 42,
  "title": "feat: 用户设置页支持键盘快捷键",
  "source": "feat/keyboard-shortcuts",
  "target": "main",
  "state": "ready",
  "author": "王小明",
  "createdAt": "2026-09-10 14:20",
  "branchCommits": 4,
  "pipelineStatus": "running",
  "checksPassed": 5,
  "checksTotal": 6,
  "description": "本合并请求为用户设置页新增全局键盘快捷键：\n\n- `Ctrl+K` 打开快速搜索\n- `g i` 跳转到议题列表\n- `g p` 跳转到合并请求列表\n\n同时在右上角新增快捷键帮助入口，附带文档更新。",
  "approvals": {
    "given": 1,
    "required": 2
  },
  "reviewers": [
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
  "assignees": [
    {
      "name": "王小明",
      "color": "blue"
    }
  ],
  "labels": [
    {
      "text": "backend",
      "color": "info"
    },
    {
      "text": "feature",
      "color": "success"
    },
    {
      "text": "needs docs",
      "color": "warning"
    }
  ],
  "milestone": "v3.4",
  "discussions": [
    {
      "id": 1,
      "author": "李雷",
      "color": "blue",
      "time": "3 小时前",
      "body": "快捷键的注册逻辑建议收敛到一个统一的 hooks 里，避免和设置页状态耦合。",
      "resolved": false,
      "replies": [
        {
          "id": 2,
          "author": "王小明",
          "color": "blue",
          "time": "2 小时前",
          "body": "已拆出 useHotkeys.js，请再看一眼最新提交。"
        }
      ]
    },
    {
      "id": 3,
      "author": "韩梅梅",
      "color": "green",
      "time": "昨天",
      "body": "文档更新得很清楚，快捷键冲突检测部分也覆盖了吗？",
      "resolved": true,
      "replies": []
    }
  ],
  "discussionCount": 2,
  "commits": 4
});

const mrTabs = ref([
  { title: '概览' },
  { title: '提交', count: mr.value.commits },
  { title: '流水线' },
  { title: '变更' },
  { title: '讨论', count: mr.value.discussionCount },
]);

const canMerge = computed(() => mr.value.pipelineStatus !== 'failed');

function mergeNow() {
  mr.value.state = 'merged';
}

function avatarBg(color) {
  var map = {
    blue: 'var(--gl-avatar-fallback-background-color-blue)',
    green: 'var(--gl-avatar-fallback-background-color-green)',
    neutral: 'var(--gl-avatar-fallback-background-color-neutral)',
  };
  return map[color] || map.blue;
}

</script>

<style scoped>
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
.pg-h1 { font-size: var(--gl-heading-scale-500-font-size); }
.pg-subtle { color: var(--gl-text-color-subtle); }
.pg-chip { display: inline-flex; padding: var(--gl-spacing-scale-1) var(--gl-spacing-scale-2); border-radius: var(--gl-border-radius-full); font-size: var(--gl-font-size-sm); font-weight: var(--gl-font-weight-bold); }
.pg-spin { animation: pg-spin 0.8s linear infinite; }
@keyframes pg-spin { to { transform: rotate(360deg); } }
@media (max-width: 639px) {
  .pg-sidenav { display: none; }
}

.pg-avatar-sm { width: var(--gl-spacing-scale-7); height: var(--gl-spacing-scale-7); }

</style>
