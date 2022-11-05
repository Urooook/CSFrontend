"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ForEach_1 = require("./ForEach");
describe('ForEach function implementation', () => {
    it('forEach must iterate huge iterables with no I/O blocking', () => {
        const nums = [...Array(1e5).keys()];
        let sumOfNums = 0;
        expect((0, ForEach_1.forEach)(nums, (num) => {
            sumOfNums++;
        }).then(() => {
            expect(sumOfNums === 1e5);
        }));
    });
});
