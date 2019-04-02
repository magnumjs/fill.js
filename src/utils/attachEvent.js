import {MAG} from './constants';
import createEventCall from './createEventCall';

//Dynamic listeners without event delegation
export default function attachEvent(node, eventName) {
  function event(e) {
    var handlers = node[MAG]['eventHandlers'][eventName];
    //get all uniue node specific events and run them
    for (var path in handlers) {
      var fun = handlers[path];
      var hand = createEventCall(node, fun);
      var ret = hand(e);
      if (ret === false) e.preventDefault();
    }
  }
  node.removeEventListener(eventName, event);
  node.addEventListener(eventName, event);
}
