<script lang="ts">
	import { page } from '$app/state';
	import type { StudentsRecord } from '$lib/pocketbase.types';
	import { use_store_student_projects } from '$lib/store/store-preview-student.svelte';
	import { get_anchor_pos } from '$lib/utils/anchor';
	import { getContext } from 'svelte';

	const {
		student,
		reverse = false,
		underline = false,
		trigger_preview = true
	}: {
		student: StudentsRecord;
		reverse?: boolean;
		underline?: boolean;
		trigger_preview?: boolean;
	} = $props();

	const store_student_projects = use_store_student_projects();

	const preview_context: string | null = getContext('preview_context');

	const is_student_page = $derived(page.params.student == student.id);

	function onmouseenter(event: MouseEvent & { currentTarget: EventTarget & HTMLAnchorElement }) {
		if (!trigger_preview) return;
		const rect = event.currentTarget.getBoundingClientRect();
		const anchor = get_anchor_pos(rect);
		store_student_projects.set_current({
			student,
			anchor,
			context_key: preview_context
		});
	}
	function onmouseleave() {
		store_student_projects.start_timer();
	}
</script>

{#snippet content()}
	{#if reverse}
		{student.last_name}, {student.first_name}
	{:else}
		<div class="inline-flex gap-1">
			<span class="">—</span>
			<div>
				{student.first_name}
				{student.last_name}
			</div>
		</div>
	{/if}
{/snippet}
{#if is_student_page}
	<span class="pointer-events-auto">
		{@render content()}
	</span>
{:else}
	<a
		href="/{page.params.year}/finissant-es/{student.id}"
		class={['pointer-events-auto relative z-10 hover:underline']}
		{onmouseenter}
		{onmouseleave}
	>
		{@render content()}
	</a>
{/if}
