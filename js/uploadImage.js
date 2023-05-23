import { isEscEvent } from './utils.js';
import { effectLevel,lastClass } from './effects.js';
const Scale = {
  MAX: 100,
  MIN: 25,
  STEP: 25,
}
let scale = document.querySelector('.img-upload__scale')
let buttonPlus = scale.querySelector('.scale__control--bigger');
let buttonMinus = scale.querySelector('.scale__control--smaller');
let scaleInput = scale.querySelector('.scale__control--value');
let uploadImage = document.querySelector('#upload-file');
let uploadWindow = document.querySelector('.img-upload__overlay');
let uploadCancel = document.querySelector('#upload-cancel');
let previewImage = document.querySelector('.img-upload__preview > img');
const openForm = function () {
  resetSettings();
  uploadWindow.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadCancel.addEventListener('click', closeForm);
  document.addEventListener('keydown', onClickEsc);
};
const onClickEsc = function (evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeForm();
  }
}
uploadImage.addEventListener('input', openForm);
const closeForm = function () {
  uploadWindow.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadCancel.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', onClickEsc);
}
const resetSettings = function () {

  scaleInput.value = '100%';
  previewImage.style = 'transform: scale(1.00)';
  if (lastClass) {
    previewImage.classList.remove(lastClass);
  }
  document.querySelector('.effects__item:first-child > input').checked = true;
  effectLevel.classList.add('visually-hidden');
};

buttonPlus.addEventListener('click', () => {
  let scale = parseInt(scaleInput.value, 10) + Scale.STEP;

  if (scale >= Scale.MAX) {
    scale = Scale.MAX;
  }
  scaleInput.value = scale + '%';
  scale /= 100;
  previewImage.style.transform = 'scale(' + scale + ')';
});
buttonMinus.addEventListener('click', () => {
  let scale = parseInt(scaleInput.value, 10) - Scale.STEP;

  if (scale <= Scale.MIN) {
    scale = Scale.MIN;
  }
  scaleInput.value = scale + '%';
  scale /= 100;
  previewImage.style.transform = 'scale(' + scale + ')';
});

