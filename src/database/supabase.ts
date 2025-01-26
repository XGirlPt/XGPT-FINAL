// utils/supabaseClient.ts
import { createClient, SupabaseClient } from "@supabase/supabase-js";
const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey: string = process.env
  .NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
import { Database } from "./schema";
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase: SupabaseClient = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey
);

export default supabase;
export { supabase };
