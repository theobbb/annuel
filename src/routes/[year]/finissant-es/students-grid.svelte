<script lang="ts">
	import { page } from '$app/state';
	import Facecard from '$lib/components/face-card.svelte';
	import type { StudentsRecord } from '$lib/pocketbase.types';

	const { students }: { students: StudentsRecord[] } = $props();

	let hovered: StudentsRecord | null = $state(students[0]);
</script>

<div class="grid grid-cols-3 gap-4 md:grid-cols-5 lg:gap-8 xl:grid-cols-7">
	{#each students as student}
		<a
			class=""
			href="/{page.params.year}/finissant-es/{student.id}"
			onmouseenter={() => (hovered = student)}
		>
			<Facecard {student} />
			<div class="mt-1.5 lg:mt-1.5">
				{student.first_name}
				{student.last_name}
			</div>
		</a>
	{/each}

	<!-- <div class="col-span-4">
		<div class="sticky top-8">
			{#if hovered}
				<div class=" mt-4 text-right">
					{hovered.first_name}
					{hovered.last_name}
				</div>
			{/if}
		</div>
	</div> -->
</div>
