// Iterable is an empty base class to be inherited from
// the main requirement being a "next" method which is used to determine
// the next item to be returned from the sequence.
function Iterable() {}
Iterable.prototype[Symbol.iterator] = function() {
  return this;
}

Iterable.prototype.toArray = function() {
  return [...this];
}

/**
 * @name Iterable#take
 * @param {number} n the number of elements to "take" out of the sequence
 * @returns {Array} returns an array of length n.
 */
Iterable.prototype.take = function(n) {
  const taken = [];
  for (let i = 0; i < n; i++) {
    taken.push(this.next().value);
  }
  return taken;
}

/**
 * Transforms the result of the sequence's returned values by passing them through a function.
 */
Iterable.prototype.map = function(fn) {
  const next = this.next;
  this.next = function() {
    const n = next();
    if (n.done) {
      return n;
    }
    return { value: fn(n.value), done: false };
  }
  return this;
}

Iterable.prototype.filter

/**
 * Returns a sequence of integers from a to b.
 * @param {number} from inclusive.
 * @param {number} to exlusive.
 * @returns {Iterable}
 */

const range = (from, to) => {
  let count = from - 1;
  return Object.assign(Object.create(Iterable.prototype), {
    next() {
      count++;
      if (count < to) {
        return { value: count, done: false };
      }
      return { done: true };
    }
  });
}

/**
 * Returns a sequence of the given array.
 * @param {Array} arr 
 * @returns {Iterable}
 */
const from = arr => {
  let i = 0;
  return Object.assign(Object.create(Iterable.prototype), {
    next() {
      if (i < arr.length)  {
        return { value: arr[i++], done: false };
      }
      return { done: true };
    }
  });
}

/**
 * Returns a sequence which returns the given value, infinitely.
 * @param {any} value
 * @returns {Iterable}
 */
const infinite = value => {
  return Object.assign(Object.create(Iterable.prototype), {
    next() {
      return { value, done: false };
    },
    toArray() {
      throw new Error("Cannot convert infinite sequence to array.");
    }
  });
}

export {
  range,
  from,
  infinite
}

// based on some preliminary results, the initial creation takes the most time
// and then any subsequent extractions or transformations are trivial.

// any transformations affect future take or toArray calls
// each sequence can only be iterated through once.

/*
console.time("create range")
const sample = range(0, 10000).toArray();
console.timeEnd("create range") // ~ 18ms
const test = from(sample);
// const inf = infinite(8);

// these "benchmarks" are not vary accurate, can vary hugely from run to run

// 0
console.time("take 1")
console.log(test.take(1))
console.timeEnd("take 1") // ~ 8ms (~ 26ms combined vs 2ms without array conversion)
// 1 - 10
// take 10 map 1
console.time("take 10, map 1");
console.log(test.map(x => x * 2).take(10))
console.timeEnd("take 10, map 1"); // ~ 6ms
// 11 - 110
// take 100
console.time("take 100");
console.log(test.take(100))
console.timeEnd("take 100"); // ~ 12ms

console.time("range take 1");
console.log(range(0, 10000).take(1));
console.timeEnd("range take 1"); // ~ 2ms

console.time("range take 100");
console.log(range(0, 10000).take(100));
console.timeEnd("range take 100"); // ~ 10ms
*/
