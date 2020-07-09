"use strict";

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

require("core-js/modules/web.url");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var worker = function worker() {
  var getFunctionArguments = function getFunctionArguments(fn) {
    return fn.substring(fn.indexOf("(") + 1, fn.indexOf(")"));
  };

  var getFunctionContent = function getFunctionContent(fn) {
    return fn.substring(fn.indexOf("{") + 1, fn.lastIndexOf("}"));
  };

  var worker = function worker(params) {
    var fn = params.data.fn;
    var args = params.data.args;
    var fnObj = new Function(getFunctionArguments(fn), getFunctionContent(fn));
    postMessage(fnObj.apply(null, args));
  };

  self.onmessage = worker;
};

var _default = function _default(fn, args) {
  var workerString = worker.toString();
  var code = workerString.substring(workerString.indexOf("{") + 1, workerString.lastIndexOf("}"));
  var webWorker = new Worker(URL.createObjectURL(new Blob([code], {
    type: 'text/javascript'
  })));
  var message = {
    fn: fn.toString(),
    args: args
  };
  return new Promise(function (resolve, reject) {
    webWorker.onmessage = function (result) {
      resolve(result.data);
    };

    webWorker.onerror = reject;
    webWorker.postMessage(message);
  });
};
/* Example Usage 
const test = (arg1) => {
    console.log("Thread started! " + arg1)
    const start = Date.now()
    while (Date.now() - start < 10000) { }
    return arg1 + 10
}

execute(test, [1]).then(result => {
    console.log("Thread 1 Done! " + result)
})
execute(test, [2]).then(result => {
    console.log("Thread 2 Done!" + result)
})
execute(test, [3]).then(result => {
    console.log("Thread 3 Done!" + result)
})
*/


exports.default = _default;