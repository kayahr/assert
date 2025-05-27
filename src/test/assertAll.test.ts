import assert, { fail } from "node:assert";
import { describe, it, mock } from "node:test";

import { assertAll } from "../main/assertAll.js";
import { AssertionError } from "../main/AssertionError.js";

describe("assertAll", () => {
    it("executes all synchronous function evens when one fails", () => {
        const error = new Error("test");
        const func1 = mock.fn();
        const func2 = mock.fn(() => { throw error; });
        const func3 = mock.fn();
        assert.throws(() => assert(assertAll(func1, func2, func3) == null), error);
        assert(func1.mock.callCount() === 1);
        assert(func2.mock.callCount() === 1);
        assert(func3.mock.callCount() === 1);
    });
    it("executes all synchronous/asynchronous functions even when a synchronous one fails", async () => {
        const error = new Error("test");
        const func1 = mock.fn();
        const func2 = mock.fn(() => { throw error; });
        const func3 = mock.fn(() => Promise.resolve());
        await assert.rejects(() => assertAll(func1, func2, func3), error);
        assert(func1.mock.callCount() === 1);
        assert(func2.mock.callCount() === 1);
        assert(func3.mock.callCount() === 1);
    });
    it("executes all synchronous/asynchronous functions even when an asynchronous one fails", async () => {
        const error = new Error("test");
        const func1 = mock.fn();
        const func2 = mock.fn(() => Promise.reject(error));
        const func3 = mock.fn(() => Promise.resolve());
        await assert.rejects(() => assertAll(func1, func2, func3), error);
        assert(func1.mock.callCount() === 1);
        assert(func2.mock.callCount() === 1);
        assert(func3.mock.callCount() === 1);
    });
    it("groups multiple exceptions into one", async () => {
        const error1 = new Error("test1");
        const error2 = new Error("test2");
        const func1 = mock.fn();
        const func2 = mock.fn(() => Promise.reject(error1));
        const func3 = mock.fn(() => { throw error2; });
        const func4 = mock.fn();
        try {
            const promise = assertAll(func1, func2, func3, func4);
            assert(promise instanceof Promise);
            await promise;
            fail("Must throw exception");
        } catch (e) {
            assert(e instanceof AssertionError);
            assert(e.message === "Multiple failures (2)");
            assert.deepStrictEqual(e.cause, [ error2, error1 ]);
        }
        assert(func1.mock.callCount() === 1);
        assert(func2.mock.callCount() === 1);
        assert(func3.mock.callCount() === 1);
        assert(func4.mock.callCount() === 1);
    });
});
