/*
 * Copyright (c) 2024-2025 Klaus Reimer
 * SPDX-License-Identifier: MIT
 */

import assert from "node:assert";
import { describe, it } from "node:test";

import { AssertionError } from "../main/AssertionError.ts";
import { assertNotMatch } from "../main/assertNotMatch.ts";
import { assertInstanceOf } from "../main/assertInstanceOf.ts";

describe("assertNotMatch", () => {
    it("does not throw when value does not match regexp", () => {
        assert.doesNotThrow(() => assertNotMatch("test", /t...t/));
        assert.doesNotThrow(() => assertNotMatch("test", "t...t"));
    });
    it("does throw when value matches regexp", () => {
        assert.throws(() => assertNotMatch("test", /e.t/), new AssertionError('Expected <"test"> not to match <RegExp(/e.t/)>'));
        assert.throws(() => assertNotMatch("test", "e.t"), new AssertionError('Expected <"test"> not to match <"e.t">'));
    });
    it("does throw with additional reason", () => {
        assert.throws(() => assertNotMatch("test", "e.t", "Reason"), new AssertionError('Reason: Expected <"test"> not to match <"e.t">'));
    });
    it("does set actual and expected properties on error", () => {
        const expected = /foo/;
        try {
            assertNotMatch("foo", expected);
            throw new Error("Expected failure");
        } catch (error) {
            assertInstanceOf(error, AssertionError);
            assert.equal(error.actual, "foo");
            assert.equal(error.expected, expected);

        }
    });
});
