<script lang="ts">
	import { onDestroy } from 'svelte';
	import Hls from 'hls.js';
	import type { ClassValue, HTMLVideoAttributes } from 'svelte/elements';

	let {
		video = $bindable(null),
		playback_id,
		loop = true,
		...props
	}: HTMLVideoAttributes & {
		video?: HTMLVideoElement | null;
		playback_id: string;
		loop?: boolean;
		class?: ClassValue;
	} = $props();

	const src = $derived(`https://stream.mux.com/${playback_id}.m3u8`);
	let hls: Hls | null = null;
	let is_ready = $state(false);

	function initHls() {
		if (!video) return;

		// Clean up previous instance
		if (hls) {
			hls.destroy();
			hls = null;
		}

		// 1. Native HLS support (Safari/iOS)
		if (video.canPlayType('application/vnd.apple.mpegurl')) {
			video.src = src;
			// Safari needs an explicit load() when src changes via JS
			video.load();
		}
		// 2. HLS.js support (Chrome/Firefox/Edge)
		else if (Hls.isSupported()) {
			hls = new Hls();
			hls.loadSource(src);
			hls.attachMedia(video);
			hls.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
				// Optional: Auto-select highest quality
				hls!.currentLevel = data.levels.length - 1;
			});
		}
	}

	// React to src or video element changes
	$effect(() => {
		if (video && src) {
			initHls();
		}
	});

	onDestroy(() => {
		if (hls) hls.destroy();
	});
</script>

<video
	bind:this={video}
	{loop}
	muted
	playsinline
	preload="auto"
	controls
	onloadedmetadata={() => (is_ready = true)}
	{...props}
	class={[
		'w-full bg-black object-contain transition-opacity duration-500 ease-out',
		is_ready ? 'opacity-100' : 'opacity-0',
		props.class
	]}
>
</video>
