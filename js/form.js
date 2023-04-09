import { sendData } from './server.js';
import { isEscKey } from './util.js';
import { checkStringLength } from './util.js';

const HASHTAG_AMOUNT = 5;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
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
const fileChooser = document.querySelector('.img-upload__input');
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
const successSubmitBlock = document.querySelector('#success')
  .content
  .querySelector('.success')
  .cloneNode(true);
const successButton = successSubmitBlock.querySelector('.success__button');

const errorSubmitBlock = document.querySelector('#error')
  .content
  .querySelector('.error')
  .cloneNode(true);
const errorButton = errorSubmitBlock.querySelector('.error__button');

const getEffect = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (effects.includes(arr[i])) {
      return arr[i];
    }
  }
};

const onEscClose = (evt) => {
  if (isEscKey(evt)) {
    closeForm();
  }
};

const onClickCloseForm = () => {
  closeForm();
};

const onUploadOpenForm = () => {
  openForm();
};

function onEscStay (evt) {
  evt.stopPropagation();
}

function onClickCloseSuccess () {
  successSubmitBlock.remove();
  successButton.removeEventListener('click', onClickCloseSuccess);
  document.removeEventListener('keydown', onEscCloseSuccess);
  document.removeEventListener('click', onClickOutsideSuccess);
}

function onClickCloseError () {
  errorSubmitBlock.remove();
  errorButton.removeEventListener('click', onClickCloseError);
  document.removeEventListener('keydown', onEscCloseError);
  document.removeEventListener('click', onClickOutsideError);
}

function onEscCloseSuccess (evt) {
  if (isEscKey(evt)) {
    document.querySelector('.success').remove();
    successButton.removeEventListener('click', onClickCloseSuccess);
    document.removeEventListener('keydown', onEscCloseSuccess);
    document.removeEventListener('click', onClickOutsideSuccess);
  }
}

function onEscCloseError (evt) {
  if (isEscKey(evt)) {
    document.querySelector('.error').remove();
    errorButton.removeEventListener('click', onClickCloseError);
    errorButton.removeEventListener('keydown', onEscCloseError);
    document.removeEventListener('click', onClickOutsideError);
    document.addEventListener('keydown', onEscClose);
  }
}

function onClickOutsideError (evt) {
  const errorModal = document.querySelector('.error');
  if (!document.querySelector('.error__inner').contains(evt.target)) {
    errorModal.remove();
    document.removeEventListener('click', onClickOutsideError);
  }
}

function onClickOutsideSuccess (evt) {
  const successModal = document.querySelector('.success');
  if (!document.querySelector('.success__inner').contains(evt.target)) {
    successModal.remove();
    document.removeEventListener('click', onClickOutsideSuccess);
  }
}

const generateSubmitMessage = (type) => {
  const documentFragment = document.createDocumentFragment();
  if (type === 'submit') {
    successButton.addEventListener('click', onClickCloseSuccess);
    documentFragment.appendChild(successSubmitBlock);
    document.addEventListener('keydown', onEscCloseSuccess);
    document.addEventListener('click', onClickOutsideSuccess);
  } else {
    documentFragment.appendChild(errorSubmitBlock);
    document.addEventListener('keydown', onEscCloseError);
    errorButton.addEventListener('click', onClickCloseError);
    document.removeEventListener('keydown', onEscClose);
    document.addEventListener('click', onClickOutsideError);
  }
  document.body.appendChild(documentFragment);
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
        imagePreview.style.filter = '';
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
        imagePreview.style.filter = '';
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
        imagePreview.style.filter = '';
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
        imagePreview.style.filter = '';
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
        imagePreview.style.filter = '';
        imagePreview.style.filter = `brightness(${effectLevel.value})`;
      });
      break;
    case 'effects__preview--none':
      slider.noUiSlider.off();
      imagePreview.style.filter = '';
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
  formCancelButton.addEventListener('click', onClickCloseForm);
  document.addEventListener('keydown', onEscClose);
  descriptionInput.addEventListener('keydown', onEscStay);
  hashtagInput.addEventListener('keydown', onEscStay);
  decreaseScaleButton.addEventListener('click', onClickDecrease);
  increaseScaleButton.addEventListener('click', onClickIncrease);
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));
  if (matches) {
    imagePreview.src = URL.createObjectURL(file);
  }
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

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

pristine.addValidator(descriptionInput, checkStringLength, 'До 140 символов');
pristine.addValidator(hashtagInput, validateHashtag, 'Проверьте правильность введённых данных');


function closeForm () {
  formModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  formCancelButton.removeEventListener('click', onClickCloseForm);
  document.removeEventListener('keydown', onEscClose);
  descriptionInput.removeEventListener('keydown', onEscStay);
  hashtagInput.removeEventListener('keydown', onEscStay);
  uploadInput.value = '';
  descriptionInput.value = '';
  hashtagInput.value = '';
  effectDefault.checked = true;
  imagePreview.style.transform = '';
  scaleValue.value = '100%';
  imagePreview.src = 'img/upload-default-image.jpg';
  decreaseScaleButton.removeEventListener('click', onClickDecrease);
  increaseScaleButton.removeEventListener('click', onClickIncrease);
  effectsList.removeEventListener('click', onClickApplyEffect);
  pristine.reset();
  slider.noUiSlider.destroy();
}

const onSubmitValidate = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    const formData = new FormData(form);
    sendData(formData)
      .then(() => {
        closeForm();
        generateSubmitMessage('submit');
      })
      .catch(() => {
        generateSubmitMessage('error');
      });
  }
};

form.addEventListener('submit', onSubmitValidate);

uploadInput.addEventListener('change', onUploadOpenForm);
