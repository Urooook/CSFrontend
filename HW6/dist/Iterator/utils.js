"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapSeq = exports.zip = exports.seq = exports.enumerate = exports.filter = exports.take = exports.random = exports.generateRandom = void 0;
const generateRandom = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
exports.generateRandom = generateRandom;
const random = (min = 0, max = 100) => {
    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            return {
                value: (0, exports.generateRandom)(min, max),
                done: false,
            };
        },
    };
};
exports.random = random;
const take = (iterableObj, count) => {
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
};
exports.take = take;
const filter = (iterable, cb) => {
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
};
exports.filter = filter;
const enumerate = (iterable) => {
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
};
exports.enumerate = enumerate;
const seq = (...iterables) => {
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
                }
                else {
                    ++cursor;
                }
            }
            return {
                value: res.value,
                done: cursor === iterables.length,
            };
        },
    };
};
exports.seq = seq;
const zip = (...iterables) => {
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
};
exports.zip = zip;
const mapSeq = (iterable, cbIterable) => {
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
};
exports.mapSeq = mapSeq;
