/*
 * Copyright (c) 2024 Klaus Reimer, k@ailis.de
 * See LICENSE.md for licensing information.
 */

import { AssertionError } from "./AssertionError.js";
import { toString } from "./utils.js";

/**
 * Asserts that given value is false.
 *
 * @param actual - The value to check.
 * @param reason - Optional reason added to exception message when assertion fails.
 * @throws {@link AssertionError} when value is not false.
 */
export function assertFalse(actual: unknown, reason?: string): asserts actual is false {
    if (actual !== false) {
        throw new AssertionError(`Expected <${toString(actual)}> to be false`, { reason });
    }
}
