<script lang="ts">
	import type { Snippet } from 'svelte';

	import type { ProjectsRecord, StudentsRecord } from '$lib/pocketbase.types';

	const { item, children }: { item: StudentsRecord | ProjectsRecord; children: Snippet } = $props();
</script>

<div class="relative">
	{@render children()}
</div>
