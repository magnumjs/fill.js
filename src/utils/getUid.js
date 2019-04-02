import {MAG} from './constants';
let inc = 0;

export default function getUid(element) {
  element[MAG] = element[MAG] || {};
  if (!element[MAG].uid) element[MAG].uid = ++inc;
  return element[MAG].uid;
}
