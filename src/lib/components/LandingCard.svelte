<script lang="ts">
  export let title: string;
  export let text: string;
  export let order: boolean;
</script>

<div class="mt-36 gap-16 mb-20 px-4 w-full max-w-3xl flex items-center justify-between text-white">
  {#if !order}
    <img width="500" src="clips.webp" />
  {/if}
  <div>
    <h2 class="text-2xl font-semibold">{title}</h2>
    <p class="mt-4">{text}</p>
  </div>
  {#if order}
    <img width="500" src="rankshome.webp" />
  {/if}
</div>