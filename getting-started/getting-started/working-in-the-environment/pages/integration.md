# Integration

The **Integration** tab allows you to manage hooks and validation settings for your page.

#### **General Hooks**

* **Enable onFormRequest Hook**: When enabled, this will trigger the `onFormRequest` hook script. For most pages that have data coming from the backend, this should be ticked on. The data will be integrated into the data model and will overwrite the development data (if present). For more details on hooks, you can reference this page: [Running Your First Hook](../../../integration/6.-run-your-first-hook.md).
* **Send Full Schema in Utility Hooks**: Sends the entire formSchema on hooks, providing more control but may increase transfer time on large schemas. Leave unchecked for better performance unless necessary.

#### **Validation**

* **Validate After Loaded**: Triggers validation routines as soon as the page is loaded. This should be enabled if any fields on the page have validators.
* **Validate After Changed**: Triggers validation routines as soon as a field is changed. This should also be enabled if fields have validators to ensure data integrity.
