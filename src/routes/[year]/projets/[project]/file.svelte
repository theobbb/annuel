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

	const { project, file, meta }: { project: ProjectsRecord; file: FileNameString; meta: MetaFile } =
		$props();

	const col_start = $derived(meta?.col_start || 'auto');
	const col_span = $derived(meta?.col_span || 1);
	const mob_col_span = $derived(Math.min(col_span * 2, 5));

	// Calculate the exact VW (Viewport Width) percentage.
	// We divide the span by 5 (total grid columns) and multiply by 100.
	// e.g., 3 columns / 5 = 0.6 * 100 = 60vw
	const sizes_attr = $derived(
		`(min-width: 768px) ${Math.ceil((col_span / 5) * 100)}vw, ${Math.ceil((mob_col_span / 5) * 100)}vw`
	);

	const media_type = $derived(get_media_type(file));
</script>

<div
	style="--desktop-start: {col_start}; 
           --desktop-span: {col_span};
           --mobile-span: {mob_col_span};"
>
	{#if meta.mux_playback_id}
		<Video playback_id={meta.mux_playback_id} />
	{:else if media_type == 'image'}
		<Image
			collection="projects"
			filename={file}
			record_id={project.id}
			{sizes_attr}
			class="w-full"
		/>
	{/if}
	{#if meta.caption}
		<div class="mt-1 mb-gap leading-tight lg:mt-1.5">{meta.caption}</div>
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
