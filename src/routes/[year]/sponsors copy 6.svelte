<script lang="ts">
	import { page } from '$app/state';
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import { pocketbase } from '$lib/pocketbase';
	import type { SponsorsRecord } from '$lib/pocketbase.types';
	import Title from '$lib/ui/components/title.svelte';
	import SponsorFile from './sponsor-file.svelte';

	const sponsors: SponsorsRecord[] = $derived(page.data.sponsors);

	const sizes = [
		'text-[1.2vw] tracking-[-1%]',
		'text-[2.5vw] tracking-[-2%]',
		' text-[4vw]  tracking-[-4%] '
	];

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

<div class="mb-5 text-center">❤️ Commanditaires ❤️</div>
<div class="justify-center- flex flex-col gap-6">
	{#each sponsors as { id, name, size, logo }, i}
		<div class="flex items-center justify-center">
			<div
				class={[
					'peer py-[0.15em]- flex w-fit items-center justify-center px-[0.2em] leading-[100%] transition hover:bg-accent',
					sizes[size - 1]
				]}
			>
				<!-- <SponsorFile url="{PUBLIC_POCKETBASE_URL}/api/files/sponsors/{id}/{logo}" /> -->
				{name}
			</div>
			<div
				class="pointer-events-none fixed inset-32 flex items-center justify-center transition not-peer-hover:opacity-0"
			>
				<img src="{PUBLIC_POCKETBASE_URL}/api/files/sponsors/{id}/{logo}" />
			</div>
		</div>

		<!-- <div>{name}</div> -->

		<!-- <div class="col-span-3">
			{name}
		</div> -->
	{/each}
</div>
