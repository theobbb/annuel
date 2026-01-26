<script lang="ts">
	import { page } from '$app/state';
	import Relations from '$lib/components/relations.svelte';
	import type { ProjectsRecord, StudentsRecord } from '$lib/pocketbase.types';
	import { use_store_student_projects } from '$lib/store/store-preview-student.svelte';
	import Image from './image.svelte';

	const { student, class: cx }: { student: StudentsRecord; class?: string } = $props();

	const year = $derived(page.params.year);
	const program = $derived(page.data.programs_map.get(student.program));

	let projects: ProjectsRecord[] = $state([]);

	const store = use_store_student_projects();
	async function get_projects() {
		projects = await store.get_projects(student.id);
	}
	$effect(() => {
		get_projects();
	});

	const [anchor_y, anchor_x] = $derived(store.current?.anchor || ['top', 'left']);
</script>

<!-- svelte-ignore attribute_global_event_reference -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class={[
		cx,
		'pointer-events-auto absolute z-500 border bg-bg p-1 text-xs whitespace-normal',
		anchor_y == 'top' ? 'top-0 -translate-y-full' : 'bottom-0 translate-y-full',
		anchor_x == 'left' ? 'right-0' : 'left-0'
	]}
	onmouseenter={() => store.cancel_timer()}
	onmouseleave={() => store.start_timer()}
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
							<Image id={projects[i].id} index={i} />
						</a>
					{/if}
				</div>
			{/each}
		</div>
		{#if projects.length > 3}
			<div class="mt-0.5 px-1 text-right">
				<div>+ {projects.length - 3}</div>
			</div>
		{/if}
	</div>
	<div class="px-1">
		<Relations
			relations={[
				{ type: 'student', ref: student, trigger_preview: false },
				{ type: 'program', ref: program }
			]}
		/>
	</div>
</div>
