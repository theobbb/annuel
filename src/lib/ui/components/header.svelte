<script lang="ts">
	import { page } from '$app/state';

	import type { Snippet } from 'svelte';
	import Tabs from './collection/tabs.svelte';

	const { sticky, children }: { sticky?: boolean; children?: Snippet } = $props();
</script>

<header
	class={[
		' z-100 mb-3x grid grid-cols-10 gap-3 bg-background whitespace-nowrap lg:gap-x-8',
		sticky && 'sticky top-0 -mt-3 pt-3'
	]}
>
	<div class="text-4xl- col-span-full row-start-1 md:col-span-2">
		<a href="/{page.params.year}">Annuel de design '{page.params.year?.slice(-2)}</a>
	</div>

	<div
		class="col-span-full row-start-2 flex sm:col-span-6 sm:col-start-7 sm:row-start-1 sm:max-xl:justify-end xl:col-span-4 xl:col-start-3"
	>
		<Tabs />
	</div>

	{@render children?.()}
</header>
