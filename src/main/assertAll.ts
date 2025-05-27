/*
 * Copyright (c) 2024 Klaus Reimer, k@ailis.de
 * See LICENSE.md for licensing information.
 */

import { AssertionError } from "./AssertionError.js";

export function assertAll(...funcs: Array<() => undefined | void>): void;
export function assertAll(...funcs: Array<() => undefined | void | Promise<undefined | void>>): Promise<void>;

/**
 * Asserts that all given functions do not throw exceptions. The difference to running multiple single asserts is that execution doesn't stop at the first
 * exception. All functions are executed, exceptions are gathered and when multiple of these functions throw exceptions then `assertAll` throws an
 * {@link AssertionError} with an array of all these exceptions as root cause.
 *
 * Examples:
 *
 * ```typescript
 * assertAll([
 *     () => assertNotNull(value),
 *     () => assertGreaterThan(value, 20),
 *     () => assertLessThan(value, 40),
 * ])
 *
 * await assertAll([
 *     () => assertNotNull(value),
 *     async () => assertNotNull(await getAsyncValue())
 * ])
 * ```
 *
 * @param funcs - The functions to execute. May be synchronous or asynchronous. If at least one function is asynchronous then the `assertAll` function is
 *                also asynchronous and returns a promise.
 *
 * @throws {@link AssertionError} when a nested assertion fails or when multiple functions throw exceptions. If only one function throws an exception which is
 *                                not an `AssertionError` then this root exception is passed through unchanged.
 */
export function assertAll(...funcs: Array<() => undefined | void | Promise<undefined | void>>): void | Promise<void> {
    const errors: unknown[] = [];
    const promises: Array<Promise<void>> = [];
    for (const func of funcs) {
        try {
            const result = func();
            if (result instanceof Promise) {
                promises.push(result);
            }
        } catch (e) {
            errors.push(e);
        }
    }
    const reportErrors = (): void => {
        if (errors.length === 1) {
            throw errors[0];
        } else if (errors.length > 1) {
            throw new AssertionError(`Multiple failures (${errors.length})`, { cause: errors });
        }
    };
    if (promises.length > 0) {
        return Promise.allSettled(promises).then(result => {
            errors.push(...result.filter((result): result is PromiseRejectedResult => result.status === "rejected").map(result => result.reason as unknown));
            reportErrors();
        });
    } else {
        reportErrors();
    }
}
