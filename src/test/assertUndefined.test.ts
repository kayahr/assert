import assert from "node:assert";
import { describe, it } from "node:test";

import { AssertionError } from "../main/AssertionError.ts";
import { assertUndefined } from "../main/assertUndefined.ts";

describe("assertUndefined", () => {
    it("does throw when value is not undefined", () => {
        assert.throws(() => assertUndefined(true), new AssertionError("Expected <true> to be undefined"));
        assert.throws(() => assertUndefined(NaN), new AssertionError("Expected <NaN> to be undefined"));
        assert.throws(() => assertUndefined(null), new AssertionError("Expected <null> to be undefined"));
        assert.throws(() => assertUndefined(0), new AssertionError("Expected <0> to be undefined"));
        assert.throws(() => assertUndefined(""), new AssertionError('Expected <""> to be undefined'));
        assert.throws(() => assertUndefined(1), new AssertionError("Expected <1> to be undefined"));
        assert.throws(() => assertUndefined("foo"), new AssertionError('Expected <"foo"> to be undefined'));
        assert.throws(() => assertUndefined([ 1, 2 ]), new AssertionError("Expected <[ 1, 2 ]> to be undefined"));
        assert.throws(() => assertUndefined({ a: 1 }), new AssertionError("Expected <{ a: 1 }> to be undefined"));
        assert.throws(() => assertUndefined(new Uint8Array([ 1, 2 ])), new AssertionError("Expected <Uint8Array(1,2)> to be undefined"));
    });
    it("does not throw when value is undefined", () => {
        assert.doesNotThrow(() => assertUndefined(undefined));
    });
    it("does throw with additional reason", () => {
        assert.throws(() => assertUndefined(null, "Reason"), new AssertionError("Reason: Expected <null> to be undefined"));
    });
    it("infers value to be undefined", () => {
        const value = undefined as number | undefined;
        assertUndefined(value);
        ((v: undefined) => v)(value); // Compile fails when type is inferred incorrectly
    });
});
