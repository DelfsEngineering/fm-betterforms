# Action Scripts

This tab is for managing <mark style="color:red;">local actions</mark> within the current page. You can:

* Create new scripts by clicking "+ New Script" in the first panel.
* The second panel shows your current script, where you can:
  * Add actions
  * Rearrange actions via drag-and-drop
* Edit action details in the third panel.
*   **JavaScript Editor**: If you have a `"function"` action, like the example below, click on the line number to open the JavaScript editor.

    <figure><img src="../../../../.gitbook/assets/Screenshot 2024-08-23 at 4.55.56 PM.png" alt=""><figcaption></figcaption></figure>
* Remember to save changes.

{% hint style="info" %}
**Priority of Local Scripts**: Local scripts take priority over global scripts. For example, if both local and global scripts define a namedAction `"someAction"`, the local script will be executed on this page.
{% endhint %}
