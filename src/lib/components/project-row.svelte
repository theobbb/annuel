<script lang="ts">
	import { page } from '$app/state';
	import type { ProjectsRecord, ProjectTagsRecord, StudentsRecord } from '$lib/pocketbase.types';
	import { use_store_student_projects } from '$lib/store/store-preview-student.svelte';
	import { string_to_1_8 } from '$lib/utils/seed';
	import { setContext } from 'svelte';
	import PreviewStudent from './preview-student.svelte';

	import Student from './student.svelte';
	import Tag from './tag.svelte';
	import Image from './image.svelte';

	const { project, students }: { project: ProjectsRecord; students: StudentsRecord[] } = $props();
	const props_id = $props.id();

	const { year, tags_map } = $derived(page.data);

	const tags: ProjectTagsRecord[] = $derived(
		[...(project.tags || [])]?.map((tag) => tags_map.get(tag))
	);
	const n_files = $derived(string_to_1_8(project.name));

	const store_student_projects = use_store_student_projects();
	const preview = $derived(store_student_projects.current);
	setContext('preview_context', props_id);
</script>

<div
	class={[
		'corner group left grid-12 relative mb-1.5 flex-col bg-bg-2 px-3 py-1.5',
		preview?.context_key == props_id && 'z-50'
	]}
>
	<a
		class="peer absolute inset-0 z-5"
		href="/{year}/projets/{project.id}"
		aria-label="link to {project.name}"
	></a>
	<div
		class="invisible absolute bottom-2 left-2 icon-[ri--arrow-right-up-line] text-xl peer-hover:visible"
	></div>
	<div class="title col-span-full pr-gap lg:col-span-3">
		<div class="pointer-events-none relative block text-xl/6">
			{project.name}
		</div>
		<div class="mt-1 mb-gap-y flex gap-1.5">
			{#each tags as tag}
				<div class="pointer-events-none relative z-10"><Tag {tag} /></div>
			{/each}
		</div>
	</div>

	<div class="relative col-span-3">
		<div class="absolute bg-red-500"></div>
		<div class="mt-1">
			{#each students as student}
				<div class="pointer-events-none relative z-10" role="contentinfo">
					<Student {student} underline />
					{#if preview?.context_key == props_id && preview.student.id == student.id}
						<div
							class={[
								'relative translate-x-1/2',
								preview.anchor[0] == 'top' ? '' : '-translate-y-4'
							]}
						>
							<PreviewStudent student={preview.student} class="w-md" />
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>

	<div class="col-span-full grid grid-cols-3 gap-gap lg:col-span-6 lg:grid-cols-6">
		{#each { length: Math.min(6, n_files) } as file, i}
			<div class={[i >= 3 && 'max-lg:hidden-']}><Image id={project.id} index={i} /></div>
		{/each}
	</div>
</div>

<style>
	.peer:hover ~ .title > div:first-child {
		text-decoration: underline;
	}
</style>
