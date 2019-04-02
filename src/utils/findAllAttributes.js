import {MAG} from './constants';

export default function findAllAttributes(node, data) {
  var attributes;

  for (var key in data) {
    var value = data[key];

    // null values are treated like empty strings
    if (value === undefined) {
      value = '';
    } else if (value === null && ['onunload'].indexOf(key) === -1) {
      // TODO: delete case
      // special case delete all children if equal to null type

      node[MAG].detached = node[MAG].detached || [];

      node[MAG].detached[key] = 1;

      removeChildren(node, key);
    } else if (node[MAG].detached && node[MAG].detached[key]) {
      reattachChildren(node, key, value.nodeType);
      node[MAG].detached[key] = 0;
    }
    // anything that starts with an underscore is an attribute
    if ((key[0] === '_' && key[1] !== '_') || key.substr(0, 2) == 'on') {
      attributes = attributes || {};
      if (key.substr(0, 2) == 'on') {
        attributes[key] = value;
      } else {
        attributes[key.substr(1)] = value;
      }
    }
  }
  return attributes;
}
