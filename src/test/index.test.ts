import assert from "node:assert";
import { describe, it } from "node:test";

import { assertAll } from "../main/assertAll.js";
import { assertCloseTo } from "../main/assertCloseTo.js";
import { assertContain } from "../main/assertContain.js";
import { assertDefined } from "../main/assertDefined.js";
import { assertEquals } from "../main/assertEquals.js";
import { assertFalse } from "../main/assertFalse.js";
import { assertFalsy } from "../main/assertFalsy.js";
import { assertGreaterThan } from "../main/assertGreaterThan.js";
import { assertGreaterThanOrEqual } from "../main/assertGreaterThanOrEqual.js";
import { assertHasProperty } from "../main/assertHasProperty.js";
import { assertInstanceOf } from "../main/assertInstanceOf.js";
import { AssertionError } from "../main/AssertionError.js";
import { assertLessThan } from "../main/assertLessThan.js";
import { assertLessThanOrEqual } from "../main/assertLessThanOrEqual.js";
import { assertMatch } from "../main/assertMatch.js";
import { assertNaN } from "../main/assertNaN.js";
import { assertNotContain } from "../main/assertNotContain.js";
import { assertNotEquals } from "../main/assertNotEquals.js";
import { assertNotHasProperty } from "../main/assertNotHasProperty.js";
import { assertNotInstanceOf } from "../main/assertNotInstanceOf.js";
import { assertNotMatch } from "../main/assertNotMatch.js";
import { assertNotNaN } from "../main/assertNotNaN.js";
import { assertNotNull } from "../main/assertNotNull.js";
import { assertNotNullish } from "../main/assertNotNullish.js";
import { assertNotSame } from "../main/assertNotSame.js";
import { assertNotThrow } from "../main/assertNotThrow.js";
import { assertNull } from "../main/assertNull.js";
import { assertNullish } from "../main/assertNullish.js";
import { assertSame } from "../main/assertSame.js";
import { assertThrow } from "../main/assertThrow.js";
import { assertTimeout } from "../main/assertTimeout.js";
import { assertTrue } from "../main/assertTrue.js";
import { assertTruthy } from "../main/assertTruthy.js";
import { assertUndefined } from "../main/assertUndefined.js";
import * as asserts from "../main/index.js";

describe("index", () => {
    it("exports relevant types and functions and nothing more", () => {
        // Check exported classes and functions
        assert.deepStrictEqual({ ...asserts }, {
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
            assertTrue,
            assertTruthy,
            assertUndefined
        });
    });
});
