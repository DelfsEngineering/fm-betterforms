# Introduction

**FMBetterForms** is a high performance single page web application \(SPA\) that allows FileMaker developers easy access to highly scalable data capturing and rendering.

## Features

* **Fully responsive UI **

  * allowing desktop, tablet and phone compatible UX

* **Mutli-mode Authentication System **

  * Authenticate via URL hash,

  * Authenticate via Username \(email\) and password

  * Enable web sign up, account creation

  * Developer Hooks for password reset and forgot password

* **Forms Processing and workflow engine**

  * Multiple form types including  _plain_ and _multi-step wizard_ and _Master-Detail_ base layouts.

  * Wizard form type supports multiple pages

  * In browser client JS validation for common needs

  * Optional server-side validation on page / tab change of form via dev hooks \(in FileMaker\)

  * Form editor and options setting via FM controller app

* **Developer Customization **

  * Callback hooks for any API needs including:

    * **onLogin**

    * **onTabChange** \(form\)

    * **onComplete** \(form\)

    * **others**

* Various Summary modals and alert options allowing you to pass detailed HTML messages back to the user \(e.g. 'you have an error with your email address'\)

* Post hook routing and state management - Allowing developer to control users routing after a hook \(e.g. go to tab \#2\)

* Developer legacy app local hooks  - hooks have been designed to run local to the existing developers app. This allows the BetterForms controller file to be easily updated.

* **Installation and Deployment **

  * Single FMS hosted controller file

  * Web app deployed on server less hosting provider e.g. _Docker_ \(carious\) , \_Zeit.co No\_w etc.
  
  
  
  
 



