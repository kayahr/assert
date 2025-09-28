/*
 * Copyright (c) 2024-2025 Klaus Reimer
 * SPDX-License-Identifier: MIT
 */

import assert from "node:assert";
import { describe, it } from "node:test";

import { assertDefined } from "../main/assertDefined.ts";
import { AssertionError } from "../main/AssertionError.ts";

describe("assertDefined", () => {
    it("does not throw when value is defined", () => {
        assert.doesNotThrow(() => assertDefined(null));
        assert.doesNotThrow(() => assertDefined(0));
        assert.doesNotThrow(() => assertDefined(1));
        assert.doesNotThrow(() => assertDefined(-1));
        assert.doesNotThrow(() => assertDefined(Infinity));
        assert.doesNotThrow(() => assertDefined(-Infinity));
        assert.doesNotThrow(() => assertDefined(""));
        assert.doesNotThrow(() => assertDefined("a"));
        assert.doesNotThrow(() => assertDefined(true));
        assert.doesNotThrow(() => assertDefined(false));
        assert.doesNotThrow(() => assertDefined(new Date()));
    });
    it("does throw when value is undefined", () => {
        assert.throws(() => assertDefined(undefined), new AssertionError("Expected <undefined> to be defined"));
    });
    it("does throw with additional reason", () => {
        assert.throws(() => assertDefined(undefined, "Reason"), new AssertionError("Reason: Expected <undefined> to be defined"));
    });
    it("infers type to be not undefined", () => {
        const value = "test" as string | undefined;
        assertDefined(value);
        assert(value.length === 4); // Compile fails if type is inferred incorrectly
    });
});
