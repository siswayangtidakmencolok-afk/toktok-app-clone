import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_API_KEY;

// validasi agar error lebih elas saat env gak kebaca
if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase URL or API key');
}
export const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;