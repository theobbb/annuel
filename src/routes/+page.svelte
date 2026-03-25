<script lang="ts">
	import Splash from './splash.svelte';

	const { data } = $props();
	const { programs } = $derived(data);
</script>

<header>Annuel de design</header>

<!-- <div class="mb-gap-y max-w-lg text-balance">
	L’Annuel de design expose les projets des quelques 240 finissant.es provenant des six programmes
	de l’École de design de l’UQAM.
</div> -->
