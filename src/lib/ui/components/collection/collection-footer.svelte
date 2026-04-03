<script lang="ts">
	import Search from './search.svelte';
	import Views from './views.svelte';

	const { view }: { view: 'grille' | 'liste' } = $props();
</script>

<div class="fixed right-0 bottom-0 left-0 z-100">
	<div class="grid grid-cols-10 gap-8 border-t bg-background px-7 py-3">
		<div class="col-span-3 row-start-2 flex md:row-start-1 lg:col-span-2">
			<Views {view} />
		</div>
		<div class="col-span-full lg:col-span-3 lg:col-start-8">
			<Search />
		</div>
	</div>
</div>
