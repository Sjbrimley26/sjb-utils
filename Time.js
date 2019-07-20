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
