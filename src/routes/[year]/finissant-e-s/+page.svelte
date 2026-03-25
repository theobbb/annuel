<script lang="ts">
	import { page } from '$app/state';
	import type { ProgramsRecord } from '$lib/pocketbase.types';
	import { setContext } from 'svelte';
	import { use_store_student_projects } from '$lib/store/store-preview-student.svelte.js';
	import HeaderPrograms from '$lib/ui/templates/header-programs.svelte';
	import FooterFilters from '$lib/ui/templates/footer-filters.svelte';
	import StudentsGrid from './students-grid.svelte';
	import StudentsList from './students-list.svelte';
	import DualLayout from '$lib/ui/templates/dual-layout.svelte';

	const { data } = $props();
	const props_id = $props.id();
	const { students, programs } = $derived(data);

	const url_search_program = $derived(page.url.searchParams.get('programme') || '');
	const url_search_view = $derived(page.url.searchParams.get('vue') || '');

	const view: 'grille' | 'liste' = $derived(url_search_view == 'liste' ? 'liste' : 'grille');

	const filtered_students = $derived(
		url_search_program
			? students.filter((student) => student.program == url_search_program)
			: students
	);
</script>

<DualLayout items={data.students}>
	<div class="mt-24 mb-48">
		{#if view == 'grille'}
			<StudentsGrid students={filtered_students} />
		{:else}
			<StudentsList students={filtered_students} />
		{/if}
	</div>
</DualLayout>
