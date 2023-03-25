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
const HASHTAG_AMOUNT = 5;

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

function openForm () {
  formModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  formCancelButton.addEventListener('click', closeForm);
  document.addEventListener('keydown', onEscClose);
  descriptionInput.addEventListener('keydown', onEscStay);
  hashtagInput.addEventListener('keydown', onEscStay);
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
  scaleValue.value = '55%';
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
