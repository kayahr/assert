/*
 * Copyright (c) 2024-2025 Klaus Reimer
 * SPDX-License-Identifier: MIT
 */

import { describe, it } from "node:test";
import { AssertionError } from "../main/AssertionError.ts";
import assert from "node:assert";

describe("AssertionError", () => {
    it("sets actual property if passed to constructor", () => {
        const error = new AssertionError("Test", { actual: "foo" });
        assert.equal(error.actual, "foo");
    });
    it("sets expected property if passed to constructor", () => {
        const error = new AssertionError("Test", { expected: "foo" });
        assert.equal(error.expected, "foo");
    });
    it("deletes actual property if not passed to constructor", () => {
        const error = new AssertionError("Test", { expected: "foo" });
        assert(!Object.hasOwn(error, "actual"));
    });
    it("deletes expected property if not passed to constructor", () => {
        const error = new AssertionError("Test", { actual: "foo" });
        assert(!Object.hasOwn(error, "expected"));
    });
});
