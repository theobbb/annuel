<script lang="ts">
	import { page } from '$app/state';
	import type { ProjectsRecord, StudentsRecord } from '$lib/pocketbase.types';
	import { string_to_1_8 } from '$lib/utils/seed';
	import Students from './students.svelte';

	const { project, students }: { project: ProjectsRecord; students: StudentsRecord[] } = $props();

	const n_files = $derived(string_to_1_8(project.name));
</script>

<hr />
<div class={['group border-t- relative grid grid-cols-10 flex-col gap-x-gap gap-y-2 py-4']}>
	<a
		class="peer absolute inset-0 z-5"
		href="/{page.params.year}/projets/{project.id}"
		aria-label="link to {project.name}"
	></a>
	<div class="title col-span-full text-balance max-lg:leading-5.5 lg:col-span-3">
		<div class="pointer-events-none relative mt-1 block pr-24 lg:text-2xl/7">
			{project.name}
		</div>
	</div>
	<div class="relative col-span-full lg:col-span-2 lg:col-start-4">
		<Students {students} />
	</div>
	<div
		class="max-lg:col-start-2- lg:gap-2x col-span-full grid grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-4 lg:col-span-5"
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
<hr class="not-last:hidden" />

<style>
	.peer:hover ~ .title > div:first-child {
		text-decoration: underline;
	}
</style>
