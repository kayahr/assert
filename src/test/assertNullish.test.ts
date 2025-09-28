/*
 * Copyright (c) 2024-2025 Klaus Reimer
 * SPDX-License-Identifier: MIT
 */

import assert from "node:assert";
import { describe, it } from "node:test";

import { AssertionError } from "../main/AssertionError.ts";
import { assertNullish } from "../main/assertNullish.ts";

describe("assertNullish", () => {
    it("does throw when value is not null and not undefined", () => {
        assert.throws(() => assertNullish(true), new AssertionError("Expected <true> to be null or undefined"));
        assert.throws(() => assertNullish(NaN), new AssertionError("Expected <NaN> to be null or undefined"));
        assert.throws(() => assertNullish(0), new AssertionError("Expected <0> to be null or undefined"));
        assert.throws(() => assertNullish(""), new AssertionError('Expected <""> to be null or undefined'));
        assert.throws(() => assertNullish(1), new AssertionError("Expected <1> to be null or undefined"));
        assert.throws(() => assertNullish("foo"), new AssertionError('Expected <"foo"> to be null or undefined'));
        assert.throws(() => assertNullish([ 1, 2 ]), new AssertionError("Expected <[ 1, 2 ]> to be null or undefined"));
        assert.throws(() => assertNullish({ a: 1 }), new AssertionError("Expected <{ a: 1 }> to be null or undefined"));
        assert.throws(() => assertNullish(new Uint8Array([ 1, 2 ])), new AssertionError("Expected <Uint8Array(1,2)> to be null or undefined"));
    });
    it("does not throw when value is null or undefined", () => {
        assert.doesNotThrow(() => assertNullish(null));
        assert.doesNotThrow(() => assertNullish(undefined));
    });
    it("does throw with additional reason", () => {
        assert.throws(() => assertNullish(1, "Reason"), new AssertionError("Reason: Expected <1> to be null or undefined"));
    });
    it("infers value to be null", () => {
        const value = null as number | null | undefined;
        assertNullish(value);
        ((v: null | undefined) => v)(value);  // Compile fails when type is inferred incorrectly
    });
});
