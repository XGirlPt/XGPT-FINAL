import supabase from '@/backend/database/supabase';

const chatRoomId = 'ff4fe02b-4eb0-4274-822a-9040b11a1ba1';

const channel = supabase
  .channel(`chat:${chatRoomId}`)
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
      filter: `chat_room_id=eq.${chatRoomId}`,
    },
    (payload) => {
      console.log('Teste isolado - Nova mensagem:', payload.new);
    }
  )
  .subscribe((status) => {
    console.log('Teste isolado - Status:', status);
  });

// Mantém o script ativo
setInterval(() => {}, 1000);