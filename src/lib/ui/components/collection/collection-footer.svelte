<script lang="ts">
	import { use_seed } from '$lib/store/seed-ctx.svelte';
	import Search from './search.svelte';
	import Views from './views.svelte';

	const { view, scroll_top }: { view: 'grille' | 'liste'; scroll_top: boolean } = $props();

	const seed = use_seed();
</script>

<div class="">
	<div class={['grid grid-cols-10 gap-gap py-4']}>
		<div class="">
			<Views {view} />
		</div>
		<div class="col-span-3 col-start-8">
			<Search />
		</div>
	</div>
</div>

<!-- <button
	class="fixed right-4 bottom-5 z-50 flex cursor-pointer items-center rounded-full border bg-background p-2.5 text-lg shadow-sm transition not-hover:text-muted"
	title="Mélanger"
	onclick={() => seed.shuffle()}
>
	<div class="icon-[ri--shuffle-line]"></div>
</button> -->
