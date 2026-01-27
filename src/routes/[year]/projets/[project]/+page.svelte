<script lang="ts">
	import Image from '$lib/components/image.svelte';
	import SingleHeader from '$lib/components/layout/single-header.svelte';
	import ProjectRow from '$lib/components/project-row.svelte';
	import Relations from '$lib/components/relations.svelte';
	import Students from '$lib/components/students.svelte';
	import type { ProgramsRecord, ProjectTagsRecord } from '$lib/pocketbase.types';
	import { string_to_1_8 } from '$lib/utils/seed';

	const { data } = $props();

	const { project, tags_map, programs_map } = $derived(data);

	const n_files = $derived(string_to_1_8(project.name));

	const program: ProgramsRecord = $derived(
		programs_map.get(project.expand.students[0].program)
	) as ProgramsRecord;

	const tags: ProjectTagsRecord[] = $derived(
		project.tags
			? project.tags.map((tag) => tags_map.get(tag)).filter((tag) => tag != undefined)
			: []
	);

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

<SingleHeader>
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
</SingleHeader>

<div class="grid-12">
	{#each { length: n_files } as file, i}
		<button
			class="col-span-4 aspect-square"
			onclick={() => (lightbox_file = String(i))}
			aria-label="open lightbox {i}"
		>
			<Image id={project.id} index={i} />
		</button>
	{/each}
</div>
{#if related_projects.length}
	<div class="mt-24">
		<div class=" pb-gap-y text-center">
			<div>Autres projets par</div>
			<div class="underline"><Students students={project.expand.students} /></div>
		</div>
		<div class="flex flex-col">
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
