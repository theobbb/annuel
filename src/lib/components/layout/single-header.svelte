<script lang="ts">
	import type { Snippet } from 'svelte';

	const {
		title,
		description,
		relations
	}: { title: Snippet; description: Snippet; relations: Snippet } = $props();
</script>

<div class="mb-gap-y text-xl">
	{@render title()}
</div>
<div class="grid-12 relative mb-12">
	<div class="col-span-full max-w-xl lg:col-span-6">
		{@render description()}
	</div>

	<div class="col-span-full lg:col-span-6">
		{@render relations()}
	</div>
</div>
