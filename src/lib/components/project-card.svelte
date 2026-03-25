<script lang="ts">
	import { page } from '$app/state';
	import type { ProjectsRecord, StudentsRecord } from '$lib/pocketbase.types';
	import { use_store_student_projects } from '$lib/store/store-preview-student.svelte';
	import { setContext } from 'svelte';
	import PreviewStudent from './preview-student.svelte';
	import Student from './student.svelte';
	import Image from './image.svelte';

	const { project, students }: { project: ProjectsRecord; students?: StudentsRecord[] } = $props();
	const props_id = $props.id();

	const year = $derived(page.params.year);

	const store_student_projects = use_store_student_projects();
	const preview = $derived(store_student_projects.current);
	setContext('preview_context', props_id);
</script>

<div class={['relative', preview?.context_key == props_id && 'z-50']}>
	<div class="relative flex flex-col">
		<a
			class="peer absolute inset-0"
			href="/{year}/projets/{project.id}"
			aria-label="link to {project.name}"
		></a>
		<div class="aspect-3/4 w-full bg-placeholder">
			<!-- <Image id={project.id} index={1} /> -->
		</div>
		<div class="relative opacity-0 transition peer-hover:opacity-100">
			<div
				class="absolute right-0 -bottom-4.5 z-10 icon-[ri--arrow-right-up-line] translate-y-px"
			></div>
		</div>

		<div class="mt-2 pr-4 text-lg/5.5">
			<div class="pointer-events-none relative mb-4 block min-w-0 overflow-hidden text-ellipsis">
				{project.name}
			</div>
			{#if students}
				<div class="pointer-events-none relative z-10 underline">
					{#each students as student}
						<div class="relative">
							<Student {student} />
							<!-- {#if preview?.context_key == props_id && preview.student.id == student.id}
								<div class={['absolute', preview.anchor[1] == 'left' ? '-left-gap' : 'right-gap']}>
									<PreviewStudent student={preview.student} class="w-md" />
								</div>
							{/if} -->
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>
