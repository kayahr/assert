import assert from "node:assert";
import { describe, it } from "node:test";

import { AssertionError } from "../main/AssertionError.js";
import { assertNotSame } from "../main/assertNotSame.js";

describe("assertNotSame", () => {
    it("does not throw when values are not same", () => {
        assert.doesNotThrow(() => assertNotSame(1, 2));
        assert.doesNotThrow(() => assertNotSame(new Date(0), new Date(1)));
        assert.doesNotThrow(() => assertNotSame(null, undefined));
        assert.doesNotThrow(() => assertNotSame([ 1, 2 ], [ 1, 2 ]));
        assert.doesNotThrow(() => assertNotSame({}, {}));
    });
    it("does throw when values are same", () => {
        const a = [ 1, 2 ];
        assert.throws(() => assertNotSame(1, 1), new AssertionError("Expected <1> not to be <1>"));
        assert.throws(() => assertNotSame(a, a), new AssertionError("Expected <[ 1, 2 ]> not to be same instance"));
    });
    it("does throw with additional reason", () => {
        assert.throws(() => assertNotSame(1, 1, "Reason"), new AssertionError("Reason: Expected <1> not to be <1>"));
    });
});
