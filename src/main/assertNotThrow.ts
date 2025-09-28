/*
 * Copyright (c) 2024-2025 Klaus Reimer
 * SPDX-License-Identifier: MIT
 */

import { AssertionError } from "./AssertionError.ts";
import { toString } from "./utils.ts";

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
    } catch (error) {
        checkThrow(error);
        return;
    }
    if (result instanceof Promise) {
        return (async () => {
            try {
                await result;
            } catch (error) {
                checkThrow(error);
            }
        })();
    }
}
