/*
 * Copyright (c) 2024 Klaus Reimer, k@ailis.de
 * See LICENSE.md for licensing information.
 */

import { AssertionError } from "./AssertionError.js";
import { toString } from "./utils.js";

/**
 * Asserts that given value is undefined.
 *
 * @param actual - The value to check.
 * @param reason - Optional reason added to exception message when assertion fails.
 * @throws {@link AssertionError} when value is not undefined.
 */
export function assertUndefined(actual: unknown, reason?: string): asserts actual is undefined {
    if (actual !== undefined) {
        throw new AssertionError(`Expected <${toString(actual)}> to be undefined`, { reason });
    }
}
