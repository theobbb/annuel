<script lang="ts">
	import { page } from '$app/state';
	import type { ProgramsRecord } from '$lib/pocketbase.types';
	import { url_query_param } from '$lib/utils/url';
	import ProgramLink from '../link-program.svelte';

	const { programs }: { programs: ProgramsRecord[] } = $derived(page.data);

	const current = $derived(page.url.searchParams.get('programme') || '');

	let pop_visible = $state(true);
	let hovered: ProgramsRecord | null = $state(programs[0]);

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
	<div class="col-span-6">
		<div
			class="flex justify-between"
			role="list"
			onmouseleave={() => (pop_visible = false)}
			onblur={() => (pop_visible = false)}
		>
			{#each programs as program}
				<div
					class="peer"
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
					<ProgramLink {program}>
						<div
							class={[
								'-mx-4 -my-1.5 px-4 py-1.5',
								current == program.id ? 'bg-black text-white' : ''
							]}
						>
							{program.code}
						</div>
					</ProgramLink>
				</div>
			{/each}
		</div>
	</div>
</div>
<div class="mt-24 border-b-2">
	<div class="flex whitespace-nowrap">
		{#each tabs as { name, param, length }}
			<a
				class={[
					'min-w-64- block px-6  py-3 text-center',
					current_tab === param ? 'bg-black text-white' : ''
				]}
				href={url_query_param(`/${page.params.year}/${param}`, { programme: current || null })}
			>
				{name} <sup>{length}</sup>
			</a>
		{/each}
	</div>
</div>

<div
	class={[
		'pointer-events-none fixed top-0 right-0 left-0 z-20 h-20 bg-background mix-blend-difference',
		pop_visible ? '' : '-translate-y-2 opacity-0',
		'transition ease-in-out'
	]}
></div>

<div
	class={[
		'pointer-events-none fixed top-20 right-0 left-0 z-20',
		pop_visible ? '' : '-translate-y-2 opacity-0',
		'transition ease-in-out'
	]}
>
	{#if hovered}
		<div
			class="grid-12 min-h-[50svh]- grid-rows-[1fr_auto] items-end gap-y-6! bg-black px-8 py-8 pt-16 text-balance text-background"
		>
			<div class="col-span-4">
				{hovered.name}
			</div>
			<div class="col-span-5 col-start-7">{hovered.description}</div>

			<div class="col-span-full border-b-2"></div>
		</div>
	{/if}
</div>
