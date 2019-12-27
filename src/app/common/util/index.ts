export function cleanArray(actual) {
    const newArray = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i]);
        }
    }
    return newArray;
}

export const param = (json: any) => {
    if (!json) { return ''; }
    return cleanArray(Object.keys(json).map(key => {
        if (json[key] === undefined) { return ''; }
        return encodeURIComponent(key) + '=' +
            encodeURIComponent(json[key]);
    })).join('&');
};

export function param2Obj(url: string) {
    const search = url.split('?')[1];
    if (!search) {
        return {};
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
}

/**
 * 返回数据类型的字符串
 * @param obj 入参
 * @returns string
 */
export const checkType = (obj: any) => Object.prototype.toString.call(obj).slice(8, -1);
/**
 * 去除对象中的null, undefined, '', 顺便deepCopy了
 * @params obj 入参
 */
export const removeObjectEmptyValue = (obj: any): object => {
    const params = {};
    if (obj === null || obj === undefined || obj === '') {
        return params;
    }
    for (const key in obj) {
        if (checkType(obj[key]) === 'Object') {
            params[key] = removeObjectEmptyValue(obj[key]);
        } else if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
            params[key] = obj[key];
        }
    }
    return params;
};
/**
 * 去除Object对象中的null, undefined, 但不包括Array
 * @params obj 入参
 */
export const removeObjectEmpty = (obj: any): object => {
    const params = {};
    if (obj === null || obj === undefined || obj === '') {
        return params;
    }
    if (checkType(obj) === 'Array') {
        return obj;
    }
    for (const key in obj) {
        if (checkType(obj[key]) === 'Object') {
            params[key] = removeObjectEmpty(obj[key]);
        } else if (obj[key] !== null && obj[key] !== undefined) {
            params[key] = obj[key];
        }
    }
    return params;
};