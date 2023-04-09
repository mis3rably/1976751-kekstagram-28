import { getData, generateErrorMessage } from './server.js';
import { isEnterKey, isEscKey } from './util.js';

const picturesList = document.querySelector('.pictures');
const fullInterface = document.querySelector('.big-picture');
const closeButton = fullInterface.querySelector('.big-picture__cancel');
const commentsLoaderButton = fullInterface.querySelector('.comments-loader');
const commentBlock = fullInterface.querySelector('.social__comments');
let photoData;
let currentFullPhoto;

let currentCommentPage = 0;

const generateComments = (index, commentIndex, data) => {
  const documentFragment = document.createDocumentFragment();
  const newComment = document.createElement('li');
  const newCommentAvatar = document.createElement('img');
  const newCommentText = document.createElement('p');
  documentFragment.appendChild(newComment);
  newComment.classList.add('social__comment');
  newComment.classList.add('hidden');
  newCommentAvatar.classList.add('social__picture');
  newCommentAvatar.src = data[index].comments[commentIndex].avatar;
  newCommentAvatar.setAttribute('width', 35);
  newCommentAvatar.setAttribute('height', 35);
  newCommentAvatar.alt = data[index].comments[commentIndex].name;
  newComment.appendChild(newCommentAvatar);
  newCommentText.classList.add('social__text');
  newCommentText.textContent = data[index].comments[commentIndex].message;
  newComment.appendChild(newCommentText);
  commentBlock.appendChild(documentFragment);
};

const loadComments = () => {
  const commentsAddAmount = 5;
  const commentsAmount = photoData[currentFullPhoto].comments.length;
  const commentsList = commentBlock.children;
  const startRange = currentCommentPage * commentsAddAmount;
  const endRange = startRange + commentsAddAmount > commentsAmount ? commentsAmount : startRange + commentsAddAmount;
  const commentCounter = fullInterface.querySelector('.social__comment-count');

  if (endRange === commentsAmount) {
    commentsLoaderButton.classList.add('hidden');
  }

  for (let i = startRange; i < endRange; i++) {
    commentsList[i].classList.remove('hidden');
  }

  const visibleComments = fullInterface.querySelectorAll('.social__comment:not(.hidden)');
  commentCounter.innerHTML = `${visibleComments.length} из <span class="comments-count">${commentsAmount}</span> комментариев`;
  currentCommentPage++;
};

const generateFull = (data, index) => {
  const img = fullInterface.querySelector('.big-picture__img img');
  const likes = fullInterface.querySelector('.likes-count');
  const description = fullInterface.querySelector('.social__caption');
  description.textContent = data[index].description;
  img.src = data[index].url;
  img.alt = data[index].description;
  likes.textContent = data[index].likes;
  for (let i = 0; i < data[index].comments.length; i++) {
    generateComments(index, i, data);
  }
  loadComments(index, currentCommentPage, data);
  commentsLoaderButton.addEventListener('click', loadComments);
};

const closeFull = () => {
  fullInterface.classList.add('hidden');
  commentBlock.innerHTML = '';
  currentCommentPage = 0;
  commentsLoaderButton.classList.remove('hidden');
  document.body.classList.remove('modal-open');
  closeButton.removeEventListener('click', () => {
    closeFull();
  });
  picturesList.addEventListener('click', onPreviewClick);
  document.removeEventListener('keydown', onEscClose);
  picturesList.addEventListener('keydown', onEnterOpen);
  commentsLoaderButton.removeEventListener('click', loadComments);
};

const openFull = (index) => {
  getData()
    .then((data) => {
      photoData = data;
      currentFullPhoto = index;
      generateFull(data, index);
      fullInterface.classList.remove('hidden');
      document.body.classList.add('modal-open');
      document.addEventListener('keydown', onEscClose);
      picturesList.removeEventListener('keydown', onEnterOpen);
      closeButton.addEventListener('click', () => {
        closeFull();
      }, {once: true});
    })
    .catch((err) => {
      generateErrorMessage(err.message);
      picturesList.addEventListener('click', onPreviewClick);
    });
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

function onPreviewClick (evt) {
  if (evt.target.matches('.picture__img')) {
    openFull(evt.target.closest('.picture').dataset.id);
  }
}

picturesList.addEventListener('click', onPreviewClick);

picturesList.addEventListener('keydown', onEnterOpen);
