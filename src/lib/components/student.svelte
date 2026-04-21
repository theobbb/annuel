<script lang="ts">
	import { page } from '$app/state';
	import type { StudentsRecord } from '$lib/pocketbase.types';

	const {
		student,
		reverse = false,
		ref = true
	}: {
		student: StudentsRecord;
		reverse?: boolean;
		ref?: boolean;
	} = $props();
</script>

<a
	href="/{page.params.year}/finissant-es/{student.id}"
	class={['group/student pointer-events-auto relative z-10 w-fit not-last:pb-0.5']}
>
	{#if reverse}
		{student.last_name}, {student.first_name}
	{:else}
		<div class="inline-flex gap-1 leading-tight">
			{#if ref}
				<span class="">—</span>
			{/if}
			<div class=" group-hover/student:underline">
				{student.first_name}
				{student.last_name}
			</div>
		</div>
	{/if}
</a>
