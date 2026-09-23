import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getSession } from "@/lib/auth";
import { hasDatabase } from "@/lib/db";
import { createOrder } from "@/lib/domain";

const messages: Record<string,string> = {
  ADDRESS_REQUIRED: "Escolha um endereço para entrega.", SHIPPING_NOT_CONFIGURED: "A entrega ainda não possui cobertura e frete configurados.", ITEM_UNAVAILABLE: "Um item não está mais disponível. Revise o carrinho.", STOCK_REVIEW_REQUIRED: "A quantidade precisa ser confirmada pela loja.", DATABASE_NOT_CONFIGURED: "O banco de dados ainda não foi configurado.",
};
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: "Entre para concluir o pedido." }, { status: 401 });
  if (!hasDatabase()) return NextResponse.json({ message: messages.DATABASE_NOT_CONFIGURED }, { status: 503 });
  try { const order = await createOrder(session.sub, await request.json()); return NextResponse.json({ order }, { status: 201 }); }
  catch (error) {
    if (error instanceof ZodError) return NextResponse.json({ message: "O pedido contém dados inválidos." }, { status: 400 });
    const code = error instanceof Error ? error.message : "";
    if (messages[code]) return NextResponse.json({ message: messages[code] }, { status: 409 });
    console.error("order_failed", code); return NextResponse.json({ message: "Não foi possível confirmar. Nenhum novo pedido deve ser criado até consultar o resultado." }, { status: 500 });
  }
}
