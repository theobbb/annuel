<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ProjectsRecord, StudentsRecord } from '$lib/pocketbase.types';
	import CollectionHeader from './collection-header.svelte';
	import CollectionFooter from './collection-footer.svelte';

	const {
		view,
		children
	}: { items: (StudentsRecord | ProjectsRecord)[]; view: 'grille' | 'liste'; children: Snippet } =
		$props();
</script>

<div class="relative">
	<CollectionHeader />

	<div class="mt-12">{@render children()}</div>
</div>
<CollectionFooter {view} />
