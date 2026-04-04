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

	const { data } = $props();
	const { year, programs } = $derived(data);
</script>

<!-- <Banner banner={data.globals.banner} /> -->
<Header>
	<a
		class="col-span-4 col-start-9 row-start-1 text-right max-lg:hidden sm:col-span-4 sm:col-start-9 sm:row-start-2 lg:col-span-1 lg:col-start-10 lg:row-start-1"
		href="/archives"
	>
		[{page.params.year}]
	</a>
</Header>
<div class="gap-2x grid min-h-[calc(100svh-5rem)] grid-cols-10 items-center lg:-mt-10">
	<!-- <div class="relative z-200 col-span-6 col-start-2 lg:col-span-2 lg:col-start-8">
		<div class="aspect-2/3 bg-placeholder">
			<img
				class="h-full w-full"
				src="{PUBLIC_POCKETBASE_URL}/api/files/years/{year.id}/{year.poster}"
			/>
		</div>
	</div> -->

	<div class="col-span-full aspect-video lg:col-span-6 lg:col-start-3">
		<div class="-mx-3x- aspect-video bg-placeholder">
			<!-- <Video autoplayy playback_id="P3WEcj3FPpoxgFHcqU16hXo1NpJxUCsi00fcW1GnHNw00" /> -->
		</div>
	</div>
</div>
<div class="mt-32 mb-32 grid grid-cols-10 gap-6">
	<div class="col-span-full lg:col-span-7">
		<Description />
	</div>
</div>

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

<div class="mt-24 mb-64">
	<Programs />
</div>
<div class="mb-48"><Sponsors /></div>
<div><Members /></div>
<!-- <div class="mt-24 min-h-[80svh]">
	<Sponsors />
</div> -->
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
