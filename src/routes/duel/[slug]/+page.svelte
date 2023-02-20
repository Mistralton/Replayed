<script lang="ts">
  import type { PageData } from './$types';
  import Duelframe from '$lib/components/Duelframe.svelte';
  import ranks from '$lib/components/ranks.json';
  import DuelGraph from '$lib/components/DuelGraph.svelte';
  import { generateTwoReplays } from './generateTwo';
  import { onMount } from 'svelte';

  const ranksValues = ranks.map((rank) => rank.alt);

  export let data: PageData;
  export let guess: string;

  let prefetch;

  async function generateNewRound() {
    prefetch = await generateTwoReplays(data.replays[0].game);
    data.replays = prefetch;
    guess = "";
  }

  let higher =
    data.replays[0].rank &&
    data.replays[1].rank &&
    ranksValues.indexOf(data.replays[0].rank) > ranksValues.indexOf(data.replays[1].rank)
      ? data.replays[0].user
      : ranksValues.indexOf(data.replays[0].rank) === ranksValues.indexOf(data.replays[1].rank)
      ? 'They were the same!'
      : data.replays[1].user;

</script>

<div class="justify-center flex flex-col items-center flex-1">
  <h2 class="text-3xl text-white font-semibold max-w-2xl text-center">Which of these two clips are higher rank?</h2>
  <div class="flex gap-16 items-stretch relative">
    <div class="flex-1 h-full">
      <Duelframe bind:guess replay={data.replays[0]} title={data.title} />
    </div>
    {#if guess}
      <button
        on:click={generateNewRound}
        class="bg-stone-600 rounded-lg p-2 h-max drop-shadow border-stone-50 tracking-tighter self-center"
      >
        New Round
      </button>
    {:else}
      <button
        on:click={() => guess = "that they were the same rank"}
        class="disabled:bg-opacity-25 bg-stone-600 rounded-lg p-2 h-max drop-shadow border-stone-50 tracking-tighter self-center"
      >
        Draw
      </button>
    {/if}
    <div class="flex-1 h-full">
      <Duelframe bind:guess replay={data.replays[1]} title={data.title} />
    </div>
  </div>
  <!-- {#if guess}
    <h2 class="text-white mt-4 mb-4">Your Guess was {guess}! {higher}</h2>
  {/if} -->
</div>
