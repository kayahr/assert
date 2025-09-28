/*
 * Copyright (c) 2024-2025 Klaus Reimer
 * SPDX-License-Identifier: MIT
 */

import { AssertionError } from "./AssertionError.ts";
import { toString } from "./utils.ts";

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
