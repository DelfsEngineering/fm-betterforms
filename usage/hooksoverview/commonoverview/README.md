# Common Hooks

### onLogin

The `onLogin` hook is called when a user first log's into the system and is authenticated. If you add actions here you can over rise the default behaviour of BetterForms and navigate the user to any page you want based on your business logic. The default is to navigate the user to the `"/"` raw default home page. 

If the user ended up at the login page because they tried to access a page requiring authentication, they will be redirected to that page after they successfully login unless the this hook returns a `path` action, in which case that will take priority.

