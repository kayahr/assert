/*
 * Copyright (c) 2024-2025 Klaus Reimer
 * SPDX-License-Identifier: MIT
 */

import assert from "node:assert";
import { describe, it } from "node:test";

import { AssertionError } from "../main/AssertionError.ts";
import { assertNotNaN } from "../main/assertNotNaN.ts";

describe("assertNotNaN", () => {
    it("does not throw when value is not NaN", () => {
        assert.doesNotThrow(() => assertNotNaN(true));
        assert.doesNotThrow(() => assertNotNaN(null));
        assert.doesNotThrow(() => assertNotNaN(undefined));
        assert.doesNotThrow(() => assertNotNaN(0));
        assert.doesNotThrow(() => assertNotNaN(""));
        assert.doesNotThrow(() => assertNotNaN(1));
        assert.doesNotThrow(() => assertNotNaN("foo"));
        assert.doesNotThrow(() => assertNotNaN([ 1, 2 ]));
        assert.doesNotThrow(() => assertNotNaN({ a: 1 }));
        assert.doesNotThrow(() => assertNotNaN(new Uint8Array([ 1, 2 ])));
    });
    it("does throw when value is NaN", () => {
        assert.throws(() => assertNotNaN(NaN), new AssertionError("Expected <NaN> not to be NaN"));
    });
    it("does throw with additional reason", () => {
        assert.throws(() => assertNotNaN(NaN, "Reason"), new AssertionError("Reason: Expected <NaN> not to be NaN"));
    });
});
