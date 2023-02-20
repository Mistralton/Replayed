import { supabase } from '$lib/supabase';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const games = ["League of Legends", "valorant", "overwatch"]

export const load = (async ({ params }) => {
  if (games.includes(params.slug)) {
    const gtitle = params.slug === "League of Legends" ? params.slug : params.slug.charAt(0).toUpperCase() + params.slug.substring(1).toLowerCase()
    let { data: replays, error } = await supabase.from('replays').select().eq('game', gtitle);
    let firstIndex = Math.floor(Math.random() * replays!.length);
    let first = replays![firstIndex];
    let remaining = replays!.filter(replay => replay.link !== first.link);
    let secondIndex = Math.floor(Math.random() * remaining.length);
    let second = remaining[secondIndex];
    while (second.rank === first.rank) {
      secondIndex = Math.floor(Math.random() * remaining.length);
      second = remaining[secondIndex];
    }
    let two_replays = [first, second];
    return {
      title: gtitle,
      replays: two_replays
    }
  }

  throw error(404, 'Not found');
}) satisfies PageServerLoad;