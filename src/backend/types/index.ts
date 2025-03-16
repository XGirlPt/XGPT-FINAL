export interface Profile {
  id: number;
  nome: string;
  photos: string[];
  vphotos: string[];
  photoURL: string[];
  vphotoURL: string[];
  stories: string[];
  storyURL: string[];
  userUID?: string;
  description?: string;
  tag?: string;
  tagtimestamp?: Date;
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
  inactive: boolean;
  certificado: boolean;
  live?: boolean;
  comment?: string[];
  premium: boolean; 
  // Adicionei a propriedade 'live' aqui, tornando-a opcional
}


export interface UserProfileData {
  userUID: string;
  email: string;
  nome: string;
  idade: string;
  tarifa: string;
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
  longitude: string;
  latitude: string;
  telefone: string;
  pagamento: string;
  servico: string;
  lingua: string;
  description: string;
  certificado: boolean;
  status: null;
  comment?: string[];
  premium: boolean; 
}

export interface PhotoData {
  userUID: string;
  imageurl: string;
}

export interface UpdateTagResponse {
  success: boolean;
  data?: any;
  error?: string;
}
