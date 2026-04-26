<script lang="ts">
	import { page } from '$app/state';
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import type { SponsorsRecord } from '$lib/pocketbase.types';

	const sponsors: SponsorsRecord[] = $derived(page.data.sponsors);

	// Map your 1-3 tiers to Tailwind width classes
	// Tier 1: Smallest (approx 8 per row) -> w-1/4 to w-1/8
	// Tier 3: Largest (approx 3 per row) -> w-1/3
	const itemWidths = [
		'basis-2/5 md:basis-1/4 lg:basis-1/8', // Tier 1
		'basis-1/2 md:basis-1/3 lg:basis-1/6', // Tier 2
		'basis-4/5 md:basis-1/2 lg:basis-1/4' // Tier 3
	];

	const rotate_loop = [5, -2, 7, 14, -2, 5, 3];

	const tiers = $derived.by(() => {
		let cursor_i = 0;
		return sponsors
			.reduce(
				(acc, sponsor) => {
					const tier = acc.find((t) => t.size === sponsor.size);
					sponsor.i = cursor_i;
					cursor_i++;
					if (tier) {
						tier.children.push(sponsor);
					} else {
						acc.push({ size: sponsor.size || 1, children: [sponsor] });
					}
					return acc;
				},
				[] as { size: number; children: (SponsorsRecord & { i: number })[] }[]
			)
			.sort((a, b) => b.size - a.size);
	});
</script>

<div class="mb-16 text-center leading-snug">
	L’Annuel remercie ses précieux<br /> <span class="">commanditaires.</span> <br />
</div>

<div id="commanditaires" class="container mx-auto flex flex-col gap-10">
	{#each tiers as { size, children }}
		<div class="flex flex-wrap justify-center gap-8">
			{#each children as { id, name, logo, i }}
				<div
					class={[
						'relative flex aspect-square items-center justify-center border bg-white p-8',
						itemWidths[size - 1]
					]}
					style="transform: rotate({rotate_loop[i % rotate_loop.length]}deg);"
				>
					<div class="pointer-events-none absolute -top-4 right-0 left-0 flex justify-center">
						<div class="icon-[bi--pin] text-4xl"></div>
					</div>

					<img
						class="max-h-full max-w-full object-contain"
						src="{PUBLIC_POCKETBASE_URL}/api/files/sponsors/{id}/{logo}"
						alt={name}
					/>

					<div class="pointer-events-none absolute right-0 bottom-0 left-0 flex justify-end">
						<div class="px-3 py-1 text-sm text-muted italic backdrop-blur-xs">
							{name}
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/each}
</div>
