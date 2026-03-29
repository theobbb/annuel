<script lang="ts">
	import ProjectCard from '$lib/components/project-card.svelte';
	import ProjectRow from '$lib/components/project-row.svelte';
	import CollectionLayout from '$lib/ui/components/collection/collection-layout.svelte';
	import CollectionEmpty from '$lib/ui/components/collection/collection-empty.svelte';
	import Header from '$lib/ui/components/header.svelte';
	import CollectionHeader from '$lib/ui/components/collection/collection-header.svelte';
	import Programs from '../programs.svelte';

	const { data } = $props();
	const { programs } = $derived(data);
</script>

<Header></Header>

<div class="mt-24"><Programs /></div>
