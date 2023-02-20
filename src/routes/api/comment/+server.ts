import { json, type RequestEvent } from '@sveltejs/kit';
import { supabase } from '../rlsSupabase';

export async function PATCH({ request }: RequestEvent) {
	const comment: {id: number, comments: Array<{date: string, text: string[]}>} = await request.json();
	const { data, error } = await supabase
		.from('replays')
		.update({comments: comment.comments})
		.eq('id', comment.id);
	return json({ value: 'Update success' });
}
