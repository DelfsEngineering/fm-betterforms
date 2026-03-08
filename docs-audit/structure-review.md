# Structure Review

This review focuses on information architecture, content-type fit, and content density rather than line-by-line factual correctness.

## Recommended Content Model
- `Getting Started`: short, sequential, task-first onboarding.
- `Reference`: durable contracts, UI labels, schema keys, actions, hooks, API shapes, and version-sensitive behavior.
- `Guides`: opinionated workflows and integrations that combine multiple features.
- `Cookbook`: concrete recipes with prerequisites, reusable snippets, and expected outcomes.

## Current Structural Risks

### 1. Duplicate Authentication Hubs
- Published paths:
  - `reference/users-and-authentication/README.md`
  - `reference/users-and-authentication/authentication.md`
  - `reference/users-and-authentication/oauth.md`
  - `reference/authentication/README.md`
  - `reference/authentication/basic-auth.md`
  - `reference/authentication/oauth.md`
- Risk: users have two places to look for “the real auth docs,” and the stronger, more current implementation detail is spread across both.
- Recommendation: make `reference/authentication/` the canonical auth hub, move any still-useful user-management/custom-login content into it, and retire or badge the legacy parallel section.

### 2. Placeholder Cookbook Is Published Too Early
- `cookbook-coming-soon/read-me.md` is a work-in-progress page.
- Several cookbook pages are empty or near-empty, including:
  - `cookbook-coming-soon/using-smart-links.md`
  - `cookbook-coming-soon/passing-data-between-pages.md`
  - `cookbook-coming-soon/using-development-data.md`
  - `cookbook-coming-soon/when-to-use-app-vs-model.md`
  - `cookbook-coming-soon/fm-script-architecture.md`
- Risk: placeholder content looks like missing documentation rather than intentional backlog.
- Recommendation: remove empty recipes from `SUMMARY.md` until the cookbook contains real task-based content.

### 3. Shadow Onboarding Tree Fragments the Docs Source
- There is an unpublished overlapping tree under `getting-started/getting-started/` in addition to the published `getting-started/ide-quick-tour/` path.
- Risk: maintainers can edit the wrong onboarding source and create drift between the repo tree and published nav.
- Recommendation: archive or clearly mark the shadow tree unless it is being promoted to replace the current getting-started flow.

### 4. Getting Started Contains Reference-Heavy Deep Dives
- The `ide-quick-tour/environment/` and `pages-deep-dive/` pages behave more like advanced reference or admin docs than first-run onboarding.
- Risk: onboarding becomes too long and users must sift through stable reference detail while trying to complete first tasks.
- Recommendation: trim these pages to “what you need now” and move the durable detail into `reference/` or an advanced admin section.

### 5. Guides Are Mixed Into Reference-Like Navigation
- `Guides & Integrations` is published under the `APIs & Services` section even though the files live in `guides/integrations/`.
- `Custom Components` is exposed under guide-oriented nav but its landing page lives under `reference/styling/custom-components/README.md`.
- Risk: content type is unclear from the nav; users do not know whether to expect a workflow, API contract, or reference stub.
- Recommendation: make `Guides` a first-class nav section and keep its landing pages physically and structurally aligned with guide content.

## Content Density Review

### Too Lean
- `reference/users-and-authentication/authentication.md`
- `reference/authentication/oauth.md`
- `reference/styling/custom-components/README.md`
- `guides/customization/buttons.md`
- `guides/customization/displaying-data-tables.md`
- `guides/customization/basic-styling.md`
- most of `cookbook-coming-soon/`

Why these are too lean:
- They do not contain enough task guidance or contract detail to stand on their own.
- Several behave like placeholders or redirects instead of complete docs.

### Too Verbose or Mis-scoped
- `getting-started/ide-quick-tour/4.-common-customizations-and-expanding-your-app/4.4-basic-app-styling-site-styling-ui.md`
- `getting-started/ide-quick-tour/4.-common-customizations-and-expanding-your-app/4.2-implementing-page-navigation-actions-and-site-navigation-ui.md`
- `getting-started/ide-quick-tour/4.-common-customizations-and-expanding-your-app/4.3-displaying-data-in-tables-page-builder-and-element-config.md`
- `reference/actions-processor/actions_overview/function-1.md`

Why these are too verbose or mis-scoped:
- The onboarding pages carry too much reference detail for a first-run workflow.
- The `function` action page spends too much space on examples before clearly stating the runtime contract and error shape.

## Suggested Moves and Merges
- Consolidate all auth overview content under `reference/authentication/`.
- Move `reference/users-and-authentication/managing-users.md` and `reference/users-and-authentication/custom-login-pages.md` into the canonical auth hub if they remain current enough to keep.
- Retire or redirect `reference/users-and-authentication/README.md`, `authentication.md`, and `oauth.md` after consolidation.
- Move `Guides & Integrations` out of the `APIs & Services` nav block and publish it as part of `Guides`.
- Move or reframe `reference/styling/custom-components/README.md` so the landing page matches the guide-oriented nav around it.
- Treat `guides/customization/seo-and-social-sharing.md` as the narrative companion to `reference/form-settings/seo-meta-tags.md`, not a second reference page.
- Move environment deep-dive pages from `Getting Started` into either `Reference` or an advanced/admin area.
- Collapse `cookbook-coming-soon/` into a single honest backlog page until real recipes exist.

## Recommended Final Nav Shape
- `Getting Started`
  - short onboarding sequence only
- `Reference`
  - site settings
  - page settings
  - components
  - actions
  - hooks
  - authentication
  - APIs/services
  - security
  - enterprise
- `Guides`
  - integrations
  - customization/styling
  - best practices
- `Cookbook`
  - only publish when recipe pages are complete and runnable

## Follow-Up Review Scope
After the first-pass published audit is complete, review these overlap/cleanup areas next:
- unpublished or shadow trees such as `getting-started/getting-started/`
- duplicate auth content across `reference/users-and-authentication/` and `reference/authentication/`
- guide/reference cross-linking around styling, custom components, and SEO
- whether any stale unlinked pages should be archived, merged, or reintroduced intentionally
