/**
 * A minimal bag of HTTP response headers that a response strategy can read
 * by name.
 *
 * Accepts anything that exposes a `.get(name): string | null` method
 * (Angular's `HttpHeaders`, the DOM `Headers` class) or a plain object
 * keyed by header name. Consumers should not need to convert between them.
 *
 * Structural by design: this type deliberately imports nothing, so a bag from
 * any framework satisfies it without the core depending on that framework.
 */
export type HeaderBag =
  { get(name: string): string | null } | Record<string, string | null | undefined>;
