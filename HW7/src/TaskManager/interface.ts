export type Task = {
    worker: Generator<'stop' | Error>;
    priority: Priority;
    resolve: (v?: any) => void;
    reject: (v?: any) => void;
}

export enum TaskPriorityExecTimeRatio {
    low = 0.5,
    average = 1,
    high = 2,
    critical = 4,
}

export type Priority = keyof typeof TaskPriorityExecTimeRatio;

export interface ForEachOptions {
    priority: Priority;
}

export interface TaskManagerOptions {
    poolExecTime?: number;
    idleTime?: number;
}
