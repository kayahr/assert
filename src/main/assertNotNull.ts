/*
 * Copyright (c) 2024 Klaus Reimer, k@ailis.de
 * See LICENSE.md for licensing information.
 */

import { AssertionError } from "./AssertionError.js";
import { toString } from "./utils.js";

/**
 * Asserts that given value is not null.
 *
 * @param actual - The value to check.
 * @param reason - Optional reason added to exception message when assertion fails.
 * @throws {@link AssertionError} when value is null.
 */
export function assertNotNull<T>(actual: T, reason?: string): asserts actual is Exclude<T, null> {
    if (actual === null) {
        throw new AssertionError(`Expected <${toString(actual)}> not to be null`, { reason });
    }
}
