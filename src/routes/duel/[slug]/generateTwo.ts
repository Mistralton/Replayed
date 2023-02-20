import { supabase } from "$lib/supabase";

export async function generateTwoReplays(game: string) {
  let { data: replays, error } = await supabase.from('replays').select().eq('game', game);
  let first = replays![Math.floor(Math.random() * replays!.length)];
  let remaining = replays!.filter(replay => replay.link !== first.link);
  let second = remaining[Math.floor(Math.random() * remaining.length)];
  let two_replays = [first, second];
  return two_replays
}