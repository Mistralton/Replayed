<script lang="ts">
	import ranks from '../../assets/ranks.json';
	import { newGuesses, patchGuesses } from '../../routes/replay/[slug]/UpdatedGuesses';
	import type { Replay } from '../db_res';
	export let guess: boolean;
	export let guessRank;
	export let replay: Replay;

	async function handleClick(e: KeyboardEvent | MouseEvent) {
		if (e && e.target) {
			guess = true;
			guessRank = (e.target as HTMLImageElement).alt;
			const a = newGuesses(guessRank, replay.guesses as [{ rank: string; guesses: number }]);
			const b = await patchGuesses(replay.id, a);
		}
	}
</script>

<div class="flex justify-evenly py-5">
	<div class="flex">
		{#if replay && !guess}
			{#each ranks.filter((replaye) => replaye.game === replay.game) as rank}
				<img
					class="m-4 h-20 w-20 hover:cursor-pointer"
					src={rank.import}
					alt={rank.alt}
					title={rank.import}
					width={50}
					height={50}
					on:keydown={async (e) => await handleClick(e)}
					on:click={async (e) => await handleClick(e)}
				/>
			{/each}
		{:else if replay && guess}
			{#each ranks.filter((replaye) => replaye.game === replay.game) as rank}
				<img
					class="m-4 h-20 w-20"
					src={rank.import}
					alt={rank.alt}
					title={rank.import}
					width={50}
					height={50}
				/>
			{/each}
		{/if}
	</div>
</div>
