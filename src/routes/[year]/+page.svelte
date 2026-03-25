<script lang="ts">
	import { page } from '$app/state';
	import Header from '$lib/ui/components/header.svelte';
	import { onMount } from 'svelte';
	import Members from './members.svelte';
	import Programs from './programs.svelte';
	import Sponsors from './sponsors.svelte';
	import { use_intersection_observer } from '$lib/utils/intersection-observer.js';

	const { data } = $props();
	const { programs, program_types, program_stats, n_projects, n_students } = $derived(data);

	const buttons = $derived([
		{ name: 'Projets', param: 'projets', n: n_projects },
		{ name: 'Finissant.e.s', param: 'finissant-e-s', n: n_students }
	]);

	let scroll_top = $state(false);
	let sentinel: HTMLDivElement;

	function on_intersect(entry: IntersectionObserverEntry) {
		// entry.isIntersecting === true  -> Sentinel is visible (User is at the TOP)
		// entry.isIntersecting === false -> Sentinel is hidden (User has SCROLLED DOWN)

		if (entry.isIntersecting) {
			scroll_top = true;
			console.log('At the top of the page');
		} else {
			scroll_top = false;
			console.log('Scrolled away from top');
		}
	}

	onMount(() => {
		if (!sentinel) return;
		const cleanup_observer = use_intersection_observer(sentinel, on_intersect, {
			root: null, // Use the browser viewport
			rootMargin: '0px', // Trigger exactly at the edge
			threshold: [0, 1] // Trigger when the first/last pixel enters/leaves
		});

		return cleanup_observer;
	});
</script>

<div bind:this={sentinel}></div>
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

<!-- <div class="mt-24 mb-64">
	<Programs {programs} {program_types} {program_stats} />
</div> -->
<div class="mt-24 min-h-[80svh]">
	<Sponsors />
</div>
<div><Members /></div>

<div
	class={[
		'pointer-events-none fixed right-0 bottom-0 left-0',
		scroll_top ? '' : 'translate-y-59- opacity-0- translate-y-full',
		'transition duration-500 ease-in-out'
	]}
>
	<div class="grid-12 translate-x-8- mx-8">
		<div class="col-span-4"></div>
		{#each buttons as { name, param, n }}
			<a class="pointer-events-auto col-span-4" href="/{page.params.year}/{param}">
				<div class="min-h-64 rounded-t-sm bg-black px-8 py-5 text-background">
					<div class="flex items-center justify-between gap-4">
						<div>{name} <sup>{n}</sup></div>
						<div class="icon-[ri--arrow-right-long-line]"></div>
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>
