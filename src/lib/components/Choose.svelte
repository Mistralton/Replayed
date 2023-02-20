<script lang="ts">
  let game: string;
	let popout: HTMLDivElement;
	function hidePopper(passGame?: string) {
		popout.classList.toggle('hidden');
		if (passGame) game = passGame;
	}
</script>

<div class="flex flex-1 items-center z-0">
  <div class="h-max flex flex-col items-center relative">
    <div class="p-4 w-1/3 flex flex-col">
      <p class="text-white text-center text-2xl font-semibold tracking-tigher mb-0">
        Choose Your Game
      </p>
    </div>
    <div class="grid grid-cols-3">
      <img
        on:keydown={() => hidePopper('valorant')}
        on:click={() => hidePopper('valorant')}
        alt="Valorant"
        class="p-4 hover:scale-110 hover:cursor-pointer z-10 ease-out duration-500"
        src="Valorant.png"
      />
      <img
        on:keydown={() => hidePopper('League of Legends')}
        on:click={() => hidePopper('League of Legends')}
        alt="League of Legends"
        class="p-4 hover:scale-110 hover:cursor-pointer z-10 ease-out duration-500"
        src="League.png"
      />
      <img
        on:keydown={() => hidePopper('overwatch')}
        on:click={() => hidePopper('overwatch')}
        alt="Overwatch 2"
        class="p-4 hover:scale-110 hover:cursor-pointer z-10 ease-out duration-500"
        src="Overwatch 2.png"
      />
    </div>
    <div
      bind:this={popout}
      role="dialog"
      aria-modal="true"
      on:keydown={() => hidePopper()}
      on:click={() => hidePopper()}
      class="hidden z-20 absolute w-full h-full bg-[#000000e1]"
    >
      <div class="flex flex-col w-full h-full items-center justify-center">
        <p class="text-white text-lg">X</p>
        <div
          class="flex w-full items-center justify-center m-auto opacity-100 text-white gap-16 text-center"
        >
          <a
            class="rounded-lg bg-stone-500 min-w-[100px] hover:bg-stone-400 transition-colors duration-500"
            href={`/replay/${game}`}>Traditional</a
          >
          <a
            class="rounded-lg bg-stone-500 min-w-[100px] hover:bg-stone-400 transition-colors duration-500"
            href={`/duel/${game}`}>Duel</a
          >
        </div>
      </div>
    </div>
  </div>
</div>