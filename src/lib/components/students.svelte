<script lang="ts">
	import { page } from '$app/state';
	import Student from '$lib/components/student.svelte';
	import type { ProgramsRecord, ProjectsRecord, StudentsRecord } from '$lib/pocketbase.types';
	import type { StudentsRecordExpanded } from '$lib/types';
	import Search from '$lib/ui/search.svelte';
	import PreviewStudent from './previews/preview-student.svelte';

	const { students }: { students: StudentsRecordExpanded[] } = $props();

	const programs: ProgramsRecord[] = $derived(page.data.programs);

	const programs_map: Map<string, ProgramsRecord> = $derived(
		new Map(programs.map((program) => [program.id, program]))
	);

	const url_search_program = $derived(page.url.searchParams.get('programme') || '');

	const cols: StudentsRecordExpanded[][] = $derived.by(() => {
		const col_1: StudentsRecordExpanded[] = [];
		const col_2: StudentsRecordExpanded[] = [];
		for (const student of students) {
			if (student.last_name[0].toUpperCase() <= 'M') col_1.push(student);
			else col_2.push(student);
		}
		return [col_1, col_2];
	});

	let hovered: string | null = $state(null);
</script>

<div class="mb-1 flex justify-between gap-x-gap">
	<div>{students.length} finissant-e-s</div>
	<div>* Récipiendaire de bourse</div>
</div>
<div class="grid-12">
	{#each cols as col}
		<div class="col-span-6">
			{#each col as student, i}
				<div class="grid grid-cols-6 gap-x-gap">
					<div class="col-start-2">
						{#if student.last_name[0] != col[i - 1]?.last_name[0]}
							<div>{student.last_name[0]}</div>
						{/if}
					</div>
					<div class="col-span-2 col-start-3 flex gap-0.5">
						{#if student.scholarship}
							<span class="absolute -translate-x-full">*</span>
						{/if}
						<div onmouseenter={() => (hovered = student.id)}><Student {student} reverse /></div>
						<!--	<span class={[student.scholarship ? '' : 'invisible']}>*</span> <a href="/{year}/finissant-e-s/{student.id}">
							{student.last_name}, {student.first_name}
						</a> -->
					</div>

					<div
						class={[
							'relative col-span-2 peer-hover:visible',
							hovered == student.id ? '' : 'invisible'
						]}
					>
						<div class="absolute top-0 right-0 left-0">
							<PreviewStudent {student} />
						</div>
						<!-- <div class="absolute top-0 right-0 text-xs/3.5">
							<div class="grid-12 mb-gap-y w-full">
								{#each { length: 3 } as _}
									<div class="col-span-4 aspect-square bg-black/10"></div>
								{/each}
							</div>
							<Relations
								relations={[
									{ type: 'student', ref: student },
									{ type: 'program', ref: programs_map.get(student.program) as ProgramsRecord }
								]}
							/>
						</div> -->
					</div>
				</div>
			{/each}
		</div>
	{/each}
</div>
