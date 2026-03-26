<script lang="ts">
	import { page } from '$app/state';
	import type { ProgramsRecord } from '$lib/pocketbase.types';
	import { url_query_param } from '$lib/utils/url';
	import CollectionFilters from './collection-filters.svelte';
	import OverlayProgram from './overlay-program.svelte';

	const { view }: { view: 'grille' | 'liste'; n_items: number } = $props();

	const { programs }: { programs: ProgramsRecord[] } = $derived(page.data);

	const current = $derived(page.url.searchParams.get('programme') || '');

	// let pop_visible = $state(false);
	let hovered_i: number = $state(-1);

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

{#snippet program_link(label: string, active: boolean)}
	<div
		class={[
			'group -mx-3 -my-1.5 border-b-2 px-3 py-1.5 whitespace-nowrap ring-black/20 transition group-hover:border-current',
			active ? 'border-current' : 'border-transparent not-hover:text-black/40'
		]}
	>
		{label}
	</div>
{/snippet}

<div class="grid-12">
	<div class="col-span-6">
		<a href="/{page.params.year}">Annuel de design</a>
	</div>
	<div class={['relative z-100 col-span-6']}>
		<div
			class="flex justify-between pb-1"
			role="navigation"
			aria-label="Sélection de programme"
			onmouseleave={() => (hovered_i = -1)}
			onblur={() => (hovered_i = -1)}
		>
			<div role="none" onmouseenter={() => (hovered_i = -1)} onfocus={() => (hovered_i = -1)}>
				<a class="no-hover" href={url_query_param(page.url.href, { programme: null })}>
					{@render program_link('Tous les programmes', !current)}
				</a>
			</div>

			{#each programs as program, i}
				<div
					role="listitem"
					onmouseenter={() => {
						hovered_i = i;
					}}
					onfocus={() => {
						hovered_i = i;
					}}
				>
					<a
						class="no-hover tracking-wide"
						href={url_query_param(page.url.href, { programme: program.id })}
						onclick={() => (hovered_i = -1)}
					>
						{@render program_link(program.code, current == program.id)}
					</a>
				</div>
				<OverlayProgram {hovered_i} {i} {program} />
			{/each}
		</div>
	</div>
</div>
<div class="py-1- sticky top-0 z-20 mt-12 border-b bg-background">
	<div class="grid-12 items-center">
		<div class="col-span-6">
			<div class="flex gap-1 whitespace-nowrap">
				{#each tabs as { name, param, length }}
					<a
						class={[
							'no-hover block border-b-2 py-2 pr-5.5 pl-6.5 text-center font-[430]',
							current_tab === param
								? ' border-black'
								: 'border-transparent not-hover:text-black/40',
							'transition'
						]}
						href={url_query_param(`/${page.params.year}/${param}`, { programme: current || null })}
					>
						{name} <sup>{length}</sup>
					</a>
				{/each}
			</div>
		</div>
		<div class="col-span-4 col-start-9">
			<CollectionFilters {view} />
		</div>
	</div>
</div>

<!-- <OverlayProgram visible={pop_visible} program={hovered} /> -->
