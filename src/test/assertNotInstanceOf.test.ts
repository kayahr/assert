import assert from "node:assert";
import { describe, it } from "node:test";

import { AssertionError } from "../main/AssertionError.ts";
import { assertNotInstanceOf } from "../main/assertNotInstanceOf.ts";

class ClassA { public a = 1; }
class ClassB { public b = 2; }
class ClassC extends ClassB {
    public c = 3;
}
class ClassD {
    public d = 1;
}

describe("assertNotInstanceOf", () => {
    it("does throw when value is instance of given class", () => {
        assert.doesNotThrow(() => assertNotInstanceOf({}, Array));
        assert.doesNotThrow(() => assertNotInstanceOf(new ClassA(), ClassB));
        assert.doesNotThrow(() => assertNotInstanceOf(new ClassB(), ClassC));
    });
    it("does not throw when value is not instance of given class", () => {
        assert.throws(() => assertNotInstanceOf([], Array), new AssertionError("Expected <[]> not to be an instance of <Array>"));
        assert.throws(() => assertNotInstanceOf([], Object), new AssertionError("Expected <[]> not to be an instance of <Object>"));
        assert.throws(() => assertNotInstanceOf({}, Object), new AssertionError("Expected <{}> not to be an instance of <Object>"));
        assert.throws(() => assertNotInstanceOf(new ClassA(), ClassA), new AssertionError("Expected <ClassA({ a: 1 })> not to be an instance of <ClassA>"));
        assert.throws(() => assertNotInstanceOf(new ClassB(), ClassB), new AssertionError("Expected <ClassB({ b: 2 })> not to be an instance of <ClassB>"));
        assert.throws(() => assertNotInstanceOf(new ClassC(), ClassC),
            new AssertionError("Expected <ClassC({ b: 2, c: 3 })> not to be an instance of <ClassC>"));
        assert.throws(() => assertNotInstanceOf(new ClassC(), ClassB),
            new AssertionError("Expected <ClassC({ b: 2, c: 3 })> not to be an instance of <ClassB>"));
    });
    it("does throw with additional reason", () => {
        assert.throws(() => assertNotInstanceOf([], Array, "Reason"), new AssertionError("Reason: Expected <[]> not to be an instance of <Array>"));
    });
    it("infers type not to be instance of given class", () => {
        const obj = new ClassD() as ClassD | Date;
        assertNotInstanceOf(obj, Date);
        ((v: ClassD) => v)(obj); // Compile fails when type is inferred incorrectly
    });
});
