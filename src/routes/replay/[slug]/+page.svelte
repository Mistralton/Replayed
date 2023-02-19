<script lang="ts">
	import type { PageData } from './$types';
	import { game } from '../../../stores/stores';
	import { onMount } from 'svelte';
	import { supabase } from '../../../lib/supabase';
	import ranks from '../../../lib/components/ranks.json';
	import Chart from 'chart.js/auto';

	export let data: PageData;

	let guess = false;
	let guessRank = '';
	console.log(data.title);

	let replay: any;

	onMount(async () => {
		let { data: replays, error } = await supabase.from('replays').select();
		replay = replays;

		const ctx: any = document.getElementById('rankStat');
		const rankNames = ranks.map(rank => rank.alt);

		new Chart(ctx, {
		type: 'bar',
		data: {
			labels: rankNames,
			datasets: [{
			label: '# of Votes',
			data: [12, 19, 3, 5, 2, 3, 1, 1, 1],
			borderWidth: 1
			}]
		},
		options: {
			scales: {
			y: {
				beginAtZero: true
			}
			}
		}
		});
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
	{#if guess === true}
		<div class="flex justify-evenly p-5">
			<div>
				<h2 class="text-white">Your Guess</h2>
				<p class="text-white font-bold">{guessRank}</p>
			</div>
			<div>
				<h2 class="text-white">Actual Rank</h2>
				<p class="text-white font-bold">{replay[0].rank}</p>
			</div>
		</div>
		<div>
			<canvas id="rankStat"></canvas>
		</div>
	{/if}
	{#if data.title === 'valorant'}valorant{/if}
	{#if data.title === 'overwatch'}overwatch 2{/if}
	{#if data.title === 'LEAGUE'}
		<div class="flex justify-evenly py-5">
			
			
		<div class="flex">
			{#each ranks as rank}
			<img
			class="m-4 h-20 w-20 hover:cursor-pointer"
			src={rank.import}
			alt={rank.alt}
			title={rank.import}
			width={50}
			height={50}
			on:click={(e) => {
				if (e && e.target) {
					guess = true;
					guessRank = e.target.alt;
				}
			}}
			/>
			{/each}       
		
		</div>
		</div>
	{/if}
</div>
