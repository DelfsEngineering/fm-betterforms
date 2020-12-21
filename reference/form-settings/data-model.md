# Data Model

The **Data Model** tab contains all data that can be seen by the current page in JSON format.

The **Production data** field is the JSON object that will load in the page's data model when the page is first loaded. This data is sent to your FMS in the onFormRequest scoped hook.

**Development data** is only seen by the BetterForms IDE. The JSON object in this field is merged into the production data when previewing things items like the HTML editor. This allows you to work with separate data in the schema editor

By default, the entire data model of a page is passed to your FMS during a scoped hook. To modify this behaviour, see this page:

{% page-ref page="../hooksoverview/env\_vars.md" %}

### 

