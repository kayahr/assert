import assert from "node:assert";
import { describe, it } from "node:test";

import { AssertionError } from "../main/AssertionError.js";
import { assertMatch } from "../main/assertMatch.js";

describe("assertMatch", () => {
    it("does not throw when value matches regexp", () => {
        assert.doesNotThrow(() => assertMatch("test", /e.t/));
        assert.doesNotThrow(() => assertMatch("test", "e.t"));
    });
    it("does throw when value does not match regexp", () => {
        assert.throws(() => assertMatch("test", /t...t/), new AssertionError('Expected <"test"> to match <RegExp(/t...t/)>'));
        assert.throws(() => assertMatch("test", "t...t"), new AssertionError('Expected <"test"> to match <"t...t">'));
    });
    it("does throw with additional reason", () => {
        assert.throws(() => assertMatch("test", /t...t/, "Reason"), new AssertionError('Reason: Expected <"test"> to match <RegExp(/t...t/)>'));
    });
});
