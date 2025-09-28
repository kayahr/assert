/*
 * Copyright (c) 2024-2025 Klaus Reimer
 * SPDX-License-Identifier: MIT
 */

import assert from "node:assert";
import { describe, it } from "node:test";

import { AssertionError } from "../main/AssertionError.ts";
import { assertTimeout } from "../main/assertTimeout.ts";

function sleepSync(ms: number): void {
    const start = performance.now();
    while (performance.now() - ms < start) {
        // Wasting time synchronously
    }
}

function sleepAsync(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe("assertTimeout", () => {
    it("does not throw when synchronous function finishes in time", () => {
        assert.doesNotThrow(() => assertTimeout(10_000, () => {}));
    });
    it("does throw when synchronous function finishes in time", () => {
        assert.throws(() => assertTimeout(2, () => { sleepSync(10); }), new AssertionError(`Execution exceeded timeout of 2 ms by 8 ms`));
    });
    it("does throw when asynchronous function finishes in time", async () => {
        await assert.rejects(() => assertTimeout(3, () => sleepAsync(10)),
            new AssertionError(`Execution timed out after 3 ms`)
        );
    });
    it("does throw with additional reason", async () => {
        assert.throws(() => assertTimeout(2, () => { sleepSync(10); }, "Reason"),
            new AssertionError(`Reason: Execution exceeded timeout of 2 ms by 8 ms`)
        );
        await assert.rejects(() => assertTimeout(3, () => sleepAsync(10), "Reason"),
            new AssertionError(`Reason: Execution timed out after 3 ms`)
        );
    });
});
