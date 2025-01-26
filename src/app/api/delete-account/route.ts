import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Inicializar o cliente Supabase com as variáveis de ambiente
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

// Exportando o método DELETE
export async function DELETE(req: Request) {
  try {
    const { userId } = await req.json();

    // Verificar se o userId foi fornecido e se é uma string válida
    if (!userId || typeof userId !== 'string') {
      return NextResponse.json({ error: 'userId é necessário para excluir a conta' }, { status: 400 });
    }

    // Chamar a função RPC do Supabase para excluir o usuário
    const { error } = await supabase.rpc('delete_user_account', {
      uid: userId, // Verifique se o parâmetro corresponde ao esperado na função RPC
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Conta eliminada com sucesso' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao eliminar conta:', error);
    return NextResponse.json({ error: 'Erro ao eliminar conta' }, { status: 500 });
  }
}
