/*
 * Copyright (c) 2024 Klaus Reimer, k@ailis.de
 * See LICENSE.md for licensing information.
 */

import { AssertionError } from "./AssertionError.ts";
import { equals, toString } from "./utils.ts";

/**
 * Asserts that the two values are recursively equal but the difference to {@link assertEquals} is that numbers are considered to be equal when they are
 * close enough to each other (configurable by number of decimal digits to compare).
 *
 * Examples:
 *
 * ```typescript
 * assertCloseTo(10.351, 10.352, 2);
 * assertCloseTo({ value: 1.999 }, { value: 1.9992, 3 });
 * assertCloseTo([ 1, 2.1, 3 ], [ 1, 2.10001, 3 ], 3);
 * ```
 *
 * @param actual    - The actual value to compare.
 * @param expected  - The expected value to compare with.
 * @param precision - The number of decimal digits to round numbers to before comparing. Defaults to 2.
 * @param reason    - Optional reason added to exception message when assertion fails.
 *
 * @throws {@link AssertionError} when values are not close enough.
 *
 * @template Actual   - The type of the actual value.
 * @template Expected - The type of the expected value.
 */
export function assertCloseTo<Actual, Expected>(actual: Actual, expected: Expected, precision = 2, reason?: string): asserts actual is Actual & Expected {
    if (!equals(actual, expected, { precision })) {
        throw new AssertionError(`Expected <${toString(actual)}> to be close to <${toString(expected)}> (precision: ${precision} decimals)`, { reason });
    }
}
