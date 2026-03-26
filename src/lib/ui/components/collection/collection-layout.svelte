<script lang="ts">
	import type { Snippet } from 'svelte';
	import CollectionFooter from './collection-footer.svelte';
	import type { ProjectsRecord, StudentsRecord } from '$lib/pocketbase.types';
	import CollectionHeader from './collection-header.svelte';
	import CollectionFilters from './collection-filters.svelte';

	const {
		items,
		view,
		children
	}: { items: (StudentsRecord | ProjectsRecord)[]; view: 'grille' | 'liste'; children: Snippet } =
		$props();
</script>

<div class="relative mb-36">
	<CollectionHeader />
	<CollectionFilters {view} n_items={items.length} />
	{@render children()}
</div>
