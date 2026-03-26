<script lang="ts">
	import { page } from '$app/state';
	import Facecard from '$lib/components/face-card.svelte';
	import type { StudentsRecord } from '$lib/pocketbase.types';

	const { students }: { students: StudentsRecord[] } = $props();

	const cols = $derived.by(() => {
		const col_1 = [];
		const col_2 = [];
		for (const student of students) {
			if (student.last_name[0].toUpperCase() <= 'M') col_1.push(student);
			else col_2.push(student);
		}
		return [col_1, col_2];
	});

	let hovered: StudentsRecord | null = $state(students[0]);
</script>

<div class="grid-12 mt-24">
	{#each cols as col}
		<div class="col-span-4">
			{#each col as student, i}
				<div class="my-1 grid grid-cols-4 gap-8">
					<div class="text-right">
						{#if student.last_name[0] != col[i - 1]?.last_name[0]}
							<div>{student.last_name[0]}</div>
						{/if}
					</div>
					<div class="col-span-3 flex gap-0.5">
						<a
							onmouseenter={() => (hovered = student)}
							href="/{page.params.year}/finissant-e-s/{student.id}"
						>
							{student.last_name}, {student.first_name}
						</a>
					</div>
				</div>
			{/each}
		</div>
	{/each}
	<div class="relative col-span-2 col-start-11">
		<div class="sticky top-8">
			{#if hovered}
				<Facecard student={hovered} />
				<div class=" mt-4 text-right">
					{hovered.first_name}
					{hovered.last_name}
				</div>
			{/if}
		</div>
	</div>
</div>
