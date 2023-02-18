<script lang="ts">
  export let title: string;
  export let text: string;
  export let order: boolean;
</script>

<div class="mt-32 gap-16 mb-20 px-4 w-full max-w-3xl flex items-center justify-between text-white">
  {#if !order}
    <img width="450" src="https://images.unsplash.com/photo-1670272498380-eb330b61f3cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" />
  {/if}
  <div>
    <h2 class="text-2xl font-semibold">{title}</h2>
    <p class="mt-4">{text}</p>
  </div>
  {#if order}
    <img width="450" src="https://images.unsplash.com/photo-1670272498380-eb330b61f3cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" />
  {/if}
</div>