import {forEach} from "./ForEach";

describe('ForEach function implementation', () => {
    it('forEach must iterate huge iterables with no I/O blocking', () => {
        const nums = [...Array(1e5).keys()];
        let sumOfNums = 0;

        expect(
            forEach(nums, (num) => {
                sumOfNums++;
            }).then(() => {
                expect(sumOfNums === 1e5);
            }),
        );
    });
})