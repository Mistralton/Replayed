<script lang="ts">
	import Comment from "./Comment.svelte";
	import DuelGraph from "./DuelGraph.svelte";

	export let replay;
	export let title;
	export let guess = "";
	console.log(replay.comments)
</script>

<div class="flex flex-col items-center justify-center h-full">
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
    <button disabled={guess.length > 0} on:click={() => guess = `${replay.user}'s play`}
      class="mt-4 bg-stone-600 disabled:bg-opacity-25 rounded-lg p-2 drop-shadow border-stone-50 tracking-tighter">Higher</button>
		{#if guess.length > 0}
			<DuelGraph replay={replay} />
			<Comment comments={replay.comments} />
		{/if}
	{/if}
</div>
