<script>
	import { page } from '$app/state';
	import Header from '$lib/ui/components/header.svelte';
</script>

<Header />
<h2 class="mt-24 text-center">
	{#if page.status == 404}
		Page introuvable
	{:else}
		Une erreur est survenue
	{/if}
</h2>
