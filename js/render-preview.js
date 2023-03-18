import { photoDescriptions } from './data.js';

const photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const photoFragment = document.createDocumentFragment();
const photoContainer = document.querySelector('.pictures');

photoDescriptions.forEach((photoDescription) => {
  const photo = photoTemplate.cloneNode(true);
  photo.querySelector('.picture__img').src = photoDescription.url;
  photo.querySelector('.picture__comments').textContent = photoDescription.comments.length;
  photo.querySelector('.picture__likes').textContent = photoDescription.likes;
  const dataAttr = document.createAttribute('data-id');
  photo.setAttributeNode(dataAttr);
  photo.dataset.id = photoDescription.id;
  photoFragment.append(photo);
});

photoContainer.append(photoFragment);
