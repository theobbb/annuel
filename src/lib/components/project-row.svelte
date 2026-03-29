<script lang="ts">
	import { page } from '$app/state';
	import type { ProjectsRecord, StudentsRecord } from '$lib/pocketbase.types';
	import { use_store_student_projects } from '$lib/store/store-preview-student.svelte';
	import { string_to_1_8 } from '$lib/utils/seed';
	import { setContext } from 'svelte';
	import Student from './student.svelte';

	const { project, students }: { project: ProjectsRecord; students: StudentsRecord[] } = $props();
	const props_id = $props.id();

	const n_files = $derived(string_to_1_8(project.name));

	const store_student_projects = use_store_student_projects();
	const preview = $derived(store_student_projects.current);
	setContext('preview_context', props_id);
</script>

<div
	class={[
		'group grid-12 first:border-t-0- relative flex-col border-t py-4',
		preview?.context_key == props_id && 'z-50'
	]}
>
	<a
		class="peer absolute inset-0 z-5"
		href="/{page.params.year}/projets/{project.id}"
		aria-label="link to {project.name}"
	></a>
	<div class="title col-span-8 text-balance max-lg:leading-5.5 lg:col-span-3">
		<div class="pointer-events-none relative mt-1 block pr-16 font-[430] lg:text-xl/6.5">
			{project.name}
		</div>
	</div>
	<div class="relative col-span-4 lg:col-span-3">
		<div class="mt-1.5 max-lg:space-y-1">
			{#each students as student}
				<div class="pointer-events-none text-muted max-lg:text-sm/3.5" role="contentinfo">
					<Student {student} />
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
				</div>
			{/each}
		</div>
	</div>
	<div
		class="5 col-span-11 grid grid-cols-3 gap-2 max-lg:col-start-2 sm:grid-cols-5 sm:gap-3 lg:col-span-6 lg:gap-4"
	>
		{#each { length: Math.min(5, n_files) } as file, i}
			<div class=" nth-[n+4]:max-sm:hidden">
				<div class="aspect-4/5 bg-placeholder"></div>
				<!-- <Image id={project.id} index={i} /> -->
			</div>
		{/each}
	</div>

	<!-- <div
		class="invisible absolute bottom-2 left-2 icon-[ri--arrow-right-up-line] peer-hover:visible"
	></div> -->
</div>

<style>
	.peer:hover ~ .title > div:first-child {
		text-decoration: underline;
	}
</style>
