const compose = (...functions) => args => functions.reduceRight((arg, fn) => fn(arg), args);

const _pipe = (a, b) => (arg) => b(a(arg));

const pipe = (...ops) => ops.reduce(_pipe)

const unary = fn => arg => fn(arg);

function once(fn, context) { 
	var result;

	return function() { 
		if(fn) {
			result = fn.apply(context || this, arguments);
			fn = null;
		}

		return result;
	};
}

export {
  compose,
  unary,
  pipe,
  once
};
