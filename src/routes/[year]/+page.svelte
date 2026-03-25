<script lang="ts">
	import { page } from '$app/state';
	import Header from '$lib/ui/components/header.svelte';
	import Members from './members.svelte';
	import Programs from './programs.svelte';
	import Sponsors from './sponsors.svelte';

	const { n_projects, n_students } = $derived(page.data);

	const buttons = $derived([
		{ name: 'Projets', param: 'projets', n: n_projects },
		{ name: 'Finissant.e.s', param: 'finissant-e-s', n: n_students }
	]);
</script>

<Header>
	<div class="mb-8">
		Les projets des finissant.es <br />
		de l’École de design de l’UQAM.
		<br />
		Une diversité de démarches.
	</div>
</Header>

<div class="-mx-3x aspect-video bg-placeholder"></div>
<div class="my-1x text-right text-xl/tight">
	Vidéo par <br />
	Kathrynf Mills, George Miller, <br />Heather Ruiz, Christina Griffith
</div>

<div class="mt-6 mb-48">
	<Programs />
</div>
<div class="min-h-[80svh]">
	<Sponsors />
</div>
<div><Members /></div>

<div class="pointer-events-none fixed right-0 bottom-0 left-0">
	<div class="grid-12 mx-8 translate-x-8">
		<div class="col-span-4"></div>
		{#each buttons as { name, param, n }}
			<a class="pointer-events-auto col-span-4 first:-ml-8" href="/{page.params.year}/{param}">
				<div class="min-h-32 bg-black px-8 py-5 text-background">
					<div class="flex items-center justify-between gap-4">
						<div>{name} <sup>{n}</sup></div>
						<div class="icon-[ri--arrow-right-long-line]"></div>
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>
