# Working with HTML

The BetterForms framework allows you to dig deep into the low levels of HTML code and still keep the benefits of a framework and reactivity. Many components have html compatible keys or accept slots that allow HTML to be rendered. BetterForms uses [VueJS](https://vuejs.org/) under the hood to keep all the elements working together.

[Vue - BF CheatSheet](https://www.dropbox.com/s/s9f7vgzclg86ke7/Vue-Essentials-Cheat-Sheet.pdf?dl=0) download

## Adding Reactivity to HTML code

### Rendering data in HTML

To directly render model data within HTML code use the Vue double curly braces syntax as follows:

`<div>{{ model.myDataKey }}</div>` --&gt; This is my Data

Rendering

