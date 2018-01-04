'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileChoosers = document.querySelectorAll('input[type="file"]');
  var avatar = document.querySelector('.notice__preview img');
  var photo = document.querySelector('.form__photo-container');

  var chooserChange = function (evt) {
    var file = evt.target.files[0];
    if (file) {
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (type) {
        return fileName.endsWith(type);
      });
    }

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        if (evt.target.id === 'avatar') {
          avatar.src = reader.result;
        } else {
          var photoImg = document.createElement('img');
          photoImg.src = reader.result;
          photo.appendChild(photoImg);
        }
      });
      reader.readAsDataURL(file);
    }
  };

  fileChoosers.forEach(function (chooser) {
    chooser.addEventListener('change', chooserChange);
  });
})();
