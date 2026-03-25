<script lang="ts">
	import { page } from '$app/state';
	import Headshot from '$lib/components/face-card.svelte';
	import SingleHeader from '$lib/components/layout/single-header.svelte';
	import ProjectRow from '$lib/components/project-row.svelte';
	import Relations from '$lib/components/relations.svelte';

	const { data } = $props();
	const { student, year } = $derived(data);

	const program = $derived(page.data.programs_map.get(student.program));

	const projects = $derived(student.expand['projects(students)']);
</script>

<SingleHeader back_href="/{year}/finissant-e-s">
	{#snippet title()}
		<div>
			{student.first_name}
			{student.last_name}
			<sup>elle/ la</sup>
		</div>
	{/snippet}
	{#snippet description()}
		{student.description}
	{/snippet}
	<div>
		<div class="">
			<Headshot {student} />
		</div>
		<div>Instagram</div>
		<div>Behance</div>
		<div>Youtube</div>
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
</SingleHeader>

<div class="border-b-2 pb-4">
	Projets <sup>{projects.length}</sup>
</div>
<div class="">
	{#each projects as project}
		<ProjectRow {project} students={project.expand.students} />
		<!-- <ProjectCard {project} /> -->
	{/each}
</div>
