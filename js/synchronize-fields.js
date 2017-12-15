'use strict';

(function () {
  window.synchronizefields = {
    synchronizeFields: function (srcObject, dstObject, srcSequence, dstSequence, sortingRule) {
      if (typeof sortingRule === 'function') {
        sortingRule([1, 2, 3, 555], 111);
      }
    }
  };
})();
