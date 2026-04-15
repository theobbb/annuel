<script lang="ts">
	import { page } from '$app/state';
	import Members from './members.svelte';
	import Programs from './programs.svelte';
	import Sponsors from './sponsors.svelte';

	import Header from '$lib/ui/components/header.svelte';
	import Banner from '$lib/ui/components/banner.svelte';
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import Video from '$lib/ui/components/video.svelte';
	import Description from './description.svelte';
	import { onMount } from 'svelte';
	import { use_intersection_observer } from '$lib/utils/intersection-observer.js';

	const { data } = $props();
	const { year, programs } = $derived(data);

	let header_visible = $state(false);
	let sentinel: HTMLDivElement;

	function on_intersect(entry: IntersectionObserverEntry) {
		// entry.isIntersecting === true  -> Sentinel is visible (User is at the TOP)
		// entry.isIntersecting === false -> Sentinel is hidden (User has SCROLLED DOWN)

		if (entry.isIntersecting) {
			header_visible = false;
		} else {
			header_visible = true;
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

<div class="mb-32- grid min-h-svh grid-cols-10 grid-rows-[auto_auto_1fr_auto_auto] gap-6 pb-4">
	<div class="lg:col-span-7- col-span-8">
		<Description />
		<div bind:this={sentinel}></div>
	</div>

	<div class="col-span-2 row-span-2 flex flex-col">
		<div class="flex flex-col">
			<div class="mb-2 text-right">Archives (+)</div>
			<img
				class="aspect-4/5- h-full w-full object-contain"
				src="{PUBLIC_POCKETBASE_URL}/api/files/years/{page.params.year}/{year.poster}"
				alt="poster-{page.params.year}"
			/>
		</div>
	</div>

	<div class="col-span-full row-span-2 flex flex-col justify-end lg:col-span-6 lg:col-start-3">
		<div class="aspect-video bg-placeholder">
			<!-- <Video autoplayy playback_id="P3WEcj3FPpoxgFHcqU16hXo1NpJxUCsi00fcW1GnHNw00" /> -->
		</div>
	</div>
	<div class={['col-span-3 leading-6', header_visible ? '' : 'pointer-events-auto']}>
		Vernissage le 06 mai 2026 <br />à partir de 18h
	</div>
	<div class={['col-span-3 leading-6', header_visible ? '' : 'pointer-events-auto']}>
		Exposition du 1er au 7 mai 2026 <br /> Entrée libre, de 12h à 18h
	</div>
</div>

<!-- <div
	class={[
		'pointer-events-none fixed right-7 bottom-7 left-7 grid grid-cols-10 gap-7 leading-6',
		header_visible ? 'translate-y-8 opacity-0' : '',
		'transition'
	]}
>
	<div class={['col-span-3', header_visible ? '' : 'pointer-events-auto']}>
		Vernissage le 06 mai 2026 <br />à partir de 18h
	</div>
	<div class={['col-span-3', header_visible ? '' : 'pointer-events-auto']}>
		Exposition du 1er au 7 mai 2026 <br /> Entrée libre, de 12h à 18h
	</div>
</div> -->

<!-- <Header class={['lg:-mt-48!', header_visible ? '' : '-translate-y-4 opacity-0']}>
	<a
		class="col-span-4 col-start-9 row-start-1 text-right max-lg:hidden sm:col-span-4 sm:col-start-9 sm:row-start-2 lg:col-span-1 lg:col-start-10 lg:row-start-1"
		href="/archives"
	>
		[{page.params.year}]
	</a>
</Header> -->

<!-- Les projets présentés par les finissant.es <br /> de l’École de design de l’UQAM, <br />
		révélant la richesse des démarches <br /> et la diversité des approches en design. -->

<!-- L’Annuel de design est une exposition présentant les projets des
		finissantes et finissants de l’école de design de l’UQAM, mettant en lumière la diversité des
		démarches et des approches en design. -->
<!-- <div class="mt-48 grid grid-cols-10 gap-8">
	<div class="col-span-6 col-start-3 aspect-video bg-placeholder">
		<div class="-mx-3x- aspect-video bg-placeholder"></div>
	</div>
	<div class="col-span-2 my-1x flex items-end text-sm/4 text-muted">
		Vidéo par Kathrynf Mills, George Miller, Heather Ruiz, Christina Griffith
	</div>
</div> -->

<div class="mt-48 mb-64">
	<Programs />
</div>
<div class="mb-48"><Sponsors /></div>
<div><Members /></div>

<!-- <div><Members /></div> -->

<!-- <Banner banner={data.globals.banner} /> -->
<!-- <div class="mb-8 text-5xl/13">
		Les projets des finissant.es <br />
		de l’École de design de l’UQAM.
	</div> -->

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
			.year} — Les projets des finissant.es de l’école de design de l’UQAM"
	/>
</svelte:head>
