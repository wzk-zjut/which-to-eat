export type Func<T = any, P extends any[] = any[]> = (...args: P) => T;
export type Undef = null | undefined;
export type Getter<T> = T | ((...args: any) => T);

export const isArray = Array.isArray;

export const isFunction = (val: unknown): val is Function => typeof val === 'function';

export const isUndef = (val: unknown): val is Undef => val === void 0 || val === null;

export const getRandom = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
}