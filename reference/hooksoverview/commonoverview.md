# Common Hooks

### onLogin

The `onLogin` hook is called when a user first log's into the system and is authenticated. If you add actions here you can over rise the default behaviour of BetterForms and navigate the user to any page you want based on your business logic. The default is to navigate the user to the `"/"` raw default home page. 

If the user ended up at the login page because they tried to access a page requiring authentication, they will be redirected to that page after they successfully login unless the this hook returns a `path` action, in which case that will take priority.



`commonHookSetName` The common hook set name is use in routing script requests \( Hooks \) from the web application into your FileMaker database. Typically this name reflects the general purpose of the app. Eg `portal` `admin` `cart` 

The BetterForms hooks scripts will parse this out and route script execution accordingly. By having a commonHookSetName you are able to have several independent front end applications connect to a single FileMaker file back end. An example is a Customer Sales Panel and a Staff HR Portal.

### onLogin

This hook is called when a user logs in successfully.You can inject actions and and have full access to the user object .

You should \(usually\) have a path action in this hook script. If you do not, the user will be stuck at the login prompt page. Logging in does not automatically take the user to a default page.

### onRegistration

Called when a user registers. You can inject actions and have access to the user model.

