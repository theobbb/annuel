<script lang="ts">
	import { page } from '$app/state';
	import Relations from '$lib/components/relations.svelte';
	import type { StudentsRecordExpanded } from './+page.server';

	const { student }: { student: StudentsRecordExpanded } = $props();
	const year = $derived(page.params.year);

	const program = $derived(page.data.programs_map.get(student.program));

	const projects = $derived(student.expand['projects(students)']);
</script>

<div class="z-10 -mx-1 -my-1 bg-bg px-1 py-1 text-xs">
	<div class="mb-gap-y">
		<div class="card grid w-full grid-cols-3 gap-1.5">
			{#each projects.slice(0, 3) as project}
				<a class="relative block overflow-hidden bg-bg-2 p-1" href="/{year}/projets/{project.id}">
					<div class="aspect-square bg-placeholder"></div>
				</a>
			{/each}
		</div>
		{#if projects.length > 3}
			<div class="text-right">+ {projects.length - 3}</div>
		{/if}
	</div>
	<Relations
		relations={[
			{ type: 'student', ref: student },
			{ type: 'program', ref: program }
		]}
	/>
</div>
