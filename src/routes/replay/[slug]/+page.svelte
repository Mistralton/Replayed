<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div class="flex flex-col">
  <p>{data.title}</p>
	<h1 class="text-white text-center p-10">Submitted by _____</h1>
	<video controls class="mx-auto" width="1200">
		<source src="test1.mp4" type="video/mp4" />
	</video>
	<p class="text-white" />
	<div id="" class="flex justify-evenly">
		<div class="flex flex-col">
			<img src="loliron.webp" alt="iron" class="h-20 mx-auto" />
			<h2 class="text-white text-center">Iron</h2>
		</div>

		<div>
			<img src="lolbronze.webp" alt="bronze" class="h-20 mx-auto" />
			<h2 class="text-white text-center">Bronze</h2>
		</div>

		<div>
			<img src="lolsilver.webp" alt="silver" class="h-20 mx-auto" />
			<h2 class="text-white text-center">Silver</h2>
		</div>

		<div>
			<img src="lolgold.webp" alt="gold" class="h-20 mx-auto" />
			<h2 class="text-white text-center">Gold</h2>
		</div>

		<div>
			<img src="lolplat.webp" alt="plat" class="h-20 mx-auto" />
			<h2 class="text-white text-center">Plat</h2>
		</div>

		<div>
			<img src="loldia.webp" alt="diamond" class="h-20 mx-auto" />
			<h2 class="text-white text-center">Diamond</h2>
		</div>

		<div>
			<img src="lolmas.webp" alt="master" class="h-20 mx-auto" />
			<h2 class="text-white text-center">Master</h2>
		</div>

		<div>
			<img src="lolgm.webp" alt="grand master" class="h-20 mx-auto" />
			<h2 class="text-white text-center">Grandmaster</h2>
		</div>

		<div>
			<img src="lolchal.webp" alt="challenger" class="h-20 mx-auto" />
			<h2 class="text-white text-center">Master</h2>
		</div>
	</div>
</div>
