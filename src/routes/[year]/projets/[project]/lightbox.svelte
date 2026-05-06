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

	// Scroll active thumbnail into view
	let strip = $state<HTMLElement>();
	$effect(() => {
		if (!strip || active_index === null) return;
		const thumb = strip.children[active_index] as HTMLElement | undefined;
		thumb?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
	});

	const media_type = $derived(active_item ? get_media_type(active_item.file) : null);
</script>

<svelte:window onkeydown={on_keydown} />

{#if active_item !== null}
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div
		class="lightbox fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 p-4 pb-6"
		onclick={on_backdrop_click}
		role="dialog"
		aria-modal="true"
		aria-label="Aperçu du fichier {active_item.index + 1}"
	>
		<!-- Close -->
		<button
			onclick={close}
			aria-label="Fermer"
			class="absolute top-4 right-5 flex h-8 w-8 cursor-pointer items-center
			       justify-center border-none bg-transparent text-xl text-inherit
			       opacity-40 transition-opacity duration-150 hover:opacity-100"
		>
			<span class="icon-[ri--close-line]"></span>
		</button>

		<!-- Counter -->
		<div
			class="pointer-events-none absolute top-5 left-6 flex gap-[0.2em] text-xs
		            tracking-widest opacity-40 select-none"
		>
			<span>{active_item.index + 1}</span>
			<span class="opacity-50">/</span>
			<span>{files.length}</span>
		</div>

		<!-- Media -->
		<div
			class="relative flex w-full max-w-[min(90vw,1400px)] items-center justify-center"
			style="max-height: calc(100vh - 10rem);"
		>
			{#key active_index}
				<div class="animate-media-in w-full">
					{#if active_item.meta.mux_playback_id}
						<Video playback_id={active_item.meta.mux_playback_id} />
					{:else if media_type === 'gif'}
						<Gif
							collection="projects"
							filename={active_item.file}
							record_id={project.id}
							class="mx-auto block h-auto w-auto max-w-full object-contain"
							style="max-height: calc(100vh - 10rem);"
						/>
					{:else if media_type === 'image'}
						<Image
							collection="projects"
							filename={active_item.file}
							record_id={project.id}
							class="mx-auto block h-auto w-auto max-w-full object-contain"
							style="max-height: calc(100vh - 10rem);"
							sizes_attr="(min-width: 768px) 90vw, 100vw"
							sizes="600x0,1200x0,1920x0,2560x0"
						/>
					{/if}
				</div>
			{/key}

			<!-- Prev / Next — overlaid on media -->
			{#if files.length > 1}
				<button
					onclick={prev}
					aria-label="Précédent"
					class="absolute top-1/2 left-0 flex -translate-y-1/2 cursor-pointer items-center
					       justify-center border-none bg-transparent p-3 text-lg text-inherit
					       opacity-35 transition-opacity duration-150 hover:opacity-100"
				>
					<span class="icon-[ri--arrow-left-long-line]"></span>
				</button>
				<button
					onclick={next}
					aria-label="Suivant"
					class="absolute top-1/2 right-0 flex -translate-y-1/2 cursor-pointer items-center
					       justify-center border-none bg-transparent p-3 text-lg text-inherit
					       opacity-35 transition-opacity duration-150 hover:opacity-100"
				>
					<span class="icon-[ri--arrow-right-long-line]"></span>
				</button>
			{/if}
		</div>

		<!-- Caption -->
		{#if active_item.meta.caption}
			<div
				class="w-full max-w-[min(90vw,1400px)] text-left text-[0.8125rem] leading-snug opacity-55"
			>
				{active_item.meta.caption}
			</div>
		{/if}

		<!-- Thumbnail strip -->
		{#if files.length > 1}
			<div
				bind:this={strip}
				class="scrollbar-none flex w-full max-w-[min(90vw,1400px)] gap-2
				       overflow-x-auto pb-0.5"
			>
				{#each files as item}
					{@const thumb_media = get_media_type(item.file)}
					<button
						onclick={() => (active_index = item.index)}
						aria-label="Fichier {item.index + 1}"
						class="h-14 w-20 shrink-0 cursor-pointer overflow-hidden border-none
						       bg-transparent p-0 transition-opacity duration-150
						       {item.index === active_index
							? 'opacity-100 outline outline-1 outline-offset-1 outline-current'
							: 'opacity-35 hover:opacity-70'}"
					>
						{#if item.meta.mux_playback_id}
							<div class="flex h-full w-full items-center justify-center bg-black/10">
								<span class="icon-[ri--play-line] text-base opacity-60"></span>
							</div>
						{:else if thumb_media === 'gif' || thumb_media === 'image'}
							<Image
								collection="projects"
								filename={item.file}
								record_id={project.id}
								class="h-full w-full object-cover"
								sizes_attr="80px"
								sizes="160x0"
							/>
						{/if}
					</button>
				{/each}
			</div>
		{/if}
	</div>
{/if}

<style>
	.lightbox {
		background: color-mix(in srgb, var(--color-background, #f5f5f0) 92%, transparent);
		backdrop-filter: blur(6px);
		animation: lb-in 0.18s ease both;
	}

	/* Hide scrollbar but keep scroll functionality */
	.scrollbar-none {
		scrollbar-width: none;
	}
	.scrollbar-none::-webkit-scrollbar {
		display: none;
	}

	@keyframes lb-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.animate-media-in {
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
</style>
