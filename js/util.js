const checkStringLength = (string, length) => string.length <= length;

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

export {checkStringLength, isPalindrome, numbersOnly, stringExtend};
