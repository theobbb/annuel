<script lang="ts">
	import { page } from '$app/state';
	import Relations from '$lib/components/relations.svelte';
	import type { ProjectsRecord, StudentsRecord } from '$lib/pocketbase.types';
	import { use_store_student_projects } from '$lib/store/store-preview-student.svelte';
	import { get_anchor_pos } from '$lib/utils/anchor';

	const { student, class: cx }: { student: StudentsRecord; class?: string } = $props();

	const year = $derived(page.params.year);
	const program = $derived(page.data.programs_map.get(student.program));

	let projects: ProjectsRecord[] = $state([]);

	const store_student_projects = use_store_student_projects();
	async function get_projects() {
		projects = await store_student_projects.get_projects(student.id);
	}
	$effect(() => {
		get_projects();
	});

	const [anchor_y, anchor_x] = $derived(store_student_projects.current?.anchor || ['top', 'left']);
</script>

<div
	class={[
		cx,
		'pointer-events-auto absolute z-500 border bg-bg p-1 text-xs whitespace-normal',
		anchor_y == 'top' ? 'top-0 -translate-y-full' : 'bottom-0 translate-y-full',
		anchor_x == 'left' ? 'right-0' : 'left-0'
	]}
>
	<div class="mb-gap-y">
		<div class="grid w-full grid-cols-3 gap-1">
			{#each { length: 3 } as _, i}
				<div
					class={[
						'aspect-square',
						projects[i] ? 'opacity-100' : 'opacity-0',
						'transition duration-100'
					]}
				>
					{#if projects[i]}
						<a class="relative block bg-bg-2 p-1.5" href="/{year}/projets/{projects[i].id}">
							<div class="aspect-square bg-placeholder"></div>
						</a>
					{/if}
				</div>
			{/each}
		</div>
		{#if projects.length > 3}
			<div class="mt-0.5 px-1 text-right">+ {projects.length - 3}</div>
		{/if}
	</div>
	<div class="px-1">
		<Relations
			relations={[
				{ type: 'student', ref: student },
				{ type: 'program', ref: program }
			]}
		/>
	</div>
</div>
