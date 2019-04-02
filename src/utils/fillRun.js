import fillNode from './fillNode'
import nodeListToArray from './nodelistarray'
import getPath from './getPath'
import {MAG} from './constants'
const MAG_KEY = '_key'
let templates = {}
// this is the entry point for this module, to fill the dom with data

export default function fillRun (nodeList, data, key) {
  
  var node, dataIsArray;

  // there is nothing to do if there is nothing to fill
  if (!nodeList) {return;}

  // remove all child nodes if there is no data
  if (data == null){
    data = {
      _text: ''
    };
  }


  // if (typeof data == 'string') {
  //   if (nodeList.children[0]) nodeList.children[0].textContent = data
  //   else nodeList.textContent = data
  //   return;
  // } 

  // CACHE
  // DIFF
  // CHANGE? then modify only the changes
  // KEYS for indentification

 // nodeList updates as the dom changes, so freeze it in an array
  var elements = nodeListToArray(nodeList);

  dataIsArray = Array.isArray(data);

  // match the number of nodes to the number of data elements
  if (dataIsArray) {
    if (templates[key] && elements.length === 0) {
      templates[key].parent.insertAdjacentHTML(
        'beforeend',
        templates[key].node
      );
      elements = nodeListToArray(templates[key].parent.children);
    }

    if (!elements.length) {
      // should never reach here
      // cannot fill empty nodeList with an array of data
      return;
    }

    // clone the first node if more nodes are needed
    var parent = elements[0].parentNode;

    if (!templates[key]) {
      templates[key] = {
        node: elements[0].cloneNode(1).outerHTML,
        parent: parent
      };
    }

    var fragment = document.createDocumentFragment();

    //Adding
    var ii = 0;
    while (elements.length < data.length) {
      if (templates[key]) {
        parent.insertAdjacentHTML('beforeend', templates[key].node);
        node = parent.lastChild;
      } else {
        node = elements[0].cloneNode(1);
      }

      getPath(node, ++ii, key);

      elements.push(node);
      fragment.appendChild(node);
    }
    parent.appendChild(fragment);
    // loop thru to make sure no undefined keys

    var keys = data.map(function(i) {
      return i && i[MAG_KEY];
    });

    // add keys if equal
    if (elements.length == data.length || keys.indexOf(undefined) !== -1) {
      // changes data can cause recursion!
      data = data.map(function(d, i) {
        if (typeof d === 'object') {
          elements[i][MAG] = elements[i][MAG] || {};
          if (elements[i][MAG].__key && typeof d[MAG_KEY] === undefined) {
            d[MAG_KEY] = elements[i][MAG].__key;
            return d;
          }
          if (typeof d[MAG_KEY] === undefined) {
            d[MAG_KEY] = MAG + i;
          }
          elements[i][MAG].__key = d[MAG_KEY];
        }

        return d;
      });
    }
    if (elements.length > data.length) {
      if (data.length === 0 || typeof data[0] !== 'object') {
        while (elements.length > data.length) {
          node = elements.pop();
          parent = node.parentNode;
          if (parent) {
            removeNode(node);
          }
        }
      } else {
        // more elements than data
        // remove elements that don't have matching data keys

        var found = [];
        // get all data keys
        var m = data.map(function(i) {
          return i[MAG_KEY];
        });

        elements = elements.filter(function(ele, i) {
          var remove;
          if (typeof ele[MAG] == undefined) {
            remove = 1;
          } else if (
            !~m.indexOf(ele[MAG].__key) ||
            ~found.indexOf(ele[MAG].__key)
          ) {
            found.push(ele[MAG].__key);
            remove = 1;
          }
          if (remove) {
            removeNode(ele);
            return false;
          }
          found.push(ele[MAG].__key);
          return true;
        });
      }
    }
  } 

  // now fill each node with the data
  for (var i = 0; i < elements.length; i++) {
    // create element specific xpath string
    if (dataIsArray) {
      if (elements[i]) {
        fillRun(elements[i], data[i], i);
      }
    } else {
      var p = getPath(elements[i], i + 1, key);
      fillNode(elements[i], data, p, key);
    }
  }
};