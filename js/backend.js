'use strict';

(function () {
  window.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    var URL = 'https://js.dump.academy/keksobooking/data';
    xhr.responseType = 'json';
    xhr.open('GET', URL);
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
    var URL = 'https://js.dump.academy/keksobooking';
    var output = JSON.stringify(data);
    console.log(data, output);
    xhr.responseType = 'json';
    xhr.open('POST', URL);
    xhr.send(output);
  };
})();
