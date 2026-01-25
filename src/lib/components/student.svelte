<script lang="ts">
	import { page } from '$app/state';
	import type { StudentsRecord } from '$lib/pocketbase.types';

	const { student, reverse = false }: { student: StudentsRecord; reverse?: boolean } = $props();
</script>

<a href="/{page.params.year}/finissant-e-s/{student.id}" class="pointer-events-auto">
	{#if reverse}
		{student.last_name}, {student.first_name}
	{:else}
		{student.first_name}
		{student.last_name}
	{/if}
</a>
