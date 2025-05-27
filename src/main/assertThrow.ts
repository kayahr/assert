/*
 * Copyright (c) 2024 Klaus Reimer, k@ailis.de
 * See LICENSE.md for licensing information.
 */

import { AssertionError } from "./AssertionError.js";
import { toString } from "./utils.js";

/**
 * Asserts that given asynchronous function does reject the returned promise.
 *
 * @param fn       - The function to call.
 * @param error    - Optional error to compare thrown exception to. If specified then assertion fails when function does not throw an exception equal to
 *                   this one. If not specified then assertion fails when function does not throw anything.
 * @param reason   - Optional reason added to exception message when assertion fails.
 * @returns Promise which must be awaited in order to complete assertion.
 * @throws {@link AssertionError } when function throws exception not matching the given one (or does not throw anything when no error specified).
 */
export function assertThrow(fn: () => Promise<unknown>, error?: unknown, reason?: string): Promise<void>;

/**
 * @param fn       - The function to call.
 * @param error    - Optional error to compare thrown exception to. If specified then assertion fails when function does not throw an exception equal to
 *                   this one. If not specified then assertion fails when function does not throw anything.
 * @param reason   - Optional reason added to exception message when assertion fails.
 * @throws {@link AssertionError } when function throws exception not matching the given one (or does not throw anything when no error specified).
 */
export function assertThrow(fn: () => unknown, error?: unknown, reason?: string): void;

/**
 * Asserts that given function (synchronous or asynchronous) does throw an exception. When function is asynchronous then `assertThrow` returns a Promise
 * which must be awaited in order to complete the assertion.
 *
 * Examples:
 *
 * ```typescript
 * assertThrow(() => someSyncFunc());
 * assertThrow(() => someSyncFunc(), new SomeError("Message");
 * await assertThrow(() => someAsyncFunc());
 * await assertThrow(() => someAsyncFunc(), new SomeError("Message");
 * ```
 */
export function assertThrow(fn: () => unknown, error?: unknown, reason?: string): void | Promise<void> {
    const checkThrow = (e: unknown): void => {
        if (error != null && (!(e instanceof error.constructor) || String(e) !== String(error))) {
            throw new AssertionError(`Expected function to throw <${toString(error)}> but caught <${toString(e)}>`, { reason });
        }
    };
    const didNotThrow = (): never => {
        throw new AssertionError(`Expected function to throw${error != null ? ` <${toString(error)}>` : ""}`, { reason });
    };
    let result: unknown;
    try {
        result = fn();
    } catch (e) {
        return checkThrow(e);
    }
    if (result instanceof Promise) {
        return result.then(didNotThrow, checkThrow);
    } else {
        didNotThrow();
    }
}
