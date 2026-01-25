<script lang="ts">
	import type { Snippet } from 'svelte';

	const {
		file,
		index,
		total,
		onclose,
		previous,
		next,
		children
	}: {
		file: string;
		index: number;
		total: number;
		onclose: () => void;
		previous?: () => void | null;
		next?: () => void | null;
		children: Snippet;
	} = $props();

	function init(el: HTMLDialogElement) {
		el.showModal();
	}
</script>

<dialog
	class="pointer-events-none m-auto w-screen overflow-hidden bg-transparent"
	use:init
	closedby="any"
	{onclose}
>
	<div class="grid-12 relative z-10 h-[calc(100svh-2*var(--spacing-gap))]">
		<div class="relative col-span-full flex justify-center lg:col-span-9">
			<div class="pointer-events-auto aspect-square max-h-full bg-neutral-200"></div>
		</div>

		<div class="col-span-3 flex flex-col justify-between" style="--color-text-2: rgb(94, 94, 94);">
			<div class="pointer-events-auto flex items-center justify-between gap-gap text-2xl">
				<button onclick={onclose} class="icon-[ri--close-fill]"></button>

				<div class="flex justify-between gap-x-gap">
					<button onclick={previous} class="icon-[ri--arrow-left-line]"> </button>
					<button onclick={next} class="icon-[ri--arrow-right-line]"> </button>
				</div>
			</div>
			{#if children}
				<div>{@render children()}</div>
			{/if}
		</div>
	</div>
</dialog>

<!-- <a href={back_href} class="fixed inset-0 cursor-default bg-black/20 backdrop-blur"></a>
<div class="pointer-events-none fixed inset-gap">
	<div class="grid-12 relative z-10 h-[calc(100svh-2*var(--spacing-gap))]">
		<div class="relative col-span-full flex justify-center lg:col-span-10 lg:col-start-2">
			<div class="pointer-events-auto aspect-square max-h-full bg-neutral-200"></div>
		</div>
	</div>
</div> -->

<style>
	dialog::backdrop {
		background-color: rgba(123, 123, 123, 0.537);
		backdrop-filter: blur(10px) grayscale(50%);
	}
</style>
