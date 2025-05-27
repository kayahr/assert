/*
 * Copyright (c) 2024 Klaus Reimer, k@ailis.de
 * See LICENSE.md for licensing information.
 */

import { AssertionError } from "./AssertionError.js";
import { toString } from "./utils.js";

/**
 * Asserts that given value is falsy.
 *
 * @param actual - The value to check.
 * @param reason - Optional reason added to exception message when assertion fails.
 * @throws {@link AssertionError} when value is not falsy.
 */
export function assertFalsy<T>(actual: T, reason?: string): asserts actual is Exclude<T, true> {
    const isTruthy = Boolean(actual);
    if (isTruthy) {
        throw new AssertionError(`Expected <${toString(actual)}> to be falsy`, { reason });
    }
}
