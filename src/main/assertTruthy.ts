/*
 * Copyright (c) 2024-2025 Klaus Reimer
 * SPDX-License-Identifier: MIT
 */

import { AssertionError } from "./AssertionError.ts";
import { toString } from "./utils.ts";

/**
 * Asserts that given value is truthy.
 *
 * @param actual - The value to check.
 * @param reason - Optional reason added to exception message when assertion fails.
 * @throws {@link AssertionError} when value is not truthy.
 */
export function assertTruthy<T>(actual: T, reason?: string): asserts actual is Exclude<T, false | 0 | 0n | null | undefined | ""> {
    const isTruthy = Boolean(actual);
    if (!isTruthy) {
        throw new AssertionError(`Expected <${toString(actual)}> to be truthy`, { reason });
    }
}
