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
var _Range_instances, _Range_from, _Range_to, _Range_isNumber, _Range_values;
Object.defineProperty(exports, "__esModule", { value: true });
class Range {
    constructor(from, to) {
        _Range_instances.add(this);
        _Range_from.set(this, void 0);
        _Range_to.set(this, void 0);
        _Range_isNumber.set(this, void 0);
        __classPrivateFieldSet(this, _Range_isNumber, typeof from === 'number', "f");
        __classPrivateFieldSet(this, _Range_from, this.validate(from), "f");
        __classPrivateFieldSet(this, _Range_to, this.validate(to), "f");
    }
    [(_Range_from = new WeakMap(), _Range_to = new WeakMap(), _Range_isNumber = new WeakMap(), _Range_instances = new WeakSet(), Symbol.iterator)]() {
        return __classPrivateFieldGet(this, _Range_instances, "m", _Range_values).call(this);
    }
    reverse() {
        return __classPrivateFieldGet(this, _Range_instances, "m", _Range_values).call(this, true);
    }
    validate(value) {
        if (value == null) {
            throw new Error('value is required');
        }
        if (typeof value === 'string') {
            if (value.length > 1) {
                throw new Error('should has one character');
            }
            const code = value.codePointAt(0);
            if (code == null) {
                throw new Error('unicode code not found');
            }
            return code;
        }
        return value;
    }
}
exports.default = Range;
_Range_values = function _Range_values(isReverse = false) {
    let cursor = isReverse ? __classPrivateFieldGet(this, _Range_to, "f") : __classPrivateFieldGet(this, _Range_from, "f");
    return {
        [Symbol.iterator]() {
            return this;
        },
        next: () => {
            const changeCursor = () => (isReverse ? cursor-- : cursor++);
            return {
                done: isReverse ? cursor < __classPrivateFieldGet(this, _Range_from, "f") : cursor > __classPrivateFieldGet(this, _Range_to, "f"),
                value: __classPrivateFieldGet(this, _Range_isNumber, "f") ? changeCursor() : String.fromCodePoint(changeCursor()),
            };
        },
    };
};
