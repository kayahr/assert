/*
 * Copyright (c) 2024-2025 Klaus Reimer
 * SPDX-License-Identifier: MIT
 */

import assert from "node:assert";
import { describe, it } from "node:test";

import { assertFalse } from "../main/assertFalse.ts";
import { AssertionError } from "../main/AssertionError.ts";

describe("assertFalse", () => {
    it("does not throw when value is false", () => {
        assert.doesNotThrow(() => assertFalse(false));
    });
    it("does throw when value is not false", () => {
        assert.throws(() => assertFalse(true), new AssertionError("Expected <true> to be false"));
        assert.throws(() => assertFalse(null), new AssertionError("Expected <null> to be false"));
        assert.throws(() => assertFalse(undefined), new AssertionError("Expected <undefined> to be false"));
        assert.throws(() => assertFalse(0), new AssertionError("Expected <0> to be false"));
        assert.throws(() => assertFalse(""), new AssertionError("Expected <\"\"> to be false"));
        assert.throws(() => assertFalse(1), new AssertionError("Expected <1> to be false"));
        assert.throws(() => assertFalse("foo"), new AssertionError("Expected <\"foo\"> to be false"));
        assert.throws(() => assertFalse([ 1, 2 ]), new AssertionError("Expected <[ 1, 2 ]> to be false"));
        assert.throws(() => assertFalse({ a: 1 }), new AssertionError("Expected <{ a: 1 }> to be false"));
        assert.throws(() => assertFalse(new Uint8Array([ 1, 2 ])), new AssertionError("Expected <Uint8Array(1,2)> to be false"));
    });
    it("does throw with additional reason", () => {
        assert.throws(() => assertFalse(1, "Reason"), new AssertionError("Reason: Expected <1> to be false"));
    });
    it("infers value to be false", () => {
        const value = false as boolean;
        assertFalse(value);
        ((v: false) => v)(value); // Compile fails when type is inferred incorrectly
    });
});
