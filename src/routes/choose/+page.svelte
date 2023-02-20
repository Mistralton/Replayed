<script lang="ts">
	let game: string;
	let popout: HTMLDivElement;
	function hidePopper(passGame?: string) {
		console.log(passGame);
		popout.classList.toggle('hidden');
		if (passGame) game = passGame;
	}
</script>

<div class="items-center flex flex-col flex-1">
	<div class="absolute flex justify-evenly w-full">
		<div class="p-10 w-1/3 flex flex-col justify-center">
			<input class="mx-auto p-2" placeholder="Search User..." />
			<div class="mx-auto pr-10 pt-2 flex">
				<img src="fire.png" alt="fire" class="w-10" />
				<button class="text-black bg-white border-2 border-stone-500 w-32">Trending</button>
			</div>
		</div>
		<div class="p-10 w-1/3 flex justify-center">
			<div class="bg-white h-20 rounded-lg w-16 h-16">profile icon</div>
		</div>
		<div />
	</div>
	<div class="flex flex-1 items-center">
		<div class="h-max flex flex-col items-center relative">
			<div class="p-4 w-1/3 flex flex-col">
				<p class="text-white text-center text-2xl font-semibold tracking-tigher mb-0">
					Choose Your Game
				</p>
			</div>
			<div class="grid grid-cols-3">
				<img
					on:click={() => hidePopper('valorant')}
					class="p-4 hover:scale-110 hover:cursor-pointer z-10 ease-out duration-500"
					src="Valorant.png"
				/>
				<img
					on:click={() => hidePopper('league')}
					class="p-4 hover:scale-110 hover:cursor-pointer z-10 ease-out duration-500"
					src="League.png"
				/>
				<img
					on:click={() => hidePopper('overwatch')}
					class="p-4 hover:scale-110 hover:cursor-pointer z-10 ease-out duration-500"
					src="Overwatch 2.png"
				/>
			</div>
			<div
				bind:this={popout}
				role="dialog"
				aria-modal="true"
				on:click={() => hidePopper()}
				class="hidden z-20 absolute w-full h-full bg-[#000000e1]"
			>
				<div class="flex flex-col w-full h-full items-center justify-center">
					<p class="text-white text-lg">X</p>
					<div class="flex w-full items-center justify-center m-auto opacity-100 text-white gap-16">
						<button
							class="rounded-lg bg-stone-500 min-w-[100px] p-2 hover:bg-stone-400 transition-colors duration-500"
						>
							<a href={`/replay/${game}`}>Traditional</a>
						</button>
						<button
							class="rounded-lg bg-stone-500 min-w-[100px] p-2 hover:bg-stone-400 transition-colors duration-500"
						>
							<a href="/duel">Duel</a>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
