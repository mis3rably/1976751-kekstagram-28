import { photoDescriptions } from './data.js';
import { isEnterKey, isEscKey } from './util.js';

const picturesList = document.querySelector('.pictures');
const fullInterface = document.querySelector('.big-picture');
const closeButton = fullInterface.querySelector('.big-picture__cancel');
const commentBlock = fullInterface.querySelector('.social__comments');
const commentsLoaderButton = fullInterface.querySelector('.comments-loader');

let currentCommentPage = 1;

const generateComments = function (index, pageIndex) {
  const commentsAddAmount = 5;
  const commentsAmount = photoDescriptions[index].comments.length;
  currentCommentPage = pageIndex;
  const startRange = (currentCommentPage - 1) * commentsAddAmount;
  const endRange = startRange + commentsAddAmount > commentsAmount ? commentsAmount : startRange + commentsAddAmount;
  const commentCounter = fullInterface.querySelector('.social__comment-count');

  if (endRange === commentsAmount) {
    commentsLoaderButton.classList.add('hidden');
  }

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
  commentCounter.innerHTML = `${commentBlock.childElementCount} из <span class="comments-count">${commentsAmount}</span> комментариев`;
  // commentCounter.textContent = `${commentBlock.childElementCount} из комментариев`;
};

const closeFull = function() {
  fullInterface.classList.add('hidden');
  commentBlock.innerHTML = '';
  currentCommentPage = 1;
  commentsLoaderButton.classList.remove('hidden');
  document.body.classList.remove('modal-open');
  closeButton.removeEventListener('click', () => {
    closeFull();
  });
  picturesList.addEventListener('click', onPreviewClick);
  document.removeEventListener('keydown', onEscClose);
  picturesList.addEventListener('keydown', onEnterOpen);
};

function onEscClose (evt) {
  if (isEscKey(evt)) {
    closeFull();
  }
}

function onEnterOpen (evt) {
  if (isEnterKey(evt)) {
    openFull(evt.target.dataset.id - 1);
  }
}


function openFull (index) {
  const img = fullInterface.querySelector('.big-picture__img img');
  const likes = fullInterface.querySelector('.likes-count');
  const description = fullInterface.querySelector('.social__caption');
  description.textContent = photoDescriptions[index].description;
  fullInterface.classList.remove('hidden');
  document.body.classList.add('modal-open');
  generateComments(index, currentCommentPage);
  img.src = photoDescriptions[index].url;
  img.alt = photoDescriptions[index].description;
  likes.textContent = photoDescriptions[index].likes;
  commentsLoaderButton.addEventListener('click', () => {
    generateComments(index, currentCommentPage + 1);
  });
  document.addEventListener('keydown', onEscClose);
  picturesList.removeEventListener('keydown', onEnterOpen);
  closeButton.addEventListener('click', () => {
    closeFull();
  });

}

function onPreviewClick (evt) {
  if (evt.target.matches('.picture__img')) {
    openFull(evt.target.closest('.picture').dataset.id - 1);
  }
  picturesList.removeEventListener('click', onPreviewClick);
}

picturesList.addEventListener('click', onPreviewClick);

picturesList.addEventListener('keydown', onEnterOpen);
