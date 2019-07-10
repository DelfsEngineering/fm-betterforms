# Authentication

BetterForms has several authentication strategies. These fall into internal and external systems.

## Internal Basic Authentication

This authentication strategy uses an internal `users` table with email and hashed password. 

### Accessing Restricted Pages

If you have enabled authentication for a specific page if an unauthenticated user attempts to access that page they will be redirected to your login page. After they login they will be forwarded to the initial page they requested. If the `onLogin` hook returns a  `path` action, then that initial page will not be followed and the action will determine the users next page.

### 

