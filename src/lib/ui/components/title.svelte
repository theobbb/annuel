<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

<div class="border-b-2 pb-4">
	{@render children()}
</div>
