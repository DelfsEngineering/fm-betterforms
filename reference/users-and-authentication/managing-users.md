# Managing User Accounts

Since your BetterForms web users are stored in your helper file, you will need to add the helper file as an **external data source** for your legacy FileMaker file. This will allow you to run the API scripts provided in the Helper file that help manage users.

{% hint style="info" %}
Download the BetterForms Demo file for an example FileMaker script that shows you how to call the User API script
{% endhint %}

## The User object

All of the requests below will refer to the **user object**, which is simply the expected JSON object expected by this API script to represent a user.

```yaml
{
  "id": "",
  "email": "", //user's email address
  "avatar": "", //URL to an image to be used as an avatar
  "isEnabled": true,
  "isVerified": true
}
```

## Methods

### Create a new User

To create a new user, simply pass a JSON object **without** an `id` key. `isEnabled` and `isVerified` will default **false** if not set.

The script will return the full object of the user, which will include its new id.

### Read a User

To read a user's details, pass in **ONLY** the `id` key. No data will be updated, but the full user's object will be returned.

### Update a User

To update a user, pass in any key\(s\) that you want to update **AND** the id of the user.

### Delete a User

To delete a user from the Helper file, pass the user's id **AND** an additional `isDelete` flag set to **true**.

## Error Handling

Use the **Error.isError** custom function to check the script result and ensure that is ran properly.

