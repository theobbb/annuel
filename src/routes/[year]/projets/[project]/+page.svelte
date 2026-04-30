<script lang="ts">
	import { page } from '$app/state';
	import ProjectRow from '$lib/ui/components/project/project-row.svelte';
	import Student from '$lib/components/student.svelte';
	import RecordHeader from '$lib/ui/components/record/record-header.svelte';
	import { string_to_1_8 } from '$lib/utils/seed';
	import { onMount } from 'svelte';
	import File, { seed_meta_file } from './file.svelte';
	import { afterNavigate } from '$app/navigation';

	const { data } = $props();

	const { project, program_map } = $derived(data);
	$inspect(project);
	const { files, meta_files } = $derived(project);

	let from_projects = $state(false);

	afterNavigate(({ from }) => {
		if (from?.route.id?.startsWith('/[year]/projects')) from_projects = true;
	});

	function on_back(event: MouseEvent) {
		if (from_projects) {
			event.preventDefault();
			window.history.back();
		}
	}

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
			if (p.id !== project.id && !seen.has(p.id) && !p.draft) {
				seen.add(p.id);
				unique.push(p);
			}
		}

		return unique;
	});

	$effect(() => {
		if (project.background) {
			document.documentElement.style.setProperty('--color-background', project.background);
		} else {
			clear_background();
		}

		if (project.foreground_white) {
			set_foreground_white();
		} else {
			clear_foreground_white();
		}

		return () => {
			clear_background();
			clear_foreground_white();
		};
	});
	function clear_background() {
		document.documentElement.style.removeProperty('--color-background');
		document.documentElement.classList = project.foreground_white ? 'foreground-white' : '';
	}
	function set_foreground_white() {
		if (document.documentElement.classList.contains('foreground-white')) return;
		document.documentElement.classList.add('foreground-white');
	}
	function clear_foreground_white() {
		document.documentElement.classList.remove('foreground-white');
	}

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
	{#snippet aside()}
		<div class="">
			<div class="mb-16">
				<!-- <div class="mb-1">Finissant.e.s</div> -->
				{#each project.expand.students as student}
					<div><Student {student} /></div>
				{/each}
			</div>
		</div>
	{/snippet}

	<div class="col-span-full grid grid-cols-4 gap-gap leading-snug">
		<div class="col-span-2">
			{#if project.session}
				{@const [session_year, session_season] = project.session.split('.')}
				<div>
					<div class=" text-muted">Session</div>
					<div>
						{seasons[Number(session_season)]}
						20{session_year}
					</div>
				</div>
			{/if}
		</div>

		<div class="col-span-2">
			{#if project.class}
				<div>
					<div class=" text-muted">Cours</div>
					<div>{project.class}</div>
				</div>
			{/if}
		</div>
		<div class="col-span-2">
			{#if project.teacher}
				<div>
					<div class=" text-muted">Professeur.e</div>

					<div>{project.teacher}</div>
				</div>
			{/if}
		</div>
	</div>
</RecordHeader>
<div class="grid grid-cols-5 gap-gap">
	{#each files as file, i}
		{@const meta = meta_files?.[i] || seed_meta_file}
		<File {project} {file} {meta} />
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

<div class="mt-32">
	<a
		href="/{page.params.year}/projets"
		onclick={on_back}
		class="-mx-2 -my-1 inline-flex w-fit items-center gap-1 px-2 py-1"
	>
		<div class="icon-[ri--arrow-left-long-line]"></div>
		<span>Retour à la liste de projets</span>
	</a>
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
<svelte:head>
	<title
		>{project.name}
		— Annuel {page.params.year}
	</title>
	<meta name="description" content={project.description} />
</svelte:head>
