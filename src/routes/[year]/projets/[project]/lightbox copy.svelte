<script lang="ts">
	import type { MetaFile } from './file.svelte';
	import type { FileNameString, ProjectsRecord } from '$lib/pocketbase.types';
	import Gif from '$lib/ui/components/media/gif.svelte';
	import Image from '$lib/ui/components/media/image.svelte';
	import Video from '$lib/ui/components/media/video.svelte';
	import { get_media_type } from '$lib/utils/media-type';

	type LightboxItem = {
		file: FileNameString;
		meta: MetaFile;
		index: number;
	};

	let {
		project,
		files,
		active_index = $bindable<number | null>(null)
	}: {
		project: ProjectsRecord;
		files: LightboxItem[];
		active_index: number | null;
	} = $props();

	const active_item = $derived(active_index !== null ? (files[active_index] ?? null) : null);
	$inspect(active_index);
	function close() {
		active_index = null;
	}

	function prev() {
		if (active_index === null) return;
		active_index = (active_index - 1 + files.length) % files.length;
	}

	function next() {
		if (active_index === null) return;
		active_index = (active_index + 1) % files.length;
	}

	function on_backdrop_click(e: MouseEvent) {
		if (e.target === e.currentTarget) close();
	}

	function on_keydown(e: KeyboardEvent) {
		if (active_index === null) return;
		if (e.key === 'Escape') close();
		if (e.key === 'ArrowLeft') {
			e.stopPropagation();
			prev();
		}
		if (e.key === 'ArrowRight') {
			e.stopPropagation();
			next();
		}
	}

	const media_type = $derived(active_item ? get_media_type(active_item.file) : null);
</script>

<svelte:window onkeydown={on_keydown} />

{#if active_item !== null}
	<!-- Backdrop -->
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div
		class="lightbox"
		onclick={on_backdrop_click}
		role="dialog"
		aria-modal="true"
		aria-label="Aperçu du fichier {active_item.index + 1}"
	>
		<!-- Close -->
		<button class="btn-close" onclick={close} aria-label="Fermer">
			<span class="icon-[ri--close-line]"></span>
		</button>

		<!-- Counter -->
		<div class="counter">
			<span class="counter-current">{active_item.index + 1}</span>
			<span class="counter-sep">/</span>
			<span class="counter-total">{files.length}</span>
		</div>

		<!-- Media area -->
		<div class="media-wrap">
			{#key active_index}
				<div class="media-inner">
					{#if active_item.meta.mux_playback_id}
						<Video playback_id={active_item.meta.mux_playback_id} />
					{:else if media_type === 'gif'}
						<Gif
							collection="projects"
							filename={active_item.file}
							record_id={project.id}
							class="media-asset"
						/>
					{:else if media_type === 'image'}
						<Image
							collection="projects"
							filename={active_item.file}
							record_id={project.id}
							class="media-asset"
							sizes_attr="(min-width: 768px) 90vw, 100vw"
							sizes="600x0,1200x0,1920x0,2560x0"
						/>
					{/if}
				</div>
			{/key}
		</div>

		<!-- Caption -->
		{#if active_item.meta.caption}
			<div class="caption">{active_item.meta.caption}</div>
		{/if}

		<!-- Prev / Next -->
		{#if files.length > 1}
			<button class="btn-nav btn-prev" onclick={prev} aria-label="Précédent">
				<span class="icon-[ri--arrow-left-long-line]"></span>
			</button>
			<button class="btn-nav btn-next" onclick={next} aria-label="Suivant">
				<span class="icon-[ri--arrow-right-long-line]"></span>
			</button>
		{/if}
	</div>
{/if}

<style>
	.lightbox {
		position: fixed;
		inset: 0;
		z-index: 100;
		background: color-mix(in srgb, var(--color-background, #f5f5f0) 92%, transparent);
		backdrop-filter: blur(6px);
		display: flex;
		flex-direction: column;
		align-files: center;
		justify-content: center;
		padding: 1rem;

		animation: lb-in 0.18s ease both;
	}

	@keyframes lb-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	/* ── Media ── */
	.media-wrap {
		position: relative;
		max-width: min(90vw, 1400px);
		max-height: calc(100vh - 8rem);
		width: 100%;
		display: flex;
		align-files: center;
		justify-content: center;
	}

	.media-inner {
		width: 100%;
		animation: media-in 0.22s ease both;
	}

	@keyframes media-in {
		from {
			opacity: 0;
			transform: translateY(6px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	:global(.media-asset) {
		display: block;
		max-height: calc(100vh - 8rem);
		max-width: 100%;
		width: auto;
		height: auto;
		margin: 0 auto;
		object-fit: contain;
	}

	/* ── Caption ── */
	.caption {
		margin-top: 0.75rem;
		font-size: 0.8125rem;
		line-height: 1.4;
		opacity: 0.55;
		max-width: min(90vw, 1400px);
		text-align: left;
		width: 100%;
	}

	/* ── Counter ── */
	.counter {
		position: absolute;
		top: 1.25rem;
		left: 1.5rem;
		font-size: 0.75rem;
		letter-spacing: 0.06em;
		opacity: 0.4;
		display: flex;
		gap: 0.2em;
		pointer-events: none;
		user-select: none;
	}
	.counter-sep {
		opacity: 0.5;
	}

	/* ── Close button ── */
	.btn-close {
		position: absolute;
		top: 1rem;
		right: 1.25rem;
		width: 2rem;
		height: 2rem;
		display: flex;
		align-files: center;
		justify-content: center;
		background: none;
		border: none;
		cursor: pointer;
		opacity: 0.4;
		transition: opacity 0.15s;
		font-size: 1.25rem;
		color: inherit;
		padding: 0;
	}
	.btn-close:hover {
		opacity: 1;
	}

	/* ── Prev / Next ── */
	.btn-nav {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: none;
		border: none;
		cursor: pointer;
		color: inherit;
		font-size: 1.125rem;
		opacity: 0.35;
		transition: opacity 0.15s;
		padding: 0.75rem;
		display: flex;
		align-files: center;
		justify-content: center;
	}
	.btn-nav:hover {
		opacity: 1;
	}
	.btn-prev {
		left: 0.75rem;
	}
	.btn-next {
		right: 0.75rem;
	}
</style>
