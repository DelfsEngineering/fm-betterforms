# 5.1 Understanding & Managing Environments (In-Depth)

In BetterForms, an "environment" represents a distinct instance of your application. The most common setup includes three environments:

* **Development:** Your primary workspace for building, testing, and debugging new features.
* **Staging:** A pre-production environment that mirrors your live setup, used for final testing and quality assurance before deploying to users.
* **Production:** The live version of your application that your end-users interact with.

Each environment is independent, with its own database connections, settings, and deployed version, allowing for a safe and organized development workflow.

## Managing Your Environment

Each environment has a dropdown menu (indicated by the ellipsis) that allows you to manage it:

<figure><img src="../../../.gitbook/assets/Screenshot 2024-07-17 160043 (1) (1).png" alt=""><figcaption></figcaption></figure>

*   **Edit**: Modify the environment settings, such as its name, stage, domains, and credentials. You can lock the environment to prevent changes (usually for the production environment) and turn on the development tools (usually for the development environment).

    * **Lock Environment**: Prevent any changes to this environment by locking it.
    * **Development Tools**: Enable this option to view development tools such as app and model data on the site page.

    <figure><img src="../../../.gitbook/assets/Screenshot 2024-07-17 160147.png" alt=""><figcaption></figcaption></figure>

    <figure><img src="../../../.gitbook/assets/image (5) (2).png" alt=""><figcaption></figcaption></figure>
*   **Deploy**: Move the current version of your app to the selected stage (Development, Staging, Production).

    <figure><img src="../../../.gitbook/assets/Screenshot 2024-07-17 160303.png" alt=""><figcaption></figcaption></figure>

    <figure><img src="../../../.gitbook/assets/Screenshot 2024-07-17 160256.png" alt=""><figcaption></figcaption></figure>

    After a deployment completes, BetterForms can notify the live app that a new deployment is available. By default, the client shows a refresh-needed banner so users can reload safely.

    If your app defines the global named action `onDeployPost`, BetterForms runs that browser-side workflow instead of the shared fallback banner. This is available in **Editor v125+**. For the full behavior and payload details, see [Named Actions (Action Scripts)](../../../reference/actions-processor/actions_named.md).
*   **Rollback**: Revert to a previous version of the environment if needed.

    <figure><img src="../../../.gitbook/assets/Screenshot 2024-07-17 160349.png" alt=""><figcaption></figcaption></figure>

By utilizing these options, you can effectively manage and maintain the different stages of your app's lifecycle, ensuring a smooth development and deployment process.
