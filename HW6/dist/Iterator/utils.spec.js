"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
describe('Implementation of take - iterates over the first N iterations of iterable', () => {
    it('Take must iterate with provided amount of iterations', () => {
        const numbers = [1, 2, 3, 4, 5, 6, 7];
        const string = 'Hello, world!';
        expect([...(0, utils_1.take)(numbers, 3)]).toEqual([1, 2, 3]);
        expect([...(0, utils_1.take)(string, 5)].join('')).toBe('Hello');
    });
});
describe('Implementation of filter - iterates over the elements of iterable, that satisfies the predicate function', () => {
    it('Filter must iterate over the collection and skip inappropriate elements', () => {
        const numbers = [1, 2, 3, 4, 5, 6, 7];
        const string = 'Hello, world!';
        expect([...(0, utils_1.filter)(numbers, (elm) => elm % 2 !== 0)]).toEqual([1, 3, 5, 7]);
        expect([...(0, utils_1.filter)(string, (elm) => /\w/.test(elm))].join('')).toBe('Helloworld');
    });
});
describe('Implementation of enumerate - iterates over the elements of iterable by pair of index and value', () => {
    it('Enumerate must iterate over the collection and provide index-value pairs', () => {
        const numbers = [1, 2, 3];
        const string = 'Hello';
        expect([...(0, utils_1.enumerate)(numbers)]).toEqual([
            [0, 1],
            [1, 2],
            [2, 3],
        ]);
        expect([...(0, utils_1.enumerate)(string)]).toEqual([
            [0, 'H'],
            [1, 'e'],
            [2, 'l'],
            [3, 'l'],
            [4, 'o'],
        ]);
    });
});
describe('Implementation of seq - iterates through the all of provided iterables', () => {
    it('Seq must iterate all the elements of provided collections', () => {
        const numbers = [1, 2, 3];
        const string = 'Foo';
        const set = new Set([true, false]);
        expect([...(0, utils_1.seq)(numbers, string, set)]).toEqual([1, 2, 3, 'F', 'o', 'o', true, false]);
    });
});
describe('Implementation of zip - concurrently iterates through the all of provided iterables and returns tuples of elements', () => {
    it('Zip must concurrently iterate through the collections and provide corresponding elements within tuple', () => {
        const numbers = [1, 2, 3];
        const string = 'Foo';
        const set = new Set([true, false]);
        expect([...(0, utils_1.zip)(numbers, string, set)]).toEqual([
            [1, 'F', true],
            [2, 'o', false],
            [3, 'o', undefined]
        ]);
    });
});
describe('Implementation of mapSeq - iterates over the elements of iterable and applies the series of provided functions to them', () => {
    it('MapSeq must iterate all the elements of collection and apply the series of functions to them', () => {
        const numbers = [1, 2, 3];
        const numberMappers = [(num) => num * 2, (num) => num + 1, (num) => num + num];
        expect([...(0, utils_1.mapSeq)(numbers, numberMappers)]).toEqual([6, 10, 14]);
        const string = 'r2d2';
        const stringMappers = [(str) => str.toUpperCase(), (str) => str.replace(/\d/, ' ')];
        expect([...(0, utils_1.mapSeq)(string, stringMappers)].join('')).toBe('R D ');
    });
});
describe('Iterable helper functions composition', () => {
    it('Composition of seq, filter, take and enumerate must provide correct result', () => {
        const pseudoNumbers = [1, '2', 3, '4', 5];
        const string = 'Foo';
        const iterableComposition = (0, utils_1.enumerate)((0, utils_1.take)((0, utils_1.filter)((0, utils_1.seq)(pseudoNumbers, string), (elm) => typeof elm === 'string'), 3));
        expect([...iterableComposition]).toEqual([
            [0, '2'],
            [1, '4'],
            [2, 'F'],
        ]);
    });
});
