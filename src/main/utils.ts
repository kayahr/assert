/*
 * Copyright (c) 2024-2025 Klaus Reimer
 * SPDX-License-Identifier: MIT
 */

/**
 * Primitive types which can be compared with lesser/greater and so on.
 */
export type ComparablePrimitive = number | string | boolean | object | bigint;

/**
 * Class type which even works for classes with a private constructor.
 *
 * @param T - The class instance type.
 */
export interface Class<T = unknown> extends Function {
    /** The class prototype. */
    prototype: T;
}

function toStringRecursive(value: unknown, seen: Set<object>): string {
    const type = typeof value;
    if (type === "string") {
        return JSON.stringify(value);
    }
    if (type === "bigint") {
        return `${value}n`;
    }
    if (typeof value === "function" && value.name !== "") {
        return value.name;
    }
    if (value instanceof Object) {
        if (seen.has(value)) {
            return `<circular ref: ${value.constructor.name}>`;
        }
        seen.add(value);
        if (Array.isArray(value)) {
            const values = Object.values(value).map(value => toStringRecursive(value, seen));
            return values.length === 0 ? "[]" : `[ ${values.join(", ")} ]`;
        }
        let description: string;
        if (value.toString !== Object.prototype.toString) {
            description = String(value);
        } else {
            const keys = [ ...Object.getOwnPropertyNames(value), ...Object.getOwnPropertySymbols(value) ];
            const entries = keys.map(key => `${String(key)}: ${toStringRecursive((value as Record<string | symbol, unknown>)[key], seen)}`);
            description = entries.length === 0 ? "{}" : `{ ${entries.join(", ")} }`;
        }
        return value.constructor === Object ? description : `${value.constructor.name}(${description})`;
    }
    return String(value);
}

export function toString(value: unknown): string {
    return toStringRecursive(value, new Set<object>());
}

/*
 * Copyright (c) 2024-2025 Klaus Reimer
 * SPDX-License-Identifier: MIT
 */

interface Equatable {
    equals(other: unknown): boolean;
}

function isEquatable(v: unknown): v is Equatable {
    return v instanceof Object && typeof (v as Equatable).equals === "function";
}

export interface EqualsOptions {
    precision?: number;
    checkEquatable?: boolean;
}

export function deepEquals<T, S>(a: T, b: T | S, options: EqualsOptions, seen = new WeakMap<object, object>()):
        a is T & S {
    if (Object.is(a, b) || (a == null && b == null)) {
        // Values are the same (or both or null/undefined which is also considered equal)
        return true;
    }
    if (a == null || b == null) {
        return false;
    }

    // Check objects
    if (typeof a === "object") {
        if (typeof b === "object") {
            // Check if object combination has already been checked to prevent endless recursion loops when cyclic
            // references are encountered within objects or arrays. We assume the values are equal when already seen
            // because otherwise we would not be here
            if (seen.get(a) === b) {
                return true;
            }
            seen.set(a, b);
            seen.set(b, a);

            // Use equals if equatable
            if (options.checkEquatable !== false && isEquatable(a)) {
                return a.equals(b);
            }

            if (a.constructor !== b.constructor) {
                // Objects have different constructors
                return false;
            }

            // Check arrays
            if (Array.isArray(a)) {
                if (Array.isArray(b)) {
                    const len = a.length;
                    if (len !== b.length) {
                        // Both values are arrays but with different length
                        return false;
                    }
                    for (let i = 0; i < len; i++) {
                        if (!deepEquals(a[i], b[i], options, seen)) {
                            // Array entries are not equal
                            return false;
                        }
                    }
                    // Arrays are equal
                    return true;
                } else {
                    // a is an array but b is not
                    return false;
                }
            }

            // Compare string properties
            const propertyNamesOfA = Object.getOwnPropertyNames(a).filter(name => (a as Record<string, unknown>)[name] !== undefined);
            const propertyNamesOfB = Object.getOwnPropertyNames(b).filter(name => (b as Record<string, unknown>)[name] !== undefined);
            if (propertyNamesOfA.length !== propertyNamesOfB.length) {
                // Number of object properties do not match
                return false;
            }
            for (const key of propertyNamesOfA) {
                if (!propertyNamesOfB.includes(key) || !deepEquals((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key], options, seen)) {
                    // An object property does not match
                    return false;
                }
            }

            // Compare string properties
            const propertySymbolsOfA = Object.getOwnPropertySymbols(a);
            const propertySymbolsOfB = Object.getOwnPropertySymbols(b);
            if (propertySymbolsOfA.length !== propertySymbolsOfB.length) {
                // Number of object properties do not match
                return false;
            }
            for (const key of propertySymbolsOfA) {
                if (!propertySymbolsOfB.includes(key) || !equals((a as Record<symbol, unknown>)[key], (b as Record<symbol, unknown>)[key], options)) {
                    // An object property does not match
                    return false;
                }
            }

            // Both values are objects considered equal
            return true;
        } else {
            // a is an object but b is not
            return false;
        }
    }

    // Check with numeric precision if specified
    if (options.precision != null && typeof a === "number" && typeof b === "number") {
        return Number(a.toFixed(options.precision)) === Number(b.toFixed(options.precision));
    }

    // If we end up here then the values are not equal
    return false;
}

export function equals<T, S>(a: T, b: T | S, options: EqualsOptions = {}): a is T & S {
    return deepEquals(a, b, options);
}

export function sleep(ms = 0): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
