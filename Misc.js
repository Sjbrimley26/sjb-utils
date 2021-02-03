/**
 * @param {string} email an email address to check
 * @returns {boolean} true if valid, false otherwise
 */
function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

/**
 * @returns {boolean} true
 */
const True = () => true;

/**
 * @returns {boolean} false
 */
const False = () => false;

/**
 * console.logs the object with nice spacing
 * @param {Object} obj an object 
 */
const prettyPrint = obj => {
  console.log(JSON.stringify(obj, null, 2));
  return obj;
};

/**
 * logs the item and returns it, changing nothing
 * @param {*} x something to log
 * @returns {*} whatever you put in
 */
const trace = x => {
  console.log(x);
  return x;
};

export {
  validateEmail,
  True,
  False,
  prettyPrint,
  trace
};
