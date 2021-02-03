/**
 * A mix-in function, when you call it on a function the returned function
 * does the same thing as the original but logs the duration of the function.
 * @param {function} fn any function
 * @returns {function} does the same thing as the provided function.
 */
const addTimer = fn => {
  return function() {
    console.time(fn.name + " duration");
    const res = fn.apply(this, arguments);
    console.timeEnd(fn.name + " duration");
    return res;
  }
}

export {
  addTimer
};
