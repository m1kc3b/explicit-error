export enum ResultKind {
  Ok = "Ok",
  Err = "Err",
}

export class Result<T, E> {
  private constructor(private kind: ResultKind, private value?: T, private error?: E) {}

  static Ok<T, E>(value: T): Result<T, E> {
    return new Result(ResultKind.Ok, value);
  }

  static Err<T, E>(error: E): Result<T, E> {
    return new Result(ResultKind.Err, undefined as never, error);
  }

  // Return true if the result is Ok
  isOk(): boolean {
    return this.kind === ResultKind.Ok;
  }

  // Return true if the result is Ok and the value matches the predicate
  isOkAnd(predicate: T): boolean {
    return this.kind === ResultKind.Ok && this.value === predicate;
  }

  // Return true if the result is Err
  isErr(): boolean {
    return this.kind === ResultKind.Err;
  }

  // Return true if the result is Err and the error matches the predicate
  isErrAnd(predicate: E): boolean {
    return this.kind === ResultKind.Err && this.error === predicate;
  }

  // Map the value if it's Ok, otherwise return the Err
  map(fn: (value: T) => T): Result<T, E> {
    if (this.kind === ResultKind.Ok) {
      return Result.Ok(fn(this.value as T));
    }
    return this;
  }

  // Map the value if it's Ok, otherwise return a default value
  mapOr(fn: (value: T) => T, defaultValue: T): T {
    if (this.kind === ResultKind.Ok) {
      return fn(this.value as T);
    }
    return defaultValue;
  }

  // Map the error if it's Err, otherwise return the Ok
  mapErr(fn: (error: E) => E): Result<T, E> {
    if (this.kind === ResultKind.Err) {
      return Result.Err(fn(this.error as E));
    }
    return this;
  }

  // Unwrap the value if it's Ok, otherwise throw an error
  unwrap(): T {
    if (this.kind === ResultKind.Ok) {
      return this.value as T;
    }

    throw new Error(`Tried to unwrap Err: ${this.error}`);
  }

  // Unwrap the value if it's Ok, otherwise return a default value
  unwrapOrDefault(defaultValue: T): T {
    return this.kind === ResultKind.Ok ? (this.value as T) : defaultValue;
  }
}