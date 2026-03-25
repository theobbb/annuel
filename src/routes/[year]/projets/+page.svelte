<script lang="ts">
	import { page } from '$app/state';
	import Filter from '$lib/components/filter.svelte';
	import Program from '$lib/components/program.svelte';
	import ProjectCard from '$lib/components/project-card.svelte';
	import ProjectRow from '$lib/components/project-row.svelte';
	import View from './view.svelte';
	import { shuffle_array } from '$lib/utils/shuffle';
	import type { ProjectsRecordExpanded } from './+page.server';
	import HeaderPrograms from '$lib/ui/templates/header-programs.svelte';
	import FooterFilters from '$lib/ui/templates/footer-filters.svelte';
	import DualLayout from '$lib/ui/templates/dual-layout.svelte';

	const { data } = $props();
	const { projects, programs } = $derived(data);

	// 1. URL Params (Works on Server & Client)
	const url_program = $derived(page.url.searchParams.get('programme') || '');
	const url_search_view = $derived(page.url.searchParams.get('vue') || '');

	const view: 'grille' | 'liste' = $derived(url_search_view == 'liste' ? 'liste' : 'grille');
	// 2. The "Canonical" List
	// This derived calculates the correct list for SSR and Client based on URL
	const filtered_source = $derived(
		projects.filter((p) => {
			if (!url_program) return true;
			return p.program === url_program;
		})
	);

	// 3. The "Mutable" Pool (SSR Friendly)
	const CHUNK_SIZE = 72;

	// FIX: Initialize with 'filtered_source' immediately so SSR generates HTML.
	// Svelte unwraps the derived value here during initialization.
	let display_pool = $state<ProjectsRecordExpanded[]>(filtered_source);

	let visible_count = $state(CHUNK_SIZE);

	// 4. Client-Side Sync
	// We still need this! If the user clicks a filter link (client nav),
	// 'display_pool' won't update automatically because it's a state copy.
	// This effect forces the sync.
	$effect(() => {
		// Reset pool when the source (URL/Data) changes
		display_pool = [...filtered_source];
		visible_count = CHUNK_SIZE;
	});

	// 5. Computed View
	const visible_projects = $derived(display_pool.slice(0, visible_count));
	const has_more = $derived(visible_count < display_pool.length);

	function load_more() {
		visible_count += CHUNK_SIZE;
	}

	function shuffle() {
		// Since we have a mutable copy (display_pool), we can shuffle safely
		shuffle_array(display_pool);
	}
</script>

<!-- <HeaderPrograms /> -->

<!-- <div class="gap-x-gap mb-2 flex items-end justify-between">
	<div class="ml-px">
		{display_pool.length} projets
	</div>

	<div class="flex items-center justify-end gap-2">
		<button onclick={shuffle} class="cursor-pointer hover:text-black"> Mélanger </button>
		<View />
	</div>
</div> -->

<DualLayout items={data.projects}>
	<div class={['mt-24-', view == 'grille' ? 'mt-8 grid grid-cols-5 gap-8' : '']}>
		{#each visible_projects as project (project.id)}
			{#if url_search_view == 'liste'}
				<ProjectRow {project} students={project.expand.students} />
			{:else}
				<ProjectCard {project} students={project.expand.students} />
			{/if}
		{/each}
	</div>
	{#if has_more}
		<button class="link-hover corner mt-24 w-full cursor-pointer py-2 text-lg" onclick={load_more}>
			Charger plus <span class="inline-flex translate-y-px">+</span>
		</button>
	{/if}
</DualLayout>

<!-- <FooterFilters n_items={data.n_projects} /> -->
