# Source-of-Truth Crosswalk

This crosswalk maps each major published docs area to the code that should be treated as authoritative during doc validation and future maintenance.

## Ground Truth Repos
- Primary product source: `/home/ubuntu/environment/BetterForms_DEV_V3`
- Form-engine source: `/home/ubuntu/environment/vue-form-generator`
- Published docs inventory: `/home/ubuntu/environment/BetterForms_Docs/SUMMARY.md`
- Known docs backlog: `/home/ubuntu/environment/BetterForms_Docs/notion_status_update.md`

## Section Crosswalk
| Docs Area | Intended Content Type | Primary Source of Truth | Secondary Source of Truth | Verified Source Note |
| --- | --- | --- | --- | --- |
| `getting-started/` | `getting-started` | `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/components/` | `/home/ubuntu/environment/BetterForms_DEV_V3/tests/webapp/` | Use product runtime and UI behavior as truth; these pages should stay task-first and link outward for deep schema detail. |
| `reference/site-settings/` | `reference` | `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/components/masters/` | `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/js/store/modules/site.js` | Site settings are primarily expressed through app-shell components and site state in the BetterForms frontend. |
| `reference/form-settings/` | `reference` | `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/components/layouts/form.vue` | `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/components/layouts/formGen/formgen.vue` | Page settings should be validated against runtime keys on `form`, validation flow, and page/model merge behavior. |
| `reference/components-overview/` | `reference` | `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/components/layouts/formGen/` | `/home/ubuntu/environment/vue-form-generator/src/` | BetterForms-owned wrappers live in the app repo; field semantics and plugin contracts often come from the VFG fork. |
| `reference/components-overview/betterforms-elements/` | `reference` | `/home/ubuntu/environment/vue-form-generator/src/fields/` | `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/js/BF.js` | Field docs should treat `fieldOptions` and current VFG implementation as canonical, with BetterForms alias migration documented separately. |
| `reference/actions-processor/` | `reference` | `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/js/actionsProcessor.js` | `/home/ubuntu/environment/BetterForms_DEV_V3/tests/webapp/js/` | The action switch in `actionsProcessor.js` is the canonical runtime inventory; tests clarify edge cases and redirects. |
| `reference/hooksoverview/` | `reference` | `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/components/layouts/formGen/formgen.vue` | `/home/ubuntu/environment/BetterForms_DEV_V3/serverapp/services/script/` | Hook docs need both sides: frontend action-thread behavior and backend script/service handling. |
| `reference/authentication/` | `reference` | `/home/ubuntu/environment/BetterForms_DEV_V3/serverapp/services/authentication/` | `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/js/store/modules/auth.js` | This should be the canonical auth hub because it maps most directly to current Node/Feathers behavior. |
| `reference/users-and-authentication/` | `reference` | `/home/ubuntu/environment/BetterForms_DEV_V3/serverapp/services/user/` | `/home/ubuntu/environment/BetterForms_DEV_V3/serverapp/services/authManagement/` | This section currently overlaps with the main auth hub and should be treated as legacy/helper-file-oriented content until consolidated. |
| `apis-and-services/` | `reference` | `/home/ubuntu/environment/BetterForms_DEV_V3/serverapp/services/` | `/home/ubuntu/environment/BetterForms_DEV_V3/tests/serverapp/services/` | Service registration and route handlers are the primary truth; tests help confirm request and response contracts. |
| `apis-and-services/messaging/` | `reference` | `/home/ubuntu/environment/BetterForms_DEV_V3/serverapp/services/message*/` | `/home/ubuntu/environment/BetterForms_DEV_V3/tests/serverapp/services/` | Messaging docs should reflect real route shapes, host scoping, API key requirements, and response structure. |
| `reference/enterprise/` | `reference` | `/home/ubuntu/environment/BetterForms_DEV_V3/config/default.json` | `/home/ubuntu/environment/BetterForms_DEV_V3/serverapp/shared-redis.js` | Enterprise docs should describe actual runtime config knobs rather than static environment examples. |
| `security/` | `reference` | `/home/ubuntu/environment/BetterForms_DEV_V3/config/default.json` | `/home/ubuntu/environment/BetterForms_DEV_V3/serverapp/app.js` | Security pages should be validated against live config, middleware, and deployment assumptions. |
| `guides/integrations/` | `guide` | `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/components/` | `/home/ubuntu/environment/BetterForms_DEV_V3/serverapp/services/` | Guides should describe when and how to use an integration, not restate full reference contracts. |
| `guides/styling/` and `guides/customization/` | `guide` | `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/css/` | `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/components/` | Styling docs should stay workflow-oriented and link to reference pages for stable schema keys. |
| `cookbook-coming-soon/` | `cookbook` | none yet | related reference/guide pages as recipes are created | This section is not a reliable product reference yet; most entries are placeholders and should be treated as backlog rather than validated recipes. |

## First-Pass High-Risk Sections
- `reference/actions-processor/`
- `reference/hooksoverview/`
- `reference/site-settings/`
- `reference/form-settings/`
- `reference/components-overview/betterforms-elements/`
- `reference/authentication/`
- `reference/users-and-authentication/`
- `apis-and-services/`
- `reference/enterprise/`

## Maintenance Notes
- When a docs page describes a UI label, validate it against current BetterForms editor behavior, not just runtime keys.
- When a docs page describes a field/plugin, prefer the current VFG fork implementation over older upstream docs.
- When a docs page describes an action or API, treat tests as the tiebreaker for edge-case behavior and redirect/merge semantics.
- When docs describe clearing queued actions for users, prefer the public helper `BF.actionsClear()` over raw store-dispatch examples.
- When a docs page is primarily narrative, keep the narrative in the guide/getting-started page and link to a reference page for stable keys or contracts.
