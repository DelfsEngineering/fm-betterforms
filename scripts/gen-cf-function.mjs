// Regenerates the DIRS map in infra/cloudfront-function.js from .vitepress/dist.
import fs from 'node:fs'; import path from 'node:path'
const dist = '.vitepress/dist', dirs = []
;(function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else if (e.name === 'index.html' && d !== dist) dirs.push('/' + path.relative(dist, d)) } })(dist)
const f = 'infra/cloudfront-function.js', s = fs.readFileSync(f, 'utf8')
fs.writeFileSync(f, s.replace(/var DIRS = \{.*\};/, 'var DIRS = {' + dirs.sort().map(d => JSON.stringify(d) + ':1').join(',') + '};'))
console.log('DIRS', dirs.length)
