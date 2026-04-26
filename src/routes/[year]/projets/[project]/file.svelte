<script module>
	export type MetaFile = {
		caption: string;
		col_start: number;
		col_span: number;
		mux_upload_id?: string;
		mux_playback_id?: string;
		is_uploading?: boolean;
		upload_progress?: number;
	};
	export const seed_meta_file = { caption: '', col_start: 2, col_span: 3 };
</script>

<script lang="ts">
	import type { FileNameString, ProjectsRecord } from '$lib/pocketbase.types';
	import Image from '$lib/ui/components/media/image.svelte';
	import Video from '$lib/ui/components/media/video.svelte';
	import { get_media_type } from '$lib/utils/media-type';

	const {
		project,
		file,
		meta,
		mobile
	}: { project: ProjectsRecord; file: FileNameString; meta: MetaFile; mobile?: boolean } = $props();

	const mobile_span = $derived(Math.min(meta.col_span * 2, 5));

	const media_type = $derived(get_media_type(file));

	$inspect(meta);
</script>

<div
	style="--desktop-start: {meta.col_start}; 
           --desktop-span: {meta.col_span};
           --mobile-span: {mobile_span};"
>
	{#if meta.mux_playback_id}
		<Video playback_id={meta.mux_playback_id} />
	{:else if media_type == 'image'}
		<Image collection="projects" filename={file} record_id={project.id} />
	{/if}
	{#if meta.caption}
		<div class="mt-1 text-base italic">{meta.caption}</div>
	{/if}
</div>

<style>
	div {
		/* Mobile First: default to 2 columns or custom span */
		/* We use span 1 as a fallback, or span the calculated mobileSpan */
		grid-column: span var(--mobile-span) / span var(--mobile-span);
	}

	@media (min-width: 768px) {
		/* md breakpoint */
		div {
			grid-column: var(--desktop-start) / span var(--desktop-span);
		}
	}
</style>
