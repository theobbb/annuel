<script lang="ts">
	import { page } from '$app/state';
	import Facecard from '$lib/components/face-card.svelte';
	import ProjectRow from '$lib/components/project-row.svelte';
	import Header from '$lib/ui/components/header.svelte';
	import RecordHeader from '$lib/ui/components/record/record-header.svelte';
	import Title from '$lib/ui/components/title.svelte';

	const { data } = $props();
	const { student } = $derived(data);

	const projects = $derived(student.expand['projects(students)']);

	type Social = { name: string; url: string };
	const socials: Social[] = $derived((student.socials as Social[]) || []);
</script>

<Header></Header>
<RecordHeader back_href="/{page.params.year}/finissant-es">
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
		<div class="mt-4">
			{#each socials as social}
				<a href={social.url} target="_blank">{social.name}</a>
				<!-- <div>Instagram</div>
			<div>Behance</div>
			<div>Youtube</div> -->
			{/each}
		</div>
	</div>
</RecordHeader>

<div class="mb-4">
	Projets <sup>{projects?.length}</sup>
</div>

<div class="mb-24">
	{#each projects as project}
		<ProjectRow {project} students={project.expand.students} />
		<!-- <ProjectCard {project} /> -->
	{/each}
</div>
