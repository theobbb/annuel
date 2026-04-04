<script lang="ts">
	import Search from './search.svelte';
	import Views from './views.svelte';

	const { view }: { view: 'grille' | 'liste' } = $props();
</script>

<div class="fixed right-7 bottom-7 left-7 z-100">
	<div class="grid grid-cols-10 gap-7">
		<div
			class="col-span-4 col-start-4 flex items-center justify-center gap-8 border bg-background px-6 py-3"
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
