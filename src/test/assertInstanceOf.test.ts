/*
 * Copyright (c) 2024-2025 Klaus Reimer
 * SPDX-License-Identifier: MIT
 */

import assert from "node:assert";
import { describe, it } from "node:test";

import { assertInstanceOf } from "../main/assertInstanceOf.ts";
import { AssertionError } from "../main/AssertionError.ts";

class ClassA { public a = 1; }
class ClassB { public b = 2; }
class ClassC extends ClassB {
    public c = 3;
}

describe("assertInstanceOf", () => {
    it("does not throw when value is instance of given class", () => {
        assert.doesNotThrow(() => assertInstanceOf(new Date(), Date));
        assert.doesNotThrow(() => assertInstanceOf(new Date(), Object));
        assert.doesNotThrow(() => assertInstanceOf([], Array));
        assert.doesNotThrow(() => assertInstanceOf([], Object));
        assert.doesNotThrow(() => assertInstanceOf({}, Object));
        assert.doesNotThrow(() => assertInstanceOf(new ClassA(), ClassA));
        assert.doesNotThrow(() => assertInstanceOf(new ClassB(), ClassB));
        assert.doesNotThrow(() => assertInstanceOf(new ClassC(), ClassC));
        assert.doesNotThrow(() => assertInstanceOf(new ClassC(), ClassB));
    });
    it("does throw when value is not instance of given class", () => {
        assert.throws(() => assertInstanceOf({}, Array), new AssertionError("Expected <{}> to be an instance of <Array>"));
        assert.throws(() => assertInstanceOf(new ClassA(), ClassB), new AssertionError("Expected <ClassA({ a: 1 })> to be an instance of <ClassB>"));
        assert.throws(() => assertInstanceOf(new ClassB(), ClassC), new AssertionError("Expected <ClassB({ b: 2 })> to be an instance of <ClassC>"));
    });
    it("does throw with additional reason", () => {
        assert.throws(() => assertInstanceOf({}, Array, "Reason"), new AssertionError("Reason: Expected <{}> to be an instance of <Array>"));
    });
    it("infers type to be instance of given class", () => {
        const obj = new Date() as object;
        assertInstanceOf(obj, Date);
        ((v: Date) => v)(obj); // Compile fails when type is inferred incorrectly
    });
});
