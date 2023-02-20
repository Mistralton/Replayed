import { supabase } from '../supabase';

export async function replayInfo(game: string, rank: string, link: string) {
	let currUser = await supabase.auth.getUser();
	let user = currUser.data.user?.user_metadata.full_name;
	let defaults: { rank: string; guesses: number }[] = [];

  // Default is set to league rank system, so need to manually change here
	if (game === 'Valorant') {
		defaults = [
			{
				rank: 'Bronze',
				guesses: 0
			},
			{
				rank: 'Platinum',
				guesses: 0
			},
			{
				rank: 'Radiant',
				guesses: 0
			},
			{
				rank: 'Iron',
				guesses: 0
			},
			{
				rank: 'Gold',
				guesses: 0
			},
			{
				rank: 'Silver',
				guesses: 0
			},
			{
				rank: 'Ascendant',
				guesses: 0
			},
			{
				rank: 'Immortal',
				guesses: 0
			},
			{
				rank: 'Diamond',
				guesses: 0
			}
		];
	}
	if (game === 'Overwatch') {
		defaults = [
			{
				rank: 'Bronze',
				guesses: 0
			},
			{
				rank: 'Platinum',
				guesses: 0
			},
			{
				rank: 'Top500',
				guesses: 0
			},
			{
				rank: 'Gold',
				guesses: 0
			},
			{
				rank: 'Silver',
				guesses: 0
			},
			{
				rank: 'Masters',
				guesses: 0
			},
			{
				rank: 'Grand Masters',
				guesses: 0
			},
			{
				rank: 'Diamond',
				guesses: 0
			}
		];
	}

	if (defaults[0]) return { game, rank, user, link, defaults };
	else return { game, rank, user, link };
}

export async function replayInsert(newObj: {
	game: string;
	rank: string;
	user: string;
	link: string;
	defaults?: any;
}) {
	const update = await fetch('/api/replay', {
		method: 'POST',
		body: JSON.stringify(newObj)
	});
	const results = await update.json();
	return results;
}
