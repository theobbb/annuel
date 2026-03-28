<script lang="ts">
	import { page } from '$app/state';
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import { pocketbase } from '$lib/pocketbase';
	import type { SponsorsRecord } from '$lib/pocketbase.types';
	import Title from '$lib/ui/components/title.svelte';
	import SponsorFile from './sponsor-file.svelte';

	const sponsors: SponsorsRecord[] = $derived(page.data.sponsors);

	const sizes = ['w-[8vw] p-[1vw]', 'w-[15vw] p-[2vw]', 'w-[28vw] p-[4vw]'];

	//grid-area: row-start / col-start / row-end / col-end
	const arr = [
		[1, 1, 2, 4],
		[2, 2, 3, 5],
		[3, 1, 4, 4],
		[4, 1, 5, 1],
		[5, 1, 6, 1],
		[6, 1, 7, 1],
		[7, 1, 8, 1],
		[8, 1, 9, 1]
	];
</script>

<div class="text-center-">Commanditaires</div>
<div class="mx-100 grid grid-cols-5 divide-x divide-y border" style="grid-auto-flow: dense;">
	{#each sponsors as { id, name, size, logo }, i}
		<div
			class="flex items-center justify-center bg-black/5"
			style="grid-area: {arr[i][0]} / {arr[i][1]} / {arr[i][2]} / {arr[i][3]};"
		>
			<!-- <SponsorFile url="{PUBLIC_POCKETBASE_URL}/api/files/sponsors/{id}/{logo}" /> -->
			<img
				class={['shadow-xl-   p-8 ']}
				src="{PUBLIC_POCKETBASE_URL}/api/files/sponsors/{id}/{logo}"
			/>
		</div>

		<!-- <div>{name}</div> -->

		<!-- <div class="col-span-3">
			{name}
		</div> -->
	{/each}
</div>
