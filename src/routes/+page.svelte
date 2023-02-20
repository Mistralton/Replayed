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
  <div class="flex justify-center items-center gap-16">
    <div>
      <h1 class="text-8xl text-white tracking-tight font-semibold drop-shadow-md text-center mb-4">
        Replayed
      </h1>
      <p class="text-2xl text-white font-thin text-center mb-8">Rise to the top, one replay at a time.</p>
      <div class="flex gap-16 justify-center w-full">
        <button class="p-2 bg-stone-600 rounded-lg">
          <a href="/choose">Get Started</a>
        </button>
        <button class="p-2 bg-stone-600 rounded-lg">
          <a href="/choose">Upload a Clip</a>
        </button>
      </div>
    </div>
    <video width="500" autoplay controls muted src="test1.mp4" />
  </div>
  <LandingCard order={true} title={"Choose Your Game"} text={"From MOBAs like League of Legends, to FPS games like Valorant, our website supports a variety of different games to choose from."}/>
  <LandingCard order={false} title={"Upload Your Best (Or Worst) Clips"} text={"Watch, guess, and comment on the ranks of replay clips you notice and see how you match up against other guessers."}/>
  <LandingCard order={true} title={"Made For People Who Solo Bolo or Duo Queue"} text={"Judge one clip at a time in our single player mode or test your skills and compare the ranks of two clips at the same time in our duels mode!"}/>
</div>


<style lang="postcss">
  :global(html) {
    background-color: theme(colors.gray.100);
  }
</style>