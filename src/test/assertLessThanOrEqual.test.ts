/*
 * Copyright (c) 2024-2025 Klaus Reimer
 * SPDX-License-Identifier: MIT
 */

import assert from "node:assert";
import { describe, it } from "node:test";

import { AssertionError } from "../main/AssertionError.ts";
import { assertLessThanOrEqual } from "../main/assertLessThanOrEqual.ts";

describe("assertLessThanOrEqual", () => {
    it("does not throw when actual value is less than or equal to expected value", () => {
        assert.doesNotThrow(() => assertLessThanOrEqual(1, 2));
        assert.doesNotThrow(() => assertLessThanOrEqual(2, 2));
        assert.doesNotThrow(() => assertLessThanOrEqual(-2, -1));
        assert.doesNotThrow(() => assertLessThanOrEqual(1n, 2n));
        assert.doesNotThrow(() => assertLessThanOrEqual(2n, 2n));
        assert.doesNotThrow(() => assertLessThanOrEqual(-2n, -1n));
        assert.doesNotThrow(() => assertLessThanOrEqual(false, true));
        assert.doesNotThrow(() => assertLessThanOrEqual(true, true));
        assert.doesNotThrow(() => assertLessThanOrEqual("a", "b"));
        assert.doesNotThrow(() => assertLessThanOrEqual("a", "a"));
        assert.doesNotThrow(() => assertLessThanOrEqual([ 1 ], [ 2 ]));
        assert.doesNotThrow(() => assertLessThanOrEqual([ 2 ], [ 2 ]));
    });
    it("does throw when actual value is not less than expected value", () => {
        assert.throws(() => assertLessThanOrEqual(2, 1), new AssertionError("Expected <2> to be less than or equal to <1>"));
        assert.throws(() => assertLessThanOrEqual(2n, 1n), new AssertionError("Expected <2n> to be less than or equal to <1n>"));
        assert.throws(() => assertLessThanOrEqual(true, false), new AssertionError("Expected <true> to be less than or equal to <false>"));
        assert.throws(() => assertLessThanOrEqual("b", "a"), new AssertionError('Expected <"b"> to be less than or equal to <"a">'));
        assert.throws(() => assertLessThanOrEqual([ 2 ], [ 1 ]), new AssertionError("Expected <[ 2 ]> to be less than or equal to <[ 1 ]>"));
    });
    it("does throw with additional reason", () => {
        assert.throws(() => assertLessThanOrEqual(2, 1, "Reason"), new AssertionError("Reason: Expected <2> to be less than or equal to <1>"));
    });
});
