/*
 * Copyright (c) 2024 Klaus Reimer, k@ailis.de
 * See LICENSE.md for licensing information.
 */

import { AssertionError } from "./AssertionError.js";
import { toString } from "./utils.js";

/**
 * Asserts that given value is not `NaN`.
 *
 * @param actual - The value to check.
 * @param reason - Optional reason added to exception message when assertion fails.
 * @throws {@link AssertionError} when value is `NaN`.
 */
export function assertNotNaN(actual: unknown, reason?: string): void {
    if (typeof actual === "number" && isNaN(actual)) {
        throw new AssertionError(`Expected <${toString(actual)}> not to be NaN`, { reason });
    }
}
