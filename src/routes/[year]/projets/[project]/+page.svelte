<script lang="ts">
	import { page } from '$app/state';
	import Program from '$lib/components/program.svelte';
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
</script>

<div>
	<div class="mb-gap-y text-xl">
		{project.name}
	</div>
	<div class="max-w-lg text-balance">{project.description}</div>

	<div class="mt-gap-y max-w-3xl">
		<div class="flex justify-between gap-x-2 border-b">
			<div class="text-2">Finissant.e</div>
			<Student student={project.expand.student} />
		</div>
		<div class="flex justify-between gap-x-2 border-b">
			<div class="text-2">Programme</div>
			<Program {program} />
		</div>
		<div class="flex justify-between gap-x-2">
			<div class="text-2">Catégorie</div>
			<div class=""></div>
		</div>
	</div>
</div>

<div class="grid-12 mt-gap-y">
	{#each { length: n_files } as file}
		<div class="col-span-4 aspect-square bg-black/10"></div>
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
