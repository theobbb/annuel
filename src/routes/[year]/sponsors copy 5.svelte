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
		[1, 1],
		[5, 1],
		[2, 4],
		[5, 5],
		[1, 7],
		[3, 7],
		[4, 7],
		[6, 7]
	];
</script>

<div class="text-center-">Commanditaires</div>
<div class="grid grid-cols-7">
	{#each sponsors as { id, name, size, logo }, i}
		<div
			class="flex items-center justify-center bg-black/5"
			style="grid-column: {arr[i][0]} / span {size}; grid-row: {arr[i][1]} / span {size};
	    "
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
