<script lang="ts">
	import type { Replay } from '$lib/db_res';
	import Comment from './Comment.svelte';
	import DuelGraph from './DuelGraph.svelte';
	export let replay: Replay;
	export let guess = '';
	export let safeGraph = false;
</script>

<div class="flex flex-col items-center">
	{#if replay}
		<h1 class="text-white text-center p-10">Submitted by {replay.user}</h1>
		<div class="flex gap-16">
			<iframe
				width="600"
				height="337"
				src={replay.link.replace('/watch?v=', '/embed/')}
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen
				class="mx-auto"
			/>
		</div>
		{#if guess.length === 0}
			<button
				disabled={guess.length > 0}
				on:click={() => (guess = `${replay.user}'s play`)}
				class="mt-4 bg-stone-600 disabled:bg-opacity-25 rounded-lg p-2 drop-shadow border-stone-50 tracking-tighter"
				>Higher</button
			>
		{/if}
		{#if safeGraph && guess.length > 0}
			<DuelGraph {replay} />
			<Comment comments={replay.comments} id={replay.id} />
		{/if}
	{/if}
</div>
