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

	// Request only the highest rendition from Mux — no low-quality levels in manifest
	const src = $derived(`https://stream.mux.com/${playback_id}.m3u8?max_resolution=1080p`);

	let hls: Hls | null = null;
	let is_ready = $state(false);

	function initHls() {
		if (!video) return;

		if (hls) {
			hls.destroy();
			hls = null;
		}

		// Prefer HLS.js when available — gives us quality control
		// Native HLS (Safari/iOS only — canPlayType is true in Chrome too but we skip it)
		if (Hls.isSupported()) {
			hls = new Hls({
				startLevel: 0,
				capLevelToPlayerSize: false,
				maxBufferLength: 30,
				maxMaxBufferLength: 60
			});

			hls.loadSource(src);
			hls.attachMedia(video);

			hls.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
				console.log(
					'Levels:',
					data.levels.map(
						(l, i) => `[${i}] ${l.width}x${l.height} @ ${Math.round(l.bitrate / 1000)}kbps`
					)
				);
				hls!.currentLevel = data.levels.length - 1;
			});

			hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
				const l = hls!.levels[data.level];
				console.log(`Level switched to [${data.level}]: ${l.width}x${l.height}`);
			});
		} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
			// True Safari/iOS fallback only
			video.src = src;
			video.load();
		}
	}

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
	playsinline
	preload="auto"
	controls
	onloadedmetadata={() => (is_ready = true)}
	{...props}
	class={[
		'w-full bg-placeholder object-contain transition-opacity duration-500 ease-out',
		is_ready ? 'opacity-100' : 'opacity-0',
		props.class
	]}
>
</video>
