<script lang="ts">
	import { page } from '$app/state';
	import type { ProjectTagsRecord } from '$lib/pocketbase.types';
	import { url_query_param } from '$lib/utils/url';

	const { tag }: { tag: ProjectTagsRecord } = $props();

	const year = $derived(page.params.year);
	const url_search_tag = $derived(page.url.searchParams.get('categorie') || '');

	// const href: string = $derived.by(() => {
	// 	// if (url_search_program == program.id) return param;
	// 	// return `${param}?programme=${program.id}`;
	// 	const url = `${page.url.origin}/${year}/projets${page.url.search}`;
	// 	return url_query_param(url, 'categorie', url_search_tag == tag.id ? null : tag.id);
	// });
	const base_href = $derived(`${page.url.origin}/${year}/projets${page.url.search}`);
	const href = $derived(
		url_query_param(base_href, 'categorie', url_search_tag == tag.id ? null : tag.id)
	);
</script>

<a {href} class={['pointer-events-auto lowercase', tag.id == url_search_tag && 'active']}>
	<span class="mr-px">[</span>{tag.name}<span class="ml-px">]</span>
</a>
