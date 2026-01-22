<script lang="ts">
	import { page } from '$app/state';
	import type { ProgramsRecord } from '$lib/pocketbase.types';
	import ProgramName from './program-name.svelte';

	const { program }: { program: ProgramsRecord } = $props();
</script>

<a href="/{page.params.year}/programmes/{program.id}">
	<ProgramName {program} />
</a>
