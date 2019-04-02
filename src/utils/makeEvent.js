import {MAG} from './constants';
import attachEvent from './attachEvent';

export default function makeEvent(event, attrName, node, parentKey) {
  var eventName = attrName.substr(2).toLowerCase();

  var uid =
    (typeof parentKey == 'string' ? parentKey.split('/')[0] : '') +
    '-' +
    node[MAG].uid;
  var events = (node[MAG].events = node[MAG].events || []);
  var eventHandlers = (node[MAG].eventHandlers = node[MAG].eventHandlers || []);
  eventHandlers[eventName] = eventHandlers[eventName] || [];
  eventHandlers[eventName][uid] = event;

  if (!events[eventName]) {
    events[eventName] = 1;
    attachEvent(node, eventName);
  }
}
