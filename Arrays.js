import { sum, toFixedFloat } from "./Math.js";

/**
 * 
 * @param {Array} arr
 * @returns {Array} an array with the duplicates removed 
 */
const uniques = arr => [...new Set(arr)]

/**
 *
 * @param {Array} arr
 * @returns {Array} an array with any falsy values removed
 */
const compact = arr => arr.filter(Boolean)

/**
 * 
 * @param {Array} arr
 * @returns {Object} an object where the keys are the values from the array
 * and the values are the number of times that key was in the array 
 * @example
 * // returns { a: 1, b: 2 }
 * arrayCount(["a", "b", "b"])
 */
const arrayCount = arr => {
  return arr.reduce((countObj, val) => {
    if (countObj[val]) {
      countObj[val] = countObj[val] + 1;
    } else {
      countObj[val] = 1;
    }
    return countObj;
  }, {});
}

/**
 * 
 * @param {Array} arr 
 * @param {boolean} returnAsStrings - defaults to false. If true values returned are like this: 50%
 * @returns an object (similar to arrayCount) but where the values are the percentage
 * the value comprises of the total number of items
 * @example
 * // returns { a: 33.3333%, b: 66.6666% }
 * arrayPercentages(["a", "b", "b"], true)
 */
const arrayPercentages = (arr, returnAsStrings = false) => {
  const string = returnAsStrings ? "%" : 0;
  const count = arrayCount(arr);
  const total = sum(Object.values(count));
  return Object.keys(count).reduce((percentageObj, key) => {
    percentageObj[key] = toFixedFloat(count[key] / total * 100, 4) + string;
    return percentageObj;
  }, {});
}

/**
 * 
 * @param {Array} arr
 * @returns {*} the first item in the array 
 */
const head = arr => arr[0]

/**
 * 
 * @param {Array} arr
 * @returns {*} the last item in the array
 */
const tail = arr => arr[arr.length - 1]

/**
 * 
 * @param {number} min the number to start from (inclusive)
 * @param {number} max the number to stop before (exclusive)
 * @param {number} step how much to increase each time
 * @param {function} mapping can add a function here to change the value of each increment 
 * @returns {Array}
 * @example
 * // returns [1, 2, 3, 4, 5]
 * range(1, 6)
 * @example
 * // returns [1, 3, 5, 7, 9]
 * range(1, 10, 2)
 * @example
 * // returns [2, 6, 10, 14, 18]
 * range(1, 10, 2, x => 2)
 */
const range = (min, max, step = 1, mapping = x => x) => {
  const arr = [];
  for (let i = min; i < max; i += step) {
    arr.push(mapping(i));
  }
  return arr;
}

const map = fn => arr => arr.map(fn)
const reduce = (fn, initialVal) => arr => arr.reduce(fn, initialVal)
const filter = fn => arr => arr.filter(fn)
const sort = fn => arr => {
  if (!Array.isArray(arr)) return undefined;
  return [...arr].sort(fn);
}

const flatten = arr => {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

const distinct = prop => arr => {
  const res = [];
  const map = new Map();
  for (const item of arr) {
    if (!map.has(item[prop])) {
      map.set(item[prop], true);
      res.push(item);
    }
  }
  return res;
}

export {
  uniques,
  compact,
  arrayCount,
  arrayPercentages,
  head,
  tail,
  range,
  map,
  filter,
  reduce,
  sort,
  flatten,
  distinct
};
