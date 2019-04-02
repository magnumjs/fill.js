import isCached from './isCached';
import {MAG} from './constants';

export default function addToNode(node, val) {
  //TODO: finer grain diffing, attach once
  if (isCached(node, val.outerHTML)) {
    return;
  }

  if (
    (!val.id && !node.childNodes[0]) ||
    (val.id && !document.getElementById(val.id)) ||
    (node.firstChild && !node.firstChild.isEqualNode(val))
  ) {
    // take children and add to properties

    if (node.hasChildNodes()) {
      // var clone = node.cloneNode(1);
      // clone[MAG] = {
      //   childof: pindex
      // };
    } else if (val[MAG] && val[MAG].scid) {
      clone = node.cloneNode(1);
      clone[MAG] = {
        childof: val[MAG].scid
      };
      mag._cprops[val[MAG].scid] = clone;
    }

    //remove, replace?
    //Remove children, call UNLOADERS?
    while (node.lastChild) {
      // removeNodeModule(node.lastChild)
      node.removeChild(node.lastChild);
      //  removeNode(node.lastChild);
    }

    //TODO: Call configs when adding?

    if (val[MAG] && val[MAG]['childof'] !== undefined) {
      node.innerHTML = val.innerHTML;

      var cid = val[MAG]['childof'];
    } else {
      node.appendChild(val);
    }
  }
}
