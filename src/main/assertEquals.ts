/*
 * Copyright (c) 2024 Klaus Reimer, k@ailis.de
 * See LICENSE.md for licensing information.
 */

import { AssertionError } from "./AssertionError.ts";
import { equals, toString } from "./utils.ts";

/**
 * Asserts that the two values are recursively equal. Arrays are considered equal when the size and their items (and positions) are equal. Objects are
 * considered equal when they are of the same type and their properties are equal.
 *
 * When the actual value is an object with an `equals` method then this method is called to determine equality.
 *
 * @param actual   - The actual value to compare.
 * @param expected - The expected value to compare with.
 * @param reason   - Optional reason added to exception message when assertion fails.
 * @throws {@link AssertionError} when values are not equal.
 */
export function assertEquals<T, S>(actual: S, expected: T, reason?: string): asserts actual is T & S {
    if (!equals(actual, expected)) {
        throw new AssertionError(`Expected <${toString(actual)}> to equal <${toString(expected)}>`, { reason, actual, expected });
    }
}
