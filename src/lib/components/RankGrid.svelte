  <script lang="ts">
	  import { onMount } from 'svelte';
    import ranks from "./ranks.json"
    import {newGuesses, patchGuesses} from "./UpdatedGuesses"
    export let guess
    export let guessRank
    export let replay: any
    const id = replay.id;
    const oldGuesses = replay.guesses;

  </script>
  
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
          on:click={async (e) => {
            if (e && e.target) {
              guess = true;
              guessRank = e.target.alt;
              const a = newGuesses(guessRank, oldGuesses);
              const b = await patchGuesses(id, a);
              console.log(b)
            }
          }}
        />
      {/each}
    </div>
  </div>