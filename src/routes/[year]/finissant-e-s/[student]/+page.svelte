<script lang="ts">
	const { data } = $props();
	const { student, year } = data;
</script>

<div class="mb-gap-y text-xl">
	{student.first_name}
	{student.last_name}
</div>
<div class="max-w-md text-balance">{student.description}</div>

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
