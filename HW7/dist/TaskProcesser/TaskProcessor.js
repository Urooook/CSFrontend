"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TaskProcessor_instances, _TaskProcessor_maxTime, _TaskProcessor_taskTime, _TaskProcessor_delay, _TaskProcessor_taskPool, _TaskProcessor_isStarted, _TaskProcessor_createWorker, _TaskProcessor_iterate, _TaskProcessor_execute;
Object.defineProperty(exports, "__esModule", { value: true });
class TaskProcessor {
    constructor(max = null, delay = null) {
        _TaskProcessor_instances.add(this);
        _TaskProcessor_maxTime.set(this, 100);
        _TaskProcessor_taskTime.set(this, __classPrivateFieldGet(this, _TaskProcessor_maxTime, "f"));
        _TaskProcessor_delay.set(this, 100);
        _TaskProcessor_taskPool.set(this, new Set());
        _TaskProcessor_isStarted.set(this, false);
        if (max)
            __classPrivateFieldSet(this, _TaskProcessor_maxTime, max, "f");
        if (delay)
            __classPrivateFieldSet(this, _TaskProcessor_delay, delay, "f");
    }
    forEach(iterable, cb) {
        if (typeof iterable[Symbol.iterator] !== 'function') {
            throw new Error('Not Iterable');
        }
        if (typeof cb !== 'function') {
            throw new Error('Cb is not a function');
        }
        const worker = __classPrivateFieldGet(this, _TaskProcessor_instances, "m", _TaskProcessor_createWorker).call(this, iterable, cb);
        return new Promise((resolve, reject) => {
            __classPrivateFieldGet(this, _TaskProcessor_taskPool, "f").add({ worker, resolve, reject });
            __classPrivateFieldGet(this, _TaskProcessor_instances, "m", _TaskProcessor_execute).call(this);
        });
    }
}
exports.default = TaskProcessor;
_TaskProcessor_maxTime = new WeakMap(), _TaskProcessor_taskTime = new WeakMap(), _TaskProcessor_delay = new WeakMap(), _TaskProcessor_taskPool = new WeakMap(), _TaskProcessor_isStarted = new WeakMap(), _TaskProcessor_instances = new WeakSet(), _TaskProcessor_createWorker = function* _TaskProcessor_createWorker(iterable, cb) {
    const iterator = iterable[Symbol.iterator]();
    let time = Date.now();
    let index = 0;
    while (true) {
        const { value, done } = iterator.next();
        if (done)
            return;
        if (Date.now() - time > __classPrivateFieldGet(this, _TaskProcessor_maxTime, "f")) {
            yield 'stop';
            time = Date.now();
        }
        try {
            cb(value, index, iterable);
        }
        catch (err) {
            if (err instanceof Error)
                yield err;
        }
        index += 1;
    }
}, _TaskProcessor_iterate = function _TaskProcessor_iterate() {
    __classPrivateFieldSet(this, _TaskProcessor_taskTime, __classPrivateFieldGet(this, _TaskProcessor_maxTime, "f") / (__classPrivateFieldGet(this, _TaskProcessor_taskPool, "f").size || 1), "f");
    for (const el of __classPrivateFieldGet(this, _TaskProcessor_taskPool, "f").values()) {
        const { done, value } = el.worker.next();
        if (done) {
            __classPrivateFieldGet(this, _TaskProcessor_taskPool, "f").delete(el);
            el.resolve();
        }
        if (value instanceof Error)
            el.reject(value);
        setTimeout(() => {
            if (__classPrivateFieldGet(this, _TaskProcessor_taskPool, "f").size > 0) {
                __classPrivateFieldGet(this, _TaskProcessor_instances, "m", _TaskProcessor_iterate).call(this);
            }
            else {
                __classPrivateFieldSet(this, _TaskProcessor_isStarted, false, "f");
            }
        }, __classPrivateFieldGet(this, _TaskProcessor_delay, "f"));
    }
}, _TaskProcessor_execute = function _TaskProcessor_execute() {
    if (!__classPrivateFieldGet(this, _TaskProcessor_isStarted, "f")) {
        __classPrivateFieldSet(this, _TaskProcessor_isStarted, true, "f");
        __classPrivateFieldGet(this, _TaskProcessor_instances, "m", _TaskProcessor_iterate).call(this);
    }
};
const taskProcessor = new TaskProcessor();
let total = 0;
const nums = [...Array(5e6).keys()];
const nums1 = [...Array(2e6).keys()];
const nums2 = [...Array(3e6).keys()];
const nums3 = [...Array(4e6).keys()];
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
