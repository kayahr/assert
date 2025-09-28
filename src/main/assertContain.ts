/*
 * Copyright (c) 2024-2025 Klaus Reimer
 * SPDX-License-Identifier: MIT
 */

import { AssertionError } from "./AssertionError.ts";
import { toString } from "./utils.ts";

export function assertContain(container: string, item: string, reason?: string): void;
export function assertContain<T>(container: T[], item: T, reason?: string): void;

/**
 * Asserts that the given item is contained within the given container.
 *
 * Examples:
 *
 * ```typescript
 * assertContain([ 1, 2, 3 ], 2);
 * assertContain("The fox thingy jumps over some other thingy, whatever...", "fox");
 * ```
 *
 * @param container - The container. Can be an array or a string.
 * @param item      - The item to search in the container. Must be a string if container is a string.
 * @param reason    - Optional reason added to exception message when assertion fails.
 *
 * @throws {@link AssertionError} when item is not found in container.
 */
export function assertContain<T>(container: string | T[], item: T & string, reason?: string): void {
    if (!container.includes(item)) {
        throw new AssertionError(`Expected <${toString(container)}> to contain <${toString(item)}>`, { reason });
    }
}
