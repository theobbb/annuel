<script lang="ts">
	import { page } from '$app/state';
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import type { SponsorsRecord } from '$lib/pocketbase.types';

	const sponsors: SponsorsRecord[] = $derived(page.data.sponsors);

	// Map your 1-3 tiers to Tailwind width classes
	// Tier 1: Smallest (approx 8 per row) -> w-1/4 to w-1/8
	// Tier 3: Largest (approx 3 per row) -> w-1/3
	const itemWidths = [
		'basis-4/16 md:basis-1/4 lg:basis-1/8', // Tier 1
		'basis-4/13 md:basis-1/3 lg:basis-1/6', // Tier 2
		'basis-4/10 md:basis-1/2 lg:basis-1/4' // Tier 3
	];

	const rotate_loop = [5, -2, 7, 10, -2, -5, 3];

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

<div id="commanditaires" class="mb-12 scroll-mt-24 text-center leading-snug md:mb-16">
	L’Annuel remercie ses précieux<br /> <span class="">commanditaires.</span> <br />
</div>

<div class="mx-auto flex flex-col gap-[6vw] lg:gap-[3vw]">
	{#each tiers as { size, children }}
		<div class="flex flex-wrap justify-center gap-[6vw] lg:gap-[3vw]">
			{#each children as child, i}
				{#if child.url}
					<a
						href={child.url}
						target="_blank"
						class="no-hover link-shake block {itemWidths[size - 1]}"
						style="transform: rotate({rotate_loop[i % rotate_loop.length]}deg);"
					>
						<div class="origin-top">{@render content(child)}</div>
					</a>
				{:else}
					<div
						class={itemWidths[size - 1]}
						style="transform: rotate({rotate_loop[i % rotate_loop.length]}deg);"
					>
						{@render content(child)}
					</div>
				{/if}
			{/each}
		</div>
	{/each}
</div>

{#snippet content({
	id,
	name,
	logo,
	i
}: SponsorsRecord & {
	i: number;
})}
	<div class={[' @container relative aspect-square border bg-white ']}>
		<div class=" relative flex h-full w-full flex-col items-center justify-between">
			<div class="pointer-events-none flex -translate-y-2.5 justify-center">
				<div class="icon-[bi--pin] text-2xl"></div>
			</div>

			<div class="relative flex h-4/5 min-h-0 w-4/5 flex-1 items-center justify-center">
				<img
					class="h-full w-full object-contain"
					src="{PUBLIC_POCKETBASE_URL}/api/files/sponsors/{id}/{logo}"
					alt={name}
				/>
			</div>

			<div class="absolute- pointer-events-none right-0 bottom-0 left-0 flex justify-center">
				<div
					class="backdrop-blur-xs- px-2 py-1 text-center text-xs leading-tight text-muted italic lg:text-sm"
				>
					{name}
				</div>
			</div>
		</div>
	</div>
{/snippet}
