<script lang="ts">
	import { page } from '$app/state';
	import type { ProjectsRecord, StudentsRecord } from '$lib/pocketbase.types';
	import Thumbnail from '$lib/ui/components/project/thumbnail.svelte';

	import Students from './students.svelte';

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
			<div
				class="not-group-hover/card:translate-x-4- transition- pointer-events-none absolute right-4 bottom-4 not-group-hover/card:opacity-0"
			>
				<div class="black flex items-center justify-center border p-0.5">
					<div class="icon-[ri--arrow-right-line] text-xl"></div>
				</div>
			</div>
		</div>

		<!-- <div class="relative opacity-0 transition peer-hover:opacity-100">
			<div
				class="absolute right-0 -bottom-4.5 z-10 icon-[ri--arrow-right-up-line] translate-y-px"
			></div>
		</div> -->

		<div class="mt-1.5 pr-4 leading-6 text-balance lg:mt-2.5">
			<div class="pointer-events-none relative block group-hover/card:underline max-lg:text-base/5">
				{project.name}
			</div>
		</div>
	</div>
	<div><Students {students} /></div>
</div>
