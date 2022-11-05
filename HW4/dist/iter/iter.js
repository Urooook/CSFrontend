"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _StringIterator_firstSurrogateRange, _StringIterator_secondSurrogateRange, _StringIterator_isFirstSurrogate, _StringIterator_isSecondSurrogate;
Object.defineProperty(exports, "__esModule", { value: true });
class StringIterator {
    static iterate(string) {
        const normalizedString = string.normalize();
        let firstSurrogate = null;
        let pointer = 0;
        return {
            next() {
                if (pointer >= normalizedString.length)
                    return { done: true, value: undefined };
                const charCode = normalizedString.charCodeAt(pointer);
                if (__classPrivateFieldGet(StringIterator, _a, "m", _StringIterator_isFirstSurrogate).call(StringIterator, charCode)) {
                    firstSurrogate = charCode;
                    pointer += 1;
                    return this.next();
                }
                if (__classPrivateFieldGet(StringIterator, _a, "m", _StringIterator_isSecondSurrogate).call(StringIterator, charCode)) {
                    pointer += 1;
                    if (firstSurrogate !== null) {
                        const value = String.fromCharCode(firstSurrogate, charCode);
                        firstSurrogate = null;
                        return { done: false, value };
                    }
                    return this.next();
                }
                const regularChar = String.fromCharCode(charCode);
                firstSurrogate = null;
                pointer += 1;
                return { done: false, value: regularChar };
            },
            [Symbol.iterator]() {
                return this;
            },
        };
    }
}
exports.default = StringIterator;
_a = StringIterator, _StringIterator_isFirstSurrogate = function _StringIterator_isFirstSurrogate(code) {
    return code >= __classPrivateFieldGet(StringIterator, _a, "f", _StringIterator_firstSurrogateRange)[0] && code <= __classPrivateFieldGet(StringIterator, _a, "f", _StringIterator_firstSurrogateRange)[1];
}, _StringIterator_isSecondSurrogate = function _StringIterator_isSecondSurrogate(code) {
    return code >= __classPrivateFieldGet(StringIterator, _a, "f", _StringIterator_secondSurrogateRange)[0] && code <= __classPrivateFieldGet(StringIterator, _a, "f", _StringIterator_secondSurrogateRange)[1];
};
_StringIterator_firstSurrogateRange = { value: [0xd800, 0xdbff] };
_StringIterator_secondSurrogateRange = { value: [0xdc00, 0xdfff] };
