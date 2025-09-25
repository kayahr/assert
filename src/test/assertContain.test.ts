import assert from "node:assert";
import { describe, it } from "node:test";

import { assertContain } from "../main/assertContain.ts";
import { AssertionError } from "../main/AssertionError.ts";

describe("assertContain", () => {
    it("does not throw when string contains sub string", () => {
        assert.doesNotThrow(() => assertContain("Test", "Test"));
        assert.doesNotThrow(() => assertContain("Test", ""));
        assert.doesNotThrow(() => assertContain("Test", "Te"));
        assert.doesNotThrow(() => assertContain("Test", "st"));
        assert.doesNotThrow(() => assertContain("Test", "es"));
    });
    it("does not throw when array contains item", () => {
        const date = new Date();
        assert.doesNotThrow(() => assertContain([ 1 ], 1));
        assert.doesNotThrow(() => assertContain([ 1, "test", true ], "test"));
        assert.doesNotThrow(() => assertContain([ 1, "test", true ], true));
        assert.doesNotThrow(() => assertContain([ 1, "test", date, true ], date));
    });
    it("does throw when string does not contain sub string", () => {
        assert.throws(() => assertContain("foo", "bar"), new AssertionError('Expected <"foo"> to contain <"bar">'));
    });
    it("does throw when array does not contain item", () => {
        assert.throws(() => assertContain([ "foo" ], "bar"), new AssertionError('Expected <[ "foo" ]> to contain <"bar">'));
    });
    it("does throw with additional reason", () => {
        assert.throws(() => assertContain("foo", "bar", "Reason"), new AssertionError('Reason: Expected <"foo"> to contain <"bar">'));
    });
});
