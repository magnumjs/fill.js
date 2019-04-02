import fillRun from '../src/main'
import html2dom from '../src/utils/html2dom'

const HTML = `
<ul><li><name/></li></ul>
`

const JSON = {"li": [
    {"name": "Joe"},
    {"name": "Mike"}
]}

test("simple list", ()=>{
    const node = html2dom(HTML)
    expect(node.querySelectorAll("li").length).toEqual(1)
    fillRun(node, JSON)
    expect(node.querySelectorAll("li").length).toEqual(2)
})