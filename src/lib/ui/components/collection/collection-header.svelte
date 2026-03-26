<script lang="ts">
	import { page } from '$app/state';
	import type { ProgramsRecord } from '$lib/pocketbase.types';
	import { url_query_param } from '$lib/utils/url';
	import CollectionFilters from './collection-filters.svelte';
	import OverlayProgram from './overlay-program.svelte';

	const { view }: { view: 'grille' | 'liste'; n_items: number } = $props();

	const { programs }: { programs: ProgramsRecord[] } = $derived(page.data);

	const current = $derived(page.url.searchParams.get('programme') || '');

	let pop_visible = $state(false);
	let hovered: ProgramsRecord | null = $state(null);

	const tabs = $derived([
		{
			name: 'Projets',
			param: 'projets',
			length: page.data.n_projects
		},
		{
			name: 'Finissant.e.s',
			param: 'finissant-e-s',
			length: page.data.n_students
		}
	]);
	const current_tab = $derived(page.route.id?.split('/')[2]);
</script>

<div class="grid-12">
	<div class="col-span-6">
		<a href="/{page.params.year}">Annuel de design</a>
	</div>
	<div class=" col-span-6">
		<div
			class="flex justify-between"
			role="navigation"
			aria-label="Sélection de programme"
			onmouseleave={() => (pop_visible = false)}
			onblur={() => (pop_visible = false)}
		>
			<div
				role="none"
				onmouseenter={() => (pop_visible = false)}
				onfocus={() => (pop_visible = false)}
			>
				<a
					class={[
						'-mx-3 -my-1 rounded-full px-3 py-1 whitespace-nowrap ring-black/20',
						!current ? 'border-b- border-current- ring' : 'text-black/40-'
					]}
					href={url_query_param(page.url.href, { programme: null })}
				>
					Tous les programmes
				</a>
			</div>

			{#each programs as program}
				<div
					role="listitem"
					onmouseenter={() => {
						pop_visible = true;
						hovered = program;
					}}
					onfocus={() => {
						pop_visible = true;
						hovered = program;
					}}
				>
					<a
						class="no-hover group"
						href={url_query_param(page.url.href, { programme: program.id })}
						onclick={() => (pop_visible = false)}
					>
						<div
							class={[
								'-mx-3 -my-1 border-b px-3 py-1 tracking-wide ring-black/20 group-hover:border-current',
								current == program.id
									? 'black- bg-white/30- ring-  border-current-'
									: 'border-transparent text-black/40'
							]}
						>
							{program.code}
						</div>
					</a>
				</div>
			{/each}
		</div>
	</div>
</div>
<div class="mt-24 border-b py-2">
	<div class="grid-12">
		<div class="col-span-6 flex gap-1 whitespace-nowrap">
			{#each tabs as { name, param, length }}
				<a
					class={[
						'hover-black block min-w-48 rounded-sm px-4 py-1.5 pr-2.5 text-center font-[430]',
						current_tab === param ? 'black' : ''
					]}
					href={url_query_param(`/${page.params.year}/${param}`, { programme: current || null })}
				>
					{name} <sup>{length}</sup>
				</a>
			{/each}
		</div>
		<div class="col-span-4 col-start-9">
			<CollectionFilters {view} />
		</div>
	</div>
</div>

<OverlayProgram visible={pop_visible} program={hovered} />
<!-- <OverlayProgram visible={true} program={programs[0]} /> -->
