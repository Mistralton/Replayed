<script>
	import Footer from "$lib/components/Footer.svelte";
	import Navbar from "$lib/components/Navbar.svelte";
  import "../app.css";
</script>

<div class="bg-stone-900 overflow-x-hidden p-0 m-0">
	<main class="min-h-screen min-w-screen flex flex-col">
		<Navbar />
		<slot />
		<!-- <Footer /> -->
	</main>
</div>