"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function on(source, eventType) {
    return {
        [Symbol.asyncIterator]() {
            return {
                async next() {
                    return new Promise((resolve) => {
                        source.addEventListener(eventType, (event) => {
                            resolve({ done: false, value: event });
                        }, { once: true });
                    });
                },
            };
        },
    };
}
exports.default = on;
