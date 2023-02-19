import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

const games = ["league", "valorant", "overwatch"]

export const load = (({ params }) => {
  if (games.includes(params.slug)) {
    return {
      title: params.slug.toUpperCase() === "league" ? "League of Legends" : params.slug.toUpperCase()
    }
  }

  throw error(404, 'Not found');
}) satisfies PageLoad;