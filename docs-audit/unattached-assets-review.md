# Unattached Assets Review

This note tracks asset cleanup after removing exact duplicate files whose content already exists in a referenced copy.

Latest verification:

- Corrected published asset paths in `README.md`, `guides/html-and-vuejs.md`, `getting-started/ide-quick-tour/environment/pages-deep-dive/page-data-model-config.md`, and `reference/enterprise/bf-enterprise-documentation.md`.
- Removed the final duplicate logo copy at `.gitbook/assets/1486254174620.png`.
- Re-checked all published markdown image references and the true orphan count is now `0`.

## Safe Duplicates Removed

These files were deleted because they were exact content duplicates of an asset that is already attached in published docs:

- `.gitbook/assets/open html (1) (1) (1).jpg`
- `.gitbook/assets/open html (1).jpg`
- `.gitbook/assets/open html (1) (1).jpg`
- `.gitbook/assets/open-html (1).jpg`
- `.gitbook/assets/2019-07-15 15.47.39.gif`
- `.gitbook/assets/2sknsrpi9d (1).gif`
- `.gitbook/assets/2sKnsRPI9D (1) (1).gif`
- `.gitbook/assets/2sknsrpi9d.gif`
- `.gitbook/assets/2sKnsRPI9D (1).gif`
- `.gitbook/assets/Vue-Essentials-Cheat-Sheet.pdf`
- `.gitbook/assets/Screen Shot 2020-06-19 at 6.28.57 PM.png`
- `.gitbook/assets/Screen Shot 2017-09-06 at 11.39.51 PM.png`
- `assets/Screen Shot 2017-09-06 at 11.39.51 PM.png`
- `.gitbook/assets/Screen Shot 2018-01-19 at 6.47.50 PM.png`
- `assets/Screen Shot 2018-01-19 at 6.47.50 PM.png`
- `.gitbook/assets/Screen Shot 2017-11-10 at 1.12.57 PM.png`
- `assets/Screen Shot 2017-11-10 at 1.12.57 PM.png`
- `.gitbook/assets/Screen Shot 2017-09-29 at 5.23.15 PM.png`
- `assets/Screen Shot 2017-09-29 at 5.23.15 PM.png`
- `.gitbook/assets/Screen Shot 2018-11-28 at 12.39.43 AM.png`
- `.gitbook/assets/html editor.png`
- `.gitbook/assets/Screen Shot 2018-07-06 at 1.11.03 PM.png`
- `assets/Screen Shot 2018-07-06 at 1.11.03 PM.png`
- `.gitbook/assets/screen_shot_2020-05-21_at_11.18.58_am (1).png`
- `.gitbook/assets/Screen Shot 2017-10-09 at 5.34.44 PM.png`
- `assets/Screen Shot 2017-10-09 at 5.34.44 PM.png`
- `.gitbook/assets/Public Client Key (1) (1).png`
- `.gitbook/assets/Public Client Key (1).png`
- `.gitbook/assets/Public Client Key.png`
- `.gitbook/assets/public-client-key (1).png`
- `.gitbook/assets/ProductionFlo System  (1) (1).png`
- `.gitbook/assets/ProductionFlo System  (1) (2).png`
- `.gitbook/assets/ProductionFlo System  (1) (3).png`
- `.gitbook/assets/ProductionFlo System  (1) (4).png`
- `.gitbook/assets/ProductionFlo System  (1).png`
- `.gitbook/assets/ProductionFlo System  (2).png`
- `.gitbook/assets/ProductionFlo System  (3).png`
- `.gitbook/assets/ProductionFlo System .png`
- `.gitbook/assets/productionflo-system (1).png`
- `.gitbook/assets/productionflo-system (2).png`
- `.gitbook/assets/productionflo-system (3).png`
- `.gitbook/assets/Screen Shot 2018-12-09 at 7.40.47 PM (1) (1).png`
- `.gitbook/assets/Screen Shot 2018-12-09 at 7.40.47 PM (1).png`
- `.gitbook/assets/Screen Shot 2018-12-09 at 7.40.47 PM.png`
- `.gitbook/assets/screen-shot-2018-12-09-at-7.40.47-pm (1).png`
- `.gitbook/assets/Screenshot 2024-07-17 160043.png`

## Reattached After Visual Review

These files were visually matched to a suitable page and reattached:

- `.gitbook/assets/oauth-provider-settings.png`
  - attached to `guides/integrations/setting-up-auth0.md`
  - shows the BetterForms app-environment menu with `App Settings`
- `.gitbook/assets/oauth-credentials.png`
  - attached to `guides/integrations/setting-up-auth0.md`
  - shows BetterForms OAuth provider credentials fields for Auth0
- `.gitbook/assets/oauth-redirect-uri.png`
  - attached to `guides/integrations/setting-up-auth0.md`
  - shows the FileMaker script list with `BF - onBeforeRegistration` selected
- `.gitbook/assets/public-client-key.png`
  - attached to `reference/components-overview/payment-gateways/authorize.md`
  - shows the Authorize.net public client key page
- `.gitbook/assets/Screenshot 2024-07-17 160147.png`
  - attached to `getting-started/ide-quick-tour/environment/managing-environments-deep-dive.md`
  - shows environment general settings with the `Development Tools` toggle
- `.gitbook/assets/Screenshot 2024-08-23 at 4.05.28 PM.png`
  - attached to `reference/hooksoverview/env_vars.md`
  - shows the `Integration` tab with `Send full schema in utility hooks`
- `.gitbook/assets/Screenshot 2024-07-17 160043 (1).png`
  - attached to `getting-started/ide-quick-tour/environment/managing-environments-deep-dive.md`
  - shows the environment card menu with Edit, Deploy, and Rollback
- `.gitbook/assets/Screenshot 2024-07-17 160256.png`
  - attached to `getting-started/ide-quick-tour/environment/managing-environments-deep-dive.md`
  - shows the deploy-stage modal
- `.gitbook/assets/Screenshot 2024-08-23 at 4.55.56 PM.png`
  - attached to `getting-started/ide-quick-tour/environment/pages-deep-dive/page-action-scripts.md`
  - shows clicking the `function` line to open the JavaScript editor
- `.gitbook/assets/screen-shot-2018-12-09-at-7.40.47-pm.png`
  - attached to `reference/security/custom-domains.md`
  - shows the DNS provider screen with both CNAME and TXT records
- `.gitbook/assets/productionflo-system.png`
  - attached to `reference/hooksoverview/commonoverview.md`
  - shows the browser to BetterForms to FileMaker hook flow

## Deleted After Visual Review

These files were intentionally removed after manual review because they were stale, redundant, or no longer useful in the current docs:

- `.gitbook/assets/bf-overview.png`
- `.gitbook/assets/screen-shot-2018-08-20-at-9.08.57-pm.png`
- `.gitbook/assets/Screen Shot 2018-08-20 at 9.08.57 PM.png`
- `.gitbook/assets/Screenshot 2024-08-21 151451.png`
- `.gitbook/assets/Screenshot 2024-08-21 151827.png`
- `.gitbook/assets/BF Overview (1) (1).png`
- `.gitbook/assets/BF Overview (1).png`
- `.gitbook/assets/BF Overview.png`
- `.gitbook/assets/bf-overview (1).png`

## Remaining Orphans

These files are not currently attached in docs and were not auto-removed. They require visual inspection before any deletion or reassignment:

- `.gitbook/assets/image (1) (1) (1) (1) (1) (1) (1).png`
- `.gitbook/assets/image (1) (1) (1) (1) (1) (1).png`
- `.gitbook/assets/image (1) (1) (1) (1) (1).png`
- `.gitbook/assets/image (1) (1) (1) (1).png`
- `.gitbook/assets/image (10).png`
- `.gitbook/assets/image (11).png`
- `.gitbook/assets/image (12).png`
- `.gitbook/assets/image (13).png`
- `.gitbook/assets/image (14).png`
- `.gitbook/assets/image (15).png`
- `.gitbook/assets/image (16).png`
- `.gitbook/assets/image (17).png`
- `.gitbook/assets/image (18).png`
- `.gitbook/assets/image (19).png`
- `.gitbook/assets/image (2) (1).png`
- `.gitbook/assets/image (2).png`
- `.gitbook/assets/image (20).png`
- `.gitbook/assets/image (21).png`
- `.gitbook/assets/image (22).png`
- `.gitbook/assets/image (3) (1).png`
- `.gitbook/assets/image (3).png`
- `.gitbook/assets/image (4).png`
- `.gitbook/assets/image (5) (1) (1).png`
- `.gitbook/assets/image (5) (1).png`
- `.gitbook/assets/image (5).png`
- `.gitbook/assets/image (6).png`
- `.gitbook/assets/image (7).png`
- `.gitbook/assets/image (8).png`
- `.gitbook/assets/image (9).png`
- `.gitbook/assets/image.png`
- `.gitbook/assets/Untitled (1) (1).png`
- `.gitbook/assets/Untitled (1).png`
- `.gitbook/assets/Untitled 1 (1).png`
- `.gitbook/assets/Untitled 1 (2).png`
- `.gitbook/assets/Untitled 1 (3).png`
- `.gitbook/assets/Untitled 10.png`
- `.gitbook/assets/Untitled 11.png`
- `.gitbook/assets/Untitled 12.png`
- `.gitbook/assets/Untitled 13.png`
- `.gitbook/assets/Untitled 2 (1).png`
- `.gitbook/assets/Untitled 2 (2).png`
- `.gitbook/assets/Untitled 3 (1).png`
- `.gitbook/assets/Untitled 4 (1).png`
- `.gitbook/assets/Untitled 5 (1).png`
- `.gitbook/assets/Untitled 6 (1).png`
- `.gitbook/assets/Untitled 7.png`
- `.gitbook/assets/Untitled 8.png`
- `.gitbook/assets/Untitled 9.png`
- `.gitbook/assets/user experience checklist.pdf`
- `assets/image1.PNG`
- `assets/Screen Shot 2017-12-16 at 11.35.45 PM.png`
- `assets/Screen Shot 2017-12-16 at 4.12.10 PM.png`
- `assets/Screen Shot 2018-01-03 at 7.46.27 PM.png`
- `assets/Screen Shot 2018-03-21 at 9.52.25 AM.png`
