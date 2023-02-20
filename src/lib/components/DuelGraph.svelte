<script lang="ts">
	import { Bar } from 'svelte-chartjs'; //https://www.npmjs.com/package/svelte-chartjs
	import type { Replay } from '../db_res';
	export let replay: Replay;
	import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

	const data = {
		labels: ['Times Won', 'Times Participated'],
		datasets: [
			{
				label: '# of guesses',
				data: [replay.duel_winner, replay.total_duels],
				borderWidth: 1,
				backgroundColor: ['rgba(255, 134,159,0.4)', 'rgba(98,  182, 239,0.4)'],
				borderColor: ['rgba(255, 134, 159, 1)', 'rgba(98,  182, 239, 1)']
			}
		]
	};

	Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
</script>

<div class="w-1/2 mx-auto">
	<Bar
		{data}
		width={50}
		height={100}
		options={{
			maintainAspectRatio: false,
			indexAxis: 'y',
			plugins: { legend: { display: false } }
		}}
	/>
</div>
