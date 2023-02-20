import { json } from '@sveltejs/kit';
import { supabase } from '../../../lib/supabase';
import { createClient } from '@supabase/supabase-js'

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
        user: "newValues.changes"
      })
    .eq('id', newValues.id)
    console.log(newValues.id)

    if (error) {
        return {
          status: 500,
          body: error.message
        };
      }

    return json({value: "hi"})
}