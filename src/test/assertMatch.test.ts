import assert from "node:assert";
import { describe, it } from "node:test";

import { AssertionError } from "../main/AssertionError.ts";
import { assertMatch } from "../main/assertMatch.ts";
import { assertInstanceOf } from "../main/assertInstanceOf.ts";

describe("assertMatch", () => {
    it("does not throw when value matches regexp", () => {
        assertMatch("test", /e.t/);
        assertMatch("test", "e.t");
    });
    it("does throw when value does not match regexp", () => {
        assert.throws(() => assertMatch("test", /t...t/), new AssertionError('Expected <"test"> to match <RegExp(/t...t/)>'));
        assert.throws(() => assertMatch("test", "t...t"), new AssertionError('Expected <"test"> to match <"t...t">'));
    });
    it("does throw with additional reason", () => {
        assert.throws(() => assertMatch("test", /t...t/, "Reason"), new AssertionError('Reason: Expected <"test"> to match <RegExp(/t...t/)>'));
    });
    it("does set actual and expected properties on error", () => {
        const expected = /foo/;
        try {
            assertMatch("bar", expected);
            throw new Error("Expected failure");
        } catch (error) {
            assertInstanceOf(error, AssertionError);
            assert.equal(error.actual, "bar");
            assert.equal(error.expected, expected);

        }
    });
});
