import assert from "node:assert";
import { describe, it } from "node:test";

import { AssertionError } from "../main/AssertionError.js";
import { assertNotHasProperty } from "../main/assertNotHasProperty.js";

const b = Symbol.for("b");
const obj = {
    a: 1,
    [b]: false
};

describe("assertNotHasProperty", () => {
    it("does not throw when object does not have given property", () => {
        assert.doesNotThrow(() => assertNotHasProperty(obj, "c"));
        assert.doesNotThrow(() => assertNotHasProperty(obj, Symbol.for("d")));
    });
    it("does throw when object has given property", () => {
        assert.throws(() => assertNotHasProperty(obj, "a"), new AssertionError('Expected <{ a: 1, Symbol(b): false }> not to have property with name <"a">'));
        assert.throws(() => assertNotHasProperty(obj, b),
            new AssertionError("Expected <{ a: 1, Symbol(b): false }> not to have property with name <Symbol(b)>"));
    });
    it("does throw with additional reason", () => {
        assert.throws(() => assertNotHasProperty({ a: 1 }, "a", "Reason"),
            new AssertionError('Reason: Expected <{ a: 1 }> not to have property with name <"a">'));
    });
});
