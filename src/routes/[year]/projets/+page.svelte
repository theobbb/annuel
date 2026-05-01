<script lang="ts">
	import { page } from '$app/state';
	import ProjectCard from '$lib/ui/components/project/project-card.svelte';
	import ProjectRow from '$lib/ui/components/project/project-row.svelte';
	import { shuffle_array } from '$lib/utils/shuffle';
	import CollectionLayout from '$lib/ui/components/collection/collection-layout.svelte';
	import { use_seed } from '$lib/store/seed-ctx.svelte.js';
	import CollectionEmpty from '$lib/ui/components/collection/collection-empty.svelte';
	import { string_normalize } from '$lib/utils/string.js';

	const { data } = $props();
	const { projects } = $derived(data);

	const seed = use_seed();

	const url_program = $derived(page.url.searchParams.get('programme') || '');
	const url_search_view = $derived(page.url.searchParams.get('vue') || '');

	const view: 'grille' | 'liste' = $derived(url_search_view == 'liste' ? 'liste' : 'grille');

	const url_search = $derived(page.url.searchParams.get('search') ?? '');

	const filtered_projects = $derived.by(() => {
		const program = url_program;
		const query = string_normalize(url_search);

		return projects.filter((p) => {
			if (program && !p.expand.students.some((s) => s.program === program)) return false;

			if (query) {
				const students_text = p.expand.students
					.map((s) => `${s.first_name} ${s.last_name}`)
					.join(' ')
					.toLowerCase();

				const haystack = string_normalize(`${p.name} ${p.description} ${students_text}`);
				return haystack.includes(query);
			}

			return true;
		});
	});
	const shuffled_projects = $derived(shuffle_array(filtered_projects, seed.value));

	const CHUNK_SIZE = $derived(view === 'liste' ? 16 : 50);
	let visible_count = $state(CHUNK_SIZE);

	$effect(() => {
		view; // track view changes
		visible_count = CHUNK_SIZE;
	});

	const visible_projects = $derived(shuffled_projects.slice(0, visible_count));
	const has_more = $derived(visible_count < shuffled_projects.length);
	const is_empty = $derived(filtered_projects.length == 0);

	function load_more() {
		if (!has_more) return;
		visible_count += CHUNK_SIZE;
	}
</script>

<CollectionLayout items={data.projects} {view}>
	<div
		class={[
			'',
			view == 'grille'
				? 'grid grid-cols-2 gap-x-gap gap-y-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-y-8'
				: ''
		]}
	>
		{#each visible_projects as project (project.id)}
			{#if url_search_view == 'liste'}
				<ProjectRow {project} students={project.expand.students} />
			{:else}
				<ProjectCard {project} students={project.expand.students} />
			{/if}
		{/each}
	</div>
	{#if has_more}
		<button class="mt-32 cursor-pointer py-2 hover:underline" onclick={load_more}>
			Charger plus <span class="translate-y-px- inline-flex">(+)</span>
		</button>
	{/if}
	{#if is_empty}
		<CollectionEmpty />
	{/if}
</CollectionLayout>

<button
	class="fixed right-gap bottom-gap z-10 flex cursor-pointer items-center rounded-full border bg-background p-2 text-base transition not-hover:text-muted"
	title="Mélanger"
	onclick={() => seed.shuffle()}
>
	<div class="icon-[ri--shuffle-line]"></div>
</button>

<svelte:head>
	<title>Annuel {page.params.year} — Projets</title>
	<meta
		name="description"
		content="Annuel de design {page.params
			.year} — Les projets des finissant.es de l’école de design de l’UQAM"
	/>
</svelte:head>
