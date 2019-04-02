
// match elements on tag, id, name, class name, data-bind, etc.

export default function elementMatcher(element, key) {
  var paddedClass = ' ' + element.className + ' ';

  return (
    element.id === key ||
    ~paddedClass.indexOf(' ' + key + ' ') ||
    element.name === key ||
    element.nodeName.toLowerCase() === key.toLowerCase() ||
    element.getAttribute('data-bind') === key
  );
}