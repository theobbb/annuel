<script lang="ts">
	import type { FileNameString, ProjectsRecord } from '$lib/pocketbase.types';
	import Gif from '$lib/ui/components/media/gif.svelte';
	import Image from '$lib/ui/components/media/image.svelte';
	import Video from '$lib/ui/components/media/video.svelte';
	import { get_media_type } from '$lib/utils/media-type';
	import type { MetaFile } from './file.svelte';

	const {
		project,
		file,
		meta,
		lightbox
	}: {
		project: ProjectsRecord;
		file: FileNameString;
		meta: MetaFile;
		lightbox?: boolean;
	} = $props();

	const col_start = $derived(meta?.col_start || 2);
	const col_span = $derived(meta?.col_span || 3);
	const mob_col_span = $derived(Math.min(col_span * 2, 5));

	// Calculate the exact VW (Viewport Width) percentage.
	// We divide the span by 5 (total grid columns) and multiply by 100.
	// e.g., 3 columns / 5 = 0.6 * 100 = 60vw
	const sizes_attr = $derived(
		lightbox
			? '100vw'
			: `(min-width: 768px) ${Math.ceil((col_span / 5) * 100)}vw, ${Math.ceil((mob_col_span / 5) * 100)}vw`
	);

	const media_type = $derived(get_media_type(file));
</script>

{#if meta.mux_playback_id}
	<Video playback_id={meta.mux_playback_id} />
{:else if media_type == 'gif'}
	<Gif collection="projects" filename={file} record_id={project.id} class="w-full" />
{:else if media_type == 'image'}
	<Image
		collection="projects"
		filename={file}
		record_id={project.id}
		class="w-full"
		{sizes_attr}
		sizes="600x0,1200x0,1920x0"
	/>
{/if}
