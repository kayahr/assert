/*
 * Copyright (c) 2024-2025 Klaus Reimer
 * SPDX-License-Identifier: MIT
 */

import assert from "node:assert";
import { describe, it } from "node:test";

import { AssertionError } from "../main/AssertionError.ts";
import { assertTruthy } from "../main/assertTruthy.ts";

describe("assertTruthy", () => {
    it("does not throw when value is truthy", () => {
        assert.doesNotThrow(() => assertTruthy(true));
        assert.doesNotThrow(() => assertTruthy(1));
        assert.doesNotThrow(() => assertTruthy("foo"));
        assert.doesNotThrow(() => assertTruthy([ 1, 2 ]));
        assert.doesNotThrow(() => assertTruthy({ a: 1 }));
        assert.doesNotThrow(() => assertTruthy(new Uint8Array([ 1, 2 ])));
    });
    it("does throw when value is not truthy", () => {
        assert.throws(() => assertTruthy(false), new AssertionError("Expected <false> to be truthy"));
        assert.throws(() => assertTruthy(0), new AssertionError("Expected <0> to be truthy"));
        assert.throws(() => assertTruthy(-0), new AssertionError("Expected <0> to be truthy"));
        assert.throws(() => assertTruthy(0n), new AssertionError("Expected <0n> to be truthy"));
        assert.throws(() => assertTruthy(""), new AssertionError('Expected <""> to be truthy'));
        assert.throws(() => assertTruthy(null), new AssertionError("Expected <null> to be truthy"));
        assert.throws(() => assertTruthy(undefined), new AssertionError("Expected <undefined> to be truthy"));
        assert.throws(() => assertTruthy(NaN), new AssertionError("Expected <NaN> to be truthy"));
    });
    it("does throw with additional reason", () => {
        assert.throws(() => assertTruthy(0, "Reason"), new AssertionError("Reason: Expected <0> to be truthy"));
    });
    it("infers value to be not falsy", () => {
        const value = true as 1 | 0 | 0n | "" | null | undefined | false | true;
        assertTruthy(value);
        ((v: 1 | true) => v)(value); // Compile fails when type is inferred incorrectly
    });
});
