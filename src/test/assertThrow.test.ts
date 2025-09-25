import assert from "node:assert";
import { describe, it } from "node:test";

import { AssertionError } from "../main/AssertionError.ts";
import { assertThrow } from "../main/assertThrow.ts";

describe("assertThrow", () => {
    it("does not throw when synchronous function throws something", () => {
        assert.doesNotThrow(() => assertThrow(() => { throw new Error("4"); }));
    });
    it("does not throw when synchronous function throws expected error", () => {
        assert.doesNotThrow(() => assertThrow(() => { throw new Error("1"); }, new Error("1")));
    });
    it("does not throw when asynchronous function throws something", async () => {
        await assert.doesNotReject(() => assertThrow(async () => { throw new Error("3"); }));
    });
    it("does not throw when asynchronous function throws expected error", async () => {
        await assert.doesNotReject(() => assertThrow(async () => { throw new Error("2") }, new Error("2")));
    });
    it("does throw when synchronous function throws nothing", () => {
        assert.throws(() => assertThrow(() => {}), new AssertionError("Expected function to throw"));
        assert.throws(() => assertThrow(() => {}, new Error("3")), new AssertionError("Expected function to throw <Error(Error: 3)>"));
    });
    it("does throw when synchronous function does not throw expected error", () => {
        assert.throws(() => assertThrow(() => { throw new Error("2"); }, new Error("1")),
            new AssertionError("Expected function to throw <Error(Error: 1)> but caught <Error(Error: 2)>"));
    });
    it("does throw when asynchronous function throws nothing", async () => {
        await assert.rejects(() => assertThrow(async () => {}), new AssertionError("Expected function to throw"));
        await assert.rejects(() => assertThrow(async () => {}, new Error("3")), new AssertionError("Expected function to throw <Error(Error: 3)>"));
    });
    it("does throw when asynchronous function does not throw expected error", async () => {
        await assert.rejects(() => assertThrow(async () => { throw new Error("1") }, new Error("2")),
            new AssertionError("Expected function to throw <Error(Error: 2)> but caught <Error(Error: 1)>"));
    });
    it("does throw with additional reason", () => {
        assert.throws(() => assertThrow(() => {}, undefined, "Reason"), new AssertionError("Reason: Expected function to throw"));
        assert.throws(() => assertThrow(() => { throw new Error("1"); }, new Error("2"), "Reason"),
            new AssertionError("Reason: Expected function to throw <Error(Error: 2)> but caught <Error(Error: 1)>"));
    });
});
