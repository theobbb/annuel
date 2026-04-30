<script lang="ts">
	import { page } from '$app/state';
	import Facecard from '$lib/ui/components/face-card.svelte';
	import Student from '$lib/components/student.svelte';
	import type { StudentsRecord } from '$lib/pocketbase.types';

	const { students }: { students: StudentsRecord[] } = $props();
</script>

<div class="grid grid-cols-3 gap-4 gap-y-6 md:grid-cols-5 lg:gap-gap lg:gap-y-12 xl:grid-cols-7">
	{#each students as student, i}
		<div class="">
			<a class="relative aspect-2/3 w-full" href="/{page.params.year}/finissant-es/{student.id}">
				<Facecard {student} link={false} />
			</a>

			<div class="mt-1 leading-tight lg:mt-2">
				<Student {student} ref={false} />
			</div>
		</div>
	{/each}
</div>
