<script lang="ts">
	import { page } from '$app/state';
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import { pocketbase } from '$lib/pocketbase';
	import type { SponsorsRecord } from '$lib/pocketbase.types';
	import Title from '$lib/ui/components/title.svelte';
	import SponsorFile from './sponsor-file.svelte';

	const sponsors: SponsorsRecord[] = $derived(page.data.sponsors);

	const sizes = ['w-[8vw] p-[1vw]', 'w-[15vw] p-[2vw]', 'w-[28vw] p-[4vw]'];

	const blank_areas = [
		[1, 1, 4, 5],
		[2, 2, 4, 5]
	];
	//grid-area: row-start / col-start / row-end / col-end
</script>

<div class="text-center-">Commanditaires</div>
<div class="mx-100 grid grid-cols-7 divide-x divide-y border" style="grid-auto-flow: dense;">
	{#each blank_areas as area}
		<div style="grid-area: {area[0]} / {area[2]} / {area[1]} / {area[3]};"></div>
	{/each}
	<div class="col-span-2 col-start-4"></div>
	{#each sponsors as { id, name, size, logo }, i}
		<div
			class="relative flex items-center justify-center bg-black/5"
			style="grid-column: span {size} / span {size}; grid-row: span {size} / span {size}; "
		>
			<!-- <SponsorFile url="{PUBLIC_POCKETBASE_URL}/api/files/sponsors/{id}/{logo}" /> -->
			<img
				class={['shadow-xl-   p-8 ']}
				src="{PUBLIC_POCKETBASE_URL}/api/files/sponsors/{id}/{logo}"
			/>
			<div class="absolute top-0 right-0 z-10">
				{i}
			</div>
		</div>

		<!-- <div>{name}</div> -->

		<!-- <div class="col-span-3">
			{name}
		</div> -->
	{/each}
</div>
