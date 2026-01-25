<script lang="ts">
	import { page } from '$app/state';
	import type { StudentsRecordExpanded } from '$lib/types';
	import Relations from '../relations.svelte';

	const { student }: { student: StudentsRecordExpanded } = $props();
	const year = $derived(page.params.year);
</script>

<div class="z-10 -mx-1 -my-1 bg-bg px-1 py-1 text-xs/3.5">
	<div class="mb-gap-y grid w-full grid-cols-3 gap-1.5">
		{#each student.expand['projects(student)'].slice(0, 3) as project}
			<a class="aspect-square bg-black/10" href="/{year}/projets/{project.id}"></a>
		{/each}
	</div>
	<Relations
		relations={[
			{ type: 'student', ref: student },
			{ type: 'program', ref: student.expand.program }
		]}
	/>
</div>
