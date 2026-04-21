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

	const { data } = $props();
	const { year } = $derived(data);
</script>

<Header class={['lg:-mt-48!-']}>
	<a
		class="col-span-4 col-start-9 row-start-1 text-right max-lg:hidden sm:col-span-4 sm:col-start-9 sm:row-start-2 lg:col-span-1 lg:col-start-10 lg:row-start-1"
		href="/archives"
	>
		Archives (+)
	</a>
</Header>
<div class="flex min-h-[calc(100svh-5rem)] items-center">
	<div class="grid-10 pb-1">
		<div
			class="row-span-2- mb-12- justify-end- col-span-full flex flex-col lg:col-span-6 lg:col-start-3"
		>
			<div class="aspect-video bg-placeholder">
				<Video autoplay={true} playback_id="14W025RvjQdhvGaDyE4jHmKtWzQcIyA5PJNtRl7dLbmA" />
			</div>
		</div>
		<div class="row-span-2- col-span-1 col-start-10 flex flex-col">
			<div class="flex flex-col">
				<!-- <div class="mb-2 text-right">Archives (+)</div> -->
				<img
					class="h-full w-full object-contain"
					src="{PUBLIC_POCKETBASE_URL}/api/files/years/{page.params.year}/{year.poster}"
					alt="poster-{page.params.year}"
				/>
			</div>
		</div>
	</div>
</div>

<div class={['col-span-3 leading-6']}>
	Vernissage le 06 mai 2026 <br />à partir de 18h
</div>
<div class={['col-span-3 leading-6']}>
	Exposition du 1er au 7 mai 2026 <br /> Entrée libre, de 12h à 18h
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
