<script lang="ts">
	import ProjectCard from '$lib/components/project-card.svelte';
	import Relations from '$lib/components/relations.svelte';

	const { data } = $props();
	const { student } = $derived(data);
</script>

<div class="mb-gap-y text-xl">
	{student.first_name}
	{student.last_name}
</div>
<div class="max-w-lg text-balance">{student.description}</div>
<div class="grid-12 mt-gap-y">
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
		<ProjectCard {project} />
	{/each}
</div>
