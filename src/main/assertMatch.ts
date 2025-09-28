/*
 * Copyright (c) 2024 Klaus Reimer, k@ailis.de
 * See LICENSE.md for licensing information.
 */

import { AssertionError } from "./AssertionError.ts";
import { toString } from "./utils.ts";

/**
 * Asserts that given value matches the given regular expression.
 *
 * @param value  - The value to check.
 * @param regexp - The regular expression to match against.
 * @param reason - Optional reason added to exception message when assertion fails.
 * @throws {@link AssertionError} when value does not match the regular expression.
 */
export function assertMatch(value: string, regexp: RegExp | string, reason?: string): void {
    if (value.match(regexp) == null) {
        throw new AssertionError(`Expected <${toString(value)}> to match <${toString(regexp)}>`, { reason, expected: regexp, actual: value });
    }
}
