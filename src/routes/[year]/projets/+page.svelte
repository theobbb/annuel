<script lang="ts">
	import { page } from '$app/state';
	import ProjectCard from '$lib/components/project-card.svelte';
	import ProjectRow from '$lib/components/project-row.svelte';
	import { shuffle_array } from '$lib/utils/shuffle';
	import DualLayout from '$lib/ui/components/collection/collection-layout.svelte';
	import { use_seed } from '$lib/store/seed-ctx.svelte.js';
	import { url_query_param } from '$lib/utils/url.js';
	import CollectionEmpty from '$lib/ui/components/collection/collection-empty.svelte';

	const { data } = $props();
	const { projects, programs } = $derived(data);

	const seed = use_seed();

	const url_program = $derived(page.url.searchParams.get('programme') || '');
	const url_search_view = $derived(page.url.searchParams.get('vue') || '');

	const view: 'grille' | 'liste' = $derived(url_search_view == 'liste' ? 'liste' : 'grille');

	const url_search = $derived(page.url.searchParams.get('search') ?? '');

	const filtered_projects = $derived.by(() => {
		const program = url_program;
		const query = url_search.toLowerCase().trim();

		return projects.filter((p) => {
			if (program && !p.expand.students.some((s) => s.program === program)) return false;

			if (query) {
				const students_text = p.expand.students
					.map((s) => `${s.first_name} ${s.last_name}`)
					.join(' ')
					.toLowerCase();

				const haystack = `${p.name} ${p.description} ${students_text}`.toLowerCase();
				return haystack.includes(query);
			}

			return true;
		});
	});
	const shuffled_projects = $derived(shuffle_array(filtered_projects, seed.value));

	const CHUNK_SIZE = 72;
	let visible_count = $state(CHUNK_SIZE);

	const visible_projects = $derived(shuffled_projects.slice(0, visible_count));
	const has_more = $derived(visible_count < shuffled_projects.length);
	const is_empty = $derived(filtered_projects.length == 0);

	function load_more() {
		if (!has_more) return;
		visible_count += CHUNK_SIZE;
	}
</script>

<DualLayout items={data.projects} {view}>
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
	{#if is_empty}
		<CollectionEmpty />
	{/if}
</DualLayout>

<button
	class="fixed right-4 bottom-5 z-50 flex cursor-pointer items-center rounded-full border bg-background p-2.5 text-lg shadow-sm transition not-hover:text-muted"
	title="Mélanger"
	onclick={() => seed.shuffle()}
>
	<div class="icon-[ri--shuffle-line]"></div>
</button>
