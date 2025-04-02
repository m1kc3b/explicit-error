"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.None = exports.Some = void 0;
exports.some = some;
exports.none = none;
class Some {
    constructor(value) {
        this.value = value;
    }
    isSome() {
        return true;
    }
    isNone() {
        return false;
    }
    unwrap() {
        return this.value;
    }
    unwrapOr(defaultValue) {
        return this.value;
    }
    map(fn) {
        return new Some(fn(this.value));
    }
}
exports.Some = Some;
class None {
    isSome() {
        return false;
    }
    isNone() {
        return true;
    }
    unwrap() {
        throw new Error("Tried to unwrap None");
    }
    unwrapOr(defaultValue) {
        return defaultValue;
    }
    map(fn) {
        return new None();
    }
}
exports.None = None;
function some(value) {
    return new Some(value);
}
function none() {
    return new None();
}
