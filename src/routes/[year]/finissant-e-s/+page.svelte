<script lang="ts">
	import { page } from '$app/state';
	import StudentsGrid from './students-grid.svelte';
	import StudentsList from './students-list.svelte';
	import CollectionLayout from '$lib/ui/components/collection/collection-layout.svelte';

	const { data } = $props();

	const { students } = $derived(data);

	const url_search_program = $derived(page.url.searchParams.get('programme') || '');
	const url_search_view = $derived(page.url.searchParams.get('vue') || '');

	const view: 'grille' | 'liste' = $derived(url_search_view == 'grille' ? 'grille' : 'liste');

	const filtered_students = $derived(
		url_search_program
			? students.filter((student) => student.program == url_search_program)
			: students
	);
</script>

<CollectionLayout items={data.students} {view}>
	<div class="mt-24 mb-48">
		{#if view == 'grille'}
			<StudentsGrid students={filtered_students} />
		{:else}
			<StudentsList students={filtered_students} />
		{/if}
	</div>
</CollectionLayout>
