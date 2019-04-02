// return just the child nodes that are elements
export default function childElements(node) {
  var elements = [];
  if (node) {
    var children = node.childNodes;
    if (children) {
      for (var i = 0; i < children.length; i += 1) {
        if (children[i].nodeType === 1) {
          elements.push(children[i]);
        }
      }
    }
  }
  return elements;
}