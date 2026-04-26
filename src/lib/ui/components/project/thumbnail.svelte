<script lang="ts">
	import { pocketbase } from '$lib/pocketbase';
	import type { ProjectsRecord } from '$lib/pocketbase.types';
	import { get_media_type } from '$lib/utils/media-type';
	import Image from '../media/image.svelte';

	const { project }: { project: ProjectsRecord } = $props();

	const filename = $derived(
		project.thumbnail || project.files?.find((f) => get_media_type(f) == 'image')
	);

	// const src = $derived.by(() => {
	// 	if (project.thumbnail) return pocketbase.files.getURL(project, project.thumbnail);

	// 	const first_image = project.files?.find((f) => get_media_type(f) == 'image');

	// 	if (first_image) return pocketbase.files.getURL(project, first_image, { thumb: '' });

	// 	return null;
	// });
</script>

<div class="aspect-4/5 w-full bg-placeholder">
	{#if filename}
		<Image record_id={project.id} {filename} collection="projects" thumbnail class="" />
	{:else}
		<div class=""></div>
	{/if}
	<!-- <Image id={project.id} index={1} /> -->
</div>
<!-- 400x500,600x750,400x0,800x0,1200x0 -->
