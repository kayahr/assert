/*
 * Copyright (c) 2024-2025 Klaus Reimer
 * SPDX-License-Identifier: MIT
 */

import { AssertionError } from "./AssertionError.ts";
import { toString } from "./utils.ts";

/**
 * Asserts that given asynchronous function does reject the returned promise.
 *
 * @param fn      - The function to call.
 * @param type    - The expected error type the function is expected to throw.
 * @param message - The expected error message the function is expected to throw. Can be a string or a regular expression.
 * @param reason  - Optional reason added to exception message when assertion fails.
 * @returns Promise which must be awaited in order to complete assertion.
 * @throws {@link AssertionError } when function throws exception not matching the given one (or does not throw anything when no error specified).
 */
export function assertThrowWithMessage(fn: () => Promise<unknown>, type: Function, message: string | RegExp, reason?: string): Promise<void>;

/**
 * Asserts that given synchronous function does reject the returned promise.
 *
 * @param fn      - The function to call.
 * @param type    - The expected error type the function is expected to throw.
 * @param message - The expected error message the function is expected to throw. Can be a string or a regular expression.
 * @param reason  - Optional reason added to exception message when assertion fails.
 * @throws {@link AssertionError } when function throws exception not matching the given one (or does not throw anything when no error specified).
 */
export function assertThrowWithMessage(fn: () => unknown, type: Function, message: string | RegExp, reason?: string): void;

/**
 * Asserts that given function (synchronous or asynchronous) does throw an exception with the given type and message. When function is asynchronous then
 * `assertThrowWithMessage` returns a Promise which must be awaited in order to complete the assertion.
 *
 * @param fn      - function to test
 * @param type    - The expected error type the function is expected to throw.
 * @param message - The expected error message the function is expected to throw. Can be a string or a regular expression.
 * @param reason  - Optional reason added to exception message when assertion fails.
 *
 * Examples:
 *
 * ```typescript
 * assertThrowWithMessage(() => someSyncFunc(), RangeError, "Value must be between 2 and 5");
 * await assertThrowWithMessage(() => someAsyncFunc(), RangeError, "Value must be between 2 and 5");
 * ```
 */
export function assertThrowWithMessage(fn: () => unknown, type: Function, message: string | RegExp, reason?: string): void | Promise<void> {
    const checkThrow = (error: unknown): void => {
        if (error == null) {
            throw new AssertionError(`Expected function to throw error of type <${type.name}> but caught <null>`, { reason, actual: error, expected: type });
        }
        if (error.constructor !== type) {
            throw new AssertionError(
                `Expected function to throw error of type <${type.name}> but caught <${error.constructor.name}>`,
                { reason, actual: error, expected: type }
            );
        }
        const actualMessage = error instanceof Error ? error.message : String(error);
        if (typeof message === "string") {
            if (actualMessage !== message) {
                throw new AssertionError(
                    `Expected function to throw error with message <${toString(message)}> but caught <${toString(actualMessage)}>`,
                    { reason, actual: actualMessage, expected: message }
                );
            }
        } else {
            if (actualMessage.match(message) == null) {
                throw new AssertionError(
                    `Expected function to throw error with message matching <${toString(message)}> but caught <${toString(actualMessage)}>`,
                    { reason, expected: message, actual: actualMessage }
                );
            }
        }
    };
    const didNotThrow = (): never => {
        throw new AssertionError(`Expected function to throw error of type <${type.name}> with message <${toString(message)}>`, { reason });
    };
    let result: unknown;
    try {
        result = fn();
    } catch (error) {
        return checkThrow(error);
    }
    if (result instanceof Promise) {
        return result.then(didNotThrow, checkThrow);
    } else {
        didNotThrow();
    }
}
