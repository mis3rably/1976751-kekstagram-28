const photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const photoContainer = document.querySelector('.pictures');

const generatePreviews = (previewsList) => {
  const photoFragment = document.createDocumentFragment();

  previewsList.forEach((preview) => {
    const photo = photoTemplate.cloneNode(true);
    photo.querySelector('.picture__img').src = `../${preview.url}`;
    photo.querySelector('.picture__comments').textContent = preview.comments.length;
    photo.querySelector('.picture__likes').textContent = preview.likes;
    const dataAttr = document.createAttribute('data-id');
    photo.setAttributeNode(dataAttr);
    photo.dataset.id = preview.id;
    photoFragment.append(photo);
  });

  photoContainer.append(photoFragment);
};

export { generatePreviews };
