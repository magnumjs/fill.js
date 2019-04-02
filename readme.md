# fill.js

## Simple JSON to HTML Templating

`npm install fill.js`

`npm test`

`npm run start` 
\\=> http://localhost:3000

## Browser install

`<script src="//unpkg.com/fill.js"></script>`

## Example

```html
<ul>
    <li><name/></li>
</ul>
```

```json
{"li": [
  {"name": "Joe"},
  {"name": "Mike"}
]}
```

```js
fill(Node, Data)
```

```html
<ul>
    <li>
        <name>Joe</name>
    </li>
    <li>
        <name>Mike</name>
    </li>
</ul>
```

[Try it out](https://jsbin.com/lekevemuku/edit?html,js,output)