import { json } from '@sveltejs/kit';
import { supabase } from '../rlsSupabase';

    // {
    //       id: 0
    //       changes: [{rank: guessRank,
    //                  guesses: 2}]
    // }

export async function PATCH({ request }: any) {
    const newValues: {id: number, changes: [{rank: string, guesses: number}]} = await request.json();
    
    const { data, error } = await supabase
    .from('replays')
    .update({
        guesses: newValues.changes
      })
    .eq('id', newValues.id)

    if (error) {
        return {
          status: 500,
          body: error.message
        };
      }

    return json(newValues.changes)
}