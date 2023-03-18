import { photoDescriptions } from './data.js';

const picturesList = document.querySelector('.pictures');
const fullInterface = document.querySelector('.big-picture');
const closeButton = fullInterface.querySelector('.big-picture__cancel');
const commentBlock = fullInterface.querySelector('.social__comments');

let currentCommentPage = 1;

const generateComments = function (index, pageIndex) {
  const commentsAddAmount = 10;
  const commentsAmount = photoDescriptions[index].comments.length;
  currentCommentPage = pageIndex;
  const startRange = (currentCommentPage - 1) * commentsAddAmount;
  const endRange = startRange + commentsAddAmount > commentsAmount ? commentsAmount : startRange + commentsAddAmount;

  const generateCard = function(commentIndex) {
    const documentFragment = document.createDocumentFragment();
    const newComment = document.createElement('li');
    const newCommentAvatar = document.createElement('img');
    const newCommentText = document.createElement('p');
    documentFragment.appendChild(newComment);
    newComment.classList.add('social__comment');
    newCommentAvatar.classList.add('social__picture');
    newCommentAvatar.src = photoDescriptions[index].comments[commentIndex].avatar;
    newCommentAvatar.setAttribute('width', 35);
    newCommentAvatar.setAttribute('height', 35);
    newCommentAvatar.alt = photoDescriptions[index].comments[commentIndex].name;
    newComment.appendChild(newCommentAvatar);
    newCommentText.classList.add('social__text');
    newCommentText.textContent = photoDescriptions[index].comments[commentIndex].message;
    newComment.appendChild(newCommentText);
    commentBlock.appendChild(documentFragment);
  };

  for (let i = startRange; i < endRange; i++) {
    generateCard(i);
  }
};

const onEscClose = function (evt) {
  if (evt.key === 'Escape') {
    closeFull(); // eslint-disable-line
  }
};

const closeFull = function() {
  fullInterface.classList.add('hidden');
  commentBlock.innerHTML = '';
  currentCommentPage = 1;
  document.body.classList.remove('modal-open');
  closeButton.removeEventListener('click', () => {
    closeFull();
  });
  document.removeEventListener('keydown', onEscClose);
  picturesList.addEventListener('click', onPreviewClick); // eslint-disable-line
};

const openFull = function(index) {
  const img = fullInterface.querySelector('.big-picture__img img');
  const likes = fullInterface.querySelector('.likes-count');
  const commentsCount = fullInterface.querySelector('.comments-count');
  const description = fullInterface.querySelector('.social__caption');
  const commentCounter = fullInterface.querySelector('.social__comment-count');
  const commentsLoaderButton = fullInterface.querySelector('.comments-loader');
  commentCounter.classList.add('hidden');
  commentsLoaderButton.classList.add('hidden');
  description.textContent = photoDescriptions[index].description;
  fullInterface.classList.remove('hidden');
  document.body.classList.add('modal-open');
  generateComments(index, currentCommentPage);
  img.src = photoDescriptions[index].url;
  img.alt = photoDescriptions[index].description;
  likes.textContent = photoDescriptions[index].likes;
  commentsCount.textContent = photoDescriptions[index].comments.length;
  document.addEventListener('keydown', onEscClose);
  closeButton.addEventListener('click', () => {
    closeFull();
  });
};

const onPreviewClick = function(evt) {
  if (evt.target.matches('.picture__img')) {
    openFull(evt.target.closest('.picture').dataset.id - 1);
  }
  picturesList.removeEventListener('click', onPreviewClick);
};

picturesList.addEventListener('click', onPreviewClick);
