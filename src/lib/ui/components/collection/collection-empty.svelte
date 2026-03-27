<script lang="ts">
	import { page } from '$app/state';
	import { url_query_param } from '$lib/utils/url';

	const url_search = $derived(page.url.searchParams.get('search') ?? '');
</script>

<div class="">
	<div class="">Aucun résultat.</div>
	{#if url_search}
		<a class="underline" href={url_query_param(page.url.href, { search: null })}> Réinitialiser </a>
	{/if}
</div>
