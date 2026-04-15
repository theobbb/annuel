<script lang="ts">
	import type { Snippet } from 'svelte';

	const {
		name,
		i,
		parent,
		children
	}: { name: string; i: number; parent?: boolean; children: Snippet } = $props();
</script>

<div
	class="group pointer-events-none relative"
	style="--color-tab: white; z-index: {i}; margin: 0 {(7 - i) * 0.3}rem ; "
>
	<div class="peer pointer-events-none absolute inset-0 z-20 grid grid-cols-10 gap-22">
		<div
			class={[
				'pointer-events-auto relative z-10 col-span-10 -mx-11  lg:col-span-4',
				i % 2 == 0 ? 'lg:col-start-2' : 'lg:col-start-6',
				parent ? ' ' : ''
			]}
		></div>
	</div>
	<div
		class={[
			'relative -mt-7 grid grid-cols-10 gap-22 transition peer-hover:-translate-y-10 ',
			parent ? 'text-muted ' : ''
		]}
	>
		<!-- <div class="absolute bottom-0 left-0 w-full border-b border-black"></div> -->
		<!-- <div class="h- absolute bottom-0 left-0 w-full border-b border-black"></div> -->

		<div
			class="absolute right-0 bottom-px left-0 flex h-24 translate-y-full justify-between bg-tab"
		>
			<div class="relative z-20 h-full">
				{@render outer_corner()}
			</div>
			<div class="relative z-20 h-full -scale-x-100">
				{@render outer_corner()}
			</div>
		</div>
		<div class="h- absolute right-12 bottom-0 left-12 border-b"></div>
		<div
			class={[
				'pointer-events-auto relative z-10 col-span-10 text-balance lg:col-span-4 ',
				i % 2 == 0 ? 'lg:col-start-2' : 'lg:col-start-6',
				parent ? ' ' : ''
			]}
		>
			<div class={['absolute right-px -bottom-px left-px h-0.5 bg-tab']}></div>

			<div class="-mt-px- relative flex w-full">
				<div class="absolute top-0 left-0 h-full -translate-x-full">
					{@render inner_corner()}
				</div>

				<div class={['flex-1 border-t bg-tab py-3.5', parent ? 'black-' : '']}>
					<div class="flex w-full origin-center items-center justify-between">
						<div class="text-xl/6 lg:text-2xl">{name}</div>
						<div>{@render children()}</div>
					</div>
				</div>
				<div class="absolute top-0 right-0 h-full translate-x-full -scale-x-100">
					{@render inner_corner()}
				</div>
			</div>
		</div>
	</div>
</div>

{#snippet inner_corner()}
	<svg class="h-full" viewBox="0 -8 8 8" xmlns="http://www.w3.org/2000/svg">
		<path d="M0 0Q2 0 3-2L5-6Q6-8 8-8L8 0Z" class="fill-tab" stroke-width="0" />
		<path
			d="M0 0Q2 0 3-2L5-6q1-2 3-2"
			class="fill-none"
			stroke="var(--color-border)"
			stroke-width="1"
			vector-effect="non-scaling-stroke"
		/>
	</svg>
{/snippet}

{#snippet outer_corner()}
	<svg class="h-full" viewBox="0 -4 2 4" xmlns="http://www.w3.org/2000/svg">
		<path d="M2-4Q0-4 1-2L2 0 0 0 0-4Z" class="fill-background" stroke-width="0" />
		<path d="M2-4Q0-4 1-2L2 0Z" class="fill-tab" stroke-width="0" />

		<path
			d="M2-4Q0-4 1-2L2 0"
			class={['fill-none']}
			stroke="var(--color-border)"
			stroke-width="1"
			vector-effect="non-scaling-stroke"
		/>
	</svg>
{/snippet}

<style>
	.group {
		--color-border: rgba(0, 0, 0, 0.5);
	}
</style>
