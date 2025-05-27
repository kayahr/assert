import assert from "node:assert";
import { describe, it } from "node:test";

import { assertFalsy } from "../main/assertFalsy.js";
import { AssertionError } from "../main/AssertionError.js";

describe("assertFalsy", () => {
    it("does not throw when value is falsy", () => {
        assert.doesNotThrow(() => assertFalsy(false));
        assert.doesNotThrow(() => assertFalsy(0));
        assert.doesNotThrow(() => assertFalsy(-0));
        assert.doesNotThrow(() => assertFalsy(0n));
        assert.doesNotThrow(() => assertFalsy(""));
        assert.doesNotThrow(() => assertFalsy(null));
        assert.doesNotThrow(() => assertFalsy(undefined));
        assert.doesNotThrow(() => assertFalsy(NaN));
    });
    it("does throw when value is not falsy", () => {
        assert.throws(() => assertFalsy(true), new AssertionError("Expected <true> to be falsy"));
        assert.throws(() => assertFalsy(1), new AssertionError("Expected <1> to be falsy"));
        assert.throws(() => assertFalsy("foo"), new AssertionError("Expected <\"foo\"> to be falsy"));
        assert.throws(() => assertFalsy([ 1, 2 ]), new AssertionError("Expected <[ 1, 2 ]> to be falsy"));
        assert.throws(() => assertFalsy({ a: 1 }), new AssertionError("Expected <{ a: 1 }> to be falsy"));
        assert.throws(() => assertFalsy(new Uint8Array([ 1, 2 ])), new AssertionError("Expected <Uint8Array(1,2)> to be falsy"));
    });
    it("does throw with additional reason", () => {
        assert.throws(() => assertFalsy(1, "Reason"), new AssertionError("Reason: Expected <1> to be falsy"));
    });
    it("infers value to be not true", () => {
        const value = false as boolean | number;
        assertFalsy(value);
        ((v: false | number) => v)(value); // Compile fails when type is inferred incorrectly
    });
});
