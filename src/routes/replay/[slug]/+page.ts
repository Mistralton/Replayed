import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

const games = ["League of Legends", "valorant", "overwatch"]

export const load = (({ params }) => {
  if (games.includes(params.slug)) {
    return {
      title: params.slug.toUpperCase()
    }
  }

  throw error(404, 'Not found');
}) satisfies PageLoad;