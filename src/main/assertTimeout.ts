/*
 * Copyright (c) 2024 Klaus Reimer, k@ailis.de
 * See LICENSE.md for licensing information.
 */

import { AssertionError } from "./AssertionError.ts";

export function assertTimeout<T>(milliseconds: number, func: () => Promise<T>, reason?: string): Promise<T>;
export function assertTimeout<T>(milliseconds: number, func: () => T, reason?: string): T;

/**
 * Asserts that given function does not take longer than the given number of milliseconds. When function is asynchronous then execution is immediately aborted
 * when timeout is reached. When function is synchronous then it is not possible to abort execution after reaching the timeout but an exception is thrown
 * as soon as the synchronous function returns.
 *
 * @param milliseconds - The maximum time (in milliseconds) the function is allowed to run.
 * @param func         - The function to run (can be synchronous or asynchronous).
 * @param reason       - Optional reason added to exception message when assertion fails.
 * @throws {@link AssertionError} when function execution took longer than allowed.
 */
export function assertTimeout<T>(milliseconds: number, func: () => T | Promise<T>, reason?: string): T | Promise<T> {
    const start = performance.now();
    const result = func();
    if (result instanceof Promise) {
        return new Promise<T>((resolve, reject) => {
            const timer = setTimeout(() => {
                reject(new AssertionError(`Execution timed out after ${milliseconds} ms`, { reason }));
            }, milliseconds);
            return (async () => {
                const value = await result;
                clearTimeout(timer);
                resolve(value);
            })();
        });
    } else {
        const end = performance.now();
        const duration = end - start;
        const exceeded = Math.round(duration - milliseconds);
        if (exceeded >= 0) {
            throw new AssertionError(`Execution exceeded timeout of ${milliseconds} ms by ${exceeded} ms`, { reason });
        }
        return result;
    }
}
