'use strict';
(function () {
  var STATUS = {
    OK: 200,
    MovedPermanently: 301,
    MovedTemporarily: 302,
    BadRequest: 400,
    Unauthorized: 401,
    Forbidden: 403,
    NotFound: 404,
    RequestTimeout: 408,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504
  };
  var URL = 'https://js.dump.academy/keksobooking';

  window.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', URL + '/data');
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
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case STATUS.OK:
          onLoad(xhr.response);
          break;
        case STATUS.MovedPermanently:
          onError('301 Moved Permanently');
          break;
        case STATUS.MovedTemporarily:
          onError('302 Moved Temporarily');
          break;
        case STATUS.BadRequest:
          onError('400 Bad Request');
          break;
        case STATUS.Unauthorized:
          onError('401 Unauthorized');
          break;
        case STATUS.Forbidden:
          onError('403 Forbidden');
          break;
        case STATUS.NotFound:
          onError('404 Not Found');
          break;
        case STATUS.RequestTimeout:
          onError('408 Request Timeout');
          break;
        case STATUS.InternalServerError:
          onError('500 Internal Server Error');
          break;
        case STATUS.NotImplemented:
          onError('501 Not Implemented');
          break;
        case STATUS.BadGateway:
          onError('502 Bad Gateway');
          break;
        case STATUS.ServiceUnavailable:
          onError('503 Service Unavailable');
          break;
        case STATUS.GatewayTimeout:
          onError('504 Gateway Timeout');
          break;
        default:
          onError('Unknown Error');
          break;
      }
    });
    xhr.responseType = 'json';
    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
