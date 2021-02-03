import { sort } from "./Arrays.js";
import { keysByValue } from "./Objects.js"

/**
 * 
 * @param {number} num the number to parse 
 * @param {number} decimalPlaces how many digits after the period
 * @returns {number} the parsed number
 * @example
 * // returns 5.6
 * toFixedFloat(5.62, 1)
 */
const toFixedFloat = (num, decimalPlaces) => parseFloat(num.toFixed(decimalPlaces))
const add = x => y => toFixedFloat((x * 100 + y * 100) / 100, 2)
const subtract = x => y => toFixedFloat((x * 100 - y * 100) / 100, 2)
const multiply = x => y => toFixedFloat(x * y, 2)
const divide = x => y => toFixedFloat(x * 100 / (y * 100), 2)
const pow = x => y => toFixedFloat(Math.pow(x, y), 2);
const sqrt = x => toFixedFloat(Math.sqrt(x), 2);
const cos = x => toFixedFloat(Math.cos(x), 2);
const sin = x => toFixedFloat(Math.sin(x), 2);
const tan = x => toFixedFloat(Math.tan(x), 2);
const atan = x => toFixedFloat(Math.atan(x), 2);

/**
 * Used to determine whether a numerator can be divided evenly by the denominator
 * @example
 * // returns true
 * isDivisibleBy(2)(4)
 * @example
 * // returns false
 * isDivisibleBy(2)(5)
 */
const isDivisbleBy = denominator => numerator => numerator % denominator === 0

/**
 * 
 * @param {(number[]|string[])} arr an array of values - must be of the same type.
 * @param {(number|string)} initialVal the value to start from. defaults to 0. if adding strings, must replace with "".
 * @returns {(number|string)} returns the sum of the items provided
 */
const sum = (arr, initialVal = 0) => arr.reduce((t, x) => t += x, initialVal)

/**
 * @param {number[]} arr 
 * @returns {number} the mean or average of the provided array of numbers
 */
const mean = arr => divide(sum(arr))(arr.length)

/**
 * @param {number[]} arr 
 * @returns {number} the largest number in the given array.
 */
const max = arr => arr.reduce((largest, cur) => cur > largest ? cur : largest, Number.MIN_SAFE_INTEGER)

/**
 * @param {number[]} arr 
 * @returns {number} the smallest number in the given array.
 */
const min = arr => arr.reduce((smallest, cur) => cur < smallest ? cur : smallest, Number.MAX_SAFE_INTEGER)

/**
 * @param {number[]} arr 
 * @returns {number} returns the difference between the largest and smallest numbers in the given array.
 */
const range = arr => {
  const [min, max] = arr.reduce((result, item) => {
    if (result.length === 0) {
      return result.concat(item);
    }
    if (result.length === 1) {
      return result[0] < item
        ? result.concat(item)
        : [item, ...result];
    }
    const [currMin, currMax] = result;
    if (item < currMin) {
      return [item, currMax];
    }
    if (item > currMax) {
      return [currMin, item];
    }
    return result;
  }, []);
  return max - min;
}

/**
 * Median is preferred over mean when there are outlying cases in the dataset which might skew
 * the "average" of the data
 * @param {number[]} arr 
 * @returns {number}
 */
const median = arr => { // better when there are outlying values
  const newArr = sort((a, b) => a - b)(arr);
  const middle = Math.floor(arr.length / 2);
  return isDivisbleBy(2)(arr.length) ?
    mean([newArr[middle], newArr[middle - 1]]) :
    newArr[middle];
}

/**
 * 
 * @param {(number[]|string[])} arr 
 * @returns {(number[]|string[])} an array of the most "popular" items
 */
const mode = arr => {
  const count = arrayCount(arr);
  const maxCount = max(Object.values(count));
  return keysByValue(count, maxCount);
}

/**
 * @param {number[]} arr 
 * @returns {number} returns the mean of the mean and max of the array.
 */
const midRange = arr => mean([max(arr), min(arr)])

// ADVANCED MATH

/**
 * @param {number[]} arr
 * @returns {number} 
 */
const variance = arr => {
  const avg = mean(arr);
  return compose(
    x => divide(x)(arr.length),
    sum,
    map(x => (x - avg) ** 2)
  )(arr);
}

/**
 * @param {number[]} arr
 * @returns {number} 
 */
const stDev = arr => toFixedFloat(Math.sqrt(variance(arr)), 5)

/**
 * @param {number} num 
 * @returns {number}
 * @example
 * // 5!
 * // returns 120 (5 * 4 * 3 * 2 * 1)
 * factorial(5)
 */
const factorial = num => {
  if (num <= 0 || isNaN(num)) return undefined;
  let result = 1;
  while (num > 1) {
    result *= num;
    num--;
  }
  return result;
}

/**
 * 
 * @param {number} r radians
 * @returns {number} degrees
 */
const toDegrees = r => r * (180 / Math.PI)

/**
 * 
 * @param {number} d degrees
 * @returns {number} radians 
 */
const toRadians = d => d * (Math.PI / 180)

/**
 * @param {number} a side length of a triangle 
 * @param {number} b other side length of the triangle
 * @returns {number} the hypotenuse
 */
const getHypotenuse = (a, b) => sqrt(pow(a, 2) + pow(b, 2))

/**
 * @param {number} s the slope of a line
 * @returns {number} degrees
 */
const slopeToDegrees = s => toDegrees(atan(s));

export {
  toFixedFloat,
  add,
  subtract,
  multiply,
  divide,
  isDivisbleBy,
  sum,
  mean,
  max,
  min,
  median,
  mode,
  range,
  midRange,
  variance,
  stDev,
  factorial,
  toRadians,
  toDegrees,
  pow,
  sqrt,
  cos,
  getHypotenuse,
  sin,
  tan,
  atan,
  slopeToDegrees
};
