<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import Members from './members.svelte';
	import Programs from './programs.svelte';
	import Sponsors from './sponsors.svelte';
	import { use_intersection_observer } from '$lib/utils/intersection-observer.js';

	import Header from '$lib/ui/components/header.svelte';
	import Banner from '$lib/ui/components/banner.svelte';
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

	const { data } = $props();
	const { programs, program_types, program_stats, n_projects, n_students, year } = $derived(data);

	const buttons = $derived([
		{ name: 'Projets', param: 'projets', n: n_projects },
		{ name: 'Finissant.e.s', param: 'finissant-e-s', n: n_students }
	]);

	let scroll_top = $state(false);
	let sentinel: HTMLDivElement;

	function on_intersect(entry: IntersectionObserverEntry) {
		// entry.isIntersecting === true  -> Sentinel is visible (User is at the TOP)
		// entry.isIntersecting === false -> Sentinel is hidden (User has SCROLLED DOWN)

		if (entry.isIntersecting) {
			scroll_top = true;
		} else {
			scroll_top = false;
		}
	}

	onMount(() => {
		if (!sentinel) return;
		const cleanup_observer = use_intersection_observer(sentinel, on_intersect, {
			root: null, // Use the browser viewport
			rootMargin: '0px', // Trigger exactly at the edge
			threshold: [0, 1] // Trigger when the first/last pixel enters/leaves
		});

		return cleanup_observer;
	});
</script>

<!-- <Banner banner={data.globals.banner} /> -->
<Header>
	<a
		class="col-span-4 col-start-9 row-start-1 text-right sm:col-span-4 sm:col-start-9 sm:row-start-2 lg:col-span-2 lg:col-start-11 lg:row-start-1"
		href="/archives"
	>
		Archives
	</a>

	<div
		class="col-span-8 col-start-3 row-span-3 row-start-3 max-lg:mt-8 sm:col-span-6 sm:col-start-4 md:col-span-4 md:col-start-5 lg:col-span-2 lg:col-start-9 lg:row-start-1"
	>
		<div class="aspect-2/3 bg-placeholder">
			<img
				class="h-full w-full"
				src="{PUBLIC_POCKETBASE_URL}/api/files/years/{year.id}/{year.poster}"
			/>
		</div>
	</div>
	<div
		class="text-2xl- text-3xl/9- lg:row-start-4- col-span-full row-start-3 text-balance lg:col-span-5 lg:col-start-1 lg:text-3xl"
	>
		Les projets des finissant.es <br /> de l’École de design <br /> de l’UQAM.
		<!-- Les projets présentés par les finissant.es <br /> de l’École de design de l’UQAM, <br />
		révélant la richesse des démarches <br /> et la diversité des approches en design. -->

		<!-- L’Annuel de design est une exposition présentant les projets des
		finissantes et finissants de l’école de design de l’UQAM, mettant en lumière la diversité des
		démarches et des approches en design. -->
	</div>
</Header>

<div class="grid-12 mt-48">
	<div class="col-span-6 col-start-4 aspect-video bg-placeholder">
		<div class="-mx-3x- aspect-video bg-placeholder"></div>
	</div>
	<div class="col-span-2 my-1x flex items-end text-sm/4 text-muted">
		Vidéo par Kathrynf Mills, George Miller, Heather Ruiz, Christina Griffith
	</div>
</div>

<div class="mt-48 mb-64">
	<Programs />
</div>

<!-- <div class="mt-24 min-h-[80svh]">
	<Sponsors />
</div> -->
<!-- <div><Members /></div> -->

<!-- <Banner banner={data.globals.banner} /> -->
<!-- <div class="mb-8 text-5xl/13">
		Les projets des finissant.es <br />
		de l’École de design de l’UQAM.
	</div> -->
<div bind:this={sentinel}></div>
<!-- <Header></Header> -->

<!-- <a class="border bg-black/5 px-3 py-1 text-lg font-medium" href="/{page.params.year}/projets"
	>Projets</a
>
<a class="border bg-black/5 px-3 py-1 text-lg font-medium" href="/{page.params.year}/finissant-e-s"
	>Finissant.e.s</a
> -->
<!-- <div class="-mt-90">
	<div class="-mx-3x- aspect-video bg-placeholder">
		<iframe
			src="https://player.mux.com/P3WEcj3FPpoxgFHcqU16hXo1NpJxUCsi00fcW1GnHNw00?metadata-video-title=VIDEOANNUEL2026_FINAL&video-title=VIDEOANNUEL2026_FINAL"
			style="width: 100%; border: none; aspect-ratio: 16/9;"
			allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
			allowfullscreen
		></iframe>
	</div>
	<div class="my-1x text-right text-sm/4">
		Vidéo par Kathrynf Mills, George Miller, Heather Ruiz, Christina Griffith
	</div>
</div> -->

<!-- <div class="mt-24 mb-64">
	<Programs {programs} {program_types} {program_stats} />
</div> -->
<!-- <div class="mt-24 min-h-[80svh]">
	<Sponsors />
</div> -->
<!-- <div><Members /></div> -->

<!-- <div
	class={[
		'pointer-events-none fixed right-0 bottom-0 left-0',
		scroll_top ? '' : 'translate-y-59- opacity-0- translate-y-full',
		'transition duration-500 ease-in-out'
	]}
>
	<div class="grid-12 translate-x-8- mx-8">
		<div class="col-span-4"></div>
		{#each buttons as { name, param, n }}
			<a class="pointer-events-auto col-span-4" href="/{page.params.year}/{param}">
				<div class="min-h-32 rounded-t-sm bg-black px-8 py-5 text-background">
					<div class="flex items-center justify-between gap-4">
						<div>{name} <sup>{n}</sup></div>
						<div class="icon-[ri--arrow-right-long-line]"></div>
					</div>
				</div>
			</a>
		{/each}
	</div>
</div> -->

<svelte:head>
	<title>Annuel de design {page.params.year}</title>
	<meta
		name="description"
		content="Annuel de design {page.params
			.year} Les projets des finissantes et finissants de l’école de design de l’UQAM"
	/>
</svelte:head>
