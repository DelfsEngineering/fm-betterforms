# Page Info

The **Page Info** tab contains essential settings and metadata for your page.

* **UUID**: A unique identifier for the page.
* **Description**: You can add a description for internal reference (not displayed to the user).
* **Scoped Hook Set Name**: Specify the hook set name for scoped hooks. [Learn more about hooks](../../core-concepts/hooks-intro.md).
* **Authentication**: Toggle authentication requirements for the page.
* **Delete Page**: Permanently delete the page.

#### **Misc Form Settings**

All settings for your page are defined in JSON format under Misc Form Settings. This includes:

* **namedActions**: These are local scripts defined in JSON, specifying action like <mark style="color:red;">`onFormLoad`</mark>. While it's recommended to edit your scripts and actions in the **Actions** tab, you can also manage them directly in JSON format here.
* **Style Classes**: Customize the styling for the body and page using `styleClassesBody` and `styleClassesPage`.
* **Other Settings**: Control behaviors like `requestHook`, `sendFullSchema`, and `validateOnBack`. These settings correspond to options available in the **Integration** tab, such as `onFormRequest` and `Send Full Schema in Utility Hooks`. Changes made here will affect the behavior as if they were toggled in the Integration tab.
