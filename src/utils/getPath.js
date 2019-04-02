import getUid from './getUid'
import {MAG} from './constants'

let fhCache = [];

export default function getPath(node, i, key) {
  var uid = getUid(node);
  // if (xpathCache[uid]) return xpathCache[uid];
  if (fhCache[uid]) return fhCache[uid];

  var num = +key === +key ? i + key : i;
  // var name = typeof fill.id == 'object' ? fill.id.tagName : fill.id;
  var extr = typeof key == 'string' ? key.split(')')[1] + '/' : '/';
  var p = 'id("' + name + '")' + extr + node.tagName + '[' + num + ']';

  return (fhCache[uid] = node[MAG].xpath = p);
}