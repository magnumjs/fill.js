import getUid from './getUid'
let dataCache = []
import fillId from './fillId'

export default function isCached(element, data) {
  const _fillId = fillId()
  //add UID if does not exist
  var uid = getUid(element);
  dataCache[_fillId] = dataCache[_fillId] || [];
  if (dataCache[_fillId][uid] && dataCache[_fillId][uid] == data) return 1;
  else dataCache[_fillId][uid] = data;
}