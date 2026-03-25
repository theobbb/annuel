<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import type { Snippet } from 'svelte';

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

<div class="grid-12 relative mb-36">
	<div class="col-span-2">
		<a href={back_href} onclick={on_back} class="flex items-center gap-1">
			<div class="icon-[ri--arrow-left-long-line]"></div>
			Retour
		</a>
	</div>
	<div class="col-span-5 text-balance">
		<div class="mb-12">
			{@render title()}
		</div>
		<div class="text-xl/6.5">
			{@render description()}
		</div>
	</div>

	<div class="col-span-2 col-start-11">
		{@render children()}
	</div>
</div>
