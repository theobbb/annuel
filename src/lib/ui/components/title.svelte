<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

<div class="border-b border-black/20 pb-4">
	{@render children()}
</div>
