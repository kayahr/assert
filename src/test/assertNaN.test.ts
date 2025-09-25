import assert from "node:assert";
import { describe, it } from "node:test";

import { AssertionError } from "../main/AssertionError.ts";
import { assertNaN } from "../main/assertNaN.ts";

describe("assertNaN", () => {
    it("does not throw when value is NaN", () => {
        assert.doesNotThrow(() => assertNaN(NaN));
    });
    it("does throw when value is not NaN", () => {
        assert.throws(() => assertNaN(true), new AssertionError("Expected <true> to be NaN"));
        assert.throws(() => assertNaN(null), new AssertionError("Expected <null> to be NaN"));
        assert.throws(() => assertNaN(undefined), new AssertionError("Expected <undefined> to be NaN"));
        assert.throws(() => assertNaN(0), new AssertionError("Expected <0> to be NaN"));
        assert.throws(() => assertNaN(""), new AssertionError("Expected <\"\"> to be NaN"));
        assert.throws(() => assertNaN(1), new AssertionError("Expected <1> to be NaN"));
        assert.throws(() => assertNaN("foo"), new AssertionError("Expected <\"foo\"> to be NaN"));
        assert.throws(() => assertNaN([ 1, 2 ]), new AssertionError("Expected <[ 1, 2 ]> to be NaN"));
        assert.throws(() => assertNaN({ a: 1 }), new AssertionError("Expected <{ a: 1 }> to be NaN"));
        assert.throws(() => assertNaN(new Uint8Array([ 1, 2 ])), new AssertionError("Expected <Uint8Array(1,2)> to be NaN"));
    });
    it("does throw with additional reason", () => {
        assert.throws(() => assertNaN(1, "Reason"), new AssertionError("Reason: Expected <1> to be NaN"));
    });
    it("infers value to be a number", () => {
        const value = NaN as unknown;
        assertNaN(value);
        ((v: number) => v)(value); // Compile fails when type is inferred incorrectly
    });
});
