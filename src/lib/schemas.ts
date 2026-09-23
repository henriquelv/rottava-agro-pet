import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email().toLowerCase(),
  phone: z.string().trim().max(30).optional(),
  password: z.string().min(8).max(128),
});

export const loginSchema = z.object({ email: z.email().toLowerCase(), password: z.string().min(1).max(128) });

export const orderSchema = z.object({
  items: z.array(z.object({ variantId: z.uuid(), quantity: z.number().int().min(1).max(99) })).min(1),
  fulfillmentMode: z.enum(["pickup", "delivery"]),
  paymentMode: z.enum(["pix", "card", "in_person"]),
  addressId: z.uuid().optional(),
  idempotencyKey: z.string().min(16).max(100),
});
