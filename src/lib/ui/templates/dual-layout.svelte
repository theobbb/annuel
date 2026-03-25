<script lang="ts">
	import type { Snippet } from 'svelte';
	import FooterFilters from './footer-filters.svelte';
	import HeaderPrograms from './header-programs.svelte';
	import type { RecordModel } from 'pocketbase';
	import type { ProjectsRecord, StudentsRecord } from '$lib/pocketbase.types';

	const { items, children }: { items: (StudentsRecord | ProjectsRecord)[]; children: Snippet } =
		$props();
</script>

<div class="relative">
	<HeaderPrograms />

	{@render children()}

	<div class=""><FooterFilters n_items={items.length} /></div>
</div>
