<script lang="ts">
	import { page } from '$app/state';
	import Members from './members.svelte';
	import Programs from './programs.svelte';
	import Sponsors from './sponsors.svelte';

	import Header from '$lib/ui/components/header.svelte';
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import Video from '$lib/ui/components/media/video.svelte';
	import Image from '$lib/ui/components/media/image.svelte';
	import { dev } from '$app/environment';

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

<div class="grid-10 min-h-[calc(100svh-5rem)] pb-1 lg:pt-24">
	<div
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
				/>
			{:else}
				<div class="aspect-2/3 bg-placeholder"></div>
			{/if}
		</a>
	</div>
	<div class="col-span-2 col-start-8 row-span-2 row-start-1 flex items-end md:hidden">
		<a href="/archives">Archives(+)</a>
	</div>
	<div class="col-span-full max-lg:mt-8 lg:col-span-6 lg:col-start-3">
		<div>
			<div
				class="col-span-full -mx-0.5 text-[10vw] leading-[100%] tracking-[-2%] sm:text-[5vw] lg:text-[3.3vw]"
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
		class="col-span-full flex aspect-video flex-1 items-center max-lg:-mx-gap md:mt-8 lg:col-span-6 lg:col-start-3"
	>
		<Video autoplay={!dev} playback_id="14W025RvjQdhvGaDyE4jHmKtWzQcIyA5PJNtRl7dLbmA" />
	</div>
</div>

<p class="col-span-full mt-12 gap-gap leading-snug max-md:hidden lg:columns-3">
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

<div class="mt-24 mb-32 md:mt-48 md:mb-64">
	<Programs />
</div>
<div class="mb-36 md:mb-48"><Sponsors /></div>
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
		column-fill: balance;
		text-wrap: balance;
		break-inside: avoid;
	}
	/* p {
		text-align: justify;
		text-justify: inter-word;
		hyphens: auto;
	} */
</style>
