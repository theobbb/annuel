<script lang="ts">
	import type { Snippet } from 'svelte';

	const {
		back_href,
		title,
		description,
		children
	}: { back_href: string; title: Snippet; description: Snippet; children: Snippet } = $props();
</script>

<div class="grid-12 relative mb-36">
	<div class="col-span-2">
		<a href={back_href} class="flex items-center gap-1">
			<div class="icon-[ri--arrow-left-long-line]"></div>
			Retour
		</a>
	</div>
	<div class="col-span-6 text-balance">
		<div class="mb-24">
			{@render title()}
		</div>
		<div class=" border-t-2">{@render description()}</div>
	</div>

	<div class="col-span-2 col-start-11">
		{@render children()}
	</div>
</div>
