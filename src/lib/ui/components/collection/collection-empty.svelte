<script lang="ts">
	import { page } from '$app/state';
	import { url_query_param } from '$lib/utils/url';

	const url_search = $derived(page.url.searchParams.get('search') ?? '');
	const url_program = $derived(page.url.searchParams.get('programme') ?? '');
</script>

<div class="">
	<div class="">Aucun résultat.</div>
	{#if url_search}
		<a class="underline" href={url_query_param(page.url.href, { search: null })}> Réinitialiser </a>
	{:else if url_program}
		<a class="underline" href={url_query_param(page.url.href, { programme: null })}>
			Voir tous les programmes
		</a>
	{/if}
</div>
