import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const games = ['League of Legends', 'valorant', 'overwatch'];

export const load = (({ params }) => {
	if (games.includes(params.slug)) {
		return {
			title:
				params.slug === 'League of Legends'
					? params.slug
					: params.slug.charAt(0).toUpperCase() + params.slug.substring(1).toLowerCase()
		};
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
