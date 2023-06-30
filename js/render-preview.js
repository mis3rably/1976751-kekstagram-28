import { generateUniqueNumbersArr } from './util.js';
import { descendingCommentsOrder, debounce } from './util.js';

const MAX_NUMBER = 24;
const PHOTO_AMOUNT = 10;
const photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const filterContainer = document.querySelector('.img-filters');

const photoContainer = document.querySelector('.pictures');

const createPreview = (preview, fragment) => {
  const photo = photoTemplate.cloneNode(true);
  photo.querySelector('.picture__img').src = `../${preview.url}`;
  photo.querySelector('.picture__comments').textContent = preview.comments.length;
  photo.querySelector('.picture__likes').textContent = preview.likes;
  const dataAttr = document.createAttribute('data-id');
  photo.setAttributeNode(dataAttr);
  photo.dataset.id = preview.id;
  fragment.append(photo);
};

const generatePreviews = (previewsList) => {
  const picturePreviewsList = photoContainer.querySelectorAll('.picture');

  if (picturePreviewsList) {
    picturePreviewsList.forEach((picture) => {
      picture.remove();
    });
  }

  const photoFragment = document.createDocumentFragment();

  previewsList.forEach((preview) => createPreview(preview, photoFragment));

  photoContainer.append(photoFragment);
};

const sortPhotos = (data, sortId) => {
  switch (sortId) {
    case 'filter-default':
      generatePreviews(data);
      break;
    case 'filter-random': {
      const uniquePhotos = [];
      generateUniqueNumbersArr(MAX_NUMBER, PHOTO_AMOUNT).forEach((id) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === id) {
            uniquePhotos.push(data[i]);
            return;
          }
        }
      });
      generatePreviews(uniquePhotos);
      break;
    }
    case 'filter-discussed': {
      generatePreviews(data
        .slice()
        .sort(descendingCommentsOrder));
      break;
    }
    default:
      throw new Error('Ошибка при сортировке.');
  }
};

const debouncedSortPhotos = debounce(sortPhotos);

const displayFilterOptions = (data) => {
  filterContainer.classList.remove('img-filters--inactive');
  filterContainer.addEventListener('click', (evt) => {
    if (evt.target.className.includes('img-filters__button') && !evt.target.className.includes('img-filters__button--active')) {
      const activeButton = filterContainer.querySelector('.img-filters__button--active');
      const pressedButtonId = evt.target.id;
      activeButton.classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      debouncedSortPhotos(data, pressedButtonId);
    }
  });
};

export { generatePreviews, displayFilterOptions };
