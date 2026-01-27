<script lang="ts">
	import { page } from '$app/state';
	import SingleHeader from '$lib/components/layout/single-header.svelte';
	import ProjectRow from '$lib/components/project-row.svelte';
	import Relations from '$lib/components/relations.svelte';

	const { data } = $props();
	const { student } = $derived(data);

	const program = $derived(page.data.programs_map.get(student.program));
</script>

<SingleHeader>
	{#snippet title()}
		<div>
			{student.first_name}
			{student.last_name}
		</div>
	{/snippet}
	{#snippet description()}
		{student.description}
	{/snippet}
	{#snippet relations()}
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
	{/snippet}
</SingleHeader>

<div class="">
	{#each student.expand['projects(students)'] as project}
		<ProjectRow {project} students={project.expand.students} />
		<!-- <ProjectCard {project} /> -->
	{/each}
</div>
