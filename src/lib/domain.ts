import { db } from "./db";
import { orderSchema } from "./schemas";

export async function createOrder(accountId: string, input: unknown) {
  const parsed = orderSchema.parse(input);
  const sql = db();
  return sql.begin(async (tx) => {
    const existing = await tx`SELECT * FROM orders WHERE account_id=${accountId} AND idempotency_key=${parsed.idempotencyKey}`;
    if (existing[0]) return existing[0];
    if (parsed.fulfillmentMode === "delivery") {
      if (!parsed.addressId) throw new Error("ADDRESS_REQUIRED");
      throw new Error("SHIPPING_NOT_CONFIGURED");
    }
    const ids = parsed.items.map((i) => i.variantId);
    const variants = await tx`
      SELECT v.id, v.sku, v.label, v.price_cents, v.stock_quantity, v.sellable, p.name
      FROM variants v JOIN products p ON p.id=v.product_id
      WHERE v.id IN ${tx(ids)} AND p.active=true FOR UPDATE`;
    if (variants.length !== parsed.items.length) throw new Error("ITEM_UNAVAILABLE");
    let subtotal = 0;
    const lines: Array<{ id: string; sku: string; label: string; price_cents: number; name: string; quantity: number; line: number }> = parsed.items.map((item) => {
      const variant = variants.find((v) => v.id === item.variantId)! as { id: string; sku: string; label: string; price_cents: number; stock_quantity: number | null; sellable: boolean; name: string };
      if (!variant.sellable || variant.price_cents == null) throw new Error("ITEM_UNAVAILABLE");
      if (variant.stock_quantity != null && variant.stock_quantity < item.quantity) throw new Error("STOCK_REVIEW_REQUIRED");
      subtotal += variant.price_cents * item.quantity;
      return { ...variant, quantity: item.quantity, line: variant.price_cents * item.quantity };
    });
    const paymentState = parsed.paymentMode === "in_person" ? "presencial_a_receber" : "nao_iniciado";
    const state = parsed.paymentMode === "in_person" ? "aguardando_disponibilidade" : "aguardando_pagamento";
    const [order] = await tx`INSERT INTO orders (account_id, operational_state, payment_state, fulfillment_mode, payment_mode, subtotal_cents, shipping_cents, total_cents, idempotency_key)
      VALUES (${accountId},${state},${paymentState},${parsed.fulfillmentMode},${parsed.paymentMode},${subtotal},0,${subtotal},${parsed.idempotencyKey}) RETURNING *`;
    for (const line of lines) await tx`INSERT INTO order_items (order_id,variant_id,sku,name_snapshot,variant_snapshot,quantity,unit_price_cents,line_total_cents)
      VALUES (${order.id},${line.id},${line.sku},${line.name},${line.label},${line.quantity},${line.price_cents},${line.line})`;
    await tx`INSERT INTO audit_events(actor_id,subject_id,action,details) VALUES (${accountId},${order.id},'order.created',${tx.json({ channel: "site" })})`;
    return order;
  });
}
