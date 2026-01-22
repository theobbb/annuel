<script lang="ts">
	import type { ProgramsRecord } from '$lib/pocketbase.types';

	const { program }: { program: ProgramsRecord } = $props();

	const name = $derived(program.name.split(',').join(' *'));
</script>

{name}
