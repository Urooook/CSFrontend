"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isNumber_1 = require("./isNumber");
describe('isNumber', () => {
    test('should detect Arabic number', () => {
        expect((0, isNumber_1.default)('123')).toEqual(true);
    });
    test('should detect Roman number', () => {
        expect((0, isNumber_1.default)('Ⅻ')).toEqual(true);
    });
    test('should detect Devanagari number', () => {
        expect((0, isNumber_1.default)('०१२३४५६७८९')).toEqual(true);
    });
    test('should detect Bengali number', () => {
        expect((0, isNumber_1.default)('০১২৩৪৫৬৭৮৯')).toEqual(true);
    });
    test('should detect Gurmukhi number', () => {
        expect((0, isNumber_1.default)('੦੧੨੩੪੫੬੭੮੯')).toEqual(true);
    });
    test('should detect Brahmi number', () => {
        expect((0, isNumber_1.default)('𑁦𑁧𑁨𑁩𑁪𑁫𑁬𑁭𑁮𑁯')).toEqual(true);
    });
    test('should detect Thai number', () => {
        expect((0, isNumber_1.default)('๐๑๒๓๔๕๖๗๘๙')).toEqual(true);
    });
    test('should be falsy for mixed number', () => {
        expect((0, isNumber_1.default)('123Ⅻ')).toEqual(false);
    });
    test('should be falsy for mixed content', () => {
        expect((0, isNumber_1.default)('123ABC')).toEqual(false);
    });
    test('should be falsy for letters', () => {
        expect((0, isNumber_1.default)('ABC')).toEqual(false);
    });
});
