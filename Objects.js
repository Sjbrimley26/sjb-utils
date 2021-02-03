import { compact } from "./Arrays.js";

/**
 * @param {string} key the property of the object to return the value for 
 * @example
 * // returns 1
 * get('a')({ a: 1 })
 */
const get = key => obj => obj[key];

/**
 * @param {string} key the property to set the value of
 * @param {*} value the value to be set
 * @example
 * // returns the given object, { a: 2 }
 * set(a, 2)({ a: 1 })
 */
const set = (key, value) => obj => {
   obj[key] = value;
   return obj;
}

/**
 * @param {function} fn a function to change the values given
 * @example
 * // returns { a: 4, b: 6 }
 * map(x => x * 2)({ a: 2, b: 3 })
 */
const map = fn => obj => {
  const newValues = Object.values(obj).map(fn);
  return Object.keys(obj).reduce((newObj, key, i) => {
    newObj[key] = newValues[i];
    return newObj;
  }, {});
}

/**
 * 
 * @param {Object} obj any object 
 * @param {*} val the value to search for
 * @returns {Array} an array of the keys the object has which hold the given value
 * @example
 * // returns ["a", "b"]
 * keysByValue({ a: 1, b: 2, c:1 }, 1)
 */
const keysByValue = (obj, val) => { // returns an array of keys of an object which are the given value
  return compact(Object.keys(obj).map(key => {
    if (obj[key] === val) return key;
  }));
}

/**
 * @param {function} fn the sort function (same as arrays)
 * @returns a new object, with the keys sorted by their values
 * @example
 * // returns { b: 1, a: 2 }
 * sort((a, b) => a - b)({ a: 2, b: 1 })
 */
const sort = fn => obj => {
  const sorted = [...Object.values(obj)].sort(fn);
  return sorted.reduce((newObj, val) => {
    keysByValue(obj, val).forEach(key => {
      let k = isNaN(parseInt(key)) ? key : "x" + key;
      newObj[k] = val;
    });
    return newObj;
  }, {});
}

export {
  get,
  set,
  map,
  keysByValue,
  sort
};