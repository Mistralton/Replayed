import { json, type RequestEvent } from '@sveltejs/kit';
import { supabase } from '../rlsSupabase';

export async function PATCH({ request }: RequestEvent) {
	const newValues: Array<{ id: number; changes: number[] }> = await request.json();
	const { data, error: err } = await supabase
		.from('replays')
		.update([{ duel_winner: newValues[0].changes[0], total_duels: newValues[0].changes[1] }])
		.eq('id', newValues[0].id);
	const { data: dat, error } = await supabase
		.from('replays')
		.update([{ duel_winner: newValues[1].changes[0], total_duels: newValues[1].changes[1] }])
		.eq('id', newValues[1].id);
	return json({ value: 'Update success' });
}
