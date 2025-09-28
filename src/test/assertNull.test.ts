/*
 * Copyright (c) 2024-2025 Klaus Reimer
 * SPDX-License-Identifier: MIT
 */

import assert from "node:assert";
import { describe, it } from "node:test";

import { AssertionError } from "../main/AssertionError.ts";
import { assertNull } from "../main/assertNull.ts";

describe("assertNull", () => {
    it("does throw when value is not null", () => {
        assert.throws(() => assertNull(true), new AssertionError("Expected <true> to be null"));
        assert.throws(() => assertNull(NaN), new AssertionError("Expected <NaN> to be null"));
        assert.throws(() => assertNull(undefined), new AssertionError("Expected <undefined> to be null"));
        assert.throws(() => assertNull(0), new AssertionError("Expected <0> to be null"));
        assert.throws(() => assertNull(""), new AssertionError('Expected <""> to be null'));
        assert.throws(() => assertNull(1), new AssertionError("Expected <1> to be null"));
        assert.throws(() => assertNull("foo"), new AssertionError('Expected <"foo"> to be null'));
        assert.throws(() => assertNull([ 1, 2 ]), new AssertionError("Expected <[ 1, 2 ]> to be null"));
        assert.throws(() => assertNull({ a: 1 }), new AssertionError("Expected <{ a: 1 }> to be null"));
        assert.throws(() => assertNull(new Uint8Array([ 1, 2 ])), new AssertionError("Expected <Uint8Array(1,2)> to be null"));
    });
    it("does not throw when value is null", () => {
        assert.doesNotThrow(() => assertNull(null));
    });
    it("does throw with additional reason", () => {
        assert.throws(() => assertNull(undefined, "Reason"), new AssertionError("Reason: Expected <undefined> to be null"));
    });
    it("infers value to be null", () => {
        const value = null as number | null;
        assertNull(value);
        ((v: null) => v)(value); // Compile fails when type is inferred incorrectly
    });
});
