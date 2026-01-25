<script lang="ts">
	import type { StudentsRecord } from '$lib/pocketbase.types';
	import { use_store_students, type StoreStudent } from '$lib/store/store-preview-student.svelte';
	import Relations from '../relations.svelte';

	const { student, id }: { student: StudentsRecord; id: string } = $props();

	const store_students = use_store_students();

	let store_student: StoreStudent | null = $state(null);

	async function get_student() {
		store_student = await store_students.get_student(id);
	}

	$effect(() => {
		get_student();
	});
</script>

<div class="text-xs/3.5">
	{#if store_student}
		<div class="mb-gap-y grid w-full grid-cols-3">
			{#each { length: 3 } as _}
				<div class="aspect-square bg-black/10"></div>
			{/each}
		</div>
		<Relations
			relations={[
				{ type: 'student', ref: store_student },
				{ type: 'program', ref: store_student.expand.program }
			]}
		/>
	{/if}
</div>
