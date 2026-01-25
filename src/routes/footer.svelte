<script lang="ts">
	import { page } from '$app/state';
	import Program from '$lib/components/program.svelte';
	import SelectYear from './select-year.svelte';

	const { year, programs, socials } = $derived(page.data);
</script>

<footer class="grid-12 mt-12 mb-8 border-t">
	<!-- <div class="col-span-3">
		<div>Annuel de design</div>
		Exposition des projets des finissant.es provenant des six programmes de l’École de design de l’UQAM.
	</div> -->

	<div class="col-span-2 md:col-span-1">
		<div class="relative w-fit"><SelectYear /></div>
	</div>
	<div class="col-span-full md:col-span-6">
		<div class="mb-gap-y py-0.5">Programmes</div>
		{#each programs as program}
			<div class="ml-gap -indent-gap underline"><Program {program} /></div>
		{/each}
	</div>
	{#if year}
		<div class="col-span-8 max-md:mt-gap-y md:col-span-2">
			<div class="mb-gap-y py-0.5">Pages</div>
			<div class={['flex flex-col py-0.5']}>
				<a href="/{year}" class={['underline', page.route.id == '/[year]' && 'active']}>
					Accueil + remerciements
				</a>
				<a
					href="/{year}/projets"
					class={['underline', page.route.id?.startsWith('/[year]/projets') && 'active']}
				>
					Projets
				</a>
				<a
					href="/{year}/finissant-e-s"
					class={['underline', page.route.id?.startsWith('/[year]/finissant-e-s') && 'active']}
				>
					Finissant-e-s
				</a>
			</div>
		</div>
	{/if}
	<!-- <div class="col-span-2">
		<div class="text-2 mb-gap-y">Contact</div>
	</div> -->
	<div class="col-span-4 max-md:mt-gap-y md:col-span-2">
		<div class="text-2- mb-gap-y py-0.5">Réseaux</div>
		<div class="">
			{#each socials as { url, name }}
				<div><a class="underline" href={url} target="_blank">{name}</a></div>
			{/each}
		</div>
	</div>
</footer>
