import {promisify, sleep, timeout} from "./utils";

describe('Promise Homework',  () => {
    it("Sleep", async function () {
        const time = Date.now();
        await sleep(1000).then(() => {
            const currentTime = Date.now() - time;
            expect(currentTime> 900 && currentTime < 1100);
        })
    });

    it("Timeout", async () => {
        const time = Date.now();
        await timeout(sleep(1000), 1700)
            .then(() => {
                const currentTime = Date.now() - time;
                expect(currentTime> 900 && currentTime < 1100);
            })

        const time1 = Date.now();
        await timeout(sleep(1500), 1000)
            .catch((err) => {
                const currentTime = Date.now() - time1;
                expect(currentTime> 900 && currentTime < 1100);
            })
    });

    it("Promisify", async () => {
        const funcParam = 'my-file.txt';
        const result = 'file content';
        const error = 'Unknown error';

        function test(param: number, cb: (err: unknown, result: unknown) => void) {
            cb(null, result);
        }

        const testPromise = promisify(test);
        expect(() => testPromise(funcParam).then((data) => {
            expect(data === result)
        }))
    });
})