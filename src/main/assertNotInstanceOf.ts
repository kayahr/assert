/*
 * Copyright (c) 2024 Klaus Reimer, k@ailis.de
 * See LICENSE.md for licensing information.
 */

import { AssertionError } from "./AssertionError.ts";
import { type Class, toString } from "./utils.ts";

/**
 * Asserts that given value is not an instance of the given class.
 *
 * @param value  - The value to check.
 * @param type   - The class the value must be an instance of.
 * @param reason - Optional reason added to exception message when assertion fails.
 * @throws {@link AssertionError} when value is an instance of the given class.
 */
export function assertNotInstanceOf<T, S>(value: S, type: Class<T>, reason?: string): asserts value is Exclude<S, T> {
    if (value instanceof type) {
        throw new AssertionError(`Expected <${toString(value)}> not to be an instance of <${toString(type)}>`, { reason });
    }
}
