import assert from "node:assert";
import { describe, it } from "node:test";

import { AssertionError } from "../main/AssertionError.js";
import { assertNotNullish } from "../main/assertNotNullish.js";

describe("assertNotNullish", () => {
    it("does not throw when value is not null and not undefined", () => {
        assert.doesNotThrow(() => assertNotNullish(true));
        assert.doesNotThrow(() => assertNotNullish(NaN));
        assert.doesNotThrow(() => assertNotNullish(0));
        assert.doesNotThrow(() => assertNotNullish(""));
        assert.doesNotThrow(() => assertNotNullish(1));
        assert.doesNotThrow(() => assertNotNullish("foo"));
        assert.doesNotThrow(() => assertNotNullish([ 1, 2 ]));
        assert.doesNotThrow(() => assertNotNullish({ a: 1 }));
        assert.doesNotThrow(() => assertNotNullish(new Uint8Array([ 1, 2 ])));
    });
    it("does throw when value is null or undefined", () => {
        assert.throws(() => assertNotNullish(null), new AssertionError("Expected <null> not to be null or undefined"));
        assert.throws(() => assertNotNullish(undefined), new AssertionError("Expected <undefined> not to be null or undefined"));
    });
    it("does throw with additional reason", () => {
        assert.throws(() => assertNotNullish(null, "Reason"), new AssertionError("Reason: Expected <null> not to be null or undefined"));
    });
    it("infers value to be not null", () => {
        const value = 10 as number | null | undefined;
        assertNotNullish(value);
        ((v: number) => v)(value); // Compile fails when type is inferred incorrectly
    });
});
