<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { z } from 'zod';
	import { modal, signedStatus } from '../../stores/stores';
	import UploadModal from './UploadModal.svelte';
	import { replayInfo, replayInsert } from './UploadReplay';
	let login: HTMLDivElement;
	let games = z.enum(['valorant', 'league of legends', 'overwatch'])
	const valorantRanks = z.enum([
		'iron',
		'bronze',
		'silver',
		'gold',
		'platinum',
		'diamond',
		'immortal',
		'radiant'
	]);
	const lolRanks = z.enum([
		'iron',
		'bronze',
		'silver',
		'gold',
		'platinum',
		'diamond',
		'master',
		'grandmaster',
		'challenger'
	]);
	const owRanks = z.enum([
		'bronze',
		'silver',
		'gold',
		'platinum',
		'diamond',
		'master',
		'grandmaster',
		'top 500',
		'top500'
	]);
	const youtubeRegex =
		/^https?:\/\/(?:www\.)?youtube(?:-nocookie)?\.com\/(?:[^/]+\/.+\/|(?:v|embed)\/|watch\?v=)([^/?&]{11})/;
	const youtubeLink = z.string().refine(
		(val) => {
			return youtubeRegex.test(val);
		},
		{ message: 'Invalid YouTube link' }
	);
	let game = '';
	let rank = '';
	let link = '';

	function getRankSchema(game: string) {
		switch (game.toLowerCase()) {
			case 'valorant':
				return valorantRanks;
			case 'league of legends':
				return lolRanks;
			case 'overwatch':
				return owRanks;
			default:
				throw new Error('Unsupported game');
		}
	}

	function validateRank(game: string, rank: string) {
		if (game === 'top 500') game = 'top500';
		const rankSchema = getRankSchema(game);
		rankSchema.parse(rank);
	}

	let errorMsg: string;
</script>

<nav class="flex-initial w-full flex items-center justify-between bg-stone-600 h-14">
	<div class="flex gap-16 p-2 ml-4">
		<a href="/" class="hover:text-white">Replayed</a>
		<a href="/about" class="hover:text-white">About</a>
		<p
			on:keydown={() => modal.set(true)}
			on:click={() => modal.set(true)} class="hover:cursor-pointer hover:text-white">
			Upload a Clip
		</p>
	</div>
	{#if $modal}
		<UploadModal on:close={() => ($modal = false)}>
			<h2 slot="header">Upload Your Clip</h2>
			<form
				class="h-48 flex flex-col"
				on:submit={async (e) => {
					try {
						if (game.toLowerCase() === "league") game = "league of legends"
						games.parse(game.toLowerCase());
						validateRank(game, rank.toLowerCase());
						youtubeLink.parse(link);
						youtubeLink.parse(link)
						if (link.includes('&')) {
							const splitLink = link.split('&')
							link = splitLink[0]
						}
						rank = rank.charAt(0).toUpperCase() + rank.substring(1).toLowerCase();
						game = game.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
						game = game.replace('Of', 'of')
						let newObj = await replayInfo(game, rank, link);
						const a = await replayInsert(newObj);
					} catch (err) {
						errorMsg = "Something went wrong inputting your form."
					}
				}}
			>
				<input
					class="border-2 border-black rounded-sm my-2 p-1"
					placeholder="Enter your game"
					required
					bind:value={game}
				/>
				<input
					class="border-2 border-black rounded-sm my-2 p-1"
					placeholder="Enter your rank"
					required
					bind:value={rank}
				/>
				<input
					class="border-2 border-black rounded-sm my-2 p-1"
					placeholder="Enter your link"
					required
					bind:value={link}
				/>
				{#if $signedStatus}
					<button class="my-2 p-1 bg-stone-600 rounded-lg">Upload</button>
				{/if}
				{#if !$signedStatus}
					<button class="disabled:bg-opacity-50 my-2 p-1 bg-stone-600 rounded-lg" disabled
						>You must be logged in</button
					>
				{/if}
				{#if errorMsg}
				<p class="text-red-500" style="font-size: 0.8rem; margin-top: 0.5rem;">
					{errorMsg}
				</p>
				<p>
					Valorant (or League, Overwatch)
				</p>
				<p>
					Radiant (right ranks for game)
				</p>
				<p>
					Real Youtube Link
				</p>
				{/if}
			</form>
		</UploadModal>
	{/if}
	<div class="flex gap-16 p-2 mr-4 relative">
		{#if $signedStatus}
			<a href="/user" class="hover:text-white">Profile</a>
			<button on:click={async () => supabase.auth.signOut()} class="hover:text-white"
				>Log Out</button
			>
		{:else}
			<button
				on:click={() => {
					login.classList.toggle('hidden');
					login.classList.toggle('flex flex-col');
				}}
				class="hover:text-white">Login</button
			>
			<div
				bind:this={login}
				class="hidden flex flex-col absolute mt-4 bg-stone-500 p-3 right-0 w-max gap-4"
			>
				<button
					on:click={async () => {
						await supabase.auth.signInWithOAuth({
							provider: 'discord'
						});
					}}
					>Login with Discord
				</button>
				<button
					on:click={async () => {
						await supabase.auth.signInWithOAuth({
							provider: 'twitch'
						});
					}}
					>Login with Twitch
				</button>
			</div>
		{/if}
	</div>
</nav>
