<script lang="ts">
	const { url }: { url: string } = $props();
</script>

<div>
	{#if url.endsWith('.svg')}
		{@html url}
	{/if}
</div>
