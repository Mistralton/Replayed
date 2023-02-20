<script lang="ts">
	import type { PageData } from './$types';
	import { game } from '../../../stores/stores';
	import { onMount } from 'svelte';
	import { supabase } from '../../../lib/supabase';
	import GuessStat from '../../../lib/components/GuessStat.svelte';
	import RankGrid from '../../../lib/components/RankGrid.svelte';

	export let data: PageData;

	let guess = false;
	let guessRank = '';

	let replaylist: any;
	let replay: any;

	onMount(async () => {
		let { data: replays, error } = await supabase.from('replays').select();
		replaylist = replays;
		const randindex = Math.floor(Math.random() * replaylist.length);
		replay = replaylist[randindex];
	});

</script>

<div class="flex flex-col">
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
	{#if guess === true }
		<div class="flex justify-evenly p-5">
			<div>
				<h2 class="text-white">Your Guess</h2>
				<p class="text-white font-bold">{guessRank}</p>
			</div>
			<div>
				<h2 class="text-white">Actual Rank</h2>
				<p class="text-white font-bold">{replay.rank}</p>
			</div>
		</div>
		
		<GuessStat replay={replay}/>
		
		
	{/if}
	{#if data.title === 'valorant' && guess === false}valorant{/if}
	{#if data.title === 'overwatch' && guess === false}overwatch 2{/if}
	{#if data.title === 'LEAGUE' && guess === false && replay}
		<RankGrid bind:guess bind:guessRank replay={replay}/>
	{/if}
</div>
