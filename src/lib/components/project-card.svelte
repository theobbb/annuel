<script lang="ts">
	import { page } from '$app/state';
	import type { ProjectsRecord, StudentsRecord } from '$lib/pocketbase.types';
	import Student from './student.svelte';

	const { project, student }: { project: ProjectsRecord; student?: StudentsRecord } = $props();

	const year = $derived(page.params.year);
</script>

<div
	class="corner relative col-span-6 flex h-fit flex-col bg-bg-2 px-1.5 py-1.5 sm:col-span-4 md:col-span-3 xl:col-span-2"
>
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

	<div class="mt-1 pr-gap text-xs/3.5 whitespace-nowrap">
		<div class="pointer-events-none relative block min-w-0 overflow-hidden text-ellipsis">
			{project.name}
		</div>
		{#if student}
			<div class="pointer-events-none relative z-10 underline"><Student {student} /></div>
		{/if}
	</div>
</div>
