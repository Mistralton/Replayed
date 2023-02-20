<script lang="ts">
	import { Bar } from 'svelte-chartjs';
	import ranks from '../../assets/ranks.json';
	import type { Replay } from '../db_res';
	export let replay: Replay;
	import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

	const rankNames = ranks.filter((rank) => rank.game === replay.game).map((rank) => rank.alt);

	const guesses: { rank: string; guesses: number; }[] = replay.guesses;

	guesses.sort((a: { rank: string; guesses: number; }, b: { rank: string; guesses: number; }) => {
		const indexA = rankNames.indexOf(a.rank);
		const indexB = rankNames.indexOf(b.rank);
		return indexA - indexB;
	});
	const replayGuesses = guesses.map((guess) => guess.guesses);
	const replayGuessRanks = guesses.map((guess) => guess.rank);

	const data = {
		labels: replayGuessRanks,
		datasets: [
			{
				label: '# of guesses',
				data: replayGuesses,
				borderWidth: 1,
				backgroundColor: [
					'rgba(255, 134,159,0.4)',
					'rgba(98,  182, 239,0.4)',
					'rgba(255, 218, 128,0.4)',
					'rgba(113, 205, 205,0.4)',
					'rgba(170, 128, 252,0.4)',
					'rgba(255, 177, 101,0.4)'
				],
				borderColor: [
					'rgba(255, 134, 159, 1)',
					'rgba(98,  182, 239, 1)',
					'rgba(255, 218, 128, 1)',
					'rgba(113, 205, 205, 1)',
					'rgba(170, 128, 252, 1)',
					'rgba(255, 177, 101, 1)'
				]
			}
		]
	};

	Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
</script>

<div class="w-1/2 mx-auto mb-8">
	<Bar {data} width={50} height={500} options={{ maintainAspectRatio: false }} />
</div>
