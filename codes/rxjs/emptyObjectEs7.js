const a = {
    a: 1,
    b: '2',
    c: null,
    d: NaN,
    e: undefined,
    f: {
        a: null,
        b: undefined
    },
    g: {
        a: NaN,
        b: 0,
        c: false
    }
};

Object.entries(a).length === 0 && obj.constructor === Object;

var aa = {
    b: 1,
    c: 2,
    d: 3
};

var c = {
    b: 2
};

var b = {};

console.log(Object.getOwnPropertyNames(aa));
console.log(Object.getOwnPropertyNames(b));

delete c.a;

console.info(c);