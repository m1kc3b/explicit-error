export type Option<T> = Some<T> | None;

export class Some<T> {
  constructor(public value: T) {}

  isSome(): this is Some<T> {
    return true;
  }

  isNone(): this is None {
    return false;
  }

  unwrap(): T {
    return this.value;
  }

  unwrapOr(defaultValue: T): T {
    return this.value;
  }

  map<U>(fn: (value: T) => U): Option<U> {
    return new Some(fn(this.value));
  }
}

export class None {
  isSome(): this is Some<never> { 
    return false;
  }

  isNone(): this is None {
    return true;
  }

  unwrap(): never {
    throw new Error("Tried to unwrap None");
  }

  unwrapOr<T>(defaultValue: T): T {
    return defaultValue;
  }

  map<U>(fn: (value: any) => U): Option<U> {
    return new None();
  } 
}

export function some<T>(value: T): Option<T> {
  return new Some(value);
}

export function none<T>(): Option<T> {
  return new None();
}