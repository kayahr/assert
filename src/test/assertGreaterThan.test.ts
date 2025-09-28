/*
 * Copyright (c) 2024-2025 Klaus Reimer
 * SPDX-License-Identifier: MIT
 */

import assert from "node:assert";
import { describe, it } from "node:test";

import { assertGreaterThan } from "../main/assertGreaterThan.ts";
import { AssertionError } from "../main/AssertionError.ts";

describe("assertGreaterThan", () => {
    it("does not throw when actual value is greater than expected value", () => {
        assert.doesNotThrow(() => assertGreaterThan(2, 1));
        assert.doesNotThrow(() => assertGreaterThan(-1, -2));
        assert.doesNotThrow(() => assertGreaterThan(2n, 1n));
        assert.doesNotThrow(() => assertGreaterThan(-1n, -2n));
        assert.doesNotThrow(() => assertGreaterThan(true, false));
        assert.doesNotThrow(() => assertGreaterThan("b", "a"));
        assert.doesNotThrow(() => assertGreaterThan([ 2 ], [ 1 ]));
    });
    it("does throw when actual value is not greater than expected value", () => {
        assert.throws(() => assertGreaterThan(1, 1), new AssertionError("Expected <1> to be greater than <1>"));
        assert.throws(() => assertGreaterThan(1, 2), new AssertionError("Expected <1> to be greater than <2>"));
        assert.throws(() => assertGreaterThan(1n, 1n), new AssertionError("Expected <1n> to be greater than <1n>"));
        assert.throws(() => assertGreaterThan(1n, 2n), new AssertionError("Expected <1n> to be greater than <2n>"));
        assert.throws(() => assertGreaterThan(true, true), new AssertionError("Expected <true> to be greater than <true>"));
        assert.throws(() => assertGreaterThan(false, false), new AssertionError("Expected <false> to be greater than <false>"));
        assert.throws(() => assertGreaterThan(false, true), new AssertionError("Expected <false> to be greater than <true>"));
        assert.throws(() => assertGreaterThan("a", "a"), new AssertionError('Expected <"a"> to be greater than <"a">'));
        assert.throws(() => assertGreaterThan("a", "b"), new AssertionError('Expected <"a"> to be greater than <"b">'));
        assert.throws(() => assertGreaterThan([ 1 ], [ 1 ]), new AssertionError("Expected <[ 1 ]> to be greater than <[ 1 ]>"));
        assert.throws(() => assertGreaterThan([ 1 ], [ 2 ]), new AssertionError("Expected <[ 1 ]> to be greater than <[ 2 ]>"));
    });
    it("does throw with additional reason", () => {
        assert.throws(() => assertGreaterThan(1, 2, "Reason"), new AssertionError("Reason: Expected <1> to be greater than <2>"));
    });
});
