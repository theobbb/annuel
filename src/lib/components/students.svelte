<script lang="ts">
	import type { StudentsRecord } from '$lib/pocketbase.types';
	import Student from './student.svelte';

	const { students }: { students: StudentsRecord[] } = $props();
</script>

<div class="mt-1.5 space-y-0.5 leading-5.5">
	{#each students as student}
		<div class=" text-muted max-lg:text-base/4.5" role="contentinfo">
			<Student {student} />
		</div>
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
