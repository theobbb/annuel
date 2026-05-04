<script lang="ts">
	import { page } from '$app/state';
	import type { ProjectsRecord, StudentsRecord } from '$lib/pocketbase.types';
	import ArrowHover from '$lib/ui/components/arrow-hover.svelte';
	import ProjectThumbnail from '$lib/ui/components/project/project-thumbnail.svelte';
	import Students from '../../../components/students.svelte';

	const { project, students }: { project: ProjectsRecord; students: StudentsRecord[] } = $props();

	const year = $derived(page.params.year);
</script>

<div class={['relative']}>
	<div class="group/card relative flex flex-col">
		<a
			class="peer absolute inset-0"
			href="/{year}/projets/{project.id}"
			aria-label="link to {project.name}"
		></a>

		<div class=" pointer-events-none relative">
			<ProjectThumbnail {project} />
			<ArrowHover />
		</div>

		<div class="mt-2 pr-4 leading-tight text-balance lg:mt-2.5">
			<div class="pointer-events-none group-hover/card:underline">
				{project.name}
			</div>
		</div>
	</div>
	<div class="mt-1 text-muted lg:mt-1"><Students {students} /></div>
</div>
