/*
 * Copyright (c) 2024-2025 Klaus Reimer
 * SPDX-License-Identifier: MIT
 */

import assert from "node:assert";
import { describe, it } from "node:test";

import { assertCloseTo } from "../main/assertCloseTo.ts";
import { AssertionError } from "../main/AssertionError.ts";
import { toString } from "../main/utils.ts";
import { assertInstanceOf } from "../main/assertInstanceOf.ts";

class A {
    public value: number;
    public constructor(value: number) {
        this.value = value;
    }
}

class B {
    public value: number;
    public constructor(value: number) {
        this.value = value;
    }
}

const values = [ null, 0, 1, -1, Infinity, -Infinity, "", "a", true, false, new Date(), new A(1), new B(1), new A(2) ];

describe("assertCloseTo", () => {
    it("does not throw when value is equal", () => {
        for (const value of values) {
            assert.doesNotThrow(() => assertCloseTo(value, value));
        }
        assert.doesNotThrow(() => assertCloseTo(values, [ ...values ]));
        assert.doesNotThrow(() => assertCloseTo({ ...values }, { ...values }));
    });
    it("does not throw when value is close enough", () => {
        assert.doesNotThrow(() => assertCloseTo(1.231, 1.232));
        assert.doesNotThrow(() => assertCloseTo(1.2341, 1.2343, 3));
        assert.doesNotThrow(() => assertCloseTo([ 1.231 ], [ 1.232 ]));
        assert.doesNotThrow(() => assertCloseTo([ 1.2341 ], [ 1.2343 ], 3));
        assert.doesNotThrow(() => assertCloseTo({ a: 1.231 }, { a: 1.232 }));
        assert.doesNotThrow(() => assertCloseTo({ a: 1.2341 }, { a: 1.2343 }, 3));
    });
    it("does throw when values are not equal", () => {
        for (const value of values) {
            for (const otherValue of values) {
                if (otherValue === value) {
                    continue;
                }
                assert.throws(() => assertCloseTo(value, otherValue),
                    new AssertionError(`Expected <${toString(value)}> to be close to <${toString(otherValue)}> (precision: 2 decimals)`));
            }
        }
    });
    it("does throw when value is not close enough", () => {
        assert.throws(() => assertCloseTo(1.231, 1.232, 3), new AssertionError("Expected <1.231> to be close to <1.232> (precision: 3 decimals)"));
        assert.throws(() => assertCloseTo(1.2341, 1.2343, 4), new AssertionError("Expected <1.2341> to be close to <1.2343> (precision: 4 decimals)"));
        assert.throws(() => assertCloseTo([ 1.231 ], [ 1.232 ], 3),
            new AssertionError("Expected <[ 1.231 ]> to be close to <[ 1.232 ]> (precision: 3 decimals)"));
        assert.throws(() => assertCloseTo([ 1.2341 ], [ 1.2343 ], 4),
            new AssertionError("Expected <[ 1.2341 ]> to be close to <[ 1.2343 ]> (precision: 4 decimals)"));
        assert.throws(() => assertCloseTo({ a: 1.231 }, { a: 1.232 }, 3),
            new AssertionError("Expected <{ a: 1.231 }> to be close to <{ a: 1.232 }> (precision: 3 decimals)"));
        assert.throws(() => assertCloseTo({ a: 1.2341 }, { a: 1.2343 }, 4),
            new AssertionError("Expected <{ a: 1.2341 }> to be close to <{ a: 1.2343 }> (precision: 4 decimals)"));
    });
    it("does throw with additional reason", () => {
        assert.throws(() => assertCloseTo(1, 2, 3, "Reason"), new AssertionError("Reason: Expected <1> to be close to <2> (precision: 3 decimals)"));
    });
    it("infers actual type to be equal to expected type", () => {
        const expected = "test" as string;
        const actual = "test" as string | number;
        assertCloseTo(actual, expected);
        ((v: string) => v)(actual); // Compile fails if type is inferred incorrectly
    });
    it("does not throw when actual value has equals methods which returns true", () => {
        class A {
            public value: number;
            public constructor(value: number) {
                this.value = value;
            }
            public equals(other: A): boolean {
                return this.equals === other.equals && this.value === other.value;
            }
        }
        class B extends A {}
        assert.doesNotThrow(() => assertCloseTo(new A(20), new B(20)));
    });
    it("does throw when actual value has equals method which returns false", () => {
        class A {
            public value: number;
            public constructor(value: number) {
                this.value = value;
            }
            public equals(other: A): boolean {
                return this.value === other.value && this.equals === other.equals;
            }
        }
        class B extends A {
            public override equals(other: A): boolean {
                return this.value === other.value && this.equals === other.equals;
            }
        }
        assert.throws(() => assertCloseTo(new A(20), new B(20)),
            new AssertionError("Expected <A({ value: 20 })> to be close to <B({ value: 20 })> (precision: 2 decimals)"));
        assert.throws(() => assertCloseTo(new B(20), new A(20)),
            new AssertionError("Expected <B({ value: 20 })> to be close to <A({ value: 20 })> (precision: 2 decimals)"));
    });
    it("does set actual and expected properties on error", () => {
        try {
            assertCloseTo(1.123, 1.134);
            throw new Error("Expected failure");
        } catch (error) {
            assertInstanceOf(error, AssertionError);
            assert.equal(error.actual, 1.123);
            assert.equal(error.expected, 1.134);
        }
    });
});
