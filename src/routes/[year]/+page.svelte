<script lang="ts">
	import { page } from '$app/state';
	import Members from './members.svelte';
	import Programs from './programs.svelte';
	import Sponsors from './sponsors.svelte';

	import Header from '$lib/ui/components/header.svelte';
	import Sprite from './sprite.svelte';
	import Video from './video.svelte';
	import Text from './text.svelte';
	import Posters from './posters.svelte';

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
	<div class="col-span-full mt-16 text-right md:hidden">
		<a href="/archives">Archives(+)</a>
	</div>
	<div class="col-span-full min-h-[calc(100svh-40rem)] max-lg:mt-8 lg:col-span-6 lg:col-start-3">
		<div>
			<div
				class="col-span-full -mx-0.5 text-[10vw] leading-[100%] tracking-[-2%] sm:text-[5vw]
				lg:text-[clamp(2rem,3.6vw,4.6rem)]"
			>
				Une exposition
				<br class="sm:hidden" />
				des finissant.es
				<br />
				<span class="inline-block text-right max-sm:w-full">de l’École de design</span>
				<br class="sm:hidden" />
				<span class="inline-block text-right max-sm:w-full">de l’UQAM</span>
			</div>
			<div class="mt-16 grid gap-gap leading-[1.2] sm:grid-cols-2">
				<div class="">Vernissage le 06 mai 2026 <br />à partir de 18h</div>
				<div>Exposition du 07 au 20 mai 2026 <br /> Entrée libre, de 12h à 18h</div>
			</div>
		</div>
	</div>

	<div
		class="w-[calc(100%+2*var(--spacing-gap))]- @container relative col-span-full aspect-video overflow-hidden max-lg:-mx-gap md:mt-24 lg:col-span-6 lg:col-start-3"
	>
		<Video {data} />
	</div>
</div>

<div class="mt-24 mb-32 md:mt-24 md:mb-48">
	<Programs />
</div>
<div class="mb-36 md:mb-48"><Sponsors /></div>
<div><Members /></div>
<Posters />
<Text />
<!-- 
<Sprite /> -->

<svelte:head>
	<title>Annuel de design {page.params.year}</title>
	<meta
		name="description"
		content="Annuel de design {page.params
			.year} — Les projets des finissant.es de l’école de design de l’UQAM"
	/>
</svelte:head>
