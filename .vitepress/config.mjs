import { defineConfig } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const EXCLUDE = ['**/node_modules/**', 'SUMMARY.md', 'docs-audit/**', 'notion_status_update.md', 'docs_edit_guide.md']

// GitBook README.md -> VitePress index.md (keeps /dir/ URLs)
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name === 'node_modules' || e.name === 'docs-audit') continue
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (e.name === 'README.md') out.push(path.relative(root, p))
  }
  return out
}
const rewrites = Object.fromEntries(walk(root).map(f => [f, f.replace(/README\.md$/, 'index.md')]))

const toLink = f => '/' + f.replace(/(^|\/)README\.md$/, '$1').replace(/\.md$/, '')

// SUMMARY.md -> sidebar
function sidebar() {
  const lines = fs.readFileSync(path.join(root, 'SUMMARY.md'), 'utf8').split('\n')
  const groups = []; let cur = { text: 'Overview', items: [] }; groups.push(cur)
  const stack = []
  for (const l of lines) {
    const h = l.match(/^##\s+(.*)/)
    if (h) { cur = { text: h[1].trim(), collapsed: false, items: [] }; groups.push(cur); stack.length = 0; continue }
    const m = l.match(/^(\s*)[*-]\s+\[(.*?)\]\((.*?)\)/)
    if (!m) continue
    const depth = Math.floor(m[1].length / 2)
    const item = { text: m[2].replace(/\\/g, ''), link: toLink(decodeURI(m[3])) }
    stack.length = depth
    const parent = depth ? stack[depth - 1] : null
    if (parent) { parent.items ??= []; parent.collapsed = true; parent.items.push(item) } else cur.items.push(item)
    stack[depth] = item
  }
  return groups.filter(g => g.items.length)
}

export default defineConfig({
  srcDir: '.',
  srcExclude: EXCLUDE,
  rewrites,
  cleanUrls: true,
  lang: 'en-US',
  title: 'Klai Studio Docs',
  description: 'Documentation for Klai Studio',
  lastUpdated: true,
  ignoreDeadLinks: [/^https?:\/\/localhost/, /\.gitbook\/assets\/env_\.development/],
  markdown: {
    html: true,
    // GitBook pages contain literal {{ mustache }} text; render every page with v-pre so Vue doesn't interpolate it.
    config: (md) => {
      md.core.ruler.push('vpre_wrap', (state) => {
        const open = new state.Token('html_block', '', 0); open.content = '<div v-pre>\n'
        const close = new state.Token('html_block', '', 0); close.content = '</div>\n'
        state.tokens.unshift(open); state.tokens.push(close)
      })
    }
  },
  vite: { build: { chunkSizeWarningLimit: 2000 } },
  themeConfig: {
    nav: [{ text: 'Klai Studio', link: 'https://klai.studio' }, { text: 'Status', link: 'https://status.klai.studio' }],
    sidebar: sidebar(),
    search: { provider: 'local' },
    outline: [2, 3],
    editLink: { pattern: 'https://github.com/DelfsEngineering/fm-betterforms/edit/master/:path', text: 'Edit this page on GitHub' }
  }
})
