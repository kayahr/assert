/*
 * Copyright (c) 2024 Klaus Reimer, k@ailis.de
 * See LICENSE.md for licensing information.
 */

import { AssertionError } from "./AssertionError.js";
import { type Class, toString } from "./utils.js";

/**
 * Asserts that given value is an instance of the given class.
 *
 * @param value  - The value to check.
 * @param type   - The class the value must be an instance of.
 * @param reason - Optional reason added to exception message when assertion fails.
 * @throws {@link AssertionError} when value is not an instance of the given class.
 */
export function assertInstanceOf<T>(value: unknown, type: Class<T>, reason?: string): asserts value is T {
    if (!(value instanceof type)) {
        throw new AssertionError(`Expected <${toString(value)}> to be an instance of <${toString(type)}>`, { reason });
    }
}
