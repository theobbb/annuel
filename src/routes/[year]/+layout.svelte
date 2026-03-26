<script lang="ts">
	import Banner from '$lib/ui/components/banner.svelte';
	import Header from './header.svelte';

	let { children } = $props();
</script>

<!-- 
<Header /> -->
{@render children()}
