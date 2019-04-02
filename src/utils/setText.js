import isCached from './isCached'

export default function setText(node, text) {
  // make sure that we have a node and text to insert
  if (!node || text == null || isCached(node, text)) {
    return;
  }

  var val = String(text);

  // SELECT|INPUT|TEXTAREA
  // now add the text
  if (node.nodeName === 'INPUT') {
    // special case for input elements
    if (~['radio', 'checkbox'].indexOf(node.type)) {
      //might be in a group
      // search fill.id for name
      //TODO: should be only within parent node in DATA path NOT root ID
      if (node.name) {
        var items = mag
          .getNode(fill.id)
          .querySelectorAll('[name=' + node.name + ']');
        if (items.length > 1) {
          // select item with matching value
          for (var item of items) {
            if (item.value == val) {
              item.checked = true;
              break;
            }
          }
        }
      }
    } else {
      // var start=-1, end=-1;
      // if (~node.type.indexOf(['text', 'search', 'password', 'tel', 'url'])) {
      //   start = node.selectionStart;
      //   end = node.selectionEnd;
      // }

      //&& mag.doc.activeElement !=node ?
      if (val != node.value) node.value = val;
      //reset selection cursor from dynamic changes if diff & allowed type
      //if(~start) node.setSelectionRange(start, end);
    }
  } else if (node.nodeName !== 'SELECT') {
    // create a new text node and stuff in the value
    if (node.firstChild) {
      node.firstChild.textContent = val;
    } else {
      node.appendChild(node.ownerDocument.createTextNode(val));
    }
  }

  if (node.nodeName === 'SELECT' && val) {
    //TODO: array of things for "multiple" select
    node.value = val;
  }
}