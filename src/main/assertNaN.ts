/*
 * Copyright (c) 2024-2025 Klaus Reimer
 * SPDX-License-Identifier: MIT
 */

import { AssertionError } from "./AssertionError.ts";
import { toString } from "./utils.ts";

/**
 * Asserts that given value is `NaN`.
 *
 * @param actual - The value to check.
 * @param reason - Optional reason added to exception message when assertion fails.
 * @throws {@link AssertionError} when value is not `NaN`.
 */
export function assertNaN(actual: unknown, reason?: string): asserts actual is number {
    if (typeof actual !== "number" || !isNaN(actual)) {
        throw new AssertionError(`Expected <${toString(actual)}> to be NaN`, { reason });
    }
}
