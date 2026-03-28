<script lang="ts">
	import { page } from '$app/state';
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import { pocketbase } from '$lib/pocketbase';
	import type { SponsorsRecord } from '$lib/pocketbase.types';
	import Title from '$lib/ui/components/title.svelte';
	import SponsorFile from './sponsor-file.svelte';

	const sponsors: SponsorsRecord[] = $derived(page.data.sponsors);

	const sizes = ['w-[8vw] p-[1vw]', 'w-[15vw] p-[2vw]', 'w-[28vw] p-[4vw]'];

	const arr = [2, 4, 1, 6, 3, 2, 2, 2, 2];
</script>

<div class="text-center-">Commanditaires</div>
<div class="divide-x- divide-y- mx-100 grid grid-cols-5 border" style="grid-auto-flow: dense;">
	{#each sponsors as { id, name, size, logo }, i}
		<div
			class="flex items-center justify-center border"
			style="grid-column: span {size} / span {size}; "
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
