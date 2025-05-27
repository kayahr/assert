import assert from "node:assert";
import { describe, it } from "node:test";

import { AssertionError } from "../main/AssertionError.js";
import { assertNotEquals } from "../main/assertNotEquals.js";
import { toString } from "../main/utils.js";

class A { public constructor(public value: number) {} }
class B { public constructor(public value: number) {} }

const values = [ null, 0, 1, -1, Infinity, -Infinity, "", "a", true, false, new Date(), new A(1), new B(1), new A(2) ];

describe("assertNotEquals", () => {
    it("does not throw when value is not equal", () => {
        for (const value of values) {
            for (const otherValue of values) {
                if (otherValue === value) {
                    continue;
                }
                assert.doesNotThrow(() => assertNotEquals(value, otherValue));
            }
        }
    });
    it("does throw when values are equal", () => {
        for (const value of values) {
            assert.throws(() => assertNotEquals(value, value), new AssertionError(`Expected <${toString(value)}> not to equal <${toString(value)}>`));
        }
        assert.throws(() => assertNotEquals(values, [ ...values ]), new AssertionError(`Expected <${toString(values)}> not to equal <${toString(values)}>`));
        assert.throws(() => assertNotEquals({ ...values }, { ...values }),
            new AssertionError(`Expected <${toString({ ...values })}> not to equal <${toString({ ...values })}>`));
    });
    it("does throw with additional reason", () => {
        assert.throws(() => assertNotEquals(1, 1, "Reason"), new AssertionError("Reason: Expected <1> not to equal <1>"));
    });
    it("infers actual type to be equal to expected type", () => {
        const expected = 20;
        const actual = "test" as string | number;
        assertNotEquals(actual, expected);
        ((v: string) => v)(actual); // Compile fails if type is inferred incorrectly
    });
    it("does not throw when actual value has equals methods which returns false", () => {
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
        assert.doesNotThrow(() => assertNotEquals(new A(20), new B(20)));
    });
    it("does throw when actual value has equals method which returns true", () => {
        class A {
            public constructor(public value: number) {}
            public equals(other: A): boolean {
                return this.equals === other.equals && this.value === other.value;
            }
        }
        class B extends A {}
        assert.throws(() => assertNotEquals(new A(20), new B(20)), new AssertionError("Expected <A({ value: 20 })> not to equal <B({ value: 20 })>"));
    });
});
