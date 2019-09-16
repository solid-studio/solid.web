import pad from 'pad'

// https://github.com/zhuangya/fakeObjectId/blob/master/index.js
export const generateFakeObjectId = () => {
    return `${generateTimestamp()}${getValue(6)}${getValue(4)}${getValue(6)}`;
}

const getValue = (length: number) => {
    var max = new Array(length + 1).join('f');
    var r = Math.random() * parseInt(max, 16) | 0;
    return pad(r.toString(16), length, '0');
}

const generateTimestamp = () => {
    return (+new Date() / 1000 | 0).toString(16);
}