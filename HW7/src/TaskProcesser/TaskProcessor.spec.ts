import TaskProcessor from './TaskProcessor';

describe('TaskProcessor implementation. Refinement of the forEach function - ensuring the processing of several tasks with the distribution of the cycle time between them', () => {
    it('forEach must iterate huge iterables with no I/O blocking', () => {
        const taskProcessor = new TaskProcessor();
        const nums = [...Array(1e5).keys()];
        let sumOfNums = 0;

        expect(
            taskProcessor.forEach(nums, (num) => {
                sumOfNums++;
            }).then(() => {
                expect(sumOfNums === 1e5);
            }),
        );
    });

    it('Attemtp to work with non-iterable object', () => {
        const taskProcessor = new TaskProcessor();
        const nums = 1234567;

        expect(() =>
            taskProcessor
                // @ts-expect-error
                .forEach(nums, (num) => {
                    console.log(num);
                }),
        ).toThrow('Not Iterable');
    });

    it('Attemtp to work with no callback provided', () => {
        const taskProcessor = new TaskProcessor();
        const nums = [...Array(5e5).keys()];

        // @ts-expect-error
        expect(() => taskProcessor.forEach(nums)).toThrowError('Cb is not a function');
    });

    it('Task processor must iterate serial of huge iterables with no I/O blocking', () => {
        const taskProcessor = new TaskProcessor();
        const nums = [...Array(4e4).keys()];

        let firstTaskResult = 0;
        let secondTaskResult = 0;

        const taskResultsArray: number[] = [];

        const firstTask = taskProcessor
            .forEach(nums, () => {
                firstTaskResult++;
            })
            .then(() => {
                taskResultsArray.push(firstTaskResult);
            });

        setTimeout(() => {
            const secondTask = taskProcessor
                .forEach(nums, () => {
                    secondTaskResult++;
                })
                .then(() => {
                    taskResultsArray.push(secondTaskResult);
                });

            Promise.all([firstTask, secondTask]).then(() => {
                expect(taskResultsArray).toEqual([4e4, 8e4]);
            });
        }, 150);
    });
})