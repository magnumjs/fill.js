import isHTMLEle from './isHTMLEle'
import getPathIndex from './getPathIndex'
import findAllAttributes from './findAllAttributes'
import fillAttributes from './fillAttributes'
import findNonAttributes from './findNonAttributes'
import addToNode from './addToNode'

export default function fillNode(node, data, p, key) {
  var attributes;
  var attrValue;

  var element;
  var elements;

  var tagIndex = getPathIndex(p);

  if (data && isHTMLEle(data)) {
    addToNode(node, data);
    return;
  }

  if (typeof data === 'function') {
    // ignore functions
    return functionHandler(data, node, tagIndex, p);
  }

  // if the value is a simple property wrap it in the attributes hash
  if (typeof data !== 'object')
    return fillNode(
      node,
      {
        _text: data
      },
      p
    );


  // find all the attributes
  attributes = findAllAttributes(node, data);

  // fill in all the attributes
  if (attributes) {
    fillAttributes(node, attributes, p, key);
  }

  // look for non-attribute keys and recurse into those elements
  findNonAttributes(node, data, p);
}
