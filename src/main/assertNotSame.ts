/*
 * Copyright (c) 2024 Klaus Reimer, k@ailis.de
 * See LICENSE.md for licensing information.
 */

import { AssertionError } from "./AssertionError.ts";
import { toString } from "./utils.ts";

/**
 * Asserts that actual value is not the same as the expected value.
 *
 * @param actual   - The value to check.
 * @param expected - The expected value to check against.
 * @param reason   - Optional reason added to exception message when assertion fails.
 * @throws {@link AssertionError} when actual value is the same as the expected value.
 */
export function assertNotSame<T>(actual: T, expected: unknown, reason?: string): void {
    if (actual === expected) {
        if (actual instanceof Object) {
            throw new AssertionError(`Expected <${toString(actual)}> not to be same instance`, { reason });
        } else {
            throw new AssertionError(`Expected <${toString(actual)}> not to be <${toString(expected)}>`, { reason });
        }
    }
}
