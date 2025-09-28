import assert from "node:assert";
import { describe, it } from "node:test";
import { equals } from "../main/utils.ts";

describe("utils", () => {
    describe("equals", () => {
        it("returns true for recursively equal objects", () => {
            let a: Record<string, unknown> = { a: 1 };
            a.b = a;
            let b: Record<string, unknown> = { a: 1 };
            b.b = b;
            assert.equal(equals(a, b), true);
            assert.equal(equals(b, a), true);
        });
        it("returns false for recursively unequal objects", () => {
            let a: Record<string, unknown> = { a: 1, c: 3 };
            a.b = a;
            let b: Record<string, unknown> = { a: 1, c: 2 };
            b.b = b;
            assert.equal(equals(a, b), false);
            assert.equal(equals(b, a), false);
        });
        it("returns false if number of named properties is different", () => {
            let a = { a: 1, b: 2, c: 3 };
            let b = { a: 1, c: 3 };
            assert.equal(equals(a, b), false);
            assert.equal(equals(b, a), false);
        });
        it("returns false if number of symbol properties is different", () => {
            const symA = Symbol();
            const symB = Symbol();
            const symC = Symbol();
            let a = { [symA]: 1, [symB]: 2, [symC]: 3 };
            let b = { [symA]: 1, [symC]: 3 };
            assert.equal(equals(a, b), false);
            assert.equal(equals(b, a), false);
        });
        it("returns false if symbol properties have different values", () => {
            const symA = Symbol();
            let a = { [symA]: 1 };
            let b = { [symA]: 2 };
            assert.equal(equals(a, b), false);
            assert.equal(equals(b, a), false);
        });
        it("returns true if symbol properties have equal values", () => {
            const symA = Symbol();
            let a = { [symA]: 1 };
            let b = { [symA]: 1 };
            assert.equal(equals(a, b), true);
            assert.equal(equals(b, a), true);
        });
    });
});
