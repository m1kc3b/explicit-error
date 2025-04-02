export type Result<T, E> = Ok<T> | Err<E>;
export declare class Ok<T> {
    value: T;
    constructor(value: T);
    isOk(): this is Ok<T>;
    isErr(): this is Err<never>;
    unwrap(): T;
    unwrapOr(defaultValue: T): T;
    map<U>(fn: (value: T) => U): Result<U, never>;
}
export declare class Err<E> {
    error: E;
    constructor(error: E);
    isOk(): this is Ok<never>;
    isErr(): this is Err<E>;
    unwrap(): never;
    unwrapOr<T>(defaultValue: T): T;
}
export declare function ok<T>(value: T): Result<T, never>;
export declare function err<E>(error: E): Result<never, E>;
