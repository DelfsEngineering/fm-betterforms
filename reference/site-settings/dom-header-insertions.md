---
description: This are is used to add third part code into your app.
---

# DOM Header Insertions

### Purpose

Use the DOM (Document Object Model ) insertions to add  HTML, Meta Data tags, CDN's and JavaScript in your app. Code can be added and edited from the  **Environment > DOM Header Insertions** tab in your [site settings](./). This feature is useful for installing custom fonts or a [favicon](/broken/pages/EDg4KsbmWUwTsiaGZq2y), or other third-party [libraries](../components-overview/3rd-party-elements.md).

### Code Insertion Sections

**DOM Header Insertions - Load First**

FM BetterForms will load this code into your app before the first element of the app is rendered. Use this section when you need to ensure code or links are available before the app attempts to draw the page.

**DOM Header Insertions - Load Later**

Code in this area is loaded at an undetermined point after the main application begins to load. This is ideal for adding libraries, like a payment gateway, into your app without affecting its loading and startup performance. Only put code here that your application does not need immediately. While it usually loads early, there is a possibility that rendering will start before this code loads.

#### Optimizations

Moving code and links into the load later section will decrease your application's initial loading time, particularly noticeable during the first load of the app. FM BetterForms internally caches most of your external assets, so they will not need to be fetched on app revisits.
