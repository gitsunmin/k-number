"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kNumber = void 0;
var isInteger = function (num) { return num % 1 === 0; };
var kNumber = function (number) {
    if (number > 9007199254740991) {
        throw new Error('k-number: number is too big');
    }
    var units = ['', '만', '억', '조', '경'];
    var nums = ['', '십', '백', '천'];
    var trans = {
        '0': '',
        '1': '일',
        '2': '이',
        '3': '삼',
        '4': '사',
        '5': '오',
        '6': '육',
        '7': '칠',
        '8': '팔',
        '9': '구',
    };
    var numberArray = number.toString().split('').reverse();
    var data = numberArray.map(function (number, index) {
        var unit = isInteger(index / 4) ? units[index / 4] : '';
        if (number !== '0') {
            return (trans[number] + (trans[number] === '' ? '' : nums[index % 4]) + unit);
        }
        else if (unit !== '' &&
            numberArray.slice(index, index + 4).join('') !== '0000') {
            return unit;
        }
        else
            return '';
    });
    return data.reverse().join('');
};
exports.kNumber = kNumber;
