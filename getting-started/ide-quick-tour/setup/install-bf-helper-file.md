# 2. Integrate Helper File with Your App

The BetterForms Helper file contains pre-built custom functions and scripts to accelerate development. This guide shows you how to install these components into your own FileMaker application file.

### What is the "Business File"?

The "business file" is your primary FileMaker application file that you are connecting to BetterForms. The custom functions and scripts only need to be installed in this single, primary file.

### Integration Steps

**1. Install Custom Functions**

1.  Open the **Helper File** on your server.
2.  Navigate to the **Integration** tab and click the button under **Step 1**. This copies the necessary custom functions to your clipboard.
3.  Open your business file, go to `File > Manage > Custom Functions...`, and paste the functions.

**2. Install Scripts**

1.  In the helper file's **Integration** tab, go to **Step 2**.
2.  Follow the on-screen instructions to generate the scaffold scripts. This will copy a script folder to your clipboard.
3.  Open the **Script Workspace** in your business file and paste the scripts.

**3. (Optional) Reconnect the Helper File for Local Debugging**

To run and debug hooks locally from the helper file, you need to connect it to your business file.

1.  In the **Helper File**, open the Script Workspace and find the script named `Hooks - Developer - Transmitter- CONFIGURE HERE`.
2.  Add your business file as an external data source.
3.  Edit the `Perform Script` step to call the `Betterforms - App - Receiver and Dispatch` script in your business file.

This allows the helper file to act as a proxy, which is useful for development and testing.

{% hint style="info" %}
Each FileMaker file that BetterForms interacts with must have the same user credentials. Your BetterForms user account should have \[Data Entry Only] permissions with XML and Data API extended privileges enabled.
{% endhint %}



