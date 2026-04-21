<script lang="ts">
	import type { StudentsRecord } from '$lib/pocketbase.types';
	import Student from './student.svelte';

	const { students }: { students: StudentsRecord[] } = $props();
</script>

<div class="flex flex-col leading-tight">
	{#each students as student}
		<Student {student} />
	{/each}
</div>
<!-- {#if preview?.context_key == props_id && preview.student.id == student.id}
						<div
							class={[
								'relative translate-x-1/2',
								preview.anchor[0] == 'top' ? '' : '-translate-y-4'
							]}
						>
							<PreviewStudent student={preview.student} class="w-md" />
						</div>
					{/if} -->
