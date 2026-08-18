/*
 * Copyright (c) 2026 Klaus Reimer
 * SPDX-License-Identifier: MIT
 */

type AssignabilityConstraint<Expected, Actual> = [ Expected, Actual ] extends [ Actual, Expected ] ? unknown : never;

/**
 * Asserts at compile time that the actual type and the expected type are mutually assignable.
 *
 * This function does nothing at runtime. TypeScript reports an error unless the expected type is assignable to the actual type and the actual type is
 * assignable to the expected type.
 *
 * @template Expected - The expected type.
 * @template Actual   - The actual type.
 */
export function assertAssignable<Expected, Actual extends AssignabilityConstraint<Expected, Actual>>(): void {}
