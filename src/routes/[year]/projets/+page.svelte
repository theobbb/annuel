<script lang="ts">
	import { get_chunk } from './data';

	const { data } = $props();
	const { pagination, year } = data;

	let projects = $state(pagination.items);

	let current_page = $state(pagination.page);

	async function load_more() {
		if (current_page == pagination.totalPages) return;

		const chunk = await get_chunk(year, current_page + 1);

		projects.push(...chunk.items);

		current_page++;
	}
</script>

<div class="mb-1">{pagination.totalItems} projets</div>
<div class="grid-12">
	{#each projects as project}
		<div class="col-span-2 flex flex-col">
			<a class="aspect-square bg-black/10" href="/{year}/projets/{project.id}"></a>
			<div class="mt-1 text-xs/3.5">
				<div>{project.name}</div>
				<a href="/{year}/finissant-e-s/{project.expand.student.id}">{project.expand.student.name}</a
				>
			</div>
		</div>
	{/each}
</div>
{#if current_page < pagination.totalPages}
	<button class="link-hover mt-36 cursor-pointer" onclick={load_more}>
		Load more <span class="inline-flex translate-y-px">+</span>
	</button>
{/if}
