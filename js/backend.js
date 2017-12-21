'use strict';

(function () {
  var loadURL = 'https://js.dump.academy/keksobooking/data';
  var saveURL = 'https://js.dump.academy/keksobooking';

  window.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', loadURL);
    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });
    xhr.addEventListener('error', function () {
      onError(xhr.error);
    });
    xhr.send();
  };
  window.save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', saveURL);
    var JSONdata = JSON.stringify(data);
    xhr.send(JSONdata);
    console.log(data, onLoad, onError);
  };
})();
