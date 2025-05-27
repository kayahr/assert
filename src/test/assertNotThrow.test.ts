import assert from "node:assert";
import { describe, it } from "node:test";

import { AssertionError } from "../main/AssertionError.js";
import { assertNotThrow } from "../main/assertNotThrow.js";

describe("assertNotThrow", () => {
    it("does throw when synchronous function throws something", () => {
        assert.throws(() => assertNotThrow(() => { throw new Error(); }), new AssertionError("Expected function not to throw but caught <Error(Error)>"));
    });
    it("does throw when synchronous function throws expected error", () => {
        assert.throws(() => assertNotThrow(() => { throw new Error("1"); }, new Error("1")),
            new AssertionError("Expected function not to throw <Error(Error: 1)>"));
    });
    it("does throw when asynchronous function throws something", async () => {
        await assert.rejects(() => assertNotThrow(() => Promise.reject(new Error())),
            new AssertionError("Expected function not to throw but caught <Error(Error)>"));
    });
    it("does throw when asynchronous function throws expected error", async () => {
        await assert.rejects(() => assertNotThrow(() => Promise.reject(new Error("2")), new Error("2")),
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
        await assert.doesNotReject(() => assertNotThrow(() => Promise.resolve()));
        await assert.doesNotReject(() => assertNotThrow(() => Promise.resolve(), new Error("3")));
    });
    it("does not throw when asynchronous function does not throw expected error", async () => {
        await assert.doesNotReject(() => assertNotThrow(() => Promise.reject(new Error("1")), new Error("2")));
    });
    it("does throw with additional reason", () => {
        assert.throws(() => assertNotThrow(() => { throw new Error(); }, undefined, "Reason"),
            new AssertionError("Reason: Expected function not to throw but caught <Error(Error)>"));
        assert.throws(() => assertNotThrow(() => { throw new Error("1"); }, new Error("1"), "Reason"),
            new AssertionError("Reason: Expected function not to throw <Error(Error: 1)>"));
    });
});
