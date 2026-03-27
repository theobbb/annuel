<script lang="ts">
	import { page } from '$app/state';
	import Header from '../header.svelte';
	import Programs from './programs.svelte';
	import Search from './search.svelte';
	import Tabs from './tabs.svelte';
	import Views from './views.svelte';

	const { view }: { view: 'grille' | 'liste'; n_items: number } = $props();
</script>

<Header>
	<div class="col-span-2 col-start-11 flex justify-end">
		<Views {view} />
	</div>
</Header>

<div class="grid-12 mt-8 mb-16 items-center">
	<div class="col-start-1- col-span-2 col-start-1">
		<Search />
	</div>
	<div class={['relative z-100 col-span-6 col-start-7 flex justify-end']}>
		<Programs />
	</div>
</div>
<!-- <div class="py-1- sticky top-0 z-20 mt-12 mb-16 border-b bg-background">
	<div class="grid-12 items-center">
		
	</div>
</div> -->

<!-- <OverlayProgram visible={pop_visible} program={hovered} /> -->
