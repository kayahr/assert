/*
 * Copyright (c) 2024-2025 Klaus Reimer
 * SPDX-License-Identifier: MIT
 */

import { AssertionError } from "./AssertionError.ts";
import { toString } from "./utils.ts";

/**
 * Asserts that given value is null.
 *
 * @param actual - The value to check.
 * @param reason - Optional reason added to exception message when assertion fails.
 * @throws {@link AssertionError} when value is not null.
 */
export function assertNull(actual: unknown, reason?: string): asserts actual is null {
    if (actual !== null) {
        throw new AssertionError(`Expected <${toString(actual)}> to be null`, { reason });
    }
}
