import re
import sys

with open('/tmp/ai-memory-series.html', 'r') as f:
    html = f.read()

# Inject CSS and JS before </head>
inject = '''
<style>
:root {
  --bg: #fafafa;
  --fg: #1a1a1a;
  --muted: #666;
  --accent: #2563eb;
  --accent2: #7c3aed;
  --border: #e5e7eb;
  --code-bg: #f3f4f6;
  --callout-info: #dbeafe;
  --callout-info-border: #3b82f6;
  --callout-warning: #fef3c7;
  --callout-warning-border: #f59e0b;
  --callout-danger: #fecaca;
  --callout-danger-border: #ef4444;
  --callout-tip: #dcfce7;
  --callout-tip-border: #22c55e;
  --callout-success: #d1fae5;
  --callout-success-border: #10b981;
  --callout-note: #f3f4f6;
  --callout-note-border: #9ca3af;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #111827;
    --fg: #f3f4f6;
    --muted: #9ca3af;
    --accent: #60a5fa;
    --accent2: #a78bfa;
    --border: #374151;
    --code-bg: #1f2937;
    --callout-info: #1e3a5f;
    --callout-info-border: #3b82f6;
    --callout-warning: #3f2e0a;
    --callout-warning-border: #f59e0b;
    --callout-danger: #450a0a;
    --callout-danger-border: #ef4444;
    --callout-tip: #0f2e1d;
    --callout-tip-border: #22c55e;
    --callout-success: #0f2e1d;
    --callout-success-border: #10b981;
    --callout-note: #1f2937;
    --callout-note-border: #6b7280;
  }
}
* { box-sizing: border-box; }
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif;
  background: var(--bg);
  color: var(--fg);
  line-height: 1.7;
  max-width: 860px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}
h1, h2, h3, h4 { font-weight: 600; line-height: 1.3; }
h1.title { font-size: 2rem; border-bottom: 2px solid var(--accent); padding-bottom: 0.5rem; }
h2 { font-size: 1.5rem; margin-top: 2.5rem; border-bottom: 1px solid var(--border); padding-bottom: 0.3rem; }
h3 { font-size: 1.2rem; margin-top: 2rem; }
a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }
p { margin: 0.8rem 0; }
blockquote {
  border-left: 4px solid var(--accent);
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  background: var(--code-bg);
  border-radius: 0 4px 4px 0;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  font-size: 0.9rem;
}
th, td { border: 1px solid var(--border); padding: 0.5rem 0.75rem; text-align: left; }
th { background: var(--code-bg); font-weight: 600; }
tr:nth-child(even) { background: rgba(0,0,0,0.02); }
code {
  background: var(--code-bg);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-size: 0.88em;
  font-family: "SF Mono", "Fira Code", Consolas, monospace;
}
pre {
  background: var(--code-bg);
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 0.85rem;
  line-height: 1.5;
}
pre code { background: none; padding: 0; }
nav#TOC {
  background: var(--code-bg);
  padding: 1.5rem;
  border-radius: 12px;
  margin: 1.5rem 0;
  border: 1px solid var(--border);
}
nav#TOC ul { list-style: none; padding-left: 1rem; }
nav#TOC > ul { padding-left: 0; }
nav#TOC a { color: var(--muted); font-size: 0.9rem; }
nav#TOC a:hover { color: var(--accent); }
.callout {
  border-radius: 8px;
  border-left: 4px solid;
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}
.callout p:first-child { margin-top: 0; }
.callout p:last-child { margin-bottom: 0; }
.mermaid { background: #fff; border-radius: 8px; padding: 1rem; margin: 1rem 0; border: 1px solid var(--border); overflow-x: auto; }
.footnotes { font-size: 0.85rem; color: var(--muted); }
.footnotes ol { padding-left: 1.2rem; }
.footnotes li { margin-bottom: 0.5rem; }
hr { border: none; border-top: 1px solid var(--border); margin: 3rem 0; }
header#title-block-header { text-align: center; margin-bottom: 2rem; }
header#title-block-header h1 { font-size: 2.2rem; margin-bottom: 0.5rem; }
header#title-block-header p { color: var(--muted); margin: 0.2rem 0; }
@media print {
  body { max-width: 100%; padding: 1rem; }
  nav#TOC { display: none; }
  h1, h2, h3 { page-break-after: avoid; }
  pre, table, figure { page-break-inside: avoid; }
}
</style>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
<script>
document.addEventListener("DOMContentLoaded", function() {
  mermaid.initialize({ startOnLoad: true, theme: "default" });
  renderMathInElement(document.body, {
    delimiters: [
      {left: "$$", right: "$$", display: true},
      {left: "$", right: "$", display: false},
      {left: "\\[", right: "\\]", display: true},
      {left: "\\(", right: "\\)", display: false}
    ],
    throwOnError: false
  });
});
</script>
'''

html = html.replace('</head>', inject + '\n</head>')

# Convert mermaid code blocks to mermaid divs
# Pandoc converts ```mermaid to <pre class="mermaid"><code>...</code></pre>
# We need to convert them back to <pre class="mermaid">...</pre>
def convert_mermaid(m):
    inner = m.group(1)
    # Unescape HTML entities
    inner = inner.replace('&lt;', '<').replace('&gt;', '>').replace('&amp;', '&').replace('&quot;', '"')
    return '<pre class="mermaid">\n' + inner + '\n</pre>'

html = re.sub(r'<pre class="mermaid"><code>(.*?)</code>\s*</pre>', convert_mermaid, html, flags=re.DOTALL)

with open('/tmp/ai-memory-series.html', 'w') as f:
    f.write(html)

print("Done! Output: /tmp/ai-memory-series.html")
