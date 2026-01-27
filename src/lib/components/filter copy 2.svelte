<script lang="ts">
	import { page } from '$app/state';
	import { icons } from '$lib/ui/icons';
	import { url_query_param } from '$lib/utils/url';
	import type { Snippet } from 'svelte';

	const { name, param, children }: { name: string; param: string; children: Snippet } = $props();

	const url_search = $derived(page.url.searchParams.get(param) || '');
	const href = $derived(url_query_param(page.url.href, param, null));

	let expanded = $state(true);
</script>

<div class="relative col-span-10 lg:col-span-6">
	<div class="border-b">
		<button onclick={() => (expanded = !expanded)} class="flex items-center gap-1 pb-0.5">
			{name}
			<span class={icons.expand}></span>
		</button>
	</div>
	<!-- <div class="border-b pb-0.5">
		<a {href} class={[!url_search_program && 'active', 'text-2']}> {name} </a>
	</div> -->

	<div
		class="divide-y- absolute right-0 bottom-0 left-0 z-100 translate-y-full border bg-bg px-gap py-0.5"
	>
		{@render children()}
	</div>
</div>
