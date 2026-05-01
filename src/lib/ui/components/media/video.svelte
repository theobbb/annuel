<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Hls from 'hls.js';
	import type { HTMLVideoAttributes } from 'svelte/elements';

	let {
		video = $bindable(null),
		playback_id,
		autoplay = false,
		loop = true,
		...props
	}: HTMLVideoAttributes & {
		video?: HTMLVideoElement | null;
		playback_id: string;
		autoplay?: boolean;
		loop?: boolean;
		class?: string;
	} = $props();

	// Derived URLs from Mux
	const src = $derived(`https://stream.mux.com/${playback_id}.m3u8`);

	let hls: Hls | null = null;
	let mounted = $state(false);

	let is_ready = $state(false);

	function initHls() {
		if (!video) return;

		// Clean up existing instance if src changes
		if (hls) {
			hls.destroy();
		}

		if (Hls.isSupported()) {
			hls = new Hls();
			hls.loadSource(src);
			hls.attachMedia(video);
		} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
			video.src = src;
		}
	}

	// Handle initial mount and source changes
	$effect(() => {
		if (video && src) {
			is_ready = false;
			initHls();
		}
	});

	onMount(() => {
		mounted = true;
	});

	onDestroy(() => {
		if (hls) hls.destroy();
	});
</script>

<video
	bind:this={video}
	{autoplay}
	{loop}
	muted
	playsinline
	preload="auto"
	controls
	onloadeddata={() => (is_ready = true)}
	{...props}
	class={[
		'w-full object-contain  transition-opacity duration-500 ease-out',
		is_ready ? 'opacity-100' : 'opacity-0',
		props.class
	]}
>
</video>
