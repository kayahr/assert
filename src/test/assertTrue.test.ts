/*
 * Copyright (c) 2024-2025 Klaus Reimer
 * SPDX-License-Identifier: MIT
 */

import assert from "node:assert";
import { describe, it } from "node:test";

import { AssertionError } from "../main/AssertionError.ts";
import { assertTrue } from "../main/assertTrue.ts";

describe("assertTrue", () => {
    it("does not throw when value is true", () => {
        assert.doesNotThrow(() => assertTrue(true));
    });
    it("does throw when value is not true", () => {
        assert.throws(() => assertTrue(false), new AssertionError("Expected <false> to be true"));
        assert.throws(() => assertTrue(null), new AssertionError("Expected <null> to be true"));
        assert.throws(() => assertTrue(undefined), new AssertionError("Expected <undefined> to be true"));
        assert.throws(() => assertTrue(0), new AssertionError("Expected <0> to be true"));
        assert.throws(() => assertTrue(""), new AssertionError("Expected <\"\"> to be true"));
        assert.throws(() => assertTrue(1), new AssertionError("Expected <1> to be true"));
        assert.throws(() => assertTrue("foo"), new AssertionError("Expected <\"foo\"> to be true"));
        assert.throws(() => assertTrue([ 1, 2 ]), new AssertionError("Expected <[ 1, 2 ]> to be true"));
        assert.throws(() => assertTrue({ a: 1 }), new AssertionError("Expected <{ a: 1 }> to be true"));
        assert.throws(() => assertTrue(new Uint8Array([ 1, 2 ])), new AssertionError("Expected <Uint8Array(1,2)> to be true"));
    });
    it("does throw with additional reason", () => {
        assert.throws(() => assertTrue(1, "Reason"), new AssertionError("Reason: Expected <1> to be true"));
    });
    it("infers value to be true", () => {
        const value = true as boolean;
        assertTrue(value);
        ((v: true) => v)(value); // Compile fails when type is inferred incorrectly
    });
});
