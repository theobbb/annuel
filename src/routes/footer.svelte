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
	class="relative z-200 -mx-gap mt-48 flex flex-col justify-between overflow-hidden border-t bg-background px-gap pt-4 pb-4 leading-relaxed md:pb-5"
>
	<div class="grid-10">
		<div class="col-span-4 md:col-span-2">
			<!-- <h2 class="mb-8">Annuel de design [<a href="/archives">{page.params.year}</a>]</h2> -->
			{#each socials as { url, name }}
				<div><a class="" href={url} target="_blank">{name}</a></div>
			{/each}
		</div>
		<div class="col-span-6 pb-16 max-md:mb-16 md:col-span-2">
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
			<a href="https://maps.app.goo.gl/b5U5ATT4im1dsWRp8" target="_blank" class="text-muted">
				École de design de l’UQAM <br /> 1440 Rue Sanguinet, Montréal
			</a>
		</div>
		<div class="col-span-2 flex justify-end md:col-span-1">
			<div class="max-w-12 md:max-w-24"><Uqam /></div>
		</div>
		<div class="col-span-full leading-snug text-muted max-md:mt-8 md:col-span-5">
			<div>
				Site web fait par <a href="https://ecartelement.dev/" class="underline" target="_blank"
					>ecartelement</a
				>
			</div>
			<div>
				Police de caractères :
				<a
					href="https://www.instagram.com/p/DXeo0_LkTI8"
					target="_blank"
					class="whitespace-nowrap underline"
				>
					EP Programma
				</a>

				<a
					href="https://instagram.com/emilepainchaud.qc.ca/"
					target="_blank"
					class="whitespace-nowrap"
				>
					(<span class="underline">Émile Painchaud</span>)
				</a>
			</div>
		</div>
		<div class="col-span-full leading-snug text-muted max-md:mt-8 md:col-span-5 md:text-right">
			©{page.params.year} Annuel de design — Tous droits réservés
			<br />
			Les œuvres présentées demeurent la propriété de leurs auteur.rice.s respectif.ve.s
		</div>
	</div>
</footer>
