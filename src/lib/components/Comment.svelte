<script lang="ts">
	import { supabase } from "$lib/supabase";
  export let position = "none"
  export let comments = []
  export let id: number
  let textareaValue = ""
  async function handleSubmit(event, oldComments) {
    event.preventDefault()
    const newComment = {date: new Date(Date.now()).toLocaleString(), text: textareaValue}
    console.log(id)
    const subscription = supabase
      .channel('any')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'replays' }, (payload) => {
        if(payload.new.id === id && payload.new.comments !== comments) {
          comments = payload.new.comments
        }
      })
      .subscribe()
    const update = await fetch('/api/comment', {
      method: 'PATCH',
      body: JSON.stringify({
        id: id, comments: oldComments ? [...oldComments, newComment] : [newComment]
      })
    })
    return(() => subscription.unsubscribe())
  }
</script>

<div class={`flex flex-col items-center flex-1 gap-4 ${position === "single" ? "mb-24" : "mt-40 absolute top-3/4"}  w-[34rem]`}>
  <form class="w-full" on:submit={(e) => handleSubmit(e, comments)}>
    <textarea
      class="p-2 w-full h-14 rounded-md scrollbar-hide"
      placeholder="Give your thoughts on this play"
      bind:value={textareaValue}
    />
    <button class="rounded-md bg-stone-600 p-1 mt-2" type="submit">Submit</button>
  </form>
  {#if comments}
    {#each comments as comment}
      <div class="flex gap-4 text-white">
        <div class="w-40">
          <p>Username</p>
          <p>{comment.date}</p>
        </div>
        <div class="w-96">
          {comment.text}
        </div>
      </div>
    {/each}
  {/if}
</div>