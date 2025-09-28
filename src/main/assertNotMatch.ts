/*
 * Copyright (c) 2024-2025 Klaus Reimer
 * SPDX-License-Identifier: MIT
 */

import { AssertionError } from "./AssertionError.ts";
import { toString } from "./utils.ts";

/**
 * Asserts that given value does not match the given regular expression.
 *
 * @param value  - The value to check.
 * @param regexp - The regular expression to match against.
 * @param reason - Optional reason added to exception message when assertion fails.
 * @throws {@link AssertionError} when value matches the regular expression.
 */
export function assertNotMatch(value: string, regexp: RegExp | string, reason?: string): void {
    if (value.match(regexp) != null) {
        throw new AssertionError(`Expected <${toString(value)}> not to match <${toString(regexp)}>`, { reason, actual: value, expected: regexp });
    }
}
