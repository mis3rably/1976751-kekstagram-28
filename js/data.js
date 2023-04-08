const ID_MIN_VALUE = 0;
const ID_MAX_VALUE = 26;
const URL_ID_MIN_VALUE = 0;
const URL_ID_MAX_VALUE = 26;
const AVATAR_MIN_RANGE = 1;
const AVATAR_MAX_RANGE = 6;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const COMMENTS_AMOUNT = 8;
const DESCRIPTION_AMOUNT = 25;

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const authors = [
  'Неопознанный Кекс',
  'Артём',
  'Мария',
  'Виктор',
  'Дарья'
];

function getUniqueRangeInt(min = 0, max) {
  const existingNumbers = [];
  return function() {
    if (existingNumbers.length >= max - 1) {
      return null;
    }
    let result = min;
    result++;
    while (existingNumbers.includes(result)) {
      result++;
    }
    existingNumbers.push(result);
    return result;
  };
}

const generateUniqueNumbersArr = (max, arrLength) => {
  const uniqueNumbers = [];
  while(uniqueNumbers.length < arrLength){
    const r = Math.floor(Math.random() * max) + 1;
    if(uniqueNumbers.indexOf(r) === -1) {
      uniqueNumbers.push(r);
    }
  }
  return uniqueNumbers;
};

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
  avatar: `../img/avatar-${getRandomInt(AVATAR_MIN_RANGE, AVATAR_MAX_RANGE)}.svg`,
  message: messages[getRandomInt(0, messages.length - 1)],
  name: authors[getRandomInt(0, messages.length - 1)],
});

const generateDescription = () => ({
  id: getUniqueID(),
  url: `../photos/${getUniqueUrlID()}.jpg`,
  description: 'Фото сделано одним прекрасным летним днём.',
  likes: getRandomInt(LIKES_MIN, LIKES_MAX),
  comments: Array.from({length: COMMENTS_AMOUNT}, generateComments)
});

const photoDescriptions = Array.from({length: DESCRIPTION_AMOUNT}, generateDescription);

export {photoDescriptions, generateUniqueNumbersArr};
