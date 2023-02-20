<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { modal, signedStatus } from '../../stores/stores';
  import UploadModal from './UploadModal.svelte'
  import { replayInfo, replayInsert } from "./UploadReplay";
	let login: HTMLDivElement;
  let game = "";
  let rank = "";
  let link = "";
</script>

<nav class="flex-initial w-full flex justify-between bg-stone-600 h-10">
	<div class="flex gap-16 p-2 ml-4">
    <a href="/">Replayed</a>
    <a href="/about">About</a>
    <p on:click={() => modal.set(true)}>Upload a Clip</p>
  </div>
  {#if $modal}
    <UploadModal on:close="{() => $modal = false}">
      <h2 slot="header">
        Upload Your Clip
      </h2>
      <form class="h-36 flex flex-col" on:submit={async (e) => {
        let newObj = await replayInfo(game, rank, link);
        const a = await replayInsert(newObj)

        }}>
        <input class="border-2 border-black rounded-sm my-2" placeholder="Enter your game" required bind:value={game}/>
        <input class="border-2 border-black rounded-sm my-2" placeholder="Enter your rank" required bind:value={rank}/>
        <input class="border-2 border-black rounded-sm my-2" placeholder="Enter your link" required bind:value={link}/>
        {#if $signedStatus}
          <button class="my-2 p-1 bg-stone-600 rounded-lg">Upload</button>
        {/if}
        {#if !$signedStatus}
          <button class="disabled:bg-opacity-50 my-2 p-1 bg-stone-600 rounded-lg" disabled>You must be logged in</button>
        {/if}
      </form>
    </UploadModal>
   {/if}
	<div class="flex gap-16 p-2 mr-4 relative">
		{#if $signedStatus}
      <a href="/about">Profile</a>
      <button on:click={async () => supabase.auth.signOut()}>Log Out</button>
		{:else}
      <button
        on:click={() => {
          login.classList.toggle('hidden');
          login.classList.toggle('flex flex-col');
        }}>Login</button
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
