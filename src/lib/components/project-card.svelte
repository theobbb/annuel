<script lang="ts">
	import { page } from '$app/state';
	import type { ProjectsRecord, StudentsRecord } from '$lib/pocketbase.types';
	import { use_store_student_projects } from '$lib/store/store-preview-student.svelte';
	import { setContext } from 'svelte';
	import PreviewStudent from './preview-student.svelte';
	import Student from './student.svelte';

	const { project, students }: { project: ProjectsRecord; students?: StudentsRecord[] } = $props();
	const props_id = $props.id();

	const year = $derived(page.params.year);

	const store_student_projects = use_store_student_projects();
	const preview = $derived(store_student_projects.current);
	setContext('preview_context', props_id);
</script>

<div
	class={[
		'relative col-span-6 sm:col-span-4 md:col-span-3 xl:col-span-2',
		preview?.context_key == props_id && 'z-50'
	]}
>
	<div class="corner relative flex h-fit flex-col bg-bg-2 px-1.5 py-1.5">
		<a
			class="peer absolute inset-0"
			href="/{year}/projets/{project.id}"
			aria-label="link to {project.name}"
		></a>
		<div class="flex aspect-square">
			<div class="aspect-square bg-placeholder"></div>
		</div>
		<div class="invisible relative peer-hover:visible">
			<div
				class="absolute right-0 -bottom-4.5 z-50 icon-[ri--arrow-right-up-line] translate-y-px"
			></div>
		</div>

		<div class="mt-1 pr-gap text-xs whitespace-nowrap">
			<div class="pointer-events-none relative block min-w-0 overflow-hidden text-ellipsis">
				{project.name}
			</div>
			{#if students}
				<div class="pointer-events-none relative z-10 underline">
					{#each students as student}
						<div class="relative">
							<Student {student} />
							{#if preview?.context_key == props_id && preview.student.id == student.id}
								<div class={['absolute', preview.anchor[1] == 'left' ? '-left-gap' : 'right-gap']}>
									<PreviewStudent student={preview.student} class="w-md" />
								</div>
							{/if}
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>
