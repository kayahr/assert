import assert from "node:assert";
import { describe, it } from "node:test";

import { assertHasProperty } from "../main/assertHasProperty.js";
import { AssertionError } from "../main/AssertionError.js";

const b = Symbol.for("b");
const obj = {
    a: 1,
    [b]: false
};

describe("assertHasProperty", () => {
    it("does not throw when object has given property", () => {
        assert.doesNotThrow(() => assertHasProperty(obj, "a"));
        assert.doesNotThrow(() => assertHasProperty(obj, b));
    });
    it("does throw when object does not have given property", () => {
        assert.throws(() => assertHasProperty(obj, "c"), new AssertionError('Expected <{ a: 1, Symbol(b): false }> to have property with name <"c">'));
        assert.throws(() => assertHasProperty(obj, Symbol.for("d")),
            new AssertionError("Expected <{ a: 1, Symbol(b): false }> to have property with name <Symbol(d)>"));
    });
    it("does throw with additional reason", () => {
        assert.throws(() => assertHasProperty({}, "a", "Reason"), new AssertionError('Reason: Expected <{}> to have property with name <"a">'));
    });
    it("infers type to be object with given property", () => {
        const obj = { test: 1 } as object;
        assertHasProperty(obj, "test");
        ((v: unknown) => v)(obj.test); // Compile fails when type is inferred incorrectly
    });
});
