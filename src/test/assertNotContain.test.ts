import assert from "node:assert";
import { describe, it } from "node:test";

import { AssertionError } from "../main/AssertionError.js";
import { assertNotContain } from "../main/assertNotContain.js";

describe("assertNotContain", () => {
    it("does not throw when string contains sub string", () => {
        assert.doesNotThrow(() => assertNotContain("foo", "bar"));
    });
    it("does not throw when array contains item", () => {
        assert.doesNotThrow(() => assertNotContain([ "foo" ], "bar"));
    });
    it("does throw when string does not contain sub string", () => {
        assert.throws(() => assertNotContain("Test", "Test"), new AssertionError('Expected <"Test"> not to contain <"Test">'));
        assert.throws(() => assertNotContain("Test", ""), new AssertionError('Expected <"Test"> not to contain <"">'));
        assert.throws(() => assertNotContain("Test", "Te"), new AssertionError('Expected <"Test"> not to contain <"Te">'));
        assert.throws(() => assertNotContain("Test", "st"), new AssertionError('Expected <"Test"> not to contain <"st">'));
        assert.throws(() => assertNotContain("Test", "es"), new AssertionError('Expected <"Test"> not to contain <"es">'));
    });
    it("does throw when array does not contain item", () => {
        assert.throws(() => assertNotContain([ 1 ], 1), new AssertionError("Expected <[ 1 ]> not to contain <1>"));
        assert.throws(() => assertNotContain([ 1, "test", true ], "test"), new AssertionError('Expected <[ 1, "test", true ]> not to contain <"test">'));
        assert.throws(() => assertNotContain([ 1, "test", true ], true), new AssertionError('Expected <[ 1, "test", true ]> not to contain <true>'));
    });
    it("does throw with additional reason", () => {
        assert.throws(() => assertNotContain("", "", "Reason"), new AssertionError('Reason: Expected <""> not to contain <"">'));
    });
});
