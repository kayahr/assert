/*
 * Copyright (c) 2024-2025 Klaus Reimer
 * SPDX-License-Identifier: MIT
 */

import assert from "node:assert";
import { describe, it } from "node:test";

import { assertAll } from "../main/assertAll.ts";
import { assertCloseTo } from "../main/assertCloseTo.ts";
import { assertContain } from "../main/assertContain.ts";
import { assertDefined } from "../main/assertDefined.ts";
import { assertEquals } from "../main/assertEquals.ts";
import { assertFalse } from "../main/assertFalse.ts";
import { assertFalsy } from "../main/assertFalsy.ts";
import { assertGreaterThan } from "../main/assertGreaterThan.ts";
import { assertGreaterThanOrEqual } from "../main/assertGreaterThanOrEqual.ts";
import { assertHasProperty } from "../main/assertHasProperty.ts";
import { assertInstanceOf } from "../main/assertInstanceOf.ts";
import { AssertionError, type AssertionErrorOptions } from "../main/AssertionError.ts";
import { assertLessThan } from "../main/assertLessThan.ts";
import { assertLessThanOrEqual } from "../main/assertLessThanOrEqual.ts";
import { assertMatch } from "../main/assertMatch.ts";
import { assertNaN } from "../main/assertNaN.ts";
import { assertNotContain } from "../main/assertNotContain.ts";
import { assertNotEquals } from "../main/assertNotEquals.ts";
import { assertNotHasProperty } from "../main/assertNotHasProperty.ts";
import { assertNotInstanceOf } from "../main/assertNotInstanceOf.ts";
import { assertNotMatch } from "../main/assertNotMatch.ts";
import { assertNotNaN } from "../main/assertNotNaN.ts";
import { assertNotNull } from "../main/assertNotNull.ts";
import { assertNotNullish } from "../main/assertNotNullish.ts";
import { assertNotSame } from "../main/assertNotSame.ts";
import { assertNotThrow } from "../main/assertNotThrow.ts";
import { assertNull } from "../main/assertNull.ts";
import { assertNullish } from "../main/assertNullish.ts";
import { assertSame } from "../main/assertSame.ts";
import { assertThrow } from "../main/assertThrow.ts";
import { assertThrowWithMessage } from "../main/assertThrowWithMessage.ts";
import { assertTimeout } from "../main/assertTimeout.ts";
import { assertTrue } from "../main/assertTrue.ts";
import { assertTruthy } from "../main/assertTruthy.ts";
import { assertUndefined } from "../main/assertUndefined.ts";
import * as exports from "../main/index.ts";

describe("index", () => {
    it("exports relevant types and functions and nothing more", () => {
        // Check exported classes and functions
        assert.deepStrictEqual({ ...exports }, {
            AssertionError,
            assertAll,
            assertCloseTo,
            assertContain,
            assertDefined,
            assertEquals,
            assertFalse,
            assertFalsy,
            assertGreaterThan,
            assertGreaterThanOrEqual,
            assertHasProperty,
            assertInstanceOf,
            assertLessThan,
            assertLessThanOrEqual,
            assertMatch,
            assertNaN,
            assertNotContain,
            assertNotEquals,
            assertNotHasProperty,
            assertNotInstanceOf,
            assertNotMatch,
            assertNotNaN,
            assertNotNull,
            assertNotNullish,
            assertNotSame,
            assertNotThrow,
            assertNull,
            assertNullish,
            assertSame,
            assertTimeout,
            assertThrow,
            assertThrowWithMessage,
            assertTrue,
            assertTruthy,
            assertUndefined
        });

        // Interfaces and types can only be checked by TypeScript
        ((): AssertionErrorOptions => (({} as exports.AssertionErrorOptions)))();
    });
});
