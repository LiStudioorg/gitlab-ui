/**
 * pages-lib/vue3.js
 * 渲染 Vue 3 单文件组件页面（dist/vue3/pages/*.vue），import ../components 下的组件。
 * 三区布局：顶部全局导航 + 左侧项目导航 + 主内容；暗色模式切换根节点 gl-dark。
 */
const D = require('./shared');

/* 侧栏静态结构（按 activeNav 标记激活项） */
function sidenavMarkup(activeNav) {
  return D.sidenav
    .map((item) => {
      if (item.children) {
        const kids = item.children
          .map(
            (c) =>
              `            <a class="pg-nav-link pg-nav-child${c.active === activeNav ? ' is-active' : ''}" href="${c.href}">${c.label}</a>`
          )
          .join('\n');
        return `        <div class="pg-nav-group">
          <span class="pg-nav-link pg-nav-parent"><svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true">${D.icons[item.icon]}</svg>${item.label}</span>
          <div class="pg-nav-children">
${kids}
          </div>
        </div>`;
      }
      const cnt = item.count != null ? `<span class="pg-nav-count">${item.count}</span>` : '';
      const act = item.active === activeNav ? ' is-active' : '';
      return `        <a class="pg-nav-link${act}" href="${item.href}"><svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true">${D.icons[item.icon]}</svg>${item.label}${cnt}</a>`;
    })
    .join('\n');
}

function layout({ activeNav, sideTitle, main, scriptBody, styleExtra }) {
  return `<!-- 由 scripts/gen-pages.js 生成；Pajamas-inspired (MIT)。 -->
<template>
  <div id="gl-root" class="pg-page" :class="{ 'gl-dark': dark }">
    <!-- 顶部全局导航 -->
    <header class="pg-topbar">
      <div class="pg-topbar-left">
        <span class="pg-topbar-brand">${D.meta.productName}</span>
        <label class="pg-search">
          <svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true">${D.icons.search}</svg>
          <input type="search" placeholder="搜索或输入命令" aria-label="搜索" />
        </label>
      </div>
      <div class="pg-topbar-right">
        <button type="button" class="pg-icon-btn" aria-label="切换暗色模式" title="切换暗色模式" @click="toggleDark">
          <svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true"><path :d="dark ? DARK_ICON : MOON_ICON" /></svg>
        </button>
        <button type="button" class="pg-icon-btn" aria-label="新建">
          <svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true">${D.icons.plus}</svg>
        </button>
        <span class="pg-avatar" title="${D.user.name}">${D.user.initials}</span>
      </div>
    </header>

    <div class="pg-shell">
      <!-- 左侧项目导航 -->
      <aside class="pg-sidenav" aria-label="项目导航">
        <div class="pg-sidenav-project">
          <span class="pg-sidenav-avatar"><svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true">${D.icons.folder}</svg></span>
          <span class="pg-sidenav-meta">
            <span class="pg-sidenav-name">${sideTitle}</span>
            <span class="pg-sidenav-ns">${D.meta.productName}</span>
          </span>
        </div>
        <nav class="pg-sidenav-nav">
${sidenavMarkup(activeNav)}
        </nav>
      </aside>

      <!-- 主内容 -->
      <main class="pg-main">
${main}
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { GlButton, GlBadge, GlAlert, GlTabs, GlDropdown, GlInput, GlTable } from '../components/index.js';

const MOON_ICON = '${D.icons.moon.replace(/"/g, '&quot;')}';
const DARK_ICON = '${D.icons.sun.replace(/"/g, '&quot;')}';

const dark = ref(false);
function toggleDark() {
  dark.value = !dark.value;
}

${scriptBody}
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
${styleExtra || ''}
</style>
`;
}

/* ===================== MergeRequest.vue ===================== */

function mergeRequest() {
  const m = D.mergeRequest;
  const main = `      <div class="flex items-start justify-between gap-4 flex-wrap">
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
`;

  const scriptBody = `const mr = ref(${JSON.stringify(m, null, 2)});

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
`;

  const styleExtra = `
.pg-avatar-sm { width: var(--gl-spacing-scale-7); height: var(--gl-spacing-scale-7); }
`;

  const out = layout({
    activeNav: 'merge-request',
    sideTitle: D.meta.projects.web,
    main,
    scriptBody,
    styleExtra,
  });
  // 需要 computed
  return out.replace("import { ref } from 'vue';", "import { ref, computed } from 'vue';");
}

/* ===================== Pipeline.vue ===================== */

function pipeline() {
  const p = D.pipeline;
  const main = `      <div class="flex items-start justify-between gap-4 flex-wrap">
        <div class="min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <h1 class="pg-h1">流水线 #{{ pl.id }}</h1>
            <gl-badge :variant="pl.status === 'running' ? 'info' : 'success'">
              <svg v-if="pl.status === 'running'" class="pg-icon pg-spin" viewBox="0 0 16 16" aria-hidden="true">${D.icons.spinner}</svg>
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
                  <svg v-if="j.status === 'running'" class="pg-icon pg-spin" viewBox="0 0 16 16" aria-hidden="true">${D.icons.spinner}</svg>
                  <svg v-else class="pg-icon" viewBox="0 0 16 16" aria-hidden="true">${D.icons.check}</svg>
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
`;

  const scriptBody = `const pl = ref(${JSON.stringify(p, null, 2)});

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
`;

  const styleExtra = `
.pg-job { display: flex; align-items: center; gap: var(--gl-spacing-scale-2); padding: var(--gl-spacing-scale-3); border: 1px solid var(--gl-border-color-default); border-radius: var(--gl-border-radius-lg); background-color: var(--gl-background-color-overlap); min-width: var(--gl-spacing-scale-37); cursor: pointer; }
.pg-job:hover { box-shadow: var(--gl-shadow-sm); }
.pg-job[data-status='success'] { border-color: var(--gl-alert-success-border-color); }
.pg-job[data-status='success'] > svg { color: var(--gl-feedback-success-icon-color); }
.pg-job[data-status='failed'] { border-color: var(--gl-alert-danger-border-color); }
.pg-job[data-status='failed'] > svg { color: var(--gl-feedback-danger-icon-color); }
.pg-job[data-status='running'] > svg { color: var(--gl-feedback-info-icon-color); }
.pg-stage-arrow { color: var(--gl-text-color-subtle); font-size: var(--gl-font-size-500-fixed); }
.pg-divider { border: 0; border-top: 1px solid var(--gl-border-color-subtle); margin: var(--gl-spacing-scale-4) 0; }
`;

  return layout({
    activeNav: 'pipeline',
    sideTitle: D.meta.projects.web,
    main,
    scriptBody,
    styleExtra,
  });
}

/* ===================== ProjectHome.vue ===================== */

function projectHome() {
  const pr = D.projectHome;
  const main = `      <div class="flex items-start justify-between gap-4 flex-wrap">
        <div class="min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <h1 class="pg-h1">{{ pr.namespace }} / {{ pr.name }}</h1>
            <gl-badge :variant="pr.visibility === 'public' ? 'success' : 'info'">{{ pr.visibility === 'public' ? '公开' : '内部' }}</gl-badge>
          </div>
          <p class="pg-subtle mt-2 mb-0">{{ pr.description }}</p>
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          <gl-button category="secondary">星标 {{ pr.stars }}</gl-button>
          <gl-button category="secondary">克隆</gl-button>
          <gl-dropdown text="更多操作" :items="moreItems" />
        </div>
      </div>

      <gl-tabs class="mt-5" :tabs="homeTabs" :active="0" />

      <div class="mt-5 flex flex-col gap-5">
        <section class="pg-card p-5" aria-label="README">
          <h2 class="text-[length:var(--gl-font-size-500-fixed)] mb-3">README</h2>
          <h3 class="text-[length:var(--gl-font-size-400-fixed)] mb-2">{{ pr.readme.heading }}</h3>
          <p v-for="(t, i) in pr.readme.paragraphs" :key="i" class="mt-0">{{ t }}</p>
          <hr class="pg-divider" />
          <div class="flex items-center gap-2 flex-wrap pg-subtle text-[length:var(--gl-font-size-sm)]">
            <gl-badge :variant="pr.latestPipeline.status === 'running' ? 'info' : 'success'">
              流水线 #{{ pr.latestPipeline.id }} · {{ pr.latestPipeline.status === 'running' ? '运行中' : '已通过' }}
            </gl-badge>
            <span>最近推送于 {{ pr.recentCommits[0].time }}</span>
          </div>
        </section>

        <section class="pg-card p-5" aria-label="最近提交">
          <h2 class="text-[length:var(--gl-font-size-500-fixed)] mb-3">最近提交</h2>
          <ul class="flex flex-col gap-3 m-0 p-0 list-none">
            <li v-for="c in pr.recentCommits" :key="c.sha" class="flex items-center gap-3 flex-wrap">
              <span class="pg-sha">{{ c.sha.slice(0, 8) }}</span>
              <span class="min-w-0 truncate">{{ c.msg }}</span>
              <span class="pg-subtle text-[length:var(--gl-font-size-sm)] ml-auto">{{ c.author }} · {{ c.time }}</span>
            </li>
          </ul>
        </section>
      </div>
`;

  const scriptBody = `const pr = ref(${JSON.stringify(pr, null, 2)});

const homeTabs = ref([
  { title: '概览' },
  { title: '议题', count: 12 },
  { title: '合并请求', count: 3 },
  { title: 'CI/CD' },
  { title: '部署' },
  { title: '分析' },
]);

const moreItems = ref([{ label: '编辑详情', value: 'edit' }, { label: '归档项目', value: 'archive' }]);
`;

  const styleExtra = `
.pg-sha { font-family: ui-monospace, monospace; font-size: var(--gl-font-size-sm); background-color: var(--gl-color-alpha-dark-4); border-radius: var(--gl-border-radius-sm); padding: 0 var(--gl-spacing-scale-1); }
.pg-divider { border: 0; border-top: 1px solid var(--gl-border-color-subtle); margin: var(--gl-spacing-scale-4) 0; }
`;

  return layout({
    activeNav: 'project-home',
    sideTitle: D.meta.projects.home,
    main,
    scriptBody,
    styleExtra,
  });
}

/* ===================== Issues.vue ===================== */

function issues() {
  const it = D.issues;
  const main = `      <div class="flex items-start justify-between gap-4 flex-wrap">
        <div class="flex items-center gap-3 flex-wrap">
          <h1 class="pg-h1">议题</h1>
          <gl-badge variant="success">进行中 {{ it.openCount }}</gl-badge>
          <gl-badge variant="neutral">已关闭 {{ it.closedCount }}</gl-badge>
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          <gl-button category="secondary" icon="list" aria-label="列表视图">列表</gl-button>
          <gl-button category="secondary" icon="board" aria-label="看板视图">看板</gl-button>
          <gl-button variant="confirm">新建议题</gl-button>
        </div>
      </div>

      <div class="mt-5 flex items-center gap-3 flex-wrap" role="search" aria-label="筛选工具条">
        <gl-input type="search" placeholder="按标题或编号搜索" width="md" />
        <gl-dropdown text="状态: 进行中" :items="stateItems" show-clear-all />
        <gl-dropdown text="排序: 最近更新" :items="sortItems" />
      </div>

      <div class="mt-5 flex flex-col gap-5">
        <section class="pg-card" aria-label="议题列表">
          <ul class="flex flex-col m-0 p-0 list-none">
            <li v-for="i in it.list" :key="i.id" class="pg-issue-row">
              <svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true">${D.icons.issue}</svg>
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="font-bold text-[color:var(--gl-text-color-strong)]">{{ i.title }}</span>
                  <gl-badge :variant="i.state === 'opened' ? 'success' : 'neutral'">{{ i.state === 'opened' ? '进行中' : '已关闭' }}</gl-badge>
                  <span
                    v-for="l in i.labels"
                    :key="l.text"
                    class="pg-chip"
                    :style="{ backgroundColor: chipBg(l.color), color: chipFg(l.color) }"
                  >{{ l.text }}</span>
                </div>
                <p class="pg-subtle text-[length:var(--gl-font-size-sm)] mt-1 mb-0">#{{ i.id }} · 由 {{ i.author }} 创建 · 更新于 {{ i.updated }}</p>
              </div>
              <div class="flex items-center gap-4 pg-subtle text-[length:var(--gl-font-size-sm)]">
                <span title="评论数">{{ i.comments }}</span>
                <span title="关注数">{{ i.watchers }}</span>
              </div>
            </li>
          </ul>
        </section>

        <section aria-label="看板视图">
          <h2 class="text-[length:var(--gl-font-size-500-fixed)] mb-3">看板</h2>
          <div class="flex gap-4 overflow-x-auto pb-2">
            <div v-for="col in it.boardColumns" :key="col.label" class="pg-board-col">
              <div class="flex items-center gap-2">
                <span class="pg-board-dot" :style="{ backgroundColor: chipBg(col.color) }"></span>
                <span class="font-bold text-[color:var(--gl-text-color-strong)]">{{ col.label }}</span>
                <gl-badge variant="neutral">{{ col.cards.length }}</gl-badge>
              </div>
              <div v-for="c in col.cards" :key="c.id" class="pg-board-card" draggable="true">
                <p class="m-0 font-bold text-[length:var(--gl-font-size-base)] text-[color:var(--gl-text-color-strong)]">{{ c.title }}</p>
                <div class="flex items-center gap-2 mt-2 flex-wrap">
                  <span
                    v-for="l in c.labels"
                    :key="l.text"
                    class="pg-chip"
                    :style="{ backgroundColor: chipBg(l.color), color: chipFg(l.color) }"
                  >{{ l.text }}</span>
                  <span class="pg-subtle text-[length:var(--gl-font-size-sm)]">#{{ c.id }}</span>
                  <span class="ml-auto pg-avatar pg-avatar-sm">{{ c.assignee.slice(0, 1) }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
`;

  const scriptBody = `const it = ref(${JSON.stringify(it, null, 2)});

const stateItems = ref([
  { label: '进行中', value: 'opened', checked: true },
  { label: '已关闭', value: 'closed' },
]);
const sortItems = ref([
  { label: '最近更新', value: 'updated' },
  { label: '创建时间', value: 'created' },
  { label: '优先级', value: 'priority' },
  { label: '人气', value: 'popularity' },
]);

const chipBgMap = {
  neutral: 'var(--gl-badge-neutral-background-color-default)',
  info: 'var(--gl-badge-info-background-color-default)',
  success: 'var(--gl-badge-success-background-color-default)',
  warning: 'var(--gl-badge-warning-background-color-default)',
  danger: 'var(--gl-badge-danger-background-color-default)',
  tier: 'var(--gl-badge-tier-background-color-default)',
};
const chipFgMap = {
  neutral: 'var(--gl-badge-neutral-text-color-default)',
  info: 'var(--gl-badge-info-text-color-default)',
  success: 'var(--gl-badge-success-text-color-default)',
  warning: 'var(--gl-badge-warning-text-color-default)',
  danger: 'var(--gl-badge-danger-text-color-default)',
  tier: 'var(--gl-badge-tier-text-color-default)',
};
function chipBg(c) {
  return chipBgMap[c] || chipBgMap.neutral;
}
function chipFg(c) {
  return chipFgMap[c] || chipFgMap.neutral;
}
`;

  const styleExtra = `
.pg-issue-row { display: flex; align-items: flex-start; gap: var(--gl-spacing-scale-3); padding: var(--gl-spacing-scale-4) var(--gl-spacing-scale-5); box-shadow: inset 0 -1px 0 var(--gl-border-color-subtle); }
.pg-issue-row:hover { background-color: var(--gl-table-row-background-color-hover); }
.pg-issue-row > svg { margin-top: var(--gl-spacing-scale-1); color: var(--gl-text-color-subtle); }
.pg-board-col { display: flex; flex-direction: column; gap: var(--gl-spacing-scale-3); width: var(--gl-spacing-scale-62); flex-shrink: 0; padding: var(--gl-spacing-scale-3); border: 1px dashed var(--gl-border-color-default); border-radius: var(--gl-border-radius-lg); background-color: var(--gl-background-color-subtle); }
.pg-board-dot { width: var(--gl-line-height-16); height: var(--gl-line-height-16); border-radius: var(--gl-border-radius-full); flex-shrink: 0; }
.pg-board-card { background-color: var(--gl-background-color-overlap); border: 1px solid var(--gl-border-color-default); border-radius: var(--gl-border-radius-lg); padding: var(--gl-spacing-scale-3); box-shadow: var(--gl-shadow-sm); cursor: grab; }
.pg-avatar-sm { width: var(--gl-spacing-scale-7); height: var(--gl-spacing-scale-7); }
`;

  return layout({
    activeNav: 'issues',
    sideTitle: D.meta.projects.home,
    main,
    scriptBody,
    styleExtra,
  });
}

module.exports = { mergeRequest, pipeline, projectHome, issues };
