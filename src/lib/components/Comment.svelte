<script lang="ts">
  export let comments
</script>

<div class="flex flex-col items-center flex-1 gap-4 mt-40">
  <textarea class="p-2 w-full h-14 rounded-md scrollbar-hide" placeholder="Give your thoughts on this play" />
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
</div>