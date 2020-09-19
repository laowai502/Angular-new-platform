import * as _ from 'lodash';

const a = [1, 2, 3];
const b = ['aa', 'cc', 'dd'];
let c = ['_1', '__32'];

c = [...a, ...b, ...c];

console.log(c);

const str = 'null';

console.log(str.substr(0, 1));

console.log(/^[a-zA-Z]/.test('-'));

function asort(item) {
    return item.value;
}

const arr = [
    { key: '5D002.c.1', value: '1' },
    { key: '5D002', value: '1' },
    { key: '5D002', value: '1' },
    { key: '5D002', value: '1' },
    { key: '5D002', value: '1' },
    { key: '5A002', value: '1' },
    { key: '5A002', value: '1' },
    { key: '5A002.a.1', value: '2'},
    { key: '5A002.a.1', value: '2'},
    { key: '5A002.a.3', value: '2'}
];

_.sortBy(arr, e => e.key);


console.log(arr);

