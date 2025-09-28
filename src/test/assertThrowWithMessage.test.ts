/*
 * Copyright (c) 2025 Klaus Reimer
 * SPDX-License-Identifier: MIT
 */

import assert from "node:assert";
import { describe, it } from "node:test";

import { AssertionError } from "../main/AssertionError.ts";
import { assertThrowWithMessage } from "../main/assertThrowWithMessage.ts";

describe("assertThrowWithMessage", () => {
    it("does not throw when synchronous function throws the expected error", () => {
        assert.doesNotThrow(() => assertThrowWithMessage(() => { throw "test"; }, String, "test"));
        assert.doesNotThrow(() => assertThrowWithMessage(() => { throw 123; }, Number, "123"));
        assert.doesNotThrow(() => assertThrowWithMessage(() => { throw new Error("4"); }, Error, "4"));
        assert.doesNotThrow(() => assertThrowWithMessage(() => { throw new SyntaxError("Error Message"); }, SyntaxError, /^Err/));
    });
    it("does not throw when asynchronous function throws the expected error", async () => {
        await assert.doesNotReject(() => assertThrowWithMessage(async () => { throw "test"; }, String, "test"));
        await assert.doesNotReject(() => assertThrowWithMessage(async () => { throw 123; }, Number, "123"));
        await assert.doesNotReject(() => assertThrowWithMessage(async () => { throw new Error("4"); }, Error, "4"));
        await assert.doesNotReject(() => assertThrowWithMessage(async () => { throw new SyntaxError("Error Message"); }, SyntaxError, /^Err/));
    });
    it("throws when synchronous function throws null", () => {
        assert.throws(() => assertThrowWithMessage(() => { throw null }, SyntaxError, "Test"),
            new AssertionError('Expected function to throw error of type <SyntaxError> but caught <null>'));
    });
    it("throws when asynchronous function throws null", async () => {
        await assert.rejects(() => assertThrowWithMessage(async () => { throw null }, SyntaxError, "Test"),
            new AssertionError('Expected function to throw error of type <SyntaxError> but caught <null>'));
    });
    it("does throw when synchronous function throws nothing", () => {
        assert.throws(() => assertThrowWithMessage(() => {}, SyntaxError, "Test"),
            new AssertionError('Expected function to throw error of type <SyntaxError> with message <"Test">'));
        assert.throws(() => assertThrowWithMessage(() => {}, SyntaxError, /Test/),
            new AssertionError('Expected function to throw error of type <SyntaxError> with message <RegExp(/Test/)>'));
    });
    it("does throw when asynchronous function throws nothing", async () => {
        await assert.rejects(() => assertThrowWithMessage(async () => {}, SyntaxError, "Test"),
            new AssertionError('Expected function to throw error of type <SyntaxError> with message <"Test">'));
        await assert.rejects(() => assertThrowWithMessage(async () => {}, SyntaxError, /Test/),
            new AssertionError('Expected function to throw error of type <SyntaxError> with message <RegExp(/Test/)>'));
    });
    it("does throw when synchronous function does throw error with wrong type", () => {
        assert.throws(() => assertThrowWithMessage(() => { throw new SyntaxError("Test"); }, Error, "Test"),
            new AssertionError('Expected function to throw error of type <Error> but caught <SyntaxError>'));
        assert.throws(() => assertThrowWithMessage(() => { throw new SyntaxError("Test"); }, Error, /Test/),
            new AssertionError('Expected function to throw error of type <Error> but caught <SyntaxError>'));
    });
    it("does throw when asynchronous function does throw error with wrong type", async () => {
        await assert.rejects(() => assertThrowWithMessage(async () => { throw new SyntaxError("Test"); }, Error, "Test"),
            new AssertionError('Expected function to throw error of type <Error> but caught <SyntaxError>'));
        await assert.rejects(() => assertThrowWithMessage(async () => { throw new SyntaxError("Test"); }, Error, /Test/),
            new AssertionError('Expected function to throw error of type <Error> but caught <SyntaxError>'));
    });
    it("does throw when synchronous function does throw error with wrong message", () => {
        assert.throws(() => assertThrowWithMessage(() => { throw new SyntaxError("Test"); }, SyntaxError, "Foo"),
            new AssertionError('Expected function to throw error with message <"Foo"> but caught <"Test">'));
        assert.throws(() => assertThrowWithMessage(() => { throw new SyntaxError("Test"); }, SyntaxError, /Foo/),
            new AssertionError('Expected function to throw error with message matching <RegExp(/Foo/)> but caught <"Test">'));
    });
    it("does throw when asynchronous function does throw error with wrong message", async () => {
        await assert.rejects(() => assertThrowWithMessage(async () => { throw new SyntaxError("Test"); }, SyntaxError, "Foo"),
            new AssertionError('Expected function to throw error with message <"Foo"> but caught <"Test">'));
        await assert.rejects(() => assertThrowWithMessage(async () => { throw new SyntaxError("Test"); }, SyntaxError, /Foo/),
            new AssertionError('Expected function to throw error with message matching <RegExp(/Foo/)> but caught <"Test">'));
    });
    it("does throw with additional reason", () => {
        assert.throws(() => assertThrowWithMessage(() => {}, Error, "Test", "Reason"),
            new AssertionError('Reason: Expected function to throw error of type <Error> with message <"Test">'));
        assert.throws(() => assertThrowWithMessage(() => {}, Error, /Test/, "Reason"),
            new AssertionError('Reason: Expected function to throw error of type <Error> with message <RegExp(/Test/)>'));
    });
});
