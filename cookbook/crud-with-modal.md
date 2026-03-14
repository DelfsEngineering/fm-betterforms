# Building a complete CRUD interface with a modal form

This recipe has not been written yet.

For now, use these pages to build the same pattern:

- [Card Modals](../reference/form-settings/card-modals.md)
- [Data Model](../reference/form-settings/data-model.md)
- [Authentication Actions](../reference/actions-processor/authentication-actions.md)
- [Adding and Configuring Buttons](../getting-started/ide-quick-tour/4.-common-customizations-and-expanding-your-app/4.1-adding-and-configuring-buttons-page-builder.md)

Typical CRUD-with-modal flow:

1. Open a modal from a table row or button.
2. Pass the selected record identifier into the modal page.
3. Load the record in `onFormRequest` when needed.
4. Edit the record in the modal page model.
5. Save changes with a button action such as `runUtilityHook`.
6. Refresh or update the parent page after the modal closes.