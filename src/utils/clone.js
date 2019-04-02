export default function clone(obj) {
  var temp = function temporary() {
    return obj.apply(obj, arguments);
  };
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      temp[key] = obj[key];
    }
  }
  return temp;
}
