<script lang="ts">
    import ranks from "./ranks.json"
    export let guess
    export let guessRank
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