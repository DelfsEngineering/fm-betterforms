import { defineConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'
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
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/klai-logo.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/logo-light.png' }],
    ['link', { rel: 'preconnect', href: 'https://rsms.me/' }],
    ['link', { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' }],
    ['meta', { name: 'theme-color', content: '#0369A1' }],
    ['meta', { property: 'og:site_name', content: 'Klai Studio Docs' }]
  ],
  description: 'Documentation for Klai Studio',
  lastUpdated: true,
  ignoreDeadLinks: [/^https?:\/\/localhost/, /\.gitbook\/assets\/env_\.development/],
  markdown: {
    html: true,
    // GitBook code-block languages without a Shiki grammar
    languageAlias: { markup: 'html', filemaker: 'sql', fm: 'sql', fmcalc: 'sql' },
    config: (md) => {
      md.use(tabsMarkdownPlugin)
      // GitBook pages contain literal {{ mustache }} text: keep Vue from interpolating it (components such as tabs still compile).
      const text = md.renderer.rules.text
      md.renderer.rules.text = (t, i, o, e, self) => {
        const out = text(t, i, o, e, self)
        return out.includes('{{') ? `<span v-pre>${out}</span>` : out
      }
      for (const name of ['code_block', 'code_inline', 'html_block', 'html_inline']) {
        const orig = md.renderer.rules[name]
        md.renderer.rules[name] = (t, i, o, e, self) => {
          const out = orig ? orig(t, i, o, e, self) : self.renderToken(t, i, o)
          if (!out.includes('{{')) return out
          return name === 'code_block' ? out.replace('<pre', '<pre v-pre') : out.replace(/\{\{/g, '&#123;&#123;')
        }
      }
    }
  },
  vite: { build: { chunkSizeWarningLimit: 2000 } },
  themeConfig: {
    logo: { src: '/klai-logo.svg', alt: 'Klai Studio' },
    siteTitle: 'Klai Studio Docs',
    nav: [
      { text: 'Join Slack', link: 'https://app.fmbetterforms.com/#/slack' },
      { text: 'Status', link: 'https://status.klai.studio' },
      { text: 'klai.studio', link: 'https://www.klai.studio/' }
    ],
    footer: { message: 'Klai Studio documentation', copyright: `© ${new Date().getFullYear()} Delfs Engineering` },
    docFooter: { prev: 'Previous', next: 'Next' },
    sidebar: sidebar(),
    search: { provider: 'local' },
    outline: [2, 3],
    editLink: { pattern: 'https://github.com/DelfsEngineering/fm-betterforms/edit/master/:path', text: 'Edit this page on GitHub' }
  }
})
