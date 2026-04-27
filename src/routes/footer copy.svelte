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
	class="relative z-200 mt-48 flex flex-col justify-between overflow-hidden border-t bg-background pt-4 pb-4 leading-relaxed md:pb-5"
>
	<div class="grid grid-cols-10 gap-gap">
		<div class="col-span-4 md:col-span-2">
			{#each socials as { url, name }}
				<div><a class="" href={url} target="_blank">{name}</a></div>
			{/each}
		</div>

		<div class="col-span-6 pb-6 max-md:mb-16 md:col-span-4">
			{#each links as { name, href }}
				<div>
					<a {href}>{name}</a>
				</div>
			{/each}
		</div>

		<!-- <div class="col-span-2 flex items-end">
			<div class="">Coliphon</div>
		</div> -->
		<div class="col-span-8 leading-snug md:col-span-2 md:col-start-8">
			<div class="text-muted">École de design de l’UQAM <br /> 1440 Rue Sanguinet, Montréal</div>
		</div>
		<div class="col-span-2 flex justify-end md:col-span-1">
			<div class="max-w-12 md:max-w-24"><Uqam /></div>
		</div>
		<div class="col-span-full flex items-end leading-tight text-muted max-md:mt-8">
			© 2026 Annuel de design — Tous droits réservés. Les œuvres présentées demeurent la propriété
			de leurs auteur.rice.s respectif.ve.s.
		</div>
	</div>
</footer>
