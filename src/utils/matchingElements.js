import childElements from './childElements'
import elementMatcher from './elementMatcher'

export default function matchingElements(node, key, nested) {
  var elements = childElements(node);
  var matches = [];
  var keyName = key;

  // is this cache necessary good useful?
  // are we losing some dynamism?

  var globalSearch = key[0] === '$';

  if (keyName[0] === '$') {
    // bust cache
    keyName = keyName.substr(1);
  }

  // search all child elements for a match
  for (var i = 0; i < elements.length; i += 1) {
    if (elementMatcher(elements[i], keyName)) {
      matches.push(elements[i]);
    }
  }

  // if there is no match, recursively search the childNodes
  if (!matches.length || globalSearch) {
    for (var i = 0; i < elements.length; i++) {
      // NOTE: pass in a flag to prevent recursive calls from logging
      matches = matches.concat(matchingElements(elements[i], key, true));
      if (matches.length && !globalSearch) break;
    }
  }

  if (!nested && !matches.length) {
    // TODO: mag.hookin for not found matchers
    var data = {
      key: key,
      value: matches,
      node: node
    };
    mag.hook('elementMatcher', key, data);
    //hookin change
    if (data.change) {
      // TODO: return a custom element for unmatched one ?
      matches = data.value;
    }
  }
  return matches;
}