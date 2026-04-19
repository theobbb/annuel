<script lang="ts">
	import { page } from '$app/state';
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import ProjectRow from '$lib/components/project-row.svelte';
	import Student from '$lib/components/student.svelte';
	import Students from '$lib/components/students.svelte';
	import type { ProgramsRecord } from '$lib/pocketbase.types';
	import Header from '$lib/ui/components/header.svelte';
	import Image from '$lib/ui/components/image.svelte';
	import RecordHeader from '$lib/ui/components/record/record-header.svelte';
	import { string_to_1_8 } from '$lib/utils/seed';
	import { onMount } from 'svelte';

	const { data } = $props();

	const { project, program_map } = $derived(data);

	const { files, meta_files } = $derived(project);

	const n_files = $derived(string_to_1_8(project.name));

	const program: ProgramsRecord = $derived(
		program_map.get(project.expand.students[0].program)
	) as ProgramsRecord;

	const related_projects = $derived.by(() => {
		// 1. Safety check: ensure we have students
		const students = project.expand?.students || [];

		// 2. Flatten: Get all projects from all students
		// IMPORTANT: Use bracket notation with the exact query string
		const all = students.flatMap((s) => s.expand?.['projects(students)'] || []);

		// 3. Deduplicate
		const seen = new Set<string>();
		const unique = [];

		for (const p of all) {
			// Exclude the current project & duplicates
			if (p.id !== project.id && !seen.has(p.id)) {
				seen.add(p.id);
				unique.push(p);
			}
		}

		return unique;
	});

	let lightbox_file: string | null = $state(null);

	onMount(() => {
		if (project.background)
			document.documentElement.style.setProperty('--color-background', project.background);
		//if (project.background) document.documentElement.style.backgroundColor = project.background;
		else clear_background();
		return () => {
			clear_background();
		};
	});
	function clear_background() {
		document.documentElement.style.removeProperty('--color-background');
	}
	$inspect(project);
	const seed_meta_file = { caption: '', col_start: 2, col_span: 2 };

	const seasons = ['Automne', 'Hiver', 'Été'];
</script>

<RecordHeader back_href="/{page.params.year}/projets">
	{#snippet title()}
		<div>
			{project.name}
		</div>
	{/snippet}
	{#snippet description()}
		{project.description}
	{/snippet}
	<div class="mb-16">
		<div class="mt-16- space-y-2 text-base">
			{#if project.session}
				{@const [session_year, session_season] = project.session.split('.')}
				<div>
					<div class="text-base text-muted">Session</div>
					<div>
						{seasons[Number(session_season)]}
						20{session_year}
					</div>
				</div>
			{/if}

			{#if project.class}
				<div>
					<div class="text-base text-muted">Cours</div>

					<div>{project.class}</div>
				</div>
			{/if}
			{#if project.teacher}
				<div>
					<div class="text-base text-muted">Professeur.e</div>

					<div>{project.teacher}</div>
				</div>
			{/if}
		</div>
		<div class="mt-12">
			<div class="mb-1">Finissant.e.s</div>
			{#each project.expand.students as student}
				<div><Student {student} /></div>
			{/each}
		</div>
	</div>
</RecordHeader>
<div class="grid grid-cols-5 gap-7">
	{#each files as file, i}
		{@const meta = meta_files?.[i] || seed_meta_file}
		<div style="grid-column: {meta.col_start} / span {meta.col_span};">
			<Image collection="projects" filename={file} record_id={project.id} />
			{#if meta.caption}
				<div class="mt-1 text-base italic">{meta.caption}</div>
			{/if}
		</div>
	{/each}
</div>

{#if related_projects.length}
	<div class="mt-48">
		<div class="mb-4">
			Projets reliés <sup>{related_projects.length}</sup>
		</div>
		<div>
			{#each related_projects as related_project}
				<ProjectRow project={related_project} students={related_project.expand.students} />
			{/each}
		</div>
	</div>
{/if}

<div>
	<a href="">Retour à la liste de projets</a>
</div>

<!-- <div class=" col-span-3">
		<div class="sticky top-0">
			<div class="">
				<a href="/{page.params.year}/projets" class="flex items-center gap-1">
					<div class="icon-[ri--arrow-left-long-line]"></div>
					Retour
				</a>
			</div>
			<div class="mt-24 mb-12 text-3xl/9 tracking-tight">
				{project.name}
			</div>
			<div class=" leading-6.5">
				{project.description}
			</div>
			<div class="mt-12">
				<div class="mb-1">Finissant.e.s</div>
				<Students students={project.expand.students} />
			</div>
			<div>
				{project.teacher}
			</div>
			<div>
				{project.class}
			</div>
			<div>
				{project.session}
			</div>
		</div>
	</div> -->
