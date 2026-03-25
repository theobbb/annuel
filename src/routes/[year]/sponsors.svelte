<script lang="ts">
	import { page } from '$app/state';
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import { pocketbase } from '$lib/pocketbase';
	import type { SponsorsRecord } from '$lib/pocketbase.types';
	import Title from '$lib/ui/components/title.svelte';

	const sponsors: SponsorsRecord[] = $derived(page.data.sponsors);
</script>

<div>
	<Title>Commanditaires</Title>

	<div class="mx-auto flex max-w-6xl flex-wrap gap-6 pt-8">
		{#each sponsors as { id, name, size, logo }}
			<div class="h-fit border-2 p-3" style="flex-: {size}">
				<!-- {name} -->
				<img src="{PUBLIC_POCKETBASE_URL}/api/files/sponsors/{id}/{logo}" alt="" />
			</div>
		{/each}
	</div>
</div>
