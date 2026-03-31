<script lang="ts">
	import { onMount } from 'svelte';
	import Hls from 'hls.js';

	const {
		playback_id,
		autoplay = false,
		...props
	}: { playback_id: string; autoplay?: boolean } = $props();

	const src = $derived(`https://stream.mux.com/${playback_id}.m3u8`);

	let hls: Hls | null = null;

	let video: HTMLVideoElement | null = $state(null);

	let hovering = $state(false);
	const show_controls = $derived(hovering);

	const events = {
		onended: () => {
			if (!video) return;
			video.currentTime = 0;
			video.pause();
		},
		onmouseenter: () => {
			hovering = true;
		},
		onmouseleave: () => {
			hovering = false;
		}
	};

	let mounted = $state(false);
	onMount(() => {
		mounted = true;

		if (!video) return;

		if (Hls.isSupported()) {
			hls = new Hls();
			hls.loadSource(src);
			hls.attachMedia(video);

			if (!autoplay) return;

			hls.on(Hls.Events.MANIFEST_PARSED, () => {
				if (!video) return;
				video.play();
			});
		} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
			// Native HLS support (e.g., Safari/iOS)
			video.src = src;

			if (!autoplay) return;
			video.play();
		} else {
			console.error('HLS is not supported in this browser.');
		}

		return () => {
			// Cleanup on component destruction
			if (hls) {
				hls.destroy();
			}
		};
	});
</script>

<video
	{...props}
	bind:this={video}
	id="video"
	{...events}
	controls
	muted
	playsinline
	preload="auto"
	class={[
		'h-full w-full object-contain accent-red-500 opacity-0',
		mounted && 'opacity-100',
		'transition duration-300 ease-in'
	]}
	style="accent-color: red;"
>
</video>
