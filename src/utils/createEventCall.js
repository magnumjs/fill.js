export default function createEventCall(node, fun) {
    var eventCall = function(fun, node, e) {
        // What if ret is a promise?
        var ret = fun(e);

        return ret;
    }.bind({}, fun, node);

    return eventCall;
}
