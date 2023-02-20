import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_KEY } from '$env/static/public';
import { signedStatus } from '../stores/stores';

const supabaseUrl = 'https://ilmjoxtnrufvpqtsoogm.supabase.co'
export const supabase = createClient(supabaseUrl, PUBLIC_SUPABASE_KEY)

supabase.auth.onAuthStateChange((event, session) => {
	if (event == 'SIGNED_IN') signedStatus.set(true);
	if (event == 'SIGNED_OUT') signedStatus.set(false);
});