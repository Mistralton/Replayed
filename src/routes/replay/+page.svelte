<script lang="ts">
	import { game } from '../../stores/stores';
	import { onMount } from 'svelte';
	import { supabase } from '../../lib/supabase';

	export let PageData;
	console.log(PageData);

	let guess = false;
	let guessRank = '';
	console.log(guess);

	let replay: any;

	onMount(async () => {
		let { data: replays, error } = await supabase.from('replays').select();
		replay = replays;
	});
</script>

<div class="flex flex-col">
	{#if replay && replay[0]}
		<h1 class="text-white text-center p-10">Submitted by {replay[0].user}</h1>
		<iframe
			width="1200"
			height="675"
			src={replay[0].link.replace('/watch?v=', '/embed/')}
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			allowfullscreen
			class="mx-auto"
		/>
	{/if}
	{#if $game === 'Valorant' && guess === false}valorant{/if}
	{#if $game === 'Overwatch 2' && guess === false}overwatch 2{/if}
	{#if $game === 'League of Legends' && guess === false}
		<div class="flex justify-evenly">
			<div class="flex flex-col">
				<img
					src="loliron.webp"
					alt="iron"
					class="h-20 mx-auto"
					on:click={(e) => {
						if (e && e.target) {
							guess = true;
							guessRank = e.target.alt;
						}
					}}
				/>
				<h2 class="text-white text-center">Iron</h2>
			</div>

			<div>
				<img
					src="lolbronze.webp"
					alt="Bronze"
					class="h-20 mx-auto"
					on:click={(e) => {
						if (e && e.target) {
							guess = true;
							guessRank = e.target.alt;
						}
					}}
				/>
				<h2 class="text-white text-center">Bronze</h2>
			</div>

			<div>
				<img
					src="lolsilver.webp"
					alt="Silver"
					class="h-20 mx-auto"
					on:click={(e) => {
						if (e && e.target) {
							guess = true;
							guessRank = e.target.alt;
						}
					}}
				/>
				<h2 class="text-white text-center">Silver</h2>
			</div>

			<div>
				<img
					src="lolgold.webp"
					alt="Gold"
					class="h-20 mx-auto"
					on:click={(e) => {
						if (e && e.target) {
							guess = true;
							guessRank = e.target.alt;
						}
					}}
				/>
				<h2 class="text-white text-center">Gold</h2>
			</div>

			<div>
				<img
					src="lolplat.webp"
					alt="Platinum"
					class="h-20 mx-auto"
					on:click={(e) => {
						if (e && e.target) {
							guess = true;
							guessRank = e.target.alt;
						}
					}}
				/>
				<h2 class="text-white text-center">Plat</h2>
			</div>

			<div>
				<img
					src="loldia.webp"
					alt="Diamond"
					class="h-20 mx-auto"
					on:click={(e) => {
						if (e && e.target) {
							guess = true;
							guessRank = e.target.alt;
						}
					}}
				/>
				<h2 class="text-white text-center">Diamond</h2>
			</div>

			<div>
				<img
					src="lolmas.webp"
					alt="Master"
					class="h-20 mx-auto"
					on:click={(e) => {
						if (e && e.target) {
							guess = true;
							guessRank = e.target.alt;
						}
					}}
				/>
				<h2 class="text-white text-center">Master</h2>
			</div>

			<div>
				<img
					src="lolgm.webp"
					alt="Grandmaster"
					class="h-20 mx-auto"
					on:click={(e) => {
						if (e && e.target) {
							guess = true;
							guessRank = e.target.alt;
						}
					}}
				/>
				<h2 class="text-white text-center">Grandmaster</h2>
			</div>

			<div>
				<img
					src="lolchal.webp"
					alt="Challenger"
					class="h-20 mx-auto"
					on:click={(e) => {
						if (e && e.target) {
							guess = true;
							guessRank = e.target.alt;
						}
					}}
				/>
				<h2 class="text-white text-center">Challenger</h2>
			</div>
		</div>
	{/if}
	{#if guess === true}
		<div class="flex justify-evenly">
			<div>
				<h2 class="text-white">Your Guess</h2>
				<p class="text-white">{guessRank}</p>
			</div>
			<div>
				<h2 class="text-white">Actual Rank</h2>
				<p class="text-white">{replay[0].rank}</p>
			</div>
		</div>
	{/if}
</div>
