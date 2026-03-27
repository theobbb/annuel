<script lang="ts">
	import { page } from '$app/state';
	import Facecard from '$lib/components/face-card.svelte';
	import type { StudentsRecord } from '$lib/pocketbase.types';

	const { students }: { students: StudentsRecord[] } = $props();

	let hovered: StudentsRecord | null = $state(students[0]);
</script>

<div class="grid grid-cols-7 gap-8">
	{#each students as student}
		<a
			class=""
			href="/{page.params.year}/finissant-e-s/{student.id}"
			onmouseenter={() => (hovered = student)}
		>
			<Facecard {student} />
			<div class="text-center- px-2- mt-2.5 text-base/4.5 tracking-wide">
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
