<script lang="ts">
	import { page } from '$app/state';
	import type { ProgramsRecord, StudentsRecord } from '$lib/pocketbase.types';
	import ArrowHover from '$lib/ui/components/arrow-hover.svelte';
	import ProgramCode from '$lib/ui/components/program-code.svelte';
	import Image from './media/image.svelte';

	const { student, link = true }: { student?: StudentsRecord | null | undefined; link?: boolean } =
		$props();

	const program: ProgramsRecord | null | undefined = $derived(
		student ? page.data.program_map.get(student.program || '') : null
	);

	const year = $derived(page.data.year);
</script>

<!-- <div class=" aspect-2/3 bg-placeholder"></div> -->

<div class="group group/card @container relative flex aspect-2/3 h-full w-full overflow-hidden">
	<div class="inset-0 h-full w-full bg-placeholder">
		<Image
			collection={student?.headshot ? 'students' : 'years'}
			record_id={student?.headshot ? student.id : year?.id}
			filename={student?.headshot ? student.headshot : year?.wall}
			sizes={page.params.student ? '800x0' : '400x0'}
			reveal
			class="h-full object-cover"
		/>
		{#if link}
			<ArrowHover />
		{/if}
	</div>
	{#if link}
		<a
			href="/{page.params.year}/finissant-es/{student?.id}"
			class="absolute inset-0"
			aria-label="page {student?.first_name} {student?.last_name}"
		></a>
	{/if}

	{#if program}
		<div class="pointer-events-none"><ProgramCode {program} /></div>
	{/if}
</div>
