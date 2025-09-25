/*
 * Copyright (c) 2024 Klaus Reimer, k@ailis.de
 * See LICENSE.md for licensing information.
 */
import { AssertionError } from "./AssertionError.ts";
import { toString } from "./utils.ts";

export function assertNotContain(actual: string, expected: string, reason?: string): void;
export function assertNotContain<T>(actual: T[], expected: T, reason?: string): void;

/**
 * Asserts that the given item is not contained within the given container.
 *
 * @param actual   - The container. Can be an array or a string.
 * @param expected - The item to search in the container. Must be a string if container is a string.
 * @param reason   - Optional reason added to exception message when assertion fails.
 * @throws {@link AssertionError} when item is found in container.
 */
export function assertNotContain<T>(actual: string | T[], expected: T & string, reason?: string): void {
    if (actual.includes(expected)) {
        throw new AssertionError(`Expected <${toString(actual)}> not to contain <${toString(expected)}>`, { reason });
    }
}
