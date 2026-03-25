<script lang="ts">
	import { page } from '$app/state';
	import type { SponsorsRecord } from '$lib/pocketbase.types';

	const sponsors: SponsorsRecord[] = $derived(page.data.sponsors);
</script>

<div>
	<div class="mb-3 border-b-2 pb-3">Commanditaires</div>
	<div class="flex flex-wrap gap-6">
		{#each sponsors as { name, size }}
			<div class="border-2 px-3">
				{name}
			</div>
		{/each}
	</div>
</div>
