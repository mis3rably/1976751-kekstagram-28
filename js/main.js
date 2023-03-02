const messageList = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const authorList = [
  'Неопознанный Кекс',
  'Артём',
  'Мария',
  'Виктор',
  'Дарья'
];

const ID_MIN_VALUE = 1;
const ID_MAX_VALUE = 1;
const URL_ID_MIN_VALUE = 1;
const URL_ID_MAX_VALUE = 1;
const AVATAR_MIN_RANGE = 1;
const AVATAR_MAX_RANGE = 1;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const COMMENTS_AMOUNT = 3;
const DESCRIPTION_AMOUNT = 30;

function getUniqueRangeInt(min, max) {
  const prevID = [];
  if (min === undefined) {
    min = 0;
  }
  return function() {
    if (prevID.length >= max - 1) {
      return null;
    }
    let result = min;
    result++;
    while (prevID.includes(result)) {
      result++;
    }
    prevID.push(result);
    return result;
  };
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const getUniqueID = getUniqueRangeInt(ID_MIN_VALUE, ID_MAX_VALUE);
const getUniqueUrlID = getUniqueRangeInt(URL_ID_MIN_VALUE, URL_ID_MAX_VALUE);
const getCommentID = getUniqueRangeInt();

const generateComments = () => ({
  id: getCommentID(),
  avatar: `img/avatar-${getRandomInt(AVATAR_MIN_RANGE, AVATAR_MAX_RANGE)}.svg`,
  message : messageList[getRandomInt(0, messageList.length - 1)],
  name: authorList[getRandomInt(0, messageList.length - 1)],
});

const generateDescription = () => ({
  id: getUniqueID(),
  url: `photos/${getUniqueUrlID()}.jpg`,
  description: 'Фото сделано одним прекрасным летним днём.',
  likes: getRandomInt(LIKES_MIN, LIKES_MAX),
  comments: Array.from({length: COMMENTS_AMOUNT}, generateComments)
});

const photoDescription = Array.from({length: DESCRIPTION_AMOUNT}, generateDescription); // eslint-disable-line
