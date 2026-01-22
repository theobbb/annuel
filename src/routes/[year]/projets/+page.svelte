<script lang="ts">
	import { page } from '$app/state';
	import ProgramName from '$lib/components/program-name.svelte';
	import Program from '$lib/components/program.svelte';
	import Student from '$lib/components/student.svelte';
	import { get_chunk } from './data';

	const { data } = $props();
	const { pagination, programs, tags, year } = $derived(data);

	const program = page.url.searchParams.get('programme') || '';
	const tag = page.url.searchParams.get('categorie') || '';

	let extra_projects = $state([]);
	let projects = $state(pagination.items);

	let current_page = $state(pagination.page);

	async function load_more() {
		if (current_page == pagination.totalPages) return;

		const chunk = await get_chunk(year, current_page + 1, program, tag);

		projects.push(...chunk.items);

		current_page++;
	}

	$effect(() => {
		projects = pagination.items;
		current_page = pagination.page;
	});
</script>

<div class="mb-gap-y"><a href="/{year}/projets">Tous les projets</a></div>
<div class="grid-12 mb-gap-y">
	<div class="col-span-6">
		<div class="text-2 border-b">Programmes</div>
		{#each programs as program}
			<div>
				<a href="/{year}/projets?programme={program.id}">
					<ProgramName {program} />
				</a>
			</div>
		{/each}
	</div>
	<div class="col-span-6">
		<div class="text-2 border-b">Catégories</div>
		<div class="">
			{#each tags as tag}
				<div>
					<a href="/{year}/projets?categorie={tag.id}">
						{tag.name}
					</a>
				</div>
			{/each}
		</div>
	</div>
</div>
<div class="mb-1">{pagination.totalItems} projets</div>
<div class="grid-12">
	{#each projects as project}
		<div class="col-span-2 flex flex-col">
			<a class="aspect-square bg-black/10" href="/{year}/projets/{project.id}"> </a>
			<div class="mt-1 text-xs/3.5">
				<div>{project.name}</div>
				<Student student={project.expand.student} />
			</div>
		</div>
	{/each}
</div>
{#if current_page < pagination.totalPages}
	<button class="link-hover mt-36 cursor-pointer" onclick={load_more}>
		Load more <span class="inline-flex translate-y-px">+</span>
	</button>
{/if}
