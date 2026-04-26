<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import type { Snippet } from 'svelte';
	import Header from '../header.svelte';

	const {
		back_href,
		title,
		description,
		aside,
		children
	}: {
		back_href: string;
		title: Snippet;
		description: Snippet;
		aside: Snippet;
		children: Snippet;
	} = $props();

	let has_history = $state(false);

	afterNavigate(({ from }) => {
		if (from) has_history = true;
	});

	function on_back(event: MouseEvent) {
		if (has_history) {
			event.preventDefault();
			window.history.back();
		}
	}
</script>

<Header></Header>
<div class="grid-10 mt-16 mb-12 min-h-[60svh] lg:mt-24 lg:mb-16">
	<div class="col-span-4 lg:col-span-2">
		<a href={back_href} onclick={on_back} class="flex items-center gap-1">
			<div class="icon-[ri--arrow-left-long-line]"></div>
			Retour
		</a>
	</div>

	<div class="col-span-10 text-balance lg:col-span-4 lg:col-start-3">
		<h2 class="mb-8 leading-tight">
			{@render title()}
		</h2>
		<p class="leading-snug">
			{@render description()}
		</p>
	</div>
	<div
		class="relative col-span-6 col-start-5 max-lg:row-start-1 lg:z-200 lg:col-span-2 lg:col-start-9 lg:-mt-32"
	>
		{@render aside()}
	</div>
	<div class="col-span-8 col-start-3 grid grid-cols-8 gap-gap">
		{@render children?.()}
	</div>
</div>
