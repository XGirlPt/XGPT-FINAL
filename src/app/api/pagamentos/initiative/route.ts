import { supabase } from "@/utils/supabase";
import { createPaymentLink } from "@/lib/verotel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, amount, currency } = body;

  const paymentUrl = createPaymentLink(amount, currency, userId);

  const { data, error } = await supabase
    .from("transactions")
    .insert([{ user_id: userId, status: "pending", amount, currency }]);

  if (error) {
    return NextResponse.json({ error: "Erro ao registrar transação" }, { status: 500 });
  }

  return NextResponse.json({ url: paymentUrl }, { status: 200 });
}