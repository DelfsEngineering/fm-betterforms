# \$$BF\_Model

This global variable contains the data model for the user's current page. You can read data from it or write data back into it using FileMaker's built-in JSON functions.

By default, the entire contents of the **\$$BF\_Model** variable is sent back to the client and **merged** with their existing data when the hook returns. This preserves client-side properties while updating server-controlled values. To modify this behavior (e.g., to force a complete replacement), see the **\$$BF\_State** page.

{% content-ref url="usdusdbf_state.md" %}
[usdusdbf\_state.md](usdusdbf\_state.md)
{% endcontent-ref %}

