<script lang="ts">
	import { page } from '$app/state';
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import { pocketbase } from '$lib/pocketbase';
	import type { SponsorsRecord } from '$lib/pocketbase.types';
	import Title from '$lib/ui/components/title.svelte';
	import SponsorFile from './sponsor-file.svelte';

	const sponsors: SponsorsRecord[] = $derived(page.data.sponsors);

	$inspect(sponsors);
	const sizes = ['w-[8vw] p-[1vw]', 'w-[15vw] p-[2vw]', 'w-[28vw] p-[4vw]'];
</script>

<div class="text-center-">Commanditaires</div>
<div class="grid grid-cols-9 gap-8">
	{#each sponsors as { id, name, size, logo }}
		<div class="bg-background-2- col-span-2 flex aspect-square items-center justify-center">
			<div class={[]}>
				<!-- <SponsorFile url="{PUBLIC_POCKETBASE_URL}/api/files/sponsors/{id}/{logo}" /> -->
				<img
					class={['shadow-xl- h-full w-64 p-4 ']}
					src="{PUBLIC_POCKETBASE_URL}/api/files/sponsors/{id}/{logo}"
				/>
				{name}
			</div>
		</div>
		<!-- <div class="col-span-3">
			{name}
		</div> -->
	{/each}
</div>
