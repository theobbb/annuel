<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import Header from '$lib/ui/components/header.svelte';
	import Image from '$lib/ui/components/media/image.svelte';

	const { data } = $props();

	let last_history_year: string | null = $state(null);

	afterNavigate(({ from }) => {
		if (from) last_history_year = from.params?.year || null;
	});

	const getModifiedUrl = (targetYear: string) => {
		const fromParam = page.url.searchParams.get('from');

		if (fromParam) {
			try {
				const url = new URL(fromParam);
				const paths = url.pathname.split('/').filter(Boolean);

				// Assuming the structure is /[year]/[rest-of-path]
				// We replace the first segment (the year) with the new targetYear
				if (paths.length > 0) {
					paths[0] = targetYear;
					url.pathname = `/${paths.join('/')}`;
				}

				return url.toString();
			} catch (e) {
				return `/${targetYear}`;
			}
		}

		// Fallback if no "from" param exists
		return `/${targetYear}`;
	};
</script>

<Header>
	<a
		class="col-span-4 col-start-9 row-start-1 text-right sm:col-span-4 sm:col-start-9 sm:row-start-2 lg:col-span-1 lg:col-start-10 lg:row-start-1"
		href="/{last_history_year || page.data.years[0]?.id}"
	>
		Archives (-)
	</a>
</Header>

<div class="grid-10 mt-24">
	{#each data.years as year}
		<a class="col-span-5 -col-end-1 lg:col-span-2 lg:-col-end-1" href={getModifiedUrl(year.id)}>
			{#if year.poster}
				<Image
					collection="years"
					record_id={year.id}
					filename={year.poster}
					class="h-full w-full object-contain"
					alt="poster-{year.id}"
					sizes="400x0,800x0,1200x0"
				/>
			{:else}
				<div class="aspect-2/3 inset-ring"></div>
			{/if}
		</a>
	{/each}
	{#if data.years.length == 1}
		<div class="col-span-5 -col-end-1 mt-8 lg:col-span-2 lg:-col-end-1">Plus d’années à venir!</div>
	{/if}
</div>

<svelte:head>
	<title>Annuel de design — Archives</title>
	<meta
		name="description"
		content="Les projets des finissant.es de l’école de design de l’UQAM — Archives"
	/>
</svelte:head>
