/*
 * Copyright (c) 2024 Klaus Reimer, k@ailis.de
 * See LICENSE.md for licensing information.
 */

import { AssertionError } from "./AssertionError.ts";
import { type ComparablePrimitive, toString } from "./utils.ts";

/**
 * Asserts that actual value is less than or equal to the expected value.
 *
 * @param actual   - The actual value to check.
 * @param expected - The expected value to which the actual value is compared.
 * @param reason   - Optional reason added to exception message when assertion fails.
 * @throws {@link AssertionError} when actual value is not less than or equal to expected value.
 */
export function assertLessThanOrEqual(actual: ComparablePrimitive, expected: ComparablePrimitive, reason?: string): void {
    if (actual > expected) {
        throw new AssertionError(`Expected <${toString(actual)}> to be less than or equal to <${toString(expected)}>`, { reason });
    }
}
