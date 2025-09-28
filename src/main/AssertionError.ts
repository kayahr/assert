/*
 * Copyright (c) 2024-2025 Klaus Reimer
 * SPDX-License-Identifier: MIT
 */

/**
 * Options for {@link AssertionError}.
 */
export interface AssertionErrorOptions extends ErrorOptions {
    /** Optional assertion reason. When specified then the actual exception message is prefixed with this string separated by a dot and whitespace. */
    reason?: string;

    /** Optional actual value. */
    actual?: unknown;

    /** Optional expected value. */
    expected?: unknown;
}

/**
 * Concatenates the exception message with the optional reason message.
 *
 * @param message - The exception message.
 * @param reason  - Optional reason message to prefix the exception message with.
 * @returns The concatenated message.
 */
function buildMessage(message: string, reason?: string): string {
    if (reason == null) {
        return message;
    } else {
        return `${reason}: ${message}`;
    }
}

/**
 * Thrown when an assertion fails.
 */
export class AssertionError extends Error {
    /** Actual value if set. */
    public actual?: unknown;

    /** Expected value it set. */
    public expected?: unknown;

    /**
     * Creates a new assertion error.
     *
     * @param message - The exception message.
     * @param options - The exception options.
     */
    public constructor(message: string, { reason, ...options }: AssertionErrorOptions = {}) {
        super(buildMessage(message, reason), { cause: options.cause });
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, this.constructor.prototype as Function);
        if (Object.hasOwn(options, "actual")) {
            this.actual = options.actual;
        } else {
            delete this.actual;
        }
        if (Object.hasOwn(options, "expected")) {
            this.expected = options.expected;
        } else {
            delete this.expected;
        }
    }
}
