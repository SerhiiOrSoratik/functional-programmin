let flow = require('lodash/fp/flow');
let filter = require('lodash/fp/filter');
let map = require('lodash/fp/map');
let reduce = require('lodash/fp/reduce');

let _ = require('lodash')

const figures = [
    {
        type: 'rectangle',
        color: 'red',
        width: 5,
        height: 9
    },
    {
        type: 'rectangle',
        color: 'black',
        width: 3,
        height: 4
    },
    {
        type: 'square',
        color: 'black',
        width: 5,
        height: 5
    },
    {
        type: 'square',
        color: 'black',
        width: 8,
        height: 8
    },
    {
        type: 'rectangle',
        color: 'red',
        width: 5,
        height: 3
    },
];

    let hasColor = _.curry((c, r) => r.color == c)
    const isRed = hasColor('red');
    const isBlack = hasColor('black');

    let isDesiredFigure = _.curry((c, t, r) => (r.color == c && r.type == t));
    const isBlackSquare = isDesiredFigure('black', 'square');
    const isRedRectangle = isDesiredFigure('red', 'rectangle');
    // console.log(isBlackSquare(figures[2]))

    const _filter = _.curry((fun, arr) => {
        return arr.filter(fun);
    });

    const calculateArea = (n) => {
            return n.width * n.height;
          }
    
    const _map = _.curry((fun, arr) => {
        return arr.map(fun);
    })
    // console.log(myMap(square)(figures))

    const sumPerimeter = (current, order) => current + (order.width * 2 + order.height * 2);
    
    const _reduce = _.curry((fn, initValue, arr) => {
        return arr.reduce(fn, initValue);
    })

    const _max = (arr) => {
        return Math.max(...arr);
    }

    const testFlow = (arrayFunctions) => (figures) => {
        let result = figures;
        arrayFunctions.forEach(func => {
            result = func(result)
        })

        // arrayFunctions.reduce((result, fn) => fn(result));

        return result;
    }

    const maxAreaBS = [_filter(isBlackSquare), _map(calculateArea), _max]

    const sumRRPFunctionArray = [_filter(isRedRectangle), _reduce(sumPerimeter, 0)]

    console.log(testFlow(maxAreaBS)(figures))
    console.log(testFlow(sumRRPFunctionArray)(figures))