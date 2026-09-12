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
        <a class="pg-nav-link" href="#merge-requests"><svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true"><circle cx="4.5" cy="3.5" r="1.8" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="11.5" cy="12.5" r="1.8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4.5 5.3v1.2c0 1.6 1.2 2.5 2.8 2.5h2.4M9.7 7l1.8 1.8L13.3 7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>合并请求<span class="pg-nav-count">3</span></a>
        <div class="pg-nav-group">
          <span class="pg-nav-link pg-nav-parent"><svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.8c2.5 1.4 3.8 3.7 3.8 6.4L10 10H6L4.2 8.2c0-2.7 1.3-5 3.8-6.4z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><circle cx="8" cy="6.2" r="1.2" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M6 10.5l-1.2 3M10 10.5l1.2 3M8 11v3.2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>CI/CD</span>
          <div class="pg-nav-children">
            <a class="pg-nav-link pg-nav-child is-active" href="#pipelines">流水线</a>
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
            <h1 class="pg-h1">流水线 #{{ pl.id }}</h1>
            <gl-badge :variant="pl.status === 'running' ? 'info' : 'success'">
              <svg v-if="pl.status === 'running'" class="pg-icon pg-spin" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2" opacity="0.35"/><path d="M14 8A6 6 0 0 0 8 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
              {{ pl.status === 'running' ? '运行中' : '已通过' }}
            </gl-badge>
          </div>
          <p class="pg-subtle mt-2 mb-0 flex items-center gap-2 flex-wrap">
            <span class="pg-chip" style="background-color: var(--gl-badge-muted-background-color-default); color: var(--gl-badge-muted-text-color-default)">{{ pl.branch }}</span>
            <span>· {{ pl.sha }} {{ pl.commitMsg }}</span>
            <span>· 由 {{ pl.trigger }} 触发 · 已运行 {{ pl.duration }}</span>
          </p>
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          <gl-button category="secondary">重试</gl-button>
          <gl-button category="secondary">取消</gl-button>
          <gl-button variant="confirm">运行流水线</gl-button>
        </div>
      </div>

      <div class="mt-5 flex flex-col gap-5">
        <section class="pg-card p-5" aria-label="流水线阶段图">
          <div class="flex items-center gap-4 overflow-x-auto pb-2">
            <div v-for="(st, si) in pl.stages" :key="st.name" class="flex items-center gap-4">
              <div class="flex flex-col gap-3">
                <span class="font-bold text-[color:var(--gl-text-color-strong)]">{{ st.name }}</span>
                <button
                  v-for="j in st.jobs"
                  :key="j.name"
                  type="button"
                  class="pg-job"
                  :data-status="j.status"
                  :title="j.name + ' · ' + statusText(j.status) + ' · ' + j.duration"
                >
                  <svg v-if="j.status === 'running'" class="pg-icon pg-spin" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2" opacity="0.35"/><path d="M14 8A6 6 0 0 0 8 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                  <svg v-else class="pg-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5l3.5 3.5L13 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  <span class="min-w-0 text-left">
                    <span class="block">{{ j.name }}</span>
                    <span class="pg-subtle text-[length:var(--gl-font-size-sm)]">{{ j.duration }}</span>
                  </span>
                </button>
              </div>
              <span v-if="si < pl.stages.length - 1" class="pg-stage-arrow" aria-hidden="true">→</span>
            </div>
          </div>
          <hr class="pg-divider" />
          <div class="flex items-center gap-4 flex-wrap text-[length:var(--gl-font-size-sm)] pg-subtle">
            <gl-badge variant="success">成功 {{ pl.counts.success }}</gl-badge>
            <gl-badge variant="danger">失败 {{ pl.counts.failed }}</gl-badge>
            <gl-badge variant="info">运行中 {{ pl.counts.running }}</gl-badge>
            <gl-badge variant="neutral">其他 {{ pl.counts.other }}</gl-badge>
            <span class="ml-auto">总耗时 {{ pl.duration }}</span>
          </div>
        </section>

        <gl-tabs :tabs="plTabs" :active="0" />

        <section class="pg-card overflow-hidden" aria-label="作业列表">
          <gl-table :items="pl.jobs" :fields="jobFields" />
        </section>
      </div>

      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { GlButton, GlBadge, GlAlert, GlTabs, GlDropdown, GlInput, GlTable } from '../components/index.js';

const MOON_ICON = '<path d=&quot;M13.2 9.8A5.5 5.5 0 0 1 6.2 2.8a5.5 5.5 0 1 0 7 7z&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;1.5&quot; stroke-linejoin=&quot;round&quot;/>';
const DARK_ICON = '<circle cx=&quot;8&quot; cy=&quot;8&quot; r=&quot;3&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;1.5&quot;/><path d=&quot;M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M12.6 3.4l-1.4 1.4M4.8 11.2l-1.4 1.4&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;1.4&quot; stroke-linecap=&quot;round&quot;/>';

const dark = ref(false);
function toggleDark() {
  dark.value = !dark.value;
}

const pl = ref({
  "id": 183,
  "status": "running",
  "branch": "feat/keyboard-shortcuts",
  "sha": "a1b2c3d4",
  "commitMsg": "feat: 注册全局快捷键处理器",
  "trigger": "王小明",
  "duration": "4 分 12 秒",
  "queuedAt": "2026-09-12 10:02",
  "stages": [
    {
      "name": "构建",
      "jobs": [
        {
          "name": "install",
          "status": "success",
          "duration": "1 分 30 秒"
        },
        {
          "name": "build",
          "status": "success",
          "duration": "2 分 05 秒"
        }
      ]
    },
    {
      "name": "测试",
      "jobs": [
        {
          "name": "unit",
          "status": "success",
          "duration": "3 分 12 秒"
        },
        {
          "name": "lint",
          "status": "failed",
          "duration": "0 分 48 秒"
        },
        {
          "name": "integration",
          "status": "running",
          "duration": "—"
        }
      ]
    },
    {
      "name": "发布",
      "jobs": [
        {
          "name": "package",
          "status": "created",
          "duration": "—"
        },
        {
          "name": "deploy-staging",
          "status": "manual",
          "duration": "—"
        }
      ]
    }
  ],
  "jobs": [
    {
      "name": "install",
      "stage": "构建",
      "status": "success",
      "duration": "1 分 30 秒",
      "coverage": "—"
    },
    {
      "name": "build",
      "stage": "构建",
      "status": "success",
      "duration": "2 分 05 秒",
      "coverage": "78.4%"
    },
    {
      "name": "unit",
      "stage": "测试",
      "status": "success",
      "duration": "3 分 12 秒",
      "coverage": "86.1%"
    },
    {
      "name": "lint",
      "stage": "测试",
      "status": "failed",
      "duration": "0 分 48 秒",
      "coverage": "—"
    },
    {
      "name": "integration",
      "stage": "测试",
      "status": "running",
      "duration": "进行中",
      "coverage": "—"
    },
    {
      "name": "package",
      "stage": "发布",
      "status": "created",
      "duration": "—",
      "coverage": "—"
    },
    {
      "name": "deploy-staging",
      "stage": "发布",
      "status": "manual",
      "duration": "—",
      "coverage": "—"
    }
  ],
  "counts": {
    "success": 3,
    "failed": 1,
    "running": 1,
    "other": 2
  }
});

const plTabs = ref([{ title: '概览' }, { title: '作业', count: pl.value.jobs.length }, { title: '图表' }, { title: '下游流水线' }]);

const jobFields = ref([
  { key: 'name', label: '作业', sortable: true },
  { key: 'stage', label: '阶段' },
  { key: 'status', label: '状态' },
  { key: 'duration', label: '时长' },
  { key: 'coverage', label: '覆盖率' },
]);

const statusTextMap = {
  success: '成功',
  failed: '失败',
  running: '运行中',
  created: '已创建',
  manual: '手动',
  skipped: '已跳过',
};
function statusText(s) {
  return statusTextMap[s] || s;
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

.pg-job { display: flex; align-items: center; gap: var(--gl-spacing-scale-2); padding: var(--gl-spacing-scale-3); border: 1px solid var(--gl-border-color-default); border-radius: var(--gl-border-radius-lg); background-color: var(--gl-background-color-overlap); min-width: var(--gl-spacing-scale-37); cursor: pointer; }
.pg-job:hover { box-shadow: var(--gl-shadow-sm); }
.pg-job[data-status='success'] { border-color: var(--gl-alert-success-border-color); }
.pg-job[data-status='success'] > svg { color: var(--gl-feedback-success-icon-color); }
.pg-job[data-status='failed'] { border-color: var(--gl-alert-danger-border-color); }
.pg-job[data-status='failed'] > svg { color: var(--gl-feedback-danger-icon-color); }
.pg-job[data-status='running'] > svg { color: var(--gl-feedback-info-icon-color); }
.pg-stage-arrow { color: var(--gl-text-color-subtle); font-size: var(--gl-font-size-500-fixed); }
.pg-divider { border: 0; border-top: 1px solid var(--gl-border-color-subtle); margin: var(--gl-spacing-scale-4) 0; }

</style>
