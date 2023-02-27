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

function getUniqueRangeInt(min, max) {
  const prevID = [];
  return function() {
    if (prevID.length >= max - 1) {
      return null;
    } else {
      let result = min;
      result++;
      while (prevID.includes(result)) {
        result++;
      }
      prevID.push(result);
      return result;
    }
  };
}

function getUniqueInt() {
  const prevID = [];
  let result = 0;

  return function() {
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

const getUniqueID = getUniqueRangeInt(1, 25);
const getUniqueUrlID = getUniqueRangeInt(1, 25);
const getCommentID = getUniqueInt();

const generateComments = () => ({
  id: getCommentID(),
  avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
  message : messageList[getRandomInt(0, messageList.length - 1)],
  name: authorList[getRandomInt(0, messageList.length - 1)],
});

const generateDescription = () => ({
  id: getUniqueID(),
  url: `photos/${getUniqueUrlID()}.jpg`,
  description: 'Фото сделано одним прекрасным летним днём.',
  likes: getRandomInt(15, 200),
  comments: Array.from({length: 3}, generateComments)
});

const photoDescription = Array.from({length: 30}, generateDescription); // eslint-disable-line
