<script lang="ts">
	import { page } from '$app/state';
	import Uqam from '$lib/assets/uqam.svelte';
	import Header from '$lib/ui/components/header.svelte';

	const { year, programs, socials } = $derived(page.data);

	const links = $derived([
		{ name: `Accueil `, href: `/${page.params.year}` },
		{ name: `Projets`, href: `/${page.params.year}/projets` },
		{ name: `Finissant.es`, href: `/${page.params.year}/finissant-es` },
		{ name: `Archives`, href: `/archives` },
		{ name: `Programmes`, href: `/${page.params.year}/programmes` },

		{ name: `Commanditaires`, href: `/${page.params.year}#commanditaires` },
		{ name: `Équipe de l’Annuel`, href: `/${page.params.year}#equipe` },
		{ name: `Crédits`, href: `/${page.params.year}` }
	]);
</script>

<footer
	class="black- font-[330]- min-h-[50svh]- relative z-200 mt-64 flex flex-col justify-between overflow-hidden border-t pt-4 pb-6"
>
	<div class="grid grid-cols-10 gap-gap">
		<div class="col-span-3 col-start-2">
			<div class="text-muted">Réseaux</div>

			{#each socials as { url, name }}
				<div><a class="" href={url} target="_blank">{name}</a></div>
			{/each}
		</div>

		<div class="col-span-4 pb-6">
			<div class="text-muted">Pages</div>
			{#each links as { name, href }}
				<div>
					<a {href}>{name}</a>
				</div>
			{/each}
		</div>
		<div class="col-span-6 flex items-end leading-5.5 text-muted">
			© 2026 Annuel de design — Tous droits réservés <br />Les œuvres présentées demeurent la
			propriété <br /> de leurs auteur.rice.s respectif.ve.s.
		</div>
		<!-- <div class="col-span-2 flex items-end">
			<div class="">Coliphon</div>
		</div> -->
		<div class="col-span-3 flex items-end leading-6 text-muted">
			École de design de l’UQAM <br /> 1440 Rue Sanguinet, Montréal
		</div>
		<div class="col-span-1 flex items-end justify-end">
			<div class="max-w-24"><Uqam /></div>
		</div>
	</div>
</footer>
