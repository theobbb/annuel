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
<div class="space-y-6">
	{#each sponsors as { id, name, size, logo }, i}
		<div class="group grid flex-col items-center justify-center">
			<div
				class={[
					'py-[0.15em]- flex w-fit items-center justify-center px-[0.2em] leading-[100%] transition hover:bg-accent',
					sizes[size - 1]
				]}
			>
				{name}
			</div>
			<div
				class="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-hover:grid-rows-[1fr]"
			>
				<div class="flex items-center justify-center overflow-hidden">
					<img
						class="size-64 object-contain"
						src="{PUBLIC_POCKETBASE_URL}/api/files/sponsors/{id}/{logo}"
					/>
				</div>
			</div>
		</div>
	{/each}
</div>
