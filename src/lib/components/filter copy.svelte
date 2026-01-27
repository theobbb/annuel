<script lang="ts">
	import { page } from '$app/state';
	import { url_query_param } from '$lib/utils/url';
	import type { Snippet } from 'svelte';

	const { name, param, children }: { name: string; param: string; children: Snippet } = $props();

	const url_search_program = $derived(page.url.searchParams.get(param) || '');
	const href = $derived(url_query_param(page.url.href, param, null));

	let expanded = $state(false);
</script>

<div class="col-span-10 lg:col-span-6">
	<div class="border-b pb-0.5">
		<a {href} class={[!url_search_program && 'active', 'text-2']}> {name} </a>
	</div>
	<div class="py-px">
		{@render children()}
	</div>
</div>
