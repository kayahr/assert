import assert from "node:assert";
import { describe, it } from "node:test";

import { AssertionError } from "../main/AssertionError.ts";
import { assertNotNull } from "../main/assertNotNull.ts";

describe("assertNotNull", () => {
    it("does not throw when value is not null", () => {
        assert.doesNotThrow(() => assertNotNull(true));
        assert.doesNotThrow(() => assertNotNull(NaN));
        assert.doesNotThrow(() => assertNotNull(undefined));
        assert.doesNotThrow(() => assertNotNull(0));
        assert.doesNotThrow(() => assertNotNull(""));
        assert.doesNotThrow(() => assertNotNull(1));
        assert.doesNotThrow(() => assertNotNull("foo"));
        assert.doesNotThrow(() => assertNotNull([ 1, 2 ]));
        assert.doesNotThrow(() => assertNotNull({ a: 1 }));
        assert.doesNotThrow(() => assertNotNull(new Uint8Array([ 1, 2 ])));
    });
    it("does throw when value is null", () => {
        assert.throws(() => assertNotNull(null), new AssertionError("Expected <null> not to be null"));
    });
    it("does throw with additional reason", () => {
        assert.throws(() => assertNotNull(null, "Reason"), new AssertionError("Reason: Expected <null> not to be null"));
    });
    it("infers value to be not null", () => {
        const value = 10 as number | null;
        assertNotNull(value);
        ((v: number) => v)(value); // Compile fails when type is inferred incorrectly
    });
});
