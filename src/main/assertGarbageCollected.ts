/*
 * Copyright (c) 2025 Klaus Reimer
 * SPDX-License-Identifier: MIT
 */

import { AssertionError } from "./AssertionError.ts";
import { sleep } from "./utils.ts";

/**
 * Options for {@link assertGarbageCollected}.
 */
export interface AssertGarbageCollectedOptions {
    /** Optional timeout for garbage-collection. Defaults to 5000ms. */
    timeout?: number;

    /** Optional reason added to exception message when assertion fails. */
    reason?: string;
}

/**
 * Calls the given destructor and asserts that the given object (passed via a WeakRef) is garbage collected within a given time (default 5000ms).
 *
 * Example:
 *
 * ```typescript
 * await assertGarbageCollected(new WeakRef(obj), () => obj = null);
 * ```
 *
 * @param ref        - The WeakRef to the object to be monitored.
 * @param destructor - The destructor function to call before checking for garbage-collection.
 * @param options    - Additional assert options.
 * @throws {@link AssertionError} when object has not been garbage collected.
 */
export async function assertGarbageCollected(ref: WeakRef<object>, destructor: () => void, { timeout = 5000, reason }: AssertGarbageCollectedOptions = {}):
        Promise<void> {
    destructor();
    let pass = false;
    const end = Date.now() + timeout;
    while (!pass && Date.now() < end) {
        await sleep();
        globalThis.gc!();
        await sleep();
        pass = ref.deref() === undefined;
    }
    if (!pass) {
        throw new AssertionError("Expected object to be garbage collected but it was not", { reason });
    }
}
