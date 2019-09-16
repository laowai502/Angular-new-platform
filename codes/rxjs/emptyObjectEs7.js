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



Object.entries(a).length === 0 && obj.constructor === Object