import { multiply, divide } from "./Math.js";

/**
 * @param {string} str a string
 * @returns {string} the string, in all uppercase letters.
 */
const toUpperCase = str => str.toUpperCase()

/**
 * @param {string} str a string
 * @returns the string with the first letter capitalized.
 */
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * @param {number} num a decimal between 0 and 1.
 * @returns {string} a percentage string
 * @example
 * // returns "50%"
 * decToPercentage(.5)
 */
const decToPercentage = num => multiply(num)(100) + "%"

/**
 * 
 * @param {(string|number)} numOrString a number string with % at the end or a number e.g. "50%" or 50
 * @returns {number} the decimal version of the number provided.
 * @example
 * // returns 0.5
 * percentToDec("50%")
 */
const percentToDec = numOrString => {
  const num =
    isNaN(numOrString) ?
    parseFloat(numOrString.slice(0, numOrString.length - 1)) :
    numOrString;
  return divide(num)(100);
}

const beginsWithAndEndsWith = (beginsWith, endsWith) => str => {
  const results = [];
  let string = str;
  let start = string.indexOf(beginsWith);
  while(start > -1) {
    string = string.slice(beginsWith);
    let end = string.indexOf(endsWith);
    if (end) {
      results.push(string.slice(start, end + endsWith.length));
      string = string.slice(end + endsWith.length);
      start = string.indexOf(beginsWith);
    } else {
      start = undefined;
    }
  }
  return results;
}

const split = delimiter => str => str.split(delimiter);

export {
  toUpperCase,
  decToPercentage,
  percentToDec,
  split,
  capitalize,
  beginsWithAndEndsWith
};
