"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Err = exports.Ok = void 0;
exports.ok = ok;
exports.err = err;
class Ok {
    constructor(value) {
        this.value = value;
    }
    isOk() {
        return true;
    }
    isErr() {
        return false;
    }
    unwrap() {
        return this.value;
    }
    unwrapOr(defaultValue) {
        return this.value;
    }
    map(fn) {
        return new Ok(fn(this.value));
    }
}
exports.Ok = Ok;
class Err {
    constructor(error) {
        this.error = error;
    }
    isOk() {
        return false;
    }
    isErr() {
        return true;
    }
    unwrap() {
        throw new Error(`Tried to unwrap Err: ${this.error}`);
    }
    unwrapOr(defaultValue) {
        return defaultValue;
    }
}
exports.Err = Err;
function ok(value) {
    return new Ok(value);
}
function err(error) {
    return new Err(error);
}
