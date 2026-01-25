<script lang="ts">
	import { page } from '$app/state';
	import Filter from '$lib/components/filter.svelte';
	import Program from '$lib/components/program.svelte';
	import Students from '$lib/components/students.svelte';

	const { data } = $props();
	const { students, programs } = $derived(data);

	const url_search_program = $derived(page.url.searchParams.get('programme') || '');

	const filtered_students = $derived(
		url_search_program
			? students.filter((student) => student.program == url_search_program)
			: students
	);
</script>

<!-- <Search /> -->
<!-- <div class="mb-gap-y"><FilterProgram {programs} /></div> -->

<div class="mb-gap-y">
	<Filter name="Programmes" param="programme">
		{#each programs as program}
			<div><Program {program} filter /></div>
		{/each}
	</Filter>
</div>

<Students students={filtered_students} />
