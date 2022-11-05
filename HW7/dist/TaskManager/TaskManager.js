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
var _TaskManager_instances, _TaskManager_maxTime, _TaskManager_taskTime, _TaskManager_averageTaskExecTime, _TaskManager_delay, _TaskManager_taskPool, _TaskManager_taskQueue, _TaskManager_isStarted, _TaskManager_createWorker, _TaskManager_setupTaskQueueAndAverageExecTime, _TaskManager_iterate, _TaskManager_execute;
Object.defineProperty(exports, "__esModule", { value: true });
const interface_1 = require("./interface");
const PriorityQueue_1 = require("./PriorityQueue");
class TaskManager {
    constructor(max = null, delay = null) {
        _TaskManager_instances.add(this);
        _TaskManager_maxTime.set(this, 100);
        _TaskManager_taskTime.set(this, __classPrivateFieldGet(this, _TaskManager_maxTime, "f"));
        _TaskManager_averageTaskExecTime.set(this, __classPrivateFieldGet(this, _TaskManager_maxTime, "f"));
        _TaskManager_delay.set(this, 100);
        _TaskManager_taskPool.set(this, new Set());
        _TaskManager_taskQueue.set(this, new PriorityQueue_1.default());
        _TaskManager_isStarted.set(this, false);
        if (max)
            __classPrivateFieldSet(this, _TaskManager_maxTime, max, "f");
        if (delay)
            __classPrivateFieldSet(this, _TaskManager_delay, delay, "f");
    }
    forEach(iterable, cb, options = { priority: 'average' }) {
        if (typeof iterable[Symbol.iterator] !== 'function') {
            throw new Error('Not Iterable');
        }
        if (typeof cb !== 'function') {
            throw new Error('Cb is not a function');
        }
        const { priority } = options;
        const worker = __classPrivateFieldGet(this, _TaskManager_instances, "m", _TaskManager_createWorker).call(this, iterable, cb, priority);
        return new Promise((resolve, reject) => {
            __classPrivateFieldGet(this, _TaskManager_taskPool, "f").add({ worker, priority, resolve, reject });
            __classPrivateFieldGet(this, _TaskManager_instances, "m", _TaskManager_execute).call(this);
        });
    }
}
exports.default = TaskManager;
_TaskManager_maxTime = new WeakMap(), _TaskManager_taskTime = new WeakMap(), _TaskManager_averageTaskExecTime = new WeakMap(), _TaskManager_delay = new WeakMap(), _TaskManager_taskPool = new WeakMap(), _TaskManager_taskQueue = new WeakMap(), _TaskManager_isStarted = new WeakMap(), _TaskManager_instances = new WeakSet(), _TaskManager_createWorker = function* _TaskManager_createWorker(iterable, cb, priority) {
    const iterator = iterable[Symbol.iterator]();
    let time = Date.now();
    let index = 0;
    while (true) {
        const { value, done } = iterator.next();
        if (done)
            return;
        if (Date.now() - time > __classPrivateFieldGet(this, _TaskManager_averageTaskExecTime, "f") * interface_1.TaskPriorityExecTimeRatio[priority]) {
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
}, _TaskManager_setupTaskQueueAndAverageExecTime = function _TaskManager_setupTaskQueueAndAverageExecTime() {
    let overallTaskExecTimeRatios = 0;
    for (const task of __classPrivateFieldGet(this, _TaskManager_taskPool, "f").values()) {
        overallTaskExecTimeRatios += interface_1.TaskPriorityExecTimeRatio[task.priority];
        __classPrivateFieldGet(this, _TaskManager_taskQueue, "f").insert(task, (taskOfPool) => interface_1.TaskPriorityExecTimeRatio[taskOfPool.priority] < interface_1.TaskPriorityExecTimeRatio[task.priority]);
    }
    __classPrivateFieldSet(this, _TaskManager_averageTaskExecTime, __classPrivateFieldGet(this, _TaskManager_maxTime, "f") / overallTaskExecTimeRatios, "f");
}, _TaskManager_iterate = function _TaskManager_iterate() {
    __classPrivateFieldGet(this, _TaskManager_instances, "m", _TaskManager_setupTaskQueueAndAverageExecTime).call(this);
    let task = __classPrivateFieldGet(this, _TaskManager_taskQueue, "f").remove();
    while (task) {
        const { done, value } = task.worker.next();
        if (done) {
            __classPrivateFieldGet(this, _TaskManager_taskPool, "f").delete(task);
            task.resolve();
        }
        if (value instanceof Error)
            task.reject(value);
        task = __classPrivateFieldGet(this, _TaskManager_taskQueue, "f").remove();
    }
    setTimeout(() => {
        if (__classPrivateFieldGet(this, _TaskManager_taskPool, "f").size > 0) {
            __classPrivateFieldGet(this, _TaskManager_instances, "m", _TaskManager_iterate).call(this);
        }
        else {
            __classPrivateFieldSet(this, _TaskManager_isStarted, false, "f");
        }
    }, __classPrivateFieldGet(this, _TaskManager_delay, "f"));
}, _TaskManager_execute = function _TaskManager_execute() {
    if (!__classPrivateFieldGet(this, _TaskManager_isStarted, "f")) {
        __classPrivateFieldSet(this, _TaskManager_isStarted, true, "f");
        __classPrivateFieldGet(this, _TaskManager_instances, "m", _TaskManager_iterate).call(this);
    }
};
