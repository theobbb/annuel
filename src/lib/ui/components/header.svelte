<script lang="ts">
	import { page } from '$app/state';

	import type { Snippet } from 'svelte';
	import Tabs from './collection/tabs.svelte';

	const { children }: { children?: Snippet } = $props();
</script>

<div class="grid-12 mb-3x">
	<div class="col-span-2">
		<a href="/{page.params.year}">Annuel de design '{page.params.year?.slice(-2)}</a>
	</div>

	<div class="col-span-4 flex">
		<Tabs />
	</div>

	{@render children?.()}
</div>
