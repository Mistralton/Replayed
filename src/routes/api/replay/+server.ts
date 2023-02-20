import { json } from '@sveltejs/kit';
import { supabase } from '../rlsSupabase';

export async function PUT({ request }: any) {
    const newReplay: {game: string, rank: string, user: string, link: string} = await request.json();
    console.log(newReplay)
    const { data, error } = await supabase
        .from('replays')
        .insert([
            newReplay
            // { id: , created_at: , game, rank, user, guesses, comments, tags, link, duel_winner, total_duels},
        ])

    if (error) {
        return {
          status: 500,
          body: error.message
        };
      }

    return json({value: "hi"})
}