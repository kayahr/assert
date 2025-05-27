Assert
======

[GitHub] | [NPM] | [API Doc]

A large collection of generic TypeScript assert functions which can be used in unit tests but also in production code to validate inputs for example.

When an assertion fails an [AssertionError] is thrown with detailed information about what went wrong.

The assert library works in Node.js and browsers.


Usage
-----

Install the library in your project (add `-D` parameter when only needed as dev dependency for unit tests):

```bash
npm install @kayahr/assert
```

And the use it like this:

```typescript
import { assertNotNull } from "@kayahr/assert";

assertNotNull(someValue);
```

See [API Doc] for a list of all provided assert functions.

[API Doc]: https://kayahr.github.io/assert/
[GitHub]: https://github.com/kayahr/assert/
[NPM]: https://www.npmjs.com/package/@kayahr/assert/
[AssertionError]: https://kayahr.github.io/assert/classes/AssertionError.html
