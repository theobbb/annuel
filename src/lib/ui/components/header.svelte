<script lang="ts">
	import { page } from '$app/state';

	import { onMount, type Snippet } from 'svelte';
	import Tabs from './collection/tabs.svelte';
	import { use_intersection_observer } from '$lib/utils/intersection-observer';

	const { children }: { children?: Snippet } = $props();

	let scroll_top = $state(true);
	let sentinel: HTMLDivElement;

	function on_intersect(entry: IntersectionObserverEntry) {
		// entry.isIntersecting === true  -> Sentinel is visible (User is at the TOP)
		// entry.isIntersecting === false -> Sentinel is hidden (User has SCROLLED DOWN)

		if (entry.isIntersecting) {
			scroll_top = true;
		} else {
			scroll_top = false;
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

<div class="h-px-" bind:this={sentinel}></div>
<header
	class={[
		' sticky top-0 z-100  -mt-4 grid grid-cols-10 gap-x-4 gap-y-2 border-b bg-background py-4 whitespace-nowrap lg:gap-x-8',
		scroll_top ? 'border-transparent' : '',
		'transition-[border]'
	]}
>
	<div class="col-span-3 row-start-1 md:col-span-2">
		<a class="hover:underline max-md:text-4xl/8 max-md:tracking-tight" href="/{page.params.year}">
			<span class="max-md:hidden">Annuel de design</span>
			<span class="md:hidden">A</span>
			<!-- {#if page.params.year}
				’{page.params.year?.slice(-2)}
			{/if} -->
		</a>
	</div>
	{#if page.params.year}
		<div
			class="col-span-7 row-start-1 flex max-xl:justify-end sm:col-span-6 sm:col-start-7 sm:row-start-1 xl:col-span-4 xl:col-start-3"
		>
			<Tabs />
		</div>
	{/if}
	{@render children?.()}
</header>
