<script lang="ts">
	import type { Snippet } from 'svelte';
	import CollectionFooter from './collection-footer.svelte';
	import type { ProjectsRecord, StudentsRecord } from '$lib/pocketbase.types';
	import CollectionHeader from './collection-header.svelte';

	const {
		items,
		view,
		children
	}: { items: (StudentsRecord | ProjectsRecord)[]; view: 'grille' | 'liste'; children: Snippet } =
		$props();
</script>

<div class="relative">
	<CollectionHeader />

	{@render children()}

	<CollectionFooter {view} n_items={items.length} />
</div>
