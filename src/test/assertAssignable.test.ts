/*
 * Copyright (c) 2026 Klaus Reimer
 * SPDX-License-Identifier: MIT
 */

import { describe, it } from "node:test";

import { assertAssignable } from "../main/assertAssignable.ts";

describe("assertAssignable", () => {
    it("accepts mutually assignable types", () => {
        assertAssignable<{ value: number }, { value: number }>();
    });
    it("rejects completely different types", () => {
        // @ts-expect-error The types are intentionally incompatible.
        assertAssignable<string, number>();
    });
    it("rejects an actual type which is missing a property", () => {
        // @ts-expect-error Actual is intentionally missing the name property.
        assertAssignable<{ id: number; name: string }, { id: number }>();
    });
    it("rejects an expected type which is missing a property", () => {
        // @ts-expect-error Expected is intentionally missing the name property.
        assertAssignable<{ id: number }, { id: number; name: string }>();
    });
});
