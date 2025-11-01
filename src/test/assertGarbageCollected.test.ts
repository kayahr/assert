/*
 * Copyright (c) 2024-2025 Klaus Reimer
 * SPDX-License-Identifier: MIT
 */

import { describe, it } from "node:test";

import { assertGarbageCollected } from "../main/assertGarbageCollected.ts";
import { sleep } from "../main/utils.ts";
import { assertThrowWithMessage } from "../main/assertThrowWithMessage.ts";
import { AssertionError } from "../main/AssertionError.ts";

describe("assertDefined", () => {
    it("passes when object was garbage collected", async () => {
        let o: Record<string, unknown> | undefined = { a: 34 };
        await assertGarbageCollected(new WeakRef(o), () => { o = undefined; });
    });
    it("passes when object was garbage collected a little bit later", async () => {
        let o: Record<string, unknown> | undefined = { a: 34 };
        await assertGarbageCollected(new WeakRef(o), async () => {
            await sleep(250);
            o = undefined;
        });
    });
    it("fails when object was not garbage collected", async () => {
        await assertThrowWithMessage(async () => {
            let o: Record<string, unknown> | undefined = { a: 34 };
            await assertGarbageCollected(new WeakRef(o), () => {}, { timeout: 250 });
            o = undefined;
        }, AssertionError, "Expected object to be garbage collected but it was not");
    });
});
