/*
 * Copyright (c) 2024 Klaus Reimer, k@ailis.de
 * See LICENSE.md for licensing information.
 */

import { AssertionError } from "./AssertionError.js";
import { toString } from "./utils.js";

/**
 * Asserts that given value is nullish (null or undefined).
 *
 * @param actual - The value to check.
 * @param reason - Optional reason added to exception message when assertion fails.
 * @throws {@link AssertionError} when value is not nullish.
 */
export function assertNullish<T>(actual: T, reason?: string): asserts actual is T & (null | undefined) {
    if (actual != null) {
        throw new AssertionError(`Expected <${toString(actual)}> to be null or undefined`, { reason });
    }
}
