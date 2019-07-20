function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const True = () => true;
const False = () => false;

const prettyPrint = obj => {
  console.log(JSON.stringify(obj, null, 2));
  return obj;
};

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
