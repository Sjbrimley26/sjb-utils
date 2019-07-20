import * as Arrays from "./Arrays";
import * as Functions from "./Functions";
import * as Math from "./Math";
import * as Objects from "./Objects";
import * as Random from "./Random";
import * as Strings from "./Strings";
import * as Misc from "./Misc";
import * as Time from "./Time";

const prettyPrint = obj => {
  console.log(JSON.stringify(obj, null, 2));
  return obj;
};

const trace = x => {
  console.log(x);
  return x;
};

export {
  Arrays,
  Functions,
  Math,
  Objects,
  Random,
  Strings,
  prettyPrint,
  Misc,
  trace,
  Time
};
