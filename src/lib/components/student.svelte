<script lang="ts">
	import { page } from '$app/state';
	import type { StudentsRecord } from '$lib/pocketbase.types';

	const { student }: { student: StudentsRecord } = $props();
</script>

<a href="/{page.params.year}/finissant-e-s/{student.id}">
	{student.first_name}
	{student.last_name}
</a>
