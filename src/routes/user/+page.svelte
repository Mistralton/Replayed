<script lang="ts">
	import { supabase } from "$lib/supabase";
  import { onMount } from 'svelte';
  let user
  let userReplays
  onMount(async () => {
    let currUser = await supabase.auth.getUser()
    user = {
      name: currUser.data.user?.user_metadata.full_name,
      avatar: currUser.data.user?.user_metadata.avatar_url
    }
    const { data } = await supabase.from("replays").select().eq("user", user.name)
    if (data) userReplays = data
    console.log(userReplays)
  })
</script>

  <div class="flex flex-col flex-1 justify-center items-center text-white">
    {#if user}
      <h1 class="tracking-tight leading-6 text-[4rem] mb-8">
        Hello <span class="text-blue-900">{user.name}</span>
      </h1>
      <img src={user.avatar} />
      {#if userReplays && userReplays[0]}
        {#each userReplays as userReplay}
          <iframe
            width="1200"
            height="675"
            src={userReplay.link.replace('/watch?v=', '/embed/')}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            class="mx-auto mt-4"
          />
        {/each}
      {:else}
        <h2 class="mt-4">If you had replays, they would appear below!</h2>
      {/if}
    {/if}
  </div>