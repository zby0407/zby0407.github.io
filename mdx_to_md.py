import re
import sys

def clean_mdx(text):
    # Remove frontmatter
    text = re.sub(r'^---\n.*?\n---\n', '', text, flags=re.DOTALL)

    # Remove import statements
    text = re.sub(r'^import\s+\w+\s+from\s+["\'][^"\']+["\'];?\s*\n?', '', text, flags=re.MULTILINE)

    # Remove LinkPreview component (multiline and single line)
    text = re.sub(r'<LinkPreview\b[^>]*\n.*?\n/>\n?', '', text, flags=re.DOTALL)
    text = re.sub(r'<LinkPreview\b[^/]*/>\n?', '', text)

    # Remove Callout wrappers but keep content
    text = re.sub(r'<Callout[^>]*>\n?', '', text)
    text = re.sub(r'</Callout>\n?', '', text)

    # Remove Mermaid wrappers with code prop: <Mermaid code={`...`} />
    def mermaid_code_prop_repl(m):
        code = m.group(1).strip()
        return f'```mermaid\n{code}\n```\n'
    text = re.sub(r'<Mermaid\s+code=\{`\n?(.*?)\n?`\}\s+/>', mermaid_code_prop_repl, text, flags=re.DOTALL)

    # Remove Mermaid wrappers with slot: <Mermaid> ... </Mermaid>
    def mermaid_slot_repl(m):
        code = m.group(1).strip()
        return f'```mermaid\n{code}\n```\n'
    text = re.sub(r'<Mermaid[^>]*>\n?(.*?)\n?</Mermaid>', mermaid_slot_repl, text, flags=re.DOTALL)

    # Remove Tabs and TabPanel wrappers but keep content
    text = re.sub(r'<Tabs[^>]*>\n?', '', text)
    text = re.sub(r'</Tabs>\n?', '', text)
    text = re.sub(r'<TabPanel>\n?', '', text)
    text = re.sub(r'</TabPanel>\n?', '', text)

    # Remove Toggle wrappers but keep content
    text = re.sub(r'<Toggle[^>]*>\n?', '**折叠内容：**\n\n', text)
    text = re.sub(r'</Toggle>\n?', '\n', text)

    # Clean up multiple blank lines
    text = re.sub(r'\n{3,}', '\n\n', text)

    return text.strip()

if __name__ == '__main__':
    text = sys.stdin.read()
    print(clean_mdx(text))
