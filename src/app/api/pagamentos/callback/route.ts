import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { transactionID, status } = body;

  const { error } = await supabase
    .from("transactions")
    .update({ status })
    .eq("id", transactionID);

  if (error) {
    return NextResponse.json({ error: "Erro ao atualizar transação" }, { status: 500 });
  }

  return NextResponse.json({ message: "Transação atualizada com sucesso" }, { status: 200 });
}