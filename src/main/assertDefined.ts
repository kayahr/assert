/*
 * Copyright (c) 2024 Klaus Reimer, k@ailis.de
 * See LICENSE.md for licensing information.
 */

import { AssertionError } from "./AssertionError.js";
import { toString } from "./utils.js";

/**
 * Asserts that the given value is not undefined. Note that `null` is considered to be a defined value.
 *
 * Example:
 *
 * ```typescript
 * assertDefined(someVar);
 * ```
 *
 * @param actual - The value to check.
 * @param reason - Optional reason added to exception message when assertion fails.
 * @throws {@link AssertionError} when value is undefined.
 */
export function assertDefined<T>(actual: T, reason?: string): asserts actual is Exclude<T, undefined> {
    if (actual === undefined) {
        throw new AssertionError(`Expected <${toString(actual)}> to be defined`, { reason });
    }
}
