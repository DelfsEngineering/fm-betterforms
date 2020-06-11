# Calling Named Actions from HTML Vue Events

There are many times you want to trigger an action script from an event within a block of HTML code.

Vue makes it easy to attach events onto HTML elements.

#### You can do direct mutations to the `model` :

```markup
<button @click="model.count = model.count + 1" >Do Something</button>
// increase the model.count by 1
```

#### You can run action scripts on events too:

```markup
<button @click="namedAction('handleButton')" >Do Something</button>
// runs the namedAction called 'handleButton'
```

### Advanced:

Some Vue components expect a pure function to be passed into the event handler key. For this situation, you cannot use the `namedAction` function directly, but instead just wrap it as follows:

```markup
<some-component @click="function(){ namedAction('handleEvents',{arguments:arguments})}" >Do Something</some-component>
// passes the arguments that the component passed, into all the actions.
// action.options.arguments will contan an array of the following
// pageSchema, model, action, app, arguments
```

