<script lang="ts">
	import { page } from '$app/state';
	import Filter from '$lib/components/filter.svelte';
	import Program from '$lib/components/program.svelte';
	import type { ProgramsRecord } from '$lib/pocketbase.types';
	import Student from '$lib/components/student.svelte';
	import PreviewStudent from '$lib/components/preview-student.svelte';
	import { setContext } from 'svelte';
	import { use_store_student_projects } from '$lib/store/store-preview-student.svelte.js';
	import ProgramName from '$lib/components/program-name.svelte';
	import { icons } from '$lib/ui/icons';

	const { data } = $props();
	const props_id = $props.id();
	const { students, programs, year } = $derived(data);

	const url_search_program = $derived(page.url.searchParams.get('programme') || '');

	const filtered_students = $derived(
		url_search_program
			? students.filter((student) => student.program == url_search_program)
			: students
	);
	let carousel_program_i = $state(0);
	let carousel_program = $derived(programs[carousel_program_i]);

	const current_program: ProgramsRecord | undefined = $derived(
		programs.find((program) => program.id == url_search_program)
	);

	const cols = $derived.by(() => {
		const col_1 = [];
		const col_2 = [];
		for (const student of filtered_students) {
			if (student.last_name[0].toUpperCase() <= 'M') col_1.push(student);
			else col_2.push(student);
		}
		return [col_1, col_2];
	});

	const store_student_projects = use_store_student_projects();
	const preview = $derived(store_student_projects.current);
	setContext('preview_context', props_id);
</script>

<!-- <Search /> -->
<!-- <div class="mb-gap-y"><FilterProgram {programs} /></div> -->
<div class="grid-12 mb-section">
	<div class="col-span-full lg:col-span-6">
		<a class={[!current_program && 'active']} href="/{year}/finissant-e-s">Tous les programmes</a>
		{#each programs as program}
			<div class="text-xl-"><Program {program} /></div>
		{/each}
	</div>
	{#if current_program}
		<div class="col-span-full border-b pb-gap-y lg:col-span-6">
			<div class="mt-section">
				<div class="pr-gap text-xl">
					<div class="">{current_program.description}</div>
				</div>
				<div class="text-right- text-xs- mt-gap-y">Directeur: Sylvain Allard</div>
			</div>
			<div class="mt-[calc(2*var(--spacing-gap-y))] flex max-lg:justify-end">
				<a
					class=" flex w-fit items-center gap-1 bg-white px-3 py-1.5 pr-2 text-xl"
					href="/{year}/projets?programme={current_program.id}"
				>
					Projets<span class={[icons.arrow_right_up, 'translate-y-px']}></span>
				</a>
			</div>
		</div>
	{/if}
</div>
<!-- <div class="grid-12 mb-12">
	<Filter name="Programmes" param="programme">
		{#each programs as program}
			<div><Program {program} filter /></div>
		{/each}
	</Filter>
	{#if current_program}
		<div class="mt-12- col-span-6">
			<div class="pr-gap text-xl">
				<div class="mb-gap-y">{current_program.name}</div>
				<div class="">{current_program.description}</div>
			</div>
			<div class="text-right- text-xs- mt-gap-y">
				Directeur: Sylvain Allard
				
			</div>
		</div>
	{/if}
</div> -->

<div class="mb-gap-y flex justify-between gap-x-gap text-xs lg:-mb-3.5">
	<div>{filtered_students.length} finissant-e-s</div>
	<div>* Récipiendaire de bourse</div>
</div>
<div class="grid-12 mb-section">
	{#each cols as col}
		<div class="col-span-full lg:col-span-6">
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
						<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
						<div>
							<Student {student} reverse />
						</div>
					</div>

					<div class={['relative col-span-2 peer-hover:visible']}>
						{#if preview?.context_key == props_id && preview.student.id == student.id}
							<div class="absolute top-0 right-0 left-0">
								<PreviewStudent {student} class="w-full" />
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	{/each}
</div>
