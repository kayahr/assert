/*
 * Copyright (c) 2024 Klaus Reimer, k@ailis.de
 * See LICENSE.md for licensing information.
 */

import { AssertionError } from "./AssertionError.ts";
import { toString } from "./utils.ts";

/**
 * Asserts that given value is true.
 *
 * @param actual - The value to check.
 * @param reason - Optional reason added to exception message when assertion fails.
 * @throws {@link AssertionError} when value is not true.
 */
export function assertTrue(actual: unknown, reason?: string): asserts actual is true {
    if (actual !== true) {
        throw new AssertionError(`Expected <${toString(actual)}> to be true`, { reason });
    }
}
