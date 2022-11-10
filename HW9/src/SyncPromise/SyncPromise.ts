import {STATUSES, ThenableObject} from "./types";

export default class SyncPromise<T> {
    status: STATUSES;
    #onFulfilled: Array<(value: any) => void> = [];
    #onRejected: Array<(value: any) => void> = [];
    #value: T;
    #reason: unknown;

    constructor(constr: (resolve: (value: T) => void, reject: (reason?: any) => void) => void) {
        this.status = STATUSES.PENDING;

        this.#onFulfilled = [];
        this.#onRejected = [];

        const resolve = (value: ThenableObject<T>): void => {
            if(this.status === STATUSES.PENDING) {
                return;
            }

            if(value !== null  && typeof value.then === 'function') {
                value.then(resolve, reject);
            }

            this.status = STATUSES.FULFILLED;
            this.#reason = value;

            for(const fn of this.#onFulfilled){
                fn(this.#value);
            }
        }

        const reject = (err: Error | string | unknown): void => {
            if(this.status === STATUSES.PENDING) {
                return;
            }

            this.status = STATUSES.REJECTED;
            this.#reason = err;

            for(const fn of this.#onRejected){
                fn(this.#reason);
            }

            queueMicrotask(() => {
                if(this.#onRejected.length === 0) {
                   void Promise.reject(this.#reason);
                }
            })
        }

        try{
            constr(resolve, reject);
        } catch (err) {
            reject(err)
        }
    }

    then<T>(
        onFulfilled?: ((value: unknown) => any | undefined | null),
        onRejected?: (((err: any) => T) | undefined | null)
    ): SyncPromise<T> {
        return new SyncPromise((resolve, reject) => {
            const wrappedResolve = () => {
                try{
                    resolve(onFulfilled ? onFulfilled(this.#value) : this.#value);
                } catch (err) {
                    reject(err);
                }
            }

            const wrappedReject = () => {
                if(onRejected){
                    try{
                        resolve(onRejected(this.#reason));
                    } catch (err) {
                        reject(err);
                    }
                } else {
                    reject(this.#reason);
                }
            }

            if(this.status === STATUSES.FULFILLED) {
                wrappedResolve();
                return;
            }
            if(this.status === STATUSES.REJECTED) {
                wrappedReject();
                return;
            }

            this.#onFulfilled.push(wrappedResolve);
            this.#onRejected.push(wrappedReject);
        })
    }

    catch(onRejected): SyncPromise<T> {
        return new SyncPromise((resolve, reject) => {
            const wrappedReject = () => {
                if(onRejected){
                    try{
                        resolve(onRejected(this.#reason));
                    } catch (err) {
                        reject(err);
                    }
                } else {
                    reject(this.#reason);
                }
            }
            if(this.status === STATUSES.FULFILLED){
                resolve(this.#value);
                return;
            }

            if(this.status === STATUSES.REJECTED) {
                wrappedReject();
                return;
            }

            this.#onFulfilled.push(resolve);
            this.#onRejected.push(wrappedReject);
        })
    }

    finally(cb): SyncPromise<T> {
        return new SyncPromise((resolve, reject) => {
            const wrappedResolve = () => {
                try {
                    let res = cb();

                    if(typeof res.then === "function") {
                        res = res.then(() => this.#value);
                    } else {
                        res = this.#value
                    }

                    resolve(res);
                } catch (err) {
                    reject(err);
                }
            }

            const wrappedReject = () => {
                try {
                    let res = cb();

                    if(typeof res.then === "function") {
                        res = res.then(() => {
                            throw this.#reason;
                        });
                        resolve(res);
                    } else {
                        reject(this.#reason);
                    }

                } catch (err) {
                    reject(err);
                }
            }

            if(this.status === STATUSES.FULFILLED) {
                wrappedResolve();
                return;
            }
            if(this.status === STATUSES.REJECTED) {
                wrappedReject();
                return;
            }

            this.#onFulfilled.push(wrappedResolve);
            this.#onRejected.push(wrappedReject);
        })
    }

    static resolve<T>(val: T = undefined): SyncPromise<T> {
        if(val instanceof SyncPromise){
            return val;
        }

        return new SyncPromise((resolve) => {
            resolve(val);
        })
    }

    static reject<T>(val: T = undefined): SyncPromise<T> {
        return new SyncPromise((_, reject) => {
            reject(val);
        })
    }

    static all<T>(iterable: Iterable<T>){
        const tasks: any[]  = Array.from(iterable);

        if(tasks.length === 0) SyncPromise.resolve([]);

        return new SyncPromise((resolve, reject) => {
            const results = new Array(tasks.length);
            let done = 0;

            for(let i = 0; i < tasks.length; i++) {
                tasks[i] = SyncPromise.resolve(tasks[i]);

                tasks[i].then((res) => {
                    results[i] = res;
                    done++;

                    if(done === tasks.length){
                        resolve(results);
                    }
                }).catch(reject);
            }
        })
    }

    static allSettled<T>(iterable: Iterable<T>){
        const tasks: any[] = Array.from(iterable);

        if(tasks.length === 0) SyncPromise.resolve([]);

        return new SyncPromise((resolve) => {
            const results = new Array(tasks.length);
            let done = 0;

            for(let i = 0; i < tasks.length; i++) {
                tasks[i] = SyncPromise.resolve(tasks[i]);

                tasks[i].then((value) => {
                    results[i] = { status: STATUSES.FULFILLED, value };
                    done++;

                    if(done === tasks.length){
                        resolve(results);
                    }
                }).catch((reason) => {
                    results[i] = { status: STATUSES.REJECTED, value: reason };
                    done++;

                    if(done === tasks.length){
                        resolve(results);
                    }
                });
            }
        })
    }

    static race<T>(iterable: Iterable<T>){
        const tasks = Array.from(iterable);

        if(tasks.length === 0) SyncPromise.resolve([]);

        return new SyncPromise((resolve, reject) => {
            for(let i = 0; i < tasks.length; i++) {
                SyncPromise.resolve(tasks[i]).then(resolve, reject);
            }
        })
    }

    static any<T>(iterable: Iterable<T>) {
        const tasks: any[] = Array.from(iterable);

        if(tasks.length === 0) SyncPromise.resolve([]);

        return new SyncPromise((resolve, reject) => {
            const results = new Array(tasks.length);
            let done = 0;

            for (let i = 0; i < tasks.length; i++) {
                tasks[i] = SyncPromise.resolve(tasks[i]);

                tasks[i]
                    .then((data) => {
                        resolve(data);
                    })
                    .catch((err) => {
                        done++;
                        results[i] = err;
                        if (done === tasks.length) {
                            reject(results);
                        }
                    })
            }
        })
    }
}
