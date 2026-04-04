<script lang="ts">
	import { page } from '$app/state';
	import Uqam from '$lib/assets/uqam.svelte';
	import Header from '$lib/ui/components/header.svelte';
	import Members from './[year]/members.svelte';

	const { year, programs, socials } = $derived(page.data);

	const links = $derived([
		{ name: `Accueil `, href: `/${page.params.year}` },
		{ name: `Projets`, href: `/${page.params.year}/projets` },
		{ name: `Finissant.es`, href: `/${page.params.year}/finissant-es` },
		{ name: `Archives`, href: `/archives` },
		{ name: `Programmes`, href: `/programmes` },

		{ name: `Commanditaires`, href: `/${page.params.year}#commanditaires` },
		{ name: `Équipe de l’Annuel`, href: `/${page.params.year}#equipe` },
		{ name: `Crédits`, href: `/${page.params.year}` }
	]);
</script>

<footer
	class="black font-[370]- min-h-svh- relative z-200 -mx-gap mt-16 flex flex-col justify-between overflow-hidden px-gap py-5 pb-6"
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
	<div class="grid grid-cols-10 gap-gap">
		<div class="col-span-2">
			{#each socials as { url, name }}
				<div><a class="" href={url} target="_blank">{name}</a></div>
			{/each}
		</div>
		<div class="col-start-5- col-span-2">
			<div class="">
				{#each links as { name, href }}
					<div>
						<a {href}>{name}</a>
					</div>
				{/each}
			</div>
		</div>

		<div class="col-span-2 col-start-6 leading-6 text-balance">
			<div>École de design de l’UQAM</div>
			<div class="text-muted">1440 Rue Sanguinet, Montréal</div>
		</div>
		<div class="hidden">Crédits</div>
		<div
			class="col-span-10 col-start-1 row-start-2 flex hidden! items-end text-sm leading-4.5 text-muted max-lg:text-sm/4 lg:col-span-4 lg:col-start-7"
		>
			© Annuel de design {page.params.year} <br />
			Les œuvres présentées demeurent la propriété <br /> de leurs auteur.rice.s respectif.ve.s.
		</div>
		<div class="row-start-2- items-end- col-start-10 flex justify-end">
			<div class="max-w-24"><Uqam /></div>
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
