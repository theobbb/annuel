<script lang="ts">
	import { page } from '$app/state';
	import Uqam from '$lib/assets/uqam.svelte';
	import Header from '$lib/ui/components/header.svelte';
	import Members from './[year]/members.svelte';

	const { year, programs, socials } = $derived(page.data);

	const links = $derived([
		{ name: `Accueil ${page.params.year}`, href: `/${page.params.year}` },
		{ name: `Archives`, href: `/archives` },
		{ name: `Programmes`, href: `/programmes` },
		{ name: `Projets`, href: `/${page.params.year}/projets` },
		{ name: `Finissant.es`, href: `/${page.params.year}/finissant-es` },
		{ name: `Commanditaires`, href: `/${page.params.year}#commanditaires` },
		{ name: `Équipe de l’Annuel`, href: `/${page.params.year}#equipe` }
	]);
</script>

<footer
	class="black font-[370]- min-h-svh- relative z-200 -mx-6 mt-16 flex flex-col justify-between overflow-hidden px-6 py-5 pb-6"
>
	<div class="border-t- mb-12 hidden">
		<Header>
			<!-- <div class="col-span-2 col-start-9 row-span-3 row-start-1">
				<div class="aspect-2/3 bg-muted/20"></div>
			</div> -->
			<div class="col-span-2 col-start-11 row-start-1 flex justify-end">Archives</div>
			<!-- <div class="col-span-2 col-start-9 row-start-4">
				{#each socials as { url, name }}
					<div><a class="underline-" href={url} target="_blank">{name}</a></div>
				{/each}
			</div> -->
		</Header>
	</div>
	<div class="grid grid-cols-10 gap-2x">
		<div class="col-span-2">
			<div class="mb-1 border-b border-white/30 pb-1 text-muted">Médias sociaux</div>
			{#each socials as { url, name }}
				<div><a class="" href={url} target="_blank">{name}</a></div>
			{/each}
		</div>
		<div class="col-start-5- col-span-2">
			<div class="mb-1 border-b border-white/30 pb-1 text-muted">Menu</div>
			<div class="">
				{#each links as { name, href }}
					<div>
						<a {href}>{name}</a>
					</div>
				{/each}
			</div>
		</div>

		<div class="justify-between- col-span-3 col-start-1 flex flex-col leading-6 text-balance">
			<div>
				<div>École de design de l’UQAM</div>
				<div class="text-muted">1440 Rue Sanguinet, Montréal</div>
			</div>
			<!-- <div
				class="col-span-10 col-start-1 row-start-2 mt-8 flex items-end leading-5.5 text-muted max-lg:text-sm/4 lg:col-span-4 lg:col-start-3"
			>
				© Annuel de design {page.params.year} <br />
				Les œuvres présentées demeurent la propriété <br /> de leurs auteur.rice.s respectif.ve.s.
			</div> -->
		</div>
		<div class="hidden">Crédits</div>

		<div class="row-start-2- items-end- col-start-10 flex justify-end">
			<div class="max-w-24-"><Uqam /></div>
		</div>
	</div>

	<!-- <div class=" items-end">
		<div
			class="col-span-10 col-start-1 text-sm leading-4.5 text-muted max-lg:text-sm/4 lg:col-span-6"
		>
			© {page.params.year} Annuel de design — Tous droits réservés <br />
			Les œuvres présentées demeurent la propriété <br /> de leurs auteur.rice.s respectif.ve.s.
		</div>
		<div class="col-span-2 col-start-9 leading-tight font-normal text-muted">Crédits</div>
		<div class="col-start-12 flex justify-end">
			<div class="max-w-24"><Uqam /></div>
		</div>
	</div> -->
</footer>
