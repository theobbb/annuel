<script lang="ts">
	import Header from './header.svelte';

	let { children } = $props();
</script>

<div>
	{@render children()}
</div>
