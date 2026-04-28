<script lang="ts">
	import { page } from '$app/state';
	import type { StudentsRecord } from '$lib/pocketbase.types';
	import FaceCard from '$lib/ui/components/face-card.svelte';

	const { students }: { students: StudentsRecord[] } = $props();

	const cols = $derived.by(() => {
		const col_1 = [];
		const col_2 = [];

		// Sort the students properly first to handle lowercase and accents
		const sortedStudents = [...students].sort((a, b) =>
			a.last_name.localeCompare(b.last_name, 'fr', { sensitivity: 'base' })
		);

		for (const student of sortedStudents) {
			// Use toUpperCase() here so 'd' is treated as 'D'
			const firstChar = student.last_name[0].toUpperCase();

			if (firstChar <= 'M') {
				col_1.push(student);
			} else {
				col_2.push(student);
			}
		}
		return [col_1, col_2];
	});

	let hovered: StudentsRecord | null = $state(null);
</script>

<div class="grid grid-cols-10 gap-x-gap leading-relaxed">
	{#each cols as col}
		<div class="col-span-full lg:col-span-3">
			<div class="grid grid-cols-7 gap-x-gap lg:grid-cols-3">
				{#each col as student, i}
					<div class="text-right">
						{#if student.last_name[0] != col[i - 1]?.last_name[0]}
							<div>{student.last_name[0].toUpperCase()}</div>
						{/if}
					</div>
					<div class="col-span-6 flex lg:col-span-2">
						<a
							onmouseenter={() => (hovered = student)}
							href="/{page.params.year}/finissant-es/{student.id}"
							class={[hovered?.id == student.id && 'underline']}
						>
							{student.last_name}, {student.first_name}
						</a>
					</div>
				{/each}
			</div>
		</div>
	{/each}
	<div class="relative col-span-2 col-start-9 row-start-1 max-sm:hidden">
		<div class="sticky top-8">
			{#if hovered}
				<FaceCard student={hovered} />
			{/if}
		</div>
	</div>
</div>
