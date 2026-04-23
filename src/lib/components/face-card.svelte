<script lang="ts">
	import { page } from '$app/state';
	import type { ProgramsRecord, StudentsRecord } from '$lib/pocketbase.types';
	import ArrowHover from '$lib/ui/components/arrow-hover.svelte';
	import ProgramCode from '$lib/ui/components/program-code.svelte';

	const { student }: { student?: StudentsRecord } = $props();

	const program: ProgramsRecord | null | undefined = $derived(
		student ? page.data.program_map.get(student.program) : null
	);
</script>

<div class="group group/card @container relative aspect-2/3 overflow-hidden">
	<div class="rounded- absolute inset-0 border bg-placeholder">
		<img
			src="/temp/head.png"
			class="transition- group-hover:scale-2000- h-full w-full object-cover duration-50000"
		/>
		<ArrowHover />
		<!-- <div
			class="absolute inset-0 icon-[ri--user-fill] h-full w-full translate-y-1/6 scale-130"
		></div> -->
	</div>

	{#if program}
		<ProgramCode {program} />
	{/if}
</div>
