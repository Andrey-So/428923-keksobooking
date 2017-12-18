'use strict';

(function () {
  window.synchronizeFields = function (srcObject, dstObject, srcValues, callback) {
    if (typeof callback === 'function') {
      callback(dstObject, srcValues[srcObject.selectedIndex]);
    }
  };
})();
