# 🏆 Features

**FMBetterForms** is a high-performance single-page web application (SPA) platform that allows FileMaker developers to build modern responsive web apps without learning all new technology.

**User Interface**

* **Fully Responsive UI**: Compatible with desktop, tablet, and mobile devices for an optimal user experience.
  * Build installable progressive web apps (PWA's)
* **Custom Themes**: Create and apply custom themes to enhance the visual appeal of your apps.

**Authentication and Security**

* **Multi-Mode Authentication System**:
  * Authenticate via URL hash.
  * Authenticate via username (email) and password.
  * Enable web sign-up and account creation.
* **Developer Hooks**: For password reset, forgot password, and email verification.
* **Role-Based Access Control**: Manage user permissions based on roles.
* **House / Custom Domains** Bring your own custom domain or use a house one.

**Pages and Workflow**

* **Page Design and Workflow Engine**:
  * Multiple page types including plain, multi-step wizard, and Master-Detail layouts.
  * In-browser client-side JavaScript validation for common needs, including custom validation.
  * Optional server-side validation on page/tab change via developer hooks (in FileMaker).
* **Actions Processing Engine**:
  * Allows script-like workflow execution.
  * Automate nearly all aspects of the web application.
  * Actions can be initiated from both the client browser and the FileMaker Server application.

**Data Handling and Integration**

* **Reactive JavaScript Calculation Engine**:
  * Perform on-the-fly reactive calculations for nearly any element or parameter.
  * Write full JavaScript functions that can be called from any action.
* **Data API Gateway**: Integrate with the Data API.
* **XML Gateway**: Integrate with the XML gateway.
* **Multiple Payment Gateways**: Monetize your app with various payment options.

**User Interaction**

* **Summary Modals and Alert Actions**: Facilitate interaction and communication with users.
* **Place Layouts within Modal Card Windows**: Enhance user experience with organized content display.

**Development and Deployment**

* **Hooks Scripts**: Run locally within the existing developer's app, keeping all business logic together.
* **No Installation and Deployment**:
  * Cloud-hosted PaaS application.
  * Single FileMaker Helper file installed on the target FMS box.
  * Seamless updates and rollbacks of your app's base code.
* **Multistage Development Environments**:
  * Develop in an add development environment.
  * Deploy to testing and staging environments.
  * Each environment can have its own or shared FileMaker servers and files.

**Additional Features**

* **Internationalization**: Use the `BF.i18n('key')` function for multi-language support.
* **Analytics and Reporting**: Track app visitation and user interactions for insights.
