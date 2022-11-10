"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearImmediate = exports.setImmediate = void 0;
_a = (() => {
    const callbacks = new WeakMap();
    const set = (callback) => {
        const key = {};
        callbacks.set(key, callback);
        queueMicrotask(() => {
            const func = callbacks.get(key);
            if (typeof func === 'function') {
                func();
            }
        });
        return key;
    };
    const clear = (key) => {
        callbacks.delete(key);
    };
    return [set, clear];
})(), exports.setImmediate = _a[0], exports.clearImmediate = _a[1];
