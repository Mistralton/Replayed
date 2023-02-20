import { json } from '@sveltejs/kit';
import { supabase } from '../rlsSupabase';

export async function POST({ request }: any) {
    console.log("I am ")
    const newReplay: {game: string, rank: string, user: string, link: string, defaults: any} = await request.json();
    console.log(newReplay)
    const { data, error } = await supabase
        .from('replays')
        .insert({
          game: "League of Legends",
          rank: "Gold",
          user: "Username",
          link: "github.com"
        })
        .select()
    if (error) {
      console.log(error)
        return json({
          status: 500,
          body: error.message
        });
      }
}