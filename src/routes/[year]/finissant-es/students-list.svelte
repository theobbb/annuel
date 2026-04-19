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

	let hovered: StudentsRecord | null = $state(null);
</script>

<div class="grid grid-cols-12 lg:gap-gap">
	{#each cols as col}
		<div class="col-span-10 lg:col-span-4">
			{#each col as student, i}
				<div class=" grid grid-cols-12 gap-gap">
					<div class="col-span-2 text-right lg:col-span-4">
						{#if student.last_name[0] != col[i - 1]?.last_name[0]}
							<div>{student.last_name[0]}</div>
						{/if}
					</div>
					<div class="col-span-10 flex gap-0.5 lg:col-span-8">
						<a
							onmouseenter={() => (hovered = student)}
							href="/{page.params.year}/finissant-es/{student.id}"
						>
							{student.last_name}, {student.first_name}
						</a>
					</div>
				</div>
			{/each}
		</div>
	{/each}
	<div class="relative col-span-2 col-start-11 row-start-1 max-sm:hidden">
		<div class="sticky top-8">
			{#if hovered}
				<Facecard student={hovered} />
			{/if}
		</div>
	</div>
</div>
