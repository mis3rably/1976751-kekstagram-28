const checkStringLength = (string) => string.length <= 140;

const isPalindrome = (palindrome) => palindrome.split('').reverse().join('').replaceAll(' ', '').toLowerCase() === palindrome.replaceAll(' ', '').toLowerCase();

const numbersOnly = function (string) {
  let result = '';
  if (typeof string === 'number') {
    string = String(string);
  }
  for (let i = 0; i <= string.length; i++) {
    if (!(isNaN(Number(string[i]))) && (string[i].trim())) {
      result += string[i];
    }
  }
  return parseInt(result, 10);
};

const descendingCommentsOrder = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const stringExtend = function(initialString, minLength, additionalSymbols) {
  if (initialString.length >= minLength) {
    return initialString;
  }
  const repeatMultiplier = (minLength - initialString.length) / additionalSymbols.length;
  let additionalSymbolsMultiplied = additionalSymbols.repeat(Math.round(repeatMultiplier));
  if ((additionalSymbolsMultiplied.length + initialString.length) > minLength) {
    additionalSymbolsMultiplied = additionalSymbolsMultiplied.slice(0, -((additionalSymbolsMultiplied.length + initialString.length) - minLength));
  }
  return additionalSymbolsMultiplied + initialString;
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
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

const isEscKey = (evt) => evt.key === 'Escape';

const isEnterKey = (evt) => evt.key === 'Enter';

export {checkStringLength, isPalindrome, numbersOnly, stringExtend, isEscKey, isEnterKey, descendingCommentsOrder, debounce, generateUniqueNumbersArr};
