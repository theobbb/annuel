<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import type { YearsRecord } from '$lib/pocketbase.types';
	import type { Snippet } from 'svelte';

	const {
		footer,
		archive_history_year,
		children
	}: { footer?: boolean; archive_history_year?: string | null; children?: Snippet } = $props();

	const { year, years } = $derived(page.data);

	const archive_page = $derived(page.route.id == '/archives');

	const archive_href = $derived.by(() => {
		if (!archive_page) return `/archives`;
		return `/${page.data.years[0]?.id}`;
	});
	const root_year: string = $derived(
		page.params.year || archive_history_year || page.data.years[0]?.id
	);

	function on_close_archive(event: MouseEvent) {
		if (archive_history_year) {
			event.preventDefault();
			window.history.back();
		}
	}
</script>

<div class="grid-12 mb-3x">
	<div class="col-span-3 flex flex-col justify-between">
		<a href="/{root_year}">Annuel de design</a>
	</div>
	<div class="col-span-4">{@render children?.()}</div>
	<div class="col-span-2">
		<div class="mt-2">
			{#if !footer || !archive_page}
				{#if archive_page}
					<div class="flex flex-col gap-6">
						{#each years as year}
							<a href="/{year.id}" class="relative">
								{@render poster(year)}
								<div class="absolute -right-4 bottom-0 translate-x-full leading-6">{year.id}</div>
							</a>
						{/each}
					</div>
				{:else}
					{@render poster(year)}
				{/if}
			{/if}
			<!-- {#if footer}
				{#if !archive_page}
					{@render poster(year)}
				{/if}
			{:else if archive_page}
				{#each years as year}
					<a href="/{year.id}" class="relative">
						{@render poster(year)}
						<div class="absolute -right-4 bottom-0 translate-x-full leading-6">{year.id}</div>
					</a>
				{/each}
			{/if} -->
		</div>
	</div>
	<div class="col-span-3">
		{#if !footer || !archive_page}
			<a href={archive_href} class="flex items-center justify-end gap-1" onclick={on_close_archive}>
				Archives
				<div
					class={[
						archive_page ? 'icon-[ri--contract-up-down-line]' : 'icon-[ri--expand-up-down-line]',
						' text-3xl- translate-y-0.5'
					]}
				></div>
			</a>
		{/if}
	</div>
</div>

{#snippet poster(year: YearsRecord)}
	<div class="aspect-3/4 w-full bg-placeholder">
		{#if year?.poster}
			<img
				class="aspect-3/4 object-contain"
				src="{PUBLIC_POCKETBASE_URL}/api/files/years/{year.id}/{year.poster}"
				alt="poster-{year.id}"
			/>
		{/if}
	</div>
{/snippet}
