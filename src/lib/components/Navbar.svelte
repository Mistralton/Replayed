<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { signedStatus } from '../../stores/stores';
	let login: HTMLDivElement;
</script>

<nav class="flex-initial w-full flex justify-between bg-stone-600 h-10">
	<p class="p-2 ml-4">Replayed</p>
	<div class="p-2 mr-4 relative">
		{#if $signedStatus}
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
