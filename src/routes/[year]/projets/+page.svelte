<script lang="ts">
	import { page } from '$app/state';
	import ProgramName from '$lib/components/program-name.svelte';
	import Student from '$lib/components/student.svelte';
	import Search from '$lib/ui/search.svelte';
	import { SvelteURLSearchParams } from 'svelte/reactivity';
	import { get_chunk } from './data';

	import Tag from '$lib/components/tag.svelte';
	import Filter from '$lib/components/filter.svelte';
	import Program from '$lib/components/program.svelte';
	import ProjectCard from '$lib/components/project-card.svelte';

	const { data } = $props();
	const { pagination, programs, tags, year } = $derived(data);

	const search_params = new SvelteURLSearchParams();

	const url_program = $derived(page.url.searchParams.get('programme') || '');
	const url_tag = $derived(page.url.searchParams.get('categorie') || '');

	const programs_map = $derived(new Map(programs.map((program) => [program.id, program])));
	const tags_map = $derived(new Map(tags.map((tag) => [tag.id, tag])));

	let projects = $state(pagination.items);

	let current_page = $state(pagination.page);

	async function load_more() {
		if (current_page == pagination.totalPages) return;
		const chunk = await get_chunk(year, current_page + 1, url_program, url_tag);
		projects.push(...chunk.items);
		current_page++;
	}

	$effect(() => {
		projects = pagination.items;
		current_page = pagination.page;
	});
</script>

<div class="grid-12 mb-gap-y">
	<Filter name="Programmes" param="programme">
		{#each programs as program}
			<div><Program {program} filter /></div>
		{/each}
	</Filter>
	<Filter name="Catégories" param="categorie">
		{#each tags as tag}
			<div><Tag {tag} /></div>
		{/each}
	</Filter>
</div>

<div class="mb-1 flex justify-between gap-x-gap">
	<!-- {#if url_program || url_tag}
		<div>
			Filtre: {programs_map.get(url_program)?.name || tags_map.get(url_tag)?.name}
		</div>
	{/if} -->
	<div>{pagination.totalItems} projets</div>
	<!-- <div><Search /></div> -->
</div>

<div class="grid-12">
	{#each projects as project}
		<ProjectCard {project} student={project.expand.student} />
		<!-- <div class="bg-bg-2 px-1.5 py-1.5 corner col-span-6 flex flex-col sm:col-span-4 md:col-span-3 xl:col-span-2">
			<div class=" aspect-square flex"><a class="aspect-square bg-placeholder " href="/{year}/projets/{project.id}"> </a></div>
			<div class="mt-1 text-xs/3.5">
				<div>{project.name}</div>
				<div class="underline"><Student student={project.expand.student} /></div>
			</div>
		</div> -->
	{/each}
</div>
{#if current_page < pagination.totalPages}
	<button class="link-hover mt-36 cursor-pointer" onclick={load_more}>
		Charger plus <span class="inline-flex translate-y-px">+</span>
	</button>
{/if}
