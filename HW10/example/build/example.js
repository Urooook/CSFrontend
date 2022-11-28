/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/helpers.js":
/*!*************************!*\
  !*** ./dist/helpers.js ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.onlyEvent = exports.repeat = exports.every = exports.seq = exports.any = exports.take = exports.filter = exports.filter1 = exports.take1 = void 0;\r\nfunction take1(iterable, takesCount) {\r\n    const asyncIterator = iterable[Symbol.asyncIterator]();\r\n    let iterationsCount = 0;\r\n    return {\r\n        async next() {\r\n            return new Promise((resolve, reject) => {\r\n                asyncIterator\r\n                    .next()\r\n                    .then(({ done, value }) => {\r\n                    if (done || iterationsCount >= takesCount) {\r\n                        resolve({ done: true, value: undefined });\r\n                    }\r\n                    else {\r\n                        resolve({ done: false, value });\r\n                        iterationsCount += 1;\r\n                    }\r\n                })\r\n                    .catch(reject);\r\n            });\r\n        },\r\n        [Symbol.asyncIterator]() {\r\n            return this;\r\n        },\r\n    };\r\n}\r\nexports.take1 = take1;\r\nfunction filter1(iterable, cb) {\r\n    const asyncIterator = iterable[Symbol.asyncIterator]();\r\n    return {\r\n        [Symbol.asyncIterator]() {\r\n            return this;\r\n        },\r\n        async next() {\r\n            return new Promise((resolve, rej) => {\r\n                asyncIterator.next().then(({ done, value }) => {\r\n                    if (done) {\r\n                        resolve({ done: true, value: undefined });\r\n                        return;\r\n                    }\r\n                    resolve(this.next());\r\n                })\r\n                    .catch(rej);\r\n            });\r\n        }\r\n    };\r\n}\r\nexports.filter1 = filter1;\r\nasync function* filter(iterable, cb) {\r\n    const asyncIterator = iterable[Symbol.asyncIterator]();\r\n    while (true) {\r\n        const res = asyncIterator.next();\r\n        if ((await res.then(({ value }) => cb(value))))\r\n            yield res.then(({ value }) => value);\r\n    }\r\n}\r\nexports.filter = filter;\r\nasync function* take(iterable, takesCount) {\r\n    const asyncIterator = iterable[Symbol.asyncIterator]();\r\n    let count = 0;\r\n    while (true) {\r\n        const res = asyncIterator.next();\r\n        if (count++ < takesCount)\r\n            yield res.then(({ value }) => value);\r\n        if (count === takesCount)\r\n            return;\r\n    }\r\n}\r\nexports.take = take;\r\nasync function* any(...iterables) {\r\n    const iters = iterables.map((el) => el[Symbol.asyncIterator]());\r\n    while (true) {\r\n        yield (await Promise.race(iters.map((i) => i.next()))).value;\r\n    }\r\n}\r\nexports.any = any;\r\nasync function* seq(...iterables) {\r\n    for (const i of iterables) {\r\n        for await (const el of i) {\r\n            yield el;\r\n        }\r\n    }\r\n}\r\nexports.seq = seq;\r\nasync function* every(iterable, predicate) {\r\n    for await (const value of iterable) {\r\n        if (!predicate(value)) {\r\n            break;\r\n        }\r\n        yield value;\r\n    }\r\n}\r\nexports.every = every;\r\nasync function* repeat(action) {\r\n    while (true) {\r\n        const iterable = action();\r\n        for await (const value of iterable) {\r\n            yield value;\r\n        }\r\n    }\r\n}\r\nexports.repeat = repeat;\r\nfunction onlyEvent(eventName) {\r\n    return (event) => event.type === eventName;\r\n}\r\nexports.onlyEvent = onlyEvent;\r\n\n\n//# sourceURL=webpack:///./dist/helpers.js?");

/***/ }),

/***/ "./dist/on.js":
/*!********************!*\
  !*** ./dist/on.js ***!
  \********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nfunction on(source, eventType) {\r\n    return {\r\n        [Symbol.asyncIterator]() {\r\n            return {\r\n                async next() {\r\n                    return new Promise((resolve) => {\r\n                        source.addEventListener(eventType, (event) => {\r\n                            resolve({ done: false, value: event });\r\n                        }, { once: true });\r\n                    });\r\n                },\r\n            };\r\n        },\r\n    };\r\n}\r\nexports[\"default\"] = on;\r\n\n\n//# sourceURL=webpack:///./dist/on.js?");

/***/ }),

/***/ "./dist/once.js":
/*!**********************!*\
  !*** ./dist/once.js ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nfunction once(source, eventType) {\r\n    return {\r\n        [Symbol.asyncIterator]() {\r\n            let isEventFired = false;\r\n            return {\r\n                async next() {\r\n                    return new Promise((resolve) => {\r\n                        if (isEventFired) {\r\n                            resolve({ done: true, value: undefined });\r\n                            return;\r\n                        }\r\n                        source.addEventListener(eventType, (event) => {\r\n                            isEventFired = true;\r\n                            resolve({ done: false, value: event });\r\n                        }, { once: true });\r\n                    });\r\n                },\r\n            };\r\n        },\r\n    };\r\n}\r\nexports[\"default\"] = once;\r\n\n\n//# sourceURL=webpack:///./dist/once.js?");

/***/ }),

/***/ "./example/index.js":
/*!**************************!*\
  !*** ./example/index.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dist_on__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dist/on */ \"./dist/on.js\");\n/* harmony import */ var _dist_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dist/helpers */ \"./dist/helpers.js\");\n/* harmony import */ var _dist_once__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dist/once */ \"./dist/once.js\");\n\r\n\r\n\r\n\r\nconst box = document.getElementById('box');\r\nconst container = document.getElementById('container');\r\nconst shiftX = box.offsetWidth / 2;\r\nconst shiftY = box.offsetHeight / 2;\r\n\r\nbox.ondragstart = function() {\r\n    return false;\r\n};\r\n\r\nconst getCoords = (entry) => {\r\n    console.log(entry)\r\n}\r\n\r\n(async () => {\r\n    const dnd = (0,_dist_helpers__WEBPACK_IMPORTED_MODULE_1__.repeat)(() => (0,_dist_helpers__WEBPACK_IMPORTED_MODULE_1__.filter)(\r\n        (0,_dist_helpers__WEBPACK_IMPORTED_MODULE_1__.seq)(\r\n            (0,_dist_once__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(box, 'pointerdown'),\r\n            (0,_dist_helpers__WEBPACK_IMPORTED_MODULE_1__.every)(\r\n                (0,_dist_helpers__WEBPACK_IMPORTED_MODULE_1__.any)(\r\n                    (0,_dist_on__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(document.body, 'pointermove'),\r\n                    (0,_dist_on__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(box, 'pointerup')\r\n                ),\r\n                (0,_dist_helpers__WEBPACK_IMPORTED_MODULE_1__.onlyEvent)('pointermove'),\r\n            )\r\n        ),\r\n        (0,_dist_helpers__WEBPACK_IMPORTED_MODULE_1__.onlyEvent)('pointermove'),\r\n    ));\r\n\r\n    for await (const ev of dnd) {\r\n        const top =10;\r\n        const left =10;\r\n\r\n        if (ev.pageX - shiftX > left && ev.pageX + shiftX < left + container.offsetWidth) {\r\n            box.style.left = ev.pageX - left - shiftX + 'px';\r\n        }\r\n        if (ev.pageY - shiftY > top && ev.pageY + shiftY < top + container.offsetHeight) {\r\n            box.style.top = ev.pageY - top - shiftY + 'px';\r\n        }\r\n    }\r\n})();\n\n//# sourceURL=webpack:///./example/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./example/index.js");
/******/ 	
/******/ })()
;