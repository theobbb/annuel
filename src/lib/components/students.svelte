<script lang="ts">
	import type { StudentsRecord } from '$lib/pocketbase.types';
	import { use_store_student_projects } from '$lib/store/store-preview-student.svelte';
	import { setContext } from 'svelte';
	import Student from './student.svelte';
	import PreviewStudent from './preview-student.svelte';

	const { students }: { students: StudentsRecord[] } = $props();

	const props_id = $props.id();

	const store_student_projects = use_store_student_projects();
	const preview = $derived(store_student_projects.current);
	setContext('preview_context', props_id);
</script>

{#each students as student, i}
	<div class="relative inline-flex">
		<Student {student} />

		<!-- {#if preview?.context_key == props_id && preview.student.id == student.id}
				<PreviewStudent student={preview.student} class="w-md" />
			{/if} -->
	</div>
{/each}
