"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TaskManager_1 = require("./TaskManager");
describe('TaskManager implementation. Refinement of the forEach function - ensuring the processing of several tasks with the distribution of the cycle time between them', () => {
    it('forEach must iterate huge iterables with no I/O blocking', () => {
        const taskManager = new TaskManager_1.default();
        const nums = [...Array(1e5).keys()];
        let sumOfNums = 0;
        expect(taskManager.forEach(nums, (num) => {
            sumOfNums++;
        }).then(() => {
            expect(sumOfNums === 1e5);
        }));
    });
    it('Attemtp to work with non-iterable object', () => {
        const taskManager = new TaskManager_1.default();
        const nums = 1234567;
        expect(() => taskManager
            // @ts-expect-error
            .forEach(nums, (num) => {
            console.log(num);
        })).toThrow('Not Iterable');
    });
    it('Attemtp to work with no callback provided', () => {
        const taskManager = new TaskManager_1.default();
        const nums = [...Array(5e5).keys()];
        // @ts-expect-error
        expect(() => taskManager.forEach(nums)).toThrowError('Cb is not a function');
    });
    it('Task processor must iterate serial of huge iterables with no I/O blocking', () => {
        const taskManager = new TaskManager_1.default();
        const nums = [...Array(4e4).keys()];
        let firstTaskResult = 0;
        let secondTaskResult = 0;
        const taskResultsArray = [];
        const firstTask = taskManager
            .forEach(nums, () => {
            firstTaskResult++;
        })
            .then(() => {
            taskResultsArray.push(firstTaskResult);
        });
        setTimeout(() => {
            const secondTask = taskManager
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
    it('Task manager must iterate within the task priorities order', () => {
        const taskManager = new TaskManager_1.default();
        const nums = [...Array(1e4).keys()];
        const resultsArray = [];
        let lowPriorityTaskResult = 0;
        let averagePriorityTaskResult = 0;
        let highPriorityTaskResult = 0;
        let criticalPriorityTaskResult = 0;
        const lowPriorityTask = taskManager
            .forEach(nums, () => {
            lowPriorityTaskResult += 1;
        }, { priority: 'low' })
            .then(() => {
            resultsArray.push(lowPriorityTaskResult);
        });
        const averagePriorityTask = taskManager
            .forEach(nums, () => {
            averagePriorityTaskResult += 2;
        })
            .then(() => {
            resultsArray.push(averagePriorityTaskResult);
        });
        const highPriorityTask = taskManager
            .forEach(nums, () => {
            highPriorityTaskResult += 3;
        }, { priority: 'high' })
            .then(() => {
            resultsArray.push(highPriorityTaskResult);
        });
        const criticalPriorityTask = taskManager
            .forEach(nums, () => {
            criticalPriorityTaskResult += 4;
        }, { priority: 'critical' })
            .then(() => {
            resultsArray.push(criticalPriorityTaskResult);
        });
        Promise.all([lowPriorityTask, averagePriorityTask, highPriorityTask, criticalPriorityTask]).then(() => {
            expect(resultsArray).toEqual([4e4, 3e4, 2e4, 1e4]);
        });
    });
});
