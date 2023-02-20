import { createClient } from '@supabase/supabase-js'
import { SUPABASE_KEY } from '$env/static/private';

const supabaseUrl = 'https://ilmjoxtnrufvpqtsoogm.supabase.co'
export const supabase = createClient(supabaseUrl, SUPABASE_KEY)