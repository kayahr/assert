/*
 * Copyright (c) 2024 Klaus Reimer, k@ailis.de
 * See LICENSE.md for licensing information.
 */

/**
 * Options for {@link AssertionError}.
 */
export interface AssertionErrorOptions extends ErrorOptions {
    /** Optional assertion reason. When specified then the actual exception message is prefixed with this string separated by a dot and whitespace. */
    reason?: string;
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
    /**
     * Creates a new assertion error.
     *
     * @param message - The exception message.
     */
    public constructor(message: string, { reason, ...options }: AssertionErrorOptions = {}) {
        super(buildMessage(message, reason), options);
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, this.constructor.prototype as Function);
    }
}
