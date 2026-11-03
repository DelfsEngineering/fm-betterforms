// Copy every non-markdown repo asset into dist at its original path so old GitBook asset URLs keep working.
import fs from 'node:fs'; import path from 'node:path'
const root = process.cwd(), dist = path.join(root, '.vitepress/dist')
const skip = new Set(['node_modules', '.git', '.vitepress', '.github', 'scripts', 'docs-audit'])
let n = 0
;(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (skip.has(e.name)) continue
    const p = path.join(d, e.name), rel = path.relative(root, p)
    if (e.isDirectory()) walk(p)
    else if (/\.(png|jpe?g|gif|svg|webp|pdf|mp4|zip|json|txt|fmp12|development)$/i.test(e.name) && !['package.json','package-lock.json','book.json','all_links.txt'].includes(rel)) {
      const t = path.join(dist, rel); fs.mkdirSync(path.dirname(t), { recursive: true }); fs.copyFileSync(p, t); n++
    }
  }
})(root)
console.log('postbuild: copied', n, 'assets')
