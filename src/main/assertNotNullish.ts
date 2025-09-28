/*
 * Copyright (c) 2024-2025 Klaus Reimer
 * SPDX-License-Identifier: MIT
 */

import { AssertionError } from "./AssertionError.ts";
import { toString } from "./utils.ts";

/**
 * Asserts that given value is not nullish (null or undefined).
 *
 * @param actual - The value to check.
 * @param reason - Optional reason added to exception message when assertion fails.
 * @throws {@link AssertionError} when value is nullish.
 */
export function assertNotNullish<T>(actual: T, reason?: string): asserts actual is Exclude<T, null | undefined> {
    if (actual == null) {
        throw new AssertionError(`Expected <${toString(actual)}> not to be null or undefined`, { reason });
    }
}
