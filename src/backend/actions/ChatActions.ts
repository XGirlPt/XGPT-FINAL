import { createAsyncThunk } from '@reduxjs/toolkit';
import { chatService } from '../services/chatService';
import { ChatRoom, Message } from '../types';

export const startChat = createAsyncThunk(
  'chat/startChat',
  async ({ userId, advertiserId }: { userId: string; advertiserId: string }, { rejectWithValue }) => {
    try {
      const chatRoom = await chatService.getOrCreateChatRoom(userId, advertiserId);
      return chatRoom;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (
    { chatRoomId, senderId, content }: { chatRoomId: string; senderId: string; content: string },
    { rejectWithValue }
  ) => {
    try {
      const message = await chatService.sendMessage(chatRoomId, senderId, content);
      return message;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchChatMessages = createAsyncThunk(
  'chat/fetchChatMessages',
  async (chatRoomId: string, { rejectWithValue }) => {
    try {
      const messages = await chatService.fetchMessages(chatRoomId);
      return { chatRoomId, messages };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchChatRooms = createAsyncThunk(
  'chat/fetchChatRooms',
  async (userId: string, { rejectWithValue }) => {
    try {
      const chatRooms = await chatService.fetchChatRooms(userId);
      return chatRooms;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);