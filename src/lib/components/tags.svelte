<script lang="ts">
	import type { ProjectTagsRecord } from '$lib/pocketbase.types';
	import Tag from './tag.svelte';

	const { tags }: { tags: ProjectTagsRecord[] } = $props();
</script>

<div class="flex gap-1.5">
	{#each tags as tag}
		<Tag {tag} />
	{/each}
</div>
