<script lang="ts">
	import { page } from '$app/state';
	import Headshot from '$lib/components/face-card.svelte';
	import Student from '$lib/components/student.svelte';
	import type { StudentsRecord } from '$lib/pocketbase.types';

	const { students }: { students: StudentsRecord[] } = $props();
</script>

<div class="grid-12">
	<div class="col-span-8 grid grid-cols-6 gap-8">
		{#each students as student}
			<div class="">
				<Headshot {student} />
			</div>
		{/each}
	</div>
	<div class="col-span-4"></div>
</div>
