<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import type { Snippet } from 'svelte';
	import Header from '../header.svelte';

	const {
		back_href,
		title,
		description,
		children
	}: { back_href: string; title: Snippet; description: Snippet; children: Snippet } = $props();

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

<Header>
	<div class="col-span-9 col-start-1 row-start-2 border-b"></div>
	<div class="col-start-1 row-start-3">
		<a href={back_href} onclick={on_back} class="flex items-center gap-1">
			<div class="icon-[ri--arrow-left-long-line]"></div>
			Retour
		</a>
	</div>
	<div class="col-span-2 col-start-11 row-span-4">
		{@render children()}
	</div>
	<div class="col-span-6 col-start-3 text-balance">
		<div class="mb-12 text-4xl">
			{@render title()}
		</div>
		<div class="text-xl/6.5- border-t- pt-4">
			{@render description()}
		</div>
	</div>
</Header>
<!-- <div>
	<a href={back_href} onclick={on_back} class="flex items-center gap-1">
		<div class="icon-[ri--arrow-left-long-line]"></div>
		Retour
	</a>
</div>
<div class="grid-12 relative mt-24 mb-36">
	<div class="col-span-6 col-start-3 text-balance">
		<div class="mb-12 text-4xl">
			{@render title()}
		</div>
		<div class="text-xl/6.5- border-t- pt-4">
			{@render description()}
		</div>
	</div>

	<div class="col-span-2 col-start-11">
		{@render children()}
	</div>
</div> -->
