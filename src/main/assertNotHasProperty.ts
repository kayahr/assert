/*
 * Copyright (c) 2024 Klaus Reimer, k@ailis.de
 * See LICENSE.md for licensing information.
 */

import { AssertionError } from "./AssertionError.ts";
import { toString } from "./utils.ts";

/**
 * Asserts that given object does not have a property with the given name.
 *
 * @param value        - The object to check.
 * @param propertyName - The property name to look for.
 * @param reason       - Optional reason added to exception message when assertion fails.
 * @throws {@link AssertionError} when object has given property.
 */
export function assertNotHasProperty(value: object, propertyName: string | symbol, reason?: string): void {
    if (propertyName in value) {
        throw new AssertionError(`Expected <${toString(value)}> not to have property with name <${toString(propertyName)}>`, { reason });
    }
}
