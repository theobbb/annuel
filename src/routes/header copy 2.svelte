<script lang="ts">
	import { page } from '$app/state';
	import IconExpand from '$lib/ui/icons/icon-expand.svelte';
	import { useIntersectionObserver } from '$lib/utils/intersection-observer';

	const { year, years } = $derived(page.data);

	let pop_years_open = $state(false);

	const other_year_href = $derived.by(() => {
		let route: string = page.route.id || '/';

		route = route.replace('/[year]', '');

		route = route.split('[')[0];

		route += page.url.search;
		return route;
	});

	let scrolled = $state(false);

	$inspect(scrolled);

	function handle_intersect(entry: IntersectionObserverEntry) {
		if (entry.isIntersecting) {
			scrolled = false;
		} else {
			scrolled = true;
		}
	}

	function observer_sentinel(el: HTMLDivElement) {
		$effect(() => {
			const cleanup = useIntersectionObserver(el, handle_intersect, {
				root: null, // The viewport
				rootMargin: '0px 0px 0px 0px', // We can keep this simple since we use the 1px sentinel
				threshold: 0
			});

			return cleanup;
		});
	}
</script>

<div use:observer_sentinel></div>
<header class={['grid-12 z-100 mb-12 bg-bg px-gap py-gap-y text-sm/4.5']}>
	<div class="col-span-3">
		<a href="/">Annuel de design</a>
	</div>

	<div class="col-span-5 flex gap-x-6">
		{#if year}
			<div class={['flex w-full gap-x-gap']}>
				<a href="/{year}" class={[page.route.id == '/[year]' && 'active']}>
					Accueil + remerciements
				</a>
				<a
					href="/{year}/projets"
					class={[page.route.id?.startsWith('/[year]/projets') && 'active']}
				>
					Projets
				</a>
				<a
					href="/{year}/finissant-e-s"
					class={[page.route.id?.startsWith('/[year]/finissant-e-s') && 'active']}
				>
					Finissant-e-s
				</a>
			</div>
		{/if}
	</div>
	<div class="relative col-span-4 flex justify-end text-right">
		<button
			class="flex items-center justify-end gap-x-1"
			onclick={() => (pop_years_open = !pop_years_open)}
		>
			<span><IconExpand /></span>
			{year}
		</button>
		{#if pop_years_open}
			<div class="absolute right-0 bottom-0 flex translate-y-full flex-col text-right">
				{#each years as y}
					<a class={[y.id == year ? 'active' : '']} href="/{y.id}{other_year_href}">{y.id}</a>
				{/each}
			</div>
		{/if}
	</div>
</header>
