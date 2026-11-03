#!/usr/bin/env python3
"""One-time converter: GitBook liquid tags -> VitePress markdown."""
import re, sys, pathlib, html, yaml
root = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else '.')
HINT = {'info':'info','success':'tip','warning':'warning','danger':'danger','':'info'}
def attr(s, k):
    m = re.search(k + r'="([^"]*)"', s); return m.group(1) if m else ''
def conv(t):
    t = re.sub(r'\{%\s*hint(?:\s+style="(\w*)")?\s*%\}', lambda m: '\n::: ' + HINT.get(m.group(1) or '', 'info') + '\n', t)
    t = re.sub(r'\{%\s*endhint\s*%\}', '\n:::\n', t)
    # content-ref / page-ref -> link
    t = re.sub(r'\{%\s*content-ref\s+url="([^"]*)"\s*%\}(.*?)\{%\s*endcontent-ref\s*%\}', lambda m: m.group(2).strip() or f'[{m.group(1)}]({m.group(1)})', t, flags=re.S)
    t = re.sub(r'\{%\s*page-ref\s+page="([^"]*)"\s*%\}', lambda m: f'[{m.group(1).rstrip("/").split("/")[-1] or m.group(1)}]({m.group(1)})', t)
    t = re.sub(r'\{%\s*file\s+src="([^"]*)"\s*%\}', lambda m: f'[📎 {m.group(1).split("/")[-1]}]({m.group(1)})', t)
    def emb(m):
        u = m.group(1)
        y = re.search(r'youtube\.com/watch\?v=([\w-]+)', u)
        if y: return f'\n<iframe width="560" height="315" src="https://www.youtube.com/embed/{y.group(1)}" frameborder="0" allowfullscreen></iframe>\n'
        return f'\n[🔗 {u}]({u})\n'
    t = re.sub(r'\{%\s*embed\s+url="([^"]*)"\s*%\}(?:\s*\{%\s*endembed\s*%\})?', emb, t)
    # tabs -> code-group-like containers (::: details per tab)
    t = re.sub(r'\{%\s*tabs\s*%\}', '', t); t = re.sub(r'\{%\s*endtabs\s*%\}', '', t)
    t = re.sub(r'\{%\s*tab\s+title="([^"]*)"\s*%\}', lambda m: f'\n::: details {m.group(1).strip() or "Tab"}\n', t)
    t = re.sub(r'\{%\s*endtab\s*%\}', '\n:::\n', t)
    # swagger
    def sw(m):
        a = m.group(1); body = m.group(2)
        out = [f'\n### `{attr(a,"method").upper()} {attr(a,"path")}`\n', f'{attr(a,"summary")}\n', f'**Base URL:** `{attr(a,"baseUrl")}`\n']
        d = re.search(r'\{%\s*swagger-description\s*%\}(.*?)\{%\s*endswagger-description\s*%\}', body, re.S)
        if d and d.group(1).strip(): out.append(d.group(1).strip() + '\n')
        ps = re.findall(r'\{%\s*swagger-parameter([^%]*)%\}(.*?)\{%\s*endswagger-parameter\s*%\}', body, re.S)
        if ps:
            out.append('| In | Name | Type | Required | Description |\n|---|---|---|---|---|')
            for pa, pd in ps:
                out.append(f'| {attr(pa,"in")} | `{attr(pa,"name")}` | {attr(pa,"type")} | {"yes" if "required=\"true\"" in pa else ""} | {" ".join(pd.split()).replace("|","\\|")} |')
            out.append('')
        for ra, rb in re.findall(r'\{%\s*swagger-response([^%]*)%\}(.*?)\{%\s*endswagger-response\s*%\}', body, re.S):
            out.append(f'**Response {attr(ra,"status")}:** {attr(ra,"description")}\n\n{rb.strip()}\n')
        return '\n'.join(out) + '\n'
    t = re.sub(r'\{%\s*swagger\s([^%]*)%\}(.*?)\{%\s*endswagger\s*%\}', sw, t, flags=re.S)
    # README.md links -> directory URLs (VitePress rewrites README.md to index.md)
    t = re.sub(r'(\]\((?!https?:)[^)\s#]*?)(?:^|(?<=/)|(?<=\())README\.md(?=[)#\s])', lambda m: m.group(1) + ('./' if m.group(1).endswith('(') else ''), t)
    # raw HTML hrefs to .md files -> clean URLs
    t = re.sub(r'href="((?!https?:|mailto:)[^"#]*?)(README)?\.md(#[^"]*)?"', lambda m: 'href="' + (m.group(1) or './') + (m.group(3) or '') + '"', t)
    return t
def lead(t):
    # GitBook shows frontmatter `description` as a lead paragraph under the H1; VitePress doesn't.
    fm = re.match(r'^---\n(.*?)\n---\n', t, re.S)
    if not fm: return t
    try: d = (yaml.safe_load(fm.group(1)) or {}).get('description')
    except Exception: return t
    if not isinstance(d, str) or not d.strip(): return t
    d = ' '.join(d.split()); body = t[fm.end():]
    if d[:60] in ' '.join(body.split()): return t
    h = re.search(r'^# .*$', body, re.M)
    if h: body = body[:h.end()] + '\n\n' + d + '\n' + body[h.end():]
    else: body = d + '\n\n' + body
    return t[:fm.end()] + body
n = 0
for p in root.rglob('*.md'):
    if '.git' in p.parts or 'node_modules' in p.parts or p.name == 'SUMMARY.md' or 'docs-audit' in p.parts: continue
    s = p.read_text(encoding='utf-8'); c = lead(conv(s))
    if c != s: p.write_text(c, encoding='utf-8'); n += 1
print('converted', n)
