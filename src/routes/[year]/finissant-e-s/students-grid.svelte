<script lang="ts">
	import { page } from '$app/state';
	import Facecard from '$lib/components/face-card.svelte';
	import type { StudentsRecord } from '$lib/pocketbase.types';

	const { students }: { students: StudentsRecord[] } = $props();

	let hovered: StudentsRecord | null = $state(students[0]);
</script>

<div class="grid-12">
	<div class="col-span-8 grid grid-cols-6 gap-8">
		{#each students as student}
			<a
				class=""
				href="/{page.params.year}/finissant-e-s/{student.id}"
				onmouseenter={() => (hovered = student)}
			>
				<Facecard {student} />
			</a>
		{/each}
	</div>
	<div class="col-span-4">
		<div class="sticky top-8">
			{#if hovered}
				<div class=" mt-4 text-right">
					{hovered.first_name}
					{hovered.last_name}
				</div>
			{/if}
		</div>
	</div>
</div>
