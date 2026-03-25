<script lang="ts">
	import Banner from '$lib/ui/components/banner.svelte';

	let { children } = $props();
</script>

{@render children()}
