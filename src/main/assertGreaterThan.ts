/*
 * Copyright (c) 2024-2025 Klaus Reimer
 * SPDX-License-Identifier: MIT
 */

import { AssertionError } from "./AssertionError.ts";
import { type ComparablePrimitive, toString } from "./utils.ts";

/**
 * Asserts that actual value is greater than the expected value.
 *
 * @param actual   - The actual value to check.
 * @param expected - The expected value to which the actual value is compared.
 * @param reason   - Optional reason added to exception message when assertion fails.
 * @throws {@link AssertionError} when actual value is not greater than expected value.
 */
export function assertGreaterThan(actual: ComparablePrimitive, expected: ComparablePrimitive, reason?: string): void {
    if (actual <= expected) {
        throw new AssertionError(`Expected <${toString(actual)}> to be greater than <${toString(expected)}>`, { reason });
    }
}
