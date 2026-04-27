<script lang="ts">
	import Header from '$lib/ui/components/header.svelte';
	import Programs from '../programs.svelte';
	import { page } from '$app/state';
	import { url_query_param } from '$lib/utils/url.js';

	const from_url = $derived(decodeURIComponent(page.url.searchParams.get('from') || ''));
</script>

<Header>
	<div class="col-span-2 col-start-9 text-right">
		<a href={url_query_param(from_url || `/${page.params.year}/projets`, { programme: null })}>
			Tous les programmes
		</a>
	</div>
</Header>

<div class="mt-24"><Programs {from_url} /></div>

<svelte:head>
	<title>Annuel {page.params.year} — Programmes</title>
	<meta
		name="description"
		content="Les programmes de l’École de design de l’UQAM — Annuel {page.params
			.year} — L’exposition des finissant.es"
	/>
</svelte:head>
