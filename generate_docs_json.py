import os
import json

# --- Configuration ---
# Assuming this script runs at the root of your Markdown repository
DOCS_DIR = "."
# The destination where VitePress outputs built files (change if your output dir is different)
OUTPUT_FILE = ".vitepress/dist/docs.json"
BASE_URL = "https://docs.klai.studio"

# Explicitly ignore GitBook leftovers, Git folders, and VitePress internals.
# docs-audit is excluded from the published site (see .vitepress/config.mjs srcExclude).
IGNORE_DIRS = {'.git', '.gitbook', '.github', '.vitepress', 'node_modules', 'assets', 'docs-audit'}
# SUMMARY.md is a GitBook routing file; README.md usually becomes the VitePress homepage (handled below).
# The other names are srcExclude entries and are not published.
IGNORE_FILES = {'SUMMARY.md', 'notion_status_update.md', 'docs_edit_guide.md'}


def to_slug(rel_path):
    """Match VitePress clean URLs, including README.md -> index.md rewrites."""
    slug = rel_path.replace('\\', '/').replace('.md', '')

    # Root index / README is the site homepage
    if slug == 'index' or slug.lower() == 'readme':
        return ''

    # Nested README.md is rewritten to index.md, so /dir/README -> /dir/
    if slug.endswith('/README'):
        return slug[: -len('/README')]

    if slug.endswith('/index'):
        return slug[:-6]

    return slug


def build_search_index():
    docs_data = []

    for root, dirs, files in os.walk(DOCS_DIR):
        # Modify dirs in-place to prevent os.walk from descending into ignored directories
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS and not d.startswith('.')]

        for file in files:
            if file.endswith('.md') and file not in IGNORE_FILES:
                filepath = os.path.join(root, file)

                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()

                if not content.strip():
                    continue

                rel_path = os.path.relpath(filepath, DOCS_DIR)
                slug = to_slug(rel_path)
                exact_url = f"{BASE_URL.rstrip('/')}/{slug}".rstrip('/')

                docs_data.append({
                    "url": exact_url,
                    "content": content
                })

    docs_data.sort(key=lambda page: page["url"])

    # Ensure the VitePress dist directory exists before writing
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(docs_data, f, ensure_ascii=False)

    print(f"Generated {OUTPUT_FILE} with {len(docs_data)} indexed pages.")


if __name__ == "__main__":
    build_search_index()
