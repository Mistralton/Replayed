<script lang="ts">
	import { onMount } from 'svelte';
	import ranks from './ranks.json';
	import { newGuesses, patchGuesses } from '../../routes/replay/[slug]/UpdatedGuesses';
	export let guess;
	export let guessRank;
	export let replay: any;
</script>

<div class="flex justify-evenly py-5">
	<div class="flex">
		{#if replay}
			{#each ranks.filter((replaye) => replaye.game === replay.game) as rank}
				<img
					class="m-4 h-20 w-20 hover:cursor-pointer"
					src={rank.import}
					alt={rank.alt}
					title={rank.import}
					width={50}
					height={50}
					on:click={async (e) => {
						if (e && e.target) {
							guess = true;
							guessRank = e.target.alt;
							const a = newGuesses(guessRank, replay.guesses);
							const b = await patchGuesses(replay.id, a);
							console.log(b);
						}
					}}
				/>
			{/each}
		{/if}
	</div>
</div>
