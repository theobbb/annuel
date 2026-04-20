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
		{ name: `Équipe de l’Annuel`, href: `/${page.params.year}#equipe` }
		// { name: `Crédits`, href: `/${page.params.year}` }
	]);
</script>

<footer
	class="black relative z-200 -mx-gap mt-16 flex min-h-[50svh] flex-col justify-between overflow-hidden px-gap py-5 pb-6 font-[330]"
>
	<div class="grid grid-cols-10 gap-gap">
		<div class="col-span-6 pb-12 leading-6 text-muted">
			<div>Vernissage le 06 mai 2026 <br /> à partir de 18h</div>
			<br />
			<div>Exposition du 1er au 7 mai 2026 <br />Entrée libre, de 12h à 18h</div>
		</div>
		<div class="col-span-4">
			{#each socials as { url, name }}
				<div><a class="" href={url} target="_blank">{name}</a></div>
			{/each}
		</div>
		<div class="col-span-6 leading-6 text-muted">
			École de design de l’UQAM <br /> 1440 Rue Sanguinet, Montréal
		</div>
		<div class="col-span-4 pb-64">
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
		<div class="col-span-2 flex items-end">
			<div class="">Coliphon</div>
		</div>
		<div class="col-span-2 flex items-end justify-end">
			<div class="max-w-24"><Uqam /></div>
		</div>
		<!-- <div class="col-span-2 col-start-6 leading-6 text-balance">
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
		</div> -->
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
