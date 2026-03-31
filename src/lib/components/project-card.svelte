<script lang="ts">
	import { page } from '$app/state';
	import type { ProjectsRecord, StudentsRecord } from '$lib/pocketbase.types';

	import Students from './students.svelte';

	const { project, students }: { project: ProjectsRecord; students: StudentsRecord[] } = $props();
	const props_id = $props.id();

	const year = $derived(page.params.year);
</script>

<div class={['relative']}>
	<div class="relative flex flex-col">
		<a
			class="peer absolute inset-0"
			href="/{year}/projets/{project.id}"
			aria-label="link to {project.name}"
		></a>
		<div class="aspect-3/4 w-full bg-placeholder">
			<!-- <Image id={project.id} index={1} /> -->
		</div>
		<!-- <div class="relative opacity-0 transition peer-hover:opacity-100">
			<div
				class="absolute right-0 -bottom-4.5 z-10 icon-[ri--arrow-right-up-line] translate-y-px"
			></div>
		</div> -->

		<div class="mt-1.5 pr-4 leading-5.5 text-balance lg:mt-2.5">
			<div class="pointer-events-none relative mb-1.5 block max-lg:text-base/5">
				{project.name}
			</div>

			<div><Students {students} /></div>
		</div>
	</div>
</div>
