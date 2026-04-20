<script lang="ts">
	import ProjectCard from '$lib/components/project-card.svelte';
	import ProjectRow from '$lib/components/project-row.svelte';
	import CollectionLayout from '$lib/ui/components/collection/collection-layout.svelte';
	import CollectionEmpty from '$lib/ui/components/collection/collection-empty.svelte';
	import Header from '$lib/ui/components/header.svelte';
	import Programs from '../programs.svelte';
	import { page } from '$app/state';
	import { url_query_param } from '$lib/utils/url.js';

	const { data } = $props();
	const { programs } = $derived(data);

	const from_url = $derived(decodeURIComponent(page.url.searchParams.get('from') || ''));
</script>

<Header>
	<div class="col-span-2 col-start-9 text-right">
		<a href={url_query_param(from_url || `/${page.params.year}/projets`, { programme: null })}
			>Tous les programmes</a
		>
	</div>
</Header>

<div class="mt-24"><Programs {from_url} /></div>
