<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import Header from '$lib/ui/components/header.svelte';

	const { data } = $props();

	let last_history_year: string | null = $state(null);

	afterNavigate(({ from }) => {
		if (from) last_history_year = from.params?.year || null;
	});
</script>

<Header>
	<a
		class="col-span-4 col-start-9 row-start-1 text-right sm:col-span-4 sm:col-start-9 sm:row-start-2 lg:col-span-1 lg:col-start-10 lg:row-start-1"
		href="/{last_history_year || page.data.years[0]?.id}"
	>
		Archives
	</a>
</Header>

<div class="grid-10 mt-24">
	{#each data.years as year}
		<a class="-col-end-1" href="/{year.id}">
			<div class="aspect-4/5 bg-placeholder"></div>
		</a>
		<!-- {year.id} -->
	{/each}
</div>
