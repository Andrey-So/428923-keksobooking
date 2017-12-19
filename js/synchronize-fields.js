'use strict';

(function () {
  window.synchronizeFields = function (fieldA, fieldB, valuesA, callback) {
    if (typeof callback === 'function') {
      callback(fieldB, valuesA[fieldA.selectedIndex]);
    }
  };
})();
