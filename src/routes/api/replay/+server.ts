import { json, type RequestEvent } from '@sveltejs/kit';
import { supabase } from '../rlsSupabase';

export async function POST({ request }: RequestEvent) {
	console.log('I am ');
	const { game, rank, user, link, defaults } = await request.json();
	const { data, error } = await supabase
		.from('replays')
		.insert({ game: game, rank: rank, user: user, link: link, guesses: defaults })
		.select();
	if (error) {
		console.log(error);
		return json({
			status: 500,
			body: error.message
		});
	}
	return json({ data });
}
