/*
 * Copyright (c) 2024-2025 Klaus Reimer
 * SPDX-License-Identifier: MIT
 */

import assert from "node:assert";
import { describe, it } from "node:test";

import { assertGreaterThanOrEqual } from "../main/assertGreaterThanOrEqual.ts";
import { AssertionError } from "../main/AssertionError.ts";

describe("assertGreaterThanOrEqual", () => {
    it("does not throw when actual value is greater than or equal to expected value", () => {
        assert.doesNotThrow(() => assertGreaterThanOrEqual(2, 1));
        assert.doesNotThrow(() => assertGreaterThanOrEqual(2, 2));
        assert.doesNotThrow(() => assertGreaterThanOrEqual(-1, -2));
        assert.doesNotThrow(() => assertGreaterThanOrEqual(2n, 1n));
        assert.doesNotThrow(() => assertGreaterThanOrEqual(2n, 2n));
        assert.doesNotThrow(() => assertGreaterThanOrEqual(-1n, -2n));
        assert.doesNotThrow(() => assertGreaterThanOrEqual(true, false));
        assert.doesNotThrow(() => assertGreaterThanOrEqual(true, true));
        assert.doesNotThrow(() => assertGreaterThanOrEqual("b", "a"));
        assert.doesNotThrow(() => assertGreaterThanOrEqual("a", "a"));
        assert.doesNotThrow(() => assertGreaterThanOrEqual([ 2 ], [ 1 ]));
        assert.doesNotThrow(() => assertGreaterThanOrEqual([ 2 ], [ 2 ]));
    });
    it("does throw when actual value is not greater than expected value", () => {
        assert.throws(() => assertGreaterThanOrEqual(1, 2), new AssertionError("Expected <1> to be greater than or equal to <2>"));
        assert.throws(() => assertGreaterThanOrEqual(1n, 2n), new AssertionError("Expected <1n> to be greater than or equal to <2n>"));
        assert.throws(() => assertGreaterThanOrEqual(false, true), new AssertionError("Expected <false> to be greater than or equal to <true>"));
        assert.throws(() => assertGreaterThanOrEqual("a", "b"), new AssertionError('Expected <"a"> to be greater than or equal to <"b">'));
        assert.throws(() => assertGreaterThanOrEqual([ 1 ], [ 2 ]), new AssertionError("Expected <[ 1 ]> to be greater than or equal to <[ 2 ]>"));
    });
    it("does throw with additional reason", () => {
        assert.throws(() => assertGreaterThanOrEqual(1, 2, "Reason"), new AssertionError("Reason: Expected <1> to be greater than or equal to <2>"));
    });
});
