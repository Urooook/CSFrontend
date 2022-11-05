type Task = {
    worker: Generator<'stop' | Error>;
    resolve: (v?: any) => void;
    reject: (v?: any) => void;
}

export default class TaskProcessor {
    #maxTime: number = 100;
    #taskTime: number = this.#maxTime;
    #delay: number = 100;
    #taskPool: Set<Task> = new Set();
    #isStarted: boolean = false;

    constructor(max: number = null, delay: number = null) {
        if(max) this.#maxTime = max;
        if(delay) this.#delay = delay;
    }

    *#createWorker<T, I extends Iterable<T>>(iterable: I, cb: (el: T, i: number, data: I) => void): Generator<'stop' | Error>{
        const iterator = iterable[Symbol.iterator]();
        let time = Date.now();
        let index = 0;

        while(true){
            const { value, done } = iterator.next();

            if(done) return;

            if(Date.now() - time > this.#maxTime) {
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

    #iterate(): void {
        this.#taskTime = this.#maxTime / (this.#taskPool.size || 1);

        for(const el of this.#taskPool.values()) {
            const {done, value} = el.worker.next()

            if(done) {
                this.#taskPool.delete(el);
                el.resolve();
            }

            if(value instanceof Error) el.reject(value);

            setTimeout(() => {
                if(this.#taskPool.size > 0){
                    this.#iterate();
                } else {
                    this.#isStarted = false;
                }
            }, this.#delay);
        }
    }

    #execute(): void {
        if(!this.#isStarted){
            this.#isStarted = true;
            this.#iterate()
        }
    }

    forEach<T, I extends Iterable<T>>(iterable: I,  cb: (el: T, i: number, data: I) => void): Promise<void> {
        if(typeof iterable[Symbol.iterator] !== 'function'){
            throw new Error('Not Iterable');
        }

        if(typeof cb !== 'function'){
            throw new Error('Cb is not a function');
        }

        const worker = this.#createWorker(iterable, cb);

        return new Promise((resolve, reject) => {
            this.#taskPool.add({worker, resolve, reject});
            this.#execute();
        })
    }
}

const taskProcessor = new TaskProcessor();

let total = 0;

const nums = [...Array(5e6).keys()]
const nums1 = [...Array(2e6).keys()]
const nums2 = [...Array(3e6).keys()]
const nums3 = [...Array(4e6).keys()]

taskProcessor.forEach(nums, (el) => {
    total++;
}).then(() => {
    console.log(total);
});

taskProcessor.forEach(nums1, (el) => {
    total++;
}).then(() => {
    console.log(total);
});

taskProcessor.forEach(nums2, (el) => {
    total++;
}).then(() => {
    console.log(total);
});

taskProcessor.forEach(nums3, (el) => {
    total++;
}).then(() => {
    console.log(total);
});


