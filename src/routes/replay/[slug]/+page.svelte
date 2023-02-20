<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { supabase } from '../../../lib/supabase';
	import GuessStat from '../../../lib/components/GuessStat.svelte';
	import RankGrid from '../../../lib/components/RankGrid.svelte';
	import Comment from '$lib/components/Comment.svelte';
	import type { Replay } from '../../../lib/db_res';
	export let data: PageData;

	let guess = false;
	let guessRank = '';

	let replaylist: Replay[];
	let replay: Replay;

	onMount(async () => {
		let { data: replays, error } = await supabase.from('replays').select().eq('game', data.title);
		if (replays) {
			replaylist = replays;
			const randindex = Math.floor(Math.random() * replaylist.length);
			replay = replaylist[randindex];
		}
	});
</script>

<svelte:head>
	<title>Replayed.gg - Challenge</title>
</svelte:head>

<div class="flex flex-col items-center flex-1">
	{#if replay}
		<h1 class="text-white text-center p-10">Submitted by {replay.user}</h1>
		<iframe
			width="1200"
			height="675"
			src={replay.link.replace('/watch?v=', '/embed/')}
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			allowfullscreen
			class="mx-auto"
		/>
	{/if}
	<RankGrid bind:guess bind:guessRank {replay} />
	{#if guess === true}
		<div class="flex justify-evenly p-5 gap-16">
			<div>
				<h2 class="text-white">Your Guess</h2>
				<p class="text-white font-bold">{guessRank}</p>
			</div>
			<div>
				<h2 class="text-white">Actual Rank</h2>
				<p class="text-white font-bold">{replay.rank}</p>
			</div>
		</div>

		<GuessStat {replay} />
		<button on:click={() => {
			location.reload()
		}} class="p-2 bg-stone-600 rounded-lg mb-10 hover:text-white">Play Again</button>
		<Comment position="single" comments={replay.comments} id={replay.id} />
	{/if}
</div>
