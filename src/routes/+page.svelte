<script lang="ts">
	import LandingCard from "$lib/components/LandingCard.svelte";
import { supabase } from "$lib/supabase";
  import { onMount } from "svelte";
	import { signedStatus } from "../stores/stores";
  onMount(async () => {
    const { data: session, error: sessionerror } = await supabase.auth.getSession();
    console.log(session)
    if (session.session) {
      signedStatus.set(true);
    }
  })
</script>

<div class="flex flex-col justify-center items-center flex-1 mt-[20vh]">
  <h1 class="text-8xl text-white tracking-tight font-semibold drop-shadow-md text-center mb-4">
    Replayed
  </h1>
  <p class="text-2xl text-white font-thin text-center mb-8">Rise to the top, one replay at a time.</p>
  <button class="p-2 bg-stone-600 rounded-lg">
    <a href="/choose">Get Started</a>
  </button>
  <LandingCard order={true} title={"Choose Your Game"} text={"Watch, guess, and comment on replays from games like League of Legends, Valorant, and Overwatch."}/>
  <LandingCard order={false} title={"Choose Your Game"} text={"Watch, guess, and comment on replays from games like League of Legends, Valorant, and Overwatch."}/>
  <LandingCard order={true} title={"Choose Your Game"} text={"Watch, guess, and comment on replays from games like League of Legends, Valorant, and Overwatch."}/>
</div>


<style lang="postcss">
  :global(html) {
    background-color: theme(colors.gray.100);
  }
</style>