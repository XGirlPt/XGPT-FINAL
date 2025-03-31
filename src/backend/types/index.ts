// src/backend/types/index.ts

// Interface para o perfil completo, usada em contextos onde todos os dados são exibidos
export interface Profile {
  id: number;
  nome: string;
  photos: string[];
  vphotos: string[];
  photoURL: string[];
  vphotoURL: string[];
  stories: string[];
  storyURL: string[];
  userUID?: string; // UUID do usuário, opcional
  description?: string;
  tag?: string;
  tagtimestamp?: string; // Ajustado para string (ISO), mais comum em Supabase
  tarifa: number;
  lingua: string[];
  telefone: string;
  email: string;
  idade: number;
  altura: string;
  distrito: string;
  origem: string;
  cidade: string;
  address: string;
  latitude: number;
  longitude: number;
  peso: string;
  tatuagem: string;
  pelos: string;
  olhos: string;
  seios: string;
  mamas: string;
  signo: string;
  pagamento: string[];
  inactive: boolean; // Representa o campo 'status' em ProfilesData
  certificado: boolean;
  live?: boolean; // Opcional, como no código
  comment?: string[];
  premium: boolean;
  featured_until?: string | null; // Ajustado para aceitar null
}

// Interface para dados de entrada do perfil, usada ao criar ou atualizar um perfil
export interface UserProfileData {
  userUID: string; // UUID do usuário
  email: string;
  nome: string;
  idade: string; // String no envio, mas number no Profile
  tarifa: string; // String no envio, mas number no Profile
  altura: string;
  cabelo: string;
  corpo: string;
  olhos: string;
  origem: string;
  seios: string;
  tatuagem: string;
  mamas: string;
  pelos: string;
  signo: string;
  distrito: string;
  cidade: string;
  address: string;
  longitude: string; // String no envio, mas number no Profile
  latitude: string; // String no envio, mas number no Profile
  telefone: string;
  pagamento: string; // String no envio, mas array no Profile
  servico: string; // String no envio, mas array no Profile
  lingua: string; // String no envio, mas array no Profile
  description: string;
  certificado: boolean;
  status: null | boolean; // Representa o campo 'status' em ProfilesData
  comment?: string[];
  premium: boolean;
  featured_until?: string | null; // Ajustado para aceitar null
}

// Interface para dados de fotos
export interface PhotoData {
  userUID: string;
  imageurl: string;
}

// Interface para resposta de atualização de tag
export interface UpdateTagResponse {
  success: boolean;
  data?: any;
  error?: string;
}

// Interface para um artigo do blog
export interface BlogPost {
  id: number; // Chave primária auto-incrementada
  slug: string; // Slug único do artigo
  title: string; // Título do artigo
  author_id: string; // UUID do autor (corresponde a userUID)
  date: string; // Data no formato 'YYYY-MM-DD'
  image: string; // URL da imagem
  content: { type: string; text: string }[]; // JSONB como array de objetos
  status: "pending" | "approved"; // Status do artigo
  created_at?: string; // Timestamp de criação, opcional
}

// Interface para dados de entrada de um artigo (usada ao criar)
export interface BlogPostInput {
  title: string;
  content: { type: string; text: string }[];
  author_id: string; // UUID do autor
  date: string; // Data no formato 'YYYY-MM-DD'
  image?: string; // URL da imagem, opcional
  slug: string; // Slug único
  status?: "pending" | "approved"; // Status, opcional (default: 'pending')
}

// Interface para perfis usados no HeroSection
export interface HeroProfile {
  userUID: string;
  nome: string;
  cidade: string;
  photos: string[];
  stories: string[];
  tag: string;
  tagtimestamp: string;
  live: boolean;
  premium: boolean;
  certificado: boolean;
}