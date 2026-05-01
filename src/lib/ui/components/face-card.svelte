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

<div class="group group/card @container relative flex h-full w-full overflow-hidden">
	<div class="inset-0 h-full w-full bg-placeholder">
		<Image
			collection={student?.headshot ? 'students' : 'years'}
			record_id={student?.headshot ? student.id : year?.id}
			filename={student?.headshot ? student.headshot : year?.wall}
			sizes={page.params.student ? '800x0' : '400x0'}
			reveal
			class="h-full object-cover"
		/>

		<!-- <img
			src="/temp/head.png"
			class="transition- group-hover:scale-2000- h-full w-full object-cover duration-50000"
		/> -->
		<ArrowHover />
		<!-- <div
			class="absolute inset-0 icon-[ri--user-fill] h-full w-full translate-y-1/6 scale-130"
		></div> -->
	</div>
	{#if link}
		<a
			href="/{page.params.year}/finissant-es/{student?.id}"
			class="absolute inset-0"
			aria-label="page {student?.first_name} {student?.last_name}"
		></a>
	{/if}

	{#if program}
		<ProgramCode {program} />
	{/if}
</div>
