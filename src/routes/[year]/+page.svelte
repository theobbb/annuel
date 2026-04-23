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

<!-- L’Annuel de design expose les projets des finissant-es de l’école de design de l’UQAM -->
<Header class={['lg:-mt-48!-']}>
	<a
		class="col-span-4 col-start-9 row-start-1 text-right max-lg:hidden sm:col-span-4 sm:col-start-9 sm:row-start-2 lg:col-span-1 lg:col-start-10 lg:row-start-1"
		href="/archives"
	>
		Archives (+)
	</a>
</Header>
<!-- <div class="mt-64"><Description /></div> -->

<!-- <div class="mt-32 text-4xl">
	<span class="text-muted">L’Annuel de design</span> expose <br /> les projets des finissant-es
	<br /> de l’école de design de l’UQAM.
</div> -->

<div class="grid-10 min-h-[calc(100svh-5rem)] pb-1">
	<div class="col-span-full flex h-full flex-col lg:col-span-6 lg:col-start-3">
		<div class="col-span-6 col-start-3 mt-24">
			<!-- <h1 class="leading-tight- text-[2vw] leading-[110%]">
			Une exposition des finissant.es <br /> de l'École de design de l'UQAM
		</h1> -->
			<h2 class="leading-tight- leading-[110%]-">
				Une exposition des finissant.es <br /> de l'École de design de l'UQAM
			</h2>
			<div class="grid- mt-8 grid-cols-3 gap-gap leading-tight">
				<div>Vernissage le 06 mai 2026 <br />à partir de 18h</div>
				<br />
				<div>Exposition du 1er au 7 mai 2026 <br /> Entrée libre, de 12h à 18h</div>
			</div>
		</div>
		<div class="mt-16 flex aspect-video flex-1 items-center">
			<Video autoplay={false} playback_id="14W025RvjQdhvGaDyE4jHmKtWzQcIyA5PJNtRl7dLbmA" />
		</div>
	</div>
	<div class="-mt-4- relative z-500 col-span-1 col-start-9 flex flex-col self-start">
		<img
			class="opacity-0- h-full w-full -translate-x-44 translate-y-24 object-contain"
			src="{PUBLIC_POCKETBASE_URL}/api/files/years/{page.params.year}/{year.poster}"
			alt="poster-{page.params.year}"
		/>
	</div>
</div>

<p class="text-sm- col-span-full mt-12 columns-3 gap-gap text-justify leading-snug">
	<!-- <span class="-mx-2- -my-1- inline-block px-2 py-1 ring">
			L’Annuel de design expose les projets des finissant-es de l’école de design de l’UQAM
		</span> -->

	Identité visuelle de l’Annuel de design 2026
	<br />
	<br />

	Inauguré en 1996, le pavillon de l’École de design de l’UQAM, conçu par la firme d’architectes Dan
	S. Hanganu, constitue le point d’ancrage de l’identité visuelle de cette année. Conçue comme une
	ode, une célébration du pavillon, celle-ci s’ancre dans la reconnaissance de l’avoir comme lieu de
	travail, de passage et de création.
	<br />

	Pensée comme une extension de son langage architectural, l’identité visuelle en reprend les
	principes fondamentaux. Elle s’inspire directement du bâtiment : structures exposées, ventilation
	visible dans la faille centrale, marches irrégulières, plomberie apparente, béton brut — et toutes
	les formes géométriques que ces éléments révèlent. Conçu dès l’origine comme un espace inachevé,
	le pavillon offre un cadre ouvert, destiné à être habité, approprié et transformé au fil du temps.
	<br />
	<br />

	Entre pleins et vides, ombre et lumière, opacité et transparence, l’identité dialogue avec le
	pavillon, conçu comme un véritable outil pédagogique : un espace qui révèle, questionne et
	inspire. La palette chromatique renforce cette célébration : le jaune rappelle l’atelier
	multitechnique et la cage d’escalier du pavillon M, tandis que le gris, omniprésent, évoque la
	matérialité du lieu, du béton à l’acier.
	<br />
	<br />

	Merci à toute l’équipe de l’Annuel pour l’organisation de la soirée de lancement et pour
	l’élaboration de cette toute nouvelle identité.
	<br />
	<br />

	Vidéo : @caisermanyacine et @gabrielbelisle Musique : @lb66music DA : @par.charlotte et
	@emma.chevillotversini
</p>
<!-- <div class="mt-64"><Description /></div> -->

<div class="mt-48 mb-64">
	<Programs />
</div>
<div class="mb-48"><Sponsors /></div>
<div><Members /></div>

<svelte:head>
	<title>Annuel de design {page.params.year}</title>
	<meta
		name="description"
		content="Annuel de design {page.params
			.year} — Les projets des finissant.es de l’école de design de l’UQAM"
	/>
</svelte:head>

<style>
	p {
		text-align: justify;
		text-justify: inter-word;
		hyphens: auto; /* Breaks words to fill gaps naturally */
	}
</style>
