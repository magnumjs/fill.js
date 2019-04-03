# fill.js

## Simple JSON to HTML Templating

`npm install fill.js`

`npm test`

`npm run start` 
\\=> http://localhost:3000

## Browser install

`<script src="//unpkg.com/fill.js"></script>`

## Examples

```html
<div id="root">
    <ul>
      <li>
        <name/>
      </li>
    </ul>
</div>
```
```js
const JSON = {
  "li": [{
    "name": "Joe"
  }, {
    "name": "Mike"
  }]
}

fill(document.getElementById("root"), JSON)
```
*inline html*
[Try it out](https://jsbin.com/kuwahirale/edit?html,js,output)

*dynamic node*
[Try it out](https://jsbin.com/lekevemuku/edit?html,js,output)