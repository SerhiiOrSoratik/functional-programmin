let _ = require("lodash");

const figures = [
  {
    type: "rectangle",
    color: "red",
    width: 5,
    height: 9,
  },
  {
    type: "rectangle",
    color: "black",
    width: 3,
    height: 4,
  },
  {
    type: "square",
    color: "black",
    width: 5,
    height: 5,
  },
  {
    type: "square",
    color: "black",
    width: 8,
    height: 8,
  },
  {
    type: "rectangle",
    color: "red",
    width: 5,
    height: 3,
  },
];

let hasColor = _.curry((c, r) => r.color == c);
const isRed = hasColor("red");
const isBlack = hasColor("black");

let hasType = _.curry((c, r) => r.type == c);
const isRectangle = hasType("rectangle");
const isSquare = hasType("square");

const _filter = _.curry((fun, arr) => {
  return arr.filter(fun);
});

const calculateArea = (n) => {
  return n.width * n.height;
};

const _map = _.curry((fun, arr) => {
  return arr.map(fun);
});

const sumPerimeter = (current, order) =>
  current + (order.width * 2 + order.height * 2);

const _reduce = _.curry((fn, initValue, arr) => {
  return arr.reduce(fn, initValue);
});

const _max = (arr) => {
  return Math.max(...arr);
};

const flow =
  (...arrayFunctions) =>
  (figures) => {
    return arrayFunctions.reduce((result, current) => {
      return current(result);
    }, figures);
  };

const combine =
  (...arrayFunctions) =>
  (figures) => {
    return arrayFunctions.reduceRight((result, current) => {
      return current(result);
    }, figures);
  };

// predicates 
const and = (fn1, fn2) => (figure) => {
  return fn1(figure) === true && fn2(figure) === true ? true : false;
};

const or = (fn1, fn2) => (figure) => {
  return fn1(figure) === true || fn2(figure) === true ? true : false;
};

const all =
  (...fn) =>
  (figure) => {
    return fn.every((f) => f(figure) === true);
  };

const any = (...fn) => 
(figure) => {
    let result = false;
    fn.forEach(f => {
        if (f(figure)) {
            result = true;
        }
    })
    return result;
}


console.log("\n reduce \n");
console.log(
  "Максимальна площа із всіх чорних квадратів: " +
    flow(_filter(and(isBlack, isSquare)), _map(calculateArea), _max)(figures)
);

console.log(
  "Сума периметрів всіх червоних прямокутників: " +
    flow(_filter(and(isRed, isRectangle)), _reduce(sumPerimeter, 0))(figures)
);

console.log("\n combine \n");
console.log(
  "Максимальна площа із всіх чорних квадратів: " +
    combine(_max, _map(calculateArea), _filter(and(isBlack, isSquare)))(figures)
);

console.log(
  "Сума периметрів всіх червоних прямокутників: " +
    combine(_reduce(sumPerimeter, 0), _filter(and(isRed, isRectangle)))(figures)
);
