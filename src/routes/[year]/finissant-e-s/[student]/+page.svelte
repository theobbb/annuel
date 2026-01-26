<script lang="ts">
	import { page } from '$app/state';
	import ProjectRow from '$lib/components/project-row.svelte';
	import Relations from '$lib/components/relations.svelte';

	const { data } = $props();
	const { student } = $derived(data);

	const program = $derived(page.data.programs_map.get(student.program));
</script>

<div>
	<div class="mb-gap-y text-xl">
		{student.first_name}
		{student.last_name}
	</div>
</div>
<div class="grid-12 mt-gap-y mb-12">
	<div class="col-span-6 max-w-xl text-balance">{student.description}</div>
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
</div>
<div class="divide-y- mt-gap-y">
	{#each student.expand['projects(students)'] as project}
		<ProjectRow {project} students={project.expand.students} />
		<!-- <ProjectCard {project} /> -->
	{/each}
</div>
