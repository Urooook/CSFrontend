export type PromisifiableFunction = (...args: any[]) => void;
export type PromisifyFunction<T> = (...args: any[]) => Promise<T>;
export type ThunkCallback = (err: Error | null, data: string) => void;