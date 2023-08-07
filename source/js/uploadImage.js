import { isEscEvent } from './utils.js';
import { effectLevel, lastClass } from './effects.js';
import { sendData } from './api.js';
const SCALE = {
  MAX: 100,
  MIN: 25,
  STEP: 25,
}
const imageUploadForm = document.querySelector('.img-upload__form');
const scaleControl = document.querySelector('.img-upload__scale')
const buttonPlus = scaleControl.querySelector('.scale__control--bigger');
const buttonMinus = scaleControl.querySelector('.scale__control--smaller');
const scaleInput = scaleControl.querySelector('.scale__control--value');
const uploadImage = document.querySelector('#upload-file');
const uploadWindow = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const previewImage = document.querySelector('.img-upload__preview > img');

const messageSuccess = document.querySelector('#success').content.querySelector('.success');
const successBox = messageSuccess.querySelector('.success__inner');
const successButton = messageSuccess.querySelector('.success__button');

const onEscCloseSuccessMessage = function (evt) {
  if (isEscEvent(evt)) {
    closeSuccessMessage();
  }
}
const closeSuccessMessage = function (evt) {
  const target = evt.target
  const messageBox = target == successBox || successBox.contains(target)
  const btn = target == successButton;
  if (!messageBox || btn) {
    document.body.removeChild(messageSuccess)
  }
  document.removeEventListener('click', closeSuccessMessage);
  document.removeEventListener('keydown', onEscCloseSuccessMessage);
};
const alertSuccess = function () {
  document.body.classList.add('modal-open');
  document.body.appendChild(messageSuccess);
  document.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', onEscCloseSuccessMessage);
}

const messageError = document.querySelector('#error').content.querySelector('.error');
const errorBox = messageError.querySelector('.error__inner');
const errorButton = messageError.querySelector('.error__button');

const onEscCloseErrorMessage = function (evt) {
  if (isEscEvent(evt)) {
    closeErrorMessage();
  }
}
const closeErrorMessage = function (evt) {
  const target = evt.target
  const messageBox = target == errorBox || errorBox.contains(target)
  const btn = target == errorButton;
  if (!messageBox || btn) {
    document.body.removeChild(messageError)
  }
  document.removeEventListener('click', closeErrorMessage);
  document.removeEventListener('keydown', onEscCloseErrorMessage);
};
const alertError = function () {
  document.body.classList.add('modal-open');
  document.body.appendChild(messageError);
  document.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', onEscCloseErrorMessage);
}

const openForm = function () {
  resetSettings();
  uploadWindow.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadCancel.addEventListener('click', closeForm);
  document.addEventListener('keydown', onEscCloseForm);
};
const onEscCloseForm = function (evt) {
  if (isEscEvent(evt)) {
    closeForm();
  }
}
uploadImage.addEventListener('click', openForm);
const closeForm = function () {
  uploadWindow.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadCancel.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', onEscCloseForm);
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
  let scale = parseInt(scaleInput.value, 10) + SCALE.STEP;

  if (scale >= SCALE.MAX) {
    scale = SCALE.MAX;
  }
  scaleInput.value = scale + '%';
  scale /= 100;
  previewImage.style.transform = 'scale(' + scale + ')';
});
buttonMinus.addEventListener('click', () => {
  let scale = parseInt(scaleInput.value, 10) - SCALE.STEP;

  if (scale <= SCALE.MIN) {
    scale = SCALE.MIN;
  }
  scaleInput.value = scale + '%';
  scale /= 100;
  previewImage.style.transform = 'scale(' + scale + ')';
});
const setUserFormSubmit = function (onSuccess, onFailure) {
  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      onSuccess,
      onFailure,
      new FormData(evt.target));
    closeForm();
    resetSettings();
  })
}
setUserFormSubmit(alertSuccess, alertError);

