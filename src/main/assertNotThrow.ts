/*
 * Copyright (c) 2024 Klaus Reimer, k@ailis.de
 * See LICENSE.md for licensing information.
 */

import { AssertionError } from "./AssertionError.js";
import { toString } from "./utils.js";

/**
 * Asserts that given asynchronous function does not reject the returned promise.
 *
 * @param fn       - The function to call.
 * @param error    - Optional error to compare thrown exception to. If specified then assertion fails when function does throw an exception equal to
 *                   this one. If not specified then assertion fails when function throws anything.
 * @param reason   - Optional reason added to exception message when assertion fails.
 * @returns Promise which must be awaited in order to complete assertion.
 * @throws {@link AssertionError} when function throws exception matching the given one (or any exception when no error specified).
 */
export function assertNotThrow(fn: () => Promise<unknown>, error?: unknown, reason?: string): Promise<void>;

/**
 * Asserts that given function does not throw an exception.
 *
 * @param fn       - The function to call.
 * @param error    - Optional error to compare thrown exception to. If specified then assertion fails when function does throw an exception equal to
 *                   this one. If not specified then assertion fails when function throws anything.
 * @param reason   - Optional reason added to exception message when assertion fails.
 * @throws {@link AssertionError} when function throws exception matching the given one (or any exception when no error specified).
 */
export function assertNotThrow(fn: () => unknown, error?: unknown, reason?: string): void;

export function assertNotThrow(fn: () => unknown, error?: unknown, reason?: string): void | Promise<void> {
    const checkThrow = (e: unknown): void => {
        if (error == null) {
            throw new AssertionError(`Expected function not to throw but caught <${toString(e)}>`, { reason });
        }
        if (e instanceof error.constructor && String(e) === String(error)) {
            throw new AssertionError(`Expected function not to throw <${toString(error)}>`, { reason });
        }
    };
    let result: unknown;
    try {
        result = fn();
    } catch (e) {
        checkThrow(e);
        return;
    }
    if (result instanceof Promise) {
        return result.catch(checkThrow).then(() => {});
    }
}
