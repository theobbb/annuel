<script lang="ts">
	import { page } from '$app/state';
	import StudentsGrid from './students-grid.svelte';
	import StudentsList from './students-list.svelte';
	import CollectionLayout from '$lib/ui/components/collection/collection-layout.svelte';
	import CollectionEmpty from '$lib/ui/components/collection/collection-empty.svelte';

	const { data } = $props();

	const { students } = $derived(data);

	const url_program = $derived(page.url.searchParams.get('programme') || '');
	const url_search_view = $derived(page.url.searchParams.get('vue') || '');

	const view: 'grille' | 'liste' = $derived(url_search_view == 'grille' ? 'grille' : 'liste');

	const url_search = $derived(page.url.searchParams.get('search') ?? '');

	// const filtered_students = $derived(
	// 	url_search_program
	// 		? students.filter((student) => student.program == url_search_program)
	// 		: students
	// );

	const filtered_students = $derived.by(() => {
		const program = url_program;
		const query = url_search.toLowerCase().trim();

		return students.filter((s) => {
			if (program && s.program != program) return false;

			if (query) {
				const haystack = `${s.first_name} ${s.last_name}`.toLowerCase();
				return haystack.includes(query);
			}

			return true;
		});
	});
</script>

<CollectionLayout items={data.students} {view}>
	<div class="mt-16 mb-48">
		{#if filtered_students.length == 0}
			<CollectionEmpty />
		{/if}
		{#if view == 'grille'}
			<StudentsGrid students={filtered_students} />
		{:else}
			<StudentsList students={filtered_students} />
		{/if}
	</div>
</CollectionLayout>
