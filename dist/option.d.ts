export type Option<T> = Some<T> | None;
export declare class Some<T> {
    value: T;
    constructor(value: T);
    isSome(): this is Some<T>;
    isNone(): this is None;
    unwrap(): T;
    unwrapOr(defaultValue: T): T;
    map<U>(fn: (value: T) => U): Option<U>;
}
export declare class None {
    isSome(): this is Some<never>;
    isNone(): this is None;
    unwrap(): never;
    unwrapOr<T>(defaultValue: T): T;
    map<U>(fn: (value: any) => U): Option<U>;
}
export declare function some<T>(value: T): Option<T>;
export declare function none<T>(): Option<T>;
