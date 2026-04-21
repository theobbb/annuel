<script lang="ts">
	import { page } from '$app/state';
	import Facecard from '$lib/components/face-card.svelte';
	import Student from '$lib/components/student.svelte';
	import type { StudentsRecord } from '$lib/pocketbase.types';

	const { students }: { students: StudentsRecord[] } = $props();

	let hovered: StudentsRecord | null = $state(students[0]);

	console.log(6 % 6 == 0);
</script>

<div class="grid grid-cols-3 gap-4 gap-y-6 md:grid-cols-5 lg:gap-gap lg:gap-y-12 xl:grid-cols-7">
	{#each students as student, i}
		<!-- {#if students[i - 1]?.last_name[0] != student.last_name[0]}
			<div class={['col-span-2- text-right ']}>
				{student.last_name[0]}
			</div>
		{/if} -->
		<a
			class=""
			href="/{page.params.year}/finissant-es/{student.id}"
			onmouseenter={() => (hovered = student)}
		>
			<Facecard {student} />

			<div class="mt-1 leading-5.5 lg:mt-2">
				<Student {student} ref={false} />
			</div>
		</a>
	{/each}
</div>
