"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskPriorityExecTimeRatio = void 0;
var TaskPriorityExecTimeRatio;
(function (TaskPriorityExecTimeRatio) {
    TaskPriorityExecTimeRatio[TaskPriorityExecTimeRatio["low"] = 0.5] = "low";
    TaskPriorityExecTimeRatio[TaskPriorityExecTimeRatio["average"] = 1] = "average";
    TaskPriorityExecTimeRatio[TaskPriorityExecTimeRatio["high"] = 2] = "high";
    TaskPriorityExecTimeRatio[TaskPriorityExecTimeRatio["critical"] = 4] = "critical";
})(TaskPriorityExecTimeRatio = exports.TaskPriorityExecTimeRatio || (exports.TaskPriorityExecTimeRatio = {}));
