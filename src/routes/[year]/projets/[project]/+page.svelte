<script lang="ts">
	import Program from '$lib/components/program.svelte';
	import { string_to_1_8 } from '$lib/utils/seed';

	const { data } = $props();
	const { project, year } = $derived(data);

	const n_files = $derived(string_to_1_8(project.name));

	const other_projects = $derived(
		project.expand.student.expand['projects(student)'].filter((p) => p.id != project.id)
	);
	const program = $derived(project.expand.student.expand.program);
</script>

<div>
	<div class="mb-gap-y text-xl">
		{project.name}
	</div>
	<div class="max-w-lg text-balance">{project.description}</div>

	<div class="mt-gap-y max-w-3xl">
		<a class="flex justify-between gap-x-2 border-b" href="/{year}/finissant-e-s/{project.student}">
			<div class="text-2">Finissant.e</div>
			<div class="">{project.expand.student.name}</div>
		</a>
		<div class="flex justify-between gap-x-2 border-b">
			<div class="text-2">Programme</div>
			<a href="/{year}/programmes/{program.id}" class=""><Program name={program.name} /></a>
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
			<a href="/{year}/finissant-e-s/{project.student}">
				{project.expand.student.name}
			</a>
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
