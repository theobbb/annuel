<script lang="ts">
	import Header from '$lib/ui/components/header.svelte';
	import Programs from '../programs.svelte';
	import { page } from '$app/state';
	import { url_query_param } from '$lib/utils/url.js';

	const from_url = $derived(decodeURIComponent(page.url.searchParams.get('from') || ''));
</script>

<Header>
	<div class="col-span-2 col-start-9 flex justify-end text-right max-lg:hidden">
		<a
			href={url_query_param(from_url || `/${page.params.year}/projets`, { programme: null })}
			class="-mx-2 -my-1 flex w-fit items-center gap-2 px-2 py-1"
		>
			<span>Tous les programmes</span>
			<div class="icon-[ri--arrow-right-long-line] translate-y-px"></div>
		</a>
	</div>
</Header>

<div class="mt-20">
	<Programs {from_url} />
</div>

<svelte:head>
	<title>Annuel {page.params.year} — Programmes</title>
	<meta
		name="description"
		content="Les programmes de l’École de design de l’UQAM — Annuel {page.params
			.year} — L’exposition des finissant.es"
	/>
</svelte:head>
