# SEO and Social Sharing Guide

> **⚠️ PRELIMINARY FEATURE - BETA**
>
> This feature is currently in beta testing. The functionality and best practices may evolve based on user feedback. We encourage you to test thoroughly and share your experience with us.

---

## Overview

This guide shows you how to optimize your BetterForms pages for search engines and social media sharing using the new `seoMeta` field type. When configured correctly, your pages will:

- ✅ Appear in Google search results with rich titles and descriptions
- ✅ Display beautiful previews when shared on Slack, Teams, Discord
- ✅ Show engaging cards on Facebook, LinkedIn, Twitter
- ✅ Improve click-through rates from search and social
- ✅ Provide better user experience for link sharing

---

## Why This Matters

### Without SEO Meta Tags
When you share a link, you get a plain URL with no context:

```
https://yourdomain.com/products/widget-pro

(no preview, no image, no description)
```

### With SEO Meta Tags
Your links become rich, engaging previews:

```
╔══════════════════════════════════════╗
║  [Image: Product photo]              ║
║                                      ║
║  Widget Pro - $29.99                 ║
║  The ultimate widget for your needs  ║
║                                      ║
║  yourdomain.com                      ║
╚══════════════════════════════════════╝
```

---

## Quick Start

### Step 1: Add the Field to Your Form

In your form schema, add a `seoMeta` field:

```json
{
  "type": "seoMeta",
  "label": "SEO Meta Tags",
  "icon": "fa-tags",
  "metaTags": {
    "title": "Your Page Title - Brand Name",
    "description": "Brief description of your page (150-160 characters)",
    "og:title": "Title for social media",
    "og:description": "Description for social media previews",
    "og:image": "https://yourdomain.com/images/social-preview.jpg",
    "og:type": "website",
    "twitter:card": "summary_large_image"
  }
}
```

### Step 2: Enable SSR for the Layout

In your site settings, ensure SSR is enabled for this page:

```json
{
  "layouts": {
    "your-page-slug": {
      "id": "YOUR_FORM_ID",
      "title": "Page Title",
      "ssr": {
         "enabled": true
      }
    }
  }
}
```

### Step 3: Test Your Page

Visit your page as a bot to see the meta tags:

```bash
curl -H "User-Agent: Googlebot" https://yourdomain.com/your-page
```

Look for your meta tags in the `<head>` section!

---

## Common Scenarios

### 1. Static Marketing Page

**Use Case:** About Us, Contact, Pricing pages with fixed content

**Example:**
```json
{
  "type": "seoMeta",
  "metaTags": {
    "title": "About Us - Acme Corporation",
    "description": "Learn about Acme Corp's mission to revolutionize widget manufacturing. Founded in 2010, we serve 10,000+ customers worldwide.",
    "keywords": "about us, company history, team, mission statement",
    "og:title": "About Acme Corp - Leading Widget Manufacturer",
    "og:description": "Discover how we're changing the widget industry",
    "og:image": "https://cdn.acme.com/images/about-hero-1200x630.jpg",
    "og:type": "website",
    "twitter:card": "summary_large_image"
  }
}
```

**Result:**
- Clear, compelling title in search results
- Professional preview when shared on social media
- Keywords help search engines understand your content

---

### 2. Dynamic Product Page

**Use Case:** E-commerce product pages with database-driven content

**Requirements:**
- Enable `onFormRequest` hook on your form
- Populate `model.product` with product data

**Example:**
```json
{
  "type": "seoMeta",
  "metaTags": {
    "title_calc": "model.product.name + ' - $' + model.product.price + ' | Acme Store'",
    "description_calc": "model.product.description?.substring(0, 160)",
    "keywords_calc": "model.product.tags?.join(', ') || 'products, shop'",
    "og:title_calc": "model.product.name",
    "og:description_calc": "model.product.shortDescription || 'Check out this product'",
    "og:image_calc": "model.product.images?.[0]?.url || 'https://cdn.acme.com/default-product.jpg'",
    "og:type": "product",
    "og:url_calc": "'https://acme.com/products/' + model.product.slug",
    "product:price:amount_calc": "model.product.price",
    "product:price:currency": "USD",
    "product:availability_calc": "model.product.inStock ? 'in stock' : 'out of stock'",
    "twitter:card": "summary_large_image",
    "twitter:label1": "Price",
    "twitter:data1_calc": "'$' + model.product.price"
  }
}
```

**Result:**
- Each product gets unique, descriptive meta tags
- Search engines index product details accurately
- Social shares show product photo, name, and price
- Twitter cards display price labels

---

### 3. Dynamic Blog Post

**Use Case:** Blog articles with author, date, and category information

**Requirements:**
- Enable `onFormRequest` hook
- Populate `model.post` with article data

**Example:**
```json
{
  "type": "seoMeta",
  "metaTags": {
    "title_calc": "model.post.title + ' | Acme Blog'",
    "description_calc": "model.post.excerpt?.substring(0, 160) || model.post.content?.substring(0, 160)",
    "keywords_calc": "model.post.tags?.join(', ') || 'blog, articles'",
    "og:title_calc": "model.post.title",
    "og:description_calc": "model.post.excerpt",
    "og:image_calc": "model.post.featuredImage?.url || 'https://cdn.acme.com/blog-default.jpg'",
    "og:type": "article",
    "og:url_calc": "'https://acme.com/blog/' + model.post.slug",
    "article:published_time_calc": "model.post.publishedAt",
    "article:modified_time_calc": "model.post.updatedAt",
    "article:author_calc": "model.post.author?.name || 'Acme Blog'",
    "article:section_calc": "model.post.category",
    "twitter:card": "summary_large_image",
    "twitter:creator_calc": "model.post.author?.twitter ? '@' + model.post.author.twitter : ''",
    "twitter:label1": "Reading time",
    "twitter:data1_calc": "(model.post.readingTime || 5) + ' min read'"
  }
}
```

**Result:**
- Article previews show author, date, and featured image
- Google News can properly categorize your content
- Twitter attributes posts to the correct author
- Reading time estimate appears in Twitter cards

---

## Platform-Specific Guides

### Slack Previews

**What Slack Uses:**
- `og:title` - Title of the preview
- `og:description` - Description text
- `og:image` - Preview image

**Minimum Setup:**
```json
{
  "og:title": "Your Title",
  "og:description": "Your description",
  "og:image": "https://yourdomain.com/preview-1200x630.jpg"
}
```

**Image Requirements:**
- Minimum: 200x200px
- Recommended: 1200x630px
- Max size: 5MB
- Format: JPG, PNG, or GIF

**Testing:**
1. Paste your link in any Slack channel
2. Slack automatically unfurls the preview
3. To refresh cache: `/unfurl clear https://yoururl.com`

---

### Facebook/LinkedIn Previews

**What They Use:**
- `og:title` - Preview title
- `og:description` - Preview description
- `og:image` - Preview image
- `og:url` - Canonical URL
- `og:type` - Content type
- `og:site_name` - Your brand name

**Recommended Setup:**
```json
{
  "og:title": "Your Title",
  "og:description": "Description (55-65 chars for best display)",
  "og:image": "https://yourdomain.com/fb-preview-1200x630.jpg",
  "og:url": "https://yourdomain.com/page-url",
  "og:type": "website",
  "og:site_name": "Your Brand Name"
}
```

**Image Requirements:**
- Recommended: 1200x630px
- Aspect ratio: 1.91:1
- Min dimensions: 200x200px
- Max size: 8MB (Facebook), 5MB (LinkedIn)

**Testing:**
- **Facebook:** https://developers.facebook.com/tools/debug/
- **LinkedIn:** https://www.linkedin.com/post-inspector/

---

### Twitter Cards

**What Twitter Uses:**
- `twitter:card` - Card type
- `twitter:title` - Card title
- `twitter:description` - Card description
- `twitter:image` - Card image
- `twitter:site` - Your Twitter handle
- `twitter:creator` - Author's Twitter handle

**Card Types:**
- `summary` - Small square image
- `summary_large_image` - Large image (recommended)

**Recommended Setup:**
```json
{
  "twitter:card": "summary_large_image",
  "twitter:title": "Your Title (max 70 chars)",
  "twitter:description": "Your description (max 200 chars)",
  "twitter:image": "https://yourdomain.com/twitter-1200x675.jpg",
  "twitter:site": "@yourbrand",
  "twitter:creator": "@authorhandle"
}
```

**Image Requirements:**
- Large image card: 1200x675px (16:9 ratio)
- Summary card: 120x120px minimum (1:1 ratio)
- Max size: 5MB

**Testing:**
- **Twitter:** https://cards-dev.twitter.com/validator

---

### Google Search

**What Google Uses:**
- `title` - Page title in search results
- `description` - Snippet text below title
- `keywords` - Helps with understanding (less important now)

**Recommended Setup:**
```json
{
  "title": "Primary Keyword - Secondary Keyword | Brand",
  "description": "Compelling description that encourages clicks. Include primary keyword and value proposition.",
  "keywords": "primary keyword, secondary keyword, related terms"
}
```

**Best Practices:**
- **Title:** 50-60 characters (longer titles get truncated)
- **Description:** 150-160 characters
- **Keywords:** 5-10 relevant terms, comma-separated
- Include your target keyword early in both title and description
- Make description compelling to improve click-through rate

---

## Dynamic Content Patterns

### Pattern 1: Fallback Values

Always provide fallbacks for dynamic data:

```json
{
  "title_calc": "model.title || 'Default Page Title | Brand'",
  "description_calc": "model.description || 'Default page description'",
  "og:image_calc": "model.image?.url || 'https://yourdomain.com/default-og.jpg'"
}
```

### Pattern 2: Optional Chaining

Safely access nested properties:

```json
{
  "og:image_calc": "model.product?.images?.[0]?.url",
  "article:author_calc": "model.post?.author?.name"
}
```

### Pattern 3: Array Operations

Work with arrays of tags or categories:

```json
{
  "keywords_calc": "model.tags?.join(', ') || 'default, keywords'",
  "article:tag_calc": "model.categories?.[0]"
}
```

### Pattern 4: Conditional Logic

Display different values based on conditions:

```json
{
  "product:availability_calc": "model.inStock ? 'in stock' : 'out of stock'",
  "og:type_calc": "model.isProduct ? 'product' : 'website'"
}
```

### Pattern 5: String Operations

Format and truncate text:

```json
{
  "description_calc": "model.content?.substring(0, 160)",
  "title_calc": "model.firstName + ' ' + model.lastName + ' | Profile'"
}
```

---

## Image Best Practices

### Optimal Dimensions

| Use Case | Dimensions | Aspect Ratio | Platforms |
|----------|------------|--------------|-----------|
| **Universal OG** | 1200x630px | 1.91:1 | Facebook, LinkedIn, Slack, WhatsApp |
| **Twitter Large** | 1200x675px | 16:9 | Twitter |
| **Twitter Summary** | 1:1 (square) | 1:1 | Twitter (small card) |

**Pro Tip:** Create one 1200x630px image and use it for all `og:` tags. It works everywhere!

### Image Checklist

- ✅ Use **absolute URLs** (https://yourdomain.com/image.jpg)
- ✅ Use **high-quality** images (not blurry or pixelated)
- ✅ Keep **file size under 1MB** for fast loading
- ✅ Use **descriptive filenames** (product-widget-pro.jpg, not IMG_1234.jpg)
- ✅ Test images are **accessible** (not behind login)
- ❌ Don't use relative URLs (/images/photo.jpg)
- ❌ Don't use images with text overlay (some platforms don't support)

---

## Testing Your Configuration

### 1. Test as Search Engine Bot

```bash
# Google
curl -H "User-Agent: Googlebot" https://yourdomain.com/page

# Bing
curl -H "User-Agent: Bingbot" https://yourdomain.com/page

# Facebook
curl -H "User-Agent: facebookexternalhit/1.1" https://yourdomain.com/page
```

Look for your meta tags in the `<head>` section.

### 2. Test Social Previews

Visit these tools and enter your URL:

- **Facebook Debugger:** https://developers.facebook.com/tools/debug/
  - Shows exactly how your link will appear on Facebook
  - Click "Scrape Again" to refresh cache
  
- **Twitter Card Validator:** https://cards-dev.twitter.com/validator
  - Preview how your Twitter card looks
  - Request approval for your domain (one-time)

- **LinkedIn Inspector:** https://www.linkedin.com/post-inspector/
  - Test LinkedIn previews
  - Refresh cache if needed

- **Slack:** Just paste the link in any channel
  - Use `/unfurl clear https://yoururl.com` to refresh

### 3. Check Meta Tags in Browser

1. Visit your page in a browser
2. Right-click → "View Page Source"
3. Search for `<meta` to find your tags
4. Verify they contain the correct content

---

## Troubleshooting

### Problem: Meta Tags Not Showing

**Possible Causes:**
1. SSR not enabled for this layout
2. Form not loading successfully
3. Testing without bot user-agent
4. `seoMeta` field not in form schema

**Solutions:**
1. Check site settings for SSR configuration
2. Check server logs for form loading errors
3. Use curl with bot user-agent (see above)
4. Verify field exists in form designer

---

### Problem: Dynamic Values Are Empty

**Possible Causes:**
1. `onFormRequest` not enabled
2. Model data not populating
3. Wrong property path in `_calc`
4. Syntax error in expression

**Solutions:**
1. Enable `onFormRequest` hook in form settings
2. Check server logs for hook execution
3. Verify property paths match your data model
4. Test expressions with known good data

---

### Problem: Social Preview Not Updating

**Cause:** Platforms cache previews for 7+ days

**Solutions:**
- **Facebook:** Use Facebook Debugger to scrape again
- **LinkedIn:** Use LinkedIn Inspector to refresh
- **Twitter:** Use Card Validator
- **Slack:** `/unfurl clear https://yoururl.com`

---

### Problem: Images Not Showing

**Possible Causes:**
1. Using relative URLs
2. Image behind authentication
3. Image too large (>5MB)
4. Incorrect image URL

**Solutions:**
1. Use absolute URLs (https://...)
2. Ensure images are publicly accessible
3. Compress images to <1MB
4. Test URL directly in browser

---

## Best Practices Checklist

### Content
- ✅ Keep titles under 60 characters
- ✅ Keep descriptions 150-160 characters
- ✅ Include primary keyword in title
- ✅ Write compelling, click-worthy descriptions
- ✅ Use action words and value propositions

### Images
- ✅ Use 1200x630px images for maximum compatibility
- ✅ High-quality, professional images only
- ✅ Compress to <1MB file size
- ✅ Use absolute URLs (https://...)
- ✅ Test images are publicly accessible

### Technical
- ✅ Always include fallback values in `_calc`
- ✅ Use optional chaining for safety
- ✅ Enable `onFormRequest` for dynamic content
- ✅ Test with bot user-agents
- ✅ Verify in platform preview tools

### SEO
- ✅ Include relevant keywords naturally
- ✅ Each page should have unique meta tags
- ✅ Match page content to meta descriptions
- ✅ Update meta tags when content changes
- ✅ Monitor search console for errors

---

## Real-World Examples

### Example 1: SaaS Landing Page

```json
{
  "type": "seoMeta",
  "metaTags": {
    "title": "ProjectHub - Modern Project Management for Teams",
    "description": "Streamline your workflow with ProjectHub. Collaborate in real-time, track progress, and ship faster. Try free for 14 days.",
    "keywords": "project management, collaboration, team productivity, task tracking",
    "og:title": "ProjectHub - Built for Modern Teams",
    "og:description": "Join 50,000+ teams using ProjectHub to ship projects faster",
    "og:image": "https://cdn.projecthub.com/landing-hero-1200x630.jpg",
    "og:type": "website",
    "twitter:card": "summary_large_image",
    "twitter:site": "@projecthub"
  }
}
```

### Example 2: E-commerce Product (Dynamic)

```json
{
  "type": "seoMeta",
  "metaTags": {
    "title_calc": "model.product.name + ' - ' + model.product.brand + ' | ShopCo'",
    "description_calc": "model.product.description?.substring(0, 155) + '...'",
    "keywords_calc": "[model.product.brand, model.product.category, ...model.product.tags].join(', ')",
    "og:title_calc": "model.product.name + ' - $' + model.product.price",
    "og:description_calc": "'⭐ ' + model.product.rating + '/5 from ' + model.product.reviewCount + ' reviews. ' + model.product.shortDesc",
    "og:image_calc": "model.product.images?.[0]?.large || 'https://cdn.shopco.com/default-product.jpg'",
    "og:type": "product",
    "product:price:amount_calc": "model.product.price",
    "product:price:currency": "USD",
    "product:availability_calc": "model.product.stock > 0 ? 'in stock' : 'out of stock'",
    "product:condition": "new",
    "twitter:card": "summary_large_image",
    "twitter:label1": "Price",
    "twitter:data1_calc": "'$' + model.product.price + (model.product.onSale ? ' (SALE)' : '')",
    "twitter:label2": "Reviews",
    "twitter:data2_calc": "model.product.rating + '/5 ⭐'"
  }
}
```

### Example 3: Blog Post (Dynamic)

```json
{
  "type": "seoMeta",
  "metaTags": {
    "title_calc": "model.post.title + ' | TechBlog'",
    "description_calc": "model.post.excerpt || model.post.content?.substring(0, 160)",
    "keywords_calc": "model.post.tags?.join(', ') || 'technology, blog'",
    "og:title_calc": "model.post.title",
    "og:description_calc": "model.post.excerpt",
    "og:image_calc": "model.post.coverImage?.url || 'https://cdn.techblog.com/default-article.jpg'",
    "og:type": "article",
    "article:published_time_calc": "model.post.publishedAt",
    "article:modified_time_calc": "model.post.updatedAt || model.post.publishedAt",
    "article:author_calc": "model.post.author?.displayName || 'TechBlog Editorial'",
    "article:section_calc": "model.post.category",
    "twitter:card": "summary_large_image",
    "twitter:site": "@techblog",
    "twitter:creator_calc": "model.post.author?.twitter ? '@' + model.post.author.twitter : '@techblog'",
    "twitter:label1": "Reading time",
    "twitter:data1_calc": "Math.ceil(model.post.wordCount / 200) + ' min read'",
    "twitter:label2": "Published",
    "twitter:data2_calc": "new Date(model.post.publishedAt).toLocaleDateString()"
  }
}
```

---

## Automatic robots.txt and sitemap.xml

BetterForms automatically serves a dynamic `robots.txt` and `sitemap.xml` for each tenant. No manual files needed.

### How It Works

- `https://yourdomain.com/robots.txt` — Tells search engines which pages to crawl
- `https://yourdomain.com/sitemap.xml` — Lists all crawlable pages for search engines

Both are generated from your layout configuration:
- Layouts with `ssr.enabled: true` are included as **allowed** / **listed**
- Everything else is **disallowed** by default

### Enabling Pages for Crawling

In your site settings, set `ssr.enabled: true` on any layout you want search engines to find:

```json
{
  "layouts": {
    "pricing": {
      "id": "FR_xxxxx",
      "title": "Pricing",
      "ssr": { "enabled": true }
    },
    "admin": {
      "id": "FR_yyyyy",
      "title": "Admin Panel"
    }
  }
}
```

**Result:**
- `/pricing` appears in `robots.txt` (Allow) and `sitemap.xml`
- `/admin` is blocked in `robots.txt` (Disallow) and excluded from `sitemap.xml`

### Submitting to Google

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your domain
3. Submit your sitemap URL: `https://yourdomain.com/sitemap.xml`
4. Google will automatically discover and index your SSR-enabled pages

---

## Page Language

Control the `<html lang="...">` attribute for international SEO using the `language` key in `metaTags`:

```json
{
  "type": "seoMeta",
  "metaTags": {
    "language": "fr",
    "title": "Tarification - Mon Application"
  }
}
```

- Defaults to `"en"` (English) if not specified
- Use any [ISO 639-1 code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) (`en`, `fr`, `es`, `de`, `ja`, etc.)
- For dynamic language: `"language_calc": "model.userLanguage || 'en'"`

---

## Query String Forwarding

When someone visits a clean URL with query parameters (e.g., from an ad campaign), BetterForms preserves them during the SSR → SPA redirect:

```
https://yourdomain.com/pricing?utm_source=google&ref=partner123
→ redirects to /#/pricing?utm_source=google&ref=partner123
```

This means UTM tracking, referral codes, and deep-link parameters work correctly with SSR-enabled pages.

---

## Client-Side Meta Tags

The `seoMeta` field also works for regular (non-bot) users in the browser. When the Vue app loads:

- `document.title` is updated (browser tab shows the correct title)
- `<html lang="...">` is set
- All meta tags are injected into `<head>` (useful for single-page app navigation)
- Tags are cleaned up when navigating away from the page

This means social sharing tools that read the live DOM (not just the initial HTML) will see the correct meta tags.

---

## Getting Help

This is a preliminary feature and we value your feedback!

### Report Issues
- **Email:** support@fmbetterforms.com
- **Forum:** [BetterForms Community](https://community.fmbetterforms.com)

### Share Feedback
- What's working well?
- What could be improved?
- What features would you like to see?

### Resources
- [Technical Reference](../../reference/form-settings/seo-meta-tags.md)
- [Form Settings Overview](../../reference/form-settings/README.md)

---

*Last Updated: February 2026*
