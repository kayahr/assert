import assert from "node:assert";
import { describe, it } from "node:test";

import { AssertionError } from "../main/AssertionError.ts";
import { assertNotThrow } from "../main/assertNotThrow.ts";

describe("assertNotThrow", () => {
    it("does throw when synchronous function throws something", () => {
        assert.throws(() => assertNotThrow(() => { throw new Error("4"); }), new AssertionError("Expected function not to throw but caught <Error(Error: 4)>"));
    });
    it("does throw when synchronous function throws expected error", () => {
        assert.throws(() => assertNotThrow(() => { throw new Error("1"); }, new Error("1")),
            new AssertionError("Expected function not to throw <Error(Error: 1)>"));
    });
    it("does throw when asynchronous function throws something", async () => {
        await assert.rejects(() => assertNotThrow(async () => { throw new Error("3"); }),
            new AssertionError("Expected function not to throw but caught <Error(Error: 3)>"));
    });
    it("does throw when asynchronous function throws expected error", async () => {
        await assert.rejects(() => assertNotThrow(async () => { throw new Error("2"); }, new Error("2")),
            new AssertionError("Expected function not to throw <Error(Error: 2)>"));
    });
    it("does not throw when synchronous function throws nothing", () => {
        assert.doesNotThrow(() => assertNotThrow(() => {}));
        assert.doesNotThrow(() => assertNotThrow(() => {}, new Error("3")));
    });
    it("does not throw when synchronous function does not throw expected error", () => {
        assert.doesNotThrow(() => assertNotThrow(() => { throw new Error("2"); }, new Error("1")));
    });
    it("does not throw when asynchronous function throws nothing", async () => {
        await assert.doesNotReject(() => assertNotThrow(async () => {}));
        await assert.doesNotReject(() => assertNotThrow(async () => {}, new Error("3")));
    });
    it("does not throw when asynchronous function does not throw expected error", async () => {
        await assert.doesNotReject(() => assertNotThrow(async () => { throw new Error("1"); }, new Error("2")));
    });
    it("does throw with additional reason", () => {
        assert.throws(() => assertNotThrow(() => { throw new Error("error"); }, undefined, "Reason"),
            new AssertionError("Reason: Expected function not to throw but caught <Error(Error: error)>"));
        assert.throws(() => assertNotThrow(() => { throw new Error("1"); }, new Error("1"), "Reason"),
            new AssertionError("Reason: Expected function not to throw <Error(Error: 1)>"));
    });
});
