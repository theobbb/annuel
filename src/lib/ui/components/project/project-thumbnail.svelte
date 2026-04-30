<script lang="ts">
	import type { ProjectsRecord } from '$lib/pocketbase.types';
	import { get_media_type } from '$lib/utils/media-type';
	import Image from '../media/image.svelte';

	const { project }: { project: ProjectsRecord } = $props();

	const filename = $derived(
		project.thumbnail || project.files?.find((f) => get_media_type(f) == 'image')
	);
</script>

<div class="aspect-4/5 w-full bg-placeholder">
	{#if filename}
		<Image
			record_id={project.id}
			{filename}
			collection="projects"
			class="h-full w-full object-cover"
			sizes="400x500,800x1000"
			sizes_attr="@lg 20vw, @md 25vw, @sm 33vw, 50vw"
		/>
	{/if}
</div>
