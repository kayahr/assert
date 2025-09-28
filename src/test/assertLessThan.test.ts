/*
 * Copyright (c) 2024-2025 Klaus Reimer
 * SPDX-License-Identifier: MIT
 */

import assert from "node:assert";
import { describe, it } from "node:test";

import { AssertionError } from "../main/AssertionError.ts";
import { assertLessThan } from "../main/assertLessThan.ts";

describe("assertLessThan", () => {
    it("does not throw when actual value is less than expected value", () => {
        assert.doesNotThrow(() => assertLessThan(1, 2));
        assert.doesNotThrow(() => assertLessThan(-2, -1));
        assert.doesNotThrow(() => assertLessThan(1n, 2n));
        assert.doesNotThrow(() => assertLessThan(-2n, -1n));
        assert.doesNotThrow(() => assertLessThan(false, true));
        assert.doesNotThrow(() => assertLessThan("a", "b"));
        assert.doesNotThrow(() => assertLessThan([ 1 ], [ 2 ]));
    });
    it("does throw when actual value is not less than expected value", () => {
        assert.throws(() => assertLessThan(1, 1), new AssertionError("Expected <1> to be less than <1>"));
        assert.throws(() => assertLessThan(2, 1), new AssertionError("Expected <2> to be less than <1>"));
        assert.throws(() => assertLessThan(1n, 1n), new AssertionError("Expected <1n> to be less than <1n>"));
        assert.throws(() => assertLessThan(2n, 1n), new AssertionError("Expected <2n> to be less than <1n>"));
        assert.throws(() => assertLessThan(true, true), new AssertionError("Expected <true> to be less than <true>"));
        assert.throws(() => assertLessThan(false, false), new AssertionError("Expected <false> to be less than <false>"));
        assert.throws(() => assertLessThan(true, false), new AssertionError("Expected <true> to be less than <false>"));
        assert.throws(() => assertLessThan("a", "a"), new AssertionError('Expected <"a"> to be less than <"a">'));
        assert.throws(() => assertLessThan("b", "a"), new AssertionError('Expected <"b"> to be less than <"a">'));
        assert.throws(() => assertLessThan([ 1 ], [ 1 ]), new AssertionError("Expected <[ 1 ]> to be less than <[ 1 ]>"));
        assert.throws(() => assertLessThan([ 2 ], [ 1 ]), new AssertionError("Expected <[ 2 ]> to be less than <[ 1 ]>"));
    });
    it("does throw with additional reason", () => {
        assert.throws(() => assertLessThan(2, 1,  "Reason"), new AssertionError("Reason: Expected <2> to be less than <1>"));
    });
});
