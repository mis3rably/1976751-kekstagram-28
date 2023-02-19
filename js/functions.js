const checkStringLength = (string, length) => string.length <= length;

const isPalindrome = function (palindrome) {
  palindrome = palindrome.replaceAll(' ', '');
  palindrome = palindrome.toLowerCase();
  return palindrome === palindrome.split('').reverse().join('');
};

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
  if (result === '') {
    return NaN;
  }
  return result;
};

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

checkStringLength('проверяемая строка', 20);
isPalindrome('ДовОд');
numbersOnly('а я томат');
(stringExtend('qwerty', 4, '0'));
