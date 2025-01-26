export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      clubsphoto: {
        Row: {
          id: number
          imageurl: string | null
          userUID: string | null
        }
        Insert: {
          id?: number
          imageurl?: string | null
          userUID?: string | null
        }
        Update: {
          id?: number
          imageurl?: string | null
          userUID?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clubsphoto_userUID_fkey"
            columns: ["userUID"]
            isOneToOne: false
            referencedRelation: "estabelecimentos"
            referencedColumns: ["userUID"]
          },
        ]
      }
      estabelecimentos: {
        Row: {
          categoria: string | null
          distrito: string | null
          email: string
          id: number
          nome: string
          preco: string | null
          site: string | null
          tarifas: number | null
          telefone: string | null
          userUID: string
        }
        Insert: {
          categoria?: string | null
          distrito?: string | null
          email: string
          id?: number
          nome: string
          preco?: string | null
          site?: string | null
          tarifas?: number | null
          telefone?: string | null
          userUID: string
        }
        Update: {
          categoria?: string | null
          distrito?: string | null
          email?: string
          id?: number
          nome?: string
          preco?: string | null
          site?: string | null
          tarifas?: number | null
          telefone?: string | null
          userUID?: string
        }
        Relationships: []
      }
      profilephoto: {
        Row: {
          ID: number
          imageurl: string | null
          userUID: string | null
        }
        Insert: {
          ID?: number
          imageurl?: string | null
          userUID?: string | null
        }
        Update: {
          ID?: number
          imageurl?: string | null
          userUID?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profilephotos_userUID_fkey"
            columns: ["userUID"]
            isOneToOne: false
            referencedRelation: "ProfilesData"
            referencedColumns: ["userUID"]
          },
          
        ]
      }
      stories: {
        Row: {
          ID: number
          storyurl: string | null
          userUID: string | null
        }
        Insert: {
          ID?: number
          storyurl?: string | null
          userUID?: string | null
        }
        Update: {
          ID?: number
          storyurl?: string | null
          userUID?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stories_userUID_fkey"
            columns: ["userUID"]
            isOneToOne: false
            referencedRelation: "ProfilesData"
            referencedColumns: ["userUID"]
          },
        ]
      }
      VPhoto: {
        Row: {
          ID: number
          imageurl: string | null
          userUID: string | null
        }
        Insert: {
          ID?: number
          imageurl?: string | null
          userUID?: string | null
        }
        Update: {
          ID?: number
          imageurl?: string | null
          userUID?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "VPhoto_userUID_fkey"
            columns: ["userUID"]
            isOneToOne: false
            referencedRelation: "ProfilesData"
            referencedColumns: ["userUID"]
          },
          
        ]
      }

      ProfilesData: {
        Row: {
          altura: string | null
          cabelo: string | null
          certificado: string | null

          cidade: string | null
          adress: string | null
          distrito: string | null
          latitude: number | null
          longitude: number | null


          corpo: string | null
          description: string | null
          deslocacoes: string | null
         
          email: string | null
          id: number
          idade: string | null
          lingua: string[] | null
          mamas: string | null
          nome: string | null
          olhos: string | null
          origem: string | null
          pagamento: string[] | null
          pelos: string | null
          peso: number | null
          seios: string | null
          servico: string[] | null
          signo: string | null
          tag: string | null
          tagTimestamp: string | null
          tarifa: number | null
          tatuagem: string | null
          tatuagens: string | null
          telefone: number | null
          userUID: string | null
          story:string | null
        }
        Insert: {
          altura?: string | null
          cabelo?: string | null
          certificado?: string | null
          cidade?: string | null
          corpo?: string | null
          description?: string | null
          deslocacoes?: string | null
          distrito?: string | null
          email?: string | null
          id?: number
          idade?: string | null
          lingua?: string[] | null
          mamas?: string | null
          nome?: string | null
          olhos?: string | null
          origem?: string | null
          pagamento?: string[] | null
          pelos?: string | null
          peso?: number | null
          seios?: string | null
          servico?: string[] | null
          signo?: string | null
          tag?: string | null
          tagTimestamp?: string | null
          tarifa?: number | null
          tatuagem?: string | null
          tatuagens?: string | null
          telefone?: number | null
          userUID?: string | null
          story:string | null
        }
        Update: {
          altura?: string | null
          cabelo?: string | null
          certificado?: string | null
          cidade?: string | null
          corpo?: string | null
          description?: string | null
          deslocacoes?: string | null
          distrito?: string | null
          email?: string | null
          id?: number
          idade?: string | null
          lingua?: string[] | null
          mamas?: string | null
          nome?: string | null
          olhos?: string | null
          origem?: string | null
          pagamento?: string[] | null
          pelos?: string | null
          peso?: number | null
          seios?: string | null
          servico?: string[] | null
          signo?: string | null
          tag?: string | null
          tagTimestamp?: string | null
          tarifa?: number | null
          tatuagem?: string | null
          tatuagens?: string | null
          telefone?: number | null
          userUID?: string | null
          story:string | null

        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
