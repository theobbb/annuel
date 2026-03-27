<script lang="ts">
	import { page } from '$app/state';
	import Facecard from '$lib/components/face-card.svelte';
	import ProjectRow from '$lib/components/project-row.svelte';
	import RecordHeader from '$lib/ui/components/record/record-header.svelte';
	import Title from '$lib/ui/components/title.svelte';

	const { data } = $props();
	const { student } = $derived(data);

	const projects = $derived(student.expand['projects(students)']);
</script>

<RecordHeader back_href="/{page.params.year}/finissant-e-s">
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
			<Facecard {student} />
		</div>
		<div class="mt-2">
			<div>Instagram</div>
			<div>Behance</div>
			<div>Youtube</div>
		</div>
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
</RecordHeader>

<Title>
	Projets <sup>{projects?.length}</sup>
</Title>

<div class="mb-24">
	{#each projects as project}
		<ProjectRow {project} students={project.expand.students} />
		<!-- <ProjectCard {project} /> -->
	{/each}
</div>
