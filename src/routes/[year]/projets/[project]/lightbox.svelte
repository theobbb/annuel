<script module>
	export type LightboxItem = {
		file: FileNameString;
		meta: MetaFile;
		index: number;
	};
</script>

<script lang="ts">
	import type { MetaFile } from './file.svelte';
	import type { FileNameString, ProjectsRecord } from '$lib/pocketbase.types';
	import Image from '$lib/ui/components/media/image.svelte';
	import { get_media_type } from '$lib/utils/media-type';
	import { page } from '$app/state';
	import { url_query_param } from '$lib/utils/url';
	import { goto } from '$app/navigation';
	import Media from './media.svelte';

	let {
		project,
		files
	}: {
		project: ProjectsRecord;
		files: LightboxItem[];
	} = $props();

	const index: number | null = $derived(Number(page.url.searchParams.get('media')) || null);

	const current_item = $derived(index !== null ? (files[index - 1] ?? null) : null);

	function close() {
		goto_file(null);
	}

	function goto_file(index: number | null) {
		const url = url_query_param(page.url.href, { media: index ? String(index) : null });
		goto(url, { noScroll: true });
	}

	function goto_prev_file() {
		if (!index) return;
		goto_file(index == 1 ? files.length : index - 1);
	}

	function goto_next_file() {
		if (!index) return;

		goto_file(index == files.length ? 1 : index + 1);
	}

	function on_backdrop_click(e: MouseEvent) {
		if (e.target === e.currentTarget) close();
	}

	function on_keydown(e: KeyboardEvent) {
		if (index === null) return;
		if (e.key === 'Escape') close();
		if (e.key === 'ArrowLeft') {
			e.stopPropagation();
			goto_prev_file();
		}
		if (e.key === 'ArrowRight') {
			e.stopPropagation();
			goto_next_file();
		}
	}

	// Scroll active thumbnail into view
	let strip = $state<HTMLElement>();
	$effect(() => {
		if (!strip || index === null) return;
		const thumb = strip.children[index] as HTMLElement | undefined;
		thumb?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
	});
</script>

<svelte:window onkeydown={on_keydown} />

{#if current_item !== null}
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div
		class="lightbox fixed inset-0 z-500 grid h-svh grid-rows-[auto_1fr_auto] gap-gap p-gap pt-1.5"
		onclick={on_backdrop_click}
		role="dialog"
		aria-modal="true"
		aria-label="Aperçu du fichier {current_item.index + 1}"
		tabindex="0"
	>
		<!-- Close -->
		<div class="grid-10 -mb-2-">
			<div
				class="col-span-2 flex text-center
		            tracking-widest select-none"
			>
				<span>{current_item.index}</span>
				<span class="opacity-40">/</span>
				<span>{files.length}</span>
			</div>
			<!-- Caption -->
			{#if current_item.meta.caption}
				<div class="col-span-6 leading-snug">
					{current_item.meta.caption}
				</div>
			{/if}
			<button
				onclick={close}
				aria-label="Fermer"
				class="-col-end-1 -m-2 flex cursor-pointer items-center justify-end
				       gap-2 border-none bg-transparent p-2
				       opacity-40 transition-opacity duration-150 hover:opacity-100"
			>
				<span>Fermer (x)</span>
			</button>
		</div>

		<!-- Counter -->

		<!-- Media -->
		<div class="relative h-full w-full">
			<div class="absolute flex h-full w-full items-center justify-between gap-gap">
				{#key index}
					<div
						class="animate-media-in h-auto max-h-full w-auto max-w-full inset-ring"
						style={current_item.meta?.aspect_ratio
							? `aspect-ratio: ${current_item.meta?.aspect_ratio}`
							: ''}
					>
						<Media {project} file={current_item.file} meta={current_item.meta} lightbox />
					</div>
				{/key}

				<!-- Prev / Next — overlaid on media -->
				{#if files.length > 1}
					<button
						onclick={goto_prev_file}
						aria-label="Précédent"
						class="-order-1 -m-2 flex -translate-y-1/2 cursor-pointer
						       items-center justify-center p-2 text-xl
						       transition-opacity duration-150 not-hover:opacity-35"
					>
						<span class="icon-[ri--arrow-left-long-line]"></span>
					</button>
					<button
						onclick={goto_next_file}
						aria-label="Suivant"
						class="-m-2 flex -translate-y-1/2 cursor-pointer
						       items-center justify-center p-2 text-xl
						       transition-opacity duration-150 not-hover:opacity-35"
					>
						<span class="icon-[ri--arrow-right-long-line]"></span>
					</button>
				{/if}
			</div>
		</div>

		<!-- Thumbnail strip -->
		{#if files.length > 1}
			<div
				bind:this={strip}
				class="scrollbar-none flex w-full max-w-[min(90vw,1400px)] gap-2.5
				       overflow-x-auto p-2"
			>
				{#each files as item}
					{@const thumb_media = get_media_type(item.file)}
					<button
						onclick={() => goto_file(item.index)}
						aria-label="Fichier {item.index + 1}"
						class="shrink-0 cursor-pointer overflow-hidden border-none
						       bg-transparent p-0 transition-opacity duration-150
						       {item.index === index
							? 'opacity-100 outline outline-offset-4 outline-current'
							: 'opacity-35 saturate-50 hover:opacity-70'}"
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
								class="size-16! object-contain! object-center!"
								sizes="80x80f"
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

	/* @keyframes lb-in {
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
	} */
</style>
