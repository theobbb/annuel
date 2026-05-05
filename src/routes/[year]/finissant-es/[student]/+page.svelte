<script lang="ts">
	import { page } from '$app/state';
	import Facecard from '$lib/ui/components/face-card.svelte';
	import ProjectRow from '$lib/ui/components/project/project-row.svelte';
	import RecordHeader from '$lib/ui/components/record/record-header.svelte';

	const { data } = $props();
	const { student, projects } = $derived(data);

	type Social = { name: string; url: string };
	const socials: Social[] = $derived((student.socials as Social[]) || []);
</script>

<RecordHeader back_href="/{page.params.year}/finissant-es" description={student.description || ''}>
	{#snippet title()}
		<div>
			{student.first_name}
			{student.last_name}
			{#if student.pronouns}
				<sup>{student.pronouns}</sup>
			{/if}
		</div>
	{/snippet}

	{#snippet aside()}
		<div class="mt-1.5 mb-16">
			<Facecard {student} link={false} />
		</div>
	{/snippet}
	<div class="leading-snug whitespace-nowrap">
		{#if student.email}
			<div><a href="mailto:{student.email}" target="_blank">Courriel</a></div>
		{/if}
		{#each socials as social}
			<div><a href={social.url} target="_blank">{social.name}</a></div>
			<!-- <div>Instagram</div>
			<div>Behance</div>
			<div>Youtube</div> -->
		{/each}
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

<svelte:head>
	<title
		>{student.first_name}
		{student.last_name} — Annuel {page.params.year}
	</title>
	<meta name="description" content={student.description} />
</svelte:head>
