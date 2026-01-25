<script lang="ts">
	import Program from '$lib/components/program.svelte';
	import Relations from '$lib/components/relations.svelte';

	const { data } = $props();
	const { student, year } = data;
</script>

<div class="mb-gap-y text-xl">
	{student.first_name}
	{student.last_name}
</div>
<div class="max-w-lg text-balance">{student.description}</div>
<div class="mt-gap-y max-w-3xl">
	<Relations
		relations={[
			{ type: 'program', ref: student.expand.program },
			{
				type: 'contact',
				ref: [
					{ name: 'Instagram', href: '/' },
					{ name: 'Facebook', href: '/' }
				]
			}
		]}
	/>
</div>
<div class="grid-12 mt-gap-y">
	{#each student.expand['projects(student)'] as project}
		<div class="col-span-6 flex flex-col sm:col-span-4 md:col-span-3 xl:col-span-2">
			<a class="aspect-square bg-black/10" href="/{year}/projets/{project.id}"></a>
			<div class="mt-1 text-xs/3.5">
				<div>{project.name}</div>
			</div>
		</div>
	{/each}
</div>
