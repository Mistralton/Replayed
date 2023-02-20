<script lang="ts">
  import type { PageData } from './$types';
  import Duelframe from '$lib/components/Duelframe.svelte';
  import ranks from '$lib/components/ranks.json';
	import { supabase } from '$lib/supabase';

  const ranksValues = ranks.map((rank) => rank.alt);

  export let data: PageData;
  export let guess: string;
  export let safeGraph: boolean;

  async function generateNewRound() {
    const update = await fetch('/api/duel', {
      method: 'PATCH',
      body: JSON.stringify([
        {
          id: data.replays[0].id,
          changes: [higher ? data.replays[0].duel_winner + 1 : data.replays[0].duel_winner, data.replays[0].total_duels + 1]
        },
        {
          id: data.replays[1].id,
          changes: [higher ? data.replays[1].duel_winner + 1 : data.replays[1].duel_winner, data.replays[1].total_duels + 1]
        }
      ])
    })
    safeGraph = true
    let { data: replays, error } = await supabase.from('replays').select().eq('game', data.title);
    let first = replays![Math.floor(Math.random() * replays!.length)];
    let remaining = replays!.filter(replay => replay.link !== first.link);
    let second = remaining[Math.floor(Math.random() * remaining.length)];
    let two_replays = [first, second];
    data.replays = two_replays
    guess = ""
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

<div class="flex flex-col items-center justify-center flex-1 relative mt-8 h-full">
  <div class="absolute top-1/4 flex flex-col items-center">
    <h2 class="text-3xl text-white font-semibold max-w-2xl text-center">Which of these two clips are higher rank?</h2>
    {#if guess}
      <button
        on:click={generateNewRound}
        class="absolute z-50 top-20 bg-stone-600 rounded-lg p-2 h-max drop-shadow border-stone-50 tracking-tighter self-center"
      >
        New Round
      </button>
    {/if}
    <div class="flex gap-16 justify-center items-center relative h-full flex-1">
      <Duelframe bind:safeGraph bind:guess replay={data.replays[0]} title={data.title} />
      <Duelframe bind:safeGraph bind:guess replay={data.replays[1]} title={data.title} />
    </div>
  </div>
  <!-- {#if guess}
    <h2 class="text-white mt-4 mb-4">Your Guess was {guess}! {higher}</h2>
  {/if} -->
</div>
