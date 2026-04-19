<script lang="ts">
	import { use_seed } from '$lib/store/seed-ctx.svelte';
	import Search from './search.svelte';
	import Views from './views.svelte';

	const { view, scroll_top }: { view: 'grille' | 'liste'; scroll_top: boolean } = $props();

	const seed = use_seed();
</script>

<div class="fixed- right-6- left-6- pointer-events-none bottom-0 z-100">
	<div
		class={[
			'grid- grid-cols-10 gap-gap',
			scroll_top ? '' : 'opacity-0- translate-y-full',
			'ease transition duration-400'
		]}
	>
		<div
			class="rounded- border-t- px-6- pointer-events-auto col-span-4 col-start-4 flex items-center justify-center gap-8 bg-background py-3"
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
