# $$BF\_App

This variable is outbound only for security reasons. You can use the FileMaker JSON functions to place data into **$$BF\_App** and the keys will be merged with the current App model.

When a key is configured with **Sync with app**, that key is synchronized with the current page model key of the same name.

If the same synced key is returned in both `$$BF_App` and `$$BF_Model` in a single hook response, the `$$BF_App` value is used as the final synced value.

For more information about how the app data model is used by BetterForms, see this page:

{% page-ref page="../../site-settings/app-model.md" %}





