<script lang="ts">
	import Header from './header.svelte';

	let { children } = $props();
</script>

<Header />
<div>
	{@render children()}
</div>
