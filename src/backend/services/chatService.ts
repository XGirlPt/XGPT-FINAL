
// src/backend/services/chatService.ts
import supabase from '../database/supabase';
import { ChatRoom, Message } from '../types';

export const chatService = {
  async getOrCreateChatRoom(userId: string, advertiserId: string): Promise<ChatRoom> {
    console.log('Tentando obter ou criar chat room:', { userId, advertiserId });

    // Verificar se userId existe em users
    const { data: userExists, error: userError } = await supabase
      .from('users')
      .select('user_id')
      .eq('user_id', userId)
      .single();
    if (userError || !userExists) {
      throw new Error(`userId=${userId} não existe na tabela users: ${userError?.message || 'Não encontrado'}`);
    }

    // Verificar se advertiserId existe em ProfilesData
    const { data: advertiserExists, error: advertiserError } = await supabase
      .from('ProfilesData')
      .select('userUID')
      .eq('userUID', advertiserId)
      .single();
    if (advertiserError || !advertiserExists) {
      throw new Error(`advertiserId=${advertiserId} não existe na tabela ProfilesData: ${advertiserError?.message || 'Não encontrado'}`);
    }

    const { data: existingRoom, error: fetchError } = await supabase
      .from('chat_rooms')
      .select('*')
      .eq('user_id', userId)
      .eq('advertiser_id', advertiserId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Erro ao buscar chat room existente:', fetchError);
      throw fetchError;
    }

    if (existingRoom) {
      console.log('Chat room existente encontrado:', existingRoom);
      return existingRoom;
    }

    const { data, error } = await supabase
      .from('chat_rooms')
      .insert({ user_id: userId, advertiser_id: advertiserId })
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar chat room:', error);
      throw error;
    }
    console.log('Novo chat room criado:', data);
    return data;
  },

  async sendMessage(chatRoomId: string, senderId: string, content: string): Promise<Message> {
    const { data, error } = await supabase
      .from('messages')
      .insert({ chat_room_id: chatRoomId, sender_id: senderId, content })
      .select()
      .single();

    if (error) throw error;

    await supabase
      .from('chat_rooms')
      .update({ last_message_at: new Date().toISOString() })
      .eq('id', chatRoomId);

    return data;
  },

  async fetchMessages(chatRoomId: string): Promise<Message[]> {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('chat_room_id', chatRoomId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  },

  async fetchChatRooms(userId: string): Promise<ChatRoom[]> {
    const { data, error } = await supabase
      .from('chat_rooms')
      .select('*')
      .or(`user_id.eq.${userId},advertiser_id.eq.${userId}`)
      .order('last_message_at', { ascending: false });

    if (error) throw error;
    return data;
  },
};