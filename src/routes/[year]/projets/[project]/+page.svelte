<script lang="ts">
	import { page } from '$app/state';
	import Image from '$lib/components/image.svelte';
	import SingleHeader from '$lib/components/layout/single-header.svelte';
	import ProjectRow from '$lib/components/project-row.svelte';
	import Relations from '$lib/components/relations.svelte';
	import Student from '$lib/components/student.svelte';
	import Students from '$lib/components/students.svelte';
	import type { ProgramsRecord } from '$lib/pocketbase.types';
	import RecordHeader from '$lib/ui/components/record/record-header.svelte';
	import Title from '$lib/ui/components/title.svelte';
	import { string_to_1_8 } from '$lib/utils/seed';

	const { data } = $props();

	const { project, program_map } = $derived(data);

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
	<div>
		<div class="text-right">
			{#each project.expand.students as student}
				<div><Student {student} /></div>
			{/each}
		</div>
	</div>
	<!-- {#snippet relations()}
		<Relations
			relations={[
				{ type: 'program', ref: program },
				{
					type: 'contact',
					ref: [
						{ name: 'Instagram', href: '/' },
						{ name: 'Facebook', href: '/' }
					]
				}
			]}
		/>
	{/snippet} -->
</RecordHeader>
<!-- <SingleHeader>
	{#snippet title()}
		{project.name}
	{/snippet}
	{#snippet description()}
		{project.description}
	{/snippet}
	{#snippet relations()}
		<Relations
			relations={[
				{ type: 'students', ref: project.expand.students },
				{ type: 'program', ref: program },
				{ type: 'tags', ref: tags }
			]}
		/>
	{/snippet}
</SingleHeader> -->

<!-- <div class="grid-12">
	{#each { length: n_files } as file, i}
		<button
			class="col-span-full aspect-square sm:col-span-6 lg:col-span-4"
			onclick={() => (lightbox_file = String(i))}
			aria-label="open lightbox {i}"
		>
			<Image id={project.id} index={i} />
		</button>
	{/each}
</div> -->
<div class="h-[100svh]"></div>
{#if related_projects.length}
	<div class="mt-24">
		<!-- <div class="pb-gap-y text-xl">
			<div>Autres projets par</div>
			<div class="underline">
				<Students students={project.expand.students} />
			</div>
		</div> -->
		<Title>
			Autres projets <sup>{related_projects.length}</sup>
		</Title>
		<div>
			{#each related_projects as related_project}
				<ProjectRow project={related_project} students={related_project.expand.students} />
			{/each}
		</div>
	</div>
{/if}

<!-- {#if lightbox_file}
	<Lightbox file={lightbox_file} onclose={() => (lightbox_file = null)}>
		<div class="pointer-events-auto">
			<Relations
				relations={[
					{ type: 'project', ref: project },
					{ type: 'student', ref: project.expand.student },
					{ type: 'program', ref: program },
					{ type: 'tags', ref: project.expand.tags }
				]}
			/>
		</div>
	</Lightbox>
{/if} -->
