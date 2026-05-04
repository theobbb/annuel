<script lang="ts">
	import { page } from '$app/state';

	import { onMount, type Snippet } from 'svelte';
	import Tabs from './collection/tabs.svelte';
	import { use_intersection_observer } from '$lib/utils/intersection-observer';
	import type { ClassValue } from 'svelte/elements';

	let {
		scroll_top = $bindable(true),
		class: cx,
		children
	}: { scroll_top?: boolean; class?: ClassValue; children?: Snippet } = $props();

	//let scroll_top = $state(true);
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

<div bind:this={sentinel}></div>
<header
	class={[
		'mt-1.5- sticky top-0 z-100 -mx-gap     bg-background px-gap whitespace-nowrap lg:gap-x-gap',
		scroll_top ? ' border-transparent' : '',
		'ease transition-[border,translate] duration-400',
		cx
	]}
>
	<div
		class={[
			'grid-10 h-11 items-center gap-y-2! border-b',
			scroll_top ? 'translate-y-2 border-transparent' : '',
			'ease transition duration-400'
		]}
	>
		<div class="col-span-3 row-start-1 md:col-span-2">
			<a class="-mx-2 -my-1 px-2 py-1" href="/{page.params.year}">
				<span class="">Annuel</span>

				<span class="max-sm:hidden- max-[23rem]:hidden">de design</span>
				<!-- {page.params.year?.slice(-2)} -->
				<!-- <span class="md:hidden">
					A.{#if page.params.year}
						{page.params.year?.slice(-2)}
					{/if}
				</span> -->
			</a>
		</div>
		{#if page.params.year}
			<div
				class="col-span-7 row-start-1 flex max-lg:justify-end sm:col-span-6 sm:col-start-7 sm:row-start-1 lg:col-span-4 lg:col-start-3"
			>
				<Tabs />
			</div>
		{/if}
		{@render children?.()}
	</div>
</header>
