"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../k-number/index");
describe('k-number', function () {
    test('30_000_400 -> 삼천만사백', function () {
        expect((0, index_1.kNumber)(30000400)).toBe('삼천만사백');
    });
    test('12_389_828 -> 일천이백삼십팔만구천팔백이십팔', function () {
        expect((0, index_1.kNumber)(12389828)).toBe('일천이백삼십팔만구천팔백이십팔');
    });
    test('3_000 -> 삼천', function () {
        expect((0, index_1.kNumber)(3000)).toBe('삼천');
    });
    test('12_000 -> 일만이천', function () {
        expect((0, index_1.kNumber)(12000)).toBe('일만이천');
    });
    test('34_102 -> 삼만사천일백이', function () {
        expect((0, index_1.kNumber)(34102)).toBe('삼만사천일백이');
    });
    test('10_002_030 -> 일천만이천삼십', function () {
        expect((0, index_1.kNumber)(10002030)).toBe('일천만이천삼십');
    });
    test('39_393_382 -> 삼천구백삼십구만삼천삼백팔십이', function () {
        expect((0, index_1.kNumber)(39393382)).toBe('삼천구백삼십구만삼천삼백팔십이');
    });
    test('10_002_030_202 -> 일백억이백삼만이백이', function () {
        expect((0, index_1.kNumber)(10002030202)).toBe('일백억이백삼만이백이');
    });
    test('92_193_998_394 -> 구백이십일억구천삼백구십구만팔천삼백구십사', function () {
        expect((0, index_1.kNumber)(92193998394)).toBe('구백이십일억구천삼백구십구만팔천삼백구십사');
    });
    test('9_007_199_254_740_991 -> 구천칠조일천구백구십이억오천사백칠십사만구백구십일', function () {
        expect((0, index_1.kNumber)(9007199254740991)).toBe('구천칠조일천구백구십이억오천사백칠십사만구백구십일');
    });
});
