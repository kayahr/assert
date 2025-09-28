/*
 * Copyright (c) 2024-2025 Klaus Reimer
 * SPDX-License-Identifier: MIT
 */

import { AssertionError } from "./AssertionError.ts";
import { type Class, toString } from "./utils.ts";

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
