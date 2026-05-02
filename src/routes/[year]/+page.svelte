<script lang="ts">
	import { page } from '$app/state';
	import Members from './members.svelte';
	import Programs from './programs.svelte';
	import Sponsors from './sponsors.svelte';

	import Header from '$lib/ui/components/header.svelte';
	import Sprite from './sprite.svelte';
	import Video from './video.svelte';
	import Text from './text.svelte';

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

<div class="grid-10 min-h-[calc(100svh-3rem)] pb-1 lg:pt-24">
	<!-- <div
		class="col-span-4 col-start-4 row-span-2 row-start-1 flex max-sm:mt-8 sm:col-span-2 sm:col-start-5 lg:col-span-2 lg:col-start-9"
	>
		<a href="/archives">
			{#if year?.poster}
				<Image
					collection="years"
					record_id={year.id}
					filename={year.poster}
					class="h-full w-full object-contain"
					alt="poster-{year.id}"
					sizes="400x0,800x0,1200x0"
					nofade
				/>
			{:else}
				<div class="aspect-2/3 bg-placeholder"></div>
			{/if}
		</a>
	</div> -->
	<div class="col-span-full mt-16 text-right md:hidden">
		<a href="/archives">Archives(+)</a>
	</div>
	<div class="col-span-full max-lg:mt-8 lg:col-span-6 lg:col-start-3">
		<div>
			<div
				class="col-span-full -mx-0.5 text-[10vw] leading-[98%] tracking-[-3%] sm:text-[5vw]
				lg:text-[clamp(2rem,3.8vw,5rem)]"
			>
				Une exposition
				<br class="sm:hidden" />
				des finissant.es
				<br />
				<span class="inline-block text-right max-sm:w-full">de l’École de design</span>
				<br class="sm:hidden" />
				<span class="inline-block text-right max-sm:w-full">de l’UQAM</span>
			</div>
			<div class="mt-8 grid gap-gap leading-tight sm:grid-cols-2">
				<div class="">Vernissage le 06 mai 2026 <br />à partir de 18h</div>
				<div>Exposition du 07 au 20 mai 2026 <br /> Entrée libre, de 12h à 18h</div>
			</div>
		</div>
	</div>

	<div class="items-end- col-span-6 col-start-3 row-start-2 grid grid-cols-2 gap-gap"></div>

	<div class="col-span-3 col-start-6 row-start-2 flex"></div>
	<div
		class="@container relative col-span-full aspect-video w-[calc(100%+2*var(--spacing-gap))] flex-1 items-center overflow-hidden max-lg:-mx-gap md:mt-8 lg:col-span-6 lg:col-start-3"
	>
		<Video {data} />
	</div>
</div>
<Text />
<div class="mt-24 mb-32 md:mt-48 md:mb-48">
	<Programs />
</div>
<div class="mb-36 md:mb-48"><Sponsors /></div>
<div><Members /></div>

<!-- <div>
	<Sprite />
</div> -->

<svelte:head>
	<title>Annuel de design {page.params.year}</title>
	<meta
		name="description"
		content="Annuel de design {page.params
			.year} — Les projets des finissant.es de l’école de design de l’UQAM"
	/>
</svelte:head>
