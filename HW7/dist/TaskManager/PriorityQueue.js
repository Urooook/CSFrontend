"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PriorityQueue_elements;
Object.defineProperty(exports, "__esModule", { value: true });
class PriorityQueue {
    constructor() {
        _PriorityQueue_elements.set(this, []);
    }
    get isEmpty() {
        return __classPrivateFieldGet(this, _PriorityQueue_elements, "f").length === 0;
    }
    insert(value, predicate) {
        let index = __classPrivateFieldGet(this, _PriorityQueue_elements, "f").length - 1;
        while (__classPrivateFieldGet(this, _PriorityQueue_elements, "f")[index] != null && predicate(__classPrivateFieldGet(this, _PriorityQueue_elements, "f")[index])) {
            __classPrivateFieldGet(this, _PriorityQueue_elements, "f")[index + 1] = __classPrivateFieldGet(this, _PriorityQueue_elements, "f")[index];
            index -= 1;
        }
        __classPrivateFieldGet(this, _PriorityQueue_elements, "f")[index + 1] = value;
    }
    remove() {
        return __classPrivateFieldGet(this, _PriorityQueue_elements, "f").shift();
    }
}
exports.default = PriorityQueue;
_PriorityQueue_elements = new WeakMap();
