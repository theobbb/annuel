<script lang="ts">
	import { page } from '$app/state';
	import type { YearsRecord } from '$lib/pocketbase.types';
	import type { Snippet } from 'svelte';

	const { footer, children }: { footer?: boolean; children?: Snippet } = $props();

	const { year, years } = $derived(page.data);

	const archive_page = $derived(page.route.id == '/archives');

	const from_callback = $derived(page.url.searchParams.get('from') || '');

	const year_href = $derived.by(() => {
		if (!archive_page) return '/archives';
		if (from_callback) return decodeURIComponent(from_callback);
		return `/${year}`;
	});
</script>

<div class="grid-12 mb-3x">
	<div class="col-span-7 flex flex-col justify-between">
		<a href="/{year}">Annuel de design</a>

		<div>{@render children?.()}</div>
	</div>
	<div class="col-span-2">
		{#if !footer || !archive_page}
			{#if archive_page}
				<div class="flex flex-col gap-6">
					{#each years as year}
						<a href="/{year.id}">{@render poster(year)}</a>
					{/each}
				</div>
			{:else}
				{@render poster(year)}
			{/if}
		{/if}
	</div>
	<div class="col-span-3">
		{#if !footer || !archive_page}
			<a href={year_href} class="flex items-center justify-end gap-1">
				Archives
				<div
					class={[
						archive_page ? 'icon-[ri--contract-up-down-line]' : 'icon-[ri--expand-up-down-line]',
						' translate-y-0.5 text-3xl'
					]}
				></div>
			</a>
		{/if}
	</div>
</div>

{#snippet poster(year: YearsRecord)}
	<div class="relative">
		<div class="aspect-3/4 w-full bg-placeholder"></div>
		<div class="absolute -right-4 bottom-0 translate-x-full leading-6">{year.id}</div>
	</div>
{/snippet}
