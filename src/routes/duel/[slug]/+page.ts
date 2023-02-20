import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { generateTwoReplays } from './generateTwo';

const games = ["League of Legends", "valorant", "overwatch"]

export const load = (async ({ params }) => {
  if (games.includes(params.slug)) {
    let two_replays = await generateTwoReplays(params.slug)
    return {
      title: params.slug.toUpperCase(),
      replays: two_replays
    }
  }

  throw error(404, 'Not found');
}) satisfies PageLoad;