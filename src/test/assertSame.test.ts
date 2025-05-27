import assert from "node:assert";
import { describe, it } from "node:test";

import { AssertionError } from "../main/AssertionError.js";
import { assertSame } from "../main/assertSame.js";

describe("assertSame", () => {
    it("does throw when values are not same", () => {
        assert.throws(() => assertSame(1, 2), new AssertionError("Expected <1> to be <2>"));
        assert.throws(() => assertSame(null, undefined), new AssertionError("Expected <null> to be <undefined>"));
        assert.throws(() => assertSame([ 1, 2 ], [ 1, 2 ]), new AssertionError("Expected <[ 1, 2 ]> to be same instance"));
        assert.throws(() => assertSame({}, {}), new AssertionError("Expected <{}> to be same instance"));
    });
    it("does throw when values are same", () => {
        const a = [ 1, 2 ];
        assert.doesNotThrow(() => assertSame(1, 1));
        assert.doesNotThrow(() => assertSame(a, a));
    });
    it("does throw with additional reason", () => {
        assert.throws(() => assertSame(1, 2, "Reason"), new AssertionError("Reason: Expected <1> to be <2>"));
    });
});
