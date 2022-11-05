import {ForEachOptions, Priority, Task, TaskPriorityExecTimeRatio} from "./interface";
import PriorityQueue from "./PriorityQueue";

export default class TaskManager {
    #maxTime: number = 100;
    #taskTime: number = this.#maxTime;
    #averageTaskExecTime: number = this.#maxTime;
    #delay: number = 100;
    #taskPool: Set<Task> = new Set();
    #taskQueue: PriorityQueue<Task> = new PriorityQueue();
    #isStarted: boolean = false;

    constructor(max: number = null, delay: number = null) {
        if(max) this.#maxTime = max;
        if(delay) this.#delay = delay;
    }

    *#createWorker<T, I extends Iterable<T>>(
        iterable: I,
        cb: (el: T, i: number, data: I) => void,
        priority: Priority
        ): Generator<'stop' | Error>{
        const iterator = iterable[Symbol.iterator]();
        let time = Date.now();
        let index = 0;

        while(true){
            const { value, done } = iterator.next();

            if(done) return;

            if(Date.now() - time > this.#averageTaskExecTime * TaskPriorityExecTimeRatio[priority]) {
                yield 'stop';
                time = Date.now();
            }

            try{
                cb(value, index, iterable);
            } catch (err) {
                if(err instanceof Error) yield err;
            }

            index += 1;
        }
    }

    #setupTaskQueueAndAverageExecTime(): void {
        let overallTaskExecTimeRatios = 0;
        for (const task of this.#taskPool.values()) {
            overallTaskExecTimeRatios += TaskPriorityExecTimeRatio[task.priority];

            this.#taskQueue.insert(
                task,
                (taskOfPool) => TaskPriorityExecTimeRatio[taskOfPool.priority] < TaskPriorityExecTimeRatio[task.priority],
            );
        }

        this.#averageTaskExecTime = this.#maxTime / overallTaskExecTimeRatios;
    }

    #iterate(): void {
        this.#setupTaskQueueAndAverageExecTime();

        let task = this.#taskQueue.remove();
        while (task) {
            const { done, value } = task.worker.next();

            if (done) {
                this.#taskPool.delete(task);
                task.resolve();
            }

            if (value instanceof Error) task.reject(value);

            task = this.#taskQueue.remove();
        }

        setTimeout(() => {
            if (this.#taskPool.size > 0) {
                this.#iterate();
            } else {
                this.#isStarted = false;
            }
        }, this.#delay);
    }


    #execute(): void {
        if(!this.#isStarted){
            this.#isStarted = true;
            this.#iterate()
        }
    }

    forEach<T, I extends Iterable<T>>(
        iterable: I,
        cb: (el: T, i: number, data: I) => void,
        options: ForEachOptions = {priority: 'average'}
    ): Promise<void> {
        if(typeof iterable[Symbol.iterator] !== 'function'){
            throw new Error('Not Iterable');
        }

        if(typeof cb !== 'function'){
            throw new Error('Cb is not a function');
        }

        const { priority } = options;
        const worker = this.#createWorker(iterable, cb, priority);

        return new Promise((resolve, reject) => {
            this.#taskPool.add({worker, priority, resolve, reject});
            this.#execute();
        })
    }
}