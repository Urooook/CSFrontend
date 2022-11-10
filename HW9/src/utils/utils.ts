import {PromisifiableFunction, ThunkCallback} from "../types/types";

const fetchUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=111836d36d452866f627599b193d2401&units=metric'

export const sleep = (delay: number): Promise<void> => {
    return new Promise<void>((resolve) => {
        setTimeout(resolve, delay)
    })
}

export const timeout = (func: Promise<void> | Promise<Response>, delay: number) => {
    const fetchPromise = new Promise((res) => {
       func.then((data) => res(data));
    })
    const timeOut = new Promise((_, reject) => {
        setTimeout(reject, delay);
    })
    return Promise.race([timeOut, fetchPromise]).then(console.log).catch(console.error)
}

export const promisify = <T>(func: PromisifiableFunction) => {
    return function (...args: any[]): Promise<T> {
        return new Promise((resolve, reject) => {
            function callback(err: Error | null, result: T) {
                if (err !== undefined && err !== null) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }

            args.push(callback);
            func.call(undefined, ...args);
        });
    };
}

type InnerFunc<T> = () => T | Promise<T>;

export const allLimit = <T>(
    iterable: Iterable<InnerFunc<T>>,
    limit
): Promise<T[]> => {
    const tasks = Array.from(iterable);
    const results = new Array(tasks.length);
    let pending = 0,
        done = 0,
        cursor = 0,
        rejected = false;

    const iter = iterable[Symbol.iterator]();

    const execution = (func, idx, resolve, reject) => {
        Promise.resolve(func())
            .then((data) => {
                done++;
                pending--;
                results[idx] = data;
                if (done === tasks.length) {
                    resolve(results);
                }
                if (pending < limit) {
                    const next = iter.next();
                    if (!next.done && !rejected) {
                        pending++;
                        execution(next.value, cursor, resolve, reject);
                        cursor++;
                    }
                }
            })
            .catch((err) => {
                rejected = true;
                reject(err)
            })
    }

    return new Promise(((resolve, reject) => {
        if (!tasks.length) {
            resolve([]);
        }

        for (let i = 0; i < limit; i++) {
            const result = iter.next();
            if (!result.done) {
                pending++;
                execution(result.value, cursor, resolve, reject);
                cursor++;
            }
        }

    }))
}
