import { isEscKey } from './util.js';
import { checkStringLength } from './util.js';

const uploadInput = document.querySelector('#upload-file');
const formModal = document.querySelector('.img-upload__overlay');
const form = document.querySelector('#upload-select-image');
const formCancelButton = formModal.querySelector('.img-upload__cancel');
const descriptionInput = formModal.querySelector('.text__description');
const hashtagInput = formModal.querySelector('.text__hashtags');
const effectDefault = formModal.querySelector('#effect-none');
const scaleValue = formModal.querySelector('.scale__control--value');
const decreaseScaleButton = formModal.querySelector('.scale__control--smaller');
const increaseScaleButton = formModal.querySelector('.scale__control--bigger');
const imagePreview = formModal.querySelector('.img-upload__preview img');
const HASHTAG_AMOUNT = 5;
const effectsList = formModal.querySelector('.effects__list');
const sliderContainer = formModal.querySelector('.effect-level');
const slider = formModal.querySelector('.effect-level__slider');
const effectLevel = formModal.querySelector('.effect-level__value');
const effects = [
  'effects__preview--none',
  'effects__preview--chrome',
  'effects__preview--sepia',
  'effects__preview--marvin',
  'effects__preview--phobos',
  'effects__preview--heat'
];

const getEffect = (arr) => {
  let result;
  arr.forEach((element) => {
    effects.forEach((effect) => {
      if (element.includes(effect)) {
        result = element;
      }
    });
  });
  return result;
};

const changeEffectIntensity = (applyingEffect) => {
  if (applyingEffect === 'effects__preview--none') {
    sliderContainer.classList.add('hidden');
  } else {
    sliderContainer.classList.remove('hidden');
  }
  switch (applyingEffect) {
    case 'effects__preview--chrome':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      slider.noUiSlider.off();
      slider.noUiSlider.on('update', () => {
        effectLevel.value = slider.noUiSlider.get();
        imagePreview.style.filter = `grayscale(${effectLevel.value})`;
      });
      break;
    case 'effects__preview--sepia':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      slider.noUiSlider.off();
      slider.noUiSlider.on('update', () => {
        effectLevel.value = slider.noUiSlider.get();
        imagePreview.style.filter = `sepia(${effectLevel.value})`;
      });
      break;
    case 'effects__preview--marvin':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      slider.noUiSlider.off();
      slider.noUiSlider.on('update', () => {
        effectLevel.value = slider.noUiSlider.get();
        imagePreview.style.filter = `invert(${effectLevel.value}%)`;
      });
      break;
    case 'effects__preview--phobos':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      slider.noUiSlider.off();
      slider.noUiSlider.on('update', () => {
        effectLevel.value = slider.noUiSlider.get();
        imagePreview.style.filter = `blur(${effectLevel.value}px)`;
      });
      break;
    case 'effects__preview--heat':
      slider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      slider.noUiSlider.off();
      slider.noUiSlider.on('update', () => {
        effectLevel.value = slider.noUiSlider.get();
        imagePreview.style.filter = `brightness(${effectLevel.value})`;
      });
      break;
    default:
      break;
  }
};

const onClickApplyEffect = () => {
  const checkedEffect = form.querySelector('input[name="effect"]:checked + .effects__label span');
  const currentEffect = getEffect(Array.from(imagePreview.classList));
  const applyingEffect = getEffect(Array.from(checkedEffect.classList));
  imagePreview.classList.remove(currentEffect);
  imagePreview.classList.add(applyingEffect);
  changeEffectIntensity(applyingEffect);
};

function onEscClose (evt) {
  if (isEscKey(evt)) {
    closeForm();
  }
}

const isValidHashtagAmount = (amount) => amount <= HASHTAG_AMOUNT;

const isUniqueElement = (array) => {
  const lowerCaseArray = array.map((element) => element.toLowerCase());
  return lowerCaseArray.length === new Set(lowerCaseArray).size;
};

const validateHashtag = (value) => {
  const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;
  const hashtagList = value.trim().split(' ');
  if (value === '') {
    return true;
  }
  return hashtagList.every((hash) => hashtag.test(hash.trim())) && isUniqueElement(hashtagList) && isValidHashtagAmount(hashtagList.length);
};

function onEscStay (evt) {
  evt.stopPropagation();
}

const onClickDecrease = () => {
  if (scaleValue.value !== '25%') {
    const newScale = Number(scaleValue.value.slice(0, -1)) - 25;
    scaleValue.value = `${newScale}%`;
    imagePreview.style.transform = `scale(${newScale / 100}, ${newScale / 100})`;
  }
};

const onClickIncrease = () => {
  if (scaleValue.value !== '100%') {
    const newScale = Number(scaleValue.value.slice(0, -1)) + 25;
    scaleValue.value = `${newScale}%`;
    imagePreview.style.transform = `scale(${newScale / 100}, ${newScale / 100})`;
  }
};

function openForm () {
  formModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  formCancelButton.addEventListener('click', closeForm);
  document.addEventListener('keydown', onEscClose);
  descriptionInput.addEventListener('keydown', onEscStay);
  hashtagInput.addEventListener('keydown', onEscStay);
  decreaseScaleButton.addEventListener('click', onClickDecrease);
  increaseScaleButton.addEventListener('click', onClickIncrease);
  sliderContainer.classList.add('hidden');
  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    connect: 'lower',
    format: {
      to: function(value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function(value) {
        return parseFloat(value);
      }
    }
  });
  effectsList.addEventListener('click', onClickApplyEffect);
}

function closeForm () {
  formModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  formCancelButton.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', onEscClose);
  descriptionInput.removeEventListener('keydown', onEscStay);
  hashtagInput.removeEventListener('keydown', onEscStay);
  uploadInput.value = '';
  descriptionInput.value = '';
  hashtagInput.value = '';
  effectDefault.checked = true;
  scaleValue.value = '100%';
  decreaseScaleButton.removeEventListener('click', onClickDecrease);
  increaseScaleButton.removeEventListener('click', onClickIncrease);
  effectsList.removeEventListener('click', onClickApplyEffect);
  slider.noUiSlider.destroy();
}

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

pristine.addValidator(descriptionInput, checkStringLength, 'До 140 символов');
pristine.addValidator(hashtagInput, validateHashtag, 'Проверьте правильность введённых данных');

const onSubmitValidate = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    form.submit();
  }
};

form.addEventListener('submit', onSubmitValidate);

uploadInput.addEventListener('change', openForm);
