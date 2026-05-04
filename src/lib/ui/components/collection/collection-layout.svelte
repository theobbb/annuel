<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ProjectsRecord, StudentsRecord } from '$lib/pocketbase.types';
	import Header from '../header.svelte';
	import Programs from './programs.svelte';
	import Views from './views.svelte';
	import Search from './search.svelte';

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

<!-- MOBILE ONLY → so it doesnt stick top -->
<div class={['mt-8 flex justify-end lg:hidden']}>
	<Programs />
</div>

<div class="-mt-1 max-lg:mb-8 lg:mt-16">
	<div class="">
		<div class={['flex grid-cols-10 items-center gap-gap py-3 md:grid']}>
			<div class="col-span-3">
				<Views {view} />
			</div>
			<div class="col-span-7 flex-1 lg:col-span-3 lg:col-start-8">
				<Search />
			</div>
		</div>
	</div>
</div>
<div class="">{@render children()}</div>
