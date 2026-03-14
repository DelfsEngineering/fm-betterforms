# Action Scripts

This tab is for managing <mark style="color:red;">local actions</mark> within the current page. You can:

* Create new scripts by clicking "+ New Script" in the first panel.
* The second panel shows your current script, where you can:
  * Add actions
  * Rearrange actions via drag-and-drop
* Edit action details in the third panel.
*   **JavaScript Editor**: If you have a `"function"` action, click the gutter / line number next to the `function` key to open the JavaScript editor.
*   **Disabled**: Temporarily disable a script without deleting it.
*   **Run**: Execute the script immediately for testing purposes.
*   **Delete**: Permanently remove the script.

By organizing your logic into named scripts, you can create more modular, reusable, and maintainable actions within your BetterForms pages.

For example, when a `function` action is selected in the script editor, clicking the line number next to the `function` key opens the JavaScript editor modal:

<figure><img src="../../../../.gitbook/assets/Screenshot 2024-08-23 at 4.55.56 PM.png" alt="Click the line number next to the function key to open the JavaScript editor"><figcaption></figcaption></figure>

{% hint style="info" %}
**Priority of Local Scripts**: Local scripts take priority over global scripts. For example, if both local and global scripts define a namedAction `"someAction"`, the local script will be executed on this page.
{% endhint %}
