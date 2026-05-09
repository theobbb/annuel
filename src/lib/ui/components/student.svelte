<script lang="ts">
	import { page } from '$app/state';
	import type { StudentsRecord } from '$lib/pocketbase.types';

	const {
		student,
		reverse = false,
		ref = true,
		no_link = false
	}: {
		student: StudentsRecord;
		reverse?: boolean;
		ref?: boolean;
		no_link?: boolean;
	} = $props();
</script>

{#snippet content()}
	{#if reverse}
		<span class="group-hover/student:underline">{student.last_name}, {student.first_name}</span>
	{:else}
		<div class="inline-flex gap-1 leading-tight">
			{#if ref}<span class="no-underline">—</span>{/if}
			<span class="group-hover/student:underline">
				{student.first_name}
				{student.last_name}
			</span>
		</div>
	{/if}
{/snippet}

{#if no_link}
	<div class="relative z-10 w-fit not-last:pb-0.5">
		{@render content()}
	</div>
{:else}
	<a
		href="/{page.params.year}/finissant-es/{student.id}"
		class="group/student pointer-events-auto relative z-10 w-fit not-last:pb-0.5"
	>
		{@render content()}
	</a>
{/if}
