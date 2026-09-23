import { describe, expect, it } from "vitest";
import { orderSchema } from "./schemas";

describe("checkout contract", () => {
  it("rejects an empty cart", () => {
    expect(() => orderSchema.parse({ items: [], fulfillmentMode: "pickup", paymentMode: "in_person", idempotencyKey: "1234567890123456" })).toThrow();
  });
  it("requires a valid idempotency key", () => {
    expect(() => orderSchema.parse({ items: [{ variantId: crypto.randomUUID(), quantity: 1 }], fulfillmentMode: "pickup", paymentMode: "in_person", idempotencyKey: "short" })).toThrow();
  });
});
