<script module>
	export type MetaFile = { caption: string; col_start: number; col_span: number };
	export const seed_meta_file = { caption: '', col_start: 2, col_span: 3 };
</script>

<script lang="ts">
	import type { FileNameString, ProjectsRecord } from '$lib/pocketbase.types';
	import Image from '$lib/ui/components/image.svelte';

	const {
		project,
		file,
		meta,
		mobile
	}: { project: ProjectsRecord; file: FileNameString; meta: MetaFile; mobile?: boolean } = $props();

	const mobile_span = $derived(Math.min(meta.col_span * 2, 5));
</script>

<div
	style="    --desktop-start: {meta.col_start}; 
                --desktop-span: {meta.col_span};
                --mobile-span: {mobile_span};
            "
>
	<Image collection="projects" filename={file} record_id={project.id} />
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
