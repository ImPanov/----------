let noUiSlider = window.noUiSlider;
const Slider = {
  MAX: 100,
  MIN: 0,
  STEP: 1,
};

//слайдер
const effectRadioGroup = document.querySelector('.img-upload__effects');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const uploadPreviewImg = document.querySelector('.img-upload__preview > img');
const effectLevelValue = document.querySelector('.effect-level__value');

effectLevel.classList.add('visually-hidden')



let lastClass = '';

const effects = {
  none: () => {
    effectLevel.classList.add('visually-hidden')
    return 'none';
  },
  chrome: () => {
    effectLevel.classList.remove('visually-hidden')
    return `grayscale(${parseInt(effectLevelValue.value, 10) * 0.01})`;
  },
  sepia: () => {
    effectLevel.classList.remove('visually-hidden')
    return `sepia(${parseInt(effectLevelValue.value, 10) * 0.01})`;
  },
  marvin: () => {
    effectLevel.classList.remove('visually-hidden')
    return `invert(${Math.floor(effectLevelValue.value)}%)`;
  },
  phobos: () => {
    effectLevel.classList.remove('visually-hidden')
    return `blur(${(parseInt(effectLevelValue.value, 10) * 3) * 0.01}px)`;
  },
  heat: () => {
    effectLevel.classList.remove('visually-hidden')
    return `brightness(${(parseInt(effectLevelValue.value, 10) * 3) * 0.01})`;
  },
};

const onEffectRadioGroupClick = (evt) => {
  if (evt.target.classList.contains('effects__preview')) {
    if (lastClass !== '') {
      uploadPreviewImg.classList.remove(lastClass);
    }
    effectLevelSlider.noUiSlider.set(100);
    let currentClass = evt.target.classList[1];
    lastClass = currentClass;

    uploadPreviewImg.classList.add(currentClass);
    setStyleImage();
  }
};
noUiSlider.create(effectLevelSlider, {
  range: {
    min: Slider.MIN,
    max: Slider.MAX,
  },
  start: Slider.MAX,
  connect: 'lower',
});
const setStyleImage = function() {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();

  uploadPreviewImg.style.filter = effects[lastClass.replace('effects__preview--', '')]();
}
effectLevelSlider.noUiSlider.on('change', setStyleImage);
effectRadioGroup.addEventListener('click', onEffectRadioGroupClick)

//пока ошибку скрыл через window




export { effectLevel, lastClass };
