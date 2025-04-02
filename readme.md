# Explicitly

`Explicitly` is a TypeScript library inspired by Rust that introduces Option<T> and Result<T, E>. These types eliminate null, undefined, and unexpected exceptions by enforcing explicit handling of missing values and errors. With a functional approach, explicit enhances code robustness and readability while offering intuitive methods such as unwrapOr(), map(), and isOk().

Whether you're dealing with uncertain data, handling API errors, or preventing crashes due to missing values, `Explicitly` provides a safe and elegant alternative to traditional error-handling practices in JavaScript and TypeScript.

This library implements two generic types:
- Option\<T>: stands for a real that can exist (Some\<T>) or be absent (None).
- Result<T, E>: stands for either a successful value (Ok\<T>) or an error (Err\<E>).

## `Option<T>`

It is a safer alternative to null (the billion-dollar mistake) and undefined.

None, represents the absence of a value and forces the developer to handle this case explicitly.

Some\<T> contains a value and provides method to handle it.


## `Result<T, E>`

It is an alternative to `throw new Error()` and involve to handle errors explicitly.

Ok\<T> contains a successfull value, and provides methods to handle it.

Err\<E> contains an error and prevents use without verification.

```
type User = { id: number; name: string };

function findUserById(id: number): Option<User> {
  const users: User[] = [{ id: 1, name: "Alice" }];
  const user = users.find(u => u.id === id);
  return user ? some(user) : none();
}

const user = findUserById(2);
console.log(user.unwrapOr({ id: 0, name: "Invité" })); // { id: 0, name: "Invité" }

```

## Examples

### 1 - Retrieving a value from an object (without undefined)

Problem: We are accessing the property of an object that may not exist.

```
type User = { id: number; name?: string };

function getUserName(user: User): Option<string> {
  return user.name ? some(user.name) : none();
}

const user: User = { id: 1 };
const userName = getUserName(user).unwrapOr("Anonyme");

console.log(userName); // "Anonyme"

```
Benefits:
- Avoids accessing undefined.
- Allows you to provide a default value with unwrapOr().

### 2 - Database Search (without null)

Problem: A query may not return any results.

```
type User = { id: number; name: string };

function findUserById(id: number): Option<User> {
  const users: User[] = [{ id: 1, name: "Alice" }];
  const user = users.find(u => u.id === id);
  return user ? some(user) : none();
}

const user = findUserById(2);
console.log(user.unwrapOr({ id: 0, name: "Invité" })); // { id: 0, name: "Invité" }

```
Benefits:
- Force to handle the case where the user is not found.

### 3 - Securely extracting values ​​from an HTML form

Issue: A field may be missing or empty.

```
function getInputValue(id: string): Option<string> {
  const input = document.getElementById(id) as HTMLInputElement | null;
  return input?.value ? some(input.value) : none();
}

const email = getInputValue("email").unwrapOr("default@example.com");
console.log(email);

```
Benefits:
- Avoids returning null if the element doesn't exist.
- Allows you to provide a default value properly.

### 4 - Safe division (avoid errors)

Problem: Division by zero can crash the program.

```
function safeDivide(a: number, b: number): Result<number, string> {
  if (b === 0) return err("Division by zero");
  return ok(a / b);
}

const result = safeDivide(10, 0);
console.log(result.unwrapOr(-1)); // -1 au lieu d'une erreur

```
Benefits:
- Avoids the use of try/catch.
- Forces explicit error handling.

### 5 - Reading Files in Node.js

Problem: A file may not exist.

```
import fs from "fs";

function readFileContent(path: string): Result<string, string> {
  try {
    return ok(fs.readFileSync(path, "utf8"));
  } catch {
    return err("File not found");
  }
}

const fileContent = readFileContent("config.json").unwrapOr("{}");
console.log(fileContent);

```
Benefits:
- Avoids the need to use try/catch.
- Allows clean error handling with unwrapOr().

### 6 - REST API: Proper HTTP Error Handling

Issue: An API request may fail.

```
async function fetchUser(id: number): Promise<Result<{ id: number; name: string }, string>> {
  try {
    const res = await fetch(`https://api.example.com/users/${id}`);
    if (!res.ok) return err(`HTTP error ${res.status}`);
    return ok(await res.json());
  } catch {
    return err("Network error");
  }
}

fetchUser(1).then(result => {
  if (result.isOk()) console.log(result.unwrap());
  else console.error("Error:", result.unwrapOr({ id: 0, name: "Error" }));
});

```
Benefits:
- Avoids having to manage try/catch in the caller.
- Allows you to return a default value in case of failure.

## How to use it

`$ npm install explicitly`

```
import { some, none, Option, ok, err, Result } from "explicitly";

const maybeValue: Option<string> = some("Hello");
console.log(maybeValue.unwrapOr("Default"));

const result: Result<number, string> = ok(42);
console.log(result.isOk() ? result.unwrap() : "Error");

```