export enum OptionKind {
  Some = "Some",
  None = "None",
}

export class Option<T> {
  constructor(public kind: OptionKind, public value?: T) {}

  static Some<T>(value: T): Option<T> {
    return new Option(OptionKind.Some, value);
  }

  static None<T>(): Option<T> {
    return new Option(OptionKind.None);
  }

  // Map the value if it's Some, otherwise return None
  isSome(): this is Option<T> {
    return this.kind === OptionKind.Some;
  } 

   // Check if the option is Some and matches the predicate
   isSomeAnd(predicate: T): boolean {
    if (this.kind === OptionKind.Some) {
      return this.value === predicate;
    }
    throw new Error("Called isSomeAnd on None");
  }

  // Map the value if it's None, otherwise return Some
  isNone(): this is Option<T> {
    return this.kind === OptionKind.None;
  }

  // Map the value if it's None, and the value matches the predicate
  isNoneAnd(predicate: T): this is Option<T> {
    if (this.kind === OptionKind.None) {
      return this.value === predicate;
    }
    throw new Error("Called isNoneAnd on Some");
  }

  // Map the value if it's Some, otherwise throw an Error
  unwrap(): T {
    if (this.kind === OptionKind.Some) {
      return this.value as T;
    }
    throw new Error("Tried to unwrap None");
  }

  // Map the value if it's Some, otherwise return a default value
  unwrapOrDefault(defaultValue: T): T {
    return this.kind === OptionKind.Some ? (this.value as T) : defaultValue;
  }
  

}
