"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
describe('Promise Homework', () => {
    it("Sleep", async function () {
        const time = Date.now();
        await (0, utils_1.sleep)(1000).then(() => {
            const currentTime = Date.now() - time;
            expect(currentTime > 900 && currentTime < 1100);
        });
    });
    it("Timeout", async () => {
        const time = Date.now();
        await (0, utils_1.timeout)((0, utils_1.sleep)(1000), 1700)
            .then(() => {
            const currentTime = Date.now() - time;
            expect(currentTime > 900 && currentTime < 1100);
        });
        const time1 = Date.now();
        await (0, utils_1.timeout)((0, utils_1.sleep)(1500), 1000)
            .catch((err) => {
            const currentTime = Date.now() - time1;
            expect(currentTime > 900 && currentTime < 1100);
        });
    });
    it("Promisify", async () => {
        const funcParam = 'my-file.txt';
        const result = 'file content';
        const error = 'Unknown error';
        function test(param, cb) {
            cb(null, result);
        }
        const testPromise = (0, utils_1.promisify)(test);
        expect(() => testPromise(funcParam).then((data) => {
            expect(data === result);
        }));
    });
});
