export default function createEventCall(node, fun) {
  var eventCall = function(fun, node, e) {
    //TODO: why not cache xpath?
    var xpath = getPathTo3(node);
    var id = getPathId(xpath);

    if (!id) {
      id = getPathTo4(node);
    }

    var pfillId = fill.id;
    fill.setId(id);

    var dataParent = findParentChild(node),
      path = dataParent && getPathTo2(dataParent),
      parentIndex = getPathIndex(path),
      xpath = xpath,
      tagIndex = getPathIndex(xpath),
      parent = {
        path: path,
        node: dataParent,
        data: ((dataParent || {})[MAGNUM] || []).dataPass,
        index: parentIndex
      };
    fill.setId(pfillId);
    var nodee = mag.doc.getElementById(id);
    var instanceId = mag.utils.items.getItem(id);

    // What if ret is a promise?
    var ret = fun.call(
      ~instanceId ? mag.mod.getMod(instanceId) : nodee,
      e,
      tagIndex,
      node,
      parent
    );
    if (id && nodee) {
      var redraw = function() {
        mag.redraw(nodee, instanceId, 1);
      };
      if (ret && ret.then) {
        //Node outdated?
        ret.then(function(res) {
          redraw();
          return res;
        });
      } else {
        redraw();
      }
    }

    return ret;
  }.bind({}, fun, node);

  return eventCall;
}