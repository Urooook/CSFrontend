export function take1<T>(iterable: AsyncIterable<T>, takesCount: number): AsyncIterableIterator<T> {
    const asyncIterator = iterable[Symbol.asyncIterator]();
    let iterationsCount = 0;

    return {
        async next(): Promise<IteratorResult<T>> {
            return new Promise((resolve, reject) => {
                asyncIterator
                    .next()
                    .then(({ done, value }) => {
                        if (done || iterationsCount >= takesCount) {
                            resolve({ done: true, value: undefined });
                        } else {
                            resolve({ done: false, value });
                            iterationsCount += 1;
                        }
                    })
                    .catch(reject);
            });
        },
        [Symbol.asyncIterator]() {
            return this;
        },
    };
}

export function filter1<T>(iterable: AsyncIterable<T>,  cb: (value: T) => boolean): AsyncIterableIterator<T> {
    const asyncIterator = iterable[Symbol.asyncIterator]();

    return {
        [Symbol.asyncIterator]() {
            return this;
        },
        async next(): Promise<IteratorResult<T>> {
            return new Promise((resolve, rej) => {
                asyncIterator.next().then(({done, value}) => {
                    if(done){
                        resolve({ done: true, value: undefined });
                        return;
                    }


                    resolve(this.next())
                })
                    .catch(rej);
            })
        }
    }
}

export async function* filter<T>(iterable: AsyncIterable<T>,  cb: (value: T) => boolean): AsyncGenerator<T>{
    const asyncIterator = iterable[Symbol.asyncIterator]();
    while (true) {
        const res = asyncIterator.next()
        if((await res.then(({value}) => cb(value)))) yield res.then(({value}) => value)
    }
}

export async function* take<T>(iterable: AsyncIterable<T>, takesCount: number): AsyncGenerator<T> {
    const asyncIterator = iterable[Symbol.asyncIterator]();
    let count = 0
    while (true) {
        const res = asyncIterator.next()
        if(count++ < takesCount) yield res.then(({value}) => value)
        if(count === takesCount) return
    }
}

export async function* any(...iterables: AsyncIterable<any>[]) {
    const iters = iterables.map((el) => el[Symbol.asyncIterator]());

    while(true) {
        yield (await Promise.race(iters.map((i) => i.next()))).value
    }
}

export async function* seq(...iterables: AsyncIterable<any>[]) {
    for(const i of iterables){
        for await (const el of i){
            yield el;
        }
    }
}

export async function* every<T>(
    iterable: AsyncIterable<T>,
    predicate: (item: T) => boolean,
): AsyncGenerator<T> {
    for await (const value of iterable) {
        if (!predicate(value)) {
            break;
        }
        yield value;
    }
}

export async function* repeat<T>(
    action: () => AsyncIterable<T>,
): AsyncGenerator<T> {
    while (true) {
        const iterable = action();

        for await (const value of iterable) {
            yield value;
        }
    }
}

export function onlyEvent<K extends keyof HTMLElementEventMap>(
    eventName: K,
): (event: HTMLElementEventMap[K]) => boolean {
    return (event) => event.type === eventName;
}
