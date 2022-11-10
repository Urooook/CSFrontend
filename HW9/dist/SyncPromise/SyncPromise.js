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
var _SyncPromise_onFulfilled, _SyncPromise_onRejected, _SyncPromise_value, _SyncPromise_reason;
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
class SyncPromise {
    constructor(constr) {
        _SyncPromise_onFulfilled.set(this, []);
        _SyncPromise_onRejected.set(this, []);
        _SyncPromise_value.set(this, void 0);
        _SyncPromise_reason.set(this, void 0);
        this.status = types_1.STATUSES.PENDING;
        __classPrivateFieldSet(this, _SyncPromise_onFulfilled, [], "f");
        __classPrivateFieldSet(this, _SyncPromise_onRejected, [], "f");
        const resolve = (value) => {
            if (this.status === types_1.STATUSES.PENDING) {
                return;
            }
            if (value !== null && typeof value.then === 'function') {
                value.then(resolve, reject);
            }
            this.status = types_1.STATUSES.FULFILLED;
            __classPrivateFieldSet(this, _SyncPromise_reason, value, "f");
            for (const fn of __classPrivateFieldGet(this, _SyncPromise_onFulfilled, "f")) {
                fn(__classPrivateFieldGet(this, _SyncPromise_value, "f"));
            }
        };
        const reject = (err) => {
            if (this.status === types_1.STATUSES.PENDING) {
                return;
            }
            this.status = types_1.STATUSES.REJECTED;
            __classPrivateFieldSet(this, _SyncPromise_reason, err, "f");
            for (const fn of __classPrivateFieldGet(this, _SyncPromise_onRejected, "f")) {
                fn(__classPrivateFieldGet(this, _SyncPromise_reason, "f"));
            }
            queueMicrotask(() => {
                if (__classPrivateFieldGet(this, _SyncPromise_onRejected, "f").length === 0) {
                    void Promise.reject(__classPrivateFieldGet(this, _SyncPromise_reason, "f"));
                }
            });
        };
        try {
            constr(resolve, reject);
        }
        catch (err) {
            reject(err);
        }
    }
    then(onFulfilled, onRejected) {
        return new SyncPromise((resolve, reject) => {
            const wrappedResolve = () => {
                try {
                    resolve(onFulfilled ? onFulfilled(__classPrivateFieldGet(this, _SyncPromise_value, "f")) : __classPrivateFieldGet(this, _SyncPromise_value, "f"));
                }
                catch (err) {
                    reject(err);
                }
            };
            const wrappedReject = () => {
                if (onRejected) {
                    try {
                        resolve(onRejected(__classPrivateFieldGet(this, _SyncPromise_reason, "f")));
                    }
                    catch (err) {
                        reject(err);
                    }
                }
                else {
                    reject(__classPrivateFieldGet(this, _SyncPromise_reason, "f"));
                }
            };
            if (this.status === types_1.STATUSES.FULFILLED) {
                wrappedResolve();
                return;
            }
            if (this.status === types_1.STATUSES.REJECTED) {
                wrappedReject();
                return;
            }
            __classPrivateFieldGet(this, _SyncPromise_onFulfilled, "f").push(wrappedResolve);
            __classPrivateFieldGet(this, _SyncPromise_onRejected, "f").push(wrappedReject);
        });
    }
    catch(onRejected) {
        return new SyncPromise((resolve, reject) => {
            const wrappedReject = () => {
                if (onRejected) {
                    try {
                        resolve(onRejected(__classPrivateFieldGet(this, _SyncPromise_reason, "f")));
                    }
                    catch (err) {
                        reject(err);
                    }
                }
                else {
                    reject(__classPrivateFieldGet(this, _SyncPromise_reason, "f"));
                }
            };
            if (this.status === types_1.STATUSES.FULFILLED) {
                resolve(__classPrivateFieldGet(this, _SyncPromise_value, "f"));
                return;
            }
            if (this.status === types_1.STATUSES.REJECTED) {
                wrappedReject();
                return;
            }
            __classPrivateFieldGet(this, _SyncPromise_onFulfilled, "f").push(resolve);
            __classPrivateFieldGet(this, _SyncPromise_onRejected, "f").push(wrappedReject);
        });
    }
    finally(cb) {
        return new SyncPromise((resolve, reject) => {
            const wrappedResolve = () => {
                try {
                    let res = cb();
                    if (typeof res.then === "function") {
                        res = res.then(() => __classPrivateFieldGet(this, _SyncPromise_value, "f"));
                    }
                    else {
                        res = __classPrivateFieldGet(this, _SyncPromise_value, "f");
                    }
                    resolve(res);
                }
                catch (err) {
                    reject(err);
                }
            };
            const wrappedReject = () => {
                try {
                    let res = cb();
                    if (typeof res.then === "function") {
                        res = res.then(() => {
                            throw __classPrivateFieldGet(this, _SyncPromise_reason, "f");
                        });
                        resolve(res);
                    }
                    else {
                        reject(__classPrivateFieldGet(this, _SyncPromise_reason, "f"));
                    }
                }
                catch (err) {
                    reject(err);
                }
            };
            if (this.status === types_1.STATUSES.FULFILLED) {
                wrappedResolve();
                return;
            }
            if (this.status === types_1.STATUSES.REJECTED) {
                wrappedReject();
                return;
            }
            __classPrivateFieldGet(this, _SyncPromise_onFulfilled, "f").push(wrappedResolve);
            __classPrivateFieldGet(this, _SyncPromise_onRejected, "f").push(wrappedReject);
        });
    }
    static resolve(val = undefined) {
        if (val instanceof SyncPromise) {
            return val;
        }
        return new SyncPromise((resolve) => {
            resolve(val);
        });
    }
    static reject(val = undefined) {
        return new SyncPromise((_, reject) => {
            reject(val);
        });
    }
    static all(iterable) {
        const tasks = Array.from(iterable);
        if (tasks.length === 0)
            SyncPromise.resolve([]);
        return new SyncPromise((resolve, reject) => {
            const results = new Array(tasks.length);
            let done = 0;
            for (let i = 0; i < tasks.length; i++) {
                tasks[i] = SyncPromise.resolve(tasks[i]);
                tasks[i].then((res) => {
                    results[i] = res;
                    done++;
                    if (done === tasks.length) {
                        resolve(results);
                    }
                }).catch(reject);
            }
        });
    }
    static allSettled(iterable) {
        const tasks = Array.from(iterable);
        if (tasks.length === 0)
            SyncPromise.resolve([]);
        return new SyncPromise((resolve) => {
            const results = new Array(tasks.length);
            let done = 0;
            for (let i = 0; i < tasks.length; i++) {
                tasks[i] = SyncPromise.resolve(tasks[i]);
                tasks[i].then((value) => {
                    results[i] = { status: types_1.STATUSES.FULFILLED, value };
                    done++;
                    if (done === tasks.length) {
                        resolve(results);
                    }
                }).catch((reason) => {
                    results[i] = { status: types_1.STATUSES.REJECTED, value: reason };
                    done++;
                    if (done === tasks.length) {
                        resolve(results);
                    }
                });
            }
        });
    }
    static race(iterable) {
        const tasks = Array.from(iterable);
        if (tasks.length === 0)
            SyncPromise.resolve([]);
        return new SyncPromise((resolve, reject) => {
            for (let i = 0; i < tasks.length; i++) {
                SyncPromise.resolve(tasks[i]).then(resolve, reject);
            }
        });
    }
    static any(iterable) {
        const tasks = Array.from(iterable);
        if (tasks.length === 0)
            SyncPromise.resolve([]);
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
                });
            }
        });
    }
}
exports.default = SyncPromise;
_SyncPromise_onFulfilled = new WeakMap(), _SyncPromise_onRejected = new WeakMap(), _SyncPromise_value = new WeakMap(), _SyncPromise_reason = new WeakMap();
