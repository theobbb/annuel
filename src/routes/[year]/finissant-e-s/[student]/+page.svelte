<script lang="ts">
	import Program from '$lib/components/program.svelte';

	const { data } = $props();
	const { student, year } = data;
</script>

<div class="mb-gap-y text-xl">
	{student.first_name}
	{student.last_name}
</div>
<div class="max-w-lg text-balance">{student.description}</div>
<div class="mt-gap-y max-w-3xl">
	<div class="flex justify-between gap-x-2 border-b">
		<div class="text-2">Programme</div>
		<Program program={student.expand.program} />
	</div>
	<div class="flex justify-between gap-x-2">
		<div class="text-2">Contact</div>
	</div>
</div>
<div class="grid-12 mt-gap-y">
	{#each student.expand['projects(student)'] as project}
		<div class="col-span-2 flex flex-col">
			<a class="aspect-square bg-black/10" href="/{year}/projets/{project.id}"></a>
			<div class="mt-1 text-xs/3.5">
				<div>{project.name}</div>
			</div>
		</div>
	{/each}
</div>
