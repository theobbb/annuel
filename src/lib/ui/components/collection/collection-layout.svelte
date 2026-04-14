<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ProjectsRecord, StudentsRecord } from '$lib/pocketbase.types';
	import CollectionHeader from './collection-header.svelte';
	import CollectionFooter from './collection-footer.svelte';
	import Header from '../header.svelte';
	import Programs from './programs.svelte';

	const {
		view,
		children
	}: { items: (StudentsRecord | ProjectsRecord)[]; view: 'grille' | 'liste'; children: Snippet } =
		$props();

	let scroll_top = $state(true);
</script>

<Header bind:scroll_top>
	<div
		class={['relative z-100 col-span-2 col-start-9 flex justify-end max-lg:hidden lg:row-start-1']}
	>
		<Programs />
	</div>
</Header>

<div class="grid grid-cols-10 gap-x-6 gap-y-3 max-md:mt-4">
	<div class={['col-span-7 flex justify-end lg:hidden']}>
		<Programs />
	</div>
</div>

<div class="mt-16">{@render children()}</div>

<CollectionFooter {view} {scroll_top} />
