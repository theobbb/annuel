<script lang="ts">
	import Header from '../header.svelte';
	import Programs from './programs.svelte';
	import Search from './search.svelte';
	import Views from './views.svelte';

	const { view }: { view: 'grille' | 'liste'; n_items: number } = $props();
</script>

<Header sticky>
	<div
		class="bg-blue-100- justify-center- col-span-4 row-start-1 flex lg:col-span-2 lg:col-start-8"
	>
		<Views {view} />
	</div>
	<div class={['relative z-100 col-span-2 col-start-9 row-start-1 flex justify-end max-xl:hidden']}>
		<Programs />
	</div>
	<div class="bg-red-100- col-span-8 row-start-2 min-h-0 lg:col-span-3 lg:col-start-8">
		<Search />
	</div>
</Header>

<!-- <div class="grid-12 mt-8 mb-16 items-center">
	<div class="col-span-4 flex justify-end lg:col-span-2 lg:col-start-8">
		<Views {view} />
	</div>
	<div class="col-span-8 lg:col-span-3 lg:col-start-10">
		<Search />
	</div>
</div> -->
