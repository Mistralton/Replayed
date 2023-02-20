<script lang="ts">
	import type { PageData } from './$types';
	import Duelframe from '$lib/components/Duelframe.svelte';
	import ranks from '../../../assets/ranks.json';
	import { supabase } from '$lib/supabase';
	export let data: PageData;
	export let guess: string;
	export let safeGraph: boolean;

	const ranksValues = ranks
		.filter((rank) => rank.game === data.replays[0].game)
		.map((rank) => rank.alt);

	const ranksImages = ranks
		.filter((rank) => rank.game === data.replays[0].game)
		.map((rank) => rank.import);

	async function generateNewRound() {
		let { data: replays, error } = await supabase.from('replays').select().eq('game', data.title);
		let first = replays![Math.floor(Math.random() * replays!.length)];
		let remaining = replays!.filter((replay) => replay.link !== first.link);
		let second = remaining[Math.floor(Math.random() * remaining.length)];
		let two_replays = [first, second];
		data.replays = two_replays;
		guess = '';
	}

	let higher =
		data.replays[0].rank &&
		data.replays[1].rank &&
		ranksValues.indexOf(data.replays[0].rank) > ranksValues.indexOf(data.replays[1].rank)
			? data.replays[0].id
			: data.replays[1].id;

	async function update() {
		const replay0 = [
			higher === data.replays[0].id ? data.replays[0].duel_winner + 1 : data.replays[0].duel_winner,
			data.replays[0].total_duels + 1
		];
		const replay1 = [
			higher === data.replays[1].id ? data.replays[1].duel_winner + 1 : data.replays[1].duel_winner,
			data.replays[1].total_duels + 1
		];
		await fetch('/api/duel', {
			method: 'PATCH',
			body: JSON.stringify([
				{
					id: data.replays[0].id,
					changes: replay0
				},
				{
					id: data.replays[1].id,
					changes: replay1
				}
			])
		});
		data.replays[0].duel_winner = replay0[0];
		data.replays[0].total_duels = replay0[1];
		data.replays[1].duel_winner = replay1[0];
		data.replays[1].total_duels = replay1[1];
		safeGraph = true;
	}

	function updateGuess(newGuess: string) {
		guess = newGuess;
		if (guess && guess.includes('s play')) {
			update();
		}
	}
</script>

<svelte:head>
	<title>Replayed.gg - Duel</title>
</svelte:head>

<div class="flex flex-col items-center justify-center flex-1 relative mt-8 h-full">
	<div class="absolute top-1/4 flex flex-col items-center">
		<h2 class="text-3xl text-white font-semibold max-w-2xl text-center">
			Which of these two clips are higher rank?
		</h2>
		{#if guess}
			<button
				on:click={generateNewRound}
				class="absolute z-50 top-20 bg-stone-600 rounded-lg p-2 h-max drop-shadow border-stone-50 tracking-tighter self-center"
			>
				New Round
			</button>
		{/if}
		<div class="flex gap-16 justify-center items-center relative h-full flex-1">
			<Duelframe
				{higher}
				image={ranksImages[ranksValues.indexOf(data.replays[0].rank)]}
				bind:safeGraph
				bind:guess
				{updateGuess}
				replay={data.replays[0]}
			/>
			<Duelframe
				{higher}
				image={ranksImages[ranksValues.indexOf(data.replays[1].rank)]}
				bind:safeGraph
				bind:guess
				{updateGuess}
				replay={data.replays[1]}
			/>
		</div>
	</div>
</div>
