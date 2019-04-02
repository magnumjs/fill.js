// freeze the NodeList into a real Array so it can't update as DOM changes
export default function nodeListToArray(nodeList) {
  var temp;

  // wrap single item into an array for iteration
  // NOTE: can't use _isArray here, because it could be a NodeList (array-ish)
  if (nodeList.length == null) {
    nodeList = [nodeList];
  }

  // convert array-like object into a real array
  if (!Array.isArray(nodeList)) {
    temp = [];
    for (var i = 0; i < nodeList.length; i += 1) {
      // Note: occassionaly jsdom returns undefined elements in the NodeList
      if (nodeList[i]) {
        temp.push(nodeList[i]);
      }
    }
    nodeList = temp;
  }

  return nodeList;
}