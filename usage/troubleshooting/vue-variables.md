# Vue Variables

This page lists key variables and paths used throughout the application. These are commonly accessed state values and route properties that are essential when developing or debugging the app.

**Commonly Used Vue Variables**

* `vueapp.$store.state.wndw.windows[0].formSchema.model`\
  &#xNAN;**→ Path to the current form model.** Use this to access or manipulate form data.
* `vueapp.$store.state.site.content.app`\
  &#xNAN;**→ Path to the main app model.** This holds core app content and settings.
* `vueapp.$store.state.auth.authenticated`\
  &#xNAN;**→ Boolean flag to check if the user is authenticated.**
* `vueapp.$route.path`\
  &#xNAN;**→ Current route path.** Useful for navigation-related logic or conditional rendering.
* `vueapp.$store.state.site.content.devMode`\
  &#xNAN;**→ Toggles developer mode.** Enable or disable development-specific features.
