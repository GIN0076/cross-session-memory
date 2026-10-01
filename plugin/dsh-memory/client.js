/**
 * Cross-session memory · read-only settings card (browser half, phase 7.3):
 * Settings → Cross-session memory.
 *
 * Read-only display: index budget / entry count / write mode / confidence mix /
 *          draft & conflict counts / 7-day recall hit rate / recent entries /
 *          entry search.
 *
 * Design red lines (plan phase 7.3):
 *  - READ-ONLY: no write entry point (writes stay on the /memory command or
 *    mem_save approval);
 *  - fail-degrade: RPC down → show an error pointing back to /memory, the chat
 *    command stays fully functional;
 *  - --dsw-alias-* theme tokens only, no iframe, never touch another plugin's DOM;
 *  - zero Harness client package import (a throwing host import blanks the whole
 *    slot entry — practices.md).
 *
 * Data channel: same-origin POST /dsh-memory-rpc (registered by host half index.js,
 * triple-fenced).
 */
window.__ModuleLoader__.load({
  id: '@local/dsh-memory',
  factory(require) {
    const React = require('react')
    const h = React.createElement
    const { useState, useEffect, useCallback } = React

    const NS = 'settings.dshMemory'
    const RPC = '/dsh-memory-rpc'
    /** Bound during apply; components fall back to it if props are absent. */
    let translate = (key) => key

    const zh = {
      nav: '跨会话记忆',
      title: '跨会话记忆 · 只读概览',
      subtitle: '这里只读展示记忆库状态；写入请用聊天框 /memory 命令或 mem_save（经审批）。',
      loading: '加载中…',
      retry: '重试',
      loadFailed: '读取失败',
      loadFailedHint: '设置卡是增强功能；/memory 命令始终全功能可用。错误：',
      writeMode: '写入模式',
      entries: '条目数',
      index: '索引',
      indexBudget: '索引 {0} 字节 / 上限 {1}（{2} 行 / 上限 {3} 行）',
      health: '体检',
      healthGreen: '通过（零 findings）',
      healthFindings: '{0} 处问题',
      healthNotes: '（{0} 条信息级提示）',
      confidence: '可信度分布',
      drafts: '待审草稿',
      draftsMixed: '{0}（其中 {1} 是已入库旧稿）',
      conflicts: '未裁决冲突',
      recall: '近 7 天召回',
      recallHit: '命中率 {0}%（{1} 次搜索，真命中 {2} / 落空 {3}）',
      recallWeak: '（另有 {0} 次只拿到弱命中——泛词兜底，不算命中）',
      recallNone: '近 7 天无搜索',
      stores: '写入 {0} 次',
      recent: '最近条目',
      noRecent: '记忆库为空',
      searchLabel: '搜索条目',
      searchPlaceholder: '关键词 / 半句 / 英文报错串',
      searchBtn: '搜索',
      searching: '搜索中…',
      noHit: '无命中。换 2~3 组词再搜（原词 / 同义 / 英文）。',
      searchFailed: '搜索失败：',
      why: '为何召回',
      cmdHint: '维护命令：/memory recall|save|doctor|review|map|conflicts|resolve|explain|verify|feedback|stats|draft|drafts|approve|reject|prune-drafts|write-mode',
      empty: '（空）',
      unverified: '未标注',
      weakHit: '弱命中',
      healthSep: '：',
      whySep: '：',
      querySep: '：',
    }

    const en = {
      nav: 'Cross-session Memory',
      title: 'Cross-session memory · read-only overview',
      subtitle: 'Read-only status here; write with the /memory command or mem_save (approved) in chat.',
      loading: 'Loading…',
      retry: 'Retry',
      loadFailed: 'Failed to load',
      loadFailedHint: 'The settings card is an enhancement; /memory stays fully functional. Error:',
      writeMode: 'Write mode',
      entries: 'Entries',
      index: 'Index',
      indexBudget: 'Index {0} bytes / cap {1} ({2} lines / cap {3} lines)',
      health: 'Health',
      healthGreen: 'Healthy (zero findings)',
      healthFindings: '{0} findings',
      healthNotes: ' ({0} informational notes)',
      confidence: 'Confidence mix',
      drafts: 'Pending drafts',
      draftsMixed: '{0} ({1} already in the book)',
      conflicts: 'Unresolved conflicts',
      recall: 'Recall, last 7 days',
      recallHit: 'Hit rate {0}% ({1} searches, {2} real hits / {3} misses)',
      recallWeak: ' (+{0} searches returned only weak hits — not counted as hits)',
      recallNone: 'No searches in the last 7 days',
      stores: '{0} writes',
      recent: 'Recent entries',
      noRecent: 'The book is empty',
      searchLabel: 'Search entries',
      searchPlaceholder: 'keyword / phrase / English error string',
      searchBtn: 'Search',
      searching: 'Searching…',
      noHit: 'No hits. Try 2–3 different words (original / synonym / English).',
      searchFailed: 'Search failed: ',
      why: 'Why recalled',
      cmdHint: 'Commands: /memory recall|save|doctor|review|map|conflicts|resolve|explain|verify|feedback|stats|draft|drafts|approve|reject|prune-drafts|write-mode',
      empty: '(empty)',
      unverified: 'unmarked',
      weakHit: 'weak hit',
      healthSep: ': ',
      whySep: ': ',
      querySep: ': ',
    }

    // Fallback chain: bound locale dict → en (release default) → zh → the key itself.
    const t = (key, ...args) => {
      let s = (translate && translate(key)) || en[key] || zh[key] || key
      args.forEach((v, i) => { s = s.split(`{${i}}`).join(String(v)) })
      return s
    }

    // ── theme tokens (no hardcoded colors) ──
    const token = {
      title: { color: 'var(--dsw-alias-label-primary)', fontSize: 16, fontWeight: 650, margin: '0 0 4px' },
      text: { color: 'var(--dsw-alias-label-primary)', fontSize: 13, lineHeight: 1.55 },
      muted: { color: 'var(--dsw-alias-label-secondary)', fontSize: 12.5, lineHeight: 1.55 },
      card: {
        background: 'var(--dsw-alias-bg-layer-1)',
        border: '1px solid var(--dsw-alias-border-l1)',
        borderRadius: 10,
        padding: '10px 12px',
      },
      grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 8 },
      statLabel: { color: 'var(--dsw-alias-label-secondary)', fontSize: 11.5, letterSpacing: 0.2 },
      statValue: { color: 'var(--dsw-alias-label-primary)', fontSize: 18, fontWeight: 650, marginTop: 2 },
      input: {
        background: 'var(--dsw-alias-bg-layer-2)',
        border: '1px solid var(--dsw-alias-border-l1)',
        borderRadius: 8,
        color: 'var(--dsw-alias-label-primary)',
        padding: '7px 10px',
        fontSize: 13,
        minWidth: 220,
      },
      btn: {
        background: 'var(--dsw-alias-brand-primary)',
        border: 'none',
        borderRadius: 8,
        color: 'var(--dsw-alias-bg-base)',
        padding: '7px 14px',
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
      },
      chip: {
        display: 'inline-block',
        fontSize: 11,
        color: 'var(--dsw-alias-label-secondary)',
        border: '1px solid var(--dsw-alias-border-l1)',
        borderRadius: 999,
        padding: '1px 8px',
        marginRight: 6,
      },
      divider: { border: 'none', borderTop: '1px solid var(--dsw-alias-border-l1)', margin: '14px 0' },
    }

    const confColor = (c) => {
      if (c === 'verified') return 'var(--dsw-alias-state-success-primary)'
      if (c === 'stale' || c === 'needs-review') return 'var(--dsw-alias-state-warn-primary)'
      if (c === 'disputed') return 'var(--dsw-alias-state-error-primary)'
      return 'var(--dsw-alias-label-secondary)'
    }

    /** Read-only RPC: action + args → host returns flat JSON. Throws on failure (card degrades). */
    async function rpc(action, args) {
      const res = await fetch(RPC, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...(args || {}) }),
      })
      if (!res.ok) throw new Error('HTTP ' + res.status)
      const body = await res.json()
      if (!body || body.ok !== true) throw new Error((body && body.error) || 'request failed')
      return body
    }

    function Stat({ label, value, color }) {
      return h('div', { style: token.card },
        h('div', { style: token.statLabel }, label),
        h('div', { style: { ...token.statValue, ...(color ? { color } : {}) } }, value))
    }

    function MemoryPage() {
      const [data, setData] = useState(null)
      const [error, setError] = useState(null)
      const [loading, setLoading] = useState(true)
      const [tick, setTick] = useState(0)

      const [query, setQuery] = useState('')
      const [hits, setHits] = useState(null)
      const [searching, setSearching] = useState(false)
      const [searchErr, setSearchErr] = useState(null)

      const reload = useCallback(() => { setTick((n) => n + 1) }, [])

      useEffect(() => {
        let alive = true
        setLoading(true)
        setError(null)
        rpc('status')
          .then((d) => { if (alive) { setData(d); setLoading(false) } })
          .catch((e) => { if (alive) { setError(String(e?.message ?? e)); setLoading(false) } })
        return () => { alive = false }
      }, [tick])

      const runSearch = async (e) => {
        if (e && e.preventDefault) e.preventDefault()
        const q = query.trim()
        if (!q) return
        setSearching(true)
        setSearchErr(null)
        try {
          const d = await rpc('search', { query: q })
          setHits(d)
        } catch (err) {
          setSearchErr(String(err?.message ?? err))
          setHits(null)
        } finally {
          setSearching(false)
        }
      }

      if (loading) {
        return h('div', { style: { padding: '4px 2px' } },
          h('h2', { style: token.title }, t('title')),
          h('div', { style: token.muted }, t('loading')))
      }

      if (error !== null) {
        return h('div', { style: { padding: '4px 2px', maxWidth: 860 } },
          h('h2', { style: token.title }, t('title')),
          h('div', { style: { ...token.card, borderColor: 'var(--dsw-alias-state-error-primary)' } },
            h('div', { style: { ...token.text, color: 'var(--dsw-alias-state-error-primary)', fontWeight: 600 } }, t('loadFailed')),
            h('div', { style: token.muted }, t('loadFailedHint') + ' ' + error),
            h('div', { style: { ...token.muted, marginTop: 6 } }, '/memory doctor'),
            h('button', { type: 'button', onClick: reload, style: { ...token.btn, marginTop: 8 } }, t('retry'))))
      }

      const s = data.stats || {}
      const health = data.findings > 0
        ? t('healthFindings', data.findings) + (data.notes ? t('healthNotes', data.notes) : '')
        : t('healthGreen')

      return h('div', { style: { display: 'flex', flexDirection: 'column', gap: 12, padding: '4px 2px 24px', maxWidth: 860 } },
        h('div', null,
          h('h2', { style: token.title }, t('title')),
          h('div', { style: token.muted }, t('subtitle'))),

        // summary grid
        h('div', { style: token.grid },
          h(Stat, { label: t('writeMode'), value: data.writeMode, color: data.writeMode === 'approval' ? undefined : 'var(--dsw-alias-state-warn-primary)' }),
          h(Stat, { label: t('entries'), value: data.entryCount }),
          h(Stat, { label: t('drafts'), value: data.draftObsolete > 0 ? t('draftsMixed', data.draftCount, data.draftObsolete) : data.draftCount, color: data.draftObsolete > 0 ? 'var(--dsw-alias-state-error-primary)' : (data.draftCount > 0 ? 'var(--dsw-alias-state-warn-primary)' : undefined) }),
          h(Stat, { label: t('conflicts'), value: data.conflictCount, color: data.conflictCount > 0 ? 'var(--dsw-alias-state-error-primary)' : undefined })),

        // index budget
        h('div', { style: token.card },
          h('div', { style: token.statLabel }, t('index')),
          h('div', { style: token.text },
            t('indexBudget', data.indexBytes, data.indexBudget, data.indexLines, data.indexLimitLines)),
          h('div', { style: { ...token.muted, marginTop: 4 } },
            t('health') + t('healthSep'), h('span', {
              style: { color: data.findings > 0 ? 'var(--dsw-alias-state-error-primary)' : 'var(--dsw-alias-state-success-primary)', fontWeight: 600 },
            }, health))),

        // confidence + recall
        h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 } },
          h('div', { style: token.card },
            h('div', { style: token.statLabel }, t('confidence')),
            h('div', { style: { marginTop: 6 } },
              Object.entries(data.confidence || {}).map(([k, v]) =>
                h('span', { key: k, style: { ...token.chip, color: confColor(k), borderColor: confColor(k) } }, `${k}: ${v}`)))),
          h('div', { style: token.card },
            h('div', { style: token.statLabel }, t('recall')),
            h('div', { style: { ...token.text, marginTop: 4 } },
              s.hitRate === null || s.hitRate === undefined
                ? t('recallNone')
                : t('recallHit', s.hitRate, s.searches, s.hits, s.misses)),
            s.weak > 0 ? h('div', { style: token.muted }, t('recallWeak', s.weak)) : null,
            h('div', { style: token.muted }, t('stores', s.stores ?? 0)))),

        // search (read-only)
        h('form', { onSubmit: runSearch, style: { display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' } },
          h('label', { style: token.muted, htmlFor: 'mem-q' }, t('searchLabel')),
          h('input', {
            id: 'mem-q',
            value: query,
            onChange: (e) => setQuery(e.target.value),
            placeholder: t('searchPlaceholder'),
            style: token.input,
          }),
          h('button', { type: 'submit', disabled: searching, style: token.btn },
            searching ? t('searching') : t('searchBtn'))),

        searchErr !== null
          ? h('div', { style: { ...token.muted, color: 'var(--dsw-alias-state-error-primary)' } }, t('searchFailed') + searchErr)
          : null,

        hits !== null
          ? h('div', { style: token.card },
            h('div', { style: token.statLabel }, `${t('searchLabel')}${t('querySep')}${hits.query}`),
            (hits.hits || []).length === 0
              ? h('div', { style: token.muted }, t('noHit'))
              : h('ol', { style: { margin: '6px 0 0', paddingLeft: 18 } },
                hits.hits.map((x, i) =>
                  h('li', { key: i, style: { marginBottom: 8 } },
                    h('div', { style: token.text },
                      h('b', null, x.name || x.file),
                      ' ',
                      h('span', { style: { ...token.chip, color: confColor(x.confidence), borderColor: confColor(x.confidence) } },
                        x.state || x.confidence || t('unverified')),
                      x.weak
                        ? h('span', { style: { ...token.chip, color: 'var(--dsw-alias-label-secondary)', borderColor: 'var(--dsw-alias-border-l1)' } }, t('weakHit'))
                        : null,
                      x.description ? h('span', { style: token.muted }, ' — ' + x.description) : null),
                    x.snippet ? h('div', { style: token.muted }, t('why') + t('whySep') + (x.why || x.snippet)) : null))))
          : null,

        h('hr', { style: token.divider }),

        // recent entries
        h('div', null,
          h('div', { style: token.statLabel }, t('recent')),
          (data.recent || []).length === 0
            ? h('div', { style: token.muted }, t('noRecent'))
            : h('ul', { style: { margin: '6px 0 0', paddingLeft: 18 } },
              data.recent.map((e, i) =>
                h('li', { key: i, style: { marginBottom: 5 } },
                  h('span', { style: token.text },
                    h('b', null, e.name),
                    ' ',
                    h('span', { style: { ...token.chip, color: confColor(e.confidence), borderColor: confColor(e.confidence) } },
                      e.confidence || t('unverified')),
                    e.description ? h('span', { style: token.muted }, ' — ' + e.description) : null))))),

        h('div', { style: token.muted }, t('cmdHint')),
      )
    }

    // ── plugin lifecycle ──
    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        translate = ctx.locale.bind(NS)
        ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'dsh-memory: dictionaries')
        ctx.slots.inject('settings.section', () => ctx.slots.register({
          name: 'settings.section',
          id: 'memory',
          order: 60,
          label: () => translate('nav'),
          locale: NS,
        }, MemoryPage))
      },
    }
  },
})
