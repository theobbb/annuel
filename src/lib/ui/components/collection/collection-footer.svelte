<script lang="ts">
	import Search from './search.svelte';
	import Views from './views.svelte';

	const { view, scroll_top }: { view: 'grille' | 'liste'; scroll_top: boolean } = $props();
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
			class="pointer-events-auto col-span-4 col-start-4 flex items-center justify-center gap-8 border bg-background px-6 py-3"
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
