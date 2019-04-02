import matchingElements from './matchingElements'
import fillRun from './fillRun'

const ignorekeys = [
    'toString',
    'draw',
    'then',
    'hasOwnProperty',
    'willgetprops',
    'onbeforeunload',
    'Symbol(Symbol.toStringTag)',
    'nodeType',
    'toJSON',
    'onunload',
    'willupdate',
    'didupdate',
    'didload',
    'willload',
    'isupdate'
  ]

export default function findNonAttributes(node, data, p) {
  var elements;

  for (var key in data) {
    var value = data[key];

    // ignore certain system keys
    if (~ignorekeys.indexOf(key)) continue;

    // only attributes start with an underscore
    if (key[0] !== '_' && key.substr(0, 2) != 'on') {
      elements = matchingElements(node, key);



      //TODO: what's this use case??
      // if (_isArray(value)) {
      //   elements = matchingElements(node, '$' + key);
      // }

      fillRun(elements, value, p + '/' + key);
    }
  }
}