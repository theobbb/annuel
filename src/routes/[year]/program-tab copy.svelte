<script lang="ts">
	import type { Snippet } from 'svelte';

	const {
		name,
		i,
		parent,
		children
	}: { name: string; i: number; parent?: boolean; children: Snippet } = $props();
</script>

<div class={['relative -mt-7 grid grid-cols-10 gap-22 transition', parent ? 'italic' : '']}>
	<div class="absolute bottom-0 left-0 w-full border-b border-black"></div>
	<div class="absolute bottom-px left-0 translate-y-full">
		{@render outer_left()}
	</div>
	<div class="absolute right-0 bottom-px translate-y-full -scale-x-100">
		{@render outer_left()}
	</div>
	<div
		class={[
			'relative z-10 col-span-10 text-balance lg:col-span-4 ',
			i % 2 == 0 ? 'lg:col-start-2' : 'lg:col-start-6',
			parent ? ' lg:col-start-2-' : 'lg:col-start-6-'
		]}
	>
		<div class={['absolute right-px -bottom-px left-px h-0.5 bg-background']}></div>

		<div class="-mt-px- relative flex w-full">
			<div class="absolute top-0 left-0 h-full -translate-x-full">
				{@render inner_corner()}
			</div>

			<div
				class={[
					'flex flex-1 items-center justify-between border-t border-black bg-background  py-3',
					parent ? 'black-' : ''
				]}
			>
				<div class="text-xl/6 lg:text-2xl">{name}</div>
				<div>{@render children()}</div>
			</div>
			<div class="absolute top-0 right-0 h-full translate-x-full -scale-x-100">
				{@render inner_corner()}
			</div>
		</div>
	</div>
</div>

{#snippet inner_corner()}
	<svg class="h-full" viewBox="0 -8 8 8" xmlns="http://www.w3.org/2000/svg">
		<path d="M0 0Q2 0 3-2L5-6Q6-8 8-8L8 0Z" class="fill-background" stroke-width="0" />
		<path
			d="M0 0Q2 0 3-2L5-6q1-2 3-2"
			class="fill-background"
			stroke="black"
			stroke-width="1"
			vector-effect="non-scaling-stroke"
		/>
	</svg>
{/snippet}

{#snippet outer_left()}
	<svg class="h-12" viewBox="0 -4 2 4" xmlns="http://www.w3.org/2000/svg">
		<path d="M2-4Q0-4 1-2L2 0 0 0 0-4Z" class="fill-background" stroke-width="0" />

		<path
			d="M2-4Q0-4 1-2L2 0"
			class={['fill-background']}
			stroke="black"
			stroke-width="1"
			vector-effect="non-scaling-stroke"
		/>
	</svg>
{/snippet}
