# High-Risk Section Audit

This file captures the sections reviewed most deeply during the first pass. It is narrower than `published-pages-checklist.md` and more detailed than `findings-backlog.md`.

## Actions Processor
| Page | Accuracy | Depth | Key Finding | Source of Truth |
| --- | --- | --- | --- | --- |
| `reference/actions-processor/README.md` | `accurate` | `too lean` | Good intro, but too small to orient users to runtime vs editor/snippet usage. | `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/js/actionsProcessor.js` |
| `reference/actions-processor/actions_named.md` | `mostly accurate` | `slightly lean` | UI wording is stale and the lookup chain is more complex than documented. | `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/js/actionsProcessor.js`, `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/js/store/modules/site.js` |
| `reference/actions-processor/actions_overview/README.md` | `partially outdated` | `too lean` | Missing active runtime actions and recommends a lower-level clear API than the public helper. User-facing docs should prefer `BF.actionsClear()`. | `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/js/actionsProcessor.js`, `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/js/BF.js` |
| `reference/actions-processor/actions_overview/runutilityhook.md` | `partially accurate` | `too lean` | Missing request-shaping and response-merge behavior. | `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/components/layouts/formGen/formgen.vue` |
| `reference/actions-processor/actions_overview/path.md` | `mostly accurate` | `right-sized` | The “must be last” rule is no longer a reliable blanket rule. | `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/js/actionsProcessor.js`, `/home/ubuntu/environment/BetterForms_DEV_V3/tests/webapp/js/actionsProcessor.path.test.js` |
| `reference/actions-processor/actions_overview/function-1.md` | `partially inaccurate` | `too verbose` | The error-contract documentation lags behind runtime behavior and fallback execution paths. | `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/js/actionsProcessor.js`, `/home/ubuntu/environment/BetterForms_DEV_V3/tests/webapp/js/actionsProcessor.executeFunction.test.js` |
| `reference/actions-processor/actions_overview/validate.md` | `partially inaccurate` | `too lean` | Failure-handling guidance is unclear relative to current runtime callback behavior. | `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/components/layouts/formGen/formgen.vue` |
| `reference/actions-processor/authentication-actions.md` | `mostly accurate` | `right-sized` | Needs token-source precedence, redirect notes, and alias coverage such as `authResendVerify`. | `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/js/actionsProcessor.js`, `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/js/store/modules/auth.js` |

## Hooks
| Page | Accuracy | Depth | Key Finding | Source of Truth |
| --- | --- | --- | --- | --- |
| `reference/hooksoverview/commonoverview.md` | `inaccurate` | `too lean` | `onLogin` redirect behavior is wrong and server/client flows are blurred together. Product clarification: hooks are server calls; actions and named actions are workflows that may include `runUtilityHook`. | `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/js/store/modules/auth.js`, `/home/ubuntu/environment/BetterForms_DEV_V3/tests/webapp/js/authRedirectOnLogin.test.js` |
| `reference/hooksoverview/hooks.md` | `partially outdated` | `right-sized` | Wizard-completion behavior and action-thread continuation need updating. | `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/components/layouts/formGen/formgen.vue`, `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/js/actionsProcessor.js` |
| `reference/hooksoverview/env_vars.md` | `partially inaccurate` | `right-sized` | Payload-shaping options are described incorrectly and omit merge implications. | `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/components/layouts/formGen/formgen.vue`, `/home/ubuntu/environment/BetterForms_DEV_V3/tests/webapp/formgen.model-merge.test.js` |

## Site and Page Settings
| Page | Accuracy | Depth | Key Finding | Source of Truth |
| --- | --- | --- | --- | --- |
| `reference/site-settings/navigationoverview.md` | `partially accurate` | `right-sized` | Current key set and action resolution are under-documented. | `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/components/masters/components/navbar.vue`, `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/components/masters/components/navbaritem.vue` |
| `reference/site-settings/slots-code-injection.md` | `outdated` | `too verbose` | Slot names and editor wording have drifted from the live product. Product clarification: the current UI location is `Styling > Slots`. | `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/components/masters/components/headerblock.vue`, `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/components/masters/app.vue` |
| `reference/site-settings/app-model.md` | `accurate` | `right-sized` | Strong concept page, but it needs current examples for app caching and app sync. | `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/js/cacher.js`, `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/components/layouts/formGen/formgen.vue` |
| `reference/form-settings/data-model.md` | `partially accurate` | `too lean` | Missing caching, payload-shaping, and app-sync behavior. | `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/js/cacher.js`, `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/components/layouts/formGen/formgen.vue` |
| `reference/form-settings/misc-page-settings.md` | `partially accurate` | `right-sized` | Needs a runtime-key map and clearer legacy-vs-current naming. | `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/components/layouts/form.vue`, `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/components/layouts/formGen/formwizard.vue` |
| `reference/form-settings/seo-meta-tags.md` | `accurate` | `right-sized` | One of the strongest pages; only minor edge-case clarifications are missing. | `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/components/layouts/formGen/custom/seoMeta.vue`, `/home/ubuntu/environment/BetterForms_DEV_V3/tests/serverapp/middleware/ssr.seoMeta.test.js` |

## BetterForms Elements
| Page | Accuracy | Depth | Key Finding | Source of Truth |
| --- | --- | --- | --- | --- |
| `reference/components-overview/betterforms-elements/README.md` | `partially accurate` | `too lean` | It needs to explain BetterForms wrappers vs VFG field docs vs compatibility aliases. | `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/components/layouts/formGen/formgen.vue`, `/home/ubuntu/environment/vue-form-generator/src/utils/fieldsLoader.js` |
| `reference/components-overview/betterforms-elements/selectEx.md` | `inaccurate` | `right-sized` | The field is described as `vue-multiselect`, but the current implementation is `bootstrap-select`. | `/home/ubuntu/environment/vue-form-generator/src/fields/optional/fieldSelectEx.vue` |
| `reference/components-overview/betterforms-elements/dateTimePicker.md` | `partially inaccurate` | `right-sized` | Plugin and value-shape details do not match the current code. | `/home/ubuntu/environment/vue-form-generator/src/fields/optional/fieldDateTimePicker.vue` |
| `reference/components-overview/betterforms-elements/masked.md` | `partially inaccurate` | `right-sized` | The page references the wrong masking implementation. | `/home/ubuntu/environment/vue-form-generator/src/fields/optional/fieldMasked.vue` |
| `reference/components-overview/betterforms-elements/googleAddress.md` | `partially inaccurate` | `right-sized` | More options are documented than the field currently exposes. | `/home/ubuntu/environment/vue-form-generator/src/fields/optional/fieldGoogleAddress.vue` |
| `reference/components-overview/betterforms-elements/image.md` | `partially inaccurate` | `right-sized` | The field is more editable/interactive than the page suggests. | `/home/ubuntu/environment/vue-form-generator/src/fields/optional/fieldImage.vue` |
| `reference/components-overview/betterforms-elements/input.md` | `partially accurate` | `right-sized` | Canonical syntax should be `fieldOptions` rather than top-level aliases. | `/home/ubuntu/environment/vue-form-generator/src/fields/core/fieldInput.vue`, `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/js/BF.js` |
| `reference/components-overview/betterforms-elements/textArea.md` | `partially accurate` | `right-sized` | Canonical keying should be around `fieldOptions`; the docs still imply more top-level keys. | `/home/ubuntu/environment/vue-form-generator/src/fields/core/fieldTextArea.vue`, `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/js/BF.js` |

## Authentication and APIs
| Page | Accuracy | Depth | Key Finding | Source of Truth |
| --- | --- | --- | --- | --- |
| `reference/authentication/basic-auth.md` | `mostly accurate` | `right-sized` | Core flow is solid, but current service boundaries and magic-link detail need surfacing. | `/home/ubuntu/environment/BetterForms_DEV_V3/serverapp/services/authentication/index.js`, `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/js/store/modules/auth.js` |
| `reference/authentication/user-registration.md` | `mostly accurate` | `right-sized` | Directionally correct, but actual token flows are split across user hooks and auth-management actions. | `/home/ubuntu/environment/BetterForms_DEV_V3/serverapp/services/user/hooks/index.js`, `/home/ubuntu/environment/BetterForms_DEV_V3/serverapp/services/authManagement/hooks/index.js` |
| `reference/users-and-authentication/custom-login-pages.md` | `outdated` | `too lean` | The slug/action matrix is stale and omits newer flows such as magic link and modern OAuth callback handling. | `/home/ubuntu/environment/BetterForms_DEV_V3/webapp/src/assets/js/actionsProcessor.js`, `/home/ubuntu/environment/BetterForms_DEV_V3/serverapp/services/authentication/index.js` |
| `apis-and-services/bf-streaming-api-llm-query.md` | `partially inaccurate` | `too verbose` | Request validation and streaming response behavior need to be updated from current server code. | `/home/ubuntu/environment/BetterForms_DEV_V3/serverapp/services/llmQuery/index.js`, `/home/ubuntu/environment/BetterForms_DEV_V3/tests/serverapp/services/llmQuery/index.test.js` |
| `apis-and-services/messaging/get-all-users-connected.md` | `partially inaccurate` | `right-sized` | Response shape and API key requirements are not documented accurately. | `/home/ubuntu/environment/BetterForms_DEV_V3/serverapp/services/messageUsers/index.js`, `/home/ubuntu/environment/BetterForms_DEV_V3/serverapp/services/messageAllUsers/index.js` |
| `reference/enterprise/bf-enterprise-documentation.md` | `partially inaccurate` | `right-sized` | Deployment guidance is drifting away from the current Redis and proxy configuration model. | `/home/ubuntu/environment/BetterForms_DEV_V3/config/default.json`, `/home/ubuntu/environment/BetterForms_DEV_V3/serverapp/shared-redis.js` |

## First-Pass Conclusion
- The audit method is working: the biggest issues are current-contract drift, incomplete runtime coverage, and content living in the wrong section or at the wrong depth.
- The strongest audited pages are usually those tightly coupled to current implementation and tests.
- The weakest audited pages are where docs inherit older UI names, older plugin assumptions, or stale service contracts.
