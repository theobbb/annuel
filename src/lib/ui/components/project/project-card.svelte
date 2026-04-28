<script lang="ts">
	import { page } from '$app/state';
	import type { ProjectsRecord, StudentsRecord } from '$lib/pocketbase.types';
	import ArrowHover from '$lib/ui/components/arrow-hover.svelte';
	import Thumbnail from '$lib/ui/components/project/thumbnail.svelte';

	import Students from '../../../components/students.svelte';

	const { project, students }: { project: ProjectsRecord; students: StudentsRecord[] } = $props();
	const props_id = $props.id();

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
			<Thumbnail {project} />
			<ArrowHover />
		</div>

		<!-- <div class="relative opacity-0 transition peer-hover:opacity-100">
			<div
				class="absolute right-0 -bottom-4.5 z-10 icon-[ri--arrow-right-up-line] translate-y-px"
			></div>
		</div> -->

		<div class="mt-2 pr-4 leading-tight text-balance lg:mt-2">
			<div class="pointer-events-none group-hover/card:underline">
				{project.name}
			</div>
		</div>
	</div>
	<div class="mt-1.5 text-muted lg:mt-1.5"><Students {students} /></div>
</div>
