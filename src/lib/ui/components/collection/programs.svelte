<script lang="ts">
	import { page } from '$app/state';
	import type { ProgramsRecord } from '$lib/pocketbase.types';
	import { url_query_param } from '$lib/utils/url';
	import ProgramOverlay from './program-overlay.svelte';

	const { programs }: { programs: ProgramsRecord[] } = $derived(page.data);

	const current = $derived(page.url.searchParams.get('programme') || '');

	let hovered_i: number = $state(-1);
</script>

{#snippet program_link(label: string, active: boolean)}
	<div
		class={[
			'group rounded-full- border- -m-2 p-2 text-lg font-[420] whitespace-nowrap ring-black/20 transition group-hover:border-current',
			active ? 'border-current-' : 'border-transparent not-hover:text-black/40'
		]}
	>
		{label}
	</div>
{/snippet}

<div
	class="relative flex items-center justify-end gap-6 pb-1"
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
				class="no-hover"
				href={url_query_param(page.url.href, { programme: program.id })}
				onclick={() => (hovered_i = -1)}
			>
				{@render program_link(program.code, current == program.id)}
			</a>
		</div>
		<ProgramOverlay {hovered_i} {i} {program} />
	{/each}
</div>
