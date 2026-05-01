<script lang="ts">
	import { page } from '$app/state';
	import type { ProjectsRecord, StudentsRecord } from '$lib/pocketbase.types';
	import { get_media_type } from '$lib/utils/media-type';
	import Students from '../../../components/students.svelte';
	import Image from '../media/image.svelte';

	const { project, students }: { project: ProjectsRecord; students: StudentsRecord[] } = $props();

	const files = $derived(project.files?.filter((f) => get_media_type(f) == 'image')?.slice(0, 4));
</script>

<div class={['group grid-10 relative flex-col gap-y-2 border-t py-gap']}>
	<a
		class="peer absolute inset-0 z-5"
		href="/{page.params.year}/projets/{project.id}"
		aria-label="link to {project.name}"
	></a>
	<div class="group/title col-span-full text-balance lg:col-span-4">
		<h2
			class="pointer-events-none relative -mt-1 block leading-tight group-peer-hover/title:underline lg:pr-24"
		>
			{project.name}
		</h2>
		<div class="mt-2 text-muted md:mt-3.5"><Students {students} /></div>
	</div>

	<div
		class="col-span-full grid grid-cols-3 gap-2 max-lg:my-gap sm:grid-cols-4 sm:gap-4 lg:col-span-6"
	>
		{#each files as file, i}
			<div class="nth-[n+4]:max-sm:hidden">
				<div class="aspect-4/5 bg-placeholder">
					<Image
						class="h-full w-full object-cover"
						record_id={project.id}
						filename={file}
						collection="projects"
						sizes="400x500"
					/>
				</div>
			</div>
		{/each}
	</div>
</div>
