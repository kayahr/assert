/*
 * Copyright (c) 2024-2025 Klaus Reimer
 * SPDX-License-Identifier: MIT
 */

import { AssertionError } from "./AssertionError.ts";
import { toString } from "./utils.ts";

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
