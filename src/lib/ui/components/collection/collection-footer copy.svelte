<script lang="ts">
	import { use_seed } from '$lib/store/seed-ctx.svelte';
	import Search from './search.svelte';
	import Views from './views.svelte';

	const { view, scroll_top }: { view: 'grille' | 'liste'; scroll_top: boolean } = $props();

	const seed = use_seed();
</script>

<div class="pointer-events-none fixed right-7 bottom-14 left-7 z-100">
	<div
		class={[
			'grid grid-cols-10 gap-7 ',
			scroll_top ? '' : 'translate-y-4 opacity-0',
			'transition duration-300 ease-in-out'
		]}
	>
		<div
			class="pointer-events-auto col-span-4 col-start-4 flex items-center justify-center gap-8 rounded border bg-background px-6 py-3"
		>
			<div class="">
				<Views {view} />
			</div>
			<div class="flex-1">
				<Search />
			</div>
		</div>
	</div>
</div>

<button
	class="fixed right-4 bottom-5 z-50 flex cursor-pointer items-center rounded-full border bg-background p-2.5 text-lg shadow-sm transition not-hover:text-muted"
	title="Mélanger"
	onclick={() => seed.shuffle()}
>
	<div class="icon-[ri--shuffle-line]"></div>
</button>
