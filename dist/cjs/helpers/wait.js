/*can-connect@0.3.5#helpers/wait*/
var helpers = require('./helpers.js');
module.exports = addToCanWaitData;
function sortedSetJson(set) {
    if (set == null) {
        return set;
    } else {
        var sorted = {};
        var keys = [];
        for (var k in set) {
            keys.push(k);
        }
        keys.sort();
        helpers.each(keys, function (prop) {
            sorted[prop] = set[prop];
        });
        return JSON.stringify(sorted);
    }
}
function addToCanWaitData(promise, name, set) {
    if (typeof canWait !== 'undefined' && canWait.data) {
        var addToData = canWait(function (resp) {
                var data = {};
                var keyData = data[name] = {};
                keyData[sortedSetJson(set)] = typeof resp.serialize === 'function' ? resp.serialize() : resp;
                canWait.data({ pageData: data });
                return resp;
            });
        promise.then(null, addToData);
        return promise.then(addToData);
    }
    return promise;
}
//# sourceMappingURL=wait.js.map