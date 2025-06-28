# 2.1 Create an App (Site) in the IDE

After [setting up your foundation](../setup/configure-fm-server.md) (including configuring your FileMaker Server and adding it to BetterForms), you're ready to create your first web application, which BetterForms refers to as an "App" or "Site".

## What is an "App" or "Site" in BetterForms?

An App/Site in BetterForms is the front-end code and configuration for an entire web application. Apps can have multiple environments (e.g., development, staging, production), where each environment is technically a separate instance of the app with its own settings and data connections.

To learn more about the comprehensive settings available for an App/Site, you can refer to the [Site Settings Reference](../../reference/site-settings/README.md) documentation later.

## Steps to Create Your New App

1.  **Navigate to the Apps Menu:**
    In the BetterForms IDE (usually at `https://app.fmbetterforms.com/#/sites`), locate and click the **"Create / New App"** button (or a similar button like **"Build your first app"** if you're a new user).
    <figure><img src="../../.gitbook/assets/image (19).png" alt=""></figure>


2.  **Choose a Starting Point (Optional: Using a Template):**
    *   You may be presented with an option to start from scratch or use a pre-built template.
    *   If templates are available, you can browse them, view details (often in a popup window), and select one that suits your needs by clicking **"Use This Template"**.
    <figure><img src="../../.gitbook/assets/image (18).png" alt="Template Selection Page"></figure>
    *   {% hint style="success" %}
        **Template Documentation:** Some templates may have additional specific documentation. [Check for template-specific guides here](../../reference/guides-and-integrations/README.md).
        {% endhint %}

3.  **Input App Details:**
    Whether starting from scratch or a template, you'll need to provide some basic details for your new app:
    <figure><img src="../../.gitbook/assets/image (1) (1) (1) (1) (1) (1).png" alt="Input App Details Form"></figure>
    *   **App Name:** This is the internal name displayed in the BetterForms editor and on your dashboard.
    *   **Public Name:** This is the name that can be displayed on your live site (e.g., in the browser title bar). Keep it concise; you can usually change it later.
    *   **Domain Name:** Enter the desired subdomain for your app (e.g., `myawesomeapp`.bfm.app). The system may check for availability. You can configure a custom domain later.
    *   **Select Your Server:** From the dropdown list, choose the FileMaker Server connection you configured in [Phase 1.3](../setup/add-server-to-bf.md). If you haven't added your server yet, you might be prompted or need to go back to that step. *(The UI for this might be integrated with the "Input App Details" form or a subsequent step).*


4.  **Configure Core App Settings (often on a "General" tab or similar after initial creation):**
    *   **Set Server Credentials:** Click the **"Set Credentials"** button (or a similar section, possibly per environment) to securely enter the username and password for the FileMaker account BetterForms will use to connect to your database. This user should have the necessary privileges as outlined in the server setup.
    *   **Common Hook Set Name:** Enter a name for the common hook FileMaker script set for this app. For your first app, using "app" (or a similar default like "bf_hooks") is typical. This refers to a set of FileMaker scripts that BetterForms will call. You were introduced to hooks in [Phase 1.2](../setup/install-bf-helper-file.md).
    *   **Enable Dev Mode (Recommended for Development):** While testing and developing, it's helpful to have **"Dev Mode"** enabled (this might be an environment-level setting). This often provides more detailed error messages and disables certain caching.

5.  **Save and Prepare:**
    *   Save your app settings. You should see your new app preparing its development environment.
    *   If you selected a server during the initial details input, the connection might be tested here. If server selection is a post-creation step, ensure you assign your configured server to the appropriate environment.

6.  **Set Helper File Credentials (Environment Specific):**
    *   Once the app environment is available (e.g., "development"), navigate to its specific settings. This is often done by clicking a menu (e.g., three dots) associated with the app's development environment and selecting "Credentials" or "Helper File Credentials".
    *   Enter the name of your FileMaker helper file (e.g., `YourSolution_BF_Helper.fmp12`) and the FileMaker account credentials that BetterForms will use to interact with the scripts in this helper file (as set up in [Phase 1.2](../setup/install-bf-helper-file.md)).

7.  **Test Integration (Optional but Recommended):**
    *   You can often test the basic API integration by navigating to `https://YOURDOMAIN/api` (replace `YOURDOMAIN` with your app's assigned domain). If you see a JSON object (often a success message or status), your basic connection is working.

You have now created your first app structure! The next step is to [create your first page within this app](./create-page.md).
