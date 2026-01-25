<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Lightbox from '$lib/components/lightbox.svelte';
	import Program from '$lib/components/program.svelte';
	import Relations from '$lib/components/relations.svelte';
	import Student from '$lib/components/student.svelte';
	import { string_to_1_8 } from '$lib/utils/seed';

	const { data } = $props();
	const { project, year } = $derived(data);

	const n_files = $derived(string_to_1_8(project.name));

	const other_projects = $derived(
		project.expand.student.expand['projects(student)'].filter((p) => p.id != project.id)
	);
	const program = $derived(project.expand.student.expand.program);

	const callback = $derived(page.url.searchParams.get('callback'));

	let lightbox_file: string | null = $state(null);
</script>

<div>
	<div class="mb-gap-y text-xl">
		{project.name}
	</div>
	<div class="max-w-lg text-balance">{project.description}</div>

	<div class="mt-gap-y">
		<Relations
			relations={[
				{ type: 'student', ref: project.expand.student },
				{ type: 'program', ref: program },
				{ type: 'tags', ref: project.expand.tags }
			]}
		/>
	</div>
</div>

<div class="grid-12 mt-gap-y">
	{#each { length: n_files } as file, i}
		<button class="col-span-4 aspect-square bg-black/10" onclick={() => (lightbox_file = String(i))}
		></button>
	{/each}
</div>
{#if other_projects.length}
	<div class="mt-gap-y">
		<div class="border-b">
			Autres projets par
			<Student student={project.expand.student} />
		</div>
		<div class="flex flex-col">
			{#each other_projects as other_project}
				<a href="/{year}/projets/{other_project.id}">
					{other_project.name}
				</a>
			{/each}
		</div>
	</div>
{/if}
{#if lightbox_file}
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
{/if}
