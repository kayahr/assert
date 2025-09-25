/*
 * Copyright (c) 2024 Klaus Reimer, k@ailis.de
 * See LICENSE.md for licensing information.
 */

import { AssertionError } from "./AssertionError.ts";
import { toString } from "./utils.ts";

/**
 * Asserts that given object has a property with the given name.
 *
 * @param value        - The object to check.
 * @param propertyName - The property name to look for.
 * @param reason       - Optional reason added to exception message when assertion fails.
 * @throws {@link AssertionError} when object does not have given property.
 */
export function assertHasProperty<T extends object, K extends string | symbol>(
        value: T, propertyName: K, reason?: string): asserts value is T & Record<K, unknown> {
    if (!(propertyName in value)) {
        throw new AssertionError(`Expected <${toString(value)}> to have property with name <${toString(propertyName)}>`, { reason });
    }
}
