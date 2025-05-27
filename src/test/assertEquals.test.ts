import assert from "node:assert";
import { describe, it } from "node:test";

import { assertEquals } from "../main/assertEquals.js";
import { AssertionError } from "../main/AssertionError.js";
import { toString } from "../main/utils.js";

class A { public constructor(public value: number) {} }
class B { public constructor(public value: number) {} }

const values = [ null, 0, 1, -1, Infinity, -Infinity, "", "a", true, false, new Date(), new A(1), new B(1), new A(2) ];

describe("assertEquals", () => {
    it("does not throw when value is equal", () => {
        for (const value of values) {
            assert.doesNotThrow(() => assertEquals(value, value));
        }
        assert.doesNotThrow(() => assertEquals(values, [ ...values ]));
        assert.doesNotThrow(() => assertEquals({ ...values }, { ...values }));
    });
    it("does throw when values are not equal", () => {
        for (const value of values) {
            for (const otherValue of values) {
                if (otherValue === value) {
                    continue;
                }
                assert.throws(() => assertEquals(value, otherValue), new AssertionError(`Expected <${toString(value)}> to equal <${toString(otherValue)}>`));
            }
        }
    });
    it("does throw with additional reason", () => {
        assert.throws(() => assertEquals(1, 2, "Reason"), new AssertionError("Reason: Expected <1> to equal <2>"));
    });
    it("infers actual type to be equal to expected type", () => {
        const expected = "test" as string;
        const actual = "test" as string | number;
        assertEquals(actual, expected);
        ((v: string) => v)(actual); // Compile fails if type is inferred incorrectly
    });
    it("does not throw when actual value has equals methods which returns true", () => {
        class A {
            public constructor(public value: number) {}
            public equals(other: A): boolean {
                return this.equals === other.equals && this.value === other.value;
            }
        }
        class B extends A {}
        assert.doesNotThrow(() => assertEquals(new A(20), new B(20)));
    });
    it("does throw when actual value has equals method which returns false", () => {
        class A {
            public constructor(public value: number) {}
            public equals(other: A): boolean {
                return this.equals === other.equals && this.value === other.value;
            }
        }
        class B extends A {
            public override equals(other: A): boolean {
                return this.equals === other.equals && this.value === other.value;
            }
        }
        assert.throws(() => assertEquals(new A(20), new B(20)), new AssertionError("Expected <A({ value: 20 })> to equal <B({ value: 20 })>"));
    });
});
