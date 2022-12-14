export const generateRandom = (min: number, max: number) =>
    Math.floor(min + Math.random() * (max + 1 - min))

export const random = (min = 0, max = 100): IterableIterator<number> => {
    return {
        [Symbol.iterator]() {
            return this;
        },

        next() {
            return {
                value: generateRandom(min, max),
                done: false,
            };
        },
    };
}

export const take = <T>(
    iterableObj: Iterable<T> | IterableIterator<T>,
    count: number,
): IterableIterator<T> => {

    const iterator = iterableObj[Symbol.iterator]();

    return {
        [Symbol.iterator]() {
            return this;
        },

        next() {
            count -= 1;

            return {
                value: iterator.next().value,
                done: count < 0,
            };
        },
    };
}

export const filter = <T>(
    iterable: Iterable<T> | IterableIterator<T>,
    cb: (value: T) => boolean,
): IterableIterator<T> => {
    const iterator = iterable[Symbol.iterator]();

    return {
        [Symbol.iterator]() {
            return this;
        },

        next() {
            let res = iterator.next();

            while (!cb(res.value)) {
                res = iterator.next();
            }

            return res;
        },
    };
}

export const enumerate = <T>(
    iterable: Iterable<T> | IterableIterator<T>,
): IterableIterator<[number, T]> => {
    const iterator = iterable[Symbol.iterator]();
    let cursor = 0;

    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            const res = iterator.next();

            return {
                value: [cursor++, res.value],
                done: res.done,
            };
        },
    };
}

export const seq = (
    ...iterables: (Iterable<unknown> | IterableIterator<unknown>)[]
): IterableIterator<unknown> => {
    let cursor = 0;
    let iterator = iterables[cursor][Symbol.iterator]();

    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            let res = iterator.next();

            if (res.done) {
                if (cursor !== iterables.length - 1) {
                    iterator = iterables[++cursor][Symbol.iterator]();
                    res = iterator.next();
                } else {
                    ++cursor;
                }
            }

            return {
                value: res.value,
                done: cursor === iterables.length,
            };
        },
    };
}

export const zip = (
    ...iterables: (Iterable<unknown> | IterableIterator<unknown>)[]
): IterableIterator<unknown[]> => {
    const iterators = Array.from(iterables).map((iterable) => iterable[Symbol.iterator]());
    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            const results = iterators.map((iterator) => iterator.next());
            return {
                value: results.map((res) => res.value),
                done: results.every((res) => res.done),
            };
        },
    };
}

export const mapSeq = <T>(
    iterable: Iterable<T> | IterableIterator<T>,
    cbIterable: Iterable<Function> | IterableIterator<Function>,
): IterableIterator<T> => {
    const iterator = iterable[Symbol.iterator]();

    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            let { value, done } = iterator.next();

            if (value != null) {
                for (const cb of cbIterable) {
                    value = cb(value);
                }
            }

            return {
                value,
                done,
            };
        },
    };
}